const PersonController = require("../controllers/PersonController");

const router = require("express").Router();

// [POST] create person
router.post("/post", PersonController.createPerson);
// [GET] get person with query: ten_khach_hang
router.get("/get_people", PersonController.getPeople);

module.exports = router;
