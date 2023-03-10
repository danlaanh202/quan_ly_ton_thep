import React, { Dispatch, SetStateAction, useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { IInvoiceVar, IStock } from "@/types";
import styled from "styled-components";
import InvoiceItemsTable from "./InvoiceItemsTable";
import { easyReadMoney } from "@/utils/convert";

import { format } from "date-fns";
import _ from "lodash";

interface Item extends IInvoiceVar {
  key: React.Key;
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

const InvoiceListTable = ({
  data,
  setData,
  isChild = false,
}: {
  data: IInvoiceVar[];
  setData: Dispatch<SetStateAction<IInvoiceVar[]>>;
  isChild?: boolean;
}) => {
  const [form] = Form.useForm();
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
    const newData = data.filter((item) => item._id !== key);
    setData(newData);
  };
  const columns = [
    {
      title: "T??n kh??ch h??ng",
      dataIndex: ["khach_hang", "ten_khach_hang"],
      width: "300px",
      editable: true,
    },
    isChild
      ? {}
      : {
          title: "S??? ??i???n tho???i",
          dataIndex: ["khach_hang", "so_dien_thoai"],
          width: "300px",
          editable: true,
        },
    isChild
      ? {}
      : {
          title: "?????a ch???",
          dataIndex: ["khach_hang", "dia_chi"],
          width: "500px",
          editable: true,
        },
    {
      title: "T???ng ho?? ????n",
      dataIndex: "tong_tien",
      width: "300px",
      // editable: true,
      render: (_: any, record: Item) =>
        easyReadMoney(record.tong_tien as number),
    },
    {
      title: "S??? ti???n tr???",
      dataIndex: "so_tien_tra",
      width: "300px",
      editable: true,
      render: (_: any, record: Item) => easyReadMoney(record.so_tien_tra),
    },
    isChild
      ? {}
      : {
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
    isChild
      ? {
          title: "Ng??y t???o ho?? ????n",
          dataIndex: "created_at",
          width: "300px",
          render: (_: any, record: Item) =>
            format(new Date(record.created_at as string), "dd/MM/yyyy"),
        }
      : {},
  ].filter((elem) => !_.isEmpty(elem));

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
              <div
                className="exp-title"
                style={{ fontWeight: 600, fontSize: "16px" }}
              >
                Danh s??ch h??ng ho??{" "}
              </div>
              <InvoiceItemsTable originData={record.hang_hoa as IStock[]} />
              <div className="exp-item">
                <div className="exp-item-title">Ng??y mua:</div>
                <p className="exp-item-content">
                  {format(new Date(record.ngay_mua as string), "dd/MM/yyyy")}
                </p>
              </div>
              <div className="exp-item">
                <div className="exp-item-title">Ghi ch??:</div>
                <p className="exp-item-content">{record.ghi_chu}</p>
              </div>
            </StyledExpandableContainer>
          ),
          // rowExpandable: (record) => record.name !== "Not Expandable",
        }}
      />
    </Form>
  );
};

export default InvoiceListTable;

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
