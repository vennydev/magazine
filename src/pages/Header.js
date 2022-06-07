import styled from "styled-components";
import { AiOutlineAliwangwang } from "react-icons/ai";
import Button from "./Button";

const Header = () => {
  return (
    <HeaderStyle>
      <Logo className="logo">
        <AiOutlineAliwangwang />
      </Logo>
      <Button></Button>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10px;
  border-bottom: 1px solid black;
  box-shadow: 5px 5px;
  background-color: #dcdde1;
`;

const Logo = styled.div`
  font-size: 45px;
  cursor: pointer;
  line-height: 34px;
  margin-left: 20px;
`;

export default Header;
