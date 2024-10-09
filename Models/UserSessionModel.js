const UserSessionSchema = require("../Database/Schemas/UserSessionSchema");

const encrypt = new (require("../Configs/encrypt"))();

const jwt = require("jsonwebtoken");
module.exports = class {
	addSession = (body, userId, jwt) => {
		return new UserSessionSchema({
			...body,
			userId,
			authToken: jwt,
		}).save();
	};

	deleteSession = async (filter) => {
		return await UserSessionSchema.deleteOne(filter);
	};

	deleteSessions = async (filter) => {
		return await UserSessionSchema.deleteMany(filter);
	};

	findSession = (filter, projection, option) => {
		return UserSessionSchema.findOne(filter, projection, option);
	};

	findSessionByAuthToken = (authToken) => {
		return this.findSession(
			{
				authToken,
			},
			"userId",
			{
				lean: true,
			}
		);
	};
};
