import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import OwlCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.min.css';
// import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import SwitchToggle from "../../Switch Toggle/SwitchToggle";

import Typography from "@mui/material/Typography";

import Carousel from "../carousel/Caraousal";
import { Button } from "@mui/material";
import axios from "axios";
const UnVerifiedProductCard = (props) => {
    const { imgUrl, Product_Name, Product_Desc, Price } = props;


    return (
        <>
            <Card
                sx={{
                    width: "300px",
                    height: "60vh",
                    m: 3,
                    p: 0,
                    boxShadow: "10px 10px 5px 5px #e1e1e1",
                    border:"2px #e1e1e1"
                }}
            >

                <Box align="center"  height="35vh" margin={0} className="item" sx={{
                    display: "flex"
                }} >
                    <Carousel images={imgUrl} shopId={props.shopId} id={props.id} />
                </Box>

                <Box align="center" p="1vh">
                    <Typography
                        sx={{
                            fontWeight: "700",
                            fontSize: "16px",
                            fontFamily: "inter",
                            lineHeight: "26px",
                        }}
                    >
                        <b>Product Name: </b>  {Product_Name}
                    </Typography>
                    <Box height="5vh" overflow="hidden">
                        <Typography
                            color="text.secondary"
                            lineHeight="20px"
                            fontSize="12px"
                            sx={{ mt: 1 }}
                        >
                            <b>Description: </b> {Product_Desc}
                        </Typography>
                    </Box>
                    <Typography
                        color="text.secondary"
                        component="div"
                        lineHeight="20px"
                        fontSize="12px"

                    >
                        <b>Price: </b> {Price}
                    </Typography>

                    <Box display="flex" justifyContent="center" mt="2vh"><SwitchToggle /></Box>

                </Box>

            </Card >
        </>
    );
};
export default UnVerifiedProductCard;
