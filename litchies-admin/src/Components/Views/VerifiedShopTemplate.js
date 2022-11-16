import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import Container from "@mui/material/Container";
import UpdateIcon from "@mui/icons-material/Update";
import axios from "axios";

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
      .put(`http://localhost:3000/Shop/UpdateShop/${id}`, shopData)
      .then((response) => {
        console.log(response.shopData);
      });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", img.raw);
    await axios
      .post("http://localhost:3000/uploadImage", formData)
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
    fetch(`http://localhost:3000/Shop/GetShopById/${id}`)
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

  const url = `http://localhost:3000/images/${user.shopImg}`;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container class="proContainer">
          <Box
            sx={{
              bgcolor: "#fce2d4",
              height: "150vh",
              borderRadius: "25px",
              width: "100%",
              "& .MuiTextField-root": { m: 1, width: "65ch" },
            }}
          >
            <h1 className="PHeading">{user.name}</h1>
            <div className="ImgContainer">
              <h2>Shop Image</h2>
              <img src={url} alt="ShopImage" className="ShopImage" />

              <div >
                <div style={{ marginLeft: "-140px" }}>
                  <input type="file" onChange={onImageChange} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </div>
                <img
                  style={{ width: "150px", marginLeft: "30px" }}
                  src={img.preview}
                  alt="..."
                  className="Pimage"
                />
              </div>
              <Button
                className="ShopButton buttonCss"
                variant="contained"
                color="primary"
                href={`/admin/showProducts/${user._id}`}
              >
                Show All Products
              </Button>
            </div>
            <div className="shopTempDiv">
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
              <Box className="Pbuttons" sx={{ "& .MuiButton-root": { m: 1 } }}>
                <Button
                  className="UShopButton buttonCss"
                  variant="contained"
                  type="submit"
                  startIcon={<UpdateIcon />}
                >
                  Update Shop
                </Button>

              </Box>
            </div>
          </Box>
        </Container>
      </form>
    </>
  );
}
