import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import {
  Button,
  Pagination,
  Input,
  Form,
  Switch,
  Modal,
  Tabs,
  Select,
  Typography,
  Collapse,
  Table,
  Col,
  Row,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DashboardLayout from "../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../components/Common/Table";
import ContentBlockWrapper from "../../components/ContentBlockWrapper";
import PageTitle from "../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import { FlexBox } from "../ListGroupPage/ListGroupPageStyled";
import {
  NoMarginBottom,
  ContentInformation,
} from "../ProfilePage/ProfilePageStyled";
import TableComponent from "../../components/Common/TableComponent";
import {
  PhaseTabs,
  SemesterLayout,
  SemesterItem,
  LimitLine,
} from "./SemesterPageDemoStyled";
import { DATE_FORMAT_SLASH } from "../../constants";
import utils from "../../utils";
import uuid from "uuid";
import PopupCreateSemester from "./PopupCreateSemester";
import PopupEditSemester from "./PopupEditSemester";
import moment from "moment";
const { Title } = Typography;
const { TabPane } = Tabs;

const SemesterPageDemo = (props) => {
  const {
    history,
    loadingAnimationStore,
    groupStore,
    studentStore,
    semesterStore,
    authenticationStore,
  } = props;

  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  const [data1, setTable1] = useState();

  const [data, setData] = useState([]);
  const [
    isVisiblePopupCreateSemester,
    setIsVisiblePopupCreateSemester,
  ] = useState(false);
  const [isVisiblePopupEditSemester, setIsVisiblePopupEditSemester] = useState(
    false
  );
  const [selectedSemester, setSelectedSemester] = useState();
  const [semesters, setSemesters] = useState([]);

  useEffect(() => {
    getSemester();
  }, []);
  const getSemester = async () => {
    try {
      const res = await semesterStore.getSemesters();
      setSemesters(res.data);
      setSemesterCurrent(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSelectChange = (value) => {
    setSelectedSemesterId(value);
    const semester = getSemesterById(value);
    setData(utils.transformData(semester.milestones));
  };
  const getSemesterById = (id) => {
    return semesters.find((semester) => semester.id === id);
  };
  const setSemesterCurrent = (semesters) => {
    // Kiểm tra xem mảng semesters có dữ liệu không
    if (semesters.length > 0) {
      // Tìm semester có start date gần nhất với hiện tại
      const currentDate = new Date();
      const closestSemester = semesters.reduce((prev, curr) => {
        const prevDiff = Math.abs(new Date(prev.startDate) - currentDate);
        const currDiff = Math.abs(new Date(curr.startDate) - currentDate);
        return currDiff < prevDiff ? curr : prev;
      });
      setData(utils.transformData(closestSemester.milestones));
      setTable1(utils.getPhase(closestSemester.milestones));
      // Gán giá trị của closestSemester.id vào selectedSemesterId
      setSelectedSemesterId(closestSemester.id);
    }
  };
  const columns = [
    {
      title: "TT",
      render: (record) => record.milestone.id,
    },
    {
      title: "Các bước hoạt động",
      render: (record) => record.milestone.name,
    },
    {
      title: "Yêu cầu của các bước",
      render: (record) => record.milestone.requirement,
    },
    {
      title: "Sản phẩm",
      render: (record) => record.milestone.product,
    },
    {
      title: "Thời gian ",
      render: (record) => record.milestone.time,
    },
    {
      title: "Người thực hiện",
      render: (record) => record.milestone.person,
    },
  ];
  const columnMilestoneGuidance = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
      width: 50,
    },
    {
      title: "Milestone",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "From",
      render: (record) => record.fromDate.format(DATE_FORMAT_SLASH),
      width: 200,
    },
    {
      title: "To/Deadline",
      render: (record) => record.toDate.format(DATE_FORMAT_SLASH),
      width: 200,
    },
    {
      title: "Notes",
      dataIndex: "time",
      key: "time",
    },
  ];
  const columnMilestone2 = [
    {
      title: "#",
      width: 50,
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      width: 200,
    },
    {
      title: "From",
      width: 200,
      // render: (record) => record.fromDate.format(DATE_FORMAT_SLASH),
    },
    {
      title: "To/Deadline",
      render: (record) => record.toDate.format(DATE_FORMAT_SLASH),
      width: 200,
    },
    {
      title: "Requirement",
      dataIndex: "requirement",
      key: "requirement",
    },
  ];

  return (
    <DashboardLayout>
      <Helmet>
        <title>Admin | Semester</title>
      </Helmet>
      <PageTitle location={props.location} title={"Semester"} hiddenGoBack>
        <Button
          onClick={() => setIsVisiblePopupCreateSemester(true)}
          type={"primary"}
        >
          <PlusOutlined /> Create New Semester
        </Button>
      </PageTitle>
      <div className=" gap-5 items-start">
        <ContentInformation
          className="w-2/6 "
          style={{ backgroundColor: "unset" }}
        >
          <div className="flex items-stretch justify-between gap-2 mb-5 bg-white p-8 rounded-md">
            <NoMarginBottom className="flex items-center justify-center">
              <Title level={5}>Semester</Title>
            </NoMarginBottom>
            <Select
              value={selectedSemesterId}
              onChange={onSelectChange}
              style={{ width: "200px" }}
              options={semesters?.map((semester) => ({
                value: semester.id,
                label: semester.name,
              }))}
            />

            <PopupEditSemester
              isVisiblePopup={isVisiblePopupEditSemester}
              setIsVisiblePopup={setIsVisiblePopupEditSemester}
              handleClosePopup={() => setIsVisiblePopupEditSemester(false)}
              semester={selectedSemester} // Pass the selected semester data to the popup
            />
          </div>
        </ContentInformation>
        <div className="bg-white p-8 rounded-md mb-5">
          <Tabs defaultActiveKey="tab1">
            <TabPane tab="Milestone" key="tab1">
              <Table
                columns={columns}
                dataSource={data1}
                rowKey={(record) => record.id || uuid()}
                expandable={false}
                pagination={false}
              />
            </TabPane>
            <TabPane tab="Milestone for guildance phase" key="tab2">
              <Table
                columns={columnMilestoneGuidance}
                dataSource={data[4]?.detail}
                rowKey={(record) => record.id || uuid()}
                pagination={false}
                expandable={{
                  expandedRowRender: (record) => (
                    <>
                      {record?.detail[0]?.name == null ? (
                        <Table
                          columns={columnMilestone2}
                          dataSource={record?.detail}
                          rowKey={(record) => record.id || uuid()}
                          expandable={false}
                          pagination={false}
                          showHeader={false}
                        />
                      ) : (
                        <></>
                      )}
                    </>
                  ),
                  rowExpandable: (record) => record.detail?.length > 0,
                  expandIconColumnIndex: 0,
                }}
              />
            </TabPane>
          </Tabs>
        </div>
      </div>
      <PopupCreateSemester
        isVisiblePopup={isVisiblePopupCreateSemester}
        setIsVisiblePopup={setIsVisiblePopupCreateSemester}
        handleClosePopup={() => setIsVisiblePopupCreateSemester(false)}
      />
    </DashboardLayout>
  );
};

export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "studentStore",
      "groupStore",
      "semesterStore"
    )(observer(SemesterPageDemo))
  )
);
