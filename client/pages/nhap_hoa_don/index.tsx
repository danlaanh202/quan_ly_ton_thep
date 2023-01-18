import FormInput from "@/components/form/FormInput";
import MainLayout from "@/layout/MainLayout";
import Head from "next/head";
import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FormInputNoControl from "@/components/form/FormInputNoControl";
import StockRow from "@/components/form/StockRow";
import { IStock } from "@/types";
import { PlusCircleOutlined } from "@ant-design/icons";
import { easyReadMoney } from "@/utils/convert";
const StyledFormContainer = styled.form`
  width: 100%;
  max-width: 1000px;
  margin: auto;
  .row-container {
    display: flex;
    gap: 40px;
    margin: 0 8px 12px;
    align-items: center;
  }
  .total {
    font-size: 20px;
    font-weight: 600;
  }
  .icon-container {
    justify-content: center;
    font-size: 20px;
    .add-btn {
      border: none;
      background: #1f28af;
      padding: 8px 20px;
      display: flex;
      align-items: center;
      color: white;
      cursor: pointer;
      border-radius: 8px;
      svg {
        font-size: 26px;
        color: white;
        margin-right: 8px;
      }
    }
  }
  .hoadon-title {
    font-size: 24px;
    font-weight: 600;
    margin: 20px 0;
  }
  .submit-btn {
    margin-top: 40px;
    background: #1f28af;
    color: white;
    padding: 12px 20px;
    border: 1px solid #dcdfe6;
    border-radius: 6px;
    cursor: pointer;
    max-width: 200px;
    text-align: center;
  }
`;

const index = () => {
  const {
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });
  const [stocks, setStocks] = useState<IStock[]>([]);
  const [defaultNumber, setDefaultNumber] = useState(3);
  const [buyDate, setBuyDate] = useState<Date>(new Date());
  const [totalPrice, setTotalPrice] = useState(0);
  const onSubmitHandler = (data: any) => {
    console.log({
      ...data,
      so_tien_tra: data.so_tien_tra * 1000,
      ngay_mua: buyDate.toISOString(),
      hang_hoa: stocks,
      tong_tien: totalPrice,
    });
  };
  useEffect(() => {
    setTotalPrice(stocks.reduce((prev, curr) => prev + curr.tong_tien, 0));
  }, [stocks]);
  return (
    <MainLayout>
      <Head>
        <title>Nhập hoá đơn</title>
      </Head>
      <StyledFormContainer
        onSubmit={handleSubmit(onSubmitHandler as SubmitHandler<FieldValues>)}
      >
        <div className="hoadon-title">Thông tin người mua hàng</div>
        <div className="row-container">
          <FormInput
            control={control}
            labelString="Tên khách hàng"
            inputId="ten_khach_hang"
          />
          <FormInput
            control={control}
            labelString="Số điện thoại"
            inputId="so_dien_thoai"
          />
          <FormInput
            control={control}
            labelString="Địa chỉ"
            inputId="dia_chi"
          />
        </div>
        <div className="hoadon-title">Hoá đơn bán hàng</div>
        {new Array(defaultNumber).fill(0).map((item, index) => (
          <StockRow
            key={index}
            setStocks={setStocks}
            stocks={stocks}
            index={index}
          />
        ))}
        <div className="row-container icon-container">
          <button
            onClick={() => setDefaultNumber((prev) => prev + 1)}
            type="button"
            className="add-btn"
          >
            <PlusCircleOutlined /> Thêm hàng hoá
          </button>
        </div>

        <div className="row-container total">
          Tổng tiền hoá đơn: {easyReadMoney(totalPrice)}
        </div>
        <div className="row-container">
          <FormInput
            control={control}
            labelString="Số tiền khách trả (Nghìn đồng)"
            inputId="so_tien_tra"
          />
          <FormInput
            control={control}
            labelString="Ngày mua"
            type="date"
            inputId="ngay_mua"
            setOuterDate={setBuyDate}
            outerDate={buyDate}
          />
        </div>
        <div className="row-container">
          <FormInput
            control={control}
            labelString="Ghi chú"
            inputId="ghi_chu"
            type="textarea"
          />
        </div>
        <button type="submit" className="submit-btn">
          Lưu hoá đơn
        </button>
      </StyledFormContainer>
    </MainLayout>
  );
};

export default index;
