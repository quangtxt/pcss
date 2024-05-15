import React from "react";
import { Tooltip } from "antd";
import { blue } from "../../color";
import utils from "../../utils";
import styled from "styled-components";

const TextLink = styled.span`
  a {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Text = (props) => (
  <a
    style={{
      color: "rgba(0,0,0)",
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    {props.children}
  </a>
);

export const TextUnread = (props) => (
  <a
    style={{
      color: "rgba(0,0,0)",
      display: "block",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      fontWeight: "bolder",
    }}
  >
    {props.children}
  </a>
);

export const TextWrap = (props) => (
  <a
    style={{
      display: "block",
      color: "rgba(0,0,0)",
      wordWrap: "break-word",
      wordBreak: "break-all",
      width: props.width,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    {props.children}
  </a>
);

export const TextWrapUnread = (props) => (
  <a
    style={{
      display: "block",
      color: "rgba(0,0,0)",
      fontWeight: "bolder",
      wordWrap: "break-word",
      wordBreak: "break-all",
      width: props.width,
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    }}
  >
    {props.children}
  </a>
);

export const UrlifiedText = (text) => {
  if (text) {
    const urlifiedText = utils.urlify(text);
    return <TextLink dangerouslySetInnerHTML={{ __html: urlifiedText }} />;
  }
  return <EmptyText>Không có</EmptyText>;
};

export const trimOverlengthString = (string, width) => {
  const style = {
    display: "block",
    wordWrap: "break-word",
    wordBreak: "break-all",
    width: width,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <Tooltip title={string}>
      <span style={style}>{string}</span>
    </Tooltip>
  );
};

export const trimOverLengthString = (string, length) => {
  if (string == null) return;
  if (string.length >= length) {
    return (
      <Tooltip title={string}>
        {string.substring(0, length).concat("...")}
      </Tooltip>
    );
  }
  return string;
};

export const subStringAvatar = (name) => name?.substring(0, 1).toUpperCase();

export const EmptyText = (props) => (
  <i style={{ color: "#928e8ecc", display: "inline-block", minWidth: 70 }}>
    {props.children}
  </i>
);

export const TitleContentBox = (props) => {
  const style = {
    fontWeight: 500,
    fontSize: 14,
    margin: "-16px -16px 10px -16px",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    padding: "10px 16px",
    color: "#fff",
    backgroundColor: blue,
  };
  return <h3 style={style}>{props.children}</h3>;
};

export const DivFlex = (props) => {
  const style = {
    display: "flex",
    justifyContent: props.justifyContent ?? "space-between",
    alignItems: props.alignItems ?? "center",
    margin: props.margin ?? "0px",
  };
  return <div style={style}>{props.children}</div>;
};

const WordBreakStyled = styled.div`
  word-break: normal;
  white-space: pre-line;
  div,
  p,
  span,
  figure,
  table {
    font-weight: 500;
  }
  img {
    width: 100%;
  }
`;

export const WordBreak = (content, isDangerouslySetInnerHTML = false) => {
  const style = {
    wordBreak: "normal",
    whiteSpace: "pre-line",
  };
  if (isDangerouslySetInnerHTML) {
    return <WordBreakStyled dangerouslySetInnerHTML={{ __html: content }} />;
  }
  return <div style={style}>{content}</div>;
};
