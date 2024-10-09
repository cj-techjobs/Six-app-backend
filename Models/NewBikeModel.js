const NewBikeSchema = require("../Database/Schemas/NewBikeSchema"); // Update the path as needed

module.exports = class {
  // Create a new bike
  createNewBike = (body) => {
    return new NewBikeSchema(body).save();
  };

  // Create multiple bikes
  createNewBikeAll = (body) => {
    return NewBikeSchema.insertMany(body);
};

  // Find a single bike
  async findNewBike(filter, projection, options) {
    try {
      return await NewBikeSchema.findOne(filter, projection, options).lean();
    } catch (error) {
      throw new Error('Error finding bike: ' + error.message);
    }
  }

  // Get a bike by ID
  async getNewBikeById(id) {
    try {
      return await NewBikeSchema.findById(id).lean();
    } catch (error) {
      throw new Error('Error retrieving bike by ID: ' + error.message);
    }
  }

  // Count user bikes
  async countUserNewBike(filter) {
    try {
      return await NewBikeSchema.countDocuments(filter).lean();
    } catch (error) {
      throw new Error('Error counting user bikes: ' + error.message);
    }
  }

  // Update a bike
  async updateNewBike(filter, updatedData) {
    try {
      return await NewBikeSchema.updateOne(filter, updatedData);
    } catch (error) {
      throw new Error('Error updating bike: ' + error.message);
    }
  }

  // Delete a bike
  deleteNewBike = (filter) => {
    return NewBikeSchema.deleteOne(filter);
};

  // Count total bikes
  async countNewBikes(filter) {
    try {
      return await NewBikeSchema.countDocuments(filter).exec();
    } catch (error) {
      throw new Error('Error counting bikes: ' + error.message);
    }
  }

  // Get all bikes with pagination
  async getAllNewBike(filter = {}, skip = 0, limit = 10) {
    try {
      return await NewBikeSchema.find(filter)
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
          {
            path: "city",
            strictPopulate: false,
          },
        ])
        .lean();
    } catch (error) {
      throw new Error('Error retrieving bikes: ' + error.message);
    }
  }

  async findNewBikeById(id) {
    try {
      return await NewBikeSchema.findById(id)
        .populate([
          {
            path: "userId",
            select: "fullName mobileNumber",
            strictPopulate: false,
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
    } catch (error) {
      throw new Error('Error retrieving bike by ID: ' + error.message);
    }
  }

};
