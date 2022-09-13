import { Box, Card, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { useParams } from "react-router-dom";
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from "recharts";
import useFetch from "../../../../Utils/CustomHooks/use_fetch";
import { Stat } from "../../../../Models/sensor_stat_model";
import { convertStatDate_ToDay } from "../../../../Utils/Functions/convert_dates";
import { useCallback } from "react";
import CustomTitle from "../../../../Utils/Components/custom_title";
import { SettingsRounded } from "@mui/icons-material";

const SensorDailyTempChart = () => {

    const { id } = useParams();

    const theme = useTheme()
    
    const {data,loading,error} = useFetch(`/sensor/${id}/stats/weekly`)

    let sensorDailyTempData: Stat[] | null = null
    
    // relatively heavy opertaion so wrapping in useCallback
    const convertedMethod = useCallback((stats: Stat[]) => convertStatDate_ToDay(stats), [data]) 

    if(data){
        sensorDailyTempData = convertedMethod(data.results as Stat[])
    }

    if(error){
        return <div>ERROR!</div>
    }

    if(loading){
        return (
            <Stack spacing={1}>
                <Typography variant='h6'><Skeleton /></Typography>
                <Skeleton variant="rounded" width={'100%'} height={400} />
            </Stack>
        )
    }
    
    return (
        data && 
        <Card elevation={4} sx={{borderRadius: '12px', display: 'flex', flexDirection: 'column', p: 3, mt: 8}}  >
            <div style={{display: 'flex', justifyContent:'space-between' }} >
                <CustomTitle text="TEMPERATURE DAILY" />
                <SettingsRounded color="secondary" />
            </div>
           
            <Box sx={{ width:'100%', height:400, paddingTop: '24px' }} >
                <ResponsiveContainer width={'100%'} height={'100%'} >
                    <AreaChart
                        data={sensorDailyTempData!}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="3%" stopColor={theme.palette.secondary.main} stopOpacity={0.45}/>
                                <stop offset="95%" stopColor={theme.palette.secondary.dark} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey='time' />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Area type="monotone" dataKey='temp' stroke={theme.palette.secondary.light} fillOpacity={1}  fill="url(#colorTemp)" />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </Card>
        
    )
}

export default SensorDailyTempChart