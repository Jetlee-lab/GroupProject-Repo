import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { logout } from '../auth/lib/allauth'
// import Button from '../components/Button'

export default function Logout () {
  const [response, setResponse] = useState({ fetching: false, content: null })
  const navigate = useNavigate();
  
  function submit () {
    setResponse({ ...response, fetching: true })
    logout().then((content) => {
      setResponse((r) => { return { ...r, content } })
      navigate(-1)
    }).catch((e) => {
      console.error(e)
      window.alert(e)
    }).then(() => {
      setResponse((r) => { return { ...r, fetching: false } })
    })
  }
  if (response.content) {
    return <Navigate to='/' />
  }
  return (
    <div className="flex flex-col items-center justify-center gap-6 h-screen">
      <h1 className="text-2xl font-bold">Sure to Logout?</h1>
      {/* <p className="text-gray-500">Please wait...</p> */}
      <button
        onClick={submit}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  )
}