import React from "react";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { NavLink } from "react-router-dom";
import { Box } from "@mui/material";

export default function NewRequestList() {
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    fetch("http://43.205.116.96:3000/Shop/GetAllShops")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUsers(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {users.length > 0 && (
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
                    Shop Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Karta Name
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    Phone Number
                  </TableCell>
                  <TableCell style={{ fontWeight: "bold" }} align="right">
                    View Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((verifieduser) => (
                  <TableRow
                    key={verifieduser.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {verifieduser.name}
                    </TableCell>
                    <TableCell align="right">
                      {verifieduser.kartaName}
                    </TableCell>
                    <TableCell align="right">{verifieduser.mobile}</TableCell>
                    <TableCell align="right">
                      {<NavLink to={verifieduser._id}>Click Here</NavLink>}
                    </TableCell>
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
