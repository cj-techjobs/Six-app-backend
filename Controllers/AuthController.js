const UserModel = new (require("../Models/UserModel"))();
const UserSessionModel = new (require("../Models/UserSessionModel"))();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const randomStringHelper = require("../Helpers/GeneralHelpers");

const { sendOtpVerificationMessage, forgetPasswordOtpMessage } = require("../Helpers/SmsHelper");

module.exports = class {
	signIn = async (req, res) => {
		try {
			const user = await UserModel.findUserByPhoneNumber(req.body.mobileNumber);
			if (!user) return res.handler.notFound("VALIDATION.NOT_FOUND.USER");

			const validPassword = await bcrypt.compare(req.body.password, user.password);
			if (!validPassword) return res.handler.conflict("VALIDATION.PASSWORD.INCORRECT");

			if (!user.isActive) return res.handler.notAllowed("VALIDATION.STATUS.DEACTIVATED_ACCOUNT");

			const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_EXPIRES_IN,
			});

			await UserSessionModel.addSession(req.body, user._id, token);

			return res.handler.success({
				id: user._id,
				mobileNumber: user.mobileNumber,
				authToken: token,
			});
		} catch (error) {
			return res.handler.serverError(error);
		}
	};

	signUp = async (req, res) => {
		try {
			const userExist = await UserModel.findUserByPhoneNumber(req.body.mobileNumber, "_id");
			if (userExist) {
				return res.handler.conflict("VALIDATION.EXISTS.MOBILE_NUMBER");
			}

			const otp = randomStringHelper.generateOtp();
			req.body.otp = otp;

			const newUser = await UserModel.createUser(req.body);
			await sendOtpVerificationMessage(otp, "+" + newUser?.countryCode + "" + newUser?.mobileNumber);

			const token = jwt.sign({ _id: newUser._id, type: "VOTP" }, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_FP_EXPIRES_IN,
			});

			return res.handler.success({
				id: newUser._id,
				mobileNumber: newUser.mobileNumber,
				verifyToken: token,
			});
		} catch (error) {
			return res.handler.serverError(error);
		}
	};

	verifyOtp = async (req, res) => {
		try {
			const token = req.header("VerifyToken");
			if (!token) {
				return res.handler.badRequest("Verify token not found.");
			}

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			if (decoded.type === "VOTP") {
				const userDetails = await UserModel.findUserByPhoneNumber(req.body.mobileNumber, "otp");
				if (!userDetails) {
					return res.handler.notFound("VALIDATION.NOT_FOUND.USER");
				}

				if (userDetails.otp !== req.body.otp) {
					return res.handler.validationError("VALIDATION.OTP.MISMATCH");
				}

				await UserModel.updateUser(
					{
						mobileNumber: req.body.mobileNumber,
					},
					{
						otp: null,
						isVerified: true,
					}
				);

				const token = jwt.sign({ _id: userDetails._id }, process.env.JWT_SECRET, {
					expiresIn: process.env.JWT_EXPIRES_IN,
				});

				const newSession = await UserSessionModel.addSession(req.body, userDetails._id, token);

				return res.handler.success({ token: token }, "VALIDATION.OTP.VERIFIED");
			}
		} catch (error) {
			if (error.name === "TokenExpiredError") {
				return res.handler.notFound("Verify Token is Expired."); // Token has expired
			}
			return res.handler.serverError(error);
		}
	};

	resendSignUpOtp = async (req, res) => {
		try {
			const findUser = await UserModel.findUser({ _id: req.body.userId, mobileNumber: req.body.mobileNumber });

			if (!findUser) return res.handler.notFound("VALIDATION.NOT_FOUND.USER");

			const otp = randomStringHelper.generateOtp();

			console.log(findUser);

			await UserModel.updateUser({ _id: req.body.userId }, { otp });

			await sendOtpVerificationMessage(otp, "+" + findUser?.countryCode + "" + findUser?.mobileNumber);

			const token = jwt.sign({ _id: findUser._id, type: "VOTP" }, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_FP_EXPIRES_IN,
			});

			return res.handler.success({
				verifyToken: token,
			});
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	forgotPassword = async (req, res) => {
		try {
			const user = await UserModel.findUserByPhoneNumber(req.body.mobileNumber, ["mobileNumber", "countryCode"]);
			if (!user) return res.handler.notFound("VALIDATION.NOT_FOUND.USER");

			const otp = randomStringHelper.generateOtp();

			await UserModel.updateUser(
				{
					mobileNumber: req.body.mobileNumber,
				},
				{
					otp,
				}
			);

			await forgetPasswordOtpMessage(otp, "+" + user.countryCode + "" + user.mobileNumber);

			const token = jwt.sign({ _id: user._id, type: "FP" }, process.env.JWT_SECRET, {
				expiresIn: process.env.JWT_FP_EXPIRES_IN,
			});

			return res.handler.success(token);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	verifyForgetPasswordOtp = async (req, res) => {
		try {
			const token = req.header("VerifyFPToken");
			if (!token) {
				return res.handler.badRequest("Verify FP token not found.");
			}

			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			if (decoded.type === "FP") {
				const user = await UserModel.findUserByPhoneNumber(req.body.mobileNumber, "otp", {});
				if (!user) return res.handler.notFound("VALIDATION.NOT_FOUND.USER");

				if (user.otp !== req.body.otp) return res.handler.validationError("VALIDATION.OTP.MISMATCH");

				await Promise.all([
					UserModel.updateUser(
						{
							mobileNumber: req.body.mobileNumber,
						},
						{
							otp: null,
						}
					),
					UserSessionModel.deleteSessions({
						userId: user._id,
					}),
				]);

				return res.handler.success("Forget Password otp is verified successfully.");
			}
		} catch (err) {
			if (err.name === "TokenExpiredError") {
				return res.handler.notFound("Verify FP Token is Expired."); // Token has expired
			}
			return res.handler.serverError(err);
		}
	};

	resetPassword = async (req, res) => {
		try {
			await Promise.all([UserModel.updateUser({ mobileNumber: req.body.mobileNumber }, { password: await bcrypt.hash(req.body.password, 12) })]);

			return res.handler.updated(null, "USER.RESET_PASSWORD");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
