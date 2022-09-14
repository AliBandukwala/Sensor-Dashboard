import { Stat } from "../../Models/sensor_stat_model";

// take the array of fetched stats and return corrected time string for charts:
export const convertStatDate_ToDateMonth = (stats: Stat[]): Stat[] => {
    let chartsData: Stat[] = []
    for(let stat of stats){
        let date: Date = new Date(parseInt(stat.time)  * 1)
        chartsData.push(
            {
                temp: stat.temp, 
                time:  date.getDate()+'/'+(date.getMonth()+1)
            } as Stat
        )
    }

    return chartsData
} 

// take the array of fetched stats and return corrected time string for charts:
export const convertStatDate_ToDay = (stats: Stat[]): Stat[] => {
    let chartsData: Stat[] = []
    for(let stat of stats){
        let date: Date = new Date(parseInt(stat.time)  * 1)
        chartsData.push(
            {
                temp: stat.temp, 
                time:  date.toLocaleDateString('en-US', {weekday: 'short'})
            } as Stat
        )
    }

    return chartsData
}

// Method to convert date to  'xxx hrs/months' format:
export function timeSince(time: string) {
  let date: Date = new Date(parseInt(time) * 1)
  var seconds = Math.floor((new Date().valueOf() - date.valueOf() ) / 1000);
  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}