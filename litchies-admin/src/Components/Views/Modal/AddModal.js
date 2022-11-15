import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddChildCategory from '../Category/CategoryOption/AddChildCategory';
import Modal from '@mui/material/Modal';
import AddSubCategory from '../Category/CategoryOption/AddSubCategory';
import AddCategory from '../Category/CategoryOption/AddCategory';
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
            <Button >Open modal</Button>
            <Modal
                open={props.open}
                onClose={props.onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {props.actionType == 0 ?
                        <AddCategory />
                        : props.actionType == 1 ?
                            <AddSubCategory /> :
                            <AddChildCategory />
                    }
                </Box>
            </Modal>
        </div>
    );
}