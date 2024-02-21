// import specific service class
const user_service = require("../../../services/user/");

const user_controller = {
    // Create a new user
    register: async (req, res) => {
        try {
            const user = await user_service.insert(req);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = user_controller;
