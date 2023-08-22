/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { TextField, Button, Autocomplete, Stack } from "@mui/material";
import * as yup from 'yup';
import { useFormik } from "formik";
import axios from "axios";

export default function CreateShop() {

  const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    kartaName: yup.string().required('Karta Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    aadharNo: yup
      .string()
      .matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits')
      .required('Aadhar Number is required'),
    panNo: yup
      .string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number')
      .required('PAN Number is required'),
    gstNo: yup
      .string()
      .matches(/^[0-9A-Z]{15}$/, 'Invalid GST number')
      .required('GST Number is required'),
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile Number is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    address: yup.string().required('Address is required'),
    state: yup.string().required('State is required'),
    city: yup.string().required('City is required'),
    pincode: yup
      .string()
      .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
      .required('Pincode is required'),
    category: yup.object().required('Category is required'),
    shopImg: yup.string().required('Shop Image is required'),
  });

  const [img, setImg] = useState({ preview: "", raw: "" });
  const [category, setCategory] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://43.205.116.96:3000/productCategory/getAll");
      const data = await response.json();
      setCategory(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
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

const formik = useFormik({
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
    // console.log('hello')
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
          return setImg({preview: JSON.stringify(response.data.name)}) 
        })
        .then(()=>{
          const shopData = {
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
          shopImg:img.preview,
          isVerified: values.isVerified,
        };
        axios
          .post("http://43.205.116.96:3000/Shop/CreateShop", shopData)
          .then((response) => {
            if (response.status === 200)
              alert("Shop Successfully Created")
    });}).then(()=>{formik.resetForm() && setImg({preview:'',raw:''})})
          
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
            bgcolor:"#bbc3cc"
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
              error={formik.touched.name && formik.errors.name && true}
            ></TextField>
            {formik.touched.name && formik.errors.name && <div style={{color:"red"}}>{formik.errors.name}</div>}
            <TextField
              name="kartaName"
              type="text"
              label="Karta Name"
              value={formik.values.kartaName}
              onChange={formik.handleChange}
              error={formik.touched.kartaName && formik.errors.kartaName && true}
            />
            {formik.touched.kartaName && formik.errors.kartaName && <div style={{color:"red"}}>{formik.errors.kartaName}</div>}
            <TextField
              name="email"
              type="text"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && formik.errors.email && true}
            />
            {formik.touched.email && formik.errors.email && <div style={{color:"red"}}>{formik.errors.email}</div>}
            <TextField
              name="password"
              type="text"
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && formik.errors.password && true}
            />
            {formik.touched.password && formik.errors.password && <div style={{color:"red"}}>{formik.errors.password}</div>}
            <TextField
              name="aadharNo"
              label="Aadhar Number"
              type="number"
              value={formik.values.aadharNo}
              onChange={formik.handleChange}
              error={formik.touched.aadharNo && formik.errors.aadharNo && true}
            />
            {formik.touched.aadharNo && formik.errors.aadharNo && <div style={{color:"red"}}>{formik.errors.aadharNo}</div>}
            <TextField
              name="panNo"
              label="PAN Number"
              value={formik.values.panNo}
              onChange={formik.handleChange}
              error={formik.touched.panNo && formik.errors.panNo && true}
            />
            {formik.touched.panNo && formik.errors.panNo && <div style={{color:"red"}}>{formik.errors.panNo}</div>}
            <TextField
              name="gstNo"
              label="GST Number"
              value={formik.values.gstNo}

              onChange={formik.handleChange}
              error={formik.touched.gstNo && formik.errors.gstNo && true}
            />
            {formik.touched.gstNo && formik.errors.gstNo && <div style={{color:"red"}}>{formik.errors.gstNo}</div>}
            <TextField
              name="mobile"
              label="Mobile Number"
              type="number"

              value={formik.values.mobile}
              onChange={formik.handleChange}
              error={formik.touched.mobile && formik.errors.mobile && true}
            />
            {formik.touched.mobile && formik.errors.mobile && <div style={{color:"red"}}>{formik.errors.mobile}</div>}
            <TextField
              name="address"
              label="Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              type="text"
              error={formik.touched.address && formik.errors.address && true}
            />
            {formik.touched.address && formik.errors.address && <div style={{color:"red"}}>{formik.errors.address}</div>}
            <TextField
              name="state"
              label="State"
              value={formik.values.state}
              onChange={formik.handleChange}
              type="text"
              error={formik.touched.state && formik.errors.state && true}
            />
            {formik.touched.state && formik.errors.state && <div style={{color:"red"}}>{formik.errors.state}</div>}
            <TextField
              name="city"
              label="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              type="text"
              error={formik.touched.city && formik.errors.city && true}
            />
            {formik.touched.city && formik.errors.city && <div style={{color:"red"}}>{formik.errors.city}</div>}
            <TextField
              name="pincode"
              label="Pin Code"
              value={formik.values.pincode}
              onChange={formik.handleChange}
              type="number"

              error={formik.touched.pincode && formik.errors.pincode && true}
            />
           {formik.touched.pincode && formik.errors.pincode && <div style={{color:"red"}}>{formik.errors.pincode}</div>}
             <Stack>
               <Autocomplete
               name="category"
                 multiple
                 id="tags-outlined"
                 value={formik.values.category}
                 options={category}
                 getOptionLabel={(option) => option.name}
              
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
