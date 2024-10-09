const ColorModel = new (require("../Models/ColorModel"))();

module.exports = class {
	addColor = async (req, res) => {
		try {
			const color = await ColorModel.createColor(req.body);
			return res.handler.success(color);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addAllColor = async (req, res) => {
		try {
			const color = await ColorModel.createColorAll(req.body.data);

			return res.handler.success(color);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	deleteColor = async (req, res) => {
		try {
			const color = await ColorModel.deleteColor({ _id: req.body.colorId });
			return res.handler.success("Color delete successfully");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllColor = async (req, res) => {
		try {
			const color = await ColorModel.getAllColor({}, req.query.skip, req.query.limit);
			return res.handler.success(color);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
