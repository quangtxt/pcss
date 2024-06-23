import styled from "styled-components";

export const MainEmpty = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(116, 112, 233, 0.05);
  box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset,
    rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
  overflow: hidden;
  overflow-x: auto;
`;
export const EmptyTop = styled.div`
  text-align: center;
  margin-top: 10%;
`;
export const EmptyBottom = styled.div`
text-align: center;
color: red;
font-size: 20px;
font-weight: bolder;
}
`;
