const express = require("express");
const router = express.Router();

const UserController = new (require("../Controllers/UserController"))();
const UserValidator = require("../middleware/validators/UserValidator");

const Authentication = require("../middleware/authentication");

//1st pass from---------------------Middleware applying---------------------
router.use(Authentication.userAccess);

//2nd use------------
/**
 * @swagger
 * /api/v1/user/profile:
 *   get:
 *     tags:
 *       - Profile
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
/**
 * @swagger
 * /api/v1/user/profile:
 *   put:
 *     tags:
 *       - Profile
 *     summary: User profile update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *               fullName:
 *                 type: string
 *                 description: The user's full name
 *               birthDate:
 *                 type: string
 *                 description: The user's birth date
 *     responses:
 *       200:
 *         description:
 */
router.route("/profile").get(UserController.getProfile).put(UserValidator.updateProfileValidator, UserController.updateProfile);

/**
 * @swagger
 * /api/v1/user/logout:
 *   delete:
 *     tags:
 *       - Profile
 *     summary:
 *     responses:
 *       200:
 *         description:
 */
router.route("/logout").delete(UserController.logout);

module.exports = router;
