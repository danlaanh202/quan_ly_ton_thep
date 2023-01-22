const VND = require("../../lib/currency");
const { updatePersonMoneyById } = require("../../lib/personHandle");
const { format } = require("date-fns");
const InvoiceModel = require("../models/Invoice.model");

class InvoiceController {
  async createInvoice(req, res) {
    const newInvoice = new InvoiceModel({
      khach_hang: req.body.khach_hang_id,
      so_tien_tra: req.body.so_tien_tra,
      hang_hoa: req.body.hang_hoa,
      ngay_mua: req.body.ngay_mua,
      ghi_chu: `Tạo hoá đơn với số tiền ban đầu là: ${VND(
        req.body.so_tien_tra
      )} vào ngày ${format(new Date(req.body.ngay_mua), "dd/MM/yyyy")}. ${
        req.body.ghi_chu
      }`,
      tong_tien: req.body.tong_tien,
    });
    try {
      const savedInvoice = await newInvoice.save();
      updatePersonMoneyById(req.body.khach_hang_id, {
        so_tien_no_them: req.body.tong_tien - req.body.so_tien_tra,
        tong_hoa_don: req.body.tong_tien,
      });
      return res.status(200).json(savedInvoice);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getInvoices(req, res) {
    try {
      const invoices = await InvoiceModel.find({}).populate({
        path: "khach_hang",
      });
      let invoiceTotal = invoices.reduce(
        (prev, curr) => prev.hang_hoa + curr.hang_hoa,
        0
      );
      return res.status(200).json(invoices);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  async getInvoicesOfId(req, res) {
    try {
      const invoices = await InvoiceModel.find({
        khach_hang: req.query.khach_hang_id,
      }).populate({
        path: "khach_hang",
      });
      return res.status(200).json(invoices);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
module.exports = new InvoiceController();
