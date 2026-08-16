import { useEffect, useState } from 'react'
import PlayerTable from './PlayerTable'

function App() {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    fetch('http://localhost:8080/players')
      .then((response) => response.json())
      .then((data) => setPlayers(data.content))
      .catch((error) => console.error('Error fetching players:', error))
  }, [])

  return (
    <div>
      <h1>UCL Zone</h1>
      <PlayerTable players={players} />
    </div>
  )
}

export default App