const express = require("express");
const fs = require("fs");
const body_parser = require("body-parser");

const path = require("path");

global.users_db = path.join(__dirname, "./data/users_db.json");

const app = express();

const api_route = require("./routes/api");
const web_route = require("./routes/web");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views/user"));

app.use("/css", express.static("public/css"));
app.use("/javaScript", express.static("public/javaScript"));
app.use("/images", express.static("public/images"));

app.use("/api", api_route);
app.use("/", web_route);

const PORT = 4000;

// app.get("/user/register", (req, res) => {
//     let registerPage = path.join(__dirname, "/views/user/registerForm.pug");
//     res.render(registerPage);
// });

app.get("/all-users", (req, res) => {
    fs.readFile("data/users_db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error reading JSON file");
        }

        try {
            const users_data = JSON.parse(data);
            res.render("users.pug", { users_data });
        } catch (parseError) {
            console.error(parseError);
            res.status(500).send("Error parsing JSON data");
        }
    });
});

app.get("/edit/:id", (req, res) => {
    const userId = req.params.id;
    fs.readFile('data/users_db.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading JSON file');
        }

        try {
            const users_data = JSON.parse(data);
            const user = users_data.find(user => user.id === parseInt(userId));
            if (!user) {
                return res.status(404).send('User not found');
            }
            res.render('updateUser', { user }); // Pass the user object to the template
        } catch (parseError) {
            console.error(parseError);
            res.status(500).send('Error parsing JSON data');
        }
    });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
