import { Stack, Divider, Button, Alert, Snackbar} from "@mui/material"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ShowPopupModal from "../../../Utils/Components/show_popup"
import { addNewSensor, deleteSensor, updateSensor } from "../Api/sensor_api"
import { initalContextState, useAddNewSensorDataContext } from "../Context/add_sensor_context"
import AddOREditSensorAlertDetails from "./alerts_details"
import AddOREditSensorDetails from "./sensor_details"

const AddOREditSensor = () => {

    const navigate = useNavigate()

    const { id } = useParams();

    const { newSensorData, setNewSensorData, isEdit } = useAddNewSensorDataContext(); // data coming in from the Context

    const [disableButton, setDisableButton] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false); // state for delete confirmation modal
    const [openSB, setOpenSB] = useState({open: false, withError: false}); // state for snackbar

    // method to handle closing Delete Confirmation modal:
    const handleClose = () => {
        setOpenSB({open: false, withError: false});
    };

    // method to handle Main button clicked:
    const handleAddOREdit = async () => {
        setDisableButton(true)
        let res = isEdit ? await updateSensor(id!, newSensorData) : await addNewSensor(newSensorData)
        if(res === true){
            setOpenSB({open: true, withError: false})
            // resetting UI with initial empty values, only if Added New Senor, keep state when Editing:
            if(!isEdit) setNewSensorData(initalContextState.newSensorData) 
        }
        else{
            setOpenSB({open: true, withError: true})
        }
        setDisableButton(false)
    }

    // method to handle delete process:
    const handleDelete = async () => {
        let res = await deleteSensor(id!)
        if(res === true){
            setOpenSB({open: true, withError: false})
            navigate(-1)
        }
        else{
            setOpenSB({open: true, withError: true})
        }
    }

    // method to open modal when delete button is clicked:
    const handleDeleteBtnClicked = () => {
        setOpenDeleteModal(true)
    }

    return(
            <Stack direction={'column'} >
                <div style={{display:'flex'}} >
                    <AddOREditSensorDetails />
                    <AddOREditSensorAlertDetails />
                </div>

                <Divider sx={{marginTop: '48px', marginBottom:'24px'}} />

                <Stack direction={'row'}  spacing={3} >
                    <Button variant="contained" disabled={disableButton} onClick={ handleAddOREdit }>
                        { isEdit ? 'UPDATE SENSOR' : 'ADD SENSOR' }
                    </Button>
                    <Button variant="outlined" onClick={() => { navigate(-1) }} >CANCEL</Button>
                    {
                        isEdit && <Button variant="outlined" color='error' onClick={ handleDeleteBtnClicked }>DELETE SENSOR</Button>
                    }
                </Stack>

                {
                    openDeleteModal && <ShowPopupModal open={openDeleteModal} handleClose={() => setOpenDeleteModal(false)} handleSubmit={handleDelete} />
                }

                <Snackbar open={openSB.open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity={openSB.withError ? 'error' : 'success'} sx={{ width: '100%' }}>
                        { openSB.withError ? 'Some Error Occurred!' : 'Success!' }
                    </Alert>
                </Snackbar>
            </Stack>
    )
}

export default AddOREditSensor