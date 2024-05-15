import React, { useState } from "react";
import { blue, green, purple9, redPrimary } from "../../../color";
import {
  EyeOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  FilePdfOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileZipOutlined,
} from "@ant-design/icons";
import fileStore from "../../../stores/fileStore";
import FileViewPopup from "../../FileViewPopup";
import { Tooltip } from "antd";
import styled from "styled-components";

const FileItemWrapper = styled.div`
  word-break: break-word;
  white-space: pre-line;
  .view-icon {
    color: ${green};
    padding: 3px 8px;
    height: 18px;
    transform: translateY(1px);
    border-radius: 4px;
    margin-left: 4px;

    &:hover {
      background-color: #f0f0f0;
    }
  }
`;
const FileItem = (props) => {
  const { file_id, file_name, file_type, deleted, noAction } = props;

  const [isVisibleFileViewPopup, setIsVisibleFileViewPopup] = useState(false);

  const isFileTruc = window.location.pathname.includes("messages");

  const isFileLTVBNB = window.location.pathname.includes(
    "internal-connected-document"
  );
  let iconFile = <FileTextOutlined />;
  if (file_type === "pdf") {
    iconFile = <FilePdfOutlined style={{ color: redPrimary }} />;
  }
  if (file_type === "doc" || file_type === "docx") {
    iconFile = <FileWordOutlined style={{ color: blue }} />;
  }
  if (
    [
      "jpg",
      "bmp",
      "dib",
      "jpe",
      "jfif",
      "gif",
      "tif",
      "tiff",
      "png",
      "heic",
    ].includes(file_type)
  ) {
    iconFile = <FileImageOutlined style={{ color: purple9 }} />;
  }
  if (file_type === "rar" || file_type === "zip") {
    iconFile = <FileZipOutlined style={{ color: "#e67e22" }} />;
  }
  if (file_type === "xlsx" || file_type === "xls") {
    iconFile = <FileExcelOutlined style={{ color: green }} />;
  }

  return (
    <FileItemWrapper style={{ display: "flex" }}>
      <Tooltip title={noAction ? null : "Tải xuống"}>
        <span
          style={{ color: blue, cursor: "pointer" }}
          onClick={() => {
            if (noAction) return;
            if (deleted) return;

            if (isFileTruc)
              return fileStore.handleDownloadFileTruc(file_id, file_name);

            return fileStore.handleDownloadFile(file_id, file_name);
          }}
          className={"file-item"}
        >
          {!props.noIcon && iconFile} {file_name}
        </span>
      </Tooltip>
      {!noAction &&
        !props.noPreview &&
        file_type &&
        [
          "pdf",
          "doc",
          "docx",
          "xlsx",
          "xls",
          "jpg",
          "bmp",
          "dib",
          "jpe",
          "jfif",
          "gif",
          "tif",
          "tiff",
          "png",
          "heic",
        ].includes(file_type) && (
          <Tooltip title={"Xem tài liệu"}>
            <EyeOutlined
              className={"view-icon"}
              onClick={() => setIsVisibleFileViewPopup(true)}
            />
          </Tooltip>
        )}
      <FileViewPopup
        file={{
          file_name: file_name,
          file_id: file_id,
        }}
        isVisibleFileViewPopup={isVisibleFileViewPopup}
        handleCloseFileViewPopup={() => setIsVisibleFileViewPopup(false)}
      />
    </FileItemWrapper>
  );
};

FileItem.propTypes = {};

export default FileItem;
