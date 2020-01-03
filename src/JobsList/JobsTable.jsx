import React from 'react';
import { Table, Button } from 'react-bootstrap';
import jobsdata from '../../src/jobsdata';
import './JobsTable.css';
import ShowForm from './ShowForm'
const Jobs = jobsdata.jobslist;
const headers = ["JOBNAME", "DESCRIPTION", ""];



function JobsTable() {
    const [modalShow, setModalShow] = React.useState(false);
    return (
        <div className="table">
            <Table bordered responsive>
                <thead>
                    <tr>
                        {headers.map((header, index) => {
                            return <th className="header" key={index}>{header.toUpperCase()}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {Jobs.map((job, index) => {
                        return (
                            <div>
                                <tr key={job.id}>
                                    <td>{job.name}</td>
                                    <td>{job.description}</td>
                                    <td><Button variant="primary" onClick={() => setModalShow(true)}>Schedule</Button></td>
                                </tr>
                                <ShowForm name={job.name}
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    );
}

export default JobsTable;