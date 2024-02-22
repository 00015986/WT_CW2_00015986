// import specific service class
const user_service = require("../../../services/user/");

const user_controller = {
    register: async (req, res) => {
        try {
            res.render("user/registerForm.pug"); // Assuming there's a users.pug in the views directory
        } catch (error) {
            res.status(500).render("error", { error: error.message }); // Assuming there's an error.pug
        }
    },
};

module.exports = user_controller;
