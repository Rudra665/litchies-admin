import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import empty from "../Elements/Images/empty1.gif"
import UnVerifiedProductCard from "./Cards/UnVerifiedProductCard";
import axios from "axios";
export default function UnVerifiedProduct() {
    const [products, setProducts] = useState([]);
    const shopId = useParams()
    const fetchProducts = () => {
        axios.request(`http://43.205.116.96:3000/product/getRecentlyAddedProducts`)
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
            {products.length > 0 ? (
                <Box
                    sx={{
                        display: "flex",
                        width: "96vw",
                        margin: "50px",
                        justifyContent: "center",
                        "& .MuiTableCell-root": { width: "1ch" },
                        flexWrap: "wrap"
                    }}
                >
                    <Typography variant="h3">Un-Verified Product</Typography>

                    {products.map((product) => (
                        <UnVerifiedProductCard Product_Name={product.name} Product_Desc={product.desc} Price={product.price} imgUrl={product.imageURLs} id={product._id} shopId={shopId} />
                    ))}
                </Box>
            ) : (
                <Box display="inlineFlex" alignItems="center"  height="100vh" justifyContent="center" >
                    <Box >
                    <Typography align='center' marginBottom="170px" fontWeight="600" variant="h3" style={{zIndex:'3'}}>Un-Verified Product</Typography>
                    <Box display="flex" justifyContent="right">
                    </Box>

                        <Box display="flex" justifyContent="center">
                            <img src={empty} width='500px'></img>
                        </Box>
                        <Box align="center">
                            <Link to={`/admin/verifiedShopsList/addProduct/${shopId}`} ><Button variant="contained" >Add Some</Button></Link>
                        </Box>
                    </Box>
                </Box>)
            }
        </>
    );
}


