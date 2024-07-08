const express = require("express");
const { jwtChecker } = require("../middleware/jsonwebtoken");
const { getAllEmployee } = require("../controllers/employees");
const router = express.Router();

router.route("/:id").get([jwtChecker],getAllEmployee);

module.exports = router;
