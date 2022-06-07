// module
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./shared/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

// components
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Header from "./pages/Header";

const Home = ({ setIsLogin }) => {
  let navigation = useNavigate();

  const logout = () => {
    signOut(auth).then(() => {
      setIsLogin(false);
      navigation("/login");
    });
  };
  return (
    <div>
      <h1>홈페이지 입니다!</h1>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

function App() {
  const [is_login, setIsLogin] = useState(false);

  const checkLogIn = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      console.log("아이디를 확인해주세요");
      setIsLogin(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, checkLogIn);
  }, []);

  return (
    <>
      <AppStyle className="App">
        <Header />
        <Routes>
          {is_login ? <Home /> : <Login />}
          <Route path="/" element={<Home setIsLogin={setIsLogin} />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </AppStyle>
    </>
  );
}

const AppStyle = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: white;
`;

export default App;
