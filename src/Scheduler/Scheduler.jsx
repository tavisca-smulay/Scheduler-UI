
import React, { Component } from 'react'
import JobsTable from '../JobsList/JobsTable'
import ScheduleJobList from '../ScheduleJobList/ScheduleJobList'
import Header from '../Header/Header'
import { getJobs, getScheduledJobs } from '../Services/services'

class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobsList: [],
            scheduledJobs: [],
            cronExpression: ""
        };
        this.updateCronExpression = this.updateCronExpression.bind(this);
    }


    updateCronExpression = data => {
        this.setState({ cronExpression: data })
    }

    componentDidMount() {
        this.getAllJobs();
        this.getScheduledJobs();


    }

    getAllJobs = async () => {
        let res = await getJobs();
        let { data } = res;
        this.setState({ jobsList: data });
    }

    getScheduledJobs = async () => {
        let res = await getScheduledJobs()
        let { data } = res;
        this.setState({ scheduledJobs: data })
    }


    render() {
        let { scheduledJobs, jobsList } = this.state;
        return (
            <>
                <Header />
                <JobsTable jobsData={jobsList}
                    setCronExpression={this.updateCronExpression}
                    getScheduledJobs={this.getScheduledJobs} />

                <ScheduleJobList scheduledJobsData={scheduledJobs}
                    getScheduledJobs={this.getScheduledJobs}
                    cronExpression={this.state.cronExpression} />
            </>
        )

    }
}
export default Scheduler;