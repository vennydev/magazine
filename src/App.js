import { Route, Routes } from "react-router-dom";
import Signup from "./Components/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />}></Route>
      </Routes>
    </div>
  );
}

export default App;
