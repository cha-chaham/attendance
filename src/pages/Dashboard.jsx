import Layout from '@/components/layout'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.setItem("isAuth", false)
        navigate("/login")
    }
  return (
    <Layout>
<div className="flex justify-center">
        <img src="/logo-chafi.png" alt="Logo" className='w-75'/>
      </div>
      <div className="text-2xl pt-5 text-center font-bold text-persian-green-600 mb-5">Dashboard</div>
      <button className='text-black' onClick={handleLogout}>Logout</button>
    </Layout>
  )
}
