import { memo } from "react"
import { Stack, Typography, useTheme } from "@mui/material";
import { borderStyle } from "../../../../Assets/consts";


const QuickInfoTile = memo(({title, subtitle, trailing, flex = 1, borderradius = '0px'}: QuickInfoTileProps) => {

    const theme = useTheme()

    return (
    <Stack direction='row' sx={{padding: '18px 36px', borderRadius: borderradius, flex: flex, border: borderStyle, alignItems:'center', justifyContent:'space-between',}}>
        <div style={{ display: 'flex', flexDirection:'column', alignItems:'start', paddingRight: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'gray', textAlign:'start' }}>
                {title}
            </Typography>
            <Typography sx={{color: theme.palette.primary.light, textAlign:'start', fontWeight:'bold', fontSize: '18px'}}>
                {subtitle}
            </Typography>
        </div>
        {trailing}
    </Stack>
)})

export default QuickInfoTile

interface QuickInfoTileProps {
    title: string,
    subtitle: string,
    trailing: any,
    flex?: number,
    borderradius?: string,
}