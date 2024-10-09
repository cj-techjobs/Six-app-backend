const S3Manager = require("../Helpers/AwsHelper");
const { swaggerUi, specs } = require("../swagger");

module.exports = (app) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

	/**
	 * @swagger
	 * /api/v1/:
	 *   get:
	 *     tags:
	 *       - Check Server
	 *     summary:
	 *     responses:
	 *       200:
	 *         description:
	 */
	app.get("/api/v1/", (req, res) => {
		res.status(STATUS_CODES.SUCCESS).send("Welcome to " + process.env.PROJECT_NAME);
	});

	/**
	 * @swagger
	 * /api/v1/test-image:
	 *   post:
	 *     tags:
	 *       - Check Server
	 *     requestBody:
	 *       required: true
	 *       content:
	 *         application/json:
	 *           schema:
	 *             type: object
	 *             properties:
	 *               image:
	 *                 type: string
	 *                 maxLength: 30
	 *                 description:
	 *               imageName:
	 *                 type: string
	 *                 maxLength: 30
	 *                 description:
	 *     summary:
	 *     responses:
	 *       200:
	 *         description:
	 */
	app.post("/api/v1/test-image", async (req, res) => {
		const result = await S3Manager.S3UploadBase64(req.body.image, "test", req.body.imageName);
		res.status(STATUS_CODES.SUCCESS).send(result);
	});

	/**
	 * @swagger
	 * /api/v1/test-get-image:
	 *   get:
	 *     tags:
	 *       - Check Server
	 *     parameters:
	 *       - in: query
	 *         name: path
	 *         schema:
	 *           type: string
	 *         description: give path name
	 *       - in: query
	 *         name: filename
	 *         schema:
	 *           type: string
	 *         description: give filename
	 *     summary:
	 *     responses:
	 *       200:
	 *         description:
	 */
	app.get("/api/v1/test-get-image", async (req, res) => {
		const result = await S3Manager.S3GetImage(`${process.env.AWS_PROJECT_NAME}/${req.query.path}/${req.query.filename}`);
		res.status(STATUS_CODES.SUCCESS).send(result);
	});

	/**
	 * @swagger
	 * /api/v1/delete-image:
	 *   get:
	 *     tags:
	 *       - Check Server
	 *     parameters:
	 *       - in: query
	 *         name: path
	 *         schema:
	 *           type: string
	 *         description: give path name
	 *       - in: query
	 *         name: filename
	 *         schema:
	 *           type: string
	 *         description: give filename
	 *     summary:
	 *     responses:
	 *       200:
	 *         description:
	 */
	app.get("/api/v1/delete-image", async (req, res) => {
		const result = await S3Manager.S3Delete(`${process.env.AWS_PROJECT_NAME}/${req.query.path}/${req.query.filename}`);
		res.status(STATUS_CODES.SUCCESS).send("Deleted");
	});

	app.use("/api/v1/auth", require("./AuthRoute"));

	app.use("/api/v1/user", require("./UserRoute"));

	app.use("/api/v1/cms/category", require("./CmsCategoryRoute"));

	app.use("/api/v1/car", require("./CarRoute"));

	app.use("/api/v1/bike", require("./BikeRoute"));

	app.use("/api/v1/cms/vehicle-regularity", require("./CmsVehicleRegularity"));

	app.use("/api/v1/newcar",require("./NewCarRoutes"));

	app.use("/api/v1/newbike",require("./NewBikeRoutes"));

	// app.use("/api/v1/category", require("./CategoryRoute"));
};
