const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const { request } = require("express");
const nodemailer = require("nodemailer");
const app = express();
app.use(express.static(__dirname + "/public"));
var email;
var password;
var firstUser;

app.get("/save_userdetails", function (req, res) {
  insertdata_userdetails({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    signupEmail: req.query.signupEmail,
    signupPassword: req.query.signupPassword,
    profilePhoto: `${"./images/" + req.query.firstName}.jpg`,
  });
});

app.get("/check_user", function (req, res) {
  email = req.query.email;
  password = req.query.password;

  collection_userdetails
    .findOne({ signupEmail: email, signupPassword: password })
    .then((userDetails) => {
      try {
        if (
          userDetails.signupEmail === email &&
          userDetails.signupPassword === password
        ) {
          res.send(userDetails);
        } else {
          res.send("./index.html");
        }
      } catch (error) {
        console.log("error caught");
        res.send("./index.html");
      }
    });
});

app.get("/insert_userLikes", function (req, res) {
  usersLikes = req.query.usersLikes;
  console.log("I am here")
  insertdata_userslikes({
    usersLikes,
  });
});

app.get("/check_userlikes", function (req, res) {
  collection_usersLikes.findOne({},{usersLikes:1}).then((users) => {
    
    if(users==null){
      
      res.send("null");
    }else{
      console.log(users.usersLikes[6].count)
      res.send(users);
    }
    
  });
});

app.get("/delete_userlikes", function (req, res) {
  collection_usersLikes.remove({},{usersLikes:1})
});

app.get("/userdetails", function (req, res) {
  collection_userdetails
    .findOne({ signupEmail: email, signupPassword: password })
    .then((userDetails) => {
      res.send(userDetails);
    });
});

app.listen(3000);
console.log("Server running at Port: 3000");

//DATABASE MONGODB
const uri =
  "mongodb+srv://Hassan:SIT725@sit725.bketa.mongodb.net/SIT725?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  seUnifiedTopology: true,
});

let collection_userdetails;
let collection_usersLikes;

const insertdata_userdetails = ({
  firstName,
  lastName,
  signupEmail,
  signupPassword,
  profilePhoto,
}) => {
  collection_userdetails.insertOne({
    firstName,
    lastName,
    signupEmail,
    signupPassword,
    profilePhoto,
  });
};

const insertdata_userslikes = ({ usersLikes }) => {
  collection_usersLikes.insertOne({
    usersLikes,
  });
};

client.connect((err) => {
  collection_userdetails = client.db("SIT725").collection("userdetails");
  collection_usersLikes = client.db("SIT725").collection("usersLikes");
});
