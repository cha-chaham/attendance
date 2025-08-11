import Layout from '@/components/layout'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const handleLogin = () => {
        if (username === import.meta.env.VITE_USERNAME && pass === import.meta.env.VITE_PASSWORD) {
            localStorage.setItem("isAuth", true)
            navigate("/dashboard")
        }
    }
  return (
    <Layout>
        <div className="flex justify-center">
        <img src="/logo-chafi.png" alt="Logo" className='w-75'/>
      </div>
      <div className="text-2xl pt-5 text-center font-bold text-persian-green-600-main mb-5">Login</div>

      <div className="mt-5">
        <fieldset className="fieldset rounded-box p-4 mx-15">

            <label className="label">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input w-full bg-white text-black" placeholder="Username" />

            <label className="label">Password</label>
            <input type="password" value={pass} onChange={(e) => setPass(e.target.value)} className="input w-full bg-white text-black" placeholder="Password" />

            <button className="btn bg-persian-green-600 border-0 mt-4" type='submit' onClick={handleLogin}>Login</button>
        </fieldset>
      </div>
    </Layout>
  )
}
