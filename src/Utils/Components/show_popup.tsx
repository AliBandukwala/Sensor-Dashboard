import { Button, Modal, Box, Typography } from "@mui/material"
import { memo } from "react"

interface showPopupModalProps {
    open: boolean,
    handleClose: Function,
    handleSubmit: Function,
    variant?: 'delete'
}

const ShowPopupModal = memo(({open, handleClose, handleSubmit, variant = 'delete', }: showPopupModalProps) => {
    return (
        <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{display:'flex', justifyContent:'center', alignItems:'center'}}
            >
            <Box sx={{p: 2, width:'30%', backgroundColor:'white', borderRadius:'12px', }}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Are you sure you want to delete this sensor? You cannot undo this later
                </Typography>
                <div style={{display:'flex', justifyContent:'end'}} >
                    <Button variant="outlined" sx={{color: 'gray', mr: 2}} onClick={ ()=>{ handleClose() }}>cancel</Button>
                    <Button 
                        variant="contained" color={variant === 'delete' ? 'error' : 'primary'}  
                        onClick={ ()=>{ handleSubmit() }}
                    >
                        { variant === 'delete' ? 'Delete' : '' }
                    </Button>
                </div>
            </Box>
        </Modal>
    )
})

export default ShowPopupModal