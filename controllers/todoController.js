var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//For making mongoDb work
var options = {
  useMongoClient: true,
};
//Connecting to mlab,mongodb
mongoose.connect('mongodb://test:test@ds239137.mlab.com:39137/todoshadow');
mongoose.Promise = require("bluebird"); //Getting mongodb to work
//Defining database schema
var todoSchema = new mongoose.Schema({
  item : String
});
//passing the database schema to model(data),its our collection(single item in db)!
var Todo = mongoose.model('Todo',todoSchema);
var urlencodedparser = bodyParser.urlencoded({extended:false});
//var data=[{item:'eat heavy'},{item:'exercise'},{item:'complete assignments'}];

module.exports = function(app){

  app.get('/todo',function(req,res) {
    //get data from mongodb and pass it to view
    Todo.find({},function(err,data){
      if(err) throw err;
        res.render('todo',{todos:data}); //todos is collection name in mlab
    });
  });

  app.post('/todo',urlencodedparser,function(req,res) {    //ajax calls this method
        //get data from view and store in mongoDb
        var newTodo = Todo(req.body).save(function(err,data){
          if(err) throw err;
          res.json(data);
        });

  });

  app.delete('/todo/:item',function(req,res){
      //find the item to be deleted in mongodb and remove it
      Todo.find({item:req.params.item.replace(/\-/g," ")}).remove(function(err,data){
         if(err) throw err;
         res.json(data);
      });
    });


};
