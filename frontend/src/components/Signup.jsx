import { useState } from "react"
import axios from "axios"
import API_BASE_URL from '../api'

function Signup({ setShowSignup }) {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: ""
  })

  const [error, setError] = useState("")

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await axios.post(
        `${API_BASE_URL}/api/accounts/signup/`,
        formData
      )
      alert("Account created! Please login!")
      setShowSignup(false)
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#F7F6F3'}}>
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 w-full max-w-md">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold" style={{color: '#37352F'}}>ApplyIQ</h1>
          <p className="text-sm text-gray-400 mt-1">Create your account</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400"
          />
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 text-white py-3 rounded-lg text-sm font-medium hover:bg-indigo-700 transition"
          >
            Sign Up
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => setShowSignup(false)}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  )
}

export default Signup