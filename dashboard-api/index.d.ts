export type SensorPayload = {
  last_online: string;
  last_temp: number;
  customer: string;
  location: string;
  min_temp_limit: number;
  max_temp_limit: number;
  monitor_min_temp: boolean;
  monitor_max_temp: boolean;
};

export type Sensor = CompanyProps & {
  device_id: string;
};
