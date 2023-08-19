import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import AddModal from "../../Modal/AddModal";
export default function CategoryOptions() {
    const [open, setOpen] = React.useState(false);
    const [actionType, setActionType] = React.useState(false);

    const handleOpen = (actionType) => {
        setOpen(true);
        setActionType(actionType);
    }

    const handleClose = () => setOpen(false);
    return (
        <><div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 10, mx: 2 }}>

                <Box >
                    <Button onClick={() => handleOpen(0)}>
                        <AddIcon />
                        <Typography> ADD CATEGORY</Typography>
                    </Button>
                </Box>


                <Box >
                    <Button onClick={() => handleOpen(1)}>
                        <AddIcon />
                        <Typography> ADD SUB CATEGORY</Typography>
                    </Button>
                </Box>


                <Box >
                    <Button onClick={() => handleOpen(2)}>
                        <AddIcon />
                        <Typography> ADD CHILD CATEGORY</Typography>
                    </Button>
                </Box>
            </Box>
            <AddModal open={open} actionType={actionType} onClose={handleClose} />
        </div>
        </>
    );
}
