import React, { Component } from 'react'
import JobsTable from '../JobsList/JobsTable'
import ScheduleJobList from '../ScheduleJobList/ScheduleJobList'
import Header from '../Header/Header'
import { getJobs, getScheduledJobs, stopJob } from '../Services/services'


class Scheduler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobsList: [],
            scheduledJobs: [],
        };
        this.updateScheduledJobsData = this.updateScheduledJobsData.bind(this);
          
    }

    updateScheduledJobsData = data => {

        var myArray = this.state.scheduledJobs.slice();
        myArray.push(data);
        this.setState({ scheduledJobs: myArray });

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

        if (this.state.scheduledJobs.length > 0) {
            return (
                <>
                    <Header />
                    <JobsTable jobsData={jobsList} setScheduledJobsData={this.updateScheduledJobsData} 
                        getScheduledJobs={this.getScheduledJobs} />
                    <ScheduleJobList scheduledJobsData={scheduledJobs}
                         stopScheduledJobs={this.stopScheduledJobsData}
                         getScheduledJobs={this.getScheduledJobs} />
                </>
            )
        }
        return (
            <>
                <Header />
                <JobsTable jobsData={this.state.jobsList} setScheduledJobsData={this.updateScheduledJobsData}
                getScheduledJobs={this.getScheduledJobs}  />

            </>
        )
    }
}
export default Scheduler;