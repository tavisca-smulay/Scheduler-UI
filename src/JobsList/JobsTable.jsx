import React from 'react';
import { Table, Button } from 'react-bootstrap';
import jobsData from '../jobsdata';
import ShowForm from './ShowForm';
import './JobsTable.css';

const Jobs = jobsData.jobslist;
const headers = ["JOBNAME", "DESCRIPTION", ""];

function JobsTable() {
    const [modalShow, setModalShow] = React.useState(false);
    const [jobName, setJobName] = React.useState("");

    return (
        <div className="table">
            <Table bordered responsive>
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
                                <tr key={job.id}>
                                    <td>{job.name}</td>
                                    <td>{job.description}</td>
                                    <td><Button className="button" onClick={() => { setModalShow(true); setJobName(job.name); }}>Schedule</Button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <ShowForm name={jobName}
                show={modalShow}
                onHide={() => setModalShow(false)} />
        </div>
    );
}

export default JobsTable;