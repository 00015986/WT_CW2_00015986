// import specific service class
const { user_register_service, user_update_service } = require("../../../services/user/");

const user_register_controller = {
    register: async (req, res) => {
        try {
            const user = await user_register_service.insertUser(req);
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

const user_update_controller = {
    update: async (req, res) => {
        try {
            const user = await user_update_service.updateUser(req)
            res.json(user)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = {
    user_register_controller,
    user_update_controller
};
