//jshint esversion:8


const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const multer = require("multer");
const upload = multer({
  dest: __dirname + "/public/uploads"
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

app.get("/syllabus", function(req, res) {
  res.render("syllabus");
});

app.get("/timetable", function(req, res) {
  res.render("timetable");
});

app.get("/students", function(req, res) {
  res.render("students");
});

app.get("/notices", function(req, res) {
  res.render("notices");
});


app.get("/admin", function(req, res) {
  res.render("admin/login");
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
app.post("/admin/editpost", EditPost.editPost);

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
