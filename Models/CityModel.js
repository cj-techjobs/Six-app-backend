const CitySchema = require("../Database/Schemas/CitySchema");

module.exports = class {
	createCity = (body) => {
		return new CitySchema(body).save();
	};

	createCityAll = (body) => {
		return CitySchema.insertMany(body);
	};

	findCity = (filter, projection, option) => {
		return CitySchema.findOne(filter, projection, option).lean();
	};

	countCity = (filter, projection, option) => {
		return CitySchema.findOne(filter, projection, option).countDocuments().lean();
	};

	updateCity = (filter, updatedData) => {
		return CitySchema.updateOne(filter, updatedData);
	};

	deleteCity = (filter) => {
		return CitySchema.deleteOne(filter);
	};

	getAllCity = (filter = {}, skip = 0, limit = 10) => {
		return CitySchema.find(filter).skip(skip).limit(limit).lean();
	};
};
