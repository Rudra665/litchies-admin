import * as React from "react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import axios from "axios";
import { padding } from "@mui/system";

export default function ShopTemplate() {
  const [user, setUser] = useState([]);
  const { id } = useParams();
  const fetchData = () => {
    fetch(`http://43.205.116.96:3000/Shop/GetShopById/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUser(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const verified = () => {
    axios
      .put(`http://43.205.116.96:3000/Shop/ChangeVerifiedStatus/${id}`)
      .then((response) => {
        return response.json();
      });
    alert(`Shop Verified`)
  };


  const blocked = () => {
    axios
      .put(`http://43.205.116.96:3000/Shop/ChangeBlockedStatus/${id}`)
      .then((response) => {
        return response.json();
      });
  };

  const url = `http://43.205.116.96:3000/images/${user.shopImg}`;

  return (
    <>
      <Container maxWidth="lg">

        <Box
          sx={{
            bgcolor: "#fce2d4",
            height: "100vh",
            width: "100%",
            "& .MuiTextField-root": { m: 1 },

          }}
          align="center"
        >
          <h1 >Verify Status</h1>
          <Box sx={{
            width: "90vh",
            display: "flex",
            justifyContent: "space-between",
            marginY: 5,

          }}>
            <Box overflow="hidden" border="5px solid Black" height="fitContent" borderRadius="50%">
              <img width="200vh" src={url} alt="ShopImage" />
            </Box>
            <Box maxWidth="50vh">
              <TextField
                id="shopName"
                fullWidth
                label="Shop Name"
                value={user.name}
                defaultValue="Name"
              />
              <TextField
                fullWidth
                id="kartaName"
                label="Karta Name"
                value={user.kartaName}
                defaultValue="Karta"
              />

              <TextField
                fullWidth
                id="filled-basic"
                label="Aadhar Number"
                value={user.aadharNo}
                defaultValue="0"
              />

              <TextField
                fullWidth
                id="filled-basic"
                label="PAN Number"
                defaultValue="00"
                value={user.panNo}
              />
              <TextField
                fullWidth
                id="gstNo"
                defaultValue="00"
                label="GST Number"
                value={user.gstNo}
              />
              <TextField
                fullWidth
                id="phoneNo"
                defaultValue="00"
                label="Mobile Number"
                value={user.mobile}
              />
              <TextField
                fullWidth
                id="address"
                label="Address"
                value={user.address}
                defaultValue="No Address"
              />
              <TextField
                fullWidth
                id="state"
                label="State"
                defaultValue="UP"
                value={user.state}
              />
              <TextField
                fullWidth
                id="city"
                label="City"
                defaultValue="Agra"
                value={user.city}
              />
              <TextField
                fullWidth
                id="pinCode"
                label="Pin Code"
                defaultValue="282005"
                value={user.pincode}
              />
              <Box sx={{ "& .MuiButton-root": { m: 1 }, justifyContent:"space-between" }}>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<CheckIcon />}

                  onClick={() => verified()}
                >
                  Verify
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<BlockIcon />}
                  href="/admin/blockedShops"
                  onClick={() => blocked()}
                >
                  Block
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

    </>
  );
}
