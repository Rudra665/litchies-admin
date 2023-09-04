import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { useForm, Controller,watch } from "react-hook-form";

const AddChildCategory = (props) => {
  const [Cat, setCat] = useState([]);
  const [SubCat, setSubCat] = useState([]);

  const { handleSubmit, control, formState: { errors },watch,reset } = useForm(); // Initialize useForm
  const selectedCategory = watch('categoryId')
  const onSubmit = async (data) => {
    if (data.name && data.categoryId && data.subcategoryId) {
      // Form data is valid, proceed with submission
      const subCat = {
        categoryId: data.categoryId,
        name: data.name,
        subCategoryId: data.subcategoryId,
      };

      try {
        const response = await axios.post(
          "http://43.205.116.96:3000/productChildCategory/create",
          subCat
        );

        if (response.status === 200) {
          alert("Child Category Added");
          console.log(response.data);
          reset();
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Fill All The Fields");
    }
  };

  const fetchSubCat = () => {
    fetch("http://43.205.116.96:3000/productSubCategory/getAll")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSubCat(data);
      });
  };
  useEffect(() => {
    fetchSubCat();
  }, []);

  const fetchCat = () => {
    fetch("http://43.205.116.96:3000/productCategory/getAll")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCat(data);
      });
  };
  useEffect(() => {
    fetchCat();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Typography variant="h3" align="center">
            Add a Child Category
          </Typography>

          <Controller
            name="categoryId"
            control={control}
            defaultValue=""
            rules={{ required: true }} // Add validation rule
            render={({ field }) => (
              <TextField
                select
                fullWidth
                sx={{marginY:2}}
                label="Category"
                {...field}
                error={!!errors.categoryId}
                helperText={errors.categoryId ? "Category is required" : ""}
              >
                {Cat.map((cat) => (
                  <MenuItem key={cat._id} value={cat._id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="subcategoryId"
            control={control}
            defaultValue=""
            rules={{ required: true }} // Add validation rule
            render={({ field }) => (
              <TextField
                select
                sx={{marginY:2}}
                fullWidth
                label="Sub Category"
                {...field}
                error={!!errors.subcategoryId}
                helperText={
                  errors.subcategoryId ? "Sub Category is required" : ""
                }
              >
                {SubCat.filter((item) => item.categoryId === selectedCategory).map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />

          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }} // Add validation rule
            render={({ field }) => (
              <TextField
                sx={{marginY:2}}
                fullWidth
                label="Enter Sub Category Name"
                {...field}
                error={!!errors.name}
                helperText={errors.name ? "Sub Category Name is required" : ""}
              />
            )}
          />

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
            <Button variant="contained" type="submit">
              Save
            </Button>
          </div>
        </Box>
      </form>
    </>
  );
};

export default AddChildCategory;
