import { useState } from 'react'
import './App.css'
import VolunteersList from './pages/VolunteersList'
import VolunteerCreate from './pages/VolunteerCreate'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <VolunteersList />
    </>
  )
}

export default App
