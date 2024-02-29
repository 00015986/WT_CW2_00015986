// import specific service class

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
        try {
            res.render("updateUser.pug");
        } catch (error) {
            res.status(500).render("error", { error: error.message });
        }
    },
};

module.exports = {
    user_register_controller,
    user_update_controller
};
