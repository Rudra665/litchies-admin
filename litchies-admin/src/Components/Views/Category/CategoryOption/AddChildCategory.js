import * as React from "react";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";


export default function AddChildCategory() {

    const [subCat, setSubCat] = React.useState([])
    const [state, setState] = React.useState({
        name: "",
        SubCategoryId: "",
        CategoryId: ""
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
        const childCat = {
            name: state.name,
            subCategoryId: state.SubCategoryId,
            CategoryId: state.CategoryId,

        };

        axios
            .post("http://43.205.116.96:3000/productChildCategory/create", childCat)
            .then((response) => {
                console.log(response.data);
            });
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
    React.useEffect(() => {
        fetchSubCat();
    }, []);

    const fetchCat = () => {
        fetch("http://43.205.116.96:3000/productCategory/getAll")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setSubCat(data);
            });
    };
    React.useEffect(() => {
        fetchSubCat();
    }, []);

    return (
        <>
            <form onSubmit={handleSubmit}>


                <Box
                    sx={{

                        "& .MuiTextField-root": { m: 1 },
                    }}
                >
                    <div><h2 align="center">Add Child Category</h2>
                        <TextField
                            name="name"
                            fullWidth
                            label="Child Category Name"
                            value={state.name}
                            onChange={handleChange}
                        />
                        <TextField
                            select
                            name="categoryId"
                            fullWidth
                            label='Category '
                            value={state.CategoryId}
                            onChange={handleChange}
                            sx={{ my: 2 }}
                        >
                            {Cat.map((cat) => (
                                <MenuItem value={cat._id}>{cat.name}</MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            select
                            name="categoryId"
                            fullWidth
                            label='Category '
                            value={state.SubCategoryId}
                            onChange={handleChange}
                            sx={{ my: 2 }}
                        >
                            {Cat.map((cat) => (
                                <MenuItem value={cat._id}>{cat.name}</MenuItem>
                            ))}
                        </TextField>
                        <Box align="center">
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<AddIcon />}
                                type="submit"
                                className="buttonCss"
                                style={{ marginTop: "15px" }}
                            >
                                Add
                            </Button>
                        </Box>

                    </div>
                </Box>

            </form>
        </>
    );
}
