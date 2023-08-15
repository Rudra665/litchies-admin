import { Box } from "@mui/system";
import * as React from "react"
import { Outlet } from "react-router-dom";
import SideBar from "./Components/Elements/SideBar/SideBar.js";

function RoutesFunc() {
  
  return (
    <>
    <Box>
      
      <SideBar />
      <div style={{marginLeft:'100px'}}>
        <Outlet />
      </div>
      </Box>
    </>
  );
}

export default RoutesFunc;
