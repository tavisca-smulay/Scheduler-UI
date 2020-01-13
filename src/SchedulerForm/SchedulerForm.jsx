import React from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Row, Col, Button } from 'react-bootstrap';
import './SchedulerForm.scss';
import Cron from 'react-cron-generator'
import 'react-cron-generator/dist/cron-builder.css'
import { scheduleJob } from '../Services/services'


export default function SchedulerForm(props) {

    const { register, handleSubmit } = useForm();

    const [cronValue, setCronValue] = React.useState();

    const onSubmit = data => {

        let cronExpression = cronValue.cronValue;

        let formattedCronExpression = cronExpression.substring(0, cronExpression.length - 1);

        let jsondata = {
            jobName: data.jobname,
            country: data.country,
            cronExpression: formattedCronExpression
        }
        scheduleJobRequest(jsondata);
    }

    const scheduleJobRequest = async (jsondata) => {
        let response = await scheduleJob(jsondata);
        if (response.status === 202) {
            props.getScheduledJobs();
        }
    }

    return (
        <form className="scheduler-form" onSubmit={handleSubmit(onSubmit)}>
            <Form.Group as={Row}>
                <Form.Label column sm={2}><b>Job Name</b></Form.Label>
                <Col sm={4}>
                    <Form.Control name="jobname" ref={register({ required: true })} value={props.jobName} readOnly>
                    </Form.Control>
                </Col>
                <Col sm={2}>
                    <Form.Label column sm={2}><b>Country</b></Form.Label>
                </Col>
                <Col sm={4}>

                    <Form.Control as="select" size="sm" name="country" ref={register({ required: true })}>
                        <option value="UK">UK</option>
                        <option value="US">US</option>
                        <option value="India">India</option>
                    </Form.Control>

                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column sm={8}><b>Schedule Time</b></Form.Label>
            </Form.Group>

            <div className="cron_builder">
                <Cron
                    onChange={(e) => { setCronValue({ cronValue: e }) }}
                    value={cronValue}
                    showResultText={true}
                />
            </div>


            <div className="text-center">
                <Button className="submit-button" variant="secondary" type="submit" onClick={props.hideModal}>
                    Submit
            </Button>
            </div>
        </form>
    );
}
