import React, { useState, useRef,useEffect }  from 'react'
import Table from 'react-bootstrap/Table'
import Start from '../Assets/start-icon.png';
import Stop from '../Assets/stop-icon.png';
import Delete from '../Assets/delete-icon.png';
import Resume from '../Assets/resume-icon.png';
import './ScheduleJobList.css'
import { Button , ButtonGroup} from 'react-bootstrap';
import {deleteScheduledJob, startJob} from  '../Services/services'

const headers = ["Job Name", "Country", "Job Schedule Time", "Job Last Fired Time",
    "Job Next Fired Time", "Action", "Status"];

function ScheduleJobList(props) {

  
    const itemsRef=useRef([]);
    const data = props.scheduledJobsData;

    useEffect((index) => {
        itemsRef.current = itemsRef.current.slice(0, data.length); 
    }, [data]);

    const switchImage=(index,item)=>{
     
        console.log(itemsRef.current[index]);
        
        if(item.status==="Stopped")
            itemsRef.current[index].setAttribute('src',Resume);
        else
            itemsRef.current[index].setAttribute('src',Stop);
    }
    
    const requestAction=()=>{

    }

    const stopJob = (index) => {
        props.stopScheduledJobs(index);
    }

    const deleteJob = (index,scheduledJob) => {

        let jsondata = {
            jobName:scheduledJob.jobName,
            country:scheduledJob.country,
            cronExpression:scheduledJob.cronExpression
        }
    
        deleteJobRequest(index,jsondata);
    }

   const deleteJobRequest=async (index,jsondata)=>{
        let response=await deleteScheduledJob(jsondata);
        let {status}=response;
        console.log("deleted status res",status);
        if(status===200)
            props.deleteScheduledJobs(index);
    }

  
    return (
        <div className="scheduletable">

            <Table bordered hover >

                <thead>
                    <tr>
                        {headers.map((header, index) => {
                            return <th key={index}>{header.toUpperCase()}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
               
                    {data.map((item, index) => {
                        return (  
                            <tr>
                                <td>{item.jobName}</td>
                                <td>{item.country}</td>
                                <td>{item.cronExpression}</td>
                                <td>{item.lastScheduledTime}</td>
                                <td>{item.nextScheduledTime}</td>
                                <td>
                                    <ButtonGroup size="sm">
                                        <Button variant="outline-dark"><img className="actionIcons" src={Start} 
                                            alt="Not found"/>
                                        </Button>
                                    
                                       <Button variant="outline-dark" onClick={()=>{requestAction(); switchImage(index,item)}}>
                                    
                                           <img className="actionIcons" key={index}
                                           ref={el => itemsRef.current[index] = el} src={item.status==="Scheduled"?Stop:Resume}
                                            alt="Not found" /></Button>
                                        
                                        <Button variant="outline-dark" >  
                                            <img className="actionIcons" src={Delete} 
                                            onClick={() => deleteJob(index,item)} alt="Not found" />
                                        </Button>
                                    </ButtonGroup>
                                    
                                </td>
                                <td>{item.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default ScheduleJobList
