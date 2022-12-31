const express = require("express");
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const cors = require("cors");
const workoutRoutes = require('./routes/workout');



// configuration

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

// routes

app.use('/api/workouts', workoutRoutes)


// database

mongoose.connect(process.env.MONGO_URI).then(() => {

    app.listen(process.env.PORT, ()=> {
        console.log("running on 4000!");
    })

}).catch((e) => console.log(e));

