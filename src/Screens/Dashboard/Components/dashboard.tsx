import { memo } from "react"
import QuickInfoPanel from "./QuickInfoHeaderPanel/quick_info_panel"
import SensorsListDataGrid from "./SensorsListDataGrid/sensors_list_datagrid"
import SensorStatsChart from "./SensorStatsChart/sensors_stats_chart"

// relatively heavy component, so wrapping in memo:
const DashBoard = memo(() => {
    return (
        <>
             <QuickInfoPanel/>
             <SensorStatsChart />
             <SensorsListDataGrid />
        </>
    )
})

export default DashBoard