import React, { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { IStock } from "@/types";
import styled from "styled-components";
import InvoiceItemsTable from "./InvoiceItemsTable";
import { easyReadMoney } from "@/utils/convert";

interface Item {
  key: React.Key;
  name: string;
  phone_number: number;
  address: string;
  buy_total: number;
  debt_remain: number;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i,
    name: `Edrward ${i}`,
    phone_number: 8127322340,
    address: `London Park no. ${i}`,
    buy_total: 20000,
    debt_remain: 20000,
  });
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const InvoiceListTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record: Item) => record.key === editingKey;

  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", address: "", ...record });
    setEditingKey(record.key as string);
  };
  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };
  const columns = [
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      width: "300px",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      width: "300px",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: "500px",
    },
    {
      title: "Tổng số tiền mua",
      dataIndex: "buy_total",
      width: "200px",
      render: (_: any, record: Item) => easyReadMoney(record.buy_total),
    },
    {
      title: "Tiền nợ còn lại",
      dataIndex: "debt_remain",
      width: "200px",
      render: (_: any, record: Item) => easyReadMoney(record.debt_remain),
    },
    {
      title: "Hành Động",
      dataIndex: "operation",
      width: "300px",
      render: (_: any, record: Item) => {
        return (
          <Popconfirm
            title="Chắc chắn xoá?"
            onConfirm={() => handleDelete(record.key)}
          >
            <a style={{ color: "red", marginLeft: "8px" }}>Xoá</a>
          </Popconfirm>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        expandable={{
          expandedRowRender: (record) => (
            <StyledExpandableContainer>
              <InvoiceItemsTable />
              <div className="exp-item">
                <div className="exp-item-title">Ngày mua:</div>
                <p className="exp-item-content">{record.buy_date as string}</p>
              </div>
              <div className="exp-item">
                <div className="exp-item-title">Ghi chú:</div>
                <p className="exp-item-content">{record.invoice_description}</p>
              </div>
            </StyledExpandableContainer>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
    </Form>
  );
};

export default InvoiceListTable;

// Bảng mở rộng sẽ là danh sách hoá đơn của người trên
const StyledExpandableContainer = styled.div`
  margin: 12px 0;
  .exp-item {
    margin-top: 12px;
    &-title {
      font-weight: 600;
    }
    &-content {
      margin-left: 8px;
    }
  }
`;
