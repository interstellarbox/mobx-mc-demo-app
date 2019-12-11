import styled from "styled-components";

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${({ flexDirection }) =>
    flexDirection ? flexDirection : "row"};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
  justify-content: ${({ justify }) => (justify ? justify : "center")};
  min-height: ${({ minHeight }) => (minHeight ? minHeight : "0")};
`;

export default FlexBox;
