const ColorModel = new (require("../Models/ColorModel"))();
const MakeModel = new (require("../Models/MakesModel"))();
const ModelModel = new (require("../Models/ModelsModel"))();
const VehicleTypeModel = new (require("../Models/VehicleTypeModel"))();

const buildFilter = async (query) => {
    const filter = {};

    try {
        // Filter by color
        if (query.color) {
            const colorId = await ColorModel.findColor({ color: query.color }, "_id");
            if (colorId) {
                filter["colorId"] = colorId; // Use the color ID in the filter
            }
        }

        // Filter by brand
        if (query.Brand) {
            const brandArray = Array.isArray(query.Brand) ? query.Brand : JSON.parse(query.Brand);
            const makeIds = await Promise.all(brandArray.map((brand) => MakeModel.findMakes({ name: brand }, "_id")));
            const validMakeIds = makeIds.filter(Boolean); // Filter out any invalid makeIds
            if (validMakeIds.length) {
                filter["makeId"] = { $in: validMakeIds }; // Use the array of make IDs in the filter
            }
        }

        // Filter by model
        if (query.Models) {
            const modelArray = Array.isArray(query.Models) ? query.Models : JSON.parse(query.Models);
            const modelIds = await Promise.all(modelArray.map((model) => ModelModel.findModel({ name: model }, "_id")));
            const validModelIds = modelIds.filter(Boolean); // Filter out any invalid model IDs
            if (validModelIds.length) {
                filter["modelId"] = { $in: validModelIds }; // Use the array of model IDs in the filter
            }
        }

        // Filter by body type
        if (query.BodyType) {
            const bodyTypeArray = Array.isArray(query.BodyType) ? query.BodyType : JSON.parse(query.BodyType);
            const bodyIds = await Promise.all(bodyTypeArray.map((bodyType) => VehicleTypeModel.findVehicleType({ name: bodyType }, "_id")));
            const validBodyIds = bodyIds.filter(Boolean); // Filter out any invalid body type IDs
            if (validBodyIds.length) {
                filter["vehicleTypeId"] = { $in: validBodyIds }; // Use the array of body type IDs in the filter
            }
        }

        // Filter by region
        if (query.region) {
            filter["region"] = query.region; // Add region to the filter if it exists
        }

        // Filter by price range
        if (query.MinPrice) {
            filter["price"] = { $gte: parseFloat(query.MinPrice) }; // Minimum price
        }
        if (query.MaxPrice) {
            filter["price"] = filter["price"] || {}; // Ensure price exists
            filter["price"]["$lte"] = parseFloat(query.MaxPrice); // Maximum price
        }

        // Filter by make year
        if (query.Year) {
            filter["makeYear"] = { $gte: parseInt(query.Year) }; // Minimum year
        }

        // Filter by seating capacity
        if (query.Seats) {
            const seatsArray = Array.isArray(query.Seats) ? query.Seats : query.Seats ? JSON.parse(query.Seats) : [];
            filter["seatingCapacity"] = seatsArray.length ? { $in: seatsArray.map(Number) } : [];
        }


        // Filter by fuel type
        if (query.FuelType) {
            const fuelTypeArray = Array.isArray(query.FuelType) ? query.FuelType : query.FuelType ? JSON.parse(query.FuelType) : [];
            filter["fuel"] = fuelTypeArray.length ? { $in: fuelTypeArray } : [];
        }

        // Filter by transmission type
        if (query.Transmission) {
            const transArray = Array.isArray(query.Transmission) ? query.Transmission : query.Transmission ? JSON.parse(query.Transmission) : [];
            filter["transmission"] = transArray.length ? { $in: transArray } : [];
        }

    } catch (error) {
        throw new Error('Error building filter: ' + error.message);
    }

    return filter;
};

module.exports = buildFilter;
