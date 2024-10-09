const { IMAGE_KEYS } = require("../Configs/constants");
const S3Manager = require("../Helpers/AwsHelper");
const buildFilter = require("../Helpers/CarFilter");
const paginate = require("../Helpers/Pagination");
const checkSellProduct = require("../middleware/sellProduct");
const NewCarModel = new (require("../Models/NewCarModel"))(); // Import the new car model
const CarModel = new (require("../Models/CarModel"))();
const CarMakeModel = new (require("../Models/MakesModel"))();

module.exports = class {
    addNewCar = async (req, res) => {

        try {
            // await checkSellProduct(req, res, next);
			if (req.body.images && req.body.images.length > 0) {
				try {
					// Upload images to S3 and wait for all uploads to complete
					await Promise.all(
						req.body.images.map(async (imageObj) => {
							try {
								await S3Manager.S3UploadBase64(imageObj.image, IMAGE_KEYS.NEWCAR, imageObj.imageName);
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
            const car = await NewCarModel.createNewCar({ userId: req.user, ...req.body });
            return res.handler.success(car);
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    addAllNewCar = async (req, res) => {
        try {
            const car = await NewCarModel.insertMany(req.body.data); // Bulk insert using updated schema
            return res.handler.success(car);
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    deleteNewCar = async (req, res) => {
		try {
			const car = await NewCarModel.deleteNewCar({ _id: req.body.newCarId });
			return res.handler.success("New Car delete successfully");
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

    getAllNewCar = async (req, res) => {
        try {
            const { limit, skip, currentPage } = paginate(req.query);
            const filter = await buildFilter(req.query);

            // Get the total count of cars
            const count = await NewCarModel.countNewCars(filter);

            // Fetch the paginated list of cars
            const newCars = await NewCarModel.getAllNewCar(filter, skip, limit);

            const updatedCars = await Promise.all(
                newCars.map(async (newCar) => {
                    const updatedImages = await Promise.all(
                        newCar.images.map(async (image) => {
                            if (image) {
                                return await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.CAR}/${image}`);
                            }
                            return null;
                        })
                    );

                    return {
                        ...newCar, // Spread the car document
                        images: updatedImages,
                    };
                })
            );

            const totalPages = Math.ceil(count / limit);

            return res.handler.success({
                total: count,
                perPage: limit,
                totalPages,
                currentPage,
                list: updatedCars,
            });
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    getMyAllNewCar = async (req, res) => {
        try {
            const { limit, skip, currentPage } = paginate(req.query);
            const count = await NewCarModel.countNewCars({ userId: req.user });
            const cars = await NewCarModel.getAllNewCar({ userId: req.user }, req.query.skip, req.query.limit);
            const updatedCars = await Promise.all(
                cars.map(async (car) => {
                    const updatedImages = await Promise.all(
                        car.images.map(async (image) => {
                            if (image) {
                                return await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.CAR}/${image}`);
                            }
                            return null;
                        })
                    );

                    return {
                        ...car._doc,
                        images: updatedImages,
                    };
                })
            );

            const totalPages = Math.ceil(count / limit);

            return res.handler.success({
                total: count,
                perPage: limit,
                totalPages,
                currentPage,
                list: updatedCars,
            });
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    getNewCarById = async (req, res) => {
		try {
			const { id } = req.params; 
	
			const newCar = await NewCarModel.findCarById(id); 
	
			if (!newCar) {
				return res.handler.notFound({ message: "New Car not found" });
			}
			const newCarData = newCar.toObject ? newCar.toObject() : newCar;
	
			const updatedImages = await Promise.all(
				newCar.images.map(async (image) => {
					if (image) {
						return await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.NEWCAR}/${image}`);
					}
					return null; 
				})
			);
	
			const updatedNewCar = {
				...newCarData, 
				images: updatedImages,
			};
	
			return res.handler.success(updatedNewCar);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

    // Additional methods for car make and model can be adjusted similarly as needed.

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
            const count = await NewCarModel.countDocuments({ userId: req.user });
            return res.handler.success(count); // Return count as a response
        } catch (err) {
            return res.handler.serverError(err);
        }
    };
};
