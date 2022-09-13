import { Card, Skeleton, Stack, Typography, useTheme } from "@mui/material";
import { XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, AreaChart, Area } from 'recharts';
import useFetch from "../../../../Utils/CustomHooks/use_fetch";
import { Stat } from "../../../../Models/sensor_stat_model";
import { convertStatDate_ToDateMonth } from '../../../../Utils/Functions/convert_dates'
import { useCallback } from "react";
import CustomTitle from "../../../../Utils/Components/custom_title";
import { SettingsRounded } from "@mui/icons-material";

const SensorStatsChart = () => {

    const theme = useTheme()

    const {data,loading,error} = useFetch('/sensor/stats')
    let chartData: Stat[] = [];

    // relatively heavy opertaion, thats why wrapping in useCallback
    const convertedMethod = useCallback((stats: Stat[]) => convertStatDate_ToDateMonth(stats), [data]) 
    
    if(data){
        /*
             working with stats from only 1 sensor in all the Charts as the ReChart APIs 
             requires data to be structured in a spcific way and there wasn't
             enough time left to change incoming data to this structure
        */
        chartData = convertedMethod(data.results[0].stats as Stat[])
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
        <Card elevation={4} sx={{borderRadius: '12px', display: 'flex', flexDirection: 'column', p: 3, mt: 5}} >
            <div style={{display: 'flex', justifyContent:'space-between' }} >
                <CustomTitle text='SENSOR TEMPERATURES' />
                <SettingsRounded color="secondary" />
            </div>

            <div style={{marginTop: '48px', width: '100%', height: '400px'}}>
                <ResponsiveContainer width={'100%'} height={'100%'}>
                    <AreaChart
                        data={chartData!}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <defs>
                            <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="3%" stopColor={theme.palette.secondary.main} stopOpacity={0.55}/>
                                <stop offset="95%" stopColor={theme.palette.secondary.dark} stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <XAxis dataKey='time' />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid strokeDasharray="3 3" fill={theme.palette.primary.dark} />
                        <Area type="monotone" dataKey='temp' stroke={theme.palette.secondary.light} fillOpacity={1}  fill="url(#colorTemp)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    )
}

export default SensorStatsChart