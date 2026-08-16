import { useEffect, useState } from 'react'
import PlayerTable from './PlayerTable'

function App() {
  const [players, setPlayers] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    fetch(`http://localhost:8080/players?page=${page}&size=20`)
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data.content)
        setTotalPages(data.totalPages)
      })
      .catch((error) => console.error('Error fetching players:', error))
  }, [page])

  return (
    <div>
      <h1>UCL Zone</h1>
      <PlayerTable players={players} />

      <div>
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
        >
          Previous
        </button>
        <span> Page {page + 1} of {totalPages} </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page + 1 >= totalPages}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default App