import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TextField, Button, MenuItem, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function AddProduct() {
  const [childCat, setChildCat] = useState([]);
  const [img, setImg] = useState([]);

  const onImageChange = (e) => {
    const selectedFIles = [];
    const targetFiles = e.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFIles.push(file);
    });
    setImg(selectedFIles);
  };

  const uploadVideo = async (e) => {
    const formData2 = new FormData();
    img.map((vid) => {
      formData2.append("video", vid);
      return formData2;
    });
    await axios
      .post("http://43.205.116.96:3000/uploadReel", formData2)
      .then((res) => {
        return res.data;
      })
      .then((vid) => {
        setState({
          videoUrl: vid.urls.map((video) => {
            state.videoUrl.push(video.name);
          }),
        });
      })
      .then((img) => {
        setState({
          name: state.name,
          desc: state.desc,
          price: state.price,
          discount: state.discount,
          videoUrl: state.videoUrl,
          shopId: state.shopId,
          childCategoryId: state.childCategoryId,
          imageURLs: state.imageURLs,
        });
      });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    img.map((image) => {
      formData.append("image", image);
      return formData;

    }
    );
    await axios
      .post("http://43.205.116.96:3000/product/uploadImages", formData)
      .then((response) => {
        if (response.status === 200) alert("Images Uploaded Successfully");
        return response.data;
      })
      .then((IMG) => {
        setState({
          imageURLs: IMG.urls.map((image) => {
            state.imageURLs.push(image.name);
          }),
        });
      })
      .then((img) => {
        setState({
          name: state.name,
          desc: state.desc,
          price: state.price,
          discount: state.discount,
          videoUrl: state.videoUrl,
          shopId: state.shopId,
          childCategoryId: state.childCategoryId,
          imageURLs: state.imageURLs,
        });
      });
    setImg([null])
  };

  const fetchData = () => {
    fetch("http://43.205.116.96:3000/productChildCategory/getAll")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setChildCat(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const { shopId } = useParams();

  const [state, setState] = useState({
    name: "",
    desc: "",
    price: "",
    discount: "",
    videoUrl: [],
    shopId: shopId,
    childCategoryId: "",
    imageURLs: [],
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    if(state.shopId&& state.imageURLs && state.discount && state.price && state.name && state.childCategoryId)
    {e.preventDefault();
    const proData = {
      name: state.name,
      desc: state.desc,
      price: state.price,
      discount: state.discount,
      videoUrl: state.videoUrl,
      shopId: state.shopId,
      childCategoryId: state.childCategoryId,
      imageURLs: state.imageURLs,
    };

    axios
      .post("http://43.205.116.96:3000/product/createProduct", proData)
      .then((response) => {
        if(response.status===200){
        alert(`Product Added`)
        console.log(response.data);
      }});
    
    setState({
      name: "",
      desc: "",
      price: "",
      discount: "",
      videoUrl: [],
      shopId: "",
      childCategoryId: "",
      imageURLs: [],
    })
    setImg(img.replaceAll('"', ""))
  }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>

        <Box
          sx={{
            padding: 5,
            height: "94vh",
            width: "100%",
            "& .MuiTextField-root": { m: 1, },
            bgcolor:"#bbc3cc"
          }}
        >
          <Typography align="center" mb="3vh" variant="h3">Add Product</Typography>
          <Container maxWidth="lg">
            <Box align="center">
              <Box maxWidth="sm">
                <TextField
                  fullWidth
                  name="name"
                  label="Product Name"
                  value={state.name}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  name="desc"
                  label="Description"
                  value={state.desc}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  value={state.price}
                  onChange={handleChange}
                />
                <TextField
                  fullWidth
                  name="discount"
                  label="Discount"
                  type="number"

                  value={state.discount}
                  onChange={handleChange}
                />

                <TextField
                  fullWidth
                  select
                  name="childCategoryId"
                  value={state.childCategoryId}
                  onChange={handleChange}

                >
                  {childCat.map((childCat) => (
                    <MenuItem value={childCat._id}>{childCat.name}</MenuItem>
                  ))}
                </TextField>
              </Box>

              <Box marginY="2vh">
                <label>Add Video</label>
                <Box>
                  <input multiple type="file" onChange={onImageChange} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={uploadVideo}
                  >
                    Upload Video
                  </Button>
                </Box>
              </Box>
              <Box marginY="2vh">
                <label>Add Image(s)</label>
                <Box >
                  <input multiple type="file" onChange={onImageChange} />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                  >
                    Upload Images
                  </Button>
                </Box>
              </Box>
              <Box sx={{ "& .MuiButton-root": { m: 1 } }}>
                <Button
                  variant="contained"

                  style={{ width: "250px", marginTop: "30px" }}
                  startIcon={<AddIcon />}
                  type="submit"
                >
                  Add
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      </form>
    </>
  );
}
