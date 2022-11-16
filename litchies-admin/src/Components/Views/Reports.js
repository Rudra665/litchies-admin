import React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import axios from "axios";

export default function Reports() {
  const [user, setUser] = useState([]);

  const User = (props) => {
    axios
      .get(`http://localhost:3000/user/getUser/${props.id}`)
      .then((response) => {
        return JSON.stringify(
          response.data.firstName + "  " + response.data.lastName
        );
      })
      .then((res) => {
        setUser(res.replaceAll('"', ""));
      });
  };

  const [report, setReport] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:3000/report/getAllReports")
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
            margin: "50px",
            "& .MuiTableCell-root": { width: "1ch" },
          }}
        >
          <TableContainer component={Paper}>
            <Table size="large">
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
