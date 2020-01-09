import React from 'react'
import Table from 'react-bootstrap/Table'
import Start from '../Assets/start-icon.png';
import Stop from '../Assets/stop-icon.png';
import Delete from '../Assets/delete-icon.png';
import './ScheduleJobList.css'
import {deleteScheduledJob} from  '../Services/services'


const headers = ["Job Name", "Country", "Job Schedule Time", "Job Last Fired Time",
    "Job Next Fired Time", "Action", "Status"];

function ScheduleJobList(props) {

    const [status, setStatus] = React.useState("Scheduled");

    const data = props.scheduledJobsData;
    
    const startJob = (index) => {
        setStatus("Running")
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
                            
                                <td><img className="actionIcons" src={Start} 
                                        onClick={() => startJob(index)} alt="Not found" />
                                    <img className="actionIcons" src={Stop} alt="Not found" />{' '}{' '}{' '}{' '}
                                    <img className="actionIcons" src={Delete} 
                                        onClick={() => deleteJob(index,item)} alt="Not found" /></td>
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
