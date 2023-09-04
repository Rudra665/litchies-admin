import React, { useState, useEffect, useRef } from 'react';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TextField, Button, MenuItem, Typography, Autocomplete } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form"; // Import useForm and Controller

export default function AddProduct() {
  const { shopId } = useParams();
  const [childCat, setChildCat] = useState([]);
  const[catId, setCatId] = useState([]);
  const [img, setImg] = useState([]);
  const [vid, setVid] = useState([])

  const { handleSubmit, control,formState: { errors }, reset } = useForm(); // Initialize useForm

  const onImageChange = (e) => {
    const selectedFIles = [];
    const targetFiles = e.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFIles.push(file);
    });
    setImg(selectedFIles);
  };

  const onVidChange = (e) => {
    const selectedFIles = [];
    const targetFiles = e.target.files;
    const targetFilesObject = [...targetFiles];
    targetFilesObject.map((file) => {
      return selectedFIles.push(file);
    });
    setVid(selectedFIles);
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
        setVid({
          raw: vid.urls.map((video) => {
            vid.push(video.name);
          }),
        });
      })
  };

  const handleUpload = async (e) => {
    
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




  const onSubmit = async (data) => {
    if(vid.raw || vid.preview)
    {
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
        setVid({
          raw: vid.urls.map((video) => {
            vid.push(video.name);
          }),
        });
      })
    }
    
    // Upload images after video is uploaded
    const formData = new FormData();
    img.map((image) => {
      formData.append("image", image);
      return formData;

    }
    );
    const response1 = await axios.post("http://43.205.116.96:3000/product/uploadImages", formData)
      
    
    // Check if images were uploaded successfully
    if (response1.status===200) {
      alert("Images Uploaded Successfully");
      
      // Submit your form data here
      const proData = {
        name: data.name,
        desc: data.desc,
        price: data.price,
        discount: data.discount,
        videoUrl: data.videoUrl,
        shopId: shopId,
        childCategoryId: catId,
        imageURLs: [], // You can set this to the actual URLs after uploading images
      };

      axios
        .post("http://43.205.116.96:3000/product/createProduct", proData)
        .then((response) => {
          if (response.status === 200) {
            alert(`Product Added`);
            reset(); // Reset the form after successful submission
            setImg(['']);// Clear uploaded images
            setVid(['']); // Clear uploaded videos
            setCatId([''])
          }
        });
    } else {
      alert("Image upload failed. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Box
            sx={{
              padding: 5,
              height: "94vh",
              width: "100%",
              "& .MuiTextField-root": { m: 1 },
            }}
          >
            <Typography align="center" mb="3vh" variant="h3">
              Add Product
            </Typography>
            <Container maxWidth="lg">
              <Box align="center">
                <Box maxWidth="sm">
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }} // Add validation rule
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Product Name"
                        {...field}
                        error={!!errors.name}
                        helperText={errors.name ? "Product Name is required" : ""}
                      />
                    )}
                  />

                  <Controller
                    name="desc"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }} // Add validation rule
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Description"
                        {...field}
                        error={!!errors.desc}
                        helperText={errors.desc ? "Description is required" : ""}
                      />
                    )}
                  />

                  <Controller
                    name="price"
                    control={control}
                    defaultValue=""
                    rules={{ required: true, pattern: /^[0-9]+$/ }} // Add validation rule
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Price"
                        type="number"
                        {...field}
                        error={!!errors.price}
                        helperText={errors.price ? "Price is required and must be a number" : ""}
                      />
                    )}
                  />

                  <Controller
                    name="discount"
                    control={control}
                    defaultValue=""
                    rules={{ required: true, pattern: /^[0-9]+$/ }} // Add validation rule
                    render={({ field }) => (
                      <TextField
                        fullWidth
                        label="Discount"
                        type="number"
                        {...field}
                        error={!!errors.discount}
                        helperText={errors.discount ? "Discount is required and must be a number" : ""}
                      />
                    )}
                  />

                        <Autocomplete
                          multiple
                          id="tags-outlined"
                          options={childCat}
                          getOptionLabel={(option) => option.name}
                          filterSelectedOptions
                          onChange={(event, value) => {
                            setCatId(value.map((e)=>e._id))
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Select Category"
                              placeholder="Add Some"
                            />
                          )}
                        />
                   

                  {/* Other form fields... */}

                  <Box marginY="2vh">
                    <label>Add Video</label>
                    <Box>
                      <input multiple type="file" onChange={onVidChange} />
                      
                    </Box>
                  </Box>
                  <Box marginY="2vh">
                    <label>Add Image(s)</label>
                    <Box>
                      <input multiple type="file" onChange={onImageChange} />
                      
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
              </Box>
            </Container>
          </Box>
        </Container>
      </form>
    </>
  );
}
