import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Button, MenuItem, Typography } from "@mui/material";
import { useForm, Controller } from "react-hook-form";

const AddSubCategory = (props) => {
  const [Cat, setCat] = useState([]);
  const { handleSubmit, control, formState: { errors }, reset } = useForm(); // Initialize useForm

  const onSubmit = async (data) => {
    if (data.name && data.categoryId) {
      // Form data is valid, proceed with submission
      const subCat = {
        name: data.name,
        categoryId: data.categoryId,
      };

      try {
        const response = await axios.post(
          "http://43.205.116.96:3000/productSubCategory/create",
          subCat
        );

        if (response.status === 200) {
          alert("Sub Category Added");
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
            Add a SubCategory
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
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }} // Add validation rule
            render={({ field }) => (
              <TextField
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

export default AddSubCategory;
