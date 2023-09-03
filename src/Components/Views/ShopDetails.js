/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { BottomNavigation, BottomNavigationAction, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Link, useParams } from "react-router-dom";
import ProductList from "./ProductList";
import { Button } from "@mui/material";
import Banner from "./Banner";
import { LocationOn } from "@mui/icons-material";
import InventoryIcon from '@mui/icons-material/Inventory';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import UnVerifiedProduct from "./UnVerifiedProduct";
import PagesIcon from '@mui/icons-material/Pages';

export default function VerifiedShopTemplate(props) {
    
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
    const [value, setValue] = React.useState('productList');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    useEffect(() => {
        fetchData()
    }, []);
    // const img = http://43.205.116.96:3000/images/${user.shopImg};

    return (
        <>
            <Box sx={{  height: "fit-content", paddingY: "3vh", align: "center" }}>
                <Typography align="center" variant="h2" py="2vh">{user.name}</Typography>
                <Container>
                    <Box display="flex" justifyContent="space-between" my="2vh">
                        <Box display="grid">
                            <Box sx={{ borderRadius: "50%", border: "5px solid White", height: "30vh", width: "30vh", overflow: "hidden", backgroundImage: `url("http://43.205.116.96:3000/images/${user.shopImg}")`, backgroundSize: "cover" }}>
                            </Box>
                            <Box align="center" ><Button onClick={() => setValue('un-verifiedProducts')} variant="contained">Un-Verified Products</Button></Box></Box>
                        <Box my="2vh">
                            <Typography variant="h3" fontWeight="550">Details</Typography>
                            <Box align="left" maxWidth="500px">
                                <Typography variant="h5" my="1vh">Name: <Typography variant="p" color="black">{user.name}</Typography></Typography>
                                <Typography variant="h5" my="1vh">Karta Name: <Typography variant="p" color="black"> {user.kartaName}</Typography></Typography>
                                <Typography variant="h5" my="1vh">E-mail: <Typography variant="p" color="black"> {user.email}</Typography></Typography>
                                <Typography variant="h5" my="1vh">Aadhar No: <Typography variant="p" color="black">{user.aadharNo}</Typography></Typography>
                                <Typography variant="h5" my="1vh">Address: <Typography variant="p" color="black">{user.address}</Typography> </Typography>
                                <Typography variant="h5" my="1vh">Gst No: <Typography variant="p" color="black">{user.gstNo}</Typography> </Typography>
                                <Typography variant="h5" my="1vh">Mobile <Typography variant="p" color="black">{user.mobile}</Typography></Typography>
                                <Typography variant="h5" my="1vh">Pan No: <Typography variant="p" color="black">{user.panNo}</Typography></Typography>
                                <Typography variant="h5" my="1vh">City: <Typography variant="p" color="black">{user.city}</Typography></Typography>
                                <Typography variant="h5" my="1vh">State: <Typography variant="p" color="black">{user.state}</Typography></Typography>
                                <Typography variant="h5" my="1vh">Pincode: <Typography variant="p" color="black">{user.pincode}</Typography> </Typography>
                                <Typography variant="h5" my="1vh">Location: <Typography variant="p" color="black">{user.location.coordinates}</Typography> </Typography>
                                <Link to={`/admin/verifiedShopsList/${shopId}`}><Button variant="contained"  >Edit Details</Button></Link>
                            </Box>

                        </Box>

                    </Box>


                </Container>


                <Box width="100%" align='center'>
                <BottomNavigation  sx={{ width: 500 }} value={value} onChange={handleChange}>
      <BottomNavigationAction
        label="Unverified Products"
        value="un-verifiedProducts"
        icon={<UnpublishedIcon />}
      > </BottomNavigationAction>
      <BottomNavigationAction
        label="Product List"
        value="productList"
        icon={<InventoryIcon />}
      ></BottomNavigationAction>
      <BottomNavigationAction
        label="Banner"
        value="banner"
        icon={<PagesIcon />}
      >
      </BottomNavigationAction>
    </BottomNavigation>
               
                
    </Box>       
    <Box display={value==='un-verifiedProducts' ? "visible":"none" }  ease>
      <UnVerifiedProduct />
  </Box>
    <Box  display={value==='productList' ? "visible":"none"}>
      <ProductList />
    </Box>
    <Box  display={value==='banner' ? "visible":"none"}>
      <Banner />
    </Box>

</Box>
            

        </>
    );
}
