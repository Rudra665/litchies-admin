import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Carousel from "../carousel/Caraousal";
const ProductCard = (props) => {
    const { imgUrl, Product_Name, Product_Desc, Price } = props;



    return (
        <>
            <Card
                sx={{
                    width: "300px",
                    height: "auto",
                    m: 1,
                    p: 0,
                    boxShadow: "14px 22px 52px -12px rgba(127, 127, 127)",

                }}
            >
                <Box align="center" height="200px" m="1vh" class="item" sx={{
                    display: "flex",
                }} >
                    <Carousel images={imgUrl} shopId={props.shopId} id={props.id} />
                </Box>
                <Box align="center" p="1vh" display="grid">
                    <Typography
                        sx={{
                            fontWeight: "700",
                            fontSize: "16px",
                            fontFamily: "inter",
                            lineHeight: "26px",
                            color: "grey"
                        }}
                    >
                        <b>Product Name: </b> {Product_Name}
                    </Typography>
                    <Box height="5vh" overflow="hidden">
                        <Typography
                            color="text.secondary"
                            lineHeight="20px"
                            fontSize="12px"
                            sx={{ mt: 1, }}
                        >
                            <b>Description: </b>{Product_Desc}
                        </Typography>
                    </Box>
                    <Typography
                        color="text.secondary"
                        component="div"
                        lineHeight="20px"
                        fontSize="12px"
                        sx={{ mt: 1 }}
                    >
                        <b>Price:</b> {Price}
                    </Typography>
                </Box>

            </Card >
        </>
    );
};
export default ProductCard;
