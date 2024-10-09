const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const UserSessionModel = new (require("../Models/UserSessionModel"))();

module.exports = class Authentication {
	static async all(req, res, next) {
		try {
			//Check error if exist then send validationError
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.handler.validationError(undefined, errors.array());
			}

			//If All done
			next();
		} catch (err) {
			return res.handler.serverError(err);
		}
	}

	static async userAccess(req, res, next) {
		const token = req.header("Authorization")?.replace("Bearer ", "");
		if (!token) {
			return res.handler.unauthorized();
		}

		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const sessionEntryChecking = await UserSessionModel.findSession({ userId: decoded._id, authToken: token });

			if (!sessionEntryChecking) return res.handler.unauthorized("STATUS.EXPIRED");

			req.user = decoded; // Attach the decoded token to the request
			next();
		} catch (err) {
			if (err.name === "TokenExpiredError") {
				return res.handler.unauthorized(); // Token has expired
			}
			return res.handler.serverError(err);
		}
	}
};
