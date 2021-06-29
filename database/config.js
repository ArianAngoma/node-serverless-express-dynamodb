const dynamoose = require("dynamoose");
const serverless = require("serverless-http");

const dbConnection = async () => {
    try {
        const dynamodb = new dynamoose.aws.sdk.DynamoDB({
            "accessKeyId": process.env.AWS_ACCESS_KEY_ID_PERSONAL,
            "secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY_PERSONAL,
            "region": process.env.AWS_REGION_PERSONAL
        });
        await dynamoose.aws.ddb.set(dynamodb);
        console.log('Base de datos online');
    } catch (error) {
        console.log(error)
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}

module.exports = {
    dbConnection
}