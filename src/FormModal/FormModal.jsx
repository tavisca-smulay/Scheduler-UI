import React from "react";
import { Modal } from "react-bootstrap";
import SchedulerForm from "../SchedulerForm/SchedulerForm";
import "./FormModal.css";

function FormModal(props) {

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
        <SchedulerForm
          jobName={props.name}
          getScheduledJobs={props.getScheduledJobs}
          hideModal={props.onHide}
        />
      </Modal.Body>
    </Modal>
  );
}
export default FormModal;
