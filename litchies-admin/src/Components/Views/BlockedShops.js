import React from 'react'
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Box, Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";


export default function BlockedShops() {
  const [verify, setVerify] = useState([]);

  const fetchData = () => {
    fetch("http://43.205.116.96:3000/Shop/GetAllBlockedShops")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setVerify(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box>
      {verify.length > 0 && (
        <ul>
          {verify.map((verifieduser) => (
            <List
              sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}
            >
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={verifieduser?.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {verifieduser.kartaName}
                      </Typography>{" "}
                      <Box></Box>
                      {verifieduser.mobile}
                      <Box >
                        <Button
                          variant="contained"
                          color="error"
                          startIcon={<BlockIcon />}
                        >
                        </Button>
                      </Box>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          ))}
        </ul>
      )}
    </Box>
  );
}
