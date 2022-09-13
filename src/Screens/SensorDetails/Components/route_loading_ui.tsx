import { Skeleton, Stack } from "@mui/material"
import { memo } from "react"

const SensorDetailsScreenLoadingUI = memo(() => {
    return (
        <Stack spacing={4}>
            <Skeleton variant="rounded" width={'100%'} height= '250px' />
            <Skeleton variant="rounded" width={'50%'} height= '450px' />
            <Stack direction={'row'} spacing={4}>
                <Skeleton variant="rounded" width={'50%'} height= '300px' />
                <Skeleton variant="rounded" width={'50%'} height= '300px' />
            </Stack>
        </Stack>
    )
})

export default SensorDetailsScreenLoadingUI