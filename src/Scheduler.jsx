import React, { Component } from 'react'
import JobsTable from './JobsList/JobsTable'
import ScheduleJobList from './ScheduleJobList/ScheduleJobList'
import Header from './Header/Header'
class Scheduler extends Component {


    
    render() {
        return (
            <div>
                <Header/>
                <JobsTable />
                <ScheduleJobList />
            </div>

        )
    }

}
export default Scheduler;