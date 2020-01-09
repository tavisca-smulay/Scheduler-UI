
import axios from 'axios';

const serverUrl="http://172.16.5.195:8888"

export const  getJobs =async () =>{
        let url = serverUrl + "/job-configs"
        return await axios.get(url);
}

export const getScheduledJobs =async () =>{
        let url = serverUrl + "/scheduled-jobs"
        return await axios.get(url);
}


export const postScheduleJob =async (jsonData) => {
        let url = serverUrl + "/schedule-job"
        return await axios.post(url,  jsonData );
  };

  export  const  stopJob = async(jsonData) =>{
        let url = serverUrl + "/stop"
        return await axios.post(url,jsonData);
    }    

export const deleteScheduledJob=async (jsonData) =>{
        let url = serverUrl + "/delete-scheduled-job"
        return await axios.delete(url,  {data:jsonData} );
  }

