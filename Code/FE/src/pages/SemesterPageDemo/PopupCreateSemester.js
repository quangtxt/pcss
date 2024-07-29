import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Form,
  message,
  Modal,
  Input,
  Typography,
  DatePicker,
  Tabs,
  Table,
  Row,
  Col,
  Collapse,
} from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";
import moment from "moment";
import dayjs from "dayjs";
import {
  NoMarginBottom,
  ContentInformation,
} from "../ProfilePage/ProfilePageStyled";
import { BeforeCenter } from "./SemesterPageDemoStyled";
import validator from "../../validator";
import uuid from "uuid";
import { DATE_FORMAT_SLASH } from "../../constants";
import utils from "../../utils";
const { Title } = Typography;
const { RangePicker } = DatePicker;
const { Panel } = Collapse;
const { TabPane } = Tabs;
const PopupCreateSemester = (props) => {
  const {
    history,
    loadingAnimationStore,
    semesterStore,
    isVisiblePopup,
    setIsVisiblePopup,
    handleClosePopup,
  } = props;
  const [form] = Form.useForm();
  const [startSemesterDate, setStartSemesterDate] = useState();
  const [milestoneTemplate, setMilestoneTemplate] = useState();
  const [holiday, setHoliday] = useState();
  const [data, setData] = useState([]);
  const [dataMilestone, setDataMilestone] = useState([]);
  const [showLunarNewYearHoliday, setShowLunarNewYearHoliday] = useState(false);
  const [showPreviewMilestone, setShowPreviewMilestone] = useState(false);

  const handleSubmit = async (values) => {
    try {
      loadingAnimationStore.showSpinner(true);

      const semester = {
        code: values.name,
        name: values.name,
        start_at: values.time,
        milestone: dataMilestone,
      };
      await semesterStore.createSemester2(semester);

      message.success("Add semester successfully");
      window.location.reload();
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

  const handleCheck = () => {
    form
      .validateFields()
      .then((values) => {
        const data = transformData(milestoneTemplate, startSemesterDate);
        setData(data);
        setShowPreviewMilestone(true);
      })
      .catch((errorInfo) => {
        // Có lỗi, hiển thị thông báo lỗi
        console.log("Validate Failed:", errorInfo);
      });
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setShowLunarNewYearHoliday(value && value.startsWith("Spring"));
  };

  const handleTimeChange = (e) => {
    setStartSemesterDate(e);
  };
  const onChangeHoliday = (e) => {
    setHoliday(e);
  };
  useEffect(() => {
    getMilestoneTemplate();
  }, []);
  const getMilestoneTemplate = async () => {
    try {
      const res = await semesterStore.getMilestoneTemplate();
      setMilestoneTemplate(res.data);
      const data = transformData(res.data, startSemesterDate);
      // console.log("data", JSON.stringify(data));
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };
  const columns = [
    {
      title: "TT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Các bước hoạt động",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Yêu cầu của các bước",
      dataIndex: "requirement",
      key: "requirement",
    },
    {
      title: "Sản phẩm",
      dataIndex: "product",
      key: "product",
    },
    {
      title: "Thời gian ",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Người thực hiện",
      dataIndex: "person",
      key: "person",
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

  function transformData(datatrs, strDate) {
    const result = {};

    function buildTree(items) {
      // Lọc các phần tử có parent là null (cấp gốc)
      const rootItems = items.filter((item) => item.parent === null);

      // Duyệt qua các phần tử ở cấp gốc và xây dựng cây
      rootItems.forEach((root) => {
        result[root.id] = {
          ...root,
          detail: buildSubTree(items, root.id, 1, strDate),
        };
      });
    }

    // Hàm helper để xây dựng các cấp con
    function buildSubTree(items, parentId, startingChildId, date) {
      const children = items.filter((item) => item.parent === parentId);
      return children.map((child, index) => ({
        ...child,
        fromDate: utils.executeFromDate(date, child.time, holiday),
        toDate: utils.executeToDate(date, child.time, holiday),
        key: `${startingChildId + index}`,
        detail: buildSubTree(
          items,
          child.id,
          1,
          utils.executeFromDate(date, child.time, holiday)
        ),
      }));
    }

    // Bắt đầu xây dựng cây
    buildTree(datatrs);
    const output = [];

    function processObject(obj, parentId = null) {
      for (const key in obj) {
        const item = obj[key];
        if (typeof item === "object" && item !== null) {
          if (item.id) {
            output.push({
              milestone_id: item.id,
              start_date: item.fromDate,
              end_date: item.toDate,
              duration: item.time,
            });
          }
          processObject(item.detail, item.id);
        }
      }
    }

    processObject(result);
    setDataMilestone(output);
    return Object.values(result);
  }

  return (
    <Modal
      title={
        <NoMarginBottom>
          <Title level={4}>Create Semester</Title>
        </NoMarginBottom>
      }
      footer={null}
      closable={true}
      visible={isVisiblePopup}
      onCancel={handleClosePopup}
      width={1200}
    >
      <BeforeCenter>
        <Form
          className="flex items-stretch justify-center gap-12 w-full overflow-y-auto"
          form={form}
          scrollToFirstError
          labelAlign="left"
          onFinish={handleSubmit}
          style={{ maxHeight: "550px" }}
        >
          <ContentInformation className="w-full">
            <Title level={4}>Semester</Title>
            <Row>
              <Col md={12}>
                <Form.Item
                  label="Semester"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên kỳ học đúng định dạng!",
                    },
                    { validator: validator.validateSemesterName },
                  ]}
                >
                  <Input
                    style={{ maxWidth: "60%" }}
                    onChange={handleNameChange}
                  />
                </Form.Item>
                {showLunarNewYearHoliday && (
                  <Form.Item
                    label="Lunar New Year Holiday"
                    name="lunarNewYearHoliday"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập thông tin về lịch nghỉ Tết!",
                      },
                    ]}
                  >
                    <RangePicker
                      style={{ maxWidth: "100%" }}
                      onChange={onChangeHoliday}
                    />
                  </Form.Item>
                )}
              </Col>
              <Col md={12}>
                <Form.Item
                  label="Time"
                  name="time"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng ngày bắt đầu",
                    },
                  ]}
                >
                  <DatePicker
                    style={{ maxWidth: "100%" }}
                    onSelect={handleTimeChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Button
              className="flex items-center justify-center"
              type="primary"
              onClick={handleCheck}
            >
              Check
            </Button>
            {showPreviewMilestone && (
              <Tabs defaultActiveKey="tab1">
                <TabPane tab="Milestone" key="tab1">
                  <Table
                    columns={columns}
                    dataSource={data}
                    rowKey={(record) => record.id || uuid()}
                    expandable={false}
                    pagination={false}
                  />
                </TabPane>
                <TabPane tab="Milestone for guildance phase" key="tab2">
                  <Table
                    columns={columnMilestoneGuidance}
                    dataSource={data[4].detail}
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
            )}
            <div className="w-full flex items-center justify-center mt-3">
              {showPreviewMilestone && (
                <Button
                  className="flex items-center justify-center"
                  type="primary"
                  htmlType="submit"
                >
                  Submit
                </Button>
              )}
            </div>
          </ContentInformation>
        </Form>
      </BeforeCenter>
    </Modal>
  );
};

PopupCreateSemester.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "supervisorStore",
    "semesterStore"
  )(observer(PopupCreateSemester))
);
