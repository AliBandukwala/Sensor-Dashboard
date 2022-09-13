import { ArrowBack } from "@mui/icons-material";
import { IconButton, Stack, Typography, useTheme } from "@mui/material";
import { memo } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SensorDailyTempChart from "./SensorDailyTempChart/sensor_daily_temp_chart";
import SensorEvents from "./SensorDeviceEvents/sensor_events";
import SensorLogs from "./SensorDeviceLogs/sensor_logs";
import SensorOverview from "./SensorWeeklyAvrgStats/sensor_overview";

const SensorDetails = memo(() => {

    const navigate = useNavigate(); 
    const { id } = useParams();
    const theme = useTheme()

    return (
        <div style={{display: 'flex', flexDirection:'column', }}>
            {/******* Header with id and back button: ************/}
            <div style={{display: 'flex', alignItems:'center', marginBottom: '24px'}}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    color="inherit"
                    onClick={ () => navigate(-1) }
                >
                    <ArrowBack />
                </IconButton>
                <Stack direction="row" sx={{ml: 4}} >
                    <Typography variant="h5" >Sensor - </Typography> 
                    <Typography variant='h5' sx={{ml: 1, color: theme.palette.primary.main, fontWeight: 'bold' }} >{id}</Typography>
                </Stack>
            </div>
                
            <SensorOverview/>
          
            <SensorDailyTempChart />

            <Stack direction={{sm: 'column', md: 'row'}} sx={{display: 'flex', mt: 4, }} spacing={{sm: 4, md: 2}} >
                <SensorLogs />
                <SensorEvents />
            </Stack>
            
        </div>
    )
})

export default SensorDetails