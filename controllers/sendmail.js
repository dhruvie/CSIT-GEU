// jshint esversion: 6
require("dotenv").config();
const db = require("../model/database");
const nodemailer = require("nodemailer");

exports.send = function() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSWORD
    }
  });

  db.NewsletterUser.find({}, function(err, usersinfo) {
    let users = "test@gmail.com";
    usersinfo.forEach(function(userinfo) {
      users += ", " + userinfo.email;

    });

    var mailOptions = {
      from: process.env.EMAIL_ID,
      to: users,
      subject: 'New Notice from Department of CSIT GEU',
      text: 'This is just some testing messege.'
    };

    //sending mails
    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  });
};

exports.sendWelcomeMail = function(email_id){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_ID,
      pass: process.env.PASSWORD
    }
  });

  var mailOptions = {
    from: process.env.EMAIL_ID,
    to: email_id,
    subject: 'Succefully Subscribed Department of CSIT GEU',
    html: "<h1>Thank you </h1><h3>You have succefully subscribed to our Newsletter</h3><br> <p>You will now get regular updates.</p>"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

};
