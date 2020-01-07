import React from 'react'
import Table from 'react-bootstrap/Table'
import schedulejobsdata from '../schedulejobsdata'
import Start from '../Assets/start-icon.png';
import Stop from '../Assets/stop-icon.png';
import Delete from '../Assets/delete-icon.png';
import './ScheduleJobList.css'  


function ScheduleJobList(props) {




    const [status,setStatus] = React.useState("Scheduled");
 
    const data = props.scheduledJobsData;
    console.log("data passed",data);
    
 
    const startJob = (index) =>{
        //alert(index);
        setStatus("Running")
    }
 
    const deleteJob = (index) =>{
        props.deleteScheduledJobs(index);
    }


    
    return (
        <div className = "scheduletable">
            
        <Table bordered hover >
    
            <thead>
            <tr>
                <th>Job Name</th>
                <th>Country</th>
                <th>Job Schedule Time</th>
                <th>Job Last Fired Time</th>
                <th>Job Next Fired Time</th>
                <th>Action</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item,index) =>{
                return(
                    <tr>
                        <td>{item.jobname}</td>
                        <td>{item.country}</td>
                        <td>{item.scheduleTime}</td>
                        <td></td>
                        <td></td>
                        <td><img className="actionIcons" src ={Start} onClick={()=>startJob(index)} alt = "Not found"/>
                        <img className="actionIcons" src ={Stop} alt = "Not found"/>{' '}{' '}{' '}{' '}
                        <img className="actionIcons" src ={Delete} onClick={()=>deleteJob(index)} alt = "Not found"/></td>
                        <td>{status}</td>
                    </tr>
                );
             })}
            </tbody>
        </Table>
        </div>
    )
}

export default ScheduleJobList
