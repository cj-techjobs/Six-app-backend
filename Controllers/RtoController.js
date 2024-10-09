const RtoModel = new (require("../Models/RtoModel"))();

module.exports = class {
	addRto = async (req, res) => {
		try {
			const rto = await RtoModel.createRto(req.body);

			return res.handler.success(rto);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addAllRto = async (req, res) => {
		try {
			const rto = await RtoModel.createRtoAll(req.body.data);
			return res.handler.success(rto);
		} catch (err) {
			console.log(err);
			return res.handler.serverError(err);
		}
	};

	getAllRto = async (req, res) => {
		try {
			const rto = await RtoModel.getAllRto({}, req.query.skip, req.query.limit);
			return res.handler.success(rto);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	deleteRto = async (req, res) => {
		try {
			const rto = await RtoModel.deleteRto({ _id: req.body.id });
			return res.handler.success("Rto deleted successfully");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
