import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
const NewRequestCard = (props) => {
    const { imgUrl, Shop_Name, Karta_Name, Mobile } = props;
    const verified = () => {
        axios
            .put(`http://43.205.116.96:3000/Shop/ChangeVerifiedStatus/${props.id}`)
            .then((response) => {
                return response.json();
            });
        alert(`Product Verified`)
        window.location.reload()
    };
    
    const erase = async () => {
        axios.delete(`http://43.205.116.96:3000/shop/deleteShop/${props.id}`).then((res)=>{
            if(res.status===200){
                alert("Shop Deleted")
                window.location.reload()
            }
        })
        
    };


    return (
        <>

            <Card
                sx={{
                    display: "grid",
                    width: "300px",
                    height: "auto",
                    m: 1,
                    p: 0,
                    boxShadow: "14px 22px 52px 12px rgba(127, 127, 127, 0.13)",

                }}
            >

                <CardContent>
                    <Link to={`${props.id}`} style={{ textDecoration: "none" }} >
                        <Box align="center" overflow="hidden" >
                            <img width="200vh" src={"http://43.205.116.96:3000/images/" + imgUrl} alt="img" borderRadius="10px" />
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
                        <Box mt="3vh">
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<CheckIcon />}
                                mt="10px"
                                onClick={() => verified()}
                            >
                                Verify
                            </Button></Box>
                            <Box mt="3vh">
                            <Button
                                variant="contained"
                                color="error"
                                startIcon={<DeleteIcon />}
                                mt="10px"
                                onClick={() => erase()}
                            >
                                Delete
                            </Button></Box>
                    </Box>

                </CardContent >

            </Card >


        </>
    );
};
export default NewRequestCard;
