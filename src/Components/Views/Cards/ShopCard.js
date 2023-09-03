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
import { style } from "@mui/system";
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
                    height: "auto",
                    my: 4,
                    mx:2,
                    boxShadow: "14px 22px 52px -12px rgba(127, 127, 127)",
                    backgroundColor:"white",
                    backgroundImage:`url('/circle.png'), url('/circle.png')`,
                    backgroundSize: '300px',
                    backgroundRepeat:"no-repeat",
                    backgroundPosition: '170px -85px, -170px 355px',
                }}
            ><div style={{zIndex:2, position:'absolute'}} >
                    <IconButton onClick={handleClick}><CloseIcon sx={{color:'red'}} /></IconButton>
                </div>

                <Link to={`verifiedShopsList/shopDetails/${props.id}`} style={{ textDecoration: "none" }} >
                    <Box sx={{display:'flex',
                        marginY:'20px',
                        justifyContent:'center', width:'auto', height:"200px",}}>
                    <Box align="center"   sx={{
                        backgroundImage: `url("http://43.205.116.96:3000/images/${imgUrl}")`,backgroundSize:"contain",
                        backgroundRepeat: "no-repeat",
                        borderRadius:'50%',
                        width:"200px",
                        height:"auto"
                    }} ></Box>

                    </Box></Link>
                <Box textAlign='center' zIndex='2' >
                    <Typography
                        sx={{
                            margin:'1px',
                            paddingX:'20px',
                            fontWeight: "700",
                            fontSize: "23px",
                            fontFamily: "math",
                            lineHeight: "26px",
                        }}
                    >
                        <b>Shop Name: </b> {Shop_Name}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        component="div"
                        lineHeight="20px"
                        fontFamily="math"
                        fontSize="18px"
                        sx={{paddingX:'20px',marginX:'12px', mt: 1 }}
                    >
                        <b>Owner Name: </b>{Karta_Name}
                    </Typography>
                    <Typography
                        color="text.secondary"
                        component="div"
                        fontFamily="math"
                        lineHeight="20px"
                        fontSize="15px"
                        sx={{paddingX:'20px',margin:'12px', mt: 1 }}
                    >
                        <b>Mobile: </b> {Mobile}
                    </Typography>
                    
                </Box>
                <Box display="flex" alignItems="center" paddingTop="40px">
                    <MoreVertItems id={props.id} />
                </Box>

            </Card >

            <Warning open={open} onClose={handleClose} id={props.id} />
        </>
    );
};
export default ShopCard;
