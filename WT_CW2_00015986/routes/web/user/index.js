const express = require("express");
const router = express.Router();
const {user_register_controller, user_update_controller} = require("../../../controllers/web/user");

router.get("/register", user_register_controller.register);
router.get("/update", user_update_controller.update)

module.exports = router;