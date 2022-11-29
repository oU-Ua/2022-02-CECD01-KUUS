const { serviceId, accessKey, secretKey, sendNumber  } = require('../config/dev');
const requrl = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceId}/messages`
const CryptoJS = require('crypto-js')
var request = require('request')
function sendMessage(content, phoneNumber, callback) {

    var timestamp = Date.now().toString();
    let signature = makeSignature(timestamp,accessKey, secretKey)
    request({
        method: "POST",
        json: true,
        uri: requrl,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'x-ncp-apigw-timestamp': timestamp,
            'x-ncp-iam-access-key': accessKey,
            'x-ncp-apigw-signature-v2': signature
        },
        body: {
            "type": "SMS",
            "contentType": "COMM",
            "countryCode": "82",
            "from": sendNumber,
            "content": "My Flight Trip 비행일정알림서비스입니다.",
            "messages": [
                {
                    "to": phoneNumber,
                    "content": content
                }
            ]
        }
    },callback);
}

function makeSignature(timestamp,accessKey, secretKey) {
    var space = " ";				// one space
    var newLine = "\n";				// new line
    let method = "POST";				// method
    let url = `/sms/v2/services/${serviceId}/messages`	// url (include query string)
    var hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
	hmac.update(method);
	hmac.update(space);
	hmac.update(url);
	hmac.update(newLine);
	hmac.update(timestamp);
	hmac.update(newLine);
	hmac.update(accessKey);

	var hash = hmac.finalize();


    return hash.toString(CryptoJS.enc.Base64);
}

module.exports = {sendMessage}