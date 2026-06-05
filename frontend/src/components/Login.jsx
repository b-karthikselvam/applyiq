import { useState } from "react"
import axios from "axios"

function Login({ setIsLoggedIn , setShowSignup}) {   //collecting the props here it is a statevariable update function in App.jsx now just focus only on SetIsLogedIN

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const [error, setError] = useState("")

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {// 3 this will execute when you click submit 
    e.preventDefault()
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/", //3.1 call api ,if response didnot got any value then it will immediatley jump to catch so if the server did not send token the setIsLogedIN wont execute
        formData
      )
      localStorage.setItem("access", response.data.access)//3.2 store the returned token by server into the browesers local storage 
      localStorage.setItem("refresh", response.data.refresh)//3.3 store the returned token by server into the browesers local storage 
      setIsLoggedIn(true) //3.4sets the app.jsx state varibale(IsLoggedIN ) as True ,as it is a state variable in app.jsx it will rerender app.jsx so go to app.jsx
    } catch (err) {
      setError("Invalid email or password!")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center" style={{backgroundColor: '#F7F6F3'}}>
      <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-200 w-full max-w-md">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold" style={{color: '#37352F'}}> ApplyIQ</h1>
          <p className="text-sm text-gray-400 mt-1">Track smarter. Apply better.</p>
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
            Login
          </button>
        </div>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don't have an account?{" "}
          <span
            onClick={() => setShowSignup(true)}
            className="text-indigo-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login