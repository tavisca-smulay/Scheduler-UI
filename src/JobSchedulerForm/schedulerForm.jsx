import React from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './schedulerForm.scss';
import Cron from 'react-cron-generator'
import 'react-cron-generator/dist/cron-builder.css'

export default function JobSchedulerForm(props) {

    const { register, handleSubmit } = useForm();

    // const [value, setValue] = React.useState();

   
    const onSubmit = data => {
        console.log("in scheduler form",data);
        props.setScheduledJobsData(data);
        // console.log(value);
        console.log("in scheduler form",data);
    };    

    return(
        <form className="schedulerForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row}>
                <Form.Label column sm={2}>Job Name</Form.Label>
                <Col sm={4}>
                    <Form.Control name = "jobname" ref={register({required:true})} value={props.jobName} readOnly>
                    </Form.Control>
                </Col>
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
            </Form.Group>

            <div className="cron_builder">
                <Cron
                    onChange={(e) => { setValue({ value: e })}}
                    value={value}
                    showResultText={true}
                // showResultCron={true}
                />
            </div>


            <div className="text-center">
                <Button className="submitButton" variant="primary" type="submit">
                    Submit
            </Button>
           </div>
        </form>
    );
}