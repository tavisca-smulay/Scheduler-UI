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
import { postScheduleJob } from '../Services/services'


export default function JobSchedulerForm(props) {

    const { register, handleSubmit } = useForm();

    const [value, setValue] = React.useState();

    const onSubmit = data => {


        let str = value.value;
        props.setCronExpression(str);

        let cronExpression = str.substring(0, str.length - 1);

        let jsondata = {
            jobName: data.jobname,
            country: data.country,
            cronExpression: cronExpression
        }
        console.log("My json data", jsondata)
        scheduleJobRequest(jsondata);

    };

    const scheduleJobRequest = async (jsondata) => {
        let response = await postScheduleJob(jsondata);
        console.log(response);
        if (response.status === 202) {
            props.getScheduledJobs();
        }
    }

    return (
        <form className="schedulerForm" onSubmit={handleSubmit(onSubmit)}>
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

                <Form.Control as="select"  size="sm" name="country" ref={register({required:true})}>
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
                    onChange={(e) => { setValue({ value: e }) }}
                    value={value}
                    showResultText={true}
                //  showResultCron={true}
                />
            </div>


            <div className="text-center">
                <Button className="submitButton" variant="primary" type="submit" onClick={props.hideProps}>
                    Submit
            </Button>
            </div>
        </form>
    );
}