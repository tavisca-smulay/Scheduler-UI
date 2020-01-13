import { stopScheduledJob, resumeScheduledJob, deleteScheduledJob, startScheduledJob } from '../Services/services'


export const resumeJob = async (job, props) => {
    let response = await resumeScheduledJob(job.jobKey);
    let { status } = response;
    if (status === 200)
        props.getScheduledJobs();
}

export const stopJob = async (job, props) => {
    let response = await stopScheduledJob(job.jobKey);
    let { status } = response;
    if (status === 200)
        props.getScheduledJobs();

    return response.status;
}


export const startJob = async (job, props) => {
    let response = await startScheduledJob(job.jobKey);
    let { status } = response;
    if (status === 200)
        props.getScheduledJobs();

    return response.status;
}

export const deleteJob = async (jobKey, props) => {
    let response = await deleteScheduledJob(jobKey);
    let { status } = response;
    if (status === 200)
        props.getScheduledJobs();
}

    // const switchButton = (job, index) => {
    //     requestAction(job);
    //     switchImage(job, index);
    // }

