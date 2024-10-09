const { IMAGE_KEYS } = require("../Configs/constants");
const S3Manager = require("../Helpers/AwsHelper");
const buildFilter = require("../Helpers/NewBikeFilter"); 
const paginate = require("../Helpers/Pagination");
const checkSellProduct = require("../middleware/sellProduct");
const NewBikeModel = new (require("../Models/NewBikeModel"))(); 
const BikeMakeModel = new (require("../Models/MakesModel"))();

module.exports = class {
    addNewBike = async (req, res) => {
        try {
            if (req.body.images && req.body.images.length > 0) {
                try {
                    await Promise.all(
                        req.body.images.map(async (imageObj) => {
                            try {
                                await S3Manager.S3UploadBase64(imageObj.image, IMAGE_KEYS.BIKE, imageObj.imageName);
                            } catch (error) {
                                console.error(`Error uploading image: ${imageObj.imageName}`, error);
                            }
                        })
                    );
                    req.body.images = req.body.images.map((imageObj) => imageObj.imageName);
                } catch (error) {
                    console.error("Error processing images:", error);
                }
            }
            const bike = await NewBikeModel.createNewBike({ userId: req.user, ...req.body });
            return res.handler.success(bike);
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    addAllNewBike = async (req, res) => {
        try {
            const bike = await NewBikeModel.createNewBikeAll(req.body.data); // Bulk insert using updated schema
            return res.handler.success(bike);
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    deleteNewBike = async (req, res) => {
        try {
            const newBike = await NewBikeModel.deleteNewBike({ _id: req.body.newBikeId });
            return res.handler.success("Bike deleted successfully");
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    getAllNewBike = async (req, res) => {
        try {
            const { limit, skip, currentPage } = paginate(req.query);
            const filter = await buildFilter(req.query);
            const count = await NewBikeModel.countNewBikes(filter);
            const newBikes = await NewBikeModel.getAllNewBike(filter, skip, limit);

            const updatedBikes = await Promise.all(
                newBikes.map(async (newBike) => {
                    const updatedImages = await Promise.all(
                        newBike.images.map(async (image) => {
                            if (image) {
                                return await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.BIKE}/${image}`);
                            }
                            return null;
                        })
                    );

                    return {
                        ...newBike,
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
                list: updatedBikes,
            });
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    getMyAllNewBike = async (req, res) => {
        try {
            const { limit, skip, currentPage } = paginate(req.query);
            const count = await NewBikeModel.countNewBikes({ userId: req.user });
            const bikes = await NewBikeModel.getAllNewBike({ userId: req.user }, req.query.skip, req.query.limit);

            const updatedBikes = await Promise.all(
                bikes.map(async (bike) => {
                    const updatedImages = await Promise.all(
                        bike.images.map(async (image) => {
                            if (image) {
                                return await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.BIKE}/${image}`);
                            }
                            return null;
                        })
                    );

                    return {
                        ...bike._doc,
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
                list: updatedBikes,
            });
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    getNewBikeById = async (req, res) => {
		try {
			const { id } = req.params; 
	
			const newBike = await NewBikeModel.findNewBikeById(id); 
	
			if (!newBike) {
				return res.handler.notFound({ message: "New Bike not found" });
			}
			const newBikeData = newBike.toObject ? newBike.toObject() : newBike;
	
			const updatedImages = await Promise.all(
				newBike.images.map(async (image) => {
					if (image) {
						return await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${IMAGE_KEYS.NEWBIKE}/${image}`);
					}
					return null; 
				})
			);
	
			const updatednewBike = {
				...newBikeData, 
				images: updatedImages,
			};
	
			return res.handler.success(updatednewBike);
		} catch (err) {
			return res.handler.serverError(err);
		}
	};

    addBikeMake = async (req, res) => {
        try {
            const bikeMake = await BikeMakeModel.createMakes(req.body);
            return res.handler.success(bikeMake);
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    addAllBikeMake = async (req, res) => {
        try {
            const bikeAllMake = await BikeMakeModel.createMakesAll(req.body.data);
            return res.handler.success(bikeAllMake);
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    getAllBikeMake = async (req, res) => {
        try {
            const getBikeAllMake = await BikeMakeModel.getAllMakes({ type: req.query.type }, req.query.skip, req.query.limit);
            return res.handler.success(getBikeAllMake);
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    addBikeModel = async (req, res) => {
        try {
            const bike = await BikeModelModel.createModel(req.body);
            return res.handler.success(bike);
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    addAllBikeModel = async (req, res) => {
        try {
            const bike = await BikeModelModel.createModelAll(req.body.data);
            return res.handler.success(bike);
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    getAllBikeModel = async (req, res) => {
        try {
            const bike = await BikeModelModel.getAllModel({}, req.query.skip, req.query.limit);
            return res.handler.success(bike);
        } catch (err) {
            return res.handler.serverError(err);
        }
    };

    getCountOfSellProduct = async (req, res) => {
        try {
            const count = await NewBikeModel.countDocuments({ userId: req.user });
            return res.handler.success(count);
        } catch (err) {
            return res.handler.serverError(err);
        }
    };
};
