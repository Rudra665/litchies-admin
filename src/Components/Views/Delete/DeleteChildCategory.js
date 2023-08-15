import { Button } from '@mui/material';
import axios from 'axios';
import React from 'react'

const Delete = (props) => {

    const erase = () => {
        axios
            .delete(`http://43.205.116.96:3000/productChildCategory/delete/${props.id}`)
            .then((response) => {
                if(response.status==200)
             alert('Child Category Deleted')
             window.location.reload()
            });
    };
    return (
        <Button onClick={() => erase()} variant={props.variant} color="error">Delete</Button>
    )
}

export default Delete
