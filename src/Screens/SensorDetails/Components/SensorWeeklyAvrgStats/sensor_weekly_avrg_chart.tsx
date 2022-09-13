import { memo, useCallback } from "react"
import { useParams } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import useFetch from "../../../../Utils/CustomHooks/use_fetch";
import { Stat } from '../../../../Models/sensor_stat_model'
import { convertStatDate_ToDay } from "../../../../Utils/Functions/convert_dates";
import { Skeleton, useTheme } from "@mui/material";

const SensorWeeklyAvrgChart = memo(() => {

    const { id } = useParams();

    const theme = useTheme()
    
    const {data,loading,error} = useFetch(`/sensor/${id}/stats/weekly_avg`)

    let sensorWeeklyAvrgChartData: Stat[] | null = null

    // relatively heavy opertaion so wrapping in useCallback
    const convertedMethod = useCallback((stats: Stat[]) => convertStatDate_ToDay(stats), [data]) 

    if(error){
        return <div>ERROR!</div>
    }

    if(loading){
        return <Skeleton variant="rounded" width={'100%'} height={250} />
    }

    if(data){
        /*
             working with stats from only 1 sensor in all the Charts as the ReChart APIs 
             requires data to be structured in a spcific way and there wasn't
             enough time left to change incoming data to this structure
        */
        sensorWeeklyAvrgChartData = convertedMethod(data.results[0].stats)

        return (
            data && 
            <ResponsiveContainer width={'100%'} height={'100%'} >
                <AreaChart
                    //width={1000}
                    //height={400}
                    data={sensorWeeklyAvrgChartData!}
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
                    <CartesianGrid strokeDasharray="3 3" />
                    <Area type="monotone" dataKey='temp' stroke={theme.palette.secondary.main} fill="url(#colorTemp)" />
                </AreaChart>
            </ResponsiveContainer>
        )
    }
})

export default SensorWeeklyAvrgChart