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
    name_list: 'To do list',
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
app.use(express.json())

//Define routes -> redirect to home page when open website
app.get('/', function (req, res) {
    List.find({}).exec().then(findAll => {
        res.render("pages/index.ejs", { listName: findAll[0].name_list, newListItem: findAll[0].items, findAll })
    })
})

//custom route - redirect to the list when clicked on navbar
app.get('/:customListName', function (req, res) {
    const customListNameClicked = req.params.customListName

    // changes
    if (customListNameClicked === 'favicon.ico') {
        return res.sendStatus(204); // Send a No Content response for favicon.ico requests
    }
    List.findOne({ name_list: customListNameClicked }).then(foundList => {
        if (!foundList) {
            //creating new list passing the name on the input
            const newListCreating = new List({
                name_list: customListNameClicked,
                items: [],
            });
            return newListCreating.save()
        } else {
            return foundList
        }
    }).then(newList => {
        return List.find({}).exec()
            .then(findAll => {
                res.render("pages/index.ejs", {listName: newList.name_list, newListItem: newList.items, findAll})
            })
            .catch(error => {
                console.log("Error retrieving documents: ", error)
                res.sendStatus(500);
            })
    })

})

// Add item -> Add new item to the list selected
app.post("/", function (req, res) {
    const itemName = req.body.newItem
    const listName = req.body.list
    List.findOne({ name_list: listName }).then(foundList => {
        if (!foundList) {
            console.log("List not found: ", listName)
            return res.sendStatus(404)
        } 
        /*
        // I want to live the option to create a empty task, case the person wants a empty space between task. It is not a error.
        if(itemName === "" || itemName === " "){
            console.log("item empty: ", itemName)
            return listName;
        }*/
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
        return res.status(500).send("Failed to delete item.")
    }
})

//delete list -> delete list selecting on the navbar
app.post("/deleteList", async function (req, res) {
    const listName = req.body.list
    try {
        const deleteList = await List.deleteOne(
            { name_list: listName },
            { $pull: { name_list: listName } },
            { new: true }
        ).exec()
        if (!deleteList) {
            console.log("List not found: ", listName)
            return res.sendStatus(404)
        }
        console.log("Deleted list: ", deleteList)
        res.redirect("/")
    } catch (error) {
        console.log("Error deleting list: ", error)
        res.redirect("/")
        return res.sendStatus(500)
    }
})

app.post("/downloadList", async (request, response) => {
    const listName = request.body.list

    try {
        const foundList = await List.findOne({ name_list: listName }).exec()
        const item = foundList ? foundList.items : []
        response.json({
            status: "success",
            listItems: item
        })
    } catch (error) {
        console.log("Error: ", error)
        response.status(500).json({
            status: "error",
            message: "Failed to retrieve the list name"
        })
    }

})


//start server
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})

/*-----------------------------------------------------------------------*/