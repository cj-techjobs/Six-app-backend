const MakesSchema = require("../Database/Schemas/MakeSchema");

module.exports = class {
	createMakes = (body) => {
		return new MakesSchema(body).save();
	};

	createMakesAll = (body) => {
		return MakesSchema.insertMany(body);
	};

	findMakes = (filter, projection, option) => {
		return MakesSchema.findOne(filter, projection, option).lean();
	};

	updateMakes = (filter, updatedData) => {
		return MakesSchema.updateOne(filter, updatedData);
	};

	deleteMakes = (filter) => {
		return MakesSchema.deleteOne(filter);
	};

	getAllMakes = (filter = {}, skip = 0, limit = 10) => {
		return MakesSchema.find(filter).skip(skip).limit(limit).lean();
	};
};
