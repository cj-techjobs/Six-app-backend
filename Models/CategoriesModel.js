const CategorySchema = require("../Database/Schemas/CategorySchema");

module.exports = class {
	createCategory = (body) => {
		return new CategorySchema(body).save();
	};

	createCategoryAll = (body) => {
		return CategorySchema.insertMany(body);
	};

	findCategory = (filter, projection, option) => {
		return CategorySchema.findOne(filter, projection, option).lean();
	};

	updateCategory = (filter, updatedData) => {
		return CategorySchema.updateOne(filter, updatedData);
	};

	deleteCategory = (filter) => {
		return CategorySchema.deleteOne(filter);
	};

	getAll = (filter = {}, skip = 0, limit = 10) => {
		return CategorySchema.find(filter).skip(skip).limit(limit).lean();
	};

	totalCount = (filter) => {
		return CategorySchema.find(filter).countDocuments();
	};

	getAllWithSubCategory = () => {};
};
