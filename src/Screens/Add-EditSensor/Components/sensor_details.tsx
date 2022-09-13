import { Divider, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material"
import { ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import CustomTitle from "../../../Utils/Components/custom_title";
import { useAddNewSensorDataContext } from "../Context/add_sensor_context"

const AddOREditSensorDetails = () => {

    const { id } = useParams();

    const { newSensorData, setNewSensorData, isEdit } = useAddNewSensorDataContext();

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSensorData({
            ...newSensorData,
            [e.target.id]: e.target.value,
        })
    }
    
    // method for Customer Select value change:
    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        setNewSensorData({
            ...newSensorData,
            customer: e.target.value,
        })
    }

    return (
        <Stack direction={'column'} sx={{flex: 2, marginRight: '12px'}} >
            {
                isEdit ?
                <div style={{display: 'flex', alignItems: 'center'}} >
                    <span style={{color: 'gray', fontSize: 18, paddingRight: '12px'}} >EDIT SENSOR - </span>
                    <CustomTitle text={id!} />
                </div>
                :
                <Typography variant="h6" textAlign={'start'} >NEW SENSOR</Typography>
            }
            <Divider />

           <Stack direction={'column'} spacing={4} sx={{width:'50%', marginTop: '24px'}} >
                {
                    isEdit ? 
                    <Typography variant="h6" textAlign={'start'} >{id!}</Typography>
                    :
                    <TextField id="sensor_id" label="Sensor ID" variant="outlined" onChange={handleTextChange}  />
                } 

                <TextField id="location" label="Location" variant="outlined" value={newSensorData.location} onChange={handleTextChange} />
                
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="customer"
                        value={newSensorData.customer}
                        label="Age"
                        inputProps={{ id: 'customer' }}
                        onChange={handleSelectChange}
                    >
                        <MenuItem id="customer" value={'customer-1'}>
                            customer-1
                        </MenuItem>
                        <MenuItem id="customer" value={'customer-2'}>
                            customer-2
                        </MenuItem>
                        <MenuItem id="customer" value={'customer-3'}>
                            customer-3
                        </MenuItem>
                    </Select>
                </FormControl>
           </Stack>
        </Stack>
    )
}

export default AddOREditSensorDetails