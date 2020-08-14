const express = require('express');
const app = express();


app.use(express.static(__dirname + '/public'));

//basic end point
// app.get('/', function (req, res) {
//     console.log("I have been hit");
//   res.send('Hello World')
// })

app.listen(3000);
console.log("Server running at Port: 3000");