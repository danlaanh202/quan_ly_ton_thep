const PersonController = require("../controllers/PersonController");

const router = require("express").Router();

// [POST] create person
router.post("/post", PersonController.createPerson);

module.exports = router;
