/*jshint esversion: 6 */

//const express = require('express');
import express from 'express'
const app = express();
//const bodyParser = require('body-parser');
import bodyParser from 'body-parser';

/*-----------------------------DATABASE---------------------------------*/
//connect mongodb with mongoose
//const mongoose = require('mongoose')
import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true, useUnifiedTopology: true })
//import model
import List from './model/List.js'
//const List = require('./model/List.js');


//create new listdb
const todoList = new List({
    name_list: 'Study',
    items: [
        'Write English', 'Grammar', 'Reading book',
    ]
});
//await todoList.save()


//find all elements
const findAll = await List.find({})
export { findAll }


/*---------------------------------------------------------------------*/





/*------------------------------ROOT-------------------------------------*/
//set the view Engine to EJS
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))

//Server Static Files
app.use(express.static('public'))

//Define routes
app.get('/', function (req, res) {
    // res.render("pages/index.ejs", {listName: findAll[0].name_list, newListItem: findAll[0].items, findAll })
    List.find({}).exec().then(findAll => {
        res.render("pages/index.ejs", {listName: findAll[0].name_list, newListItem: findAll[0].items, findAll})
    })
})

//custom route
app.get('/:customListName', function (req, res) {
    const customListNameClicked = req.params.customListName
    List.findOne({ name_list: customListNameClicked }).then(foundList => {
        if (customListNameClicked === 'favicon.ico') {
            return res.sendStatus(204); // Send a No Content response for favicon.ico requests
        } if (!foundList) {
            console.log('no list found', customListNameClicked)
            //creating new list passing the name on the input
            const newListCreating = new List({
                name_list: customListNameClicked,
                items: [],
            });
            newListCreating.save()
            //to show all the new information on db mongoose
            List.find({}).exec().then(findAll => {
                res.render("pages/index.ejs", {listName: findAll[0].name_list, newListItem: findAll[0].items, findAll})
            })
            .catch(error => {
                console.log("Error retrieving documents: ", error)
            })
        } else {
            //res.render("pages/index.ejs", { listName: foundList.name_list, newListItem: foundList.items, findAll })
            List.find({}).exec().then(findAll => {
                res.render("pages/index.ejs", {listName: foundList.name_list, newListItem: foundList.items, findAll })
            })
        }
    })

})

//start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

/*-----------------------------------------------------------------------*/