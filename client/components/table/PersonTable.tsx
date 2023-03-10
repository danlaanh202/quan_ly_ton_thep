import React, { Dispatch, SetStateAction, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { IData, IPerson, IStock } from "@/types";
import styled from "styled-components";
import InvoiceItemsTable from "./InvoiceItemsTable";
import { easyReadMoney } from "@/utils/convert";
import InvoiceListTable from "./InvoiceListTable";
import InvoicesChildListTable from "./InvoicesChildListTable";

interface Item extends IPerson {
  key: React.Key;
}

const originData: Item[] = [];
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i,
    _id: `abcxyz${i}`,
    ten_khach_hang: `Edrward ${i}`,
    so_dien_thoai: "0812732234",
    dia_chi: `London Park no. ${i}`,
    so_tien_no: 20000,
    tong_tien_mua: 50000000,
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

const PersonTable = ({ data, setData }: IData<IPerson[]>) => {
  const [form] = Form.useForm();
  // const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record: Item) => record.key === editingKey;
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({ name: "", age: "", dia_chi: "", ...record });
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
      title: "T??n kh??ch h??ng",
      dataIndex: "ten_khach_hang",
      width: "300px",
      editable: true,
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "so_dien_thoai",
      width: "300px",
      editable: true,
    },
    {
      title: "?????a ch???",
      dataIndex: "dia_chi",
      width: "500px",
      editable: true,
    },
    {
      title: "T???ng s??? ti???n mua",
      dataIndex: "tong_tien_mua",
      width: "200px",
      render: (_: any, record: Item) =>
        easyReadMoney(record.tong_tien_mua as number),
    },
    {
      title: "Ti???n n??? c??n l???i",
      dataIndex: "so_tien_no",
      width: "200px",
      render: (_: any, record: Item) => (
        <span
          style={
            (record.so_tien_no as number) > 0
              ? { color: "#e2574c", fontWeight: 600 }
              : { color: "#59ad6a", fontWeight: 600 }
          }
        >
          {easyReadMoney(record.so_tien_no as number)}
        </span>
      ),
    },
    {
      title: "H??nh ?????ng",
      dataIndex: "operation",
      width: "300px",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              L??u l???i
            </Typography.Link>
            <Popconfirm title="B???n mu???n hu????" onConfirm={cancel}>
              <a>Hu???</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              S???a
            </Typography.Link>
            <Popconfirm
              title="Ch???c ch???n xo???"
              onConfirm={() => handleDelete(record.key)}
            >
              <a style={{ color: "red", marginLeft: "8px" }}>Xo??</a>
            </Popconfirm>
          </>
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
        dataSource={data as Item[]}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        rowKey="_id"
        expandable={{
          expandedRowRender: (record) => (
            <StyledExpandableContainer>
              <InvoicesChildListTable id={record._id} />
            </StyledExpandableContainer>
          ),
          rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
    </Form>
  );
};

export default PersonTable;

// B???ng m??? r???ng s??? l?? danh s??ch ho?? ????n c???a ng?????i tr??n
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
