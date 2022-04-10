const paypal = require('paypal-rest-sdk');
const Developer = require('../models/Developer');
const {createTokenforDev} = require('../utils/TokenHandler');

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

exports.registerDeveloper = async (req, res) => {
  let {
    name,
    phone,
    domain,
    email,
    password
  } = req.body;

  theName = name;
  thePhone = phone;
  theDomain = domain;
  theEmail = email;
  thePass = password;

  let pass = "Email already exists";
  const checkExists = await Developer.findEmail(email);
  if(!(JSON.stringify(checkExists[0]) === undefined)) { res.render('login&signup/developer-register',{pass});return}

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
      dev.save().then(async () => {

        const getID = await Developer.findEmail(theEmail);
        console.log("THE Developer ID"+getID[0]["dev_id"]);
        const token = createTokenforDev(JSON.stringify(getID[0]["dev_id"]));
        console.log("here dev "+ token)
        res.cookie('devToken', token, {
                httpOnly: true,
                maxAge: 600000
        }).redirect(302, '/pannel')

        // res.redirect(302, '/developer-Login')
      })
    }
  });
}

module.exports.Login_Dev = async (req, res, next) => {
  const {
    email,
    password
  } = req.body;


  const devID = await Developer.login(email, password);//returns developer id
  if (!devID) {
    let outErrors = 'enter the correct password and email';
    res.render("login&signup/developer-Login", {
      outErrors
    });
    return
  }
 // res.locals.email = {email:email};
//  console.log("what"+JSON.stringify( res.locals.email))
  const token = createTokenforDev(JSON.stringify(devID));
  "use strict";
  console.log("dev token" + token);
  res.cookie('devToken', token, {
    httpOnly: true,
    maxAge: 6000000 
  }).redirect(302, '/pannel');
}

exports.dev_logout = (req, res) => {
  res.cookie('devToken', '', {
    maxAge: 1
  })
  res.redirect(302, '/Login');
}