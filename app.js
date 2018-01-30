var express = require('express');
var todoController = require('./controllers/todoController');

var app=express();

//Set ejs as templating engine
app.set('view engine','ejs');

//Include static files
app.use(express.static('./public'));

//fire Controller
todoController(app);
//Listening to port 3000
app.listen(3000);
console.log('Node server listening to port:3000');
