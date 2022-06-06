// module
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

// components
import Signup from "./Components/Signup";
import Login from "./Components/Login";

function App() {
  return (
    <>
      <AppStyle className="App">
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </AppStyle>
    </>
  );
}

const AppStyle = styled.div`
  max-width: 350px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: white;
`;

export default App;
