import {
  FileAddOutlined,
  HomeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import styled from "styled-components";

const StyledMainLayout = styled.div`
  height: 100vh;
  display: flex;
`;
const StyledAsideContainer = styled.aside`
  width: 300px;
  .list-container {
    display: flex;
    height: 100%;
    flex-direction: column;
    overflow-y: auto;
    background: #f3f4f6;
    padding: 16px 12px;
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1),
      0 4px 6px -4px rgb(0 0 0 / 0.1);

    .list {
      margin-top: 0.5rem;
      .list-item {
        display: flex;
        align-items: center;
        border-radius: 8px;
        padding: 8px;
        /* color: #111827; */
        color: #374151;
        font-weight: 600;
        cursor: pointer;
        :hover {
          background: #d1d5db;
        }
        .icon {
          margin: 0 12px;
        }
        .content {
          margin-left: 12px;
          font-size: 16px;
        }
      }
      .active {
        background: #d1d5db;
      }
    }
  }
`;
const StyledMainContainer = styled.main`
  height: 100%;
  padding: 16px 12px;
  flex: 1;
`;
const MainLayout = ({ children }: { children?: ReactNode }) => {
  return (
    <StyledMainLayout>
      <StyledAsideContainer aria-label="Side bar">
        <div className="list-container">
          <ul className="list">
            <Link href="/">
              <li className="list-item">
                <div className="icon">
                  <HomeOutlined />
                </div>
                <span className="content">Trang Chủ</span>
              </li>
            </Link>
            <Link href="/nhap_hoa_don">
              <li className="list-item">
                <div className="icon">
                  <FileAddOutlined />
                </div>
                <span className="content">Nhập hoá đơn</span>
              </li>
            </Link>
            <Link href="/">
              <li className="list-item">
                <div className="icon">
                  <UnorderedListOutlined />
                </div>
                <span className="content">Danh sách hoá đơn</span>
              </li>
            </Link>
            <Link href="/">
              <li className="list-item">
                <div className="icon">
                  <UnorderedListOutlined />
                </div>
                <span className="content">Danh sách nợ</span>
              </li>
            </Link>
          </ul>
        </div>
      </StyledAsideContainer>
      <StyledMainContainer>{children}</StyledMainContainer>
    </StyledMainLayout>
  );
};

export default MainLayout;
