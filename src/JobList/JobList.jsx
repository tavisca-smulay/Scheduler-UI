import React from 'react';
import { Table, Button, Card } from 'react-bootstrap';
import FormModal from '../FormModal/FormModal';
import './JobList.css';

const tableHeaders = ["JOB NAME", "DESCRIPTION", ""];

function JobList(props) {
    const [modalShow, setModalShow] = React.useState(false);
    const [jobName, setJobName] = React.useState("");
    const jobs = props.jobsData;


    const onScheduleClick = (jobName) => {
        setModalShow(true);
        setJobName(jobName);
    }


    return (
        <div>
            <Card bg="light" className="job-table-card">
                <Table bordered hover>
                    <tbody>
                        <tr>
                            {
                                tableHeaders.map((header, index) => {
                                    return <th className="table-header" key={index}>{header.toUpperCase()}</th>
                                })
                            }
                        </tr>
                        {
                            jobs.map((job, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{job.jobName}</td>
                                        <td>{job.description}</td>
                                        <td><Button className="button" variant="secondary" onClick={() => { onScheduleClick(job.jobName) }}>
                                            Schedule
                                        </Button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <FormModal
                    getScheduledJobs={props.getScheduledJobs}
                    name={jobName}
                    show={modalShow}
                    onHide={() => setModalShow(false)} />
            </Card>
        </div>
    );
}

export default JobList;