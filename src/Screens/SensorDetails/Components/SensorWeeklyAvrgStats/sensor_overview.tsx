import { Skeleton, Typography, useTheme } from "@mui/material";
import { Stack } from "@mui/system";
import { memo } from "react"
import { useParams } from "react-router-dom";
import useFetch from "../../../../Utils/CustomHooks/use_fetch";
import { SensorOverviewModel } from "../../../../Models/sensor_overview_model";
import SensorWeeklyAvrgChart from "./sensor_weekly_avrg_chart";
import QuickInfoTile from "../../../Dashboard/Components/QuickInfoHeaderPanel/quick_info_tile";
import { borderStyle } from "../../../../Assets/consts";

const SensorOverview = memo(() => {

    const { id } = useParams();

    const theme = useTheme()

    const {data,loading,error} = useFetch(`/sensor/${id}`)

    let sensorOverviewData: SensorOverviewModel | null = null

    if(error){
        return <div>ERROR!</div>
    }

    if(loading){
        return <Skeleton variant="rounded" width={'100%'} height={250} />
    }

    if(data){
        sensorOverviewData = data.result.overview as SensorOverviewModel

        return (
            data &&
            <div style={{display: 'flex', border: borderStyle, marginTop: '24px'}} >
                <Stack spacing={0}  sx={{flex: 1}}>
                    {
                        Object.entries(sensorOverviewData!).map((entry: any) => {
                            let title: string = entry[0].split('_').join(' ').toUpperCase()
                            return <QuickInfoTile 
                                key={entry[0]} 
                                title={title} 
                                subtitle='' 
                                trailing={<Typography variant="h6" sx={{color: theme.palette.primary.light}}>{entry[1]}</Typography>}  
                            />
                        })
                    }
                </Stack>
    
                <div style={{flex: 1}}>
                    <SensorWeeklyAvrgChart />
                </div>
            </div>
            
        )
    }
})

export default SensorOverview