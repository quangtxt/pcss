import React, { memo, useCallback, useEffect, useState } from "react";
import { AudioOutlined } from "@ant-design/icons";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { Typography, List, Table, Divider, Row, Col, Collapse } from "antd";
import { DATE_FORMAT_SLASH } from "../../constants";
import uuid from "uuid";
const { Title, Paragraph } = Typography;
const MilestonePdf = (props) => {
  const { milestones } = props;
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
      width: 100,
    },
    {
      title: "To/Deadline",
      render: (record) => record.toDate.format(DATE_FORMAT_SLASH),
      width: 100,
    },
    {
      title: "Notes",
      dataIndex: "time",
      key: "time",
      width: 300,
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
    <div id="divToPrint" style={{ padding: "20px", fontFamily: "Arial" }}>
      <Typography>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontFamily: "Arial, sans-serif",
            textAlign: "center",
            margin: "0",
            pading: "20px",
          }}
        >
          <div style={{ marginBottom: "30px" }}>
            {/* <img
              src={`${process.env.PUBLIC_URL}/assets/photos/FPT_logo_2010.webp`}
              alt="logo"
              className="logoImg" */}
            {/* /> */}
          </div>

          <Title
            level={1}
            style={{ textAlign: "center", fontSize: "2em", color: "#0056b3" }}
          >
            SE CAPSTONE PROJECT (SEP490)
          </Title>
          <Title
            level={2}
            style={{ textAlign: "center", fontSize: "1.5em", color: "#007bff" }}
          >
            INTRODUCTION AND PLANNING – SUMMER 2024
          </Title>
        </div>
        <div style={{ padding: "40px", fontFamily: "Arial, sans-serif" }}>
          <h3
            style={{
              color: "#0056b3",
              fontSize: "1.8em",
              borderBottom: "2px solid #0056b3",
              paddingBottom: "10px",
            }}
          >
            Subject Overview
          </h3>
          <Paragraph>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li style={{ marginBottom: "15px", fontSize: "1.1em" }}>
                <strong>Target:</strong> students to work in teams of 5
                students, to complete a specific software application or system.
              </li>
              <li style={{ marginBottom: "15px", fontSize: "1.1em" }}>
                <strong>Product topic & scope:</strong>: as provided/agreed with
                the supervisor
              </li>
              <li style={{ marginBottom: "15px", fontSize: "1.1em" }}>
                Product size are required to be equivalent to 20-25 medium UCs
                (3-7 transactions for each UC; action buttons on the screen, end
                user interactions to the software screens/functions or database
                transactions can be counted as transaction)
              </li>
              <li style={{ marginBottom: "15px", fontSize: "1.1em" }}>
                <strong>Process:</strong> full life cycle - requirement, design,
                code, test (UT, IT, ST, AT)
              </li>
              <li style={{ marginBottom: "15px", fontSize: "1.1em" }}>
                Recommended methodology: iterative & incremental (or RUP)
              </li>
              <li style={{ marginBottom: "15px", fontSize: "1.1em" }}>
                Templates & guides:{" "}
                <a href="https://cmshn.fpt.edu.vn/mod/folder/view.php?id=150581">
                  https://cmshn.fpt.edu.vn/mod/folder/view.php?id=150581
                </a>
              </li>
              <li style={{ marginBottom: "15px", fontSize: "1.1em" }}>
                <strong>Tools & Technologies:</strong>
              </li>

              <li>
                <strong>Technologies/Platforms:</strong> decided by the
                students, with consulting from supervisor
              </li>
              <li>
                <strong>Recommended Tools</strong> (using student’s FPT email
                account):
                <ul>
                  <li>Diagrams: Visual Paradigm (diagrams.net)</li>
                  <li>Mockup Prototype: Pencil, Figma, ..</li>
                  <li>Sources & Project Issue Management: GitLab</li>
                  <li>Document/Files Management: OneDrive or Google Drive</li>
                  <li>
                    Email notifications: integrate with the MailTrap
                    <a href="https://mailtrap.io">(https://mailtrap.io)</a>
                  </li>
                  <li>SMS OTP verification: integrate with Google Firebase</li>
                </ul>
              </li>
            </ul>
          </Paragraph>
        </div>

        {/* <Title level={3}></Title> */}
        <Title
          level={2}
          style={{
            textAlign: "center",
            color: "#0056b3",
            marginBottom: "20px",
          }}
        >
          Milestones & Deliverables
        </Title>
        <Table
          columns={columnMilestoneGuidance}
          dataSource={milestones}
          rowKey={(record) => record.id || uuid()}
          pagination={false}
          bordered
          style={{ border: "1px solid #ddd" }}
          rowClassName={(record, index) =>
            index % 2 === 0
              ? { backgroundColor: "#f0f8ff" }
              : { backgroundColor: "#ffffff" }
          }
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
                  <Collapse accordion>
                    {record?.detail.map((item) => (
                      <Panel
                        header={
                          <Row
                            style={{
                              width: "100%",
                              // paddingLeft: "50px",
                            }}
                          >
                            <Col span={4}>{item.name}</Col>
                            <Col span={4}>
                              {item?.fromDate?.format(DATE_FORMAT_SLASH)}
                            </Col>
                            <Col span={4}>
                              {item?.toDate?.format(DATE_FORMAT_SLASH)}
                            </Col>
                            <Col span={12}>{item.time}</Col>
                          </Row>
                        }
                        key={item.key}
                      >
                        {item.detail.map((detail, index) => (
                          <Row key={index} style={{ paddingLeft: "24px" }}>
                            <Col xs={8}>{detail.product}</Col>
                            <Col xs={4}>
                              {detail?.toDate?.format(DATE_FORMAT_SLASH)}
                            </Col>
                            <Col xs={12}>{detail.time}</Col>
                          </Row>
                        ))}
                      </Panel>
                    ))}
                  </Collapse>
                )}
              </>
            ),
            rowExpandable: (record) => record.detail?.length > 0,
            expandIconColumnIndex: 0,
          }}
        />

        <Title level={3}>Daily Project Tracking</Title>
        <Paragraph>
          <ul>
            <li>WP Status</li>
            <ul>
              <li>Pending</li>
              <li>Doing</li>
              <li>Deferred</li>
              <li>Cancelled</li>
              <li>Done</li>
            </ul>
          </ul>
        </Paragraph>

        <Title level={3}>Student Evaluation</Title>
        <Paragraph>
          <ul>
            <li>
              On going evaluation (50% of student GPA, other 50% is by the
              thesis presentation council in the final presentation)
            </li>
            <li>
              Comments for thesis: supervisors to be requested to send in the
              week 13
            </li>
            <li>Who: supervisor/supervisor/GVHD</li>
            <li>
              When:
              <ul>
                <li>After each report submission</li>
                <li>Might be updated right after report 7 submission</li>
              </ul>
            </li>
          </ul>
        </Paragraph>
      </Typography>
    </div>
  );
};
export default memo(
  withRouter(
    inject(
      "authenticationStore",
      "loadingAnimationStore",
      "studentStore",
      "groupStore"
    )(observer(MilestonePdf))
  )
);
