const express = require('express');
const { request } = require('express');
const app = express();
var userDetails;
app.use(express.static(__dirname + '/public'));

app.get('/save_userdetails', function (req, res) {
    userDetails={
        firstName: req.query.firstName,
        lastName: req.query.lastName,
        signupEmail: req.query.signupEmail,
        signupPassword: req.query.signupPassword,
        }

})

app.get('/check_user', function (req, res) {
    var email=req.query.email;
    var password=req.query.password;

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
    }
    
})


app.listen(3000);
console.log("Server running at Port: 3000");
