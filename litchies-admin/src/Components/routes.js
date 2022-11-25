
import { Box } from "@mui/system";
import * as React from "react"
import { Outlet } from "react-router-dom";
import Header from "../Components/ToolBar/Header";

function RoutesFunc() {
  return (
    <>
      <Header />
      <Box>
        <Outlet />
      </Box>

    </>
  );
}

export default RoutesFunc;
