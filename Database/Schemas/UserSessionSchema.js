const mongoose = require("mongoose");

const { DEVICE_TYPE } = require("../../Configs/constants");

const UserSessionSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},
		deviceType: {
			type: String,
			trim: true,
			default: DEVICE_TYPE.ANDROID,
			enum: Object.values(DEVICE_TYPE),
		},
		appVersion: {
			type: String,
			trim: true,
			default: 1.1
		},
		authToken: {
			type: String,
			trim: true,
			required: true,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

module.exports = mongoose.model("user_sessions", UserSessionSchema);
