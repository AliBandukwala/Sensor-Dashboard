import { Skeleton, Stack } from "@mui/material";
import { memo } from "react"
import { useParams } from "react-router-dom";
import useFetch from "../../../../Utils/CustomHooks/use_fetch";
import { EventModel } from "../../../../Models/event_model";
import SensorEventActivityTile from "./activity_tile";

const ActivitiesContainer = memo(() => {

    const { id } = useParams();
    
    const {data,loading,error} = useFetch(`/sensor/${id}/events`)

    let sensorEventsData: EventModel[] | null = null

    if(error){
        return <div>ERROR!</div>
    }

    if(loading){
        return <Skeleton variant="rounded" width={'100%'} height={250} />
    }

    if(data){
        sensorEventsData = data.results as EventModel[]
        return (
            data && 
            <Stack direction={'column'} >
                {
                    sensorEventsData!.map((event: EventModel) => {
                        return <SensorEventActivityTile key={event.time} event={event} />
                    })
                }
            </Stack>
        )
    } 
})

export default ActivitiesContainer