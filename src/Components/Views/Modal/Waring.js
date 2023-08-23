import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DeleteShop from "../Delete/DeleteShops";
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton, Typography } from '@mui/material';
import { display } from '@mui/system';
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
            <Box style={{display:"flex", justifyContent:'end' }}>
            <IconButton onClick={props.onClose}><ClearIcon /></IconButton>
            </Box>
                <Typography align="center" color="warning" variant='h4' id="parent-modal-title">Delete Shop permanently from Database?</Typography>
                <Box align="center" marginY="3vh">
                    <Button onClick={props.onClose} variant="contained" sx={{ marginX: 2 }}>Cancel</Button>
                    <DeleteShop id={props.id} variant="outlined" onClick={props.onClose} />
                </Box>
            </Box>
        </Modal>

    );
}