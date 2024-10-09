// PARSE .ENV
require("dotenv").config();
require("./Ai/RemoveSexualContent.model");
const actuator = require("express-actuator");
// FOR SERVER
// CHECK WITH PROTOCOL TO USE
const http = require("http");
const cluster = require("cluster");
const os = require("os");
const fs = require("fs");

const express = require("express"); // NODE FRAMEWORK
const bodyParser = require("body-parser"); // TO PARSE POST REQUEST
const cors = require("cors"); // ALLOW CROSS ORIGIN REQUESTS
const { default: rateLimit } = require("express-rate-limit");

// ---------------------------    SERVER CONFIGS ----------------------------------
// SSL CONFIG
const port = process.env.PORT || 9000;
const app = express();
const server = http.createServer(app);

// ------------------------    OVERWRITE LOG FUNCTION TO WRITE CONSOLE.LOG IN LOG FILE    -------------------
let path = require("path");
let moment = require("moment");
let logDirectory = path.join(__dirname, "./Logs");
let rfs = require("rotating-file-stream");
let accessLogStream;

try {
	fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
	// accessLogStream = rfs(moment(new Date()).format('YYYY MMMM Do') + '.log', {
	accessLogStream = rfs.createStream(moment(new Date()).format("DD-MM-YYYY") + ".log", {
		interval: "1d", // rotate daily
		path: logDirectory,
	});
} catch (err) {
	// Handle the error here.
	console.log(err);
}

let util = require("util");
let log_stdout = process.stdout;
console.log("__dirname", __dirname);
console.log("logDirectory", logDirectory);
console.log = function () {
	const currentDate = moment(new Date());
	let filePath = __dirname + "/Logs/" + currentDate.format("DD-MM-YYYY") + ".log";

	if (fs.existsSync(logDirectory)) {
		if (!fs.existsSync(filePath)) {
			rfs.createStream(filePath);
		}
	} else {
		fs.mkdirSync(logDirectory);
	}

	setTimeout(() => {
		let log_file = fs.createWriteStream(filePath, { flags: "a" });

		log_file.write(`CONSOLE.LOG (${currentDate.format("hh:mm:ss")}): ` + util.format.apply(null, arguments) + "\n");
		log_stdout.write(util.format.apply(null, arguments) + "\n");
	}, 100);
};

// GLOBAL SETTINGS FILES
require("./Configs/globals");

// --------------------------   LANGUAGE    ----------------------------------------
// Define unique Key - pair in Locales / Messages.js
// It will add entry in respective json files
/* By default language is set to english  User can change by  passing  language in
	Header :
	Accept-Language : 'en'
	Query : 
	url?lang=en
*/
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
	message: "Too many requests from this IP, please try again after 15 minutes",
});

const language = require("i18n");
language.configure({
	locales: ["en"],
	defaultLocale: "en",
	autoReload: true,
	directory: __dirname + "/Locales",
	queryParameter: "lang",
	objectNotation: true,
	syncFiles: true,
});

// ------------------------      GLOBAL MIDDLEWARE -------------------------
app.use(limiter);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "Logs")));

app.use(actuator({ infoGitMode: "full" }));

// Increase the payload size limit to 50MB for JSON and URL-encoded requests
app.use(express.json({ limit: "50mb" })); // Handles application/json
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Handles URL-encoded data

// Body Parser specific setup (if you need to support encrypted-json or backward compatibility)
// You don't need this if express.json() is already handling it
app.use(
	bodyParser.json({
		limit: "50mb",
		type: ["application/json", "application/encrypted-json"],
	})
);
app.use(bodyParser.urlencoded({ extended: false })); // ALLOW URL ENCODED PARSER
app.use(cors()); // ALLOWED ALL CROSS ORIGIN REQUESTS
app.use(express.static(__dirname + "/Assets")); // SERVE STATIC IMAGES FROM ASSETS FOLDER
app.use(express.static(__dirname + "/Logs")); // SERVE STATIC IMAGES FROM ASSETS FOLDER
app.use(language.init); // MULTILINGUAL SETUP
app.set("view engine", "ejs"); //Set ejs view engine
app.set("views", __dirname + "/Views");

app.use("/images", express.static(path.join(__dirname, "Assets/Images/Users")));

// ------------------------    RESPONSE HANDLER    -------------------
app.use((req, res, next) => {
	const ResponseHandler = require("./Configs/responseHandler");
	const userAgent = req.headers["user-agent"];
	// const ipAddress = req.headers["x-forwarded-for"] || req.connection.IP || "Unknown IP";

	// Basic parsing of User-Agent for browser info
	const browserInfo = (userAgent.match(/(Chrome|Firefox|Safari|MSIE|Trident|Edge|Opera)/) || [])[0] || "Unknown";
	console.log("Request by user =>", { url: req.url, browserInfo });
	console.log("===============================================================");
	res.handler = new ResponseHandler(req, res);
	next();
});

// --------------------------    ROUTES    ------------------
const appRoutes = require("./Routes");
const chalk = require("chalk");
appRoutes(app);

// --------------------------    GLOBAL ERROR HANDLER    ------------------
app.use((err, req, res, next) => {
	console.log(err);
	if (res.headersSent) {
		return next(err);
	}
	if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
		// This handles malformed JSON errors
		return res.status(400).json({ message: "JSON data is not proper" });
	}
	res.handler.serverError(err);
});

// --------------------------    START SERVER    ---------------------
server.listen(port, () => {
	console.log(chalk.bold.cyanBright(`\nServer started on ${chalk.white.bold(port)} :) \n`));
});
