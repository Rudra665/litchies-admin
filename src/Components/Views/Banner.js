import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import empty from "../Elements/Images/empty1.gif"
import ShopBannerCard from "./Cards/ShopBannerCard";
export default function BannerList() {
    const [banner, setBanner] = useState([]);
    const { shopId } = useParams();
    const fetchBanner = () => {
        fetch(`http://43.205.116.96:3000/banner/getById/${shopId}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setBanner(data);
            });
    };
    useEffect(() => {
        fetchBanner();
    }, []);

    return (
        <>
            {banner.length > 0 ? (
                <Box>
                <Box align="center">
                <Link to={`/admin/verifiedShopsList/addProduct/${shopId}`} sx={{ textDecoration: "none" }}><Button variant="contained" style={{color:"white"}}>Add Some</Button></Link>
            </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "95vw",
                        justifyContent: "center",
                        "& .MuiTableCell-root": { width: "1ch" },
                        flexWrap: "wrap",
                    }}
                >
            <Typography align='center' mb="3vh" variant="h3" style={{zIndex:'3'}}>Shop Banners</Typography>

                    {banner.map((product) => (
                        <ShopBannerCard key={product._id} Product_Name={product.offerProducts.title} Product_Desc={product.desc} discount={product.offerProducts.products.discount} imgUrl={product.offerProducts.shopBanner} id={product._id} shopId={shopId} />
                    ))}
                </Box></Box>
            ) : (
                <Box display="inlineFlex" alignItems="center" height="100vh" justifyContent="center" >
                    <Box >
                    <Typography align='center' marginBottom="170px" fontWeight="600" variant="h3" style={{zIndex:'3'}}>Shop Banners</Typography>

                        <Box display="flex" justifyContent="center">
                            <img src={empty} width='500px'></img>
                        </Box>
                        <Box align="center">
                            <Link to={`/admin/verifiedShopsList/addProduct/${shopId}`} sx={{ textDecoration: "none" }}><Button variant="contained" style={{color:"white"}}>Add Some</Button></Link>
                        </Box>
                    </Box>
                </Box>)
            }
        </>
    );
}
