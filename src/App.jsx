import { useEffect, useState } from 'react'

function App() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/players')
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error('Error fetching players:', error))
  }, [])

  return (
    <div>
      <h1>UCL Zone</h1>
      <pre>{JSON.stringify(players, null, 2)}</pre>
    </div>
  )
}

export default App