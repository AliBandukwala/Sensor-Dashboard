import { AccountCircle } from "@mui/icons-material"
import { IconButton, Stack, Typography } from "@mui/material"
import { memo } from "react"
import { EventModel } from "../../../../Models/event_model"
import { timeSince } from "../../../../Utils/Functions/convert_dates"

interface ActivityTileProps {
    event: EventModel,
}

const SensorEventActivityTile = memo(({event}: ActivityTileProps) => {
    let date = timeSince(event.time)
    return (
        <Stack direction={'column'} sx={{textAlign:'start',}}>
            <Stack direction={'row'} >
                <IconButton sx={{marginRight:'12px'}}>
                    <AccountCircle fontSize="large" />
                </IconButton>
                <Stack direction={'column'} >
                    <Typography variant="body1" sx={{marginTop:'4px'}} >{event.event_name}</Typography>
                    <Typography variant="subtitle1">{date}</Typography>
                </Stack>
            </Stack>
            <Typography variant="body1" sx={{mx: 2, mb: 2.5}} >{event.description}</Typography>
        </Stack>
        
    )
})

export default SensorEventActivityTile