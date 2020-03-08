let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    console.log(event);
    let name = event['Name']
    let email = event['Email']
    let url = event['URL']
    
    try {
        let data = await ddb.put({
            TableName: "testhistory",
            Item: {
                Name: name,
                Email: email,
                URL: url
            }
        }).promise();
        console.log(data);

    } catch (err) {
        // error handling goes here
        console.log(err);
    };

    return { "message": "Successfully executed" };
};