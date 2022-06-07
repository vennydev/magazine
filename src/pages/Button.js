import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = () => {
  let navigation = useNavigate();

  return (
    <div>
      <Btn onClick={() => navigation("/signup")}>회원가입</Btn>
      <Btn onClick={() => navigation("/login")}>로그인</Btn>
    </div>
  );
};

const Btn = styled.button`
  all: unset;
  padding: 10px 15px;
  background-color: #9c88ff;
  color: white;
  border-radius: 4px;
  margin-left: 14px;
  cursor: pointer;
`;

export default Button;
