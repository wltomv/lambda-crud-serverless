import AWS from "aws-sdk";
import middy from "@middy/core";
import cors from "@middy/http-cors";
import { v4 as uuidv4 } from "uuid";

const bucket = "ecys-users-bucket";
const s3 = new AWS.S3({
	apiVersion: "2006-03-01",
	signatureVersion: "v4",
});
const createPostUrl = async (event) => {
	const prePath = "ecysdemo";
	const { filename } = event.pathParameters;
	const extension = filename.split(".")[1];
	const id = uuidv4();
	const Key = `${prePath}${id}.${extension}`;

	const params = {
		Bucket: bucket,
		ContentType: `image/${extension}`,
		Key,
		Expires: 360,
		ACL: "public-read",
	};

	var res = await s3.getSignedUrlPromise("putObject", params);
	console.log(res);

	return {
		statusCode: 200,
		body: JSON.stringify({
			url: res,
			Key,
		}),
	};
};

export const handler = middy(createPostUrl).use(cors());
