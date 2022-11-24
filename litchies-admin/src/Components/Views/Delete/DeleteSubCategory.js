import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';

const Delete = (props) => {

    const erase = () => {
        axios.delete(`http://43.205.116.96:3000/productSubCategory/delete/${props.id}`);
        // alert(`SubCategory Deleted`)
        // window.location.reload()
    };
    return (
        <Button onClick={erase} variant={props.variant} color="error">Delete</Button>
    )
}

export default Delete
