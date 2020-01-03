import React from 'react';
import { Modal } from 'react-bootstrap';
import SchedulerForm from '../JobSchedulerForm/schedulerForm';

function ShowForm(props) {
    
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <h4>Fill in the required details for scheduling the job</h4>
            </Modal.Header>
            <Modal.Body>
                <SchedulerForm jobName = {props.name}/>
            </Modal.Body>
        </Modal>
    );
}
export default ShowForm