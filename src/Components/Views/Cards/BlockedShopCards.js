import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from '@mui/icons-material/Delete';
import Warning from "../Modal/Waring";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import BlockIcon from "@mui/icons-material/Block";
const BlockedShopCard = (props) => {
    const { imgUrl, Shop_Name, Karta_Name, Mobile } = props;
    const [open, setOpen] = React.useState(false)
    
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>

            <Card
                sx={{
                    display: "grid",
                    width: "350px",
                    height: "495px",
                    m: 1,
                    p: 0,
                    boxShadow: "14px 22px 52px -12px rgba(127, 127, 127, 0.13)",
                    borderRadius: "10px",
                    backgroundColor:"#94acc3"

                }}
            >
                <CardContent>
                    <Link to={`verifiedShopsList/${props.id}`} style={{ textDecoration: "none" }} >
                        <Box align="center" paddingY="20px" overflow="hidden">
                            <img width="200vh" src={"http://43.205.116.96:3000/images/" + imgUrl} alt="img" borderRadius="10px"/>
                        </Box>
                        </Link> 
                       
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
                            <b>Owner Name: </b> {Karta_Name}
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
                    </Box>
                </CardContent >
                <Box display="flex" padding="3vh" justifyContent="space-between">
                    <Button startIcon={<DeleteIcon />} onClick={handleOpen} color="error">Delete</Button>
                    <Button startIcon={<BlockIcon />} color="success">Unblock</Button>
                </Box>
            </Card >

            <Warning open={open} onClose={handleClose} id={props.id} />

        </>
    );
};
export default BlockedShopCard;
