import React, { useRef, useEffect } from 'react'
import Table from 'react-bootstrap/Table'
import Start from '../Assets/start-icon.png';
import Stop from '../Assets/stop-icon.png';
import Delete from '../Assets/delete-icon.png';
import Resume from '../Assets/resume-icon.png';
import Refresh from '../Assets/refresh-icon.png';
import './ScheduledJobList.css'
import { Button, ButtonGroup, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { stopJob, deleteJob, startJob, resumeJob } from './actions'


const tableHeaders = ["Job Name", "Country", "Job Schedule Time", "Job Last Fired Time",
    "Job Next Fire Time", "Action", "Status"];

function ScheduledJobList(props) {

    const pauseResumeRef = useRef([]);

    const scheduledJobs = props.scheduledJobsData;

    useEffect(() => {
        pauseResumeRef.current = pauseResumeRef.current.slice(0, scheduledJobs.length);
    }, [scheduledJobs]);

    const switchImage = (job, index) => {

        if (job.status === "PAUSED")
            pauseResumeRef.current[index].setAttribute('src', Resume);

        else
            pauseResumeRef.current[index].setAttribute('src', Stop);
    }

    const requestAction = async (job, props) => {

        if (job.status === "SCHEDULED")
            return await stopJob(job, props);
        else
            return await resumeJob(job, props);

    }
    
    const switchButton = async (job, index, props) => {
        let status = await requestAction(job, props);

        if (status === 200)
            switchImage(job, index);

    }

    if (scheduledJobs.length > 0) {
        return (
            <div>
                <Card bg="light" className="schedule-table-card">
                    <div className="refresh-button-parent">
                        <Button className="refresh-button" variant="outline-dark" onClick={() => props.getScheduledJobs()}><img src={Refresh} alt="Not found" /> Refresh</Button>
                    </div>

                    <Table bordered hover >
                        <thead>
                            <tr>
                                {tableHeaders.map((header, index) => {
                                    return <th key={index}>{header.toUpperCase()}</th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {
                                scheduledJobs.map((job, index) => {
                                    return (
                                        <tr>
                                            <td>{job.jobName}</td>
                                            <td>{job.country}</td>
                                            <td>{job.cronExpression}</td>
                                            <td>{job.lastScheduledTime}</td>
                                            <td>{job.nextScheduledTime}</td>

                                            <td>
                                                <ButtonGroup size="sm">

                                                    <OverlayTrigger
                                                        placement="left"
                                                        overlay={(props) => <Tooltip {...props}>Start</Tooltip>}
                                                    >
                                                        <Button variant="outline-light" onClick={() => startJob(job.jobKey, props)}>
                                                            <img className="actionIcons" src={Start}
                                                                alt="Not found" />
                                                        </Button>
                                                    </OverlayTrigger>

                                                    <OverlayTrigger
                                                        placement="top"
                                                        overlay={<Tooltip>
                                                            {job.status === "SCHEDULED" ? "Stop" : "Resume"}
                                                        </Tooltip>}
                                                    >
                                                        <Button variant="outline-light" onClick={() => switchButton(job, index, props)}>
                                                            <img className="actionIcons" key={index}
                                                                ref={element => pauseResumeRef.current[index] = element} src={job.status === "SCHEDULED" ? Stop : Resume}
                                                                alt="Not found" /></Button>
                                                    </OverlayTrigger>

                                                    <OverlayTrigger
                                                        placement="right"
                                                        overlay={<Tooltip>
                                                            Delete
                                                        </Tooltip>}
                                                    >
                                                        <Button variant="outline-light" onClick={() => deleteJob(job.jobKey, props)} >
                                                            <img className="actionIcons" src={Delete}
                                                                alt="Not found" />
                                                        </Button>
                                                    </OverlayTrigger>
                                                </ButtonGroup>
                                            </td>

                                            <td>{job.status}</td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </Card>
            </div>
        )
    }
    else {
        return (
            <div>
                <Card bg="light" className="schedule-table-card">
                    <div className="refresh-button-parent">
                        <Button className="refresh-button" variant="outline-dark" onClick={() => props.getScheduledJobs()}><img src={Refresh} alt="Not found" /> Refresh</Button>
                    </div>
                    <div>
                        <Table bordered >
                            <thead>
                                <tr>
                                    {tableHeaders.map((header, index) => {
                                        return <th key={index}>{header.toUpperCase()}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colSpan="7">
                                        No Scheduled Jobs Currently
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Card>
            </div>
        )
    }
}

export default ScheduledJobList