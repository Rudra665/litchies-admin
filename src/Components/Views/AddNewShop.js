/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CircularProgress from '@mui/material/CircularProgress';
import { TextField, Button, Autocomplete, Stack } from "@mui/material";
import {useForm} from 'react-hook-form'
import axios from "axios";

export default function CreateShop() {
  const { handleSubmit ,reset , register, formState: { errors }, setValue } = useForm();
  
  const [img, setImg] = useState({ preview: "", raw: "" });
  const [category, setCategory] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [submit, setSubmit] = useState(false);
  

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

  const onSubmit = async (data) => {
    setSubmit(true);
    try {
      const formData = new FormData();
      formData.append("image", img.raw);
      const response1 = await axios.post("http://43.205.116.96:3000/uploadImage", formData);
      
      if(response1.status === 200) {
        alert('Shop Image Uploaded')
        const shopData = {
          name: data.name,
          kartaName: data.kartaName,
          email: data.email,
          aadharNo: data.aadharNo,
          panNo: data.panNo,
          gstNo: data.gstNo,
          mobile: data.mobile,
          password: data.password,
          address: data.address,
          state: data.state,
          city: data.city,
          pincode: data.pincode,
          category: selectedCategories,
          shopImg:response1.data.name,
          isVerified:false
        };

        const response2 = await axios.post("http://43.205.116.96:3000/Shop/CreateShop", shopData);
        if (response2.status === 200) {
          setSubmit(false);
          alert("Shop Successfully Created");
          reset()
          // Reset other form fields...
          setImg({ preview: " ", raw: '' });
          setSelectedCategories([]);
        }}
       } catch (error) {
      console.error("Error submitting form:", error);
      setSubmit(false);
    }
  };
  return (
    <>
  
      <form onSubmit={handleSubmit(onSubmit)}>
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
          label="Shop Name"
          error={!!errors.name}
          helperText={errors.name?.message}
          inputProps={{
            // Apply schema validation rules
            ...register("name", {
              required: "Name is required",
              minLength: {
                value: 3, // Minimum length of 3 characters
                message: "Name must be at least 3 characters"
              }
            })
          }}
        />

<TextField
  name="kartaName"
  type="text"
  label="Karta Name"
  error={!!errors.kartaName}
  helperText={errors.kartaName?.message}
  inputProps={{
    // Apply schema validation rules
    ...register("kartaName", {
      required: "Karta Name is required",
      minLength: {
        value: 3, // Minimum length of 3 characters
        message: "Karta Name must be at least 3 characters"
      }
    })
  }}
/>

<TextField
  name="email"
  type="text"
  label="Email"
  error={!!errors.email}
  helperText={errors.email?.message}
  inputProps={{
    // Apply schema validation rules
    ...register("email", {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // Basic email pattern
        message: "Invalid email address"
      }
    })
  }}
/>

<TextField
  name="password"
  type="password" // Change to "password" type for password fields
  label="Password"
  error={!!errors.password}
  helperText={errors.password?.message}
  inputProps={{
    // Apply schema validation rules
    ...register("password", {
      required: "Password is required",
      minLength: {
        value: 8, // Minimum length of 8 characters
        message: "Password must be at least 8 characters"
      }
    })
  }}
/>

<TextField
  name="aadharNo"
  label="Aadhar Number"
  type="number"
  error={!!errors.aadharNo}
  helperText={errors.aadharNo?.message}
  inputProps={{
    // Apply schema validation rules
    ...register("aadharNo", {
      required: "Aadhar Number is required",
      pattern: {
        value: /^[0-9]{12}$/, // Aadhar number must be 12 digits
        message: "Aadhar number must be 12 digits"
      }
    })
  }}
/>

            <TextField
  name="panNo"
  label="PAN Number"
  error={!!errors.panNo}
  helperText={errors.panNo?.message}
  inputProps={{
    // Apply schema validation rules
    ...register("panNo", {
      required: "PAN Number is required",
      pattern: {
        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, // Valid PAN format
        message: "Invalid PAN number"
      }
    })
  }}
/>

<TextField
  name="gstNo"
  label="GST Number"
  error={!!errors.gstNo}
  helperText={errors.gstNo?.message}
  inputProps={{
    // Apply schema validation rules
    ...register("gstNo", {
      required: "GST Number is required",
      pattern: {
        value: /^[0-9A-Z]{15}$/, // Valid GST format
        message: "Invalid GST number"
      }
    })
  }}
/>


<TextField
  name="mobile"
  label="Mobile Number"
  type="number"
  error={!!errors.mobile}
  helperText={errors.mobile?.message}
  inputProps={{
    // Apply schema validation rules
    ...register("mobile", {
      required: "Mobile Number is required",
      pattern: {
        value: /^[0-9]{10}$/, // Mobile number must be 10 digits
        message: "Mobile number must be 10 digits"
      }
    })
  }}
/>


<TextField
  name="address"
  label="Address"
  error={!!errors.address}
  helperText={errors.address?.message}
  inputProps={{
    // Apply schema validation rules
    ...register("address", {
      required: "Address is required"
    })
  }}
/>

<TextField
  name="state"
  label="State"
  error={!!errors.state}
  helperText={errors.state?.message}
  inputProps={{
    // Apply schema validation rules
    ...register("state", {
      required: "State is required"
    })
  }}
/>


<TextField
  name="city"
  label="City"
  error={!!errors.city}
  helperText={errors.city?.message}
  inputProps={{
    // Apply schema validation rules
    ...register("city", {
      required: "City is required"
    })
  }}
/>


<TextField
  name="pincode"
  label="Pin Code"
  type="number"
  error={!!errors.pincode}
  helperText={errors.pincode?.message}
  inputProps={{
    // Apply schema validation rules
    ...register("pincode", {
      required: "Pin Code is required",
      pattern: {
        value: /^[0-9]{6}$/, // Pin code must be 6 digits
        message: "Pin code must be 6 digits"
      }
    })
  }}
/>


<Stack>
<Autocomplete
  multiple
  id="tags-outlined"
  options={category}
  getOptionLabel={(option) => option.name}
  onChange={(event,Value) => {
    setSelectedCategories(Value.map((item)=>item._id)); // Manually set the value using setValue
    console.log(selectedCategories)
 
  }}
  filterSelectedOptions
  renderInput={(params) => (
    <TextField
      {...params}
      label="Category"
      placeholder="Select More"
      error={!!errors.category}
      helperText={errors.category?.message}
    />
  )}
/>
</Stack>
          </div>
          <div display="flex" align="center" style={{ marginTop: 24 }}>

                <input
        accept="image/*"
        type="file"
        {...register('shopImg', { required: 'Shop Image is required' })}
        style={{ marginBottom: '10px' }}
        onChange={onImageChange}
      />
      {errors.shopImg && <p style={{ color: 'red' }}>{errors.shopImg.message}</p>}

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
      {submit?<div style={{zIndex:3, display: 'flex', backfaceVisibility:"70%"}}><CircularProgress /></div>:''}
    </>
  );
}
