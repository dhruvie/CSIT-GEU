//jshint esversion: 6

const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

// let url = "mongodb://localhost/csit";
let url="mongodb+srv://admin-deep:Dhruvj10@cluster0-3nqki.mongodb.net/csit";

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));


mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex : true
});


app.use(passport.initialize());
app.use(passport.session());

var adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name Specified, Check the error!!!"]
  },
  joined: Date,
  canAddUsers: {
    type: Boolean,
    required: [true, "isManager not Specified, Check the error!!!"]
  }
});
adminSchema.plugin(uniqueValidator);
adminSchema.plugin(passportLocalMongoose);
var Admin = new mongoose.model("admin", adminSchema);

passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

var gallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name Specified, Check the error!!!"]
  },
  date: Date
});

var pageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name Specified, Check the error!!!"]
  },
  title: {
    type: String,
    required: [true, "No title Specified, Check the error!!!"]
  },
  content: {
    type: String,
    required: [true, "No content Specified, Check the error!!!"]
  },
  created: Date,
  Published: Date
});

var messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name Specified, Check the error!!!"]
  },
  email: {
    type: String,
    required: [true, "No E-mail Specified, Check the error!!!"]
  },
  sentDate: Date,
  semester: Number
});



var timeTableSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name Specified, Check the error!!!"]
  },
  semester: {
    type: Number,
    required: [true, "No semester Specified, Check the error!!!"]
  },
  date: Date
});

var homeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name Specified, Check the error!!!"]
  },
  heading : {
    type : String,
    required : [true, "No Heading Specified, Check the Error!!!"]
  },
  date: Date,
  content: {
    type: String,
  }
});


var newsletterUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "No Email-id specified, check the entry"],
    unique: [true, "Dublicate email"]
  },

  date : Date,
  content: {
    type: String,
  }
});
newsletterUserSchema.plugin(uniqueValidator);

var SyllabusSchema = new mongoose.Schema({
  name : {
    type: String,
    required : [true, "No name Specified, Check the error!!!"]
  },
  specialisation: String,
  semester: {
    type: Number,
    required : [true, "No semester Specified, Check the error!!!"]
  },
  date : Date,
  content: {
    type: String,
  }
});


var NoticePlainSchema = new mongoose.Schema({
  heading : {
    type : String,
    required : [true, "No Heading Specified, Check the Error!!!"]
  },
  date : Date,
  content : {
    type : String,
  }
});

var NoticePdfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "No name Specified, Check the error!!!"]
  },
  heading : {
    type : String,
    required : [true, "No Heading Specified, Check the Error!!!"]
  },
  date: Date,
  content: {
    type: String,
  }
});




exports.Gallery = mongoose.model("gallery",  gallerySchema);

exports.Page = mongoose.model("page", pageSchema);

exports.Message = mongoose.model("message", messageSchema);

// exports.Admin = Admin;

exports.TimeTable = mongoose.model("timetable", timeTableSchema);

exports.NewsletterUser = mongoose.model("newsletteruser", newsletterUserSchema);

exports.Syllabus = mongoose.model("syllabus", SyllabusSchema);

exports.Home = mongoose.model("home", homeSchema);

exports.NoticePlain = mongoose.model("noticePlain" , NoticePlainSchema );

exports.NoticePdf = mongoose.model("noticePdf" , NoticePdfSchema );
