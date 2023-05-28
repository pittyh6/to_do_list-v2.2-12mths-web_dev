/*jshint esversion: 6 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

//connect mongodb with mongoose
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true})


//set the view Engine to EJS
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))

//Server Static Files
app.use(express.static('public'))

//Define routes
app.get('/',function(req,res){
    //res.sendFile(__dirname + './views/pages/index.ejs')
    res.render("pages/index.ejs")
})

//start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})