export interface IStock {
  ten_mat_hang: string;
  don_gia: number;
  so_luong: number;
  tong_tien?: number;
}
export interface IPerson {
  ten_khach_hang: string;
  so_dien_thoai: number;
  dia_chi: string;
  so_tien_no?: number;
  tong_tien_mua?: number;
}
export interface IInvoiceVar {
  khach_hang: IPerson;
  so_tien_tra: number;
  ghi_chu: string;
  ngay_mua: Date | string;
  tong_tien?: number;
  hang_hoa?: IStock[];
}
