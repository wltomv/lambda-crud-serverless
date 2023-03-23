import AWS from "aws-sdk";
import middy from "@middy/core";
import cors from "@middy/http-cors";

const getUsers = async (event) => {
	const dynamodb = new AWS.DynamoDB.DocumentClient();
	const result = await dynamodb.scan({ TableName: "User" }).promise();

	const users = result.Items;

	return {
		statusCode: 200,
		body: JSON.stringify(users),
	};
};

export const handler = middy(getUsers).use(cors());
