const paypal = require('paypal-rest-sdk');
const Developer = require('../../models/Developer');
const {
  createTokenforDev
} = require('../../utils/TokenHandler');
const bcrypt = require('bcrypt');
const {BlackList} = require('../../models/Admin');

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

  // const re = /^(([^<>(),;:\s@"]))/;


  // if(re.test(String(domain).toLowerCase()) == false){
  //   res.render('developer/Auth/developer-register',{prevent:"fill the approprate data"});
  //   return
  // }

  theName = name;
  thePhone = phone;
  theDomain = domain;
  theEmail = email;
  thePass = password;

  let pass = "Email already exists";
  const checkExists = await Developer.findEmail(email);
  if (!(JSON.stringify(checkExists[0]) === undefined)) {
    res.render('developer/Auth/developer-register', {
      pass
    });
    return
  }

  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "redirect_urls": {
      "return_url": "http://localhost:4000/success",
      "cancel_url": "http://localhost:4000/cancel"
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
      res.send('<h2> There is a problem with your payment proceess </h2><br><h5>Hint: please try again <h5/>');
      throw error;
    } else {

      const dev = new Developer(theName, thePhone, theEmail, thePass, payerId);
      dev.save().then(async () => {

        const getID = await Developer.findEmail(theEmail);
        console.log("THE Developer ID" + getID[0]["dev_id"]);
        const token = createTokenforDev(JSON.stringify(getID[0]["dev_id"]));
        console.log("here dev " + token)
        res.cookie('devToken', token, {
          httpOnly: true,
          maxAge: 600000
        }).redirect(302, '/pannel')

      })
    }
  });
}

module.exports.Login_Dev = async (req, res, next) => {
  const {
    email,
    password
  } = req.body;
 

  const dev = await Developer.findEmail(email);
  const TheDev = new BlackList(dev[0].dev_id);
  const isBadDeveloper = await TheDev.checkDeveloperIsBlackListed();
  console.log("isBadDeveloper")
  console.log(isBadDeveloper.length)
  if (isBadDeveloper.length == 0) {
    if (!dev) {
      let outErrors = 'enter the correct password and email';
      res.render("developer/Auth/developer-Login", {
        outErrors
      });
      return
    }

    const flag = await bcrypt.compare(password, dev[0].dev_password).then(function (result) {
      // result == true
      console.log("the devloper result" + result)
      if (!result) {
        const Ierror = "Enter the correct email and password";
        res.render('developer/Auth/developer-Login', {
          Ierror
        });
        return 1;
      }
    });
    if(flag ==1)
    {
      return;
    }

    const token = createTokenforDev(JSON.stringify(dev[0].dev_id));
    res.cookie('devToken', token, {
      httpOnly: true,
      maxAge: 6000000
    }).redirect(302, '/pannel');
  } else {
    res.render('developer/Auth/developer-Login', {
      banMessage: "Due to Your recent malicious Activies you have Been baned from the platform"
    })
  }
}

exports.dev_logout = (req, res) => {
  res.cookie('devToken', '', {
    maxAge: 1
  })
  res.redirect(302, 'developer-Login');
}