import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import { TableContainer } from "@mui/material";
import { Paper } from "@mui/material";
import axios from "axios";

const AddCategory = props => {
    const [state, setState] = useState({
        name: "",
        imageURLs: "",
    });
    const [img, setImg] = React.useState("")
    const onImageChange = (e) => {
        const selectedFIle = "";
        const targetFile = e.target.files;
        selectedFIle = targetFile
        setImg(selectedFIle); 
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
        formData.append("image", img);

        await axios
            .post("http://43.205.116.96:3000/Uploadimage/?image", formData)
            .then((response) => {
                if (response.status === 200) alert("Images Uploaded Successfully");
                return response.data;
            })
            .then((data) => {
                setState({
                    image: state.image.push(data)
                });
            })

            .then((img) => {
                setState({
                    image: state.imageURLs
                });
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const proData = {
            name: state.name,
            image: state.image,
            srno: 7
        };

        axios
            .post("http://43.205.116.96:3000/product/createProduct", proData)
            .then((response) => {
                console.log(response.data);
            });
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