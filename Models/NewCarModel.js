const NewCarSchema = require("../Database/Schemas/NewCarSchema");
module.exports = class {
  // Create a new car
  createNewCar = (body) => {
		return new NewCarSchema(body).save();
	};

  // Find a single car
  async findNewCar(filter, projection, options) {
    try {
      return await NewCarSchema.findOne(filter, projection, options).lean();
    } catch (error) {
      throw new Error('Error finding car: ' + error.message);
    }
  }

  // Count user cars
  async countUserNewCar(filter) {
    try {
      return await NewCarSchema.countDocuments(filter).lean();
    } catch (error) {
      throw new Error('Error counting user cars: ' + error.message);
    }
  }

  // Update a car
  async updateNewCar(filter, updatedData) {
    try {
      return await NewCarSchema.updateOne(filter, updatedData);
    } catch (error) {
      throw new Error('Error updating car: ' + error.message);
    }
  }

  // Delete a car
	deleteNewCar = (filter) => {
		return NewCarSchema.deleteOne(filter);
	};

  // Count total cars
  async countNewCars(filter) {
    try {
      return await NewCarSchema.countDocuments(filter).exec();
    } catch (error) {
      throw new Error('Error counting cars: ' + error.message);
    }
  }

  // Get all cars with pagination
  async getAllNewCar(filter = {}, skip = 0, limit = 10) {
    try {
      return await NewCarSchema.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ created_at: -1 })
        .populate([
          {
            path: "userId",
            strictPopulate: false,
            select: "fullName mobileNumber",
          },
          {
            path: "makeId",
            strictPopulate: false,
          },
          {
            path: "modelId",
            strictPopulate: false,
          },
          {
            path: "vehicleTypeId",
            strictPopulate: false,
          },
          {
            path: "colorId",
            strictPopulate: false,
          },
          {
            path: "categoriesId",
            strictPopulate: false,
          },
        ])
        .lean();
    } catch (error) {
      throw new Error('Error retrieving cars: ' + error.message);
    }
  }
  findCarById = (id) => {
		return NewCarSchema.findById(id)
			.populate([
				{
					path: "userId",
					strictPopulate: false,
					select: "fullName mobileNumber",
				},
				{
					path: "makeId",
					strictPopulate: false,
				},
				{
					path: "modelId",
					strictPopulate: false,
				},
				{
					path: "vehicleTypeId",
					strictPopulate: false,
				},
				{
					path: "colorId",
					strictPopulate: false,
				},
				{
					path: "categoriesId",
					strictPopulate: false,
				},
			])
			.lean(); // Convert Mongoose document to plain object
	};
};
