const VehicleTypeModel = new (require("../Models/VehicleTypeModel"))();

module.exports = class {
	addVehicleType = async (req, res) => {
		try {
			const vehicleType = await VehicleTypeModel.createVehicleType(req.body);

			return res.handler.success(vehicleType);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addAllVehicleType = async (req, res) => {
		try {
			const vehicleType = await VehicleTypeModel.createVehicleTypeAll(req.body.data);
			return res.handler.success(vehicleType);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllVehicleType = async (req, res) => {
		try {
			const vehicleType = await VehicleTypeModel.getAllVehicleType({ type: req.query.type }, req.query.skip, req.query.limit);
			return res.handler.success(vehicleType);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	deleteVehicleType = async (req, res) => {
		try {
			const vehicleType = await VehicleTypeModel.deleteVehicleType({ _id: req.body.id });
			return res.handler.success("VehicleType deleted successfully");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
