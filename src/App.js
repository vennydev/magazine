// module
import styled from "styled-components";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "./shared/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loadPostsFB } from "./redux/modules/posts";

// components
import Header from "./components/Header";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WritePost from "./pages/WritePost";
import PrivateHome from "./pages/PrivateHome";
import PublicHome from "./pages/PublicHome";

function App() {
  const [is_login, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkLogIn = async (user) => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, checkLogIn);
  }, []);

  // useEffect(() => {
  //   dispatch(loadPostsFB());
  // }, []);
  return (
    <>
      <AppStyle className="App">
        <Header setIsLogin={setIsLogin} is_login={is_login} />
        <Routes>
          {is_login ? (
            <PrivateHome />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          <Route path="/" element={<PrivateHome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/post" element={<WritePost />} />
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
