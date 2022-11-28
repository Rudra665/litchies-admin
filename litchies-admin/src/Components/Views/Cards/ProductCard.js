import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import MoreVertItems from "../MoreVertItems";
import CloseIcon from '@mui/icons-material/Close';
import Warning from "../Modal/Waring";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Carousel from "../carousel/Caraousal";
const ShopCard = (props) => {
    const { imgUrl, Product_Name, Product_Desc, Price } = props;



    return (
        <>

            <Card
                sx={{

                    width: "350px",
                    height: "55vh",
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
                        sx={{ mt: 1 }}
                    >
                        {Price}
                    </Typography>

                </Box>





            </Card >



        </>
    );
};
export default ShopCard;
