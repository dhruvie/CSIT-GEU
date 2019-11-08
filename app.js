//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/",function(req,res){
  res.render("index");
});

app.get("/visionandmission",function(req,res){
  res.render("vision-mission");
});

app.get("/disclaimer",function(req,res){
  res.render("disclaimer");
});

app.get("/contact", function(req, res){
  res.render("contact");
});

app.get("/syllabus", function(req, res){
  res.render("syllabus");
});

app.get("/timetable", function(req, res){
  res.render("timetable");
});

app.get("/students", function(req, res){
  res.render("students");
});

app.get("/notices", function(req, res){
  res.render("notices");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
