import * as React from "react";
import { Box } from "@mui/material";

import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
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
        if(state.name&& state.categoryId)
        {e.preventDefault();
        const subCat = {
            name: state.name,
            categoryId: state.categoryId,
        };

        axios
            .post("http://43.205.116.96:3000/productSubCategory/create", subCat)
            .then((response) => {
                if(response.status===200){
                    alert("Sub Category Added")
                console.log(response.data);
                window.location.reload()}
            });
        // window.location.reload();
     }else{
        alert("Fill All The Fields")
     } };
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
                        select
                        name="categoryId"
                        fullWidth
                        label='Category '
                        value={state.categoryId}
                        onChange={handleChange}
                        sx={{ my: 2 }}
                    >
                        {Cat.map((cat) => (
                            <MenuItem value={cat._id}>{cat.name}</MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        name="name"
                        label="Enter Sub Category Name"
                        value={state.name}
                        onChange={handleChange}
                        fullWidth
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
