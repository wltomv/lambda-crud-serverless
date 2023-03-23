import { v4 as uuidv4 } from "uuid";
import AWS from "aws-sdk";

import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import cors from "@middy/http-cors";

const add = async (event) => {
	const dynamodb = new AWS.DynamoDB.DocumentClient();

	const { image, name, profile } = event.body;
	const id = uuidv4();
	const createdAt = new Date();

	const newUser = {
		id,
		image,
		name,
		profile,
		createdAt,
	};

	await dynamodb
		.put({
			TableName: "User",
			Item: newUser,
		})
		.promise();

	return {
		statusCode: 200,
		body: JSON.stringify(newUser),
	};
};

export const addUser = middy(add).use(httpJsonBodyParser()).use(cors());
