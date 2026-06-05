import { Routes, Route } from "react-router-dom"
import JobList from "../components/JobList"
import AddJob from "../components/AddJob"

function AppRouter({ jobs, fetchJobs }) { //the function recieves the props
  return (
    <Routes>
      <Route path="/" element={<JobList jobs={jobs} fetchJobs={fetchJobs} />} /> {/*and the collected props are passed to the JoblistComponent */}
      <Route path="/add" element={<AddJob fetchJobs={fetchJobs} />} />{/*and the collected props are passed to the JAddJob component*/}
    </Routes>
  )
}

export default AppRouter