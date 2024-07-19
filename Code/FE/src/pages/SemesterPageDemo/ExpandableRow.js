import React from "react";
import { Table } from "antd";

const ExpandableRow = ({ data }) => {
  if (!data || data.length === 0) {
    return null; // Không hiển thị gì nếu không có dữ liệu
  }

  const columns = [
    {
      title: "#",
      dataIndex: "id_C",
      key: "id_C",
    },
    {
      title: "Milestone",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
      render: (text, record) => <span>{record.time}</span>,
    },
    {
      title: "To/Deadline",
      dataIndex: "to",
      key: "to",
      render: (text, record) => <span>{record.time}</span>,
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
      render: (text, record) => <span>{record.person}</span>,
    },
  ];

  const processedData = data.map((item, index) => ({
    ...item,
    key: index,
  }));
  console.log("data", data);
  return (
    <Table
      columns={columns}
      dataSource={processedData}
      pagination={true}
      showHeader={true} // Ẩn header của bảng con
    />
  );
};

export default ExpandableRow;
