/* eslint-disable no-const-assign */
import * as React from "react";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const AddCategory = (props) => {
    const [state, setState] = useState({
        name: "",
        imageURLs: "",
    });
    const [data,setData] =useState('')
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

    const handleSubmit = (e) => {
        if(state.name && data){
        e.preventDefault();
        const proData = {
            name: state.name,
            image: data,
        };

        axios
            .post("http://43.205.116.96:3000/productCategory/create", proData)
            .then((response) => {
                if(response.status==200)
                alert("Category Added Successfuly")
                window.location.reload()
            });
        }
        else{
            alert("Fill All Fields")
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <React.Fragment>

                    <h2 align="center" >Add a Category</h2>
                    <TextField
                        fullWidth
                        name="name"
                        label="Enter Category Name"
                        value={state.name}
                        onChange={handleChange}
                        sx={{ marginY: 1 }}
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