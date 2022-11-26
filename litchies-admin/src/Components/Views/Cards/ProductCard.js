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
const ShopCard = (props) => {
    const { imgUrl, Shop_Name, Karta_Name, Mobile } = props;



    return (
        <>

            <Card
                sx={{
                    display: "grid",
                    width: "350px",
                    height: "55vh",
                    m: 1,
                    p: 0,
                    boxShadow: "14px 22px 52px -12px rgba(127, 127, 127)",
                    borderRadius: "10px",

                }}
            >



                <Box align="center" paddingY="20px" height="35vh" m="1vh" sx={{
                    backgroundImage: `url("http://43.205.116.96:3000/images/${imgUrl[0]}")`, backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                }} >

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
                        {Shop_Name}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        component="div"
                        lineHeight="20px"
                        fontSize="12px"
                        sx={{ mt: 1 }}
                    >
                        {Karta_Name}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        component="div"
                        lineHeight="20px"
                        fontSize="12px"
                        sx={{ mt: 1 }}
                    >
                        {Mobile}
                    </Typography>
                </Box>





            </Card >



        </>
    );
};
export default ShopCard;
