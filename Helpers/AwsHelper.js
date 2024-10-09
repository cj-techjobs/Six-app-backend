const AWS = require("aws-sdk");
//GET AWS CONFIG
const credentials = {
	accessKeyId: process.env.AWS_ACCESS_KEY,
	secretAccessKey: process.env.AWS_SECRET_KEY,
	Bucket: process.env.AWS_BUCKET_NAME,
	region: process.env.AWS_REGION,
	signatureVersion: "v4",
};

//S3 CONFIG
const s3 = new AWS.S3(credentials);

module.exports = class S3Manager {
	static async S3GetImage(path) {
		return new Promise((resolve, reject) => {
			try {
				const url = s3.getSignedUrl("getObject", {
					Bucket: process.env.AWS_BUCKET_NAME,
					Key: path,
					Expires: process.env.AWS_SIGNED_URL_EXPIRE_TIME * 60, // time in seconds: e.g. 60 * 5 = 5 mins
				});

				resolve(url);
			} catch (e) {
				console.log("functions3Upload -> e", e);
				reject({ message: "Could not upload image", err: e });
			}
		});
	}

	static async S3Delete(path) {
		return s3.deleteObject(
			{
				Bucket: process.env.AWS_BUCKET_NAME,
				Key: path,
			},
			function (err, data) {
				if (err) {
					console.log("err", err);
				}
				console.log("Successfully deleted image on Amazon S3 ", data);
			}
		);
	}

	static async S3UploadBase64(files, path, filename, isPdf = null) {
		return new Promise((resolve, reject) => {
			try {
				const buf = Buffer.from(files.replace(/^data:.+;base64,/, ""), "base64");
				let type = files.split(";")[0].split(":")[1];

				let data = {
					Bucket: process.env.AWS_BUCKET_NAME,
					Key: `${process.env.AWS_PROJECT_NAME}/${path}/${filename}`,
					Body: buf,
					ContentEncoding: "base64",
					ContentType: isPdf ? "application/pdf" : `${type}`,
				};

				s3.putObject(data, function (err, data) {
					if (err) {
						console.log(err);
						console.log("Error uploading data: ", data);
					} else {
						console.log("successfully uploaded the image!");
						resolve(data);
					}
				});
			} catch (e) {
				reject({ message: "Could not upload image", err: e });
			}
		});
	}
};
