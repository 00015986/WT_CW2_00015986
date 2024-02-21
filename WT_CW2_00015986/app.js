const express = require("express");

const body_parser = require("body-parser");

const path = require("path");

// make users database (raw .json file) available globally in app
global.users_db = path.join(__dirname, "./data/users_db.json");

const app = express();

// Import routes
const api_route = require("./routes/api");
const web_route = require("./routes/web");

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine for web routes
app.set("view engine", "pug");

app.use("/css", express.static("public/css"));
app.use("/javaScript", express.static("public/javaScript"));

// Register routes
app.use("/api", api_route); // All API routes start with /api
app.use("/", web_route); // Web routes

const PORT = 4000;

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
