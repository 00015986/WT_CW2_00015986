const { body } = require("express-validator");

const registerValidationRules = () => {
    return [
        body("email").isEmail().withMessage("Enter a valid email address"),
        body("password")
            .notEmpty()
            .withMessage("Password must not be empty")
            .isLength({ min: 8, max: 16 })
            .withMessage("Password must be between 8 and 16 characters long")
            .not()
            .matches(/\s/)
            .withMessage("Password must not contain spaces")
            .not()
            .matches(/-/)
            .withMessage("Password must not contain hyphens"),
    ];
};

module.exports = {
    registerValidationRules,
};
