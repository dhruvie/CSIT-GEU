//jshint esversion:6

const db = require("../model/database.js");

exports.students = function(req, res) {
  db.TimeTable.find({}, function(err, FileList) {
    if (err) {
      console.log("Could not fetch from database");
      res.redirect("/");
    } else {
      res.render("students", {
        FileArray : FileList,
      });
    }
  });
};
