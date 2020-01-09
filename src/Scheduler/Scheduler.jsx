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
        this.deleteScheduledJobsData = this.deleteScheduledJobsData.bind(this);
        this.stopScheduledJobsData = this.stopScheduledJobsData.bind(this);
    }

    updateScheduledJobsData = data => {

        var myArray = this.state.scheduledJobs.slice();
        myArray.push(data);
        this.setState({ scheduledJobs: myArray });

    }

    deleteScheduledJobsData = (index) => {
        const data = this.state.scheduledJobs;
        this.setState({
            scheduledJobs: [...data.slice(0, index), ...data.slice(index + 1)]
        });
    }

    stopScheduledJobsData = (index) => {
        let jsonData = {
            jobName: this.state.scheduledJobs[index].jobName,
            country: this.state.scheduledJobs[index].country,
            cronExpression: this.state.scheduledJobs[index].cronExpression
        }

        stopJob(jsonData)
            .then(response => {
                let jobArray = this.state.scheduledJobs;
                jobArray[index].status = response.data;
                    this.setState({
                        scheduledJobs: jobArray
           });
            })
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
        // console.log("In Scheduler",this.state.scheduledJobs)
    }


    render() {
        let { scheduledJobs, jobsList } = this.state;

        if (this.state.scheduledJobs.length > 0) {
            return (
                <>
                    <Header />
                    <JobsTable jobsData={jobsList} setScheduledJobsData={this.updateScheduledJobsData} />
                    <ScheduleJobList scheduledJobsData={scheduledJobs} deleteScheduledJobs={this.deleteScheduledJobsData} stopScheduledJobs={this.stopScheduledJobsData} />
                </>
            )
        }
        return (
            <>
                <Header />
                <JobsTable jobsData={this.state.jobsList} setScheduledJobsData={this.updateScheduledJobsData} />

            </>
        )
    }
}
export default Scheduler;