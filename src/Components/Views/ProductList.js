import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import empty from "../Elements/Images/empty1.gif"
import ProductCard from "./Cards/ProductCard";
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { shopId } = useParams();
  const fetchProducts = () => {
    fetch(`http://43.205.116.96:3000/Product/GetAllProductsByShopId/${shopId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setProducts(data);

      });
  };
  useEffect(() => {
    fetchProducts();
   
  }, []);

  return (
    <>
    <Box><Typography variant="h3" align="center" fontWeight="600" marginTop="5vh">Shop Products</Typography></Box>
      {products.length > 0 ? (
        <Box>
          <Box align="right" margin='20px'>
        <Link to={`/admin/verifiedShopsList/addProduct/${shopId}`}><Button  variant="contained" >Add Product</Button></Link>
      </Box>
        <Box
          sx={{
            display: "flex",
            width: "96%",
            marginLeft: "60px",
            justifyContent: "center",
            "& .MuiTableCell-root": { width: "1ch" },
            flexWrap: "wrap"
          }}
        >
             
          {products.map((product) => (
            <ProductCard Product_Name={product.name} Product_Desc={product.desc} Price={product.price} imgUrl={product.imageURLs} id={product._id} shopId={shopId} />
          ))}
        </Box></Box>
      ) : (
        <Box display="inlineFlex" alignItems="center" height="100vh" justifyContent="center" >
          <Box >
          <Typography align='center' mb="3vh" variant="h3" style={{zIndex:'3'}}>Blocked Shops</Typography>

            <Box display="flex" justifyContent="center">
              <img src={empty} width='500px'></img>
            </Box>
            <Box align="center">
              <Link to={`/admin/verifiedShopsList/addProduct/${shopId}`}><Button  variant="contained" >Add Some</Button></Link>
            </Box>
          </Box>
        </Box>)
      }
    </>
  );
}
