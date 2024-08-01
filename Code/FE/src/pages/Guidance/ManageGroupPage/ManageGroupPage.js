import React, { memo, useCallback, useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Button, Table, Typography, Select, Tooltip } from "antd";
import { CloseCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import uuid from "uuid";
import DashboardLayout from "../../../layouts/DashboardLayout";
import { TableBottomPaginationBlock } from "../../../components/Common/Table";
import ContentBlockWrapper from "../../../components/ContentBlockWrapper";
import { NoMarginBottom } from "./ManageGroupPageStyled";
import PageTitle from "../../../components/PageTitle";
import { Helmet } from "react-helmet/es/Helmet";
import ViewProgress from "../../../components/ViewProgress/ViewProgress";
import moment from "moment";
import PopupImportExcel from "./PopupImportExcel";

const { Option } = Select;
const { Title } = Typography;

const ManageGroupPage = (props) => {
  const { history, loadingAnimationStore, groupStore, semesterStore } = props;

  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  const [semesters, setSemesters] = useState([]);
  const [groups, setGroups] = useState([]);
  const [isVisiblePopupImportExcel, setIsVisiblePopupImportExcel] = useState(
    false
  );
  useEffect(() => {
    getSemester();
  }, []);
  useEffect(() => {
    if (selectedSemesterId) {
      GetGroupListBySemester(selectedSemesterId);
    }
  }, [selectedSemesterId]);
  const getSemester = async () => {
    try {
      const res = await semesterStore.getSemesters();
      setSemesters(res.data);
      setSemesterCurrent(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  const GetGroupListBySemester = async (semesterId) => {
    try {
      const res = await groupStore.getGroupOfSupervisorBySemester(semesterId);
      setGroups(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSelectChange = (value) => {
    setSelectedSemesterId(value);
    const semester = getSemesterById(value);
  };
  const getSemesterById = (id) => {
    return semesters.find((semester) => semester.id === id);
  };

  const setSemesterCurrent = (semesters) => {
    if (semesters.length > 0) {
      const currentDate = moment();
      const closestSemester = semesters.reduce((prev, curr) => {
        const startDate = moment(curr.beginAt);
        const endDate = startDate.clone().add(14, "weeks");
        if (currentDate.isBetween(startDate, endDate, null, "[]")) {
          console.log("curr", curr);
          return curr;
        } else {
          if (prev !== null) {
            const prevDiff = Math.abs(
              moment(prev.beginAt).diff(currentDate, "days")
            );
            const currDiff = Math.abs(startDate.diff(currentDate, "days"));
            return currDiff < prevDiff ? curr : prev;
          } else {
            // If prev is null, return curr by default
            return curr;
          }
        }
      }, null);
      if (closestSemester) {
        setSelectedSemesterId(closestSemester.id);
      }
    }
  };
  const columns = [
    {
      title: "No.",
      width: "50",
      render: (record, index, dataSource) => dataSource + 1,
    },
    {
      title: "Group Name",
      width: "200",
      render: (record) => record?.group.name,
    },
    {
      title: "Vietnamese Title",
      width: "25%",
      render: (record) => record?.group.vietnameseTitle,
    },
    {
      title: "Action",
      width: "20%",
      align: "center",
      render: (record) => (
        <div>
          <Tooltip title="View">
            <Button
              onClick={() =>
                history.push(`/guidance/group/progress/${record.group.id}`)
              }
            >
              View
            </Button>
          </Tooltip>
        </div>
      ),
    },
  ];
  return (
    <DashboardLayout>
      <Helmet>
        <title>Manager Group</title>
      </Helmet>
      <PageTitle
        location={props.location}
        title={"Manager group"}
        hiddenGoBack
      ></PageTitle>
      <ContentBlockWrapper>
        {selectedSemesterId && <ViewProgress id={selectedSemesterId} />}
        <div className="gap-5 items-start">
          <div
            className="bg-white flex items-center justify-between"
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
            </div>
            <Button
              type="primary"
              className="mb-5"
              onClick={setIsVisiblePopupImportExcel}
            >
              Import group
            </Button>
          </div>
          <div className="bg-white p-8 rounded-md mb-5">
            <Table
              columns={columns}
              dataSource={groups}
              rowKey={(record) => record.id || uuid()}
              expandable={{
                expandedRowRender: (record) => <>thong tin cua group do</>,
                // expandIconColumnIndex: 0,
              }}
              pagination={false}
            />
          </div>
        </div>
        <PopupImportExcel
          isVisiblePopup={isVisiblePopupImportExcel}
          setIsVisiblePopup={setIsVisiblePopupImportExcel}
          handleClosePopup={() => setIsVisiblePopupImportExcel(false)}
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
      "semesterStore",
      "groupStore"
    )(observer(ManageGroupPage))
  )
);
