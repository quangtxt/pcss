import React, { useState, useEffect } from "react";

import "./App.css";

import axios from "axios";
import { ConfigProvider, message } from "antd";
import viVN from "antd/es/locale/vi_VN";
import moment from "moment";
import {
  Navigate,
  Route,
  Router,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import { createBrowserHistory } from "history";

import LoadingSpinner from "./components/LoadingSpinner";

// import { StoreContext } from "./stores/storeContext";

import ThemeProvider from "./providers/ThemeProvider";

import { normalRoutes, routes } from "./routes";

import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
import commonStore from "./stores/commonStore";
import loadingAnimationStore from "./stores/loadingAnimationStore";
import authenticationStore from "./stores/authenticationStore";
import notificationStore from "./stores/notificationStore";
import groupStore from "./stores/groupStore";
import supervisorStore from "./stores/supervisorStore";
import studentStore from "./stores/studentStore";
import meetingStore from "./stores/meetingStore";
import mentorStore from "./stores/mentorStore";

const rootStore = {
  commonStore,
  loadingAnimationStore,
  authenticationStore,
  notificationStore,
  groupStore,
  supervisorStore,
  studentStore,
  meetingStore,
  mentorStore,
};
export const StoreContext = React.createContext();

const history = createBrowserHistory();
axios.defaults.timeout = 60000;
axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isCancel(error)) {
      return Promise.resolve();
    }
    if (error?.response?.status === 408 || error?.code === "ECONNABORTED") {
      message.config({
        maxCount: 1,
      });
      message.error("Request timeout!");
      authenticationStore.userLogout();
      history.push("/login");
    }

    var errorMessage = error?.response?.data?.errorMessage?.messages;
    if (errorMessage) {
      errorMessage.errorCode = error?.response?.data?.errorMessage?.errorCode;
    }

    return Promise.reject(
      errorMessage || {
        vi: "Đã có lỗi xảy ra trong quá trình kết nối!",
      }
    );
  }
);

moment.locale("vi", {
  week: {
    dow: 1,
  },
});

const saveToken = (tokenValue) => {
  if (tokenValue) {
    let objToken = {
      access_token: tokenValue,
    };
    localStorage.setItem("jwt", JSON.stringify(objToken));
    authenticationStore.setAppToken(JSON.stringify(objToken));
  }
};
// React Router
const App = () => {
  const current =
    localStorage.getItem("jwt") ||
    sessionStorage.getItem("jwt") ||
    sessionStorage.getItem("jwt")
      ? true
      : false;
  const [isAuthenticated, setIsAuthenticated] = useState(current);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    (async () => {
      loadingAnimationStore.showSpinner(true);
      try {
        const response = await authenticationStore.checkCurrentUser();
        setCurrentUser(response.data);
      } catch (err) {
        history.push("/login");
        console.log(err);
        localStorage.clear();
      } finally {
        loadingAnimationStore.showSpinner(false);
      }
    })();
  }, []);
  return (
    <StoreContext.Provider
      value={{ ...rootStore, currentUser, setCurrentUser }}
    >
      <ThemeProvider>
        <ConfigProvider locale={viVN}>
          <BrowserRouter>
            <Routes>
              {normalRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact
                  path={route.path}
                  element={<route.component />}
                />
              ))}
              <Route
                exact
                path="/"
                element={
                  isAuthenticated ? <HomePage /> : <Navigate to="/login" />
                }
              />
              <Route
                exact
                path="/home"
                element={
                  isAuthenticated ? <HomePage /> : <Navigate to="/login" />
                }
              />
              {routes.map((route) => (
                <Route
                  key={route.path}
                  exact
                  path={route.path}
                  element={
                    isAuthenticated ? (
                      <route.component />
                    ) : (
                      <Navigate to="/login" />
                    )
                  }
                />
              ))}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </BrowserRouter>
        </ConfigProvider>
        {/* <LoadingSpinner /> */}
      </ThemeProvider>
    </StoreContext.Provider>
  );
};

export default App;
