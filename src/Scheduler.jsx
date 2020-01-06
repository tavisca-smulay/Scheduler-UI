import React,{Component} from 'react'
import JobsTable from './JobsList/JobsTable'
import ScheduleJobList from './ScheduleJobList/ScheduleJobList'
class Scheduler extends Component{

    render(){
        return(
            <div>
                <JobsTable/>
                <ScheduleJobList/>
            </div>

        )
    }
    
}
export default Scheduler