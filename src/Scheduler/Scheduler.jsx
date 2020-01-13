import React, { Component } from 'react'
import JobList from '../JobList/JobList'
import ScheduledJobList from '../ScheduledJobList/ScheduledJobList'
import Header from '../Header/Header'
import { getJobs, getScheduledJobs } from '../Services/services'

class Scheduler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            scheduledJobs: []
        };
    }

    componentDidMount() {
        this.getAllJobs();
        this.getScheduledJobs();
    }

    getAllJobs = async () => {
        let response = await getJobs();
        let { data } = response;
        this.setState({ jobs: data });
    }

    getScheduledJobs = async () => {
        let response = await getScheduledJobs()
        let { data } = response;
        this.setState({ scheduledJobs: data })
    }


    render() {
        let { scheduledJobs, jobs } = this.state;
        return (
            <>
                <Header />
                <JobList jobsData={jobs}
                    getScheduledJobs={this.getScheduledJobs} />

                <ScheduledJobList scheduledJobsData={scheduledJobs}
                    getScheduledJobs={this.getScheduledJobs}
                />
            </>
        )

    }
}
export default Scheduler;