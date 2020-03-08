let AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
    console.log(event);
    // let name = event['Name']
    // let email = event['Email']
    // let url = event['URL'];
    let tabledetails = JSON.parse(JSON.stringify(event.Records[0].dynamodb));

    let name = tabledetails.NewImage.Name.S;
    let email = tabledetails.NewImage.Email.S;
    let url = tabledetails.NewImage.URL.S;
    let messagebody = 'Hi'+ ' ' + name + '! your shopping cart is waiting for you. Follow this link to return to your cart' + ' ' + url

    try {
        let data = await ses.sendEmail({
            Source: "kumudika@adroitlogic.com",
            Destination: {
                ToAddresses: [email]
            },
            Message: {
                Subject: {
                    Data: "Your cart is waiting!"
                },
                Body: {
                    Text: {
                        Data: messagebody
                    }
                }
            }
        }).promise();
        console.log(data);

    } catch (err) {
        // error handling goes here
        console.log(err);
    };
    return { "message": "Successfully executed" };
};