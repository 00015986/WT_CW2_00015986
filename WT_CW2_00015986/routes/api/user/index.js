const express = require("express");
const { validationResult } = require("express-validator");
const { registerValidationRules } = require("../../../validators/user");
const {
    user_register_controller,
    user_update_controller,
} = require("../../../controllers/api/user");

const router = express.Router();

router.post("/register", registerValidationRules(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    user_register_controller.register(req, res);
});

router.post("/update/:id", (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    user_update_controller.update(req, res);
});

module.exports = router;
