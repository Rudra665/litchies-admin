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
import { Box, Typography } from "@mui/material";
import NewRequestCard from "./Cards/NewRequestCard"
import empty from "../Images/empty.gif"
import { Container } from "@mui/system";
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
      {users.length > 0 ? (
        <Box
          sx={{
            margin: "50px",
            "& .MuiTableCell-root": { width: "1ch" },
          }}
        >
          <Container>

            {users.map((verifieduser) => (
              <NewRequestCard Shop_Name={verifieduser.name} Karta_Name={verifieduser.kartaName} Mobile={verifieduser.mobile} imgUrl={verifieduser.shopImg} id={verifieduser._id} />
            ))}
          </Container>
        </Box >) :
        (
          <Box display="inlineFlex" alignItems="center" height="90vh" justifyContent="center">
            <Box >
              <Box display="flex" justifyContent="center">
                <img src={empty}></img>
              </Box>
              <Typography variant="h3" color="grey">There's Nothing My Lord</Typography>
            </Box>
          </Box>)
      }
    </>
  );
}
