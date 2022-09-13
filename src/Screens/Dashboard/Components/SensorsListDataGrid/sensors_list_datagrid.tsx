import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Sensor } from '../../../../Models/sensor_model';
import { Box, Button, Card, Skeleton, Stack, Typography } from '@mui/material';
import { NavigateOptions, useNavigate } from 'react-router-dom';
import { AddCircleOutline } from '@mui/icons-material';
import useFetch from '../../../../Utils/CustomHooks/use_fetch';
import CustomTitle from '../../../../Utils/Components/custom_title';
import { timeSince } from '../../../../Utils/Functions/convert_dates';


const SensorsListDataGrid = () => {

    const navigate = useNavigate()

    let columns: GridColDef[] = [];  
    let rows: any[] = []
    
    const {data,loading,error} = useFetch('/sensor')

    let sensorsList: Sensor[] | null = null

    if(data){
        sensorsList = data.results as Sensor[]

        // Converting unix-time to timeSince formate:
        sensorsList.forEach((sensor: Sensor) => {
            sensor.last_online = (sensor.last_online !== 'NaN seconds' )? timeSince(sensor.last_online) : ''
        })

        // Setting column header cells of the datagrid (table)
        columns = [
            { field: 'id', headerName: 'DEVICE ID', flex: 2 },
            {
                field: 'lastOnline',
                headerName: 'LAST ONLINE',
                flex: 1,
                editable: false,
            },
            {
                field: 'lastTemp',
                headerName: 'LAST TEMP',
                flex: 1,
                editable: false,
            },
            {
                field: 'location',
                headerName: 'LOCATION',
                flex: 1,
                editable: false,
            },
            {
                field: 'customer',
                headerName: 'CUSTOMER',
                flex: 1,
                editable: false,
            },
            {
                field: 'optionsButton',
                headerName: '',
                sortable: false,
                flex: 1,
                renderCell: (param) => {
                    // getting the required sensor from the list to pass to Edit Sensor Screen
                    let sensor: Sensor | undefined = sensorsList!.find((sensor: Sensor) => sensor.device_id === param.row.id)
                    return (
                        <Button variant="outlined" color='secondary' 
                            onClick={()=>{ navigate(`/edit/${param.row.id}`, {state: sensor as Sensor} as NavigateOptions ) }}
                        >
                            Options
                        </Button>
                    )}
            },
            {
                field: 'detailsButton',
                headerName: '',
                sortable: false,
                flex: 1,
                renderCell: (param) => {
                    // button to Add New Sensor:
                    return (
                        <Button variant="contained" onClick={()=>{ navigate(`/device/${param.row.id}`) }}>Details</Button>
                    )}
            },
        ]

        // setting Rows of datagrid with fetched data: 
        rows = sensorsList.map((sensor: Sensor) => {
            return {
                id: sensor.device_id,
                lastOnline: sensor.last_online,
                lastTemp: sensor.last_temp,
                location: sensor.location,
                customer: sensor.customer,
            }
        }) 
    }

    if(error){
        return <div>ERROR!</div>
    }

    if(loading){
        return (
            <Stack spacing={1}>
                <Typography variant='h6'><Skeleton /></Typography>
                <Skeleton variant="rounded" width={'100%'} height={400} />
            </Stack>
        )
    }

    return (
        data && 
        <Card elevation={4} sx={{p: 3, mt: 5, borderRadius:'12px'}}>
            <Stack direction='column'>
                <Stack direction={'row'} sx={{display:'flex', justifyContent:'space-between'}} >
                    <CustomTitle text={'SENSORS LIST'} />

                    <Button variant='contained' sx={{borderRadius:'35px', fontSize:'16px' }} 
                        onClick={() => { navigate('/add-sensor') }} 
                        startIcon={ <AddCircleOutline fontSize='large' />}
                    >
                        Add Sensor
                    </Button>
                </Stack>

                <Box sx={{ height: 400, width: '100%', marginTop: '24px' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        disableSelectionOnClick
                    />
                </Box>
            </Stack>
        </Card>
    )
}

export default SensorsListDataGrid