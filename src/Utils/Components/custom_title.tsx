import { Typography, useTheme } from "@mui/material"
import { memo } from "react"

interface CustomTitleProps {
    text: string
}

const CustomTitle = memo(({text}: CustomTitleProps) => {

    const theme = useTheme()

    return (
        <Typography variant="h6" sx={{textAlign: 'start', color: theme.palette.primary.light, fontWeight:'bold' }} >
            {text}
        </Typography>
    )
})

export default CustomTitle