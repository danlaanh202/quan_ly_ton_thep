import MainLayout from "@/layout/MainLayout";
import Head from "next/head";
import styled from "styled-components";

const StyledContainer = styled.div`
  .row-container {
    display: flex;
    gap: 40px;
    .input-container {
      display: flex;
      flex-direction: column;
      flex: 1;
      .form-label {
        padding-bottom: 10px;
        margin-bottom: 4px;
      }
      .form-input {
        background: white;
        border: none;
        outline: none;
        border: 1px solid #dcdfe6;
        color: black;
        padding: 12px;
        ::placeholder {
          color: #d2c9cc;
        }
      }
    }
  }
`;
const index = () => {
  return (
    <MainLayout>
      <Head>
        <title>Nhập hoá đơn</title>
      </Head>
      <StyledContainer>
        <div className="row-container">
          <div className="input-container">
            <label className="form-label" htmlFor="name">
              Tên
            </label>
            <input className="form-input" type="text" id="name" />
          </div>
          <div className="input-container">
            <label className="form-label" htmlFor="name">
              Số điện thoại
            </label>
            <input className="form-input" type="text" id="name" />
          </div>
        </div>
      </StyledContainer>
    </MainLayout>
  );
};

export default index;
