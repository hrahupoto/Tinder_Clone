const express = require('express');
const { request } = require('express');
const app = express();



app.use(express.static(__dirname + '/public'));

// app.get('/signup', function (req, res) {
//     let userdetails = req.query.userdetails;
//     console.log(userdetails);
//     //res.send('Hello World')
// })




app.listen(3000);
console.log("Server running at Port: 3000");
