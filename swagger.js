// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const categoriesWiseDocEntry = [
	{
		name: "Check Server",
		description: "",
	},
	{
		name: "Authentication",
		description: "",
	},
	{
		name: "Profile",
		description: "",
	},
	{
		name: "Categories",
		description: "",
	},
	{
		name: "Vehicle Regularity",
		description: "",
	},
	{
		name: "Cars",
		description: "",
	},
	{
		name: "Bikes",
		description: "",
	},
	{
		name: "Mobiles",
		description: "",
	},
	{
		name: "Movies & Events",
		description: "",
	},
	{
		name: "Furniture & Home Decor",
		description: "",
	},
	{
		name: "Clothing",
		description: "",
	},
	{
		name: "Policy",
		description: "",
	},

	{
		name: "Electronics",
		description: "",
	},
	{
		name: "Property",
		description: "",
	},
	{
		name: "Appliances",
		description: "",
	},
	{
		name: "Free Bid",
		description: "",
	},
	{
		name: "Matrimony",
		description: "",
	},
	{
		name: "Jobs",
		description: "",
	},
	{
		name: "Holiday And Tickets",
		description: "",
	},
	{
		name: "Branded Items",
		description: "",
	},
];

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Six app",
			version: "V1.0.0",
			description: "Powered by six app",
		},
		tags: [...categoriesWiseDocEntry],
		components: {
			securitySchemes: {
				BearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
				},
			},
		},
		security: [
			{
				BearerAuth: [], // Apply the BearerAuth scheme globally
			},
		],
	},
	apis: ["./Routes/*.js"],
	// Path to your API routes
};

const specs = swaggerJsdoc(options);

module.exports = {
	specs,
	swaggerUi,
};
