import React from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import './schedulerForm.css';
import Cron from 'react-cron-generator'
import 'react-cron-generator/dist/cron-builder.css'

export default function JobSchedulerForm(props) {

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        alert(JSON.stringify(data));
    };

    const [value, setValue] = React.useState();

    return (
        <form className="schedulerForm" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row}>
                <Col sm={2}>
                    <Form.Label><b>Job Name</b></Form.Label>
                </Col>
                <Col sm={4}>{props.jobName}</Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Col sm={2}>
                    <Form.Label><b>Country</b></Form.Label>
                </Col>
                <Col sm={4}>
                    <Form.Control as="select" size="sm" name="country" ref={register({ required: true })}>
                        <option selected hidden>Select</option>
                        <option value="UK">UK</option>
                        <option value="India">India</option>
                    </Form.Control>
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Col sm={4}>
                    <Form.Label><b>Schedule Time</b></Form.Label>
                </Col>
                </Form.Group>

            <Form.Group as={Row}>
            </Form.Group>

            <div className="cron-builder">
            <Cron
                        onChange={(e) => { setValue({ value: e }); console.log(e) }}
                        value={value}
                        showResultText={true}
                        showResultCron={true}
                    />
            </div>

            <div class="text-left">
                <Button className="submitButton" variant="primary" type="submit">
                    Submit
            </Button>
            </div>
        </form>

    );
}