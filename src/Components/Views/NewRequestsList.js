import React from "react";
import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import NewRequestCard from "./Cards/NewRequestCard"
import empty from "../Elements/Images/empty1.gif"
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
            display: "flex",
                        width: "96vw",
                        margin: "50px",
                        justifyContent: "center",
                        "& .MuiTableCell-root": { width: "1ch" },
                        flexWrap: "wrap",
                        bgcolor:"#4b5b84"
        }}
        >
          <Container>

            {users.map((verifieduser) => (
              <NewRequestCard Shop_Name={verifieduser.name} Karta_Name={verifieduser.kartaName} Mobile={verifieduser.mobile} imgUrl={verifieduser.shopImg} id={verifieduser._id} />
            ))}
          </Container>
        </Box >) :
        (
          <Box display="inlineFlex" alignItems="center" height="100vh" justifyContent="center" sx={{backgroundColor: "#4b5b84"}}>
            <Box >
            <Typography align='center' mb="3vh" variant="h3" style={{zIndex:'3'}}>New Requests</Typography>

              <Box display="flex" justifyContent="center">
                <img src={empty} width='500px'></img>
              </Box>
            </Box>
          </Box>)
      }
    </>
  );
}
