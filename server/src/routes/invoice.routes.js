const InvoiceController = require("../controllers/InvoiceController");

const router = require("express").Router();

// [POST] create invoice
router.post("/post", InvoiceController.createInvoice);
router.get("/get", InvoiceController.getInvoices);
module.exports = router;
