const emailHelper = require("../Configs/email");
const transporterConfig = require("../Configs/transporterConfig");

module.exports.sendResetPasswordMailHelper = function (receiverMail, otp) {
	try {
		emailHelper.sendMail({
			receiverMail: receiverMail,
			subject: "Password Reset For Your six app Account ",
			senderEmail: process.env.EMAIL_ADDRESS,
			templateName: "resetPassword.ejs",
			templateReplaceValue: {
				otp: `${otp}`,
				// baseUrl: process.env.FRONTEND_BASE_URL,
			},
			transporterConfig,
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports.inviteUserMail = function (receiverMail, otp) {
	try {
		emailHelper.sendMail({
			receiverMail: receiverMail,
			subject: "Welcome to six app",
			senderEmail: process.env.EMAIL_ADDRESS,
			templateName: "inviteEmail.ejs",
			templateReplaceValue: {
				// baseUrl: process.env.FRONTEND_BASE_URL,
				otp,
			},
			transporterConfig,
		});
	} catch (err) {
		console.log(err);
	}
};

module.exports.forgotPasswordMail = function (receiverMail, otp) {
	try {
		emailHelper.sendMail({
			receiverMail: receiverMail,
			subject: "Reset Password for six app",
			templateName: "forgotPasswordEmail.ejs",
			templateReplaceValue: {
				otp,
			},
			transporterConfig,
		});
	} catch (err) {
		console.log(err);
	}
};
