const mongoose = require("mongoose");

const { ENVIRONMENTS } = require("./constants");

const dbName = process.env.DB_NAME;

//BUILD A CONNECTION
mongoose
	.connect(process.env.MONGODB_URL, {
		dbName,
		ssl: true,
		serverSelectionTimeoutMS: 5000,
		socketTimeoutMS: 45000,
	})
	.then(() => {
		const message = `${dbName} database connected successfully :)`;
		console.log(message);
	})
	.catch((err) => console.log(err));

if (process.env.ENVIRONMENT === ENVIRONMENTS.DEVELOPMENT) {
	mongoose.set("debug", true);
}

module.exports.mongoose = mongoose;
