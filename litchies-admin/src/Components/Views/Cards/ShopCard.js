import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, IconButton } from "@mui/material";
import MoreVertItems from "../MoreVertItems";
import CloseIcon from '@mui/icons-material/Close';
import Warning from "../Modal/Waring";
import { Link } from "react-router-dom";
const ShopCard = (props) => {
    const { imgUrl, Shop_Name, Karta_Name, Mobile } = props;
    const [open, setOpen] = React.useState(false)
    const handleClick = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

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
            ><Box display="flex" justifyContent="right" >
                    <IconButton onClick={handleClick}><CloseIcon color="primary" /></IconButton>
                </Box>


                <Link to={`verifiedShopsList/shopDetails/${props.id}`} style={{ textDecoration: "none" }} >
                    <Box align="center" paddingY="20px" height="35vh" m="1vh" sx={{
                        backgroundImage: `url("http://43.205.116.96:3000/images/${imgUrl}")`, backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                    }} >

                    </Box></Link>
                <Box align="center" >
                    <Typography
                        sx={{
                            fontWeight: "700",
                            fontSize: "16px",
                            fontFamily: "inter",
                            lineHeight: "26px",
                        }}
                    >
                        <b>Shop Name: </b> {Shop_Name}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        component="div"
                        lineHeight="20px"
                        fontSize="12px"
                        sx={{ mt: 1 }}
                    >
                        <b>Owner Name: </b>{Karta_Name}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        component="div"
                        lineHeight="20px"
                        fontSize="12px"
                        sx={{ mt: 1 }}
                    >
                        <b>Mobile: </b> {Mobile}
                    </Typography>
                    <Box align="right" display="flex" justifyContent="space-between">
                        <MoreVertItems id={props.id} />
                    </Box>
                </Box>





            </Card >

            <Warning open={open} onClose={handleClose} id={props.id} />
        </>
    );
};
export default ShopCard;
