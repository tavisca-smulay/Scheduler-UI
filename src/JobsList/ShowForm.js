import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import SchedulerForm from '../JobSchedulerForm/schedulerForm';
import './JobsTable.css';

function ShowForm(props) {

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            scrollable
        >
            <Modal.Header className="modal-header" closeButton>
                <h4>Fill in the required details for scheduling the job</h4>
            </Modal.Header>
            <Modal.Body>
            <SchedulerForm jobName={props.name} setScheduledJobsData={props.setScheduledJobsData} hideProps={props.onHide}
                getScheduledJobs={props.getScheduledJobs} 
            />
            </Modal.Body>
        </Modal>
    );
}
export default ShowForm;