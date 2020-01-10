import React, { Component } from 'react'
import JobsTable from '../JobsList/JobsTable'
import ScheduleJobList from '../ScheduleJobList/ScheduleJobList'
import Header from '../Header/Header'
import { getJobs, getScheduledJobs, stopJob, startJob} from '../Services/services'

class Scheduler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobsList: [],
            scheduledJobs: [],
            cronExpression : ""
        };
        this.startScheduledJob = this.startScheduledJob.bind(this);
        this.stopScheduledJobsData = this.stopScheduledJobsData.bind(this);
        this.updateCronExpression = this.updateCronExpression.bind(this);
    }


    updateCronExpression = data =>{
        console.log("Inside update");
        this.setState({cronExpression: data})
    }

    startScheduledJob = (index) => {
        let jsonData = {
            jobName: this.state.scheduledJobs[index].jobName,
            country: this.state.scheduledJobs[index].country,
            cronExpression: this.state.scheduledJobs[index].cronExpression
        }
        console.log("Start JSonData ",jsonData);

        startJob(jsonData)
        .then(response => {
            let jobArray = this.state.scheduledJobs;
            console.log(response.data);
            jobArray[index].status = response.data;
            this.setState({
                scheduledJobs: jobArray
            });
        })
       }

    stopScheduledJobsData = (index) => {
        let jsonData = {
            jobName: this.state.scheduledJobs[index].jobName,
            country: this.state.scheduledJobs[index].country,
            cronExpression: this.state.scheduledJobs[index].cronExpression
        }
        console.log("Stop Json",jsonData)
        stopJob(jsonData)
        .then(response => {
        let jobArray = this.state.scheduledJobs;
        console.log(response.data);
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
        console.log(data);
        this.setState({ scheduledJobs: data })
    }


    render() {
        let { scheduledJobs, jobsList } = this.state;
        return (
            <>
            <Header />
            <JobsTable jobsData={jobsList} 
            setCronExpression={this.updateCronExpression} 
            getScheduledJobs={this.getScheduledJobs}/>

            <ScheduleJobList scheduledJobsData={scheduledJobs} 
            getScheduledJobs={this.getScheduledJobs}
            stopScheduledJobs={this.stopScheduledJobsData}
            startScheduledJob = {this.startScheduledJob}
            cronExpression = {this.state.cronExpression} />
            </>
        )

    }
}
export default Scheduler;