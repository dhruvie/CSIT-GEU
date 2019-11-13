// jshint esversion: 6

const db = require("../model/database");

exports.register = (req, res) => {
  if (req.body.email) {
    let user = new db.NewsletterUser({
      email: req.body.email,
      date: new Date()
    });
    user.save();
    res.render("thankyou");
  } else {
    res.redirect("/");
  }
};

exports.getUnsubscribe = (req, res) =>{
  res.render("unsubscribe");
};

exports.unsubscribe = (req, res) => {
  if (req.body.email) {
    db.findOneAndRemove({
      email: req.body.email
    }, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  res.redirect("/");
};
