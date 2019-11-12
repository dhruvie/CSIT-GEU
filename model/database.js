//jshint esversion: 6

const mongoose = require("mongoose");

let url = "mongodb://localhost/csit";

const db = mongoose.connect(url, {
  useNewUrlParser : true,
  useUnifiedTopology: true
});

var gallerySchema = new mongoose.Schema({
  name : {
    type : String,
    required : [true, "No name Specified, Check the error!!!"]
  },
  date : Date
});

var pageSchema = new mongoose.Schema({
  name: {
    type : String,
    required : [true, "No name Specified, Check the error!!!"]
  },
  title: {
    type : String,
    required : [true, "No title Specified, Check the error!!!"]
  },
  content: {
    type : String,
    required : [true, "No content Specified, Check the error!!!"]
  },
  created:Date,
  Published:Date
});

var messageSchema= new mongoose.Schema({
  name: {
    type : String,
    required : [true, "No name Specified, Check the error!!!"]
  },
  email: {
    type : String,
    required : [true, "No E-mail Specified, Check the error!!!"]
  },
  sentDate:Date,
  semester:Number
});

var adminLoginSchema= new mongoose.Schema({
  name: {
    type : String,
    required : [true, "No name Specified, Check the error!!!"],
    unique : [true, "E-mail already exists in Database"]
  },
  email: {
    type : String,
    required : [true, "No E-mail Specified, Check the error!!!"]
  },
  password: {
    type : String,
    required : [true, "No password Specified, Check the error!!!"]
  },
  joined:Date,
  isManager: {
    type : Boolean,
    required : [true, "isManager not Specified, Check the error!!!"]
  }
});

var timeTableSchema = new mongoose.Schema({
  name : {
    type: String,
    required : [true, "No name Specified, Check the error!!!"]
  },
  semester: {
    type: Number,
    required : [true, "No semester Specified, Check the error!!!"]
  },
  date : Date
});

exports.Gallery = mongoose.model("gallery",  gallerySchema);

exports.Page = mongoose.model("page",pageSchema);

exports.Message = mongoose.model("message",messageSchema);

exports.AdminLogin = mongoose.model("adminlogin",adminLoginSchema);

exports.TimeTable = mongoose.model("timetable", timeTableSchema);
