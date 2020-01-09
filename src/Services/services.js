import axios from 'axios';

const serverUrl="http://172.16.5.195:8888"

export const  getJobs =async () =>{
        let url = serverUrl + "/job-configs"
        return await axios.get(url);
        
}

export  const  getScheduledJobs =async () =>{
        let url = serverUrl + "/scheduled-jobs"
        return await axios.get(url);
}


export const postScheduleJob = jsonData => {
    let url = serverUrl + "/schedule-job"
    let res=axios.post(url,  jsonData );
    console.log("in post service",res);
    return res;
  };

  export  const  stopJob = jsonData =>{
        let url = serverUrl + "/stop"
        return axios.post(url,jsonData);
    }    

