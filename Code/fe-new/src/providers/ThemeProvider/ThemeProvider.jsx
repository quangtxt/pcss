import { useContext } from "react";
import { useObserver } from "mobx-react-lite";
import { StoreContext } from "../../App";
import { GlobalStyle } from "./ThemeProviderStyled";

const ThemeProvider = ({ children }) => {
  const { commonStore } = useContext(StoreContext);
  return useObserver(() => (
    <>
      <GlobalStyle theme={commonStore.appTheme} />
      {children}
    </>
  ));
};

export default ThemeProvider;
