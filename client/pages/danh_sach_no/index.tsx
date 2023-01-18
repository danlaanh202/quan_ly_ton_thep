import DebtTable from "@/components/table/DebtTable";
import MainLayout from "@/layout/MainLayout";
import Head from "next/head";

const InvoiceList = () => {
  return (
    <MainLayout>
      <Head>
        <title>Danh sách hoá đơn</title>
      </Head>
      <DebtTable />
    </MainLayout>
  );
};

export default InvoiceList;
