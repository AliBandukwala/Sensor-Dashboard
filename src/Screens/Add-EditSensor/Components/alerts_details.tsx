import { Stack, Typography, Divider, TextField, Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import { ChangeEvent } from "react";
import { useAddNewSensorDataContext } from "../Context/add_sensor_context";

const AddOREditSensorAlertDetails = () => {

    const { newSensorData, setNewSensorData } = useAddNewSensorDataContext();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // if select elements, then get checked property:
        if(e.target.id === 'monitor_min_temp' || e.target.id === 'monitor_max_temp'){
            setNewSensorData({
                ...newSensorData,
                [e.target.id]: e.target.checked,
            })
        }
        //else if input text, then get value:
        else{
            setNewSensorData({
                ...newSensorData,
                [e.target.id]: e.target.value,
            })
        }
    }

    return (
        <Stack direction={'column'} sx={{flex: 1, marginLeft: '12px'}} >
            <Typography variant="h6" textAlign={'start'} >ALERTS</Typography>
            <Divider />

           <Stack direction={'column'} spacing={4} sx={{width:'50%', marginTop: '24px'}} >
                <Stack direction={'column'}>
                    <TextField id="min_temp_limit" value={newSensorData.min_temp_limit}  label="Min. Temp. Threshold" variant="outlined" onChange={handleChange} />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox id="monitor_min_temp" checked={newSensorData.monitor_min_temp} onChange={handleChange} />} label="Monitor Min Temperature" />
                    </FormGroup>
                </Stack> 

                <Stack direction={'column'}>
                    <TextField id="max_temp_limit" value={newSensorData.max_temp_limit} label="Max. Temp. Threshold" variant="outlined" onChange={handleChange} />
                    <FormGroup>
                        <FormControlLabel control={<Checkbox id="monitor_max_temp" checked={newSensorData.monitor_max_temp} onChange={handleChange} />} label="Monitor Max Temperature" />
                    </FormGroup>
                </Stack> 
           </Stack>
        </Stack>
    )
}

export default AddOREditSensorAlertDetails