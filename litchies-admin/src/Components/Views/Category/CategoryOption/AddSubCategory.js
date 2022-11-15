import * as React from "react";
import { Box, TableContainer } from "@mui/material";
import { Paper } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "@mui/material/Select"
import InputLabel from "@mui/material/InputLabel"
const AddSubCategory = (props) => {
    const [Cat, setCat] = useState([]);
    const [state, setState] = useState({
        name: "",
        categoryId: "",
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
        const subCat = {
            name: state.name,
            categoryId: state.categoryId,
        };

        axios
            .post("http://43.205.116.96:3000/productSubCategory/create", subCat)
            .then((response) => {
                console.log(response.data);
            });
        // window.location.reload();
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
            <form onSubmit={handleSubmit}>
                <Box

                >
                    <h3 align="center">Add a SubCategory</h3>
                    <TextField
                        name="name"
                        label="Enter Sub Category Name"
                        value={state.name}
                        onChange={handleChange}
                        fullWidth
                    />

                    <Select
                        fullWidth
                        lable="Category"
                        value={state.categoryId}
                        onChange={handleChange}
                    >
                        
                        {Cat.map((cat) => (
                            <option value={cat._id}>{cat.name}</option>
                        ))}
                    </Select>
                    <div
                        style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <Button
                            variant="contained"
                            className="buttonCss"
                            onClick={props.handleClose}
                        >
                            Cancel
                        </Button>
                        <Button variant="contained" className="buttonCss" type="submit">
                            Save
                        </Button>
                    </div>
                </Box>
            </form>
        </>
    );
};
export default AddSubCategory;
