import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
      noteId: event.pathParameters.id, // The id of the note from the path
    },
  };

  await dynamoDb.delete(params);

  return { status: true };
});

// secure ourselves apis
// aws cognito-idp admin-confirm-sign-up \
//   --region us-east-1 \
//   --user-pool-id us-east-1_XDmQStqsb \
//   --username admin@example.com
//
//
//   aws cognito-idp sign-up \
//   --region us-east-1 \
//   --client-id 40spi4kh4ek39fv8mclnc28af6 \
//   --username admin@example.com \
//   --password Passw0rd!
//
//   npx aws-api-gateway-cli-test --username admin@example.com --password Passw0rd! --user-pool-id us-east-1_XDmQStqsb --app-client-id 40spi4kh4ek39fv8mclnc28af6 --cognito-region us-east-1 --identity-pool-id us-east-1:fe5c4770-bd3a-4cb9-9b6b-95764356818d --invoke-url https://eqhnagz5qj.execute-api.us-east-1.amazonaws.com --api-gateway-region us-east-1 --path-template /notes --method POST --body "{\"content\":\"hello world\",\"attachment\":\"hello.jpg\"}"
