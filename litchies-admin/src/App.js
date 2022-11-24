import { Routes, Route, HashRouter, BrowserRouter } from "react-router-dom";
import SignIn from "./Components/Views/LoginForm";
import RoutesFunc from "./Components/routes";
import * as React from "react"
function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignIn />}></Route>
          <Route path="admin/*" element={<RoutesFunc />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
