let baseUrl = 'https://api-m.sandbox.paypal.com';
const base64 = require('base-64');

let clientId = 'Ab6urYtVmB03FIxrUjJNkISe3bd7kFcZInd9xKeQ2MYARMF-wRkXD8m5OuVnvnPSN-s8ELKKqEackJA7';
let secretKey = 'EHlWxCXIwRDVjaKSofog6vRQVoHVbDtXly6FtDYxUv_Ee5hL9qap5bEInX3C7y1J5eybg54u19GSIe0Y';

const generateToken = () => {
  var headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  headers.append("Authorization", "Basic " + base64.encode(`${clientId}:${secretKey}`));

  var requestOptions = {
    method: 'POST',
    headers: headers,
    body: 'grant_type=client_credentials',
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + '/v1/oauth2/token', requestOptions).then(response => response.text()).then(result => {
      const { access_token } = JSON.parse(result);
      resolve(access_token);
    }).catch(error => {
      reject(error);
    });
  });
};

const createOrder = (token = '', orderDetail) => {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderDetail)
  };

  return new Promise((resolve, reject) => {
    fetch(baseUrl + '/v2/checkout/orders', requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log("result print", result);
        const res = JSON.parse(result);
        resolve(res);
      })
      .catch(error => {
        console.log("error raised", error);
        reject(error);
      });
  });
};

const capturePayment = (id = '', token = '') => {
  var requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  };

  return new Promise((resolve, reject) => {
    fetch(`${baseUrl}/v2/checkout/orders/${id}/capture`, requestOptions)
      .then(response => response.text())
      .then(result => {
        const res = JSON.parse(result);
        resolve(res);
      })
      .catch(error => {
        console.log("error raised", error);
        reject(error);
      });
  });
};

export default {
  generateToken,
  createOrder,
  capturePayment
};
