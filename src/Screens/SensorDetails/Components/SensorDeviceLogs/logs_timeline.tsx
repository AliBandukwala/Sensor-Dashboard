import { memo } from "react"
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { LogModel } from "../../../../Models/log_model"
import { useParams } from "react-router-dom";
import useFetch from "../../../../Utils/CustomHooks/use_fetch";
import { Skeleton } from "@mui/material";
import { timeSince } from "../../../../Utils/Functions/convert_dates";

const SensorLogsTimeline = memo(() => {

    const { id } = useParams();
    
    const {data,loading,error} = useFetch(`/sensor/${id}/logs`)

    let sensorLogsData: LogModel[] | null = null

    if(error){
        return <div>ERROR!</div>
    }

    if(loading){
        return <Skeleton variant="rounded" width={'100%'} height={250} />
    }

    if(data){
        sensorLogsData = data.results as LogModel[]
        
        return (
            data && 
            <Timeline position='right'>
                {
                    sensorLogsData!.slice(0,4).map((log: LogModel, index: number) => {
                        let date = timeSince(log.time)
                        return (
                            <TimelineItem key={log.time} >
                                <TimelineOppositeContent sx={{flex:0}}>
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineDot />
                                    <TimelineConnector sx={{height: '45px'}} />
                                </TimelineSeparator>
                                <TimelineContent>
                                    <div style={{display:'flex', justifyContent:'space-between'}} >
                                        <span style={{flex: 5}} >{log.description}</span>
                                        <span style={{textAlign:'end', flex: 1}} >{ date }</span>
                                    </div>
                                </TimelineContent>
                            </TimelineItem>
                        )
                    })
                }
                <TimelineItem>
                    <TimelineOppositeContent sx={{flex:0}}>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                        <TimelineDot />
                    </TimelineSeparator>
                    <TimelineContent>
                        <span>View All</span>
                    </TimelineContent>
                </TimelineItem>
          </Timeline>
        )
    }
})

export default SensorLogsTimeline