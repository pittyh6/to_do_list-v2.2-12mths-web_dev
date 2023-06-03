/*jshint esversion: 6 */

/* const express = require('express');*/
import express from 'express'
const app = express();
/*const bodyParser = require('body-parser');*/
import bodyParser from 'body-parser';

/*-----------------------DATABASE-------------------------------------*/
//connect mongodb with mongoose
/*const mongoose = require('mongoose')*/
import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true, useUnifiedTopology: true})
//import model
import List from './model/List.js'


//create new listdb
const todoList = new List({
    name_list: 'to do list',
    items:[
        'buy food', 'Go to the bank',
    ]
});
//await todoList.save()

//find first element
const findOne = await List.findOne({})
console.log(findOne)
//find all elements
const findAll = await List.find({})
console.log(findAll)
//return all lists by the name of the list
const findAllByNameList = await List.find({name_list:"to do list"})
console.log(findAllByNameList);
//return a specific field from db (name_list)
const findFieldName = await List.find({}).select('name_list -_id')
console.log(findFieldName)


/*---------------------------------------------------------------------*/





/*------------------------------ROOT-------------------------------------*/
//set the view Engine to EJS
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))

//Server Static Files
app.use(express.static('public'))

//Define routes
app.get('/',function(req,res){
    //res.sendFile(__dirname + './views/pages/index.ejs')
    res.render("pages/index.ejs", {findFieldName})
})

//start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

/*-----------------------------------------------------------------------*/