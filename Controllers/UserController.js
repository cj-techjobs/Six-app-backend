const UserModel = new (require("../Models/UserModel"))();
const UserSessionModel = new (require("../Models/UserSessionModel"))();

module.exports = class {
	getProfile = async (req, res) => {
		try {
			const user = await UserModel.findUser({
				_id: req.user,
			});
			return res.handler.success(user);
		} catch (error) {
			return res.handler.serverError(error);
		}
	};

	logout = async (req, res) => {
		try {
			const token = req.header("Authorization")?.replace("Bearer ", "");
			await UserSessionModel.deleteSession({ userId: req.user, authToken: token });
			return res.handler.success("Session Expired");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	updateProfile = async (req, res) => {
		try {
			const notValidParameter =
				req.body.isActive || req.body.isVerifiedEmail || req.body._id || req.body.password || req.body.isVerified || req.body.otp || req.body.created_at || req.body.updated_at;
			if (notValidParameter) {
				return res.handler.badRequest("STATUS.NOT_VALID_DATA");
			}
			await UserModel.updateUser({ _id: req.user }, { ...req.body });
			const getUpdatedUser = await UserModel.findUser({ _id: req.user });
			return res.handler.success(getUpdatedUser);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getIamSeller = async (req, res) => {
		try {
			return UserModel.checkIsSeller(req.user);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	// updateProfileImage = async (req, res) => {
	// 	try {
	// 	} catch (err) {
	// 		return res.handler.serverError(err);
	// 	}
	// };
};
