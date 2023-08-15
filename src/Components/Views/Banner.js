import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import empty from "../Elements/Images/empty.gif"
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
                <Box
                    sx={{
                        display: "flex",
                        width: "95vw",
                        margin: "50px",
                        justifyContent: "center",
                        "& .MuiTableCell-root": { width: "1ch" },
                        flexWrap: "wrap"
                    }}
                >

                    {banner.map((product) => (
                        <ShopBannerCard Product_Name={product.offerProducts.title} Product_Desc={product.desc} discount={product.offerProducts.products.discount} imgUrl={product.offerProducts.shopBanner} id={product._id} shopId={shopId} />
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
