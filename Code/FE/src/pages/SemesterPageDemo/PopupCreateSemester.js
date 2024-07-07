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
  Select,
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
const { Title } = Typography;
const { TabPane } = Tabs;
const PopupCreateSemester = (props) => {
  const { isVisiblePopup, setIsVisiblePopup, handleClosePopup } = props;
  const [form] = Form.useForm();
  const {
    history,
    loadingAnimationStore,
    mentorStore,
    semesterStore,
    authenticationStore,
  } = props;
  // const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [semesters, setSemesters] = useState([]);
  const [phases, setPhases] = useState([
    {
      name: "",
      beginAt: null,
      endAt: null,
    },
  ]);

  console.log("id", semesters);
  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf("day");
  };
  const handleAddPhase = useCallback(() => {
    setPhases((prevPhases) => [
      ...prevPhases,
      {
        name: "",
        beginAt: null,
        endAt: null,
      },
    ]);
  }, []);
  const handleDeletePhase = (index) => {
    setPhases((prevPhases) => prevPhases.filter((_, i) => i !== index));
  };
  const handleSubmit = async (values) => {
    try {
      loadingAnimationStore.showSpinner(true);

      await semesterStore.createSemester(
        values.code,
        values.name,
        moment(values.begin_at),
        moment(values.end_at)
      );

      message.success("Add semester successfully");
    } catch (err) {
      console.log(err);
      loadingAnimationStore.showSpinner(false);
      message.error(err.en || "Login failed response status!");
    } finally {
      loadingAnimationStore.showSpinner(false);
    }
  };

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
          className="flex items-stretch justify-center gap-12 w-full overflow-y-hidden"
          form={form}
          scrollToFirstError
          labelAlign="left"
          layout="horizontal"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 20,
          }}
          onFinish={handleSubmit}
          style={{ maxHeight: "550px" }}
        >
          <ContentInformation className="w-full">
            <Title level={4}>Semester</Title>
            <Form.Item label="Semester" name="name">
              <Input style={{ maxWidth: "100%" }} />
            </Form.Item>
            <Form.Item label="Code" name="code">
              <Input style={{ maxWidth: "100%" }} />
            </Form.Item>
            <Form.Item label="Begin at" name="begin_at">
              <DatePicker
                disabledDate={disabledDate}
                style={{ maxWidth: "100%", width: "100%" }}
              />
            </Form.Item>
            <Form.Item label="End at" name="end_at">
              <DatePicker
                disabledDate={disabledDate}
                style={{ maxWidth: "100%", width: "100%" }}
              />
            </Form.Item>
            <div className="w-full flex items-center justify-center mt-3">
              <Button
                className="flex items-center justify-center"
                type="primary"
              >
                Submit
              </Button>
            </div>
          </ContentInformation>
          <ContentInformation
            className="w-full overflow-y-auto"
            style={{ borderRadius: "0" }}
          >
            {phases.map((phase, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <NoMarginBottom>
                    <Title level={4}>Phase {index + 1}</Title>
                  </NoMarginBottom>
                  {index > 0 && (
                    <Button
                      className="flex items-center justify-center"
                      type="danger"
                      onClick={() => handleDeletePhase(index)}
                    >
                      <DeleteOutlined /> Delete phase
                    </Button>
                  )}
                </div>
                <Form.Item label="Phase" name={`phases[${index}].name`}>
                  <Input style={{ maxWidth: "100%" }} />
                </Form.Item>
                <Form.Item label="Begin at" name={`phases[${index}].beginAt`}>
                  <DatePicker
                    disabledDate={disabledDate}
                    style={{ maxWidth: "100%", width: "100%" }}
                  />
                </Form.Item>
                <Form.Item label="End at" name={`phases[${index}].endAt`}>
                  <DatePicker
                    disabledDate={disabledDate}
                    style={{ maxWidth: "100%", width: "100%" }}
                  />
                </Form.Item>
              </div>
            ))}
            <div className="w-full flex items-center justify-center mt-3">
              <Button
                className="flex items-center justify-center"
                type="primary"
                onClick={handleAddPhase}
              >
                <PlusOutlined /> Add a phase
              </Button>
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
    "mentorStore",
    "semesterStore"
  )(observer(PopupCreateSemester))
);
