import React from 'react'
import { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import BlockIcon from "@mui/icons-material/Block";


export default function BlockedShops() {
  const [verify, setVerify] = useState([]);

  const fetchData = () => {
    fetch("http://localhost:3000/Shop/GetAllBlockedShops")
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
      <div>
        {verify.length > 0 && (
          <ul>
            {verify.map((verifieduser) => (
              <List
                sx={{ width: "100%", maxWidth: 800, bgcolor: "background.paper" }}
                className="reqList"
              >
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={verifieduser.name}
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
                        <div></div>
                        {verifieduser.mobile}
                        <div className="ShowProducts">
                          <Button
                            variant="contained"
                            color="error"
                            startIcon={<BlockIcon />}
                          >
                          </Button>
                        </div>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            ))}
          </ul>
        )}
      </div>
    );
}
