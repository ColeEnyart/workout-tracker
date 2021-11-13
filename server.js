const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const opts = {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false};
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", opts);

app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});

// db.Workout.find({}).then(function (res) {
//     console.log("Checking if db is populated");
//     if (res.length === 0) {
//         console.log("DB is empty");
//         require("./seeders/seed.js");
//     }
// });