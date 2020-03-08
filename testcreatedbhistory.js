let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        let data = await ddb.put({
            TableName: "testhistory",
            Item: {
                Name: "Kumudika",
                Email: "kumudika@adroitlogic.com",
                URL: "https://www.google.lk/"
            }
        }).promise();
        console.log(data);

    } catch (err) {
        // error handling goes here
        console.log(err);
    };

    return { "message": "Successfully executed" };
};