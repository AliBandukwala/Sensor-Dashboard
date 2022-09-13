import { Card } from "@mui/material"
import CustomTitle from "../../../../Utils/Components/custom_title"
import ActivitiesContainer from "./activities_container"

const SensorEvents = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', flex: 1,}}>
            <CustomTitle text={"ACTIVITY"} />

            <Card elevation={4} sx={{borderRadius: '12px', mt: 2, p: 2, }} >
                <ActivitiesContainer />
            </Card>
        </div>
    )
}

export default SensorEvents