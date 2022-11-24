import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import MoreVertItems from "./MoreVertItems";
import CloseIcon from '@mui/icons-material/Close';
import Warning from "./Modal/Waring";
import Button from "@mui/material/Button";
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
                    width: "300px",
                    height: "38vh",
                    m: 1,
                    p: 0,
                    boxShadow: "14px 22px 52px -12px rgba(127, 127, 127, 0.13)",
                    borderRadius: "10px",

                }}
            >
                <Box display="flex" justifyContent="space-between">
                    <Box>
                        <IconButton onClick={handleClick}><CloseIcon /></IconButton>
                    </Box>

                </Box>
                <CardContent>
                    <Link to={`verifiedShopsList/${props.id}`} style={{ textDecoration: "none" }} >
                        <Box align="center" paddingY="20px">
                            <img width="100vh" src={"http://43.205.116.96:3000/images/" + imgUrl} alt="img" />
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
                </CardContent >
                <Box align="right">
                    <MoreVertItems id={props.id} />
                </Box>
            </Card >

            <Warning open={open} onClose={handleClose} id={props.id} />
        </>
    );
};
export default ShopCard;
