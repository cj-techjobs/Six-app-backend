const { IMAGE_KEYS } = require("../Configs/constants");
const S3Manager = require("../Helpers/AwsHelper");
const buildFilter = require("../Helpers/CarFilter");
const paginate = require("../Helpers/Pagination");

const BikeModel = new (require("../Models/BikeModel"))();

module.exports = class {
	addBike = async (req, res) => {
		try {
			if (req.body.images && req.body.images.length > 0) {
				try {
					// Upload images to S3 and wait for all uploads to complete
					await Promise.all(
						req.body.images.map(async (imageObj) => {
							try {
								await S3Manager.S3UploadBase64(imageObj.image, IMAGE_KEYS.BIKE, imageObj.imageName);
							} catch (error) {
								console.error(`Error uploading image: ${imageObj.imageName}`, error);
								// Optionally handle the error, e.g., continue or throw
							}
						})
					);

					// Update req.body.images to only include imageName
					req.body.images = req.body.images.map((imageObj) => imageObj.imageName);
				} catch (error) {
					console.error("Error processing images:", error);
					// Handle the error, e.g., return an error response or throw
				}
			}
			const bike = await BikeModel.createBike({ userId: req.user, ...req.body });
			return res.handler.success(bike);
		} catch (err) {
			console.log("error ", err);
			return res.handler.serverError(err);
		}
	};

	addAllBike = async (req, res) => {
		try {
			const bike = await BikeModel.createBikeAll(req.body.data);

			return res.handler.success(bike);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	deleteBike = async (req, res) => {
		try {
			const bike = await BikeModel.deleteBike({ _id: req.body.bikeId });
			return res.handler.success("Bike delete successfully");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllBike = async (req, res) => {
		try {
			const { limit, skip, currentPage } = paginate(req.query);
			// console.log("+++++++", JSON.parse(req.query.Seats));

			const filter = await buildFilter(req.query);

			// Get the total count of cars
			const count = await BikeModel.countBikes(filter);

			const bike = await BikeModel.getAllBike(req.body.data);

			const updatedBikes = await Promise.all(
				bike.map(async (bike) => {
					// Update the images field
					const updatedImages = await Promise.all(
						bike.images.map(async (image) => {
							if (image) {
								return await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.BIKE}/${image}`);
							}
							return null; // If image is null or undefined, return null
						})
					);

					// Return the updated car object with the updated image URLs
					return {
						...bike,
						images: updatedImages,
					};
				})
			);

			// Calculate total pages
			const totalPages = Math.ceil(count / limit);

			// Respond with the data
			return res.handler.success({
				total: count,
				perPage: limit,
				totalPages,
				currentPage: currentPage,
				list: updatedBikes,
			});
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getMyAllBike = async (req, res) => {
		try {
			const bike = await BikeModel.getAllBike({ userId: req.user }, req.query.skip, req.query.limit);
			return res.handler.success(bike);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getBikeById = async (req, res) => {
		try {
			const { id } = req.params;

			const bike = await BikeModel.getBikeById(id);

			if (!bike) {
				return res.status(404).json({
					success: false,
					message: "The bike ID you provided is incorrect. Please check and try again.",
				});
			}

			const updatedImages = await Promise.all(
				bike.images.map(async (image) => {
					if (image) {
						return await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.BIKE}/${image}`);
					}
					return null;
				})
			);

			const updatedBike = {
				...bike,
				images: updatedImages,
			};

			return res.handler.success(updatedBike);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

};
