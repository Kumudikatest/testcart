let AWS = require('aws-sdk');
const ses = new AWS.SES();

exports.handler = async (event) => {
    console.log(event);

    let tabledetails = JSON.parse(JSON.stringify(event.Records[0].dynamodb));
    console.log(tabledetails)

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
        return { "Email sent to": name };

    } catch (err) {
        return { "Email sending failed": err };
    };
};