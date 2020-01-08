import axios from 'axios';

const serverUrl= "https://my-json-server.typicode.com/tavisca-vmandal" 

export const  getJobs =async () =>{
        let url = serverUrl + "/demoJobs/jobslist"
        return await axios.get(url);
        
}

export  const  getScheduledJobs =async () =>{
        let url = serverUrl + "/demoSchedulerJobs/scheduleJobs"
        return await axios.get(url);
}

