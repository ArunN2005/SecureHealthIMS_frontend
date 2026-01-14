import { useEffect, useState } from 'react'

function App() {
  const [patients, setPatients] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/patients')
      .then(res => res.json())
      .then(data => setPatients(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Hospital Management</h1>

      <h2>Patients</h2>
      <ul>
        {patients.map(p => (
          <li key={p.id}>
            {p.name} ({p.gender})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
