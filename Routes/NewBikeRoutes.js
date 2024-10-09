const express = require("express");
const router = express.Router();
const NewBikeValidator = require("../middleware/validators/NewBikeValidator"); // Update with the correct path for bike validation
const NewBikeController = new (require("../Controllers/NewBikeController"))(); // Update with the correct controller
const Authentication = require("../middleware/authentication");
const checkSellProduct = require("../middleware/sellProduct");

// Middleware applying
router.use(Authentication.userAccess);

router.route("/add").post(NewBikeValidator.addNewBike, checkSellProduct, NewBikeController.addNewBike);

router.route("/add/all").post(NewBikeValidator.addNewBike, checkSellProduct, NewBikeController.addAllNewBike);

router.route("/").get(NewBikeController.getAllNewBike);

router.route("/:id").get(NewBikeController.getNewBikeById)

router.route("/my-newbikes").get(NewBikeController.getMyAllNewBike);

router.route("/delete").delete(NewBikeController.deleteNewBike);

module.exports = router;
