import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react'


const Delete = (props) => {


    const erase = async () => {
        await axios.delete(`http://43.205.116.96:3000/Product/DeleteProduct/${props.id}`);
    };

    return (
        <Button onClick={erase} variant={props.variant} color="error">Delete Shop</Button>
    )
}

export default Delete
