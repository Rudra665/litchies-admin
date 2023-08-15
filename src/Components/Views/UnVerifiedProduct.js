import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import empty from "../Elements/Images/empty.gif"
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
                <Box display="inlineFlex" alignItems="center" height="90vh" justifyContent="center">
                    <Box >
                        <Box display="flex" justifyContent="center">
                            <img src={empty}></img>
                        </Box>
                        <Typography variant="h3" color="grey">There's Nothing My Lord</Typography>
                        <Box align="center">
                            <Link to={`/admin/verifiedShopsList/addProduct/${shopId}`} sx={{ textDecoration: "none" }}><Button >Add Some</Button></Link>
                        </Box>
                    </Box>
                </Box>)
            }
        </>
    );
}


