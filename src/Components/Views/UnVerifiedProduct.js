import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import empty from "../Elements/Images/empty1.gif"
import UnVerifiedProductCard from "./Cards/UnVerifiedProductCard";
export default function UnVerifiedProduct() {
    const [products, setProducts] = useState([]);
    const shopId = useParams()
    const fetchProducts = () => {
        fetch(`http://43.205.116.96:3000/product/getRecentlyAddedProducts`)
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

                    {products.map((product) => (
                        <UnVerifiedProductCard Product_Name={product.name} Product_Desc={product.desc} Price={product.price} imgUrl={product.imageURLs} id={product._id} shopId={shopId} />
                    ))}
                </Box>
            ) : (
                <Box display="inlineFlex" alignItems="center" height="100vh" justifyContent="center" sx={{backgroundColor: "#4b5b84",}}>
                    <Box >
            <Typography align='center' mb="3vh" variant="h3" style={{zIndex:'3'}}>Un-Verified Products</Typography>

                        <Box display="flex" justifyContent="center">
                            <img src={empty} width='500px'></img>
                        </Box>
                        <Box align="center">
                            <Link to={`/admin/verifiedShopsList/addProduct/${shopId}`} sx={{ }}><Button variant="contained" >Add Some</Button></Link>
                        </Box>
                    </Box>
                </Box>)
            }
        </>
    );
}


