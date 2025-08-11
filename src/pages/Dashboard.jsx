import Layout from '@/components/layout'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAttendance } from '@/utils/api'
import Card from '@/components/card';
import L from 'leaflet'

export default function Dashboard() {

  const [resultData, setResultData] = useState([])
  const [loading, setLoading] = useState(true)

  async function fetchAttendance() {
    try {
      const result = await getAttendance();
      setResultData(result.map(item => ({
        ...item,
        newTime: readableTime(item.time),
        nearLocation: isNearLocation(item.latitude, item.longitude)
      })))
      setLoading(true)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const isNearLocation = (lat, lng, radius=150) => {
    const center = L.latLng(-0.8886556,119.8781443)
    const point = L.latLng(lat, lng)
    const distance = point.distanceTo(center);
    return distance <= radius
  }

  const readableTime = (time) => {
    return new Date(time).toLocaleString('id-ID', {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'Asia/Makassar' // Sesuaikan dengan zona waktu kamu
  });
  }

  useEffect(() => {
    fetchAttendance()
    localStorage.setItem("isAuth", true)
    console.log(localStorage.getItem("isAuth"))
    console.log(resultData)
  }, [resultData])


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
      <div className="text-2xl pt-5 text-center font-bold text-persian-green-600-main mb-5">Dashboard</div>
      {resultData.map(item =>(
        <div className="">
          <Card id={item.id} tanggal={item.newTime} nearLocation={item.nearLocation} userLocation={[item.latitude, item.longitude]}/>
        </div>
      ))}
    </Layout>
  )
}
