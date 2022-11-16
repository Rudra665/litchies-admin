import React from "react";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

export default function CreateShop() {
  const [img, setImg] = useState({ preview: "", raw: "" });

  const onImageChange = (e) => {
    if (e.target.files.length) {
      setImg({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const [state, setState] = useState({
    name: "",
    kartaName: "",
    email: "",
    aadharNo: "",
    panNo: "",
    gstNo: "",
    mobile: "",
    password: "",
    address: "",
    state: "",
    city: "",
    pincode: "",
    shopImg: "",
    isVerified: true,
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", img.raw);
    await axios
      .post("http://localhost:3000/uploadImage", formData)
      .then((response1) => {
        if (response1.status === 200)
          alert("Image Successfully Uploaded")
        return response1;
      })
      .then((response) => {
        return JSON.stringify(response.data.name);
      })
      .then((img) => {
        setState({
          name: state.name,
          kartaName: state.kartaName,
          email: state.email,
          aadharNo: state.aadharNo,
          panNo: state.panNo,
          gstNo: state.gstNo,
          mobile: state.mobile,
          password: state.password,
          address: state.address,
          state: state.state,
          city: state.city,
          pincode: state.pincode,
          shopImg: img.replaceAll('"', "")
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const shopData = {
      name: state.name,
      kartaName: state.kartaName,
      email: state.email,
      aadharNo: state.aadharNo,
      shopImg: state.shopImg,
      panNo: state.panNo,
      gstNo: state.gstNo,
      mobile: state.mobile,
      password: state.password,
      address: state.address,
      state: state.state,
      city: state.city,
      pincode: state.pincode,
      isVerified: state.isVerified,
    };

    axios
      .post("http://localhost:3000/Shop/CreateShop", shopData)
      .then((response) => {
        if (response.status === 200)
          alert("Shop Successfully Created")
      });
    window.location.reload();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          style={{ padding: "100px" }}
          sx={{
            height: "200vh",
            width: "100%",
            "& .MuiTextField-root": { m: 1, width: "65ch" },
          }}
        >
          <h1 style={{ textAlign: "center" }}>Create your shop</h1>
          <div
            style={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              name="name"
              type="text"
              label="Shop Name"
              value={state.name}
              onChange={handleChange}
            ></TextField>
            <TextField
              name="kartaName"
              type="text"
              label="Karta Name"
              value={state.kartaName}
              onChange={handleChange}
            />
            <TextField
              name="email"
              type="text"
              label="Email"
              value={state.email}
              onChange={handleChange}
            />
            <TextField
              name="password"
              type="text"
              label="Password"
              value={state.password}
              onChange={handleChange}
            ></TextField>
            <TextField
              name="aadharNo"
              label="Aadhar Number"
              type="text"
              value={state.aadharNo}
              onChange={handleChange}
            />
            <TextField
              name="panNo"
              label="PAN Number"
              value={state.panNo}
              onChange={handleChange}
              type="text"
            />
            <TextField
              name="gstNo"
              label="GST Number"
              value={state.gstNo}
              type="text"
              onChange={handleChange}
            />
            <TextField
              name="mobile"
              label="Mobile Number"
              value={state.mobile}
              onChange={handleChange}
              type="text"
            />
            <TextField
              name="address"
              label="Address"
              value={state.address}
              onChange={handleChange}
              type="text"
            />
            <TextField
              name="state"
              label="State"
              value={state.state}
              onChange={handleChange}
              type="text"
            />
            <TextField
              name="city"
              label="City"
              value={state.city}
              onChange={handleChange}
              type="text"
            />
            <TextField
              name="pincode"
              label="Pin Code"
              value={state.pincode}
              onChange={handleChange}
              type="text"
            />
            <TextField label="Shop Image" value={state.shopImg}>
              {" "}
            </TextField>
          </div>
          <div display="flex" align="center" marginTop="24">

            <input accept="image/*" type="file" onChange={onImageChange} />
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
            >
              Upload
            </Button>
            <Box>
              <img
                src={img.preview}
                alt="."
                className="Pimage" /></Box>
          </div>
          <Box align="center" sx={{ "& .MuiButton-root": { m: 1 }, }}>
            <Button

              variant="contained"
              color="success"
              type="submit"

            >
              Create
            </Button>
          </Box>
        </Box>
      </form>
    </>
  );
}
