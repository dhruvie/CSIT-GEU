// jshint esversion: 6

const db = require("../model/database");
const Mail = require("./sendmail");

exports.register = (req, res) => {
  if (req.body.email) {
    db.NewsletterUser.findOne({
      email: req.body.email
    }, function(err, user) {
      if (!err) {
        if(user){
          console.log("User already a memer");
          res.redirect("/");
        } else{
          let user = new db.NewsletterUser({
            email: req.body.email,
            date: new Date()
          });
          user.save();
          Mail.sendWelcomeMail(req.body.email);
          res.render("thankyou");
        }
      }
    });
  }
};
exports.getUnsubscribe = (req, res) => {
  res.render("unsubscribe");
};

exports.unsubscribe = (req, res) => {
  if (req.body.email) {
    db.NewsletterUser.deleteOne({
      email: req.body.email
    }, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
  res.redirect("/");
};
