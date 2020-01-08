import React from 'react';
import { Table, Button } from 'react-bootstrap';
import ShowForm from './ShowForm';
import './JobsTable.css';

const headers = ["JOB NAME", "DESCRIPTION", ""];

function JobsTable(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [jobName, setJobName] = React.useState("");

    const Jobs = props.jobsData;
    return (
        <div className="table">
            
            <Table  bordered hover>
                <tbody>
                    <tr>
                        {
                            headers.map((header, index) => {
                                return <th className="header" key={index}>{header.toUpperCase()}</th>
                            })
                        }
                    </tr>
                    {
                        Jobs.map((job, index) => {
                            return (
                                <tr key={index}>
                                    <td>{job.name}</td>
                                    <td>{job.description}</td>
                                    <td><Button className="button" onClick={() => { setModalShow(true); setJobName(job.name);}}>Schedule</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <ShowForm 
                setScheduledJobsData = {props.setScheduledJobsData}
                name={jobName}
                show={modalShow}
                onHide={() => setModalShow(false)} />
        </div>
    );
}

export default JobsTable;