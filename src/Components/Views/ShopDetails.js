/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Link, useParams } from "react-router-dom";
import ProductList from "./ProductList";
import { Button } from "@mui/material";
import Banner from "./Banner";
import UnVerifiedProduct from "./UnVerifiedProduct";

export default function VerifiedShopTemplate(props) {
    const [hide, setHide] = useState(true)
    const [user, setUser] = useState({
        name: "",
        kartaName: "",
        aadharNo: "",
        panNo: "",
        gstNo: "",
        mobile: "",
        address: "",
        state: "",
        city: "",
        pincode: "",
        location: {
            coordinates: [], type: "point"
        },
        shopImg: "",
    });

    const { shopId } = useParams();

    const fetchData = () => {
        fetch(`http://43.205.116.96:3000/Shop/GetShopById/${shopId}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setUser(data);
            });
    };

    useEffect(() => {
        fetchData()
    }, []);
    // const img = http://43.205.116.96:3000/images/${user.shopImg};

    return (
        <>
            <Box sx={{ bgcolor:"#4b5b84", height: "fit-content", paddingY: "3vh", align: "center" }}>
                <Typography align="center" variant="h2" py="2vh">{user.name}</Typography>
                <Container>
                    <Box display="flex" justifyContent="space-between" my="2vh">
                        <Box display="grid">
                            <Box sx={{ borderRadius: "50%", border: "5px solid White", height: "30vh", width: "30vh", overflow: "hidden", backgroundImage: `url("http://43.205.116.96:3000/images/${user.shopImg}")`, backgroundSize: "cover" }}>
                            </Box>
                            <Box align="center" ><Button onClick={() => setHide(!hide)} variant="contained">Un-Verified Products</Button></Box></Box>
                        <Box my="2vh">
                            <Typography variant="h3" fontWeight="550">Details</Typography>
                            <Box align="left" maxWidth="500px">
                                <Typography variant="h5" my="1vh">Name: <Typography variant="p" color="white">{user.name}</Typography></Typography>
                                <Typography variant="h5" my="1vh">Karta Name: <Typography variant="p" color="white"> {user.kartaName}</Typography></Typography>
                                <Typography variant="h5" my="1vh">E-mail: <Typography variant="p" color="white"> {user.email}</Typography></Typography>
                                <Typography variant="h5" my="1vh">Aadhar No: <Typography variant="p" color="white">{user.aadharNo}</Typography></Typography>
                                <Typography variant="h5" my="1vh">Address: <Typography variant="p" color="white">{user.address}</Typography> </Typography>
                                <Typography variant="h5" my="1vh">Gst No: <Typography variant="p" color="white">{user.gstNo}</Typography> </Typography>
                                <Typography variant="h5" my="1vh">Mobile <Typography variant="p" color="white">{user.mobile}</Typography></Typography>
                                <Typography variant="h5" my="1vh">Pan No: <Typography variant="p" color="white">{user.panNo}</Typography></Typography>
                                <Typography variant="h5" my="1vh">City: <Typography variant="p" color="white">{user.city}</Typography></Typography>
                                <Typography variant="h5" my="1vh">State: <Typography variant="p" color="white">{user.state}</Typography></Typography>
                                <Typography variant="h5" my="1vh">Pincode: <Typography variant="p" color="white">{user.pincode}</Typography> </Typography>
                                <Typography variant="h5" my="1vh">Location: <Typography variant="p" color="white">{user.location.coordinates}</Typography> </Typography>
                                <Link to={`/admin/verifiedShopsList/${shopId}`}><Button variant="contained"  >Edit Details</Button></Link>
                            </Box>

                        </Box>

                    </Box>


                </Container>
                <Box display={hide ? "none" : "visible"} sx={{ marginTop: "1vh" }} ease>
                    <Typography variant="h3" align="center" fontWeight="600">Un-Verified Products</Typography>
                    <UnVerifiedProduct />
                </Box>
                <Box my="12vh">
                    <Typography variant="h3" align="center" fontWeight="600">Products</Typography>
                    <ProductList /></Box>
                <Box my="12vh">
                    <Typography variant="h3" align="center" fontWeight="600">Banners</Typography>
                    <Banner /></Box>

            </Box>


        </>
    );
}