import * as React from "react"
import Navbar from "./Components/ToolBar/Navbar.js"
import { Outlet } from "react-router-dom"

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default App;
