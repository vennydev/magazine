import styled from "styled-components";

const Layout = (props) => {
  const { children, is_flex } = props;
  const styles = { is_flex };
  return <LayoutStyle {...styles}>{children}</LayoutStyle>;
};

const LayoutStyle = styled.div`
  width: 100%;
  box-sizing: border-box;
  height: 100%;
  margin-top: 20px;
  ${(props) =>
    props.is_flex
      ? "display:flex;"
      : "display:flex; flex-direction:column; align-items:center"}
`;

export default Layout;
