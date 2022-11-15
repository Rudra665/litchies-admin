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
                    <TableContainer component={Paper}>
                        <h3 style={{ alignItems: "center" }}>Add a Category</h3>
                        <TextField
                            name="name"
                            label="Enter Category Name"
                            value={state.name}
                            onChange={handleChange}
                            style={{ width: "500px", margin: "70px" }}
                        />
                        <div
                            style={{
                                marginTop: "10px",
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <Button variant="contained" className="buttonCss" onClick={props.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" className="buttonCss" type="submit">
                                Save
                            </Button>
                        </div>
                    </TableContainer>
                </React.Fragment>
            </form>
        </>
    );
}
export default AddCategory