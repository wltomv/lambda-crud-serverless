import AWS from "aws-sdk";
import middy from "@middy/core";
import cors from "@middy/http-cors";

const deleteUser = async (event) => {
	const dynamodb = new AWS.DynamoDB.DocumentClient();
	const { id } = event.pathParameters;

	await dynamodb
		.delete({
			TableName: "User",
			Key: {
				id,
			},
		})
		.promise();

	return {
		statusCode: 200,
		body: JSON.stringify({
			message: "User deleted",
		}),
	};
};

export const handler = middy(deleteUser).use(cors());
