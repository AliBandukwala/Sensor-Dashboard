import { Card, } from "@mui/material"
import CustomTitle from "../../../../Utils/Components/custom_title";
import SensorLogsTimeline from "./logs_timeline";

const SensorLogs = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', flex: 1,}}>
            <CustomTitle text={"SYSTEM LOGS"} />
            
            <Card elevation={4} sx={{mr: 2, borderRadius:'12px', mt: 2 }} >
                <SensorLogsTimeline />
            </Card>
        </div>
    )
}

export default SensorLogs