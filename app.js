//jshint esversion:6
require("dotenv").config();

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require("multer");



const upload = multer({
  dest: __dirname + "/public/uploads"
});
const uploadFile = multer({
  dest: __dirname + "/public/uploads/pdfs"
});

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.render("index");
});

app.get("/visionandmission", function(req, res) {
  res.render("vision-mission");
});

app.get("/disclaimer", function(req, res) {
  res.render("disclaimer");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

const Syllabus= require(__dirname + "/controllers/syllabus");
app.get("/syllabus", Syllabus.syllabus);

const TimeTable = require(__dirname + "/controllers/timetable");
app.get("/timetable", TimeTable.timetables);

const Student = require(__dirname + "/controllers/student");
app.get("/students", Student.students);

app.get("/notices", function(req, res) {
  res.render("notices");
});

const Newsletter = require(__dirname + "/controllers/newsletter");
app.post("/register", Newsletter.register);

app.get("/unsubscribe", Newsletter.getUnsubscribe);
app.post("/unsubscribe", Newsletter.unsubscribe);


app.get("/admin/register", function(req, res){
  res.render("admin/register");
});

const AdminRegister = require(__dirname + "/controllers/adminregister");
app.post("/admin/register", AdminRegister.register);

app.get("/admin/login",function(req,res){
  res.render("admin/login");
});

// const AdminLogin = require(__dirname + "/controllers/adminlogin");
app.post("/admin/login", function(req, res){
  var admin = {
    username : req.body.email,
    password : req.body.password
  };
  req.login(admin, function(err){
    if(err){
      console.log(err);
      res.redirect("/admin/login");
    } else{
      console.log("hurrey");
    }
  });
});

app.get("/admin/index", function(req, res) {
  res.render("admin/home");
});

app.get("/admin/pages", function(req, res) {
  res.render("admin/pages");
});

app.get("/admin/users", function(req, res) {
  res.render("admin/users");
});

app.get("/admin/posts", function(req, res) {
  res.render("admin/posts");
});

const EditGallery = require(__dirname + "/controllers/editgallery");
app.get("/admin/editgallery", EditGallery.gallery);

app.post("/admin/editgallery/uploads", upload.single("photo"), EditGallery.uploadImage);

app.post("/admin/editgallery/deleteImage", EditGallery.delete);

app.post("/admin/editgallery/updateImage", upload.single("photo"), EditGallery.update);

const Gallery = require(__dirname + "/controllers/gallery");
app.get("/gallery", Gallery.gallery);

const EditPost = require(__dirname + "/controllers/editpost");
app.get("/admin/editpost", EditPost.editPost);

app.post("/admin/editpost", EditPost.editPost);

const SendMail = require(__dirname + "/controllers/sendmail");
app.post("/admin/sendmail", SendMail.send);
app.post("/admin/editpost/delete/pdf", EditPost.deleteFile);

app.post("/admin/editpost/uploads/pdf",uploadFile.single("myFiles"), EditPost.uploadFile);

const EditSyllabus= require(__dirname+ "/controllers/editsyllabus");
app.get("/admin/editsyllabus",EditSyllabus.editsyllabus);
app.post("/admin/editsyllabus",EditSyllabus.editsyllabus);

app.post("/admin/editsyllabus/uploads/pdf",uploadFile.single("myFiles"), EditSyllabus.uploadFile);

app.post("/admin/editsyllabus/delete/pdf", uploadFile.single("myFiles"), EditSyllabus.deleteFile);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
