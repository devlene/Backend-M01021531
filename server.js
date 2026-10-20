var express = require("express");
var cors = require("cors");
var path = require("path");


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

// returns all lesson data as json
app.get("/lessons", function(request, response) {
    // lessonsArray
    let lessonsArray = [
    {
        lessonTitle: 'Math Lesson',
        lessonId: 1001,
        subject: 'Math',
        location: 'Middlesex University, Hendon, Room C105',
        time: 'Wednesdays 3:00 PM - 4:00 PM',
        price: 15,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/math.jpg',
            alt: 'Math Lesson'
            }
    },
    {
        lessonTitle: 'Science Lesson',
        lessonId: 1002,
        subject: 'Science',
        location: 'Middlesex University, Hendon, Room C106',
        time: 'Thursdays 3:00 PM - 4:00 PM',
        price: 15,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/science.jpg',
            alt: 'Science Lesson'
        }
    },
    {
        lessonTitle: 'English Lesson',
        lessonId: 1003,
        subject: 'English',
        location: 'Middlesex University, Hendon, Room C107',
        time: 'Fridays 3:00 PM - 4:00 PM',
        price: 15,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/english.jpg',
            alt: 'English Lesson'
        }
    },
    {
        lessonTitle: 'History Lesson',
        lessonId: 1004,
        subject: 'History',
        location: 'Middlesex University, Hendon, Room C108',
        time: 'Mondays 3:00 PM - 4:00 PM',
        price: 15,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/history.jpg',
            alt: 'History Lesson'
        }
    },
    {
        lessonTitle: 'Art Lesson',
        lessonId: 1005,
        subject: 'Art',
        location: 'Middlesex University, Hendon, Room C109',
        time: 'Tuesdays 2:00 PM - 3:00 PM',
        price: 15,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/art.jpg',
            alt: 'Art Lesson'
        }
    },
    {
        lessonTitle: 'Music Lesson',
        lessonId: 1006,
        subject: 'Music',
        location: 'Middlesex University, Hendon, Room C110',
        time: 'Wednesdays 3:00 PM - 4:00 PM',
        price: 15,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/music.jpg',
            alt: 'Music Lesson'
        }
    },
    {
        lessonTitle: 'Physical Education Lesson',
        lessonId: 1007,
        subject: 'Physical Education',
        location: 'Middlesex University, Hendon, Room C111',
        time: 'Thursdays 4:00 PM - 5:00 PM',
        price: 15,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/physical-education.jpg',
            alt: 'Physical Education Lesson'
        }
    },
    {
        lessonTitle: 'Advanced Math Lesson',
        lessonId: 1008,
        subject: 'Math',
        location: 'Middlesex University, Hendon, Room C112',
        time: 'Fridays 5:00 PM - 6:30 PM',
        price: 20,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/advanced-math.jpg',
            alt: 'Advanced Math Lesson'
        }
    },
    {
        lessonTitle: 'Advanced Science Lesson',
        lessonId: 1009,
        subject: 'Science',
        location: 'Middlesex University, Hendon, Room C113',
        time: 'Mondays 4:00 PM - 5:30 PM',
        price: 20,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/advanced-science.jpg',
            alt: 'Advanced Science Lesson'
        }
    },
    {
        lessonTitle: 'Norwegian Lesson',
        lessonId: 1010,
        subject: 'Foreign Languages',
        location: 'Middlesex University, Hendon, Room C201',
        time: 'Tuesdays 4:30 PM - 5:30 PM',
        price: 25,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/norwegian.jpg',
            alt: 'Norwegian Lesson'
        }
    },
    {
        lessonTitle: 'Italian Lesson',
        lessonId: 1011,
        subject: 'Foreign Languages',
        location: 'Middlesex University, Hendon, Room C202',
        time: 'Wednesdays 4:30 PM - 5:30 PM',
        price: 25,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/italian.jpg',
            alt: 'Italian Lesson'
        }
    },
    {
        lessonTitle: 'Spanish Lesson',
        lessonId: 1012,
        subject: 'Foreign Languages',
        location: 'Middlesex University, Hendon, Room C203',
        time: 'Fridays 5:00 PM - 6:00 PM',
        price: 25,
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/spanish.jpg',
            alt: 'Spanish Lesson'
        }
    }
    ];
    response.json(lessonsArray);
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
        + "\nPhone Number: " + body.phoneNumber);
    response.json({message: "Order received!"});
});

// runs if an unrecognised request comes in to the server
app.use(function(request, response, next) {
    response.status(404).send({error: "Unrecognised request"});
});

app.listen(3000, function() {
    console.log("App started on port 3000");
});