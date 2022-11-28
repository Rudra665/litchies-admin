import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { TextField, Button, Typography, Grid, Chip } from "@mui/material";
import Container from "@mui/material/Container";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from 'formik';


export default function VerifiedShopTemplate() {
  const [img, setImg] = useState({ preview: "", raw: "" });
  const onImageChange = (e) => {
    if (e.target.files.length) {
      setImg({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
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
  const handleSubmit = (e) => {


    handleUpload();
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
  const handleChange = (e) => {
    const value = e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
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

                <Box className="wrapper" sx={{
                  backgroundColor: "black",
                  position: "relative",
                  border: "5px solid #fff",
                  borderRadius: "50%",
                  width: "200px",
                  height: "200px",
                  margin: "100px auto",
                  overflow: "hidden"
                }}>
                  {img.preview && <img
                    height="190vh"
                    src={img.preview}
                    alt="..."
                    className="Pimage"
                  />}
                  <img height="190vh" src={`http://43.205.116.96:3000/images/${user.shopImg}`}></img>
                  <input type="file" className="onClick" onChange={onImageChange} />
                </Box>
                <Box display="flex" justifyContent="space-between" width="40vh">

                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                  <Button href={`showProducts/${user._id}`}>Show All products</Button>
                </Box>
              </Grid>
              <Grid item lg="6" sm="12">
                <Box maxWidth="md">
                  <Box marginY="2vh">
                    <Formik

                      validate={values => {
                        const errors = {};
                        if (!values.name && !values.address && !values.state && !values.city && !values.pincode && !values.kartaName && !values.email && !values.mobile && !values.gstNo && !values.aadharNo) {
                          errors.email = 'Required';
                          errors.name = 'Required';
                          errors.address = 'Required';
                          errors.state = 'Required';
                          errors.city = 'Required';
                          errors.pincode = 'Required';
                          errors.kartaName = 'Required';
                          errors.mobile = 'Required';
                          errors.gstNo = 'Required';
                          errors.aadharNo = 'Required';
                        } else if (
                          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                          errors.email = 'Invalid email address';
                        }
                        return errors;
                      }}

                    >
                      {({
                        errors,
                        touched,
                        handleBlur,
                      }) => (
                        <Form onSubmit={handleSubmit}>
                          <TextField name="name" defaultValue="0"
                            label="Name"
                            value={user.name}
                            onBlur={handleBlur}
                            onChange={handleChange} />
                          {errors.email && touched.email && errors.email}
                          <TextField name="email" defaultValue="0"
                            label="Email"
                            type="email"
                            onBlur={handleBlur}
                            value={user.email}
                            onChange={handleChange} />
                          {errors.email && touched.email && errors.email}
                          <TextField
                            name="kartaName"
                            onBlur={handleBlur}
                            label="Karta Name"
                            value={user.kartaName}
                            onChange={handleChange}
                          />
                          {errors.email && touched.email && errors.email}
                          <TextField
                            name="aadharNo"
                            label="Aadhar Number"

                            // error={user.aadharNo == 12 ? false : true}
                            value={user.aadharNo}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          {errors.email && touched.email && errors.email}
                          <TextField
                            name="panNo"
                            label="PAN Number"
                            defaultValue="00"
                            onBlur={handleBlur}
                            value={user.panNo}
                            onChange={handleChange}
                          />
                          {errors.email && touched.email && errors.email}
                          <TextField
                            name="gstNo"
                            defaultValue="00"
                            onBlur={handleBlur}
                            label="GST Number"
                            value={user.gstNo}
                            onChange={handleChange}
                          />
                          {errors.email && touched.email && errors.email}
                          <TextField
                            name="mobile"
                            defaultValue="00"
                            label="Mobile Number"
                            onBlur={handleBlur}
                            value={user.mobile}
                            onChange={handleChange}
                          />
                          {errors.email && touched.email && errors.email}
                          <TextField
                            name="address"
                            label="Address"
                            value={user.address}
                            onBlur={handleBlur}
                            defaultValue="No Address"
                            onChange={handleChange}
                          />
                          {errors.email && touched.email && errors.email}
                          <TextField
                            name="state"
                            label="State"
                            onBlur={handleBlur}
                            defaultValue="UP"
                            value={user.state}
                            onChange={handleChange}
                          />
                          {errors.email && touched.email && errors.email}

                          <TextField
                            name="city"
                            label="City"
                            onBlur={handleBlur}
                            defaultValue="Agra"
                            value={user.city}
                            onChange={handleChange}
                          />
                          {errors.email && touched.email && errors.email}

                          <TextField
                            name="pincode"
                            label="Pin Code"
                            onBlur={handleBlur}
                            defaultValue="282005"
                            value={user.pincode}
                            onChange={handleChange}
                          />
                          {errors.email && touched.email && errors.email}
                          <Box sx={{ "& .MuiButton-root": { m: 1 } }}>
                            <Button variant="contained" type="submit" startIcon={<UpdateIcon />}>
                              Submit
                            </Button>
                          </Box>
                        </Form>
                      )}
                    </Formik>
                  </Box>
                </Box>

                {/* 
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
                    
                      <Button
                        disabled={error ? true : false}
                        variant="contained"
                        type="submit"
                        startIcon={<UpdateIcon />}
                      >
                        Update Shop
                      </Button>

                    </Box> */}
                {/*  */}
                {/*  */}
              </Grid>
            </Grid>
          </Container>
        </Box>

      </form >
    </>
  );
}
