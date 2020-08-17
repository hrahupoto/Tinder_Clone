const MongoClient = require("mongodb").MongoClient;
const express = require("express");
const { request } = require("express");
const app = express();
var userDetails;
const uri =
  "mongodb+srv://Hassan:SIT725@sit725.bketa.mongodb.net/SIT725?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
app.use(express.static(__dirname + "/public"));

app.get("/save_userdetails", function (req, res) {
  

  client.connect((err) => {
    const collection = client.db("SIT725").collection("userdetails");
    collection.insertOne({ 
    firstName: req.query.firstName,
    lastName: req.query.lastName,
    signupEmail: req.query.signupEmail,
    signupPassword: req.query.signupPassword,
    });
   // client.close();
  });
});

app.get("/check_user", function (req, res) {
  var email = req.query.email;
  var password = req.query.password;

  client.connect((err) => {
    var data = client
      .db("SIT725")
      .collection("userdetails")
      .find().toArray(function(err,result){
        result.filter(function(data){

            try {
                if (
                  data.signupEmail === email &&
                  data.signupPassword === password
                ) {
                  userDetails=data;  
                  res.send("./user.html");
                } else {
                  res.send("./index.html");
                }
                //client.close();
              } catch (error) {
                res.send("User does not exist!");
                
              }
        })
          
      })
      
    
  });
  //client.close();
  
});

app.get("/userdetails", function (req, res) {
  res.send(userDetails);
});

app.listen(3000);
console.log("Server running at Port: 3000");
