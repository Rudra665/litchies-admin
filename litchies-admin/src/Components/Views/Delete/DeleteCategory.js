import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';

const Delete = (props) => {

    const erase = () => {
        axios
            .delete(`http://43.205.116.96:3000/productCategory/delete/${props.id}`)
            .then((response) => {
                return response.json();
            });
    };
    return (
        <Button onClick={() => erase()} variant={props.variant} color="error">Delete</Button>
    )
}

export default Delete
