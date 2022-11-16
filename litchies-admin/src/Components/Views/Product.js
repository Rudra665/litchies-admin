import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TextField, Button } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { COLORS } from "./constants";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";
import ProductImages from "./ProductImages";
export default function Product() {
  const [state, setState] = useState({
    name: "",
    desc: "",
    price: "",
    discount: "",
    videoURL: "",
  });
  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };
  const handleSubmit = (e) => {
    alert("updated");
    e.preventDefault();
    const ProductData = {
      name: state.name,
      price: state.price,
      desc: state.desc,
      discount: state.discount,
      videoURL: state.videoURL,
    };

    axios
      .put(`http://43.205.116.96:3000/Product/UpdateProduct/${id}`, ProductData)
      .then((response) => {
        console.log(response.data);
      });
  };

  const { shopId, id } = useParams();

  const fetchData = () => {
    fetch(`http://43.205.116.96:3000/Product/GetProduct/${id}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setState(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Delete = async () => {
    await axios.delete(`http://43.205.116.96:3000/Product/DeleteProduct/${id}`);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Container class="proContainer">
          <Box
            sx={{
              bgcolor: "#fce2d4",
              height: "90vh",
              width: 1,
              borderRadius: "25px",
              "& .MuiTextField-root": { m: 1, width: "65ch" },
            }}
          >
            <h1 className="PHeading">{state.name}</h1>
            <div className="ProductDiv">
              <ProductImages />
            </div>
            <div className="Pdetails">
              <TextField
                name="name"
                label="Product Name"
                value={state.name}
                defaultValue="Name"
                onChange={handleChange}
              />

              <TextField
                name="desc"
                label="Description"
                value={state.desc}
                defaultValue="Desc"
                onChange={handleChange}
              />
              <TextField
                name="price"
                label="Price"
                value={state.price}
                defaultValue="0"
                onChange={handleChange}
              />
              <TextField
                name="discount"
                label="Discount"
                value={state.discount}
                defaultValue="0"
                onChange={handleChange}
              />
              <TextField
                name="videoURL"
                label="videoURL"
                value={state.videoURL}
                defaultValue="xyz"
                onChange={handleChange}
              />
            </div>
            <Box
              className="Pbuttons"
              sx={{ "& .MuiButton-root": { m: 1 }, marginLeft: "10px" }}
            >
              <Button
                style={{ background: COLORS.defaultColor }}
                variant="contained"
                startIcon={<UpdateIcon />}
                type="submit"
              >
                Update Product
              </Button>
              <Button
                style={{ background: COLORS.defaultColor }}
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={Delete}
              // href={`/admin/showProducts/${shopId}`}
              >
                <NavLink to={`/admin/showProducts/${shopId}`}></NavLink>
                Delete Product
              </Button>
            </Box>
          </Box>
        </Container>
      </form>
    </>
  );
}
