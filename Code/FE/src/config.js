const merge = require("lodash/merge");

const config = {
  all: {
    env: process.env.NODE_ENV || "development",
    isDev: process.env.NODE_ENV !== "production",
    basename: process.env.PUBLIC_URL,
    systemName: process.env.REACT_APP_SYSTEM_NAME,
    isBrowser: typeof window !== "undefined",
    envName: process.env.REACT_APP_ENV_NAME,
    useSSO: process.env.REACT_APP_USE_SSO === "true",
  },
  test: {},
  development: {
    apiUrl: process.env.REACT_APP_API_URL,
    oauth: {
      clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
      clientSecret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
    },
  },
  production: {
    apiUrl: process.env.REACT_APP_API_URL,
    oauth: {
      clientId: process.env.REACT_APP_OAUTH_CLIENT_ID,
      clientSecret: process.env.REACT_APP_OAUTH_CLIENT_SECRET,
    },
  },
};

module.exports = merge(config.all, config[config.all.env]);
