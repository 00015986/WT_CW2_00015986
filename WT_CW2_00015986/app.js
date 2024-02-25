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
app.use((req, res, next) => {
    if (req.url !== "/user/register" && req.url !== "/all-users") {
        res.redirect("/user/register");
    } else {
        next();
    }
});

const PORT = 4000;

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
    fs.readFile("data/users_db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error reading JSON file");
        }

        try {
            const users_data = JSON.parse(data);
            const user = users_data.find(
                (user) => user.id === parseInt(userId)
            );
            if (!user) {
                return res.status(404).send("User not found");
            }
            res.render("updateUser", { user });
        } catch (parseError) {
            console.error(parseError);
            res.status(500).send("Error parsing JSON data");
        }
    });
});

app.get("/delete/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    console.log(userId);
    fs.readFile("data/users_db.json", "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Error reading JSON file");
        }

        try {
            let usersData = JSON.parse(data);
            const userIndex = usersData.findIndex((user) => user.id === userId);

            if (userIndex !== -1) {
                usersData.splice(userIndex, 1);

                fs.writeFile(
                    "data/users_db.json",
                    JSON.stringify(usersData, null, 2),
                    (err) => {
                        if (err) {
                            console.error(err);
                            return res
                                .status(500)
                                .send("Error updating user data");
                        }
                        res.redirect("/all-users");
                    }
                );
            } else {
                res.status(404).send("User not found");
            }
        } catch (parseError) {
            console.error(parseError);
            res.status(500).send("Error parsing JSON data");
        }
    });
});

// app.post('/api/user/update/:id', (req, res) => {
// let userId = req.params.id;
// console.log(req.body)
// const {fullname, phone_number, address, gender, birth_date, analysis} = req.body;

// fs.readFile('data/users_db.json', 'utf8', (err, data) => {
//     if (err) {
//         console.error(err);
//         return res.status(500).send('Error reading JSON file');
//     }

//     try {
//         let users_data = JSON.parse(data);
//         const userIndex = users_data.findIndex(user => user.id === parseInt(userId));
//         if (userIndex !== -1) {
//             users_data[userIndex].user.fullname = fullname;
//             users_data[userIndex].user.phone_number = phone_number;
//             users_data[userIndex].user.address = address;
//             users_data[userIndex].user.gender = gender;
//             users_data[userIndex].user.birth_date = birth_date;
//             users_data[userIndex].user.analysis = analysis;

//             fs.writeFile('data/users_db.json', JSON.stringify(users_data, null, 2), (err) => {
//                 if (err) {
//                     console.error(err);
//                     return res.status(500).send('Error updating user');
//                 }
//                 res.redirect('/all-users');
//             });
//         } else {
//             res.status(404).send('User not found');
//         }
//     } catch (parseError) {
//         console.error(parseError);
//         res.status(500).send('Error parsing JSON data');
//     }
// });
// })

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
