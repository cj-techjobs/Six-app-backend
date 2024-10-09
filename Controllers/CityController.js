const CityModel = new (require("../Models/CityModel"))();

module.exports = class {
	addCity = async (req, res) => {
		try {
			const city = await CityModel.createCity(req.body);
			return res.handler.success(city);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addAllCity = async (req, res) => {
		try {
			const city = await CityModel.createCityAll(req.body.data);

			return res.handler.success(city);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	deleteCity = async (req, res) => {
		try {
			const city = await CityModel.deleteCity({ _id: req.body.cityId });
			return res.handler.success("City delete successfully");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllCity = async (req, res) => {
		try {
			const city = await CityModel.getAllCity({}, req.query.skip, req.query.limit);
			return res.handler.success(city);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
