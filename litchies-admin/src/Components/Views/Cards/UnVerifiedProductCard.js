import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
// import OwlCarousel from 'react-owl-carousel';
import { Swiper, SwiperSlide } from "swiper/react"
// import 'owl.carousel/dist/assets/owl.carousel.min.css';
// import 'owl.carousel/dist/assets/owl.theme.default.min.css';
import Typography from "@mui/material/Typography";
import CheckIcon from "@mui/icons-material/Check";
import Carousel from "../carousel/Caraousal";
import { Button } from "@mui/material";
import axios from "axios";
const UnVerifiedProductCard = (props) => {
    const { imgUrl, Product_Name, Product_Desc, Price } = props;
    const verified = () => {
        axios
            .put(`http://43.205.116.96:3000/Shop/ChangeVerifiedStatus/${props.id}`)
            .then((response) => {
                return response.json();
            });
        alert(`Product Verified`)
    };
    return (
        <>
            <Card
                sx={{

                    width: "350px",
                    height: "56vh",
                    m: 1,
                    p: 0,
                    boxShadow: "14px 22px 52px -12px rgba(127, 127, 127)",
                    borderRadius: "10px",
                }}
            >

                <Box align="center" paddingY="20px" height="35vh" m="1vh" class="item" sx={{
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
                        {Product_Name}
                    </Typography>
                    <Box height="5vh" overflow="hidden">
                        <Typography
                            color="text.secondary"
                            lineHeight="20px"
                            fontSize="12px"
                            sx={{ mt: 1 }}
                        >
                            {Product_Desc}
                        </Typography>
                    </Box>
                    <Typography
                        color="text.secondary"
                        component="div"
                        lineHeight="20px"
                        fontSize="12px"

                    >
                        {Price}
                    </Typography>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<CheckIcon />}
                        mt="10px"
                        onClick={() => verified()}
                    >
                        Verify
                    </Button>

                </Box>

            </Card >
        </>
    );
};
export default UnVerifiedProductCard;
