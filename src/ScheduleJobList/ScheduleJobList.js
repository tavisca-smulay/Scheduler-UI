import React, { useState, useRef, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Start from '../Assets/start-icon.png';
import Stop from '../Assets/stop-icon.png';
import Delete from '../Assets/delete-icon.png';
import Resume from '../Assets/resume-icon.png';
import './ScheduleJobList.css'

import { Button, ButtonGroup, Card } from 'react-bootstrap';
import { deleteScheduledJob, startJob } from '../Services/services'

const headers = ["Job Name", "Country", "Job Schedule Time", "Job Last Fired Time",
    "Job Next Fire Time", "Action", "Status"];

function ScheduleJobList(props) {


    const itemsRef = useRef([]);

    const data = props.scheduledJobsData;

    useEffect((index) => {
        itemsRef.current = itemsRef.current.slice(0, data.length);
    }, [data]);

    const switchImage = (index, item) => {

        console.log(itemsRef.current[index]);

        if (item.status === "Stopped")
            itemsRef.current[index].setAttribute('src', Resume);
        else
            itemsRef.current[index].setAttribute('src', Stop);
    }


    const startJob = (index) => {
        props.startScheduledJob(index);
    }

    const requestAction = () => {


    }
    const stopJob = (index) => {
        props.stopScheduledJobs(index)
    }


    const deleteJob = (jobKey) => {
        console.log(jobKey);
        deleteJobRequest(jobKey);

    }

    const deleteJobRequest = async (jobKey) => {
        let response = await deleteScheduledJob(jobKey);
        let { status } = response;
        console.log("deleted status res", status);
        if (status === 200)
            props.getScheduledJobs();
    }

    if (data.length > 0) {
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

                        {
                            data.map((item, index) => {
                                return (

                                    <tr>
                                        <td>{item.jobName}</td>
                                        <td>{item.country}</td>
                                        <td>{item.cronExpression}</td>
                                        <td>{item.lastScheduledTime}</td>
                                        <td>{item.nextScheduledTime}</td>

                                        <td>
                                            <ButtonGroup size="sm">
                                                <Button variant="outline-dark"><img className="actionIcons" src={Start} onClick={() => startJob(index)}
                                                    alt="Not found" />
                                                </Button>

                                                <Button variant="outline-dark" onClick={() => { requestAction(); switchImage(index, item) }}>

                                                    <img className="actionIcons" key={index}
                                                        ref={el => itemsRef.current[index] = el} src={item.status === "Scheduled" ? Stop : Resume}
                                                        alt="Not found" /></Button>

                                                <Button variant="outline-dark" >
                                                    <img className="actionIcons" src={Delete}
                                                        onClick={() => deleteJob(item.jobKey)} alt="Not found" />
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
    else {
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
                        <tr>
                            <td colSpan="7">
                                <Card bg="light" border="info" className="card">
                                    <Card.Body>
                                        <Card.Text>
                                            No Scheduled Jobs Currently
                                            </Card.Text>
                                    </Card.Body>
                                </Card>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }

}

export default ScheduleJobList