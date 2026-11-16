// Load environment variables from config.env file
require("dotenv").config({ path: "./config.env" });
var express = require("express");
var cors = require("cors");
var path = require("path");

// Port the server listens on. Uses the PORT environment variable if set, otherwise 3000
constport = process.env.PORT || 3000;

// Connection setup to MongoDB
const { MongoClient, ObjectId } = require("mongodb");

// Built connection string from environment variables
const uri = process.env.MONGODB_PREFIX +
process.env.MONGODB_USERNAME + ":" +
process.env.MONGODB_PASSWORD + 
process.env.MONGODB_URL;

// Create the client and selected "AfterSchoolClub" database
const client = new MongoClient(uri);
const db = client.db("AfterSchoolClub");

// Calls the express function to start a new Express app
var app = express();

// Path where images are
var publicPath = path.resolve(__dirname, "images");

// Allow cross-origin requests so the front end can call this API
app.use(cors());

// Parse incoming JSON request bodies and make them available as request.body
app.use(express.json());

// Logger middleware: runs for every request and prints the HTTP method and URL
// Calls next() to pass the request to the matching route
app.use(function(request, response, next) {
    console.log("Incoming: " + request.method + " to " + request.url);
   next();
});

// GET /lessons route: returns all lesson data from database collection "lessons" as JSON
app.get("/lessons", async function(request, response) {
    let collection = await db.collection("lessons");
    // Empty filter {} returns all documents
    let results = await collection.find({}).toArray();
    response.send(results);
});

// PUT /lessons/:_id route to update information about an existing lesson in database
// The lesson is identified by the MongoDB _id in the URL, and the fields to update come from the request body. 
// The updated lesson is returned as JSON
app.put("/lessons/:_id", async function(request, response) {

    var body = request.body;
    let collection = await db.collection("lessons");

    // The _id is passed in the URL as a string, but it must be converted to an ObjectId to match the stored value in database
    let tempid = request.params._id;

    // Filter that selects the single lesson to update
    const query = { _id: new ObjectId(tempid) };

    // $set only overwrites the fields supplied in the body and leaves all other fields unchanged
    const updates = {
        $set: request.body
    };

    // Returns an update summary, which is sent back to the client and logged
     result = await collection.updateOne(query, updates);
    response.send(result);
    console.log(result);
});

// Sends static files from publicPath directory
app.use("/images", express.static(publicPath));

// Return error message if file is not found
// Runs when express.static above found no matching file
app.use("/images", function(request, response) {
    response.status(404).send("Image not found!");
});

// POST /orders route: receives a new order and logs a summary
// The order is stored in the "orders" collection, and the insert result is returned to the client
app.post("/orders", async function(request, response) {
    var body = request.body;
    let collection = await db.collection("orders");

    // Insert the order exactly as received in the request body
    let result = await collection.insertOne(body);

    // Log a summary of the order to the console
    console.log("Order received" 
        + "\nFirst Name: " + body.firstName 
        + "\nLast Name: " + body.lastName
        + "\nPhone Number: " + body.phoneNumber
        + "\nLesson IDs: " + body.lessonIds);
    response.send(result);
});

// Search box implementation
// searched lessons across title, location, price and availability
// GET /search?q=text
app.get("/search", async function(request, response) {
    // Read the search text from the query string, defaulting to empty, and remove surrounding whitespace
    const q = (request.query.q || "").trim();

    //no search text: return all lessons in collection lessons
    if (q === "") {
        return response.json(await db.collection("lessons").find({}).toArray());
    }

    // escape special regex characters so they are treated as plain text
    // (prevents characters like . or ( from changing meaning of the search pattern)
    const safe = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    // $or returns a lesson if it matches the search text in any one of the fields below
    // $options "i" makes the matching case-insensitive
    const results = await db.collection("lessons").find({
        $or: [
            { lessonTitle: { $regex: safe, $options: "i" } },
            { location: { $regex: safe, $options: "i" } },
            // price and availability are numbers, so convert them to text first
            // ($expr allows aggregation operator such as $toString and $regexMatch inside a find query
            // $regexMatch returns true if the text representation of the number matches the search text)
            { $expr: { $regexMatch: { input: { $toString: "$price" }, regex: safe} } },
            { $expr: { $regexMatch: { input: { $toString: "$availability" }, regex: safe} } }
        ]
    }).toArray();

    response.json(results);
});

// Catch-all middleware: runs if an unrecognised request comes in to the server,
// because no earlier route matched. Responds with a 404 and a JSON error message
app.use(function(request, response, next) {
    response.status(404).send({error: "Unrecognised request"});
});

// Start the server and listen for incoming requests on the configured port
app.listen(constport, function() {
    console.log("App started on port " + constport);
});