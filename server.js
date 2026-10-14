var express = require("express"); // requires Express module
var cors = require("cors");

// LessonsArray
let lessonsArray = [
    {
        lessonTitle: 'Math Lesson',
        lessonId: 1001,
        subject: 'Math',
        location: 'Middlesex University, Hendon, Room C105',
        time: 'Wednesdays 3:00 PM - 4:00 PM',
        price: '£15 per session',
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
        price: '£15 per session',
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
        price: '£15 per session',
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
        price: '£15 per session',
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
        price: '£15 per session',
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
        price: '£15 per session',
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
        price: '£15 per session',
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
        subject: 'Advanced Math',
        location: 'Middlesex University, Hendon, Room C112',
        time: 'Fridays 5:00 PM - 6:30 PM',
        price: '£20 per session',
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
        subject: 'Advanced Science',
        location: 'Middlesex University, Hendon, Room C113',
        time: 'Mondays 4:00 PM - 5:30 PM',
        price: '£20 per session',
        availability: 5,
        showDetail: false,
        photo: {
            image: 'images/advanced-science.jpg',
            alt: 'Advanced Science Lesson'
        }
    }
];


// Calls the express function to start a new Express app
var app = express();

app.use(cors());

app.use(function(request, response) {  // Middleware
    console.log("In comes a request to: " + request.url);
    response.json(lessonsArray);
});

app.listen(3000, function() {
    console.log("App started on port 3000");
});