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

//Define routes -> redirect to home page when open website
app.get('/', function (req, res) {
    List.find({}).exec().then(findAll => {
        res.render("pages/index.ejs", { listName: findAll[0].name_list, newListItem: findAll[0].items, findAll })
    })
})

//custom route - redirect to the list when clicked on navbar
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
        } else {
            List.find({}).exec().then(findAll => {
                res.render("pages/index.ejs", { listName: foundList.name_list, newListItem: foundList.items, findAll })
            })
        }
        //to show all the new information on db mongoose
        List.find({}).exec().then(findAll => {
            console.log("findALl inside the new list created: ", findAll)
            res.render("pages/index.ejs", { listName: findAll[0].name_list, newListItem: findAll[0].items, findAll })
        })
            .catch(error => {
                console.log("Error retrieving documents: ", error)
            })
    })

})

// Add item -> Add new item to the list selected
app.post("/", function (req, res) {
    const itemName = req.body.newItem
    const listName = req.body.list
    List.findOne({ name_list: listName }).then(foundList => {
        console.log("founded list post: ", foundList)
        if (!foundList) {
            console.log("List not found: ", listName)
            return res.sendStatus(404)
        }
        foundList.items.push(itemName)
        foundList.save().then(savedList => {
            console.log("Item added to list: ", savedList)
            res.redirect("/" + listName)
        }).catch(error => {
            console.error("Error saving List: ", error)
            res.status(500).send("Internal Server Error....")
        })
    }).catch(error => {
        console.error("Error finding list: ", error)
        res.status(500).send("Internal Server Error..")
    })
})

//delete item -> delete item from the selected list
app.post("/deleteItem", async function (req, res) {
    const itemName = req.body.itemList
    const listName = req.body.list
    console.log("List of item to be deleted: ", listName)
    console.log("Item deleted: ", itemName)
    
    try {
        const updateList = await List.findOneAndUpdate(
            { name_list: listName },
            { $pull: { items: itemName } },
            { new: true }
        ).exec();
        if (!updateList) {
            console.log("List not found: ", listName)
            return res.sendStatus(404)
        }
        console.log("Updated list: ", updateList)
        res.redirect("/" + listName)
    } catch (error) {
        console.log("Error deleting item: ", error)
        res.redirect("/")
        return res.sendStatus(500)
    }
})

//delete list -> delete list selecting on the navbar


//start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

/*-----------------------------------------------------------------------*/