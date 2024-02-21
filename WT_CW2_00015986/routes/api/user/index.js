const express = require("express");
const { validationResult } = require("express-validator");
const { registerValidationRules } = require("../../../validators/user");

const router = express.Router();
const user_controller = require("../../../controllers/api/user");

// Define API routes
router.post("/register", registerValidationRules(), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    user_controller.register(req, res);
});

module.exports = router;
