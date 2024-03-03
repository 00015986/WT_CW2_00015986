const { body } = require("express-validator");

const registerValidationRules = () => {
    return [
        body("fullname").notEmpty().withMessage("Fullname must not be empty"),
        body("phone_number").notEmpty().withMessage("Phone number must not be empty"),
        body("address").notEmpty().withMessage("Address must not be empty"),
        body("gender").notEmpty().withMessage("Gender must not be empty"),
        body("birth_date").notEmpty().withMessage("Birth date must not be empty"),
        body("analysis").notEmpty().withMessage("Please enter your analysis"),
    ];
};

module.exports = {
    registerValidationRules,
};
