import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TextField, Button, Typography, Grid } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { COLORS } from "./constants";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ProductImages from "./ProductImages";
export default function Product() {
  const [img, setImg] = useState({ preview: "", raw: "" });
  const [video, setVideo] = useState({ preview: "", raw: "" });

  const onImageChange = (e) => {
    if (e.target.files.length) {
      setImg({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const onVideoChange = (e) => {
    if (e.target.files.length) {
      setVideo({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const [state, setState] = useState({
    name: "",
    desc: "",
    price: "",
    shopId: "",
    discount: "",
    imgUrl: [],
    videoURL: [],
  });

  const [shopName, setShopName] = useState({
    name: ""
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleUploadImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("imageUrls", img.raw);
    await axios
      .post("http://43.205.116.96:3000/uploadImage", formData)
      .then((response) => {
        return JSON.stringify(response.data.name);
      })
      .then((img) => {
        setState({
          name: state.name,
          price: state.price,
          desc: state.desc,
          shopId: state.shopId,
          discount: state.discount,
          imgUrl: state.imgUrl,
          videoURL: state.videoURL,
        });
      });
  };
  const handleUploadVideo = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("videoUrl", video.raw);
    await axios
      .post("http://43.205.116.96:3000/uploadImage", formData)
      .then((response) => {
        return JSON.stringify(response.data.name);
      })
      .then((img) => {
        setState({
          name: state.name,
          price: state.price,
          desc: state.desc,
          shopId: state.shopId,
          discount: state.discount,
          imgUrl: state.imgUrl,
          videoURL: state.videoURL,
        });
      });
  };

  const handleSubmit = (e) => {
    if(state.imgUrl && state.discount && state.name && state.price && state.shopId)
   { e.preventDefault();
    const ProductData = {
      name: state.name,
      price: state.price,
      desc: state.desc,
      shopId: state.shopId,
      discount: state.discount,
      imgUrl: state.imgUrl,
      videoURL: state.videoURL,
    };

    axios
      .put(`http://43.205.116.96:3000/Product/UpdateProduct/${id}`, ProductData)
      .then((response) => {
        if(response.status===200){
          alert("Product Updated")
          console.log(response.data);
        }
        
      });
    }
  };

  const { shopId, id } = useParams();

  const fetchData = () => {
    fetch(`http://43.205.116.96:3000/Product/GetProduct/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setState(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchShopData = () => {
    fetch(`http://43.205.116.96:3000/shop/getShopById/${state.shopId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setShopName(data);
      });
  };

  useEffect(() => {
    fetchShopData();
  }, []);

  const Delete = async () => {
    axios.delete(`http://43.205.116.96:3000/Product/DeleteProduct/${id}`)
    .then((res)=>{
      if(res.status===200)
    alert("Product Deleted")
  })
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container class="proContainer">
          <Box
            sx={{
              bgcolor:"#4b5b84",
              height: "fit-content",
              width: 1,
              borderRadius: "12px",
              "& .MuiTextField-root": { m: 1, width: "65ch" },
              paddingY: 7
            }}
          >
            <Typography variant="h3" align="center" sx={{ marginBottom: 5 }}>{state.name}</Typography>
            <Box sx={{ margin: 4 }}>
              <ProductImages />
            </Box>
            <Box align="center" sx={{ margin: 2 }}>
              <Box>
                <Grid container>
                  <Grid item lg="12">
                    <TextField
                      fullWidth
                      name="name"
                      label="Product Name"
                      value={state.name}
                      defaultValue="Name"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item lg="12">
                    <TextField
                      fullWidth
                      name="desc"
                      label="Description"
                      value={state.desc}
                      defaultValue="Desc"
                      onChange={handleChange}
                    /></Grid>
                  <Grid item lg="12">
                    <TextField
                      fullWidth
                      name="price"
                      label="Price"
                      value={state.price}
                      defaultValue="0"
                      onChange={handleChange}
                    /></Grid>
                  <Grid item lg="12">
                    <TextField
                      fullWidth
                      name="discount"
                      label="Discount"
                      value={state.discount}
                      defaultValue="0"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item lg="12" m="1vh">
                    <Typography fontWeight="600">Image</Typography>
                    <img width="200vh" src={img.preview}></img>
                    <Box >
                      <input type="file" accept="image/*" onChange={onImageChange} />
                      <Button variant="contained" onClick={handleUploadImage}>Upload Image</Button>
                    </Box>
                    <TextField fullWidth
                      name="imgUrl"
                      label="Image Url"
                      value={img.preview}
                      defaultValue="0"
                    />

                  </Grid>
                  <Grid item lg="12" m="1vh">
                    <Typography fontWeight="600">Video</Typography>
                    <Box >
                      <input type="file" accept="video/*" onChange={onVideoChange} />
                      <Button variant="contained" onClick={handleUploadVideo}>Upload Video</Button>
                    </Box>
                    <TextField fullWidth
                      name="videoUrl"
                      label="Video Url"
                      value={video.preview}
                      defaultValue="0"
                    />

                  </Grid>
                </Grid>
              </Box>
              <Box
                align="center"
                sx={{ "& .MuiButton-root": { m: 1 }, }}
              >
                <Button
                  style={{ background: COLORS.defaultColor }}
                  variant="contained"
                  startIcon={<UpdateIcon />}
                  type="submit"
                >
                  Update Product
                </Button>
                <Button
                  style={{ background: COLORS.defaultColor }}
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={Delete}
                // href={`/admin/showProducts/${shopId}`}
                >
                  <Link to={`verifiedShopsList/showProducts/${shopId}`}></Link>
                  Delete Product
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </form>
    </>
  );
}
