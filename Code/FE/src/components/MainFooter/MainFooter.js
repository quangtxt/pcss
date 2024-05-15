import React from "react";
import {
  FooterContainer,
  FooterContent,
  FooterWrapper,
} from "./MainFooterStyled";
import pjson from "../../../package.json";

const MainFooter = () => {
  return (
    <FooterWrapper
      imgUrl={`${process.env.PUBLIC_URL}/assets/icons/footer_bg.jpg`}
    >
      <FooterContainer>
        <FooterContent>
          <img
            width="387"
            height="32"
            src={`${process.env.PUBLIC_URL}/assets/icons/logo--footer.png`}
            alt="logo  footer"
          />
          <div style={{ textAlign: "left" }}>
            <div>Supported by Center of Information and Technology</div>
            <div>
              Call IT: 1866 | Leave message{" "}
              <a href="" target="_blank">
                here
              </a>{" "}
              | Send email:{" "}
              <span style={{ textDecoration: "underline" }}>support@.co</span> |{" "}
              {`v${pjson.version}`}
            </div>
          </div>
        </FooterContent>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default MainFooter;
