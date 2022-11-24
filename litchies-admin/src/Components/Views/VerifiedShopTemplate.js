import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { TextField, Button, Typography, Grid, Chip } from "@mui/material";
import Container from "@mui/material/Container";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";


export default function VerifiedShopTemplate() {
  const [img, setImg] = useState({ preview: "", raw: "" });
  const [view, setView] = useState(false);

  const onImageChange = (e) => {

    if (e.target.files.length) {
      setImg({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setView(true);
    }
  };

  const [user, setUser] = useState({
    name: "",
    kartaName: "",
    aadharNo: "",
    panNo: "",
    gstNo: "",
    mobile: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    shopImg: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    alert("updated");
    e.preventDefault();
    const shopData = {
      name: user.name,
      kartaName: user.kartaName,
      aadharNo: user.aadharNo,
      panNo: user.panNo,
      gstNo: user.gstNo,
      mobile: user.mobile,
      address: user.address,
      state: user.state,
      city: user.city,
      pincode: user.pincode,
      shopImg: user.shopImg,
    };

    axios
      .put(`http://43.205.116.96:3000/Shop/UpdateShop/${id}`, shopData)
      .then((response) => {
        console.log(response.shopData);
      });
    window.location.reload()
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", img.raw);
    await axios
      .post("http://43.205.116.96:3000/uploadImage", formData)
      .then((response) => {
        return JSON.stringify(response.data.name);
      })
      .then((img) => {
        setUser({
          name: user.name,
          kartaName: user.kartaName,
          email: user.email,
          aadharNo: user.aadharNo,
          panNo: user.panNo,
          gstNo: user.gstNo,
          mobile: user.mobile,
          password: user.password,
          address: user.address,
          state: user.state,
          city: user.city,
          pincode: user.pincode,
          shopImg: img.replaceAll('"', "")
        });
      });
  };

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
    fetchData()
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>

        <Box
          padding="20px"
          align="center"
          sx={{
            bgcolor: "#fce2d4",
            display: "flex",
            justifyContent: "center",
            height: "fit-content",
            borderRadius: "25px",
            width: "100%",
            "& .MuiTextField-root": { m: 1, width: "65ch" },
          }}
        >
          <Container class="proContainer">
            <Typography variant="h3" >{user.name}</Typography>
            <Grid container columnSpacing={24}>
              <Grid item lg="6" sm="12">

                <h2>Shop Image</h2>
                {/* {user.shopImg && <img src={`http://43.205.116.96:3000/images/${user.shopImg}`} style={{
                  backgroundImage: !view1 ? `url('http://43.205.116.96:3000/images/${user.shopImg}')` : `url('${img.preview}')`,
                  position: "relative",
                  border: "5px solid #fff",
                  borderRadius: "50%",
                  width: "300px",
                  height: "300px",
                  backgroundSize: "100% 100%",
                  margin: "100px auto",
                  overflow: "hidden"
                }}
                ></img>} */}
                <Box className="wrapper" sx={{
                  backgroundImage: !view ? `url('http://43.205.116.96:3000/images/${user.shopImg}')` : `url('${img.preview}')`,
                  position: "relative",
                  border: "5px solid #fff",
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                  backgroundSize: "100% 100%",
                  margin: "100px auto",
                  overflow: "hidden"
                }}>
                  <input type="file" className="onclick" onClick={() => onImageChange()}></input>
                </Box>
                <Box marginY="2vh">
                  <Box >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleUpload}
                    >
                      Upload
                    </Button>
                  </Box>
                  <Button href={`admin/verifiedShopsList/showProducts/${user._id}`}>Show All products</Button>
                </Box>
              </Grid>
              <Grid item lg="6" sm="12">
                <Box maxWidth="md">
                  <Box marginY="2vh">
                    <TextField
                      name="name"
                      label="Shop Name"
                      value={user.name}
                      onChange={handleChange}
                    />
                    <TextField
                      name="kartaName"
                      label="Karta Name"
                      value={user.kartaName}
                      onChange={handleChange}
                    />

                    <TextField
                      name="aadharNo"
                      label="Aadhar Number"
                      value={user.aadharNo}
                      defaultValue="0"
                      onChange={handleChange}
                    />
                    <TextField
                      name="email"
                      label="E-mail"
                      defaultValue="0"
                      value={user.email}
                      onChange={handleChange}
                    />

                    <TextField
                      name="panNo"
                      label="PAN Number"
                      defaultValue="00"
                      value={user.panNo}
                      onChange={handleChange}
                    />
                    <TextField
                      name="gstNo"
                      defaultValue="00"
                      label="GST Number"
                      value={user.gstNo}
                      onChange={handleChange}
                    />
                    <TextField
                      name="mobile"
                      defaultValue="00"
                      label="Mobile Number"
                      value={user.mobile}
                      onChange={handleChange}
                    />
                    <TextField
                      name="address"
                      label="Address"
                      value={user.address}
                      defaultValue="No Address"
                      onChange={handleChange}
                    />
                    <TextField
                      name="state"
                      label="State"
                      defaultValue="UP"
                      value={user.state}
                      onChange={handleChange}
                    />
                    <TextField
                      name="city"
                      label="City"
                      defaultValue="Agra"
                      value={user.city}
                      onChange={handleChange}
                    />
                    <TextField
                      name="pincode"
                      label="Pin Code"
                      defaultValue="282005"
                      value={user.pincode}
                      onChange={handleChange}
                    />
                    <Box sx={{ "& .MuiButton-root": { m: 1 } }}>
                      <Button

                        variant="contained"
                        type="submit"
                        startIcon={<UpdateIcon />}
                      >
                        Update Shop
                      </Button>

                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

      </form >
    </>
  );
}
