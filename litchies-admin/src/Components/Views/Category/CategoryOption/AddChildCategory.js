import * as React from "react";
import { Box } from "@mui/material";
import { TextField, Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem"
const AddChildCategory = (props) => {
    const [Cat, setCat] = useState([]);
    const [SubCat, setSubCat] = useState([]);
    const [state, setState] = useState({
        name: "",
        categoryId: "",
        subcategoryId: "",
    });
    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value,
            [e.target.Cat]: value,
            [e.target.SubCat]: value,
        });
    };
    const handleSubmit = (e) => {
        alert("added");
        e.preventDefault();
        const subCat = {
            categoryId: state.categoryId,
            name: state.name,   
            subCategoryId: state.subcategoryId,
        };

        axios
            .post("http://43.205.116.96:3000/productChildCategory/create", subCat)
            .then((response) => {
                console.log(response.data);
            });
        setSubCat = [""]
    };

    const fetchSubCat = () => {
        fetch("http://43.205.116.96:3000/productSubCategory/getAll")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setSubCat(data)
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
            <form onSubmit={handleSubmit}>
                <Box>
                    <h3 align="center">Add a Child Category</h3>

                    <TextField
                        select
                        name="categoryId"
                        fullWidth
                        label='Category '
                        value={state.categoryId}
                        onChange={handleChange}
                        sx={{ my: 1 }}
                    >
                        {Cat.map((cat) => (
                            <MenuItem value={cat._id}>{cat.name}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        name="subcategoryId"
                        fullWidth
                        label='Sub Category'
                        value={state.subcategoryId}
                        onChange={handleChange}
                        sx={{ my: 1 }}
                    >

                        {SubCat.filter((item) => item.categoryId === state.categoryId).map((item) => (
                            <MenuItem value={item._id}>{item.name}</MenuItem>
                        ))
                        }

                    </TextField>

                    <TextField
                        name="name"
                        label="Enter Sub Category Name"
                        value={state.name}
                        onChange={handleChange}
                        fullWidth
                        sx={{ my: 1 }}
                    />

                    <div
                        style={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: "space-around",
                        }}
                    >
                        <Button variant="contained" className="buttonCss" type="submit">
                            Save
                        </Button>
                    </div>
                </Box>
            </form>
        </>
    );
};
export default AddChildCategory;
