import { useState } from "react"
import axios from "axios"

function JobList({ jobs, fetchJobs }) {
  const [showModal, setShowModal] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    status: "applied",
    notes: ""
  })
const [jdText, setJdText] = useState("")
const [resumeText, setResumeText] = useState("")
const [aiResult, setAiResult] = useState(null)
const [analyzing, setAnalyzing] = useState(false)

async function analyzeJob() {
    setAnalyzing(true)
    const token = localStorage.getItem("access")
    const response = await axios.post(
        "http://127.0.0.1:8000/api/analyze/",
        {
            description: jdText,
            resume: resumeText
        },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    setAiResult(response.data)
    setAnalyzing(false)
}

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const token = localStorage.getItem("access")
    await axios.post(
      "http://127.0.0.1:8000/api/jobs/",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    fetchJobs()
    setShowModal(false)
    setFormData({ title: "", company: "", description: "", status: "applied", notes: "" })
  }

  async function deleteJob(id) {
    const token = localStorage.getItem("access")
    await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchJobs()
  }

  async function updateStatus(id, newStatus) {
    const token = localStorage.getItem("access")
    await axios.patch(`http://127.0.0.1:8000/api/jobs/${id}/`, {
      status: newStatus
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    fetchJobs()
  }

  return (
    <div className="flex gap-6">
      
      {/* LEFT - AI Panel (1/3) */}
<div className="w-1/3 bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-fit sticky top-6">
  <h3 className="text-base font-semibold mb-4" style={{color: '#37352F'}}>
    🤖 AI Analysis
  </h3>

  <textarea
    placeholder="Paste job description here..."
    rows={4}
    value={jdText}
    onChange={(e) => setJdText(e.target.value)}
    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400 resize-none"
  />

  <textarea
    placeholder="Paste your resume here..."
    rows={4}
    value={resumeText}
    onChange={(e) => setResumeText(e.target.value)}
    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400 resize-none mt-3"
  />

  <button
    onClick={analyzeJob}
    disabled={analyzing}
    className="mt-3 w-full bg-indigo-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
  >
    {analyzing ? "Analyzing... ⏳" : "Analyze with AI 🚀"}
  </button>

  {/* AI Results */}
  {aiResult && (
    <div className="mt-6 flex flex-col gap-3">

      {/* Job Details */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <p className="text-xs font-medium text-gray-400 mb-2">JOB DETAILS</p>
        <p className="text-sm font-medium" style={{color: '#37352F'}}>{aiResult.job_details.role}</p>
        <p className="text-xs text-gray-400">{aiResult.job_details.experience_required}</p>
        <p className="text-xs text-gray-400">{aiResult.job_details.salary}</p>
      </div>

      {/* Scores */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <p className="text-xs font-medium text-gray-400 mb-2">SCORES</p>
        <div className="flex justify-between mb-1">
          <p className="text-sm text-gray-600">ATS Score</p>
          <p className="text-sm font-semibold text-indigo-600">{aiResult.ats_score}/100</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div
            className="bg-indigo-600 h-2 rounded-full"
            style={{width: `${aiResult.ats_score}%`}}
          />
        </div>
        <div className="flex justify-between mb-1">
          <p className="text-sm text-gray-600">Job Match</p>
          <p className="text-sm font-semibold text-green-600">{aiResult.job_match_score}/100</p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{width: `${aiResult.job_match_score}%`}}
          />
        </div>
        <p className="text-xs text-gray-400 mt-2">{aiResult.match_summary}</p>
      </div>

      {/* Matching Skills */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <p className="text-xs font-medium text-gray-400 mb-2">MATCHING SKILLS ✅</p>
        <div className="flex flex-wrap gap-2">
          {aiResult.skill_analysis.matching_skills.map((skill, i) => (
            <span key={i} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>

     {/* Lacking Skills */}
{/* Lacking Skills */}
<div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
  <p className="text-xs font-medium text-gray-400 mb-2">LACKING SKILLS ❌</p>
  <div className="flex flex-col gap-3">
    {aiResult.skill_analysis.lacking_skills.map((item, i) => (
      <div key={i}>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-red-500">{item.skill}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${
            item.importance === 'High' ? 'bg-red-100 text-red-600' :
            item.importance === 'Medium' ? 'bg-amber-100 text-amber-600' :
            'bg-gray-100 text-gray-600'
          }`}>{item.importance}</span>
        </div>
        <div className="flex flex-wrap gap-1 mt-1">
          {item.youtube_channels.map((ch, j) => (
            <a
              key={j}
              href={ch.url}
              target="_blank"
              className="text-xs text-indigo-500 hover:underline"
            >
              📺 {ch.channel}
            </a>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>
      {/* Resume Recommendations */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <p className="text-xs font-medium text-gray-400 mb-2">RESUME TIPS 💡</p>
        <ul className="flex flex-col gap-1">
          {aiResult.resume_recommendations.map((tip, i) => (
            <li key={i} className="text-xs text-gray-600">→ {tip}</li>
          ))}
        </ul>
      </div>

      {/* Overleaf Code */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
        <p className="text-xs font-medium text-gray-400 mb-2">OVERLEAF RESUME CODE 📄</p>
        <textarea
          rows={4}
          readOnly
          value={aiResult.overleaf_resume_code}
          className="w-full text-xs bg-gray-100 rounded p-2 resize-none outline-none font-mono"
        />
        <button
          onClick={() => navigator.clipboard.writeText(aiResult.overleaf_resume_code)}
          className="mt-2 w-full text-xs text-indigo-600 border border-indigo-200 py-1.5 rounded-lg hover:bg-indigo-50"
        >
          Copy LaTeX Code 📋
        </button>
      </div>

    </div>
  )}

</div>

      {/* RIGHT - Job Cards (2/3) */}
      <div className="w-2/3">
        <h2 className="text-xl font-semibold mb-6" style={{color: '#37352F'}}>
          My Applications
        </h2>

        <div className="grid grid-cols-3 gap-4">
          
{jobs.map(job => (
  <div
    key={job.id}
    className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all duration-300 group overflow-hidden"
  >
    <h3 className="font-semibold text-base" style={{color: '#37352F'}}>{job.title}</h3>
    <p className="text-sm text-gray-400 mt-1">{job.company}</p>
    <p className="text-xs text-gray-300 mt-1">Applied: {job.date_applied}</p>

    {/* Show on hover - no page shake */}
    {job.description && (
      <div className="max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-300">
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-400 mb-1">DESCRIPTION</p>
          <p className="text-xs text-gray-500 line-clamp-2">{job.description}</p>
        </div>
      </div>
    )}

    {job.notes && (
      <div className="max-h-0 group-hover:max-h-16 overflow-hidden transition-all duration-300">
        <p className="text-xs font-medium text-gray-400 mt-2 mb-1">NOTES</p>
        <p className="text-xs text-gray-500">{job.notes}</p>
      </div>
    )}

    <select
      value={job.status}
      onChange={(e) => updateStatus(job.id, e.target.value)}
      className="mt-4 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-400"
    >
      <option value="applied">Applied</option>
      <option value="interview">Interview</option>
      <option value="offer">Offer</option>
      <option value="rejected">Rejected</option>
    </select>
    <button
      onClick={() => deleteJob(job.id)}
      className="mt-3 w-full text-sm text-red-400 border border-red-200 py-2 rounded-lg hover:bg-red-50 transition"
    >
      Delete
    </button>
  </div>
))}
          {/* Ghost Add Card */}
          <div
            onClick={() => setShowModal(true)}
            className="bg-white rounded-xl border-2 border-dashed border-gray-200 p-6 shadow-sm hover:border-indigo-400 hover:shadow-md transition cursor-pointer min-h-48"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg text-indigo-300">+</span>
              <h3 className="font-semibold text-base text-gray-300">Job Title</h3>
            </div>
            <p className="text-sm text-gray-200 mt-1">Company Name</p>
            <p className="text-xs text-gray-200 mt-1">Applied: Today</p>
            <div className="mt-4 w-full text-sm border border-dashed border-gray-200 rounded-lg px-3 py-2 text-gray-300">
              Status
            </div>
            <div className="mt-3 w-full text-sm text-gray-200 border border-dashed border-gray-200 py-2 rounded-lg text-center">
              Delete
            </div>
          </div>

        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-lg w-full max-w-md">
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold" style={{color: '#37352F'}}>Add New Application</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <input
                name="title"
                placeholder="Job Title"
                value={formData.title}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
              <input
                name="company"
                placeholder="Company"
                value={formData.company}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
              <textarea
                name="description"
                placeholder="Paste job description here..."
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400 resize-none"
              />
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400"
              >
                <option value="applied">Applied</option>
                <option value="interview">Interview</option>
                <option value="offer">Offer</option>
                <option value="rejected">Rejected</option>
              </select>
              <textarea
                name="notes"
                placeholder="Notes..."
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400 resize-none"
              />
              <button
                onClick={handleSubmit}
                className="bg-indigo-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
              >
                Add Application
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  )
}

export default JobList



// import axios from "axios"

// function JobList({ jobs, fetchJobs }) {

//   async function deleteJob(id) {
//     const token = localStorage.getItem("access")
//     await axios.delete(`http://127.0.0.1:8000/api/jobs/${id}/`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//     fetchJobs()
//   }

//   async function updateStatus(id, newStatus) {
//     const token = localStorage.getItem("access")
//     await axios.patch(`http://127.0.0.1:8000/api/jobs/${id}/`, {
//       status: newStatus
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//     fetchJobs()
//   }

//   return (
//     <div>
//       <h2 className="text-xl font-semibold mb-6" style={{color: '#37352F'}}>
//         My Applications
//       </h2>

//       {jobs.length === 0 && (
//         <div className="text-center py-20 text-gray-400">
//           <p className="text-4xl mb-4">📋</p>
//           <p className="text-sm">No jobs yet — add your first application!</p>
//         </div>
//       )}

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {jobs.map(job => (
//           <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition">
            
//             {/* Title and Company */}
//             <h3 className="font-semibold text-base" style={{color: '#37352F'}}>{job.title}</h3>
//             <p className="text-sm text-gray-400 mt-1">{job.company}</p>

//             {/* Date */}
//             <p className="text-xs text-gray-300 mt-1">Applied: {job.date_applied}</p>

//             {/* Status dropdown */}
//             <select
//               value={job.status}
//               onChange={(e) => updateStatus(job.id, e.target.value)}
//               className="mt-4 w-full text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-indigo-400"
//             >
//               <option value="applied">Applied</option>
//               <option value="interview">Interview</option>
//               <option value="offer">Offer</option>
//               <option value="rejected">Rejected</option>
//             </select>

//             {/* Delete button */}
//             <button
//               onClick={() => deleteJob(job.id)}
//               className="mt-3 w-full text-sm text-red-400 border border-red-200 py-2 rounded-lg hover:bg-red-50 transition"
//             >
//               Delete
//             </button>

//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default JobList