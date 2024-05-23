import React, { useEffect, useState } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import axios from "axios";
import { ConfigProvider, message } from "antd";
import viVN from "antd/es/locale/vi_VN";
import moment from "moment";
import "moment/locale/vi";
import ThemeProvider from "./providers/ThemeProvider";
// React Router
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
// MobX
import { Provider } from "mobx-react";
import "mobx-react-lite/batchingForReactDom";
import loadingAnimationStore from "./stores/loadingAnimationStore";
import authenticationStore from "./stores/authenticationStore";
import commandStore from "./stores/commandStore";
import commonStore from "./stores/commonStore";
import commonServiceStore from "./stores/commonServiceStore";
import accountStore from "./stores/accountStore";
import moduleStore from "./stores/moduleStore";
import aclStore from "./stores/aclStore";
import userStore from "./stores/userStore";
import mentorStore from "./stores/mentorStore.js";
import companyStore from "./stores/companyStore";
import groupStore from "./stores/groupStore";

// Pages
import NotFoundPage from "./pages/NotFoundPage";
import HomePage from "./pages/HomePage";
//ProposalPage
//Demo
import DemoTagPage from "./pages/Demo/index";

// Styling
import "./App.less";
import { useSSO } from "./config";

import { normalRoutes, routes } from "./routes";
import Report from "./components/MainSidebar/Report";
//keycloak
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import notificationStore from "./stores/notificationStore";
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem("jwt") ||
      sessionStorage.getItem("jwt") ||
      sessionStorage.getItem("jwt") ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location },
          }}
        />
      )
    }
  />
);

const history = createBrowserHistory();

const rootStore = {
  loadingAnimationStore,
  authenticationStore,
  commonStore,
  commonServiceStore,
  commandStore,
  accountStore,
  notificationStore,
  moduleStore,
  aclStore,
  userStore,
  companyStore,
  groupStore,
  mentorStore,
};

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

const App = () => {
  const [ready, setReady] = useState(false);

  const eventLogger = (event, error) => {
    // console.log('onKeycloakEvent', event, error)

    if (event.toString() === "onReady") {
      setReady(true);
    }
  };

  const tokenLogger = (tokens) => {
    // console.log('tokenLogger', tokens)

    if (tokens.token) {
      saveToken(tokens.token);
    }
  };

  return <AppRouter />;
};

export const AppRouter = () => {
  const fakeKeycloak = {
    keycloak: { token: authenticationStore.appToken },
  };

  const { keycloak } = useSSO ? useKeycloak() : fakeKeycloak;

  useEffect(
    () => {
      // console.log('useEffect. keycloak.token', keycloak.token)
      if (useSSO) {
        saveToken(keycloak.token);
      }
    },
    useSSO ? [keycloak.token] : [authenticationStore.appToken]
  );

  useEffect(() => {
    // console.log('useEffect. check session login')
    if (!keycloak.token) return;
    (async () => {
      loadingAnimationStore.showSpinner(true);
      try {
        const { data } = await authenticationStore.checkCurrentUser();
        // await Promise.all([
        //   // aclStore.getACLDetailByUser(data.username),
        //   // commandStore.getCommandList(),
        //   // accountStore.getCurrentUserAccount(),
        //   // moduleStore.getModuleList(),
        //   // companyStore.getCompanyList(),
        // ]);
      } catch (err) {
        history.push("/login");
        console.log(err);
        localStorage.clear();
      } finally {
        loadingAnimationStore.showSpinner(false);
      }
    })();
  }, [authenticationStore.appToken]);
  useEffect(
    () => {
      if (!keycloak.token) return; // loadingAnimationStore.showSpinner(true)
      (async () => {
        try {
          // await Promise.allSettled([
          //   userStore.getMentionUserList(),
          //   notificationStore.getUnreadNotificationCount(),
          //   notificationStore.getUnreadNewsCount(),
          //   authenticationStore.getCurrentUserAvatar(),
          // ])
        } catch (err) {
          console.log(err);
          // message.error(err?.vi || 'Đã có lỗi xảy ra!')
        } finally {
          // loadingAnimationStore.showSpinner(false)
        }
      })();
    },
    useSSO ? [keycloak.token] : [authenticationStore.appToken]
  );
  return (
    <Provider {...rootStore}>
      <ThemeProvider>
        <ConfigProvider locale={viVN}>
          <Router history={history}>
            <Switch>
              {normalRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact
                  path={route.path}
                  component={route.component}
                />
              ))}

              <ProtectedRoute exact path={"/"} component={HomePage} />
              <ProtectedRoute exact path={"/home"} component={HomePage} />

              {routes.map((route) => (
                <ProtectedRoute
                  key={route.path}
                  exact
                  path={route.path}
                  component={route.component}
                />
              ))}

              <ProtectedRoute exact path={"/demo"} component={DemoTagPage} />

              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </ConfigProvider>
        <LoadingSpinner />
        <div
          style={{
            position: "fixed",
            top: 17,
            right: 10,
            zIndex: 10000000001,
          }}
        >
          <Report />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
