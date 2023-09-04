import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TextField, Button, Typography, Autocomplete } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import axios from "axios";
import { useParams} from "react-router-dom";
import { useEffect, useRef } from "react";

export default function AddHighlight() {
  const { handleSubmit, control,formState: { errors },watch, reset } = useForm(); // Initialize useForm
  const { shopId } = useParams();
  const [productDetails, setProductDetails] = useState([]);
  const [img, setImg] = useState({ preview: "", raw: "" });
  const [proId, setProId] = useState('')
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
        setProductDetails(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const onSubmit = async (data) => {
    try {
    const formData = new FormData();
    formData.append("image", img.raw);
    const response1 = await axios.post("http://43.205.116.96:3000/uploadImage", formData);
    if(response1.status === 200) {
      alert('Shop Image Uploaded')
      console.log(data.image)
      const proData = {
        title: data.title,
        desc: data.desc,
        products: [
          {
            proId: proId,
            discount: data.discount,
          },
        ],
        shopId: shopId,
        shopBanner: data.shopBanner,
      };

     const response2 = axios.post("http://43.205.116.96:3000/productOffer/create", proData);
        if (response2.status=='200')
        {
          alert("Highlight Updated")
          reset()
          setImg({preview:'',raw:''})
          setProId('')
        } 
    }else {
      alert("Fill All Fields");
    }
    
  }catch (error) {
    console.error("Error submitting form:", error);
  }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
              <Controller
                name="title"
                control={control}
                defaultValue=""
                rules={{ required: true }} // Add validation rule
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Highlight Title"
                    {...field}
                    error={!!errors.title}
                    helperText={errors.title ? 'Title is required' : ''}
                  />
                )}
              />

              <Controller
                name="desc"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Description"
                    {...field}
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
                    type='number'
                    {...field}
                    error={!!errors.discount}
                    helperText={errors.discount ? 'Discount is required and must be a number' : ''}
                  />
                )}
              />

                    <Autocomplete
                      id="tags-outlined"
                      options={productDetails}
                      getOptionLabel={(option) => option.name}
                      filterSelectedOptions
                  onChange={(event, value) => setProId(value._id)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select Product"
                          placeholder="Add Some"
                          
                        />
                      )}
                    />    

              
<input type="file" onChange={onImageChange} />
              <img
                  style={{ width: "150px", marginLeft: "30px" }}
                  src={img.preview}
                  alt="..."
                />
              <Box sx={{ "& .MuiButton-root": { m: 1, ml:5 } }} align="center">
                <Button
                  variant="contained"
                  style={{ marginTop: "20px" }}
                  startIcon={<AddIcon />}
                  type="submit"
                >
                  Add
                </Button>

                
              </Box>
            </div>
          </Box>
        </Container>
      </form>
    </>
  );
}