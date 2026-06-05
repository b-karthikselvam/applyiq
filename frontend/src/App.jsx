import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import AppRouter from "./router/AppRouter"
import Login from "./components/Login"
import Signup from "./components/Signup"
import API_BASE_URL from '../api'

function App() {
  const [jobs, setJobs] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false) //4 now isloggedin = True ,state variable changed ,so component will rerender ,and the first useEffect  wont execute as the array is empty but our second Ussefect will execute
  const [showSignup, setShowSignup] = useState(false)

  async function fetchJobs() {                       // 6.fucntion called 
    const token = localStorage.getItem("access")    //6.1 token is stored in variable called token from browsers local storage and ready to go along with the request
    const response = await axios.get(               // 6.2 request is made      //6.4 now response have the joblist 
      "${API_BASE_URL}/api/jobs/",
      {
        headers: {
          Authorization: `Bearer ${token}`        //6.3 we passed the vaariable wich contain the acess token now go  to step 6.4
        }
      }
    )
    setJobs(response.data)                       //6.5 now we are passing the response.data which have joblist into the updaterr fucntion of Jobs state hence the state variable is updated so the component rerenders again and display the jobs
  }

  useEffect(() => {
    const token = localStorage.getItem("access") //1. ther is no token is saved in browsers localstarage because we havent logged in ,so it returns nothing to token so token is still empty 
    if (token) {         // 1.1here the condition become false as the token is empty
      setIsLoggedIn(true) //1.2 as the condition false it will not execute 
      fetchJobs()         //1.3 as the condition false it will not execute
    }
  }, [])

  useEffect(() => { // 1.4 useeffect runs now                                   //5.1 now the ussefect runs
    if (isLoggedIn) { //1.5 here isLogedIn is false so it wont fetch jobs       //5.2 isLoggedIn now True so the condition become true and the statement inside it will execute 
      fetchJobs()  // ← runs whenever isLoggedIn changes to true!               //5.3 fetchJob function is called  go to step 6
    }
}, [isLoggedIn])  //5 now the value in dependancy array changed so it will trigger the useeffect

  function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    setIsLoggedIn(false)
  }

  if (!isLoggedIn) {         //2. here in state isLogedIn  is False here we use ! which inverts the bool so the condition if =  True     ie we arent logined yet so...                   
    return showSignup        // 2.2 here showSignUp is a state variable set to false at this moment . if Showsignup == true execute <signup ...> else execute <Login ..>
      ? <Signup setShowSignup={setShowSignup} /> //2.3 this will not execute cuz ShowSignup is false 
      : <Login setIsLoggedIn={setIsLoggedIn} setShowSignup={setShowSignup} /> // 2.4 this will render here ,ie Login page, now go to Login.jsx 
  }

  return (
    <div style={{backgroundColor: '#F7F6F3'}} className="min-h-screen">
      {/* Navbar */}
      <nav className="bg-white px-8 py-4 flex justify-between items-center border-b border-gray-200 shadow-sm">
        <h1 className="text-xl font-semibold" style={{color: '#37352F'}}>
           ApplyIQ
        </h1>
        <div className="flex gap-6 items-center">
          <Link to="/" className="text-sm font-medium text-gray-500 hover:text-indigo-600">Home</Link>
          <Link to="/add" className="text-sm font-medium text-gray-500 hover:text-indigo-600">Add Job</Link>
          <button
            onClick={handleLogout}
            className="text-sm bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main content */}
      <div className="px-6 mt-8">
        <AppRouter jobs={jobs} fetchJobs={fetchJobs} />
      </div>
    </div>
  )
}

export default App