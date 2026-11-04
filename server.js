require("dotenv").config({ path: "./config.env" });
var express = require("express");
var cors = require("cors");
var path = require("path");

// Connection setup to MongoDB
const { MongoClient } = require("mongodb");
const uri = process.env.MONGODB_PREFIX +
process.env.MONGODB_USERNAME + ":" +
process.env.MONGODB_PASSWORD + 
process.env.MONGODB_URL;

const client = new MongoClient(uri);
const db = client.db("AfterSchoolClub");

// Calls the express function to start a new Express app
var app = express();
// Path where images are
var publicPath = path.resolve(__dirname, "images");

app.use(cors());
app.use(express.json());

app.use(function(request, response, next) {  // Logger middleware
    console.log("Incoming: " + request.method + " to " + request.url);
   next();
});

// returns all lesson data from database
app.get("/lessons", async function(request, response) {
    let collection = await db.collection("lessons");
    let results = await collection.find({}).toArray();
    response.send(results);
});

// Search box implementation
// searched lessons across title, location, price and availability
// GET /search?q=text
app.get("/search", async function(request, response) {
    const q = (request.query.q || "").trim();

    //no search text: return all lessons in collection lessons
    if (q === "") {
        return response.json(await db.collection("lessons").find({}).toArray());
    }

    // escape special regex characters so they are treated as plain text
    const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const results = await db.collection("lessons").find({
        $or: [
            { lessonTitle: { $regex: safe, $options: "i" } },
            { location: { $regex: safe, $options: "i" } },
            // price and availability are numbers, so convert them to text first
            { $expr: { $regexMatch: { input: { $toString: "$price" }, regex: safe} } },
            { $expr: { $regexMatch: { input: { $toString: "$availability" }, regex: safe} } }
        ]
    }).toArray();

    response.json(results);
});

// Sends static files from publicPath directory
app.use("/images", express.static(publicPath));

// Return error message if file is not found
app.use("/images", function(request, response) {
    response.status(404).send("Image not found!");
});

// Receives a new order and logs a summary
app.post("/orders", function(request, response) {
    var body = request.body;
    console.log("Order received" 
        + "\nFirst Name: " + body.firstName 
        + "\nLast Name: " + body.lastName
        + "\nPhone Number: " + body.phoneNumber
        + "\nLesson IDs: " + body.lessonIds);
    response.json({message: "Order received!"});
});

// runs if an unrecognised request comes in to the server
app.use(function(request, response, next) {
    response.status(404).send({error: "Unrecognised request"});
});

app.listen(3000, function() {
    console.log("App started on port 3000");
});