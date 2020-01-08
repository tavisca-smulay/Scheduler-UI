import axios from 'axios';

const serverUrl= "https://my-json-server.typicode.com/tavisca-vmandal" 

export const  getJobs = () =>{
        let url = serverUrl + "/demoJobs/jobslist"
        return axios.get(url);
}

export const getScheduledJobs = () =>{
        let url = serverUrl + "/demoSchedulerJobs/scheduleJobs"
        return axios.get(url);
}


export const postScheduleJob = (jsondata) =>{
    return axios.post("http://172.16.5.195:8888/schedule-job", {
        data: jsondata
    })
}

// export const deleteScheduleJob = () =>{
//     return axios.delete()
// }





