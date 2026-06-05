import { useState } from "react"
import axios from "axios"

function AddJob({ fetchJobs }) { /*we collected the fucntion send by app.jsx*/
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    status: "applied",
    notes: ""
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {  /*step 2. this function executes and a post request is made which save the data to db ,along with this function go to line 23 */
    e.preventDefault()
    const token = localStorage.getItem("access")  
    await axios.post(
      "http://127.0.0.1:8000/api/jobs/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`        //we passed the vaariable wich contain the acess token now go  to step 
        }
      }
    )
    fetchJobs()  // ← refresh the list automatically! /* this is the props so here we called the function which is in the app.jsx, so the fucntion(fetchJobs()) in app.jsx  will run again */
                                                        /*why we do like this because even if we have seperate component for post and get  we have displayed the reuturn of each component in ap.jsx */
                                                        /*so soon after we add a job, only the addjob.jsx is executed so the fetchdata in app.jsx is not executed or not get known that a new job is added */
                                                        /* so we explicitly call that fetchJob() along with function we used to submit the form here(handlesubmit),so soon after the form get submited the fetchjob() 
                                                        is also executed again hence it will again make a get request and get new job as well */
    alert("Job added successfully!")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-6" style={{color: '#37352F'}}>
        Add New Application
      </h2>

      <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
        <div className="flex flex-col gap-4">
          
          <div>
            <label className="text-sm font-medium text-gray-500">Job Title</label>
            <input
              name="title"
              placeholder="e.g. Frontend Developer"
              onChange={handleChange}
              className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Company</label>
            <input
              name="company"
              placeholder="e.g. Google"
              onChange={handleChange}
              className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Job Description</label>
            <textarea
              name="description"
              placeholder="Paste job description here..."
              onChange={handleChange}
              rows={5}
              className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 resize-none"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Status</label>
            <select
              name="status"
              onChange={handleChange}
              className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400"
            >
              <option value="applied">Applied</option>
              <option value="interview">Interview</option>
              <option value="offer">Offer</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">Notes</label>
            <textarea
              name="notes"
              placeholder="Any personal notes..."
              onChange={handleChange}
              rows={3}
              className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 resize-none"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition mt-2"
          >
            Add Application
          </button>

        </div>
      </div>
    </div>
  )
}

export default AddJob



// ****************************************


// import { useState } from "react"
// import axios from "axios"

// /*
// AddJob component

// Purpose:
// Collect user input and create a new job.
// */

// function AddJob({ fetchJobs }) {

//   /*
//   formData state stores all form fields.

//   Each input updates its matching key.
//   */
//   const [formData, setFormData] = useState({
//     title: "",
//     company: "",
//     description: "",
//     status: "applied",
//     notes: ""
//   })

//   /*
//   Runs whenever user types/selects.

//   e.target.name  → field name
//   e.target.value → user input

//   Spread (...) keeps old values
//   and updates only the changed field.
//   */
//   function handleChange(e) {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     })
//   }

//   /*
//   Runs when user clicks "Add Job".

//   Flow:

//   1. Prevent page reload.
//   2. POST formData to backend.
//   3. Call fetchJobs() from App.jsx
//      to refresh job list.
//   4. Show success message.
//   */
//   async function handleSubmit(e) {

//     e.preventDefault()

//     await axios.post(
//       "http://127.0.0.1:8000/api/jobs/",
//       formData
//     )

//     /*
//     fetchJobs comes from App.jsx (props).

//     Why call it?

//     Adding a job only changes backend DB.

//     App.jsx does NOT automatically know
//     new data was added.

//     So we manually trigger fetchJobs()
//     to make another GET request and
//     update the jobs list.
//     */
//     fetchJobs()

//     alert("Job added successfully!")
//   }

//   return (
//     <div>

//       <h2>Add New Job</h2>

//       <input
//         name="title"
//         placeholder="Job Title"
//         onChange={handleChange}
//       />

//       <input
//         name="company"
//         placeholder="Company"
//         onChange={handleChange}
//       />

//       <textarea
//         name="description"
//         placeholder="Job Description"
//         onChange={handleChange}
//       />

//       <select
//         name="status"
//         onChange={handleChange}
//       >
//         <option value="applied">Applied</option>
//         <option value="interview">Interview</option>
//         <option value="offer">Offer</option>
//         <option value="rejected">Rejected</option>
//       </select>

//       <textarea
//         name="notes"
//         placeholder="Notes"
//         onChange={handleChange}
//       />

//       {/*
//       Click button → handleSubmit runs
//       → POST request → refresh list
//       */}
//       <button onClick={handleSubmit}>
//         Add Job
//       </button>

//     </div>
//   )
// }

// export default AddJob