import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button, Table, Input, Select, message } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import uuid from "uuid";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../../components/Common/Table";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import PageTitle from "../../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import TableComponent from "../../../components/Common/TableComponent";
import { MEMBER_STATUS } from "../../../constants";
import { GoogleSpreadsheet } from "google-spreadsheet";
const { Option } = Select;
const SPREADSHEET_ID = "1K15hZdYfjKIlSA2riaBiMs26mOw6egDaBn89hMndf5o";
const CLIENT_EMAIL =
  "fu-cpms@secure-approach-424011-j8.iam.gserviceaccount.com";
const PRIVATE_KEY =
  "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC7/RgkfBHtIhN3\n46fLJcQ3WtYtVAJR78RRwClhexu0EsS4ZOXrMq4SvyZrFpM7i4ZSP+xKnCDEpxDf\nfloTOJE7GC5cqmHpxfloqLp38RGDn46FR95jujde+uElIT/Mw0yiNta6hSdbj01I\nj6HLNVQDQsLjMGSjl2kWslwOHYNEnQTjjtJgWApLGwcG5kkDG11dIU51UHYY8nva\nPeNTZs0UgO59t8HAX3OjKsFOfgwJcxErQGw9WqlcXHEAaojC8k8YVdFVVc12utt6\nIMXLhVicJ4CQHEazgU+MPIp6CAH6nO2aUJDIi1wizKlXua3qlsIxGrK8ai775mPx\nKJqdxcufAgMBAAECggEAHWCIYM84t+9+zln3s0HkH2hlFvFNaYOIEORwMwkbg7D5\nJ/2whmhFlq1jchG1kXUU2Q6fPOuYHVMkSmDC78UDwRHe0OFZasBi4O2ZMjwsaf7J\ntV9NTBViKMgY3gYLo9KTS7g5Jy2+wEqtH50+gfSD+/x3WyyJVZ1IMWFPDG+lP1fr\nOztmYeJ1AIN35s60nKW0hofZJMl1EGSzI+SwTqQzUhHLJfrmBUZISfMVKSKsSNY0\ndcmO7PzWhWPTzEV0oG8fHsLQBMzRjWhCmBeaDZU0OliVStPEU2qX98TJgKhwaou3\nll0CdM6SUoOJgKwzP/N++1WW1tA+tSSHV1+QPg9nwQKBgQD40jv3RKr9163/IjiW\nBNMsSMzXglMGhVtODVTtZtE+lp4L+2158DXsubVEcmbg2h6FnIp/gtwcZ8vQxIcz\nA3NJCy8TMWDSrwS+9nsFzf0ipC2bi8/VNVBmRiQ3C8dPqnwVNQsprmVySTjzOQl0\nNmeOQgSyEx/zUDFUeAUnvoc2wQKBgQDBaY607nySMcx7QcmFqoYac6tMLVQzrTFU\nmtvuur3G06VWn2J9TQyBMcn/YpmWzm6lepaPva/xcomsF5ysQCicJRMTfNXjSljQ\nAQ/LFYjdjivfDrITGihgvBirSBwZnFnvALVadWWDcBIq314aFGbSRwimc7Ia10Hq\nSyj7hiD6XwKBgQCx6Ef+DbghFfSP5t0EzuBa2pa0RLeugu18ymV99TUJhlHtCVIG\njO1RnJryHMZYYTzPldUlROCy4rhFRi/RFtd4U6nOFFFBcuh2ze+6f8VN3ovJmtb4\ngE1DQ0WjoiVZXfGojCu2Gr7oT1iL9609zaSPf76xwKDorN8IoWQ2PbGaQQKBgHt7\nGfoXvH5Vvtf+c1ucOAvRR07WLcjkTPdX+wwaOykiXI/GKEoZE9+z2uPqnmYym1+Y\nuWFB2H+NAapWVNeACq1N2jT54VBAWh1KYDvnHr9cklPRfQ1HCPphfFp2KkKLmLtH\nN4FuLAZTWbX3b4u09MRRR4uFl/Mc9N9RZvPWeV1/AoGABv2UIUInfjIGXlXJ3E4h\ncFCNf8mctmE1PwXu5deKS93qkLZNURC1AHxFlUExo4GlJ/RrHWIXj30d1VAhRMz6\nVYZL9qF9sOEbZ/SuYvZDpsem4bTu4PUCzP4IvOlyBOCvpYvVGJkwYV8z6JgAr0SR\nvDAXa1ABJeKviRyseOt98qA=\n-----END PRIVATE KEY-----\n";
const ManageTaskPage = (props) => {
  const {
    history,
    loadingAnimationStore,
    supervisorStore,
    authenticationStore,
    groupStore,
  } = props;
  const [sheet, setSheet] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeSheet = async () => {
      try {
        loadingAnimationStore.showSpinner(true);
        //Kết nối đến Google Sheets API
        const doc = new GoogleSpreadsheet(SPREADSHEET_ID);
        await doc.useServiceAccountAuth({
          client_email: CLIENT_EMAIL,
          private_key: PRIVATE_KEY,
        });
        await doc.loadInfo();
        //Lấy thông tin về Sheet đầu tiên
        const sheet = doc.sheetsByIndex[0];
        await sheet.loadHeaderRow(7);
        setSheet(sheet);

        //Lấy dữ liệu hàng từ Sheet
        const rows = await sheet.getRows();
        const numericRows = rows.filter((row) => {
          const numericValue = parseInt(row["#"]);
          return !isNaN(numericValue);
        });
        setRows(numericRows);
        loadingAnimationStore.showSpinner(false);
        setLoading(false);
      } catch (err) {
        console.error("Lỗi khi tải sheet:", err);
        loadingAnimationStore.showSpinner(false);
        setLoading(false);
      }
    };
    initializeSheet();
  }, []);

  const updateRow = (index, key, value) => {
    const updatedRows = [...rows];
    updatedRows[index][key] = value;
    setRows(updatedRows);
  };

  const updateSheet = async () => {
    try {
      loadingAnimationStore.showSpinner(true);
      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        await row.save();
      }
      loadingAnimationStore.showSpinner(false);
      message.success("Sheet updated successfully");
    } catch (err) {
      console.error("Error updating sheet:", err);
      loadingAnimationStore.showSpinner(false);
      message.error("Error updating sheet");
    }
  };
  const [editingIndex, setEditingIndex] = useState(null);

  const columns = [
    {
      title: "#",
      dataIndex: "#",
      key: "#",
      width: "50px",
      render: (_, record, index) => (
        <Input style={{ width: "50px" }} value={record["#"]} readOnly />
      ),
    },
    {
      title: "Function/Screen",
      dataIndex: "Function/Screen",
      key: "Function/Screen",
      render: (_, record, index) => (
        <Input
          value={record["Function/Screen"]}
          onChange={(e) => updateRow(index, "Function/Screen", e.target.value)}
        />
      ),
    },
    {
      title: "Feature",
      dataIndex: "Feature",
      key: "Feature",
      render: (_, record, index) => (
        <Input
          value={record["Feature"]}
          onChange={(e) => updateRow(index, "Feature", e.target.value)}
        />
      ),
    },
    {
      title: "Level",
      dataIndex: "Level*",
      key: "Level*",
      render: (_, record, index) => (
        <Select
          value={record["Level*"]}
          style={{ width: "120px" }}
          onChange={(value) => updateRow(index, "Level*", value)}
        >
          <Option value="simple">Simple</Option>
          <Option value="medium">Medium</Option>
          <Option value="complex">Complex</Option>
        </Select>
      ),
    },
    {
      title: "Function/Screen Details",
      dataIndex: "Function/Screen Details",
      key: "Function/Screen Details",
      render: (_, record, index) => (
        <Input
          value={record["Function/Screen Details"]}
          onChange={(e) =>
            updateRow(index, "Function/Screen Details", e.target.value)
          }
        />
      ),
    },
    {
      title: "Planned",
      dataIndex: "Planned",
      key: "Planned",
      render: (_, record, index) => (
        <Input
          value={record["Planned"]}
          onChange={(e) => updateRow(index, "Planned", e.target.value)}
        />
      ),
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      render: (_, record, index) => (
        <Select
          value={record["Status"]}
          style={{ width: "120px" }}
          onChange={(value) => updateRow(index, "Status", value)}
        >
          <Option value="Pending">Pending</Option>
          <Option value="Doing">Doing</Option>
          <Option value="Deferred">Deferred</Option>
          <Option value="Cancelled">Cancelled</Option>
          <Option value="Done">Done</Option>
        </Select>
      ),
    },
  ];
  return (
    <DashboardLayout>
      <Helmet>
        <title>Manager Backlog</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"Manager Backlog"}
        hiddenGoBack
      ></PageTitle>
      <ContentBlockWrapper>
        <Button onClick={updateSheet}>Update Sheet</Button>
        <Table
          dataSource={rows}
          columns={columns}
          rowKey={(record, index) => index}
          pagination={false}
        />
      </ContentBlockWrapper>
    </DashboardLayout>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "supervisorStore",
      "groupStore"
    )(observer(ManageTaskPage))
  )
);
