import { createContext, useContext, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { NewSensorData } from "../../../Models/new_sensor_data_model";
import { Sensor } from "../../../Models/sensor_model";

type CountProviderProps = {children: React.ReactNode}
type AddNewSensorDataProvideValue = { newSensorData: NewSensorData, setNewSensorData: Function, isEdit: boolean, }

export const initalContextState = {
    newSensorData: {
        customer: '', 
        location: '', 
        min_temp_limit: 0, 
        max_temp_limit: 0, 
        monitor_max_temp: true, 
        monitor_min_temp: true
    },
    setNewSensorData: () => {},
    isEdit: false
} as AddNewSensorDataProvideValue

/* Context for Sensor data: */
export const AddSensorDataContext = createContext<AddNewSensorDataProvideValue>(initalContextState);

/* Provider for Sensor data: */
const AddSensorDataProvider = ({ children }: CountProviderProps) => {

  const { state } = useLocation() // getting params (sensor) passed to routes, can be null if Add New Sensor

  const sensor: Sensor | null = state as Sensor
  let isEdit: boolean = (sensor !== null) // if sensor is not null, means passed thriugh route and is for Editing
  let sensorState: NewSensorData =  isEdit ? 
    {
      customer: sensor.customer, 
      location: sensor.location, 
      min_temp_limit: sensor.last_temp, 
      max_temp_limit: 0, 
      monitor_max_temp: true, 
      monitor_min_temp: true
    } as NewSensorData
    : initalContextState.newSensorData
  
  const [newSensorData, setNewSensorData] = useState<NewSensorData>(sensorState);

  // not much calculations but usually a good practice to cache this obj
  const value: AddNewSensorDataProvideValue = useMemo( 
    () => ({newSensorData, setNewSensorData, isEdit} as AddNewSensorDataProvideValue), 
    [newSensorData, setNewSensorData, isEdit]
  )

  return (
    <AddSensorDataContext.Provider value={ value }>
      {children}
    </AddSensorDataContext.Provider>
  );
};

export default AddSensorDataProvider

/* main hook to manage New Sensor Data state in components */
export function useAddNewSensorDataContext() {
    const context = useContext(AddSensorDataContext)
    if (context === undefined) {
        throw new Error('useAddNewSensorDataContext must be used within a AddSensorDataProvider')
    }
    return context
}