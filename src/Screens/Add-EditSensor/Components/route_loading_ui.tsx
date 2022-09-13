import { Skeleton, Stack } from "@mui/material"
import { memo } from "react"

const AddOREditScreenLoadingUI = memo(() => {
    return (
        <Stack spacing={4}>
            <Skeleton variant="rounded" width={'100%'} height= '80px' />
            <Skeleton variant="rounded" width={'50%'} height= '50px' />
            <Skeleton variant="rounded" width={'50%'} height= '50px' />
            <Skeleton variant="rounded" width={'50%'} height= '50px' />
            <Stack direction={'row'} spacing={4}>
                <Skeleton variant="rounded" width={'10%'} height= '30px' />
                <Skeleton variant="rounded" width={'10%'} height= '30px' />
            </Stack>
        </Stack>
    )
})

export default AddOREditScreenLoadingUI