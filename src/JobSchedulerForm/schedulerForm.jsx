import React from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './schedulerForm.css';

export default function JobSchedulerForm(props){
    
    const {register,handleSubmit}=useForm();
    const onSubmit = data => {
        alert(JSON.stringify(data));
    };    
    return(
        <form className="schedulerForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Job Name</Form.Label>
                <Col sm={4}>{props.jobName}</Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Country</Form.Label>
                <Col sm={4}>
                <Form.Control as="select"  size="sm" name="country" ref={register({required:true})}>
                    <option selected hidden>Select</option>
                    <option value="UK">UK</option>
                    <option value="India">India</option>
                </Form.Control>
                </Col>
            </Form.Group>
            
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Schedule Time</Form.Label>
                <Col sm={4}><Form.Control type="datetime-local" name="scheduleTime" ref={register({required:true})} size="sm"></Form.Control></Col>
            </Form.Group>
            <div class="text-left">
            <Button className="submitButton" variant="primary" type="submit">
                Submit
            </Button>
            </div>
        </form>

    ); 
}