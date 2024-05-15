import React, { memo, useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { List, message } from "antd";
import { inject, observer } from "mobx-react";
import { withRouter } from "react-router-dom";
import { apiUrl } from "./../../config";
import {
  AvatarItem,
  ContentNotification,
  ListItemLeft,
  ListItemRight,
  ListItemWrapper,
  ListWrapper,
} from "./PopupNotificationPageStyled";
import EmptyContent from "../../components/EmptyContent";
import { LoadingOutlined } from "@ant-design/icons";
import date_format from "../../date_format";
import { blue } from "../../color";
import { subStringAvatar } from "../../components/Common/CellText";
import { StatusTag } from "../../components/Common/StatusTag";
import { NOTIFICATION_STATUS, TYPE_STATUS } from "../../constants";

const PopupNotificationPage = (props) => {};

PopupNotificationPage.propTypes = {
  notificationStore: PropTypes.object,
  loadingAnimationStore: PropTypes.object,
};

export default memo(withRouter(inject()(observer(PopupNotificationPage))));
