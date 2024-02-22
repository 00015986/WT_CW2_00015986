const express = require("express");

const body_parser = require("body-parser");

const path = require("path");

global.users_db = path.join(__dirname, "./data/users_db.json");

const app = express();

const api_route = require("./routes/api");
const web_route = require("./routes/web");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");

app.use("/css", express.static("public/css"));
app.use("/javaScript", express.static("public/javaScript"));

app.use("/api", api_route);
app.use("/", web_route);

const PORT = 4000;

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
