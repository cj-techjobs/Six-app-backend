const express = require("express");
const router = express.Router();
const CategoryValidator = require("../middleware/validators/CategoryValidator");
const CmsCategoryController = new (require("../Controllers/CategoryController"))();

/**
 * @swagger
 * /api/v1/cms/category/add:
 *   post:
 *     tags:
 *       - Categories
 *     summary:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: category title
 *     responses:
 *       200:
 *         description:
 */
router.route("/add").post(CategoryValidator.addCategory, CmsCategoryController.addCategory);

/**
 * @swagger
 * /api/v1/cms/category/add/All:
 *   post:
 *     tags:
 *       - Categories
 *     summary:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: array
 *                 description: category titles
 *                 items:
 *                      type: object
 *                      properties:
 *                           title:
 *                               type: string
 *                               description: Category title
 *     responses:
 *       200:
 *         description:
 */
router.route("/add/All").post(CmsCategoryController.addAllCategory);

// /**
//  * @swagger
//  * /api/v1/cms/category/edit:
//  *   patch:
//  *     tags:
//  *       - Categories
//  *     summary:
//  *     responses:
//  *       200:
//  *         description:
//  */
// router.route("/edit").patch(CategoryValidator.addCategory, CmsCategoryController.addCategory);

// /**
//  * @swagger
//  * /api/v1/cms/category/delete:
//  *   delete:
//  *     tags:
//  *       - Categories
//  *     summary:
//  *     responses:
//  *       200:
//  *         description:
//  */
// router.route("/delete").delete(CategoryValidator.addCategory, CmsCategoryController.addCategory);

/**
 * @swagger
 * /api/v1/cms/category/:
 *   get:
 *     tags:
 *       - Categories
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
router.route("/").get(CmsCategoryController.getAllCategory);

router.route("/update").put(CmsCategoryController.updateCategory);

module.exports = router;
