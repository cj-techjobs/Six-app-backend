const express = require("express");
const router = express.Router();
const NewCarValidator = require("../middleware/validators/NewCarValidator");
const NewCmsCarController = new (require("../Controllers/NewCarController"))();
const Authentication = require("../middleware/authentication");
const checkSellProduct = require("../middleware/sellProduct");

//1st pass from---------------------Middleware applying---------------------
router.use(Authentication.userAccess);
router.route("/add").post(NewCarValidator.addCar, checkSellProduct, NewCmsCarController.addNewCar);

router.route("/").get(NewCmsCarController.getAllNewCar);

router.route("/:id").get(NewCmsCarController.getNewCarById);

router.route("/my-newcars").get(NewCmsCarController.getMyAllNewCar);

router.route("/delete").delete(NewCmsCarController.deleteNewCar);

module.exports = router;