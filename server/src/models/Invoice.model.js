const mongoose = require("mongoose");
const InvoiceSchema = new mongoose.Schema(
  {
    khach_hang: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      require: true,
    },
    so_tien_tra: {
      type: Number,
      default: 0,
    },
    ngay_mua: {
      type: Date,
      default: Date.now(),
    },
    ghi_chu: {
      type: String,
    },
    tong_tien: {
      type: Number,
    },
    hang_hoa: {
      type: [
        {
          ten_mat_hang: String,
          don_gia: Number,
          so_luong: Number,
        },
      ],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
module.exports = mongoose.model("Invoice", InvoiceSchema);
