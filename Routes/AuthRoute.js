const express = require("express");

const AuthController = new (require("../Controllers/AuthController"))();
const AuthValidator = require("../middleware/validators/AuthValidator");

const Authentication = require("../middleware/authentication");

const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/signIn:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign in with mobile number and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: The user's mobile number
 *               password:
 *                 type: string
 *                 description: The user's password
 *               deviceType:
 *                 type: string
 *                 description: The user's device type
 *               appVersion:
 *                 type: string
 *                 description: The user's app version
 *     responses:
 *       200:
 *         description: Successful response
 */
router.route("/signIn").post(AuthValidator.signIn, Authentication.all, AuthController.signIn);

/**
 * @swagger
 * /api/v1/auth/signUp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Sign in with mobile number and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: The user's mobile number
 *               password:
 *                 type: string
 *                 description: The user's password
 *               deviceType:
 *                 type: string
 *                 description: The user's device type
 *               appVersion:
 *                 type: string
 *                 description: The user's app version
 *     responses:
 *       200:
 *         description: Successful response
 */
/**
 * @swagger
 * /api/v1/auth/signUp:
 *   put:
 *     tags:
 *       - Authentication
 *     summary: Resend Signup verification otp.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: The user's mobile number
 *               userId:
 *                 type: string
 *                 description: The user's Id
 *     responses:
 *       200:
 *         description: Successful response
 */
router.route("/signUp").post(AuthValidator.signUp, Authentication.all, AuthController.signUp).put(AuthValidator.resendSignUpOtp, Authentication.all, AuthController.resendSignUpOtp);

/**
 * @swagger
 * /api/v1/auth/verifyOtp:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify signup otp.
 *     parameters:
 *       - in: header
 *         name: VerifyToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for verifying the request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: The user's mobile number
 *               otp:
 *                 type: string
 *                 description: The user's otp
 *     responses:
 *       200:
 *         description: Successful response
 */
router.route("/verifyOtp").post(AuthValidator.verifyOTP, Authentication.all, AuthController.verifyOtp);

/**
 * @swagger
 * /api/v1/auth/forgotPassword:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: For forgot password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: The user's mobile number
 *     responses:
 *       200:
 *         description: Successful response
 */

/**
 * @swagger
 * /api/v1/auth/forgotPassword:
 *   put:
 *     tags:
 *       - Authentication
 *     summary: Reset password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: The user's mobile number
 *               password:
 *                 type: string
 *                 description: The user's new password
 *     responses:
 *       200:
 *         description: Successful response
 */
router
	.route("/forgotPassword")
	.post(AuthValidator.forgotPassword, Authentication.all, AuthController.forgotPassword)
	.put(AuthValidator.resetPassword, Authentication.all, AuthController.resetPassword);

/**
 * @swagger
 * /api/v1/auth/verify/forgotPasswordOTP:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Reset password.
 *     parameters:
 *       - in: header
 *         name: VerifyFPToken
 *         required: true
 *         schema:
 *           type: string
 *         description: Token for verifying the request
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mobileNumber:
 *                 type: string
 *                 description: The user's mobile number
 *               otp:
 *                 type: string
 *                 description: The user's otp
 *     responses:
 *       200:
 *         description: Successful response
 */
router.route("/verify/forgotPasswordOTP").post(AuthValidator.verifyForgotPasswordOtp, Authentication.all, AuthController.verifyForgetPasswordOtp);

module.exports = router;
