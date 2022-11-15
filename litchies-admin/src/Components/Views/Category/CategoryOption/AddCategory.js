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
        image: "",
    });
    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value,
        });
    };
    const handleSubmit = (e) => {
        alert("added");
        e.preventDefault();
        const cat = {
            name: state.name,
            image: state.image,
            srno: 7
        };

        axios
            .post("http://43.205.116.96:3000/productCategory/create", cat)
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
                        sx={{ marginY: 2 }}
                    />
                    <TextField
                        fullWidth
                        name="image"
                        label="Enter Category Image"
                        value={state.image}
                        onChange={handleChange}
                        sx={{ marginY: 2 }}
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

                </React.Fragment>
            </form>
        </>
    );
}
export default AddCategory