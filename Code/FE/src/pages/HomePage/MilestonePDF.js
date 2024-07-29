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
    <div>
      <div id="divToPrint" style={{ padding: "20px", fontFamily: "Arial" }}>
        <Typography>
          <Title level={1} style={{ textAlign: "center" }}>
            SE CAPSTONE PROJECT (SEP490)
          </Title>
          <Title level={2} style={{ textAlign: "center" }}>
            INTRODUCTION AND PLANNING – SUMMER 2024
          </Title>

          <Title level={3}>Subject Overview</Title>
          <Paragraph>
            <ul>
              <li>
                Target: students to work in teams of 5 students, to complete a
                specific software application or system.
              </li>
              <li>
                Product topic & scope: as provided/agreed with the supervisor
              </li>
              <li>
                Product size are required to be equivalent to 20-25 medium UCs
                (3-7 transactions for each UC; action buttons on the screen, end
                user interactions to the software screens/functions or database
                transactions can be counted as transaction)
              </li>
              <li>
                Process: full life cycle - requirement, design, code, test (UT,
                IT, ST, AT)
              </li>
              <li>Recommended methodology: iterative & incremental (or RUP)</li>
              <li>
                Templates & guides:{" "}
                <a href="https://cmshn.fpt.edu.vn/mod/folder/view.php?id=150581">
                  https://cmshn.fpt.edu.vn/mod/folder/view.php?id=150581
                </a>
              </li>
            </ul>
          </Paragraph>

          <Title level={3}>Tools & Technologies:</Title>
          <Paragraph>
            <ul>
              <li>
                Technologies/Platforms: decided by the students, with consulting
                from supervisor
              </li>
              <li>
                Recommended Tools (using student’s FPT email account):
                <ul>
                  <li>Diagrams: Visual Paradigm (diagrams.net)</li>
                  <li>Mockup Prototype: Pencil, Figma, ..</li>
                  <li>Sources & Project Issue Management: GitLab</li>
                  <li>Document/Files Management: OneDrive or Google Drive</li>
                  <li>
                    Email notifications: integrate with the MailTrap
                    (https://mailtrap.io)
                  </li>
                  <li>SMS OTP verification: integrate with Google Firebase</li>
                </ul>
              </li>
            </ul>
          </Paragraph>

          <Title level={3}>Milestones & Deliverables</Title>
          <Table
            columns={columnMilestoneGuidance}
            dataSource={milestones}
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
