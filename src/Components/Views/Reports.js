import React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import axios from "axios";

export default function Reports() {
  const [user, setUser] = useState([]);

  const User = (props) => {
    axios
      .get(`http://43.205.116.96:3000/user/getUser/${props.id}`)
      .then((response) => {
        return JSON.stringify(
          response.data.firstName + "  " + response.data.lastName
        );
      })
      .then((res) => {
        setUser(res.replaceAll('', ""));
      });
  };

  const [report, setReport] = useState([]);

  const fetchData = () => {
    fetch("http://43.205.116.96:3000/report/getAllReports")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setReport(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {report.length > 0 && (
        <Box
          sx={{
            padding:"30px",
            width:"100%",
            height:"100vh",
            "& .MuiTableCell-root": { width: "1ch" },
            bgcolor:"#94acc3"
          }}
        >
                    <Typography align='center' mb="3vh" variant="h3" style={{zIndex:'3'}}>Reports</Typography>

          <TableContainer component={Paper} sx={{bgcolor:"#4b5b84",ml:"5%", width:"90%" }}>
            <Table size="large" >
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bold" }}>
                    Product Id
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>User Id</TableCell>
                  <TableCell style={{ fontWeight: "bold" }}>
                    User Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Message
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {report.map((reports) => (
                  <TableRow>
                    <TableCell>{reports.productId}</TableCell>
                    <TableCell>{reports.userId}</TableCell>
                    <TableCell>
                      <User id={reports.userId} />
                      {user}
                    </TableCell>
                    <TableCell align="right">{reports.message}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}
