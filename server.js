const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
var cors = require('cors');



const app = express();

//allow remote origin
app.use(cors());

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});


// Bodyparser middleware
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());

//allow remote origin
app.use(cors());




// DB Config
//const db = require("./config/keys").mongoURI;
const db = process.env.MONGODB_URI;

// Connect to MongoDB
mongoose
    .connect(
        db,
        { useNewUrlParser: true }
    )
    .then(() => console.log("MongoDB successfully connected"))
    .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());// Passport config
require("./config/passport")(passport);// Routes
app.use("/api/users", users);


const port = process.env.PORT || 5000;

// process.env.port is Heroku's port if you choose to deploy the app thereapp.listen(port, () => console.log(`Server up and running on port ${port} !`));
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

