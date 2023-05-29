import mongoose from 'mongoose';

const {Schema, model} = mongoose;

//Create the schema for listdb
const listSchema = new Schema({
    name_list: String,
    items:[{
        item_name: String,
    }]
})


//create model
const List = model('List', listSchema);
export default List;