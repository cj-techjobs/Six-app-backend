const UserSchema = require("../Database/Schemas/UserSchema");

const UserSessionModel = new (require("./UserSessionModel"))();

module.exports = class {
	createUser = (body) => {
		return new UserSchema(body).save();
	};

	findUser = (filter, projection, option) => {
		return UserSchema.findOne(filter, projection, option).lean();
	};

	checkIsSeller = (user) => {
		return UserSchema.findOne({ _id: user, isSeller: true });
	};

	updateUser = (filter, updatedData) => {
		return UserSchema.updateOne(filter, updatedData);
	};

	getDetailByAuthToken = async (authToken, projection) => {
		const session = await UserSessionModel.findSessionByAuthToken(authToken);
		if (!session) return;

		return this.findUser(
			{
				_id: session.userId,
			},
			projection,
			{
				lean: true,
			}
		);
	};

	findUserByPhoneNumber = (mobileNumber, projection, option) => {
		return this.findUser(
			{
				mobileNumber,
			},
			projection,
			option ?? {
				lean: true,
			}
		);
	};
};
