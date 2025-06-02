require('dotenv').config();
const albumSchema = require('./models/Album').albumSchema;
const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
const database = process.env.DB_NAME;
const coll = process.env.COLLECTION;

async function readAll(request, response) {
    try {
        const connection = await mongoose.connect(`${uri}/${database}`)
        const Album = await connection.model("Album", albumSchema);
        const data = await Album.find();
        response.status(200).json(data)
    }catch (error) {
        console.error("Something went Wrong: ", error)
    }

}

async function readOne(request, response) {

}

async function createOne(request, response) {

}

async function editOne(request, response) {

}

async function deleteOne(request, response) {

}

module.exports = { readAll }
