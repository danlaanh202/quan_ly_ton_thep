import FormInput from "@/components/form/FormInput";
import MainLayout from "@/layout/MainLayout";
import Head from "next/head";
import styled from "styled-components";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FormInputNoControl from "@/components/form/FormInputNoControl";
import StockRow from "@/components/form/StockRow";
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
interface IStock {
  stockName: string;
  stockPrice: number;
  stockAmount: number;
}
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
  const onSubmitHandler = (data: any) => {
    console.log({ ...data, buy_date: buyDate.toISOString() });
  };
  useEffect(() => {
    console.log(stocks);
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
          <FormInput control={control} labelString="Tên" inputId="name" />
          <FormInput
            control={control}
            labelString="Số điện thoại"
            inputId="phone_number"
          />
          <FormInput
            control={control}
            labelString="Địa chỉ"
            inputId="address"
          />
        </div>
        <div className="hoadon-title">Hoá đơn bán hàng</div>

        <StockRow setStocks={setStocks} stocks={stocks} index={0} />
        <StockRow setStocks={setStocks} stocks={stocks} index={1} />
        <div className="row-container">
          <FormInput
            control={control}
            labelString="Số tiền khách trả (Nghìn đồng)"
            inputId="invoice_pay"
          />
          <FormInput
            control={control}
            labelString="Ngày mua"
            type="date"
            inputId="buy_date"
            setOuterDate={setBuyDate}
            outerDate={buyDate}
          />
        </div>
        <div className="row-container">
          <FormInput
            control={control}
            labelString="Ghi chú"
            inputId="invoice_description"
            type="textarea"
          />
        </div>
        <button className="submit-btn">Lưu hoá đơn</button>
      </StyledFormContainer>
    </MainLayout>
  );
};

export default index;
