const client = require("twilio")(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const sendOtpVerificationMessage = async (otp, to) => {
	try {
		if (otp === null) return;

		const OTP_TEXT = `Welcome to SIX app. Your One time password is ${otp}. Please do not share with other.Thank you.`;

		const sendSMS = await client.messages
			.create({
				body: OTP_TEXT,
				from: "+19389465878",
				to: to,
			})
			.then((response) => console.log("OTP send successfully"));

		return sendSMS;
	} catch (error) {
		return error;
	}
};

const forgetPasswordOtpMessage = async (otp, to) => {
	try {
		if (otp === null) return;

		const OTP_TEXT = `SIX app. Your request for Forget Passowrd. Your One time password is ${otp}. Please do not share with other.Thank you.`;

		const sendSMS = await client.messages
			.create({
				body: OTP_TEXT,
				from: "+19389465878",
				to: to,
			})
			.then((response) => console.log("FP OTP send successfully"));

		return sendSMS;
	} catch (error) {
		return error;
	}
};

module.exports = {
	sendOtpVerificationMessage,
	forgetPasswordOtpMessage,
};
