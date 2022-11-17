import axios from "axios";

const options = {
  method: 'POST',
  url: 'https://api-preprod.phonepe.com/apis/hermes/pg/v1/pay',
  headers: {accept: 'application/json', 'Content-Type': 'application/json'}
};

axios
  .request(options,
    {
        "merchantId": "MERCHANTUAT",
        "merchantTransactionId": "OD620471739210623",
        "merchantUserId": "MUID123",
        "amount": 10000,
        "callbackUrl": "https://mykewlapp.com/callback",
        "mobileNumber": "9999999999",
        "paymentInstrument": {
          "type": "UPI_COLLECT",
          "vpa": "test-vpa@ybl"
       
        }   
      }
    )
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });