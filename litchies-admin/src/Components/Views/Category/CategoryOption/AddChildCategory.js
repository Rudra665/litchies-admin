import * as React from "react";
import Box from "@mui/material/Box";
import { TextField, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AddChildCategory() {
    const { subCatId } = useParams();

    const [state, setState] = useState({
        name: "",
        subCategoryId: subCatId
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
            subCategoryId: state.subCategoryId,
        };

        axios
            .post("http://43.205.116.96:3000/productChildCategory/create", childCat)
            .then((response) => {
                console.log(response.data);
            });
        window.reload();
    };

    return (
        <>
            <form onSubmit={handleSubmit}>


                <Box
                    sx={{
                        marginTop: "40px",
                        "& .MuiTextField-root": { m: 1 },
                    }}
                >
                    <div>
                        <TextField
                            name="name"
                            fullWidth
                            label="Child Category Name"
                            value={state.name}
                            onChange={handleChange}
                        />
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
