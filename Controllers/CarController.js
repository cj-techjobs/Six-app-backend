const { IMAGE_KEYS } = require("../Configs/constants");
const S3Manager = require("../Helpers/AwsHelper");
const buildFilter = require("../Helpers/CarFilter");
const paginate = require("../Helpers/Pagination");
const checkSellProduct = require("../middleware/sellProduct");

const CarModel = new (require("../Models/CarModel"))();
const CarMakeModel = new (require("../Models/MakesModel"))();
const CarModelModel = new (require("../Models/ModelsModel"))();

module.exports = class {

	addcar = async (req, res, next) => {
		try {
			// await checkSellProduct(req, res, next);
			if (req.body.images && req.body.images.length > 0) {
				try {
					// Upload images to S3 and wait for all uploads to complete
					await Promise.all(
						req.body.images.map(async (imageObj) => {
							try {
								await S3Manager.S3UploadBase64(imageObj.image, IMAGE_KEYS.CAR, imageObj.imageName);
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
			const car = await CarModel.createCar({ userId: req.user, ...req.body });
			return res.handler.success(car);
		} catch (err) {
			console.log("error ", err);
			return res.handler.serverError(err);
		}
	};
	// addCar = async (req, res, next) => {
	// 	try {
	// 		await checkSellProduct(req, res, next);
	// 		if (req.body.images && req.body.images.length > 0) {
	// 			try {
	// 				// Upload images to S3 and wait for all uploads to complete
	// 				await Promise.all(
	// 					req.body.images.map(async (imageObj) => {
	// 						try {
	// 							await S3Manager.S3UploadBase64(imageObj.image, IMAGE_KEYS.CAR, imageObj.imageName);
	// 						} catch (error) {
	// 							console.error(`Error uploading image: ${imageObj.imageName}`, error);
	// 							// Optionally handle the error, e.g., continue or throw
	// 						}
	// 					})
	// 				);

	// 				// Update req.body.images to only include imageName
	// 				req.body.images = req.body.images.map((imageObj) => imageObj.imageName);
	// 			} catch (error) {
	// 				console.error("Error processing images:", error);
	// 				// Handle the error, e.g., return an error response or throw
	// 			}
	// 		}

	// 		const car = await CarModel.createCar({ userId: req.user, ...req.body });
	// 		return res.handler.success(car);
	// 	} catch (err) {
	// 		return res.handler.serverError(err);
	// 	}
	// };

	addAllCar = async (req, res) => {
		try {
			const car = await CarModel.createCarAll(req.body.data);

			return res.handler.success(car);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	deleteCar = async (req, res) => {
		try {
			const car = await CarModel.deleteCar({ _id: req.body.carId });
			return res.handler.success("Car delete successfully");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllCar = async (req, res) => {
		try {
			const { limit, skip, currentPage } = paginate(req.query);
			// console.log("+++++++", JSON.parse(req.query.Seats));

			const filter = await buildFilter(req.query);

			// Get the total count of cars
			const count = await CarModel.countCars(filter);

			// Fetch the paginated list of cars
			const car = await CarModel.getAllCar(filter, skip, limit);

			const updatedCars = await Promise.all(
				car.map(async (car) => {
					// Update the images field
					const updatedImages = await Promise.all(
						car.images.map(async (image) => {
							if (image) {
								return await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.CAR}/${image}`);
							}
							return null; // If image is null or undefined, return null
						})
					);

					// Return the updated car object with the updated image URLs
					return {
						...car,
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
				list: updatedCars,
			});
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getCarById = async (req, res) => {
		try {
			const { id } = req.params; 
	
			const car = await CarModel.findCarById(id); 
	
			if (!car) {
				return res.handler.notFound({ message: "Car not found" });
			}
			const carData = car.toObject ? car.toObject() : car;
	
			const updatedImages = await Promise.all(
				car.images.map(async (image) => {
					if (image) {
						return await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.CAR}/${image}`);
					}
					return null; 
				})
			);
	
			const updatedCar = {
				...carData, 
				images: updatedImages,
			};
	
			return res.handler.success(updatedCar);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
	
	getMyAllCar = async (req, res) => {
		try {
			const { limit, skip, currentPage } = paginate(req.query);

			const count = await CarModel.countCars({ userId: req.user });

			const car = await CarModel.getAllCar({ userId: req.user }, req.query.skip, req.query.limit);

			const updatedCars = await Promise.all(
				car.map(async (car) => {
					// Update the images field
					const updatedImages = await Promise.all(
						car.images.map(async (image) => {
							if (image) {
								return await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.CAR}/${image}`);
							}
							return null; // If image is null or undefined, return null
						})
					);

					// Return the updated car object with the updated image URLs
					return {
						...car,
						images: updatedImages,
					};
				})
			);
			// Calculate total pages
			const totalPages = Math.ceil(count / limit);

			return res.handler.success({
				total: count,
				perPage: limit,
				totalPages,
				currentPage: currentPage,
				list: updatedCars,
			});
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addCarMake = async (req, res) => {
		try {
			const carMake = await CarMakeModel.createMakes(req.body);

			return res.handler.success(carMake);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addAllCarMake = async (req, res) => {
		try {
			const carAllMake = await CarMakeModel.createMakesAll(req.body.data);

			return res.handler.success(carAllMake);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllCarMake = async (req, res) => {
		try {
			const getCarAllMake = await CarMakeModel.getAllMakes({ type: req.query.type }, req.query.skip, req.query.limit);
			return res.handler.success(getCarAllMake);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addCarModel = async (req, res) => {
		try {
			const car = await CarModelModel.createModel(req.body);

			return res.handler.success(car);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	addAllCarModel = async (req, res) => {
		try {
			const car = await CarModelModel.createModelAll(req.body.data);

			return res.handler.success(car);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getAllCarModel = async (req, res) => {
		try {
			const car = await CarModelModel.getAllModel({}, req.query.skip, req.query.limit);
			return res.handler.success(car);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

	getCountOfSellProduct = async (req, res) => {
		try {
			const count = await CarModel.countUserCar({ userId: req.user });
			console.log(count);
			return count;
		} catch (err) {
			return res.handler.serverError(err);
		}
	};
};
