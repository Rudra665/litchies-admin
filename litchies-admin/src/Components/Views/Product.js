import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { TextField, Button, Typography, Grid } from "@mui/material";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { COLORS } from "./constants";
import { Link, useParams } from "react-router-dom";
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
              height: "fit-content",
              width: 1,
              borderRadius: "12px",
              "& .MuiTextField-root": { m: 1, width: "65ch" },
              paddingY: 7
            }}
          >
            <Typography variant="h3" align="center" sx={{ marginBottom: 5 }}>{state.name}</Typography>
            <Box sx={{ margin: 4 }}>
              <ProductImages />
            </Box>
            <Box align="center" sx={{ margin: 2 }}>
              <Box>
                <Grid container>
                  <Grid item lg="12">
                    <TextField
                      fullWidth
                      name="name"
                      label="Product Name"
                      value={state.name}
                      defaultValue="Name"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item lg="12">
                    <TextField
                      fullWidth
                      name="desc"
                      label="Description"
                      value={state.desc}
                      defaultValue="Desc"
                      onChange={handleChange}
                    /></Grid>
                  <Grid item lg="12">
                    <TextField
                      fullWidth
                      name="price"
                      label="Price"
                      value={state.price}
                      defaultValue="0"
                      onChange={handleChange}
                    /></Grid>
                  <Grid item lg="12">
                    <TextField
                      fullWidth
                      name="discount"
                      label="Discount"
                      value={state.discount}
                      defaultValue="0"
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item lg="12">
                    <TextField
                      fullWidth
                      name="videoURL"
                      label="videoURL"
                      value={state.videoURL}
                      defaultValue="xyz"
                      onChange={handleChange}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Box
              align="center"
              sx={{ "& .MuiButton-root": { m: 1 }, }}
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
                <Link to={`verifiedShopsList/showProducts/${shopId}`}></Link>
                Delete Product
              </Button>
            </Box>
          </Box>
        </Container>
      </form>
    </>
  );
}
