const express = require("express");
const { validationResult } = require("express-validator");
const { registerValidationRules } = require("../../../validators/user");
const { updateUser } = require('../../../services/user/index.js')
const user_controller = require("../../../controllers/api/user");

const router = express.Router();

router.post("/register", registerValidationRules(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    user_controller.register(req, res);
});

router.post("/update/:id", (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const userId = req.params.id;
    const newData = req.body; // Assuming req.body contains the updated user data

    updateUser(userId, newData)
        .then(() => {
            res.json({ message: 'User data updated successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
});

module.exports = router;
