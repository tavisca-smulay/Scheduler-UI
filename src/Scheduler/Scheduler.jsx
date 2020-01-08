import React, { Component } from 'react'
import JobsTable from '../JobsList/JobsTable'
import ScheduleJobList from '../ScheduleJobList/ScheduleJobList'
import Header from '../Header/Header'
import {getJobs, getScheduledJobs} from '../Services/services'

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


    componentDidMount() {
        
        this.getAllJobs();
        this.getScheduledJobs();
    }

    getAllJobs=()=>{
        getJobs()
        .then(response=>{
            const jobs=response.data;
            this.setState({jobsList:jobs})
        }).catch(error=>
            console.log(error));    
    }

    getScheduledJobs=()=>{
        getScheduledJobs()
        .then(response=>{
            const scheduledJobs=response.data;
            console.log(scheduledJobs);
            this.setState({scheduledJobs:scheduledJobs})
        }).catch(error=>
            console.log(error));
    }


    render() {
        let {scheduledJobs,jobsList}=this.state;

        if (this.state.scheduledJobs.length > 0) {
            return (
                <>
                    <Header />

                    <JobsTable jobsData={jobsList} setScheduledJobsData={this.updateScheduledJobsData} />

                    <ScheduleJobList scheduledJobsData={scheduledJobs} deleteScheduledJobs={this.deleteScheduledJobsData} />
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