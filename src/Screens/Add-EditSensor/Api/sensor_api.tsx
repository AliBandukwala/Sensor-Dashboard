import axios from "axios";
import { BASE_URL } from "../../../Assets/consts";
import { NewSensorData } from "../../../Models/new_sensor_data_model";

export const addNewSensor = async (newSensorData: NewSensorData): Promise<boolean> => {
    try{
        if(newSensorData.location !== '' ||  newSensorData.customer !== ''){
            let res = await axios({
                method: 'post',
                url: BASE_URL + '/sensor',
                data: newSensorData,
            })
            if(res.status === 201) return true
            else return false
        }
        else return false
    }
    catch(e){
        console.log(e)
        return false
    }
}

export const updateSensor = async (id: string, sensorData: NewSensorData): Promise<boolean> => {
    try{
        if(sensorData.location !== '' ||  sensorData.customer !== ''){
            let res = await axios({
                method: 'put',
                url: BASE_URL + `/sensor/${id}`,
                data: sensorData,
            })
            if(res.status === 200) return true
            else return false
        }
        else return false
    }
    catch(e){
        console.log(e)
        return false
    }
}

export const deleteSensor = async (id: string): Promise<boolean> => {
    try{
        let res = await axios({
            method: 'delete',
            url: BASE_URL + `/sensor/${id}`,
        })
        if(res.status === 204) return true
        else return false
    }
    catch(e){
        console.log(e)
        return false
    }
}