import React from 'react'
import Table from 'react-bootstrap/Table'
import schedulejobsdata from '../schedulejobsdata'
import Start from '../Assets/start-icon.png';
import Stop from '../Assets/stop-icon.png';
import Delete from '../Assets/delete-icon.png';
import './ScheduleJobList.css'  


function ScheduleJobList(props) {

    const data = schedulejobsdata.scheduleJobs
    console.log("In ScheduleJobList");
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
            {data.map((item) =>{
                return(
                    <tr>
                        <td>{item.jobName}</td>
                        <td>{item.country}</td>
                        <td>{item.scheduleTime}</td>
                        <td>{item.lastScheduledTime}</td>
                        <td>{item.nextScheduleTime}</td>
                        <td><img className="actionIcons" src ={Start} alt = "Not found"/>
                        <img className="actionIcons" src ={Stop} alt = "Not found"/>{' '}{' '}{' '}{' '}
                        <img className="actionIcons" src ={Delete} alt = "Not found"/></td>
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
