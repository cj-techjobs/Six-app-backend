const express = require("express");
const router = express.Router();
const CarValidator = require("../middleware/validators/CarValidator");
const CmsCarController = new (require("../Controllers/CarController"))();
const Authentication = require("../middleware/authentication");
const checkSellProduct = require("../middleware/sellProduct");

//1st pass from---------------------Middleware applying---------------------
router.use(Authentication.userAccess);

/**------1
/**
 * @swagger
 * /api/v1/car/add:
 *   post:
 *     summary: Create a new car
 *     description: Create a new car with the provided details.
 *     tags:
 *       - Cars
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the car
 *                 example: Honda City
 *               categoriesId:
 *                 type: string
 *                 format: objectId
 *                 description: The category ID of the car
 *                 example: 64f30a7f52a5e2dcb05fa1e9
 *               makeId:
 *                 type: string
 *                 format: objectId
 *                 description: The make ID of the car
 *               modelId:
 *                 type: string
 *                 format: objectId
 *                 description: The model ID of the car
 *               colorId:
 *                 type: string
 *                 format: objectId
 *                 description: The color ID of the car
 *               vehicleTypeId:
 *                 type: string
 *                 format: objectId
 *                 description: The vehicle type ID of the car
 *               realModel:
 *                 type: string
 *                 description: The real model name of the car
 *               homeTestDrive:
 *                 type: boolean
 *                 description: Whether home test drive is available
 *               price:
 *                 type: number
 *                 format: float
 *                 description: The price of the car
 *               priceUnit:
 *                 type: string
 *                 description: The currency unit of the price
 *                 enum: [RS, USD]
 *                 example: RS
 *               transferTax:
 *                 type: number
 *                 format: float
 *                 description: Transfer tax amount
 *               makeYear:
 *                 type: integer
 *                 format: int32
 *                 description: The year the car was made
 *               registerYear:
 *                 type: integer
 *                 format: int32
 *                 description: The year the car was registered
 *               fuel:
 *                 type: string
 *                 description: The fuel type of the car
 *                 enum: [Petrol, Diesel, Electric, CNG, LPG]
 *               kmDriven:
 *                 type: number
 *                 format: float
 *                 description: The distance driven in kilometers
 *               transmission:
 *                 type: string
 *                 description: The transmission type of the car
 *                 enum: [Manual, Automatic, CVT, DCT]
 *               numberOfOwner:
 *                 type: integer
 *                 format: int32
 *                 description: Number of previous owners
 *               insuranceValidity:
 *                 type: string
 *                 format: date
 *                 description: The validity date of the insurance
 *               insuranceType:
 *                 type: string
 *                 description: The type of insurance
 *                 enum: [Third-Party, Comprehensive]
 *               rto:
 *                 type: string
 *                 format: objectId
 *                 description: The RTO ID of the car
 *               location:
 *                 type: string
 *                 description: The location of the car
 *               city:
 *                 type: string
 *                 format: objectId
 *                 description: The city where the car is located
 *               mileage:
 *                 type: number
 *                 format: float
 *                 description: The mileage of the car
 *               groundClearance:
 *                 type: number
 *                 format: float
 *                 description: The ground clearance of the car
 *               seatingCapacity:
 *                 type: integer
 *                 format: int32
 *                 description: The seating capacity of the car
 *               bootSpace:
 *                 type: number
 *                 format: float
 *                 description: The boot space of the car
 *               numberOfSeatingRows:
 *                 type: integer
 *                 format: int32
 *                 description: The number of seating rows in the car
 *               fuelTankCapacity:
 *                 type: number
 *                 format: float
 *                 description: The fuel tank capacity of the car
 *               alloyWheels:
 *                 type: boolean
 *                 description: Whether the car has alloy wheels
 *               frontTyreSize:
 *                 type: string
 *                 description: The size of the front tires
 *               spareWheel:
 *                 type: boolean
 *                 description: Whether the car includes a spare wheel
 *               numberOfDoors:
 *                 type: integer
 *                 format: int32
 *                 description: The number of doors on the car
 *               drivetrain:
 *                 type: string
 *                 description: The drivetrain type of the car
 *               gearBox:
 *                 type: string
 *                 description: The type of gearbox
 *               numberOfGears:
 *                 type: integer
 *                 format: int32
 *                 description: The number of gears
 *               displacement:
 *                 type: number
 *                 format: float
 *                 description: The engine displacement
 *               numberOfCylinders:
 *                 type: integer
 *                 format: int32
 *                 description: The number of cylinders
 *               valve:
 *                 type: string
 *                 description: The type of valves used
 *               limitedSlipDifferential:
 *                 type: boolean
 *                 description: Whether the car has a limited-slip differential
 *               mildHybrid:
 *                 type: boolean
 *                 description: Whether the car is a mild hybrid
 *               isLoan:
 *                 type: boolean
 *                 description: Does you provide loan for client?
 *               turboCharger:
 *                 type: boolean
 *                 description: Whether the car has a turbocharger
 *               clutchType:
 *                 type: string
 *                 description: The type of clutch used
 *               topSpeed:
 *                 type: number
 *                 format: float
 *                 description: The top speed of the car
 *               maxPower:
 *                 type: number
 *                 format: float
 *                 description: The maximum power output of the car
 *               maxTorque:
 *                 type: number
 *                 format: float
 *                 description: The maximum torque of the car
 *               sportMode:
 *                 type: boolean
 *                 description: Whether the car has a sport mode
 *               multiDriverMode:
 *                 type: boolean
 *                 description: Whether the car has multiple driver modes
 *               suspensionFrontType:
 *                 type: string
 *                 description: The type of front suspension
 *                 enum: [MacPherson Strut, Double Wishbone, Multi-Link]
 *               suspensionRearType:
 *                 type: string
 *                 description: The type of rear suspension
 *                 enum: [MacPherson Strut, Double Wishbone, Multi-Link]
 *               steeringAdjustmentType:
 *                 type: string
 *                 description: The type of steering adjustment
 *                 enum: [Tilt, Telescopic, Tilt and Telescopic]
 *               frontBreakType:
 *                 type: string
 *                 description: The type of front brakes
 *                 enum: [Disc, Drum]
 *               rearBreakType:
 *                 type: string
 *                 description: The type of rear brakes
 *                 enum: [Disc, Drum]
 *               steeringType:
 *                 type: string
 *                 description: The type of steering
 *                 enum: [Rack and Pinion, Recirculating Ball]
 *               minimumTurningRadius:
 *                 type: number
 *                 format: float
 *                 description: The minimum turning radius of the car
  *               description:
 *                 type: string
 *                 default: "Discover the best deals on cars, bikes, properties, and more on Six App. Shop by categories with the lowest prices and enjoy a seamless experience."
 *                 description: Description of the car listing
 *               metaTitle:
 *                 type: string
 *                 default: "Six App - Rent & Buy Cars, Bikes, Properties, and More"
 *                 description: Meta title for the car listing
 *               metaKeywords:
 *                 type: string
 *                 default: "Six App, rent car, buy second-hand car, buy second-hand bike, best products, lowest price, used cars, used bikes, second-hand property, electronics, appliances, furniture, books, clothing, jobs, movies, events, free auctions, vacation deals"
 *                 description: Meta keywords for SEO
 *               metaDescription:
 *                 type: string
 *                 default: "Discover the best deals on cars, bikes, properties, and more on Six App. Shop by categories with the lowest prices and enjoy a seamless experience."
 *                 description: Meta description for the car listing
 *               slugUrl:
 *                 type: string
 *                 description: A unique slug for the URL
 *                 example: "six-app-rent-buy-cars-bikes"
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     image:
 *                       type: string
 *                       description: Base64 encoded image data
 *                       example: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
 *                     imageName:
 *                       type: string
 *                       description: The name of the image file
 *                       example: "car1.png"
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

/**-------2
 * @swagger
 * /api/v1/car:
 *   get:
 *     tags:
 *       - Cars
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
 *       - in: query
 *         name: color
 *         schema:
 *           type: string
 *           example:
 *         description:
 *       - in: query
 *         name: Brand
 *         schema:
 *           type: string
 *           example:
 *         description:
 *       - in: query
 *         name: Models
 *         schema:
 *           type: string
 *           example:
 *         description:
 *       - in: query
 *         name: MinPrice
 *         schema:
 *           type: string
 *           example:
 *         description:
 *       - in: query
 *         name: MaxPrice
 *         schema:
 *           type: string
 *           example:
 *         description:
 *       - in: query
 *         name: Year
 *         schema:
 *           type: string
 *           example:
 *         description:
 *       - in: query
 *         name: Seats
 *         schema:
 *           type: string
 *           example:
 *         description:
 *       - in: query
 *         name: Owner
 *         schema:
 *           type: integer
 *           example:
 *         description:
 *       - in: query
 *         name: FuelType
 *         schema:
 *           type: string
 *           example:
 *         description:
 *       - in: query
 *         name: KmsDriven
 *         schema:
 *           type: string
 *           example:
 *         description:
 *       - in: query
 *         name: BodyType
 *         schema:
 *           type: string
 *           example:
 *         description:
 *       - in: query
 *         name: Transmission
 *         schema:
 *           type: string
 *           example:
 *         description:
 *     responses:
 *       200:
 *         description:
 */

/**-------3
 * @swagger
 * /api/v1/car/my-cars:
 *   get:
 *     tags:
 *       - Cars
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
 *           example: 10
 *         description:
 *     responses:
 *       200:
 *         description:
 */

/**------4
/**
 * @swagger
 * /api/v1/car/delete:
 *   delete:
 *     summary: Delete a car
 *     description:
 *     tags:
 *       - Cars
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               carId:
 *                 type: string
 *                 description: give here car id
 *     responses:
 *       '200':
 *         description: 
 */

router.route("/add").post(CarValidator.addCar, checkSellProduct, CmsCarController.addcar);

router.route("/").get(CmsCarController.getAllCar);

router.route("/my-cars").get(CmsCarController.getMyAllCar);

router.route("/delete").delete(CmsCarController.deleteCar);

router.route("/:id").get(CmsCarController.getCarById);

module.exports = router;
