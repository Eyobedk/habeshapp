
const paypal = require('paypal-rest-sdk');
const Developer = require('../models/Developer');
const { createToken } = require('../utils/TokenHandler');

require('dotenv').config();
paypal.configure({
  'mode': 'sandbox',
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_CLIENT_SECRET
});
var theName;
var thePhone;
var theDomain;
var theEmail;
var thePass;

exports.registerDeveloper = (req, res) => {
  let { name, phone, domain, email, password } = req.body;

  theName = name;
  thePhone = phone;
  theDomain = domain;
  theEmail = email;
  thePass = password;


  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:3000/success",
      "cancel_url": "http://localhost:3000/cancel"
    },
    "transactions": [{
      "item_list": {
        "items": [{
          "name": "Register fee",
          "sku": "001",
          "price": "8.00",
          "currency": "USD",
          "quantity": 1
        }]
      },
      "amount": {
        "currency": "USD",
        "total": "8.00"
      },
      "description": "a one time fee for registering on habeshapp"
    }]
  };

  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });

}

exports.handleSuccess = (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    "payer_id": payerId,
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "8.00"
      }
    }]
  };

  paypal.payment.execute(paymentId, execute_payment_json, function (error, payment) {
    if (error) {
      console.log("error form payment.execute: " + error.response);
      throw error;
    } else {
      console.log(JSON.stringify(payment));

      const dev = new Developer(theName, thePhone, theDomain, theEmail, thePass, payerId);
      dev.save().then(async ()=>{
        const getID = await Developer.findEmail(theEmail);
        const token = createToken(JSON.stringify(getID[0]["dev_id"]));
        res.cookie('adminToken', token, {
            httpOnly: true,
            maxAge: 40000
          }).send("<h1> DEVELOPER PANNEL </h1>");
      })
    }
  });


}