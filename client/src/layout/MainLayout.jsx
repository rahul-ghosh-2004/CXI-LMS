// import Navbar from '@/components/Navbar'
import Navbar from "../components/Navbar"
import React from 'react'
import { Outlet } from 'react-router-dom'
import axios from "axios"
import { GET_CURRENT_USER_URL } from "../../env.js"
import toast, { Toaster } from "react-hot-toast"
import { userLoggedIn } from "../app/features/authSlice.js"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

function MainLayout() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const validateUser = async () => {
    // e.preventDefault()

    try {
      const request = await axios.get(GET_CURRENT_USER_URL, { withCredentials: true })
      
      if (!request?.data?.success) {
        navigate("/auth")
      } else {
        dispatch(userLoggedIn({
          user: request?.data?.data
        }))
      }
      toast.success(`Welcome ${request?.data?.data?.name}` || "Login Successfully!")
    } catch (error) {
      // console.log(error?.data)
      toast.error("Please signin or signup!")
      navigate("/auth")
    }
  }

  React.useEffect(() => {
    validateUser()
  }, [])

  return (
    <div>
      <Toaster position="bottom-right" reverseOrder={false}/>
      <Navbar />
        <div>
            <Outlet />
        </div>
    </div>
  )
}

export default MainLayout
