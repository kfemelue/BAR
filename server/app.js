require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 3000;
const { MongoClient } = require('mongodb');
const uri = process.env.MONGO_URI;
const database = process.env.DB_NAME;
const coll = process.env.COLLECTION;
const client = new MongoClient(uri);
const seed = require('./seed_file');

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.redirect("/album-data");
});

app.get("/seed", async (req, res)=>{
    try {
        await seed();
        res.status(200).send("Your request was completed")
    }catch (error){
        console.error("There was a problem on the server")
    }
});

app.get("/album-data", async (req, res)=>{
    try {
        await client.connect();
        const db = await client.db(database);
        const collection = await db.collection(coll);
        const data = await collection.find().toArray();
        res.status(200).json(data);
    } catch (error) {
        console.error("Something Went Wrong: ", error);
    }
});

app.get("/test-error", (req, res, next)=>{
    try{
        throw new Error("OHHHH MYYYYYY GOOOOOOSH")
    }catch(error){
        next(error)
    }
})

app.listen(PORT, ()=>{
    console.log(`server is listening on port ${PORT}`)
});
