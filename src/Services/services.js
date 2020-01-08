import React,{Component} from 'react'
import axios from 'axios';

class SchedulerService{

    static getJobs(){
        return axios.get("https://my-json-server.typicode.com/tavisca-vmandal/demoJobs/jobslist");
    }

}
export default SchedulerService