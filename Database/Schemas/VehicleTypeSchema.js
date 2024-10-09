const mongoose = require("mongoose");
const { VEHICLE_TYPE } = require("../../Configs/constants");

const VehicleTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
	image: {
		type: String,
		default: "https://images.hdqwalls.com/download/humanoid-robot-4k-yu-3840x2160.jpg",
	},
	type: {
		type: String,
		enum: Object.values(VEHICLE_TYPE),
	},
});

module.exports = mongoose.model("vehicleType", VehicleTypeSchema);
