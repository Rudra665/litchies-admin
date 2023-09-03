/* eslint-disable no-const-assign */
import * as React from "react";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import {useForm} from 'react-hook-form'
import axios from "axios";

const AddCategory = (props) => {
    const [state, setState] = useState({
        name: "",
        imageURLs: "",
    });
    const { handleSubmit, register, setValue, setError, formState: { errors }  } = useForm();
    const [data,setData] =useState('')
  const [submit, setSubmit] = useState(false);
    const [img, setImg] = React.useState({preview:"", raw:''})
    const onImageChange = (e) => {
        if (e.target.files.length) {
          setImg({
            preview: URL.createObjectURL(e.target.files[0]),
            raw: e.target.files[0],
          });
        }
      };
    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value,
        });
    };

        const handleUpload = async (e) => {
            e.preventDefault();
            const formData = new FormData();
            formData.append("image", img.raw);
            await axios
              .post("http://43.205.116.96:3000/uploadImage", formData)
              .then((response1) => {
                if (response1.status === 200)
                  alert("Image Successfully Uploaded")
                return response1;
              })
              .then((response) => {
               setData(response.data.name)
              })
              
          };

    const onSubmit = async (data) => {
        setSubmit(true);
        try {
        
            const formData = new FormData();
            formData.append("image", img.raw);
            const response1 = await axios.post("http://43.205.116.96:3000/uploadImage", formData);
            if(response1.status === 200) {
        const proData = {
            name: data.name,
            image: response1.data.name,
        };
   
        const response2 = await axios.post("http://43.205.116.96:3000/productCategory/create", proData)
                if(response2.status===200)
                alert("Category Added Successfully")
                window.location.reload()
            
        }}
    catch{
        console.error("Error submitting form:", errors);
      setSubmit(false);
    }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <React.Fragment>

                    <h2 align="center" >Add a Category</h2>
                    <TextField
                        fullWidth
                        name="name"
                        label="Enter Category Name"
                        onChange={(e) => {
                            handleChange(e);
                            setValue("name", e.target.value); // Setting value using setValue
                        }}
                        sx={{ marginY: 1 }}
                        {...register("name", { required: "Category name is required",validate: value => value.trim() === "" ? "Field cannot be empty" : undefined, })} // Registering the field
                        error={!!errors.name} // Show error state when there's an error
                        helperText={errors.name?.message} // Display the error message
                    />
                    <label style={{ marginBlock: "1vh" }}>Add Image(s)</label>
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

                </React.Fragment>
            </form>
        </>
    );
}
export default AddCategory