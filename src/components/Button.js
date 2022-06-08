import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { auth } from "../shared/firebase";
import { signOut } from "firebase/auth";

const Button = ({ setIsLogin, is_login }) => {
  let navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      setIsLogin(false);
      navigate("/login");
    });
  };
  return (
    <div>
      <>
        {is_login ? (
          <>
            <Btn onClick={() => console.log("알림")}>알림</Btn>
            <Btn onClick={logout}>로그아웃</Btn>
          </>
        ) : (
          <>
            <Btn onClick={() => navigate("/login")}>로그인</Btn>
            <Btn onClick={() => navigate("/signup")}>회원가입</Btn>
          </>
        )}
      </>
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
