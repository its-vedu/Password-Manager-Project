const express = require("express");
const dotenv = require ("dotenv");
const { MongoClient } =  require('mongodb');
const bodyparser = require('body-parser')
const cors = require("cors")


dotenv.config();

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

const dbName = "safePassword";
const app = express();
const port = 3000;
app.use(bodyparser.json())
app.use(cors)

client.connect().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});

//get all password
app.get("/", async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});

//save password
app.post("/", async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true, result: findResult});
});

//delete password by id
app.delete("/", async (req, res) => {
    const password = req.body
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true, result: findResult});
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});