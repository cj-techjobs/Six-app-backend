const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { AUTHTYPES } = require("../../Configs/constants");

const UserSchema = new mongoose.Schema(
	{
		fullName: {
			type: String,
			trim: true,
		},
		email: {
			type: String,
			unique: true,
		},
		isVerifiedEmail: {
			type: Boolean,
			default: false,
		},
		isSeller: {
			type: Boolean,
			default: false,
		},
		countryCode: {
			type: String,
			default: "91",
		},
		mobileNumber: {
			type: String,
			unique: true,
			required: function () {
				return this.authType === AUTHTYPES.MOBILE;
			},
			validate: {
				validator: function (v) {
					return /^\d{10}$/.test(v); // Example regex for 10-digit mobile numbers
				},
				message: (props) => `${props.value} is not a valid mobile number!`,
			},
			trim: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
		isVerified: {
			type: Boolean,
			default: false,
		},
		birthDate: {
			type: Date,
		},
		profileImage: {
			type: String,
			trim: true,
			default: "https://images.hdqwalls.com/download/humanoid-robot-4k-yu-3840x2160.jpg",
		},
		otp: {
			type: Number,
			trim: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: {
			createdAt: "created_at",
			updatedAt: "updated_at",
		},
	}
);

UserSchema.pre("save", async function (next) {
	this.password = await bcrypt.hash(this.password, 12);
	next();
});

module.exports = mongoose.model("users", UserSchema);
