const ColorModel = new (require("../Models/ColorModel"))();
const MakeModel = new (require("../Models/MakesModel"))();
const ModelModel = new (require("../Models/ModelsModel"))();
const VehicleTypeModel = new (require("../Models/VehicleTypeModel"))(); // Can be used for bike types

const buildBikeFilter = async (query) => {
    const filter = {};

    try {
        if (query.color) {
            const colorId = await ColorModel.findColor({ color: query.color }, "_id");
            if (colorId) {
                filter["colorId"] = colorId;
            }
        }

        if (query.Brand) {
            const brandArray = Array.isArray(query.Brand) ? query.Brand : JSON.parse(query.Brand);
            const makeIds = await Promise.all(brandArray.map((brand) => MakeModel.findMakes({ name: brand }, "_id")));
            const validMakeIds = makeIds.filter(Boolean);
            if (validMakeIds.length) {
                filter["makeId"] = { $in: validMakeIds };
            }
        }

        if (query.Models) {
            const modelArray = Array.isArray(query.Models) ? query.Models : JSON.parse(query.Models);
            const modelIds = await Promise.all(modelArray.map((model) => ModelModel.findModel({ name: model }, "_id")));
            const validModelIds = modelIds.filter(Boolean);
            if (validModelIds.length) {
                filter["modelId"] = { $in: validModelIds };
            }
        }

        if (query.BikeType) {
            const bikeTypeArray = Array.isArray(query.BikeType) ? query.BikeType : JSON.parse(query.BikeType);
            const bikeTypeIds = await Promise.all(bikeTypeArray.map((bikeType) => VehicleTypeModel.findVehicleType({ name: bikeType }, "_id")));
            const validBikeTypeIds = bikeTypeIds.filter(Boolean);
            if (validBikeTypeIds.length) {
                filter["vehicleTypeId"] = { $in: validBikeTypeIds };
            }
        }

        if (query.region) {
            filter["region"] = query.region;
        }

        if (query.MinPrice) {
            filter["price"] = { $gte: parseFloat(query.MinPrice) };
        }
        if (query.MaxPrice) {
            filter["price"] = filter["price"] || {};
            filter["price"]["$lte"] = parseFloat(query.MaxPrice);
        }

        if (query.Year) {
            filter["makeYear"] = { $gte: parseInt(query.Year) };
        }

        if (query.EngineCapacity) {
            const engineCapacityArray = Array.isArray(query.EngineCapacity) ? query.EngineCapacity : JSON.parse(query.EngineCapacity);
            filter["engineCapacity"] = engineCapacityArray.length ? { $in: engineCapacityArray.map(Number) } : [];
        }

        if (query.FuelType) {
            const fuelTypeArray = Array.isArray(query.FuelType) ? query.FuelType : JSON.parse(query.FuelType);
            filter["fuel"] = fuelTypeArray.length ? { $in: fuelTypeArray } : [];
        }

        if (query.Transmission) {
            const transArray = Array.isArray(query.Transmission) ? query.Transmission : JSON.parse(query.Transmission);
            filter["transmission"] = transArray.length ? { $in: transArray } : [];
        }

    } catch (error) {
        throw new Error('Error building filter for bikes: ' + error.message);
    }

    return filter;
};

module.exports = buildBikeFilter;
