export interface NewSensorData {
    customer: string,
    location: string,
    min_temp_limit: number,
    monitor_min_temp: boolean,
    max_temp_limit: number,
    monitor_max_temp: boolean,
}