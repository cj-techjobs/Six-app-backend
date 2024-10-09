const ModelSchema = require("../Database/Schemas/ModelSchema");

module.exports = class {
	createModel = (body) => {
		return new ModelSchema(body).save();
	};

	createModelAll = (body) => {
		return ModelSchema.insertMany(body);
	};

	findModel = (filter, projection, option) => {
		return ModelSchema.findOne(filter, projection, option).lean();
	};

	updateModel = (filter, updatedData) => {
		return ModelSchema.updateOne(filter, updatedData);
	};

	deleteModel = (filter) => {
		return ModelSchema.deleteOne(filter);
	};

	getAllModel = (filter = {}, skip = 0, limit = 10) => {
		return ModelSchema.find(filter).skip(skip).limit(limit).populate("makeId").lean();
	};
};
