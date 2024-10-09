const CarSchema = require("../Database/Schemas/CarSchema");
const moment = require("moment");

const checkSellProduct = async (req, res, next) => {
	try {
		// Check if user is available in the request (in case user info is missing)
		if (!req.user || !req.user._id) {
			return res.handler.unauthorized("User not authenticated");
		}

		// Calculate start and end of the current month
		const startOfMonth = moment().startOf("month").toDate();
		const endOfMonth = moment().endOf("month").toDate();

		// Count how many cars the user has sold in the current month
		const countSoldCars = await CarSchema.countDocuments({
			userId: req.user._id,
			created_at: { $gte: startOfMonth, $lte: endOfMonth },
		}).exec();

		// If the user has sold 3 or more cars, prevent further selling
		if (countSoldCars >= 3) {
			return res.handler.conflict(
				"You have reached your maximum selling limit for this month. To continue listing more items, please consider subscribing to our Prime membership for enhanced selling capabilities."
			);
		}

		// If the user is allowed to sell more cars, proceed
		next();
	} catch (err) {
		// Handle server errors
		return res.handler.serverError(err);
	}
};

module.exports = checkSellProduct;
