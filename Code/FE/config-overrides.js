const {
  override,
  fixBabelImports,
  addLessLoader,
  disableEsLint,
  addDecoratorsLegacy,
  useBabelRc,
  addPostcssPlugins,
} = require("customize-cra");

module.exports = override(
  disableEsLint(),
  useBabelRc(),
  addDecoratorsLegacy(),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "primary-color": "#2C65AC",
      "breadcrumb-last-item-color": "#2C65AC",
      "breadcrumb-link-color": "#2C65AC",
      "breadcrumb-separator-color": "#2C65AC",
      "font-family": '"Noto Sans Display"',
      "font-size-base": "12px",
      "btn-font-weight": "500",
    },
  }),
  addPostcssPlugins([require("tailwindcss"), require("autoprefixer")])
);
