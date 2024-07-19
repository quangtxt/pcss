import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  Form,
  message,
  Modal,
  Input,
  Typography,
  DatePicker,
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

const PopupEditSemester = (props) => {
  const {
    isVisiblePopup,
    setIsVisiblePopup,
    handleClosePopup,
    semester,
  } = props; // Add `semester` prop
  const [form] = Form.useForm();
  const {
    history,
    loadingAnimationStore,
    mentorStore,
    semesterStore,
    authenticationStore,
  } = props;

  const [semesters, setSemesters] = useState([]);
  const [selectedSemesterId, setSelectedSemesterId] = useState(null);
  const [phases, setPhases] = useState([]);

  useEffect(() => {
    if (authenticationStore.currentUser) {
      semesterStore.getSemesters().then((response) => {
        const currentSemesters = response.data.map((semester) => ({
          label: semester.name,
          value: semester.id,
          code: semester.code,
          begin_at: semester.beginAt,
          end_at: semester.endAt,
          phases: semester.phases,
        }));
        setSemesters(currentSemesters);

        // Set default semester based on current date
        const currentDate = new Date();
        const defaultSem = currentSemesters.find(
          (sem) =>
            new Date(sem.begin_at) <= currentDate &&
            new Date(sem.end_at) >= currentDate
        );
        setSelectedSemesterId(defaultSem?.value);
        setPhases(defaultSem?.phases || []);
      });
    }
    return () => {
      semesterStore.clearStore();
    };
  }, [authenticationStore.currentUser, semesterStore]);

  useEffect(() => {
    if (semester) {
      form.setFieldsValue({
        name: semester.label,
        code: semester.code, // assuming `semester` object has a `code` field
        begin_at: moment(semester.begin_at),
        end_at: moment(semester.end_at),
      });

      const phaseFields = semester.phases.map((phase, index) => ({
        [`phases[${index}].name`]: phase.name,
        [`phases[${index}].beginAt`]: moment(phase.beginAt),
        [`phases[${index}].endAt`]: moment(phase.endAt),
      }));

      phaseFields.forEach((field) => {
        form.setFieldsValue(field);
      });

      setPhases(semester.phases);
    }
  }, [semester, form]);

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
          <Title level={4}>Edit Semester</Title>
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
              <Select
                value={selectedSemesterId}
                style={{ maxWidth: "100%" }}
                options={semesters}
              />
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

PopupEditSemester.propTypes = {};

export default withRouter(
  inject(
    "loadingAnimationStore",
    "authenticationStore",
    "mentorStore",
    "semesterStore"
  )(observer(PopupEditSemester))
);
