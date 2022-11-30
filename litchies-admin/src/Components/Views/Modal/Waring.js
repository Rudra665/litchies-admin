import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DeleteShop from "../Delete/DeleteShops";
import { Typography } from '@mui/material';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};



export default function Warning(props) {
    const [erase, setErase] = React.useState(false)

    return (


        <Modal
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: 700 }}>
                <Typography align="center" color="warning" variant='h2' id="parent-modal-title">Delete Shop?</Typography>
                <Box align="center" marginY="3vh">
                    <Button onClick={props.onClose} variant="contained" sx={{ marginX: 2 }}>Cancel</Button>
                    <DeleteShop id={props.id} variant="outlined" onClose={props.handleClose} />
                </Box>
            </Box>
        </Modal>

    );
}