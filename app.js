//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");
const mongoose= require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/27017todolistDB",{useNewUrlParser: true});

// membuat schema
var itemSchema ={
  name: String,
};
//membuat model 
var Item= mongoose.model("Item",itemSchema);
const Item1= new Item({
  name:"welcome to my todo list",
})
const Item2= new Item({
  name:"hello ",
})
const Item3= new Item({
  name:"bonjour",
})
//buat array 
const defaultItem=[Item1,Item2,Item3];
Item.insertMany(defaultItem,function(err){
  if(err){
    console.log(err);
  }
  else{
    console.log("successfully add item to database");
  }
})


app.get("/", function(req, res) {

//untuk merender apa yang ada di database
  Item.find({},function(result,err){
    res.render("list", {newListItems: result});  
  })

  

});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req,res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req, res){
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
