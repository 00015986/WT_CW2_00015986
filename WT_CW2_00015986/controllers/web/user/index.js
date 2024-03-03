// import specific service class
const fs = require("fs");

const user_register_controller = {
    register: async (req, res) => {
        try {
            res.render("registerForm.pug");
        } catch (error) {
            res.status(500).render("error", { error: error.message });
        }
    },
};

const user_update_controller = {
    update: async (req, res) => {
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
                res.render("updateUser.pug", { user });
            } catch (error) {
                console.error(error);
                res.status(500).send("Error parsing JSON data");
            }
        });
    },
};

module.exports = {
    user_register_controller,
    user_update_controller,
};