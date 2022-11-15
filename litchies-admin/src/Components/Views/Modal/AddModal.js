import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddChildCategory from '../Category/CategoryOption/AddChildCategory';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import AddSubCategory from '../Category/CategoryOption/AddSubCategory';
import AddCategory from '../Category/CategoryOption/AddCategory';
import ClearIcon from '@mui/icons-material/Clear';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AddModal(props) {


    return (
        <div>

            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >

                <Box sx={style}>
                    <IconButton onClick={props.onClose}><ClearIcon /></IconButton>
                    {props.actionType == 0 ?
                        <AddCategory />
                        : props.actionType == 1 ?
                            <AddSubCategory onClose={props.onClose} /> :
                            <AddChildCategory />
                    }
                </Box>
            </Modal>
        </div>
    );
}