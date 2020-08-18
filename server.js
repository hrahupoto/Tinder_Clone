const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const { request } = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));

app.get("/save_userdetails", function (req, res) {
  insertdata({
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    signupEmail: req.query.signupEmail,
    signupPassword: req.query.signupPassword,
  });
});

app.get("/check_user", function (req, res) {
  var email = req.query.email;
  var password = req.query.password;

  collection_userdetails
  .findOne({ signupEmail: email, signupPassword: password }).then(userDetails=>{
        try {
      if (userDetails.signupEmail === email && userDetails.signupPassword === password) {
          res.send("./user.html");
      }
      else
      {
        res.send("./index.html");
      }
  } catch (error) {
      console.log("error caught");
      res.send("./index.html");
  }
  })
  


});

app.get("/userdetails", function (req, res) {
  res.send(userDetails);
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

const insertdata = ({ firstName, lastName, signupEmail, signupPassword }) => {
  collection_userdetails.insertOne({
    firstName,
    lastName,
    signupEmail,
    signupPassword,
  });
};


      




  
  

  

client.connect((err) => {
  collection_userdetails = client.db("SIT725").collection("userdetails");
});
