import React, { Component } from 'react'
import JobsTable from './JobsList/JobsTable'
import ScheduleJobList from './ScheduleJobList/ScheduleJobList'
import Header from './Header/Header'
import axios from 'axios';

class Scheduler extends Component {

    constructor(props) {
        super(props);
        this.state = {
            jobsList: [],
            scheduledJobs: []
        };
        this.updateScheduledJobsData = this.updateScheduledJobsData.bind(this);
        this.deleteScheduledJobsData = this.deleteScheduledJobsData.bind(this);
    }


    updateScheduledJobsData = data => {
        console.log("Inside update function", data);

        var myArray = this.state.scheduledJobs.slice();
        myArray.push(data);
        console.log("my array", myArray);
        this.setState({ scheduledJobs: myArray });
        console.log("State data", this.state.scheduledJobs);
    }

    deleteScheduledJobsData = (index) => {
        const data = this.state.scheduledJobs;
        this.setState({
            scheduledJobs: [...data.slice(0, index), ...data.slice(index + 1)]
        });
    }


    componentDidMount() {
        axios.get(`https://my-json-server.typicode.com/tavisca-vmandal/demoJobs/jobslist`)
            .then(res => {
                const jobs = res.data;
                this.setState({ jobsList: jobs });
            })
    }

    render() {
        let {scheduledJobs,jobsList}=this.state;

        if (this.state.scheduledJobs.length > 0) {
            return (
                <div>
                    <Header />

                    <JobsTable jobsData={jobsList} setScheduledJobsData={this.updateScheduledJobsData} />

                    <ScheduleJobList scheduledJobsData={scheduledJobs} deleteScheduledJobs={this.deleteScheduledJobsData} />
                </div>
            )
        }

        return (
            <div>
                <Header />
                <JobsTable jobsData={this.state.jobsList} setScheduledJobsData={this.updateScheduledJobsData} />

            </div>

        )
    }

}
export default Scheduler;