import React from "react";
import { useEffect, useState } from "react";

import { Box, Typography } from "@mui/material";
import NewRequestCard from "./Cards/NewRequestCard"
import empty from "../Elements/Images/empty.gif"
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
                        flexWrap: "wrap"
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
