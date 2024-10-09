const express = require("express");
const router = express.Router();
const BikeValidator = require("../middleware/validators/BikeValidator");
const BikeController = new (require("../Controllers/BikeController"))();
const Authentication = require("../middleware/authentication");

router.use(Authentication.userAccess);
/**
 * @swagger
 * /api/v1/bike/add:
 *   post:
 *     summary: Create a new bike
 *     description: Create a new car with the provided details.
 *     tags:
 *       - Bikes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 maxLength: 30
 *                 description: The title of the bike.
 *               makeId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the make of the bike.
 *               modelId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the model of the bike.
 *               vehicleTypeId:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the vehicle type.
 *               rto:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the RTO where the bike is registered.
 *               year:
 *                 type: integer
 *                 format: int32
 *                 minimum: 1900
 *                 maximum: 2024
 *                 description: The manufacturing year of the bike.
 *               variant:
 *                 type: string
 *                 maxLength: 100
 *                 description: The variant of the bike.
 *               engineCapacity:
 *                 type: integer
 *                 format: int32
 *                 minimum: 50
 *                 maximum: 2500
 *                 description: The engine capacity of the bike in cc.
 *               fuelType:
 *                 type: string
 *                 enum:
 *                   - Petrol
 *                   - Electric
 *                   - Hybrid
 *                 description: The type of fuel the bike uses.
 *               mileage:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 description: The mileage of the bike in kmpl or km per charge.
 *               transmission:
 *                 type: string
 *                 enum:
 *                   - Manual
 *                   - Automatic
 *                 description: The type of transmission.
 *               location:
 *                 type: string
 *                 description: The location of the bike, defaulting to a specific address.
 *               latitude:
 *                 type: string
 *                 description: The latitude of the bike's location.
 *               longitude:
 *                 type: string
 *                 description: The longitude of the bike's location.
 *               color:
 *                 type: string
 *                 maxLength: 50
 *                 description: The color of the bike.
 *               registrationNumber:
 *                 type: string
 *                 maxLength: 15
 *                 description: The unique registration number of the bike.
 *               registrationState:
 *                 type: string
 *                 maxLength: 50
 *                 description: The state where the bike is registered.
 *               registrationDate:
 *                 type: string
 *                 format: date
 *                 description: The date when the bike was registered.
 *               insuranceValidTill:
 *                 type: string
 *                 format: date
 *                 description: The date until which the bike's insurance is valid.
 *               owners:
 *                 type: integer
 *                 format: int32
 *                 minimum: 1
 *                 description: The number of previous owners of the bike.
 *               price:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 description: The price of the bike.
 *               description:
 *                 type: string
 *                 maxLength: 1000
 *                 description: Additional details about the bike.
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   description: URL or path to an image of the bike.
 *     responses:
 *       '201':
 *         description: Car created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       '400':
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message
 */

/**
 * @swagger
 * /api/v1/bike/:
 *   get:
 *     tags:
 *       - Bikes
 *     summary:
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           example: 0
 *         description: The number of items to skip for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The maximum number of items to return
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description:
 *     responses:
 *       200:
 *         description:
 */

/**-------3
 * @swagger
 * /api/v1/bike/my-bikes:
 *   get:
 *     tags:
 *       - Bikes
 *     summary:
 *     parameters:
 *       - in: query
 *         name: skip
 *         schema:
 *           type: integer
 *           example: 0
 *         description: The number of items to skip for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *         description: The maximum number of items to return
 *     responses:
 *       200:
 *         description:
 */

/**------4
/**
 * @swagger
 * /api/v1/bike/delete:
 *   delete:
 *     summary: Delete a bike
 *     description:
 *     tags:
 *       - Bikes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bikeId:
 *                 type: string
 *                 description: give here bike id
 *     responses:
 *       '200':
 *         description: 
 */

router.route("/").get(BikeController.getAllBike);

router.route("/my-bikes").get(BikeController.getMyAllBike);

router.route("/delete").delete(BikeController.deleteBike);

router.route("/add").post(BikeValidator.addBike, BikeController.addBike);

router.route("/:id").get(BikeController.getBikeById);

module.exports = router;
