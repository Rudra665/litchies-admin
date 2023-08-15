import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { TextField, Button, Autocomplete, Stack } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
// var webpack = require('webpack');
export default function CreateShop() {
  const [img, setImg] = useState({ preview: "", raw: "" });
  const [category, setCategory] = useState([]);

  const fetchCategories = () => {
    fetch("http://43.205.116.96:3000/productCategory/getAll")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCategory(data);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const onImageChange = (e) => {
    if (e.target.files.length) {
      setImg({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

const formik =useFormik({
  initialValues:{
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
    category: [],
    shopImg:""
  },
  onSubmit: values => {
    alert(JSON.stringify( values.category.map((e)=>e._id), null, 2));
      const formData = new FormData();
      formData.append("image", img.raw);
       axios
        .post("http://43.205.116.96:3000/uploadImage", formData)
        .then((response1) => {
          if (response1.status === 200)
            alert("Image Successfully Uploaded")
          return response1;
        })
        .then((response) => {
          return JSON.stringify(response.data.name);
        })
        .then((img) => {
          formik.setFieldValue('shopImg', img.replaceAll('"', ""))
        })
        .then(()=>{const shopData = {
          name: values.name,
          kartaName: values.kartaName,
          email: values.email,
          aadharNo: values.aadharNo,
          shopImg: values.shopImg,
          panNo: values.panNo,
          gstNo: values.gstNo,
          mobile: values.mobile,
          password: values.password,
          address: values.address,
          state: values.state,
          city: values.city,
          pincode: values.pincode,
          category: values.category.map((e)=>e._id),
          shopImg:values.shopImg,
          isVerified: values.isVerified,
        };
        axios
          .post("http://43.205.116.96:3000/Shop/CreateShop", shopData)
          .then((response) => {
            if (response.status === 200)
              alert("Shop Successfully Created")
          });})
          .then(()=>{formik.resetForm()})
    
    
  },
});

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Box
          style={{ paddingBlock: "100px" }}
          sx={{
            display:"grid",
            justifyContent:"center",
            height: "auto",
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
              value={formik.values.name}
              onChange={formik.handleChange}
            ></TextField>
            <TextField
              name="kartaName"
              type="text"
              label="Karta Name"
              value={formik.values.kartaName}
              onChange={formik.handleChange}
            />
            <TextField
              name="email"
              type="text"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextField
              name="password"
              type="text"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
            ></TextField>
            <TextField
              name="aadharNo"
              label="Aadhar Number"
              type="text"
              value={formik.values.aadharNo}
              onChange={formik.handleChange}
            />
            <TextField
              name="panNo"
              label="PAN Number"
              value={formik.values.panNo}
              onChange={formik.handleChange}
              type="text"
            />
            <TextField
              name="gstNo"
              label="GST Number"
              value={formik.values.gstNo}
              type="text"
              onChange={formik.handleChange}
            />
            <TextField
              name="mobile"
              label="Mobile Number"
              value={formik.values.mobile}
              onChange={formik.handleChange}
              type="text"
            />
            <TextField
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              type="text"
            />
            <TextField
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              type="text"
            />
            <TextField
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              type="text"
            />

            <TextField
              name="pincode"
              label="Pin Code"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              type="text"
            />
            <Stack>
              <Autocomplete
              name="category"
                multiple
                id="tags-outlined"
                options={category}
                getOptionLabel={(option) => option.name}
                value={formik.values.category}
                onChange={(event,value)=>formik.setFieldValue('category',value)}
                filterSelectedOptions
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    placeholder="Select More"
                  />
                )}
              />
            </Stack>
          </div>
          <div display="flex" align="center" style={{ marginTop: 24 }}>

            <input accept="image/*" type="file" onChange={onImageChange} />
            {/* <Button
              variant="contained"
              color="primary"
              onClick={handle Upload}
            >
              Upload
            </Button> */}
            <Box>
              {img.preview && <img
                width="100vh"
                src={img.preview}
                alt="."
              />}
            </Box>
          </div>
          <Box align="center" sx={{ marginTop: 3, "& .MuiButton-root": { m: 1 } }}>
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
