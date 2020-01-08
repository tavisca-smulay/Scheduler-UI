import React,{Component} from 'react'
import axios from 'axios';
debugger
const serverUrl= "https://my-json-server.typicode.com/tavisca-vmandal" 

export const  getJobs = () =>{
        let url = serverUrl + "/demoJobs/jobslist"
        return axios.get(url);
}

export  const  getScheduledJobs = () =>{
        let url = serverUrl + "/demoSchedulerJobs/scheduleJobs"
        return axios.get(url);
}

