import { Routes, Route, HashRouter } from "react-router-dom";
import SignIn from "./Components/Views/LoginForm";
import RoutesFunc from "./Components/routes";
import * as React from "react"
function App() {
  return (
    <>
    
      <HashRouter>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="/admin/*" element={<RoutesFunc />}></Route>
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
