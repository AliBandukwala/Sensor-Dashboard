import { Stack, useTheme } from '@mui/material';
import { LocalOffer, Monitor, Store, } from '@mui/icons-material';
import QuickInfoTile from './quick_info_tile';

const QuickInfoPanel = () => {

  const theme = useTheme()

  const iconStyle = {
    color: theme.palette.secondary.main,
    width: '1.25em',
    height: '1.25em',
  }
  
  return (
    <Stack direction={{ sm: 'column', md: 'row' }} spacing={{ xs: 4, md: 8, lg: 24 }}>
          <QuickInfoTile title='TOTAL SENSORS' subtitle={'182'} trailing={<Store fontSize='large' sx={iconStyle} />}  borderradius='12px'  />
          <QuickInfoTile title='OPEN ALERTS' subtitle={'2'} trailing={<LocalOffer fontSize='large'sx={iconStyle} />}  borderradius='12px'  />
          <QuickInfoTile title='TOTAL CUSTOMERS' subtitle={'14'} trailing={<Monitor fontSize='large' sx={iconStyle} />}  borderradius='12px' />
      </Stack>
  )
}

export default QuickInfoPanel;