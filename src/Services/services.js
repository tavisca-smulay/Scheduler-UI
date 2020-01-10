
import axios from 'axios';

const serverUrl="http://172.16.5.195:8888"
//const serverUrl="https://my-json-server.typicode.com/tavisca-vmandal/scheduled-jobs"

export const  getJobs =async () =>{
        let url = serverUrl + "/job-configs"
        return await axios.get(url);
}

export const getScheduledJobs =async () =>{
       let url = serverUrl + "/scheduled-jobs"
       // let url = serverUrl + "/scheduleJobs"
        return await axios.get(url);
}


 export const postScheduleJob =async (jsonData) => {
        let url = serverUrl + "/schedule-job"
        return  await axios.post(url,  jsonData );
      
}

export  const  stopScheduledJob = async(jobKey) =>{
        let url = serverUrl + "/stop/"+jobKey
        return await axios.post(url);
}

export  const  startScheduledJob = async(jobKey) =>{
        let url = serverUrl + "/start/"+jobKey
        return await axios.post(url);
} 

export  const  resumeScheduledJob = async(jobKey) =>{
        let url = serverUrl + "/resume/"+jobKey
        return await axios.post(url);
} 


export const deleteScheduledJob=async (jobkey) =>{
        let url = serverUrl + "/delete-scheduled-job/"+jobkey
        console.log("url delete",url);
        return await axios.delete(url);
}


