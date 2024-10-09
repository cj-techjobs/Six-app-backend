const ColorSchema = require("../Database/Schemas/ColorSchema");

module.exports = class {
	createColor = (body) => {
		return new ColorSchema(body).save();
	};

	createColorAll = (body) => {
		return ColorSchema.insertMany(body);
	};

	findColor = (filter, projection, option) => {
		return ColorSchema.findOne(filter, projection, option).lean();
	};

	countColor = (filter, projection, option) => {
		return ColorSchema.findOne(filter, projection, option).countDocuments().lean();
	};

	updateColor = (filter, updatedData) => {
		return ColorSchema.updateOne(filter, updatedData);
	};

	deleteColor = (filter) => {
		return ColorSchema.deleteOne(filter);
	};

	getAllColor = (filter = {}, skip = 0, limit = 10) => {
		return ColorSchema.find(filter).skip(skip).limit(limit).lean();
	};
};
