import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react'
const Delete = (props) => {
    const erase = async () => {
        axios.delete(`http://43.205.116.96:3000/shop/deleteShop/${props.id}`);

    };
    return (
        <>
            <Button onClick={erase} color="error">Delete Shop</Button>

        </>
    )
}

export default Delete
