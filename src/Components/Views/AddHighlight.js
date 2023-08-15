import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TextField, Button, Typography, Autocomplete } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Stack } from "@mui/system";

export default function AddHighlight() {
  const { shopId } = useParams();
  const [products, setProduct] = useState([]);
  const [img, setImg] = useState({ preview: "", raw: "" });
  const [proId, setProId] = useState([])
  const onImageChange = (e) => {
    if (e.target.files.length) {
      setImg({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };
  const fetchData = () => {
    fetch(`http://43.205.116.96:3000/product/getAllProductsByShopId/${shopId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProduct(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [state, setState] = useState({
    title: "",
    desc: "",
    proId: {},
    discount: "",
    shopId: shopId,
    shopBanner: "",
  });
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
        setState({
          title: state.title,
          desc: state.desc,
          proId: state.products.proId,
          discount: state.products.discount,
          shopId: state.shopId,
          shopBanner: img.replaceAll('"', "")
        });
      });
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const proData = {
      title: state.title,
      desc: state.desc,
      proId: state.proId,
      discount: state.discount,
      shopId: proId,
      shopBanner: state.shopBanner,
    };

    axios
      .post("http://43.205.116.96:3000/productOffer/create", proData)
      .then((response) => {
        console.log(response.data);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container>
          <Box
            sx={{
              height: "220px",
              marginTop: "20px",
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            <Typography variant="h2" align="center">Add Highlight</Typography>
            <div align="center">
              <TextField
                fullWidth
                name="title"
                label="Highlight Title"
                value={state.title}
                onChange={handleChange}
              />

              <TextField
                fullWidth
                name="desc"
                label="Description"
                value={state.desc}
                onChange={handleChange}
              />

              <Stack>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={products}
                  getOptionLabel={(option) => option.name}
                  filterSelectedOptions
                  onChange={(event, value) => setProId(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="filterSelectedOptions"
                      placeholder="Favorites"
                    />
                  )}
                /></Stack>
              <TextField
                fullWidth
                name="discount"
                label="Discount"
                value={state.discount}
                onChange={handleChange}
              />

              <TextField fullWidth label="Upload Banner Image" value={state.shopBanner} />



              <Box >
                <input type="file" onChange={onImageChange} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpload}
                >
                  Upload
                </Button>
              </Box>

              <Box sx={{ "& .MuiButton-root": { m: 1, width: "50px" } }} align="center">
                <Button
                  size="large"
                  variant="contained"
                  style={{ marginTop: "20px" }}
                  startIcon={<AddIcon />}
                  onClick={handleSubmit}
                >
                  Add
                </Button>

                <img
                  style={{ width: "150px", marginLeft: "30px" }}
                  src={img.preview}
                  alt="..."
                />
              </Box>
            </div>
          </Box>
        </Container>
      </form >
    </>
  );
}
