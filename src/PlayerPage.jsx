import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PlayerTable from './PlayerTable'

function PlayerPage() {
  const { teamName } = useParams()

  const [players, setPlayers] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [position, setPosition] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let url

    if (search) {
      url = `http://localhost:8080/players/search?name=${encodeURIComponent(search)}`
    } else if (teamName && position) {
      url = `http://localhost:8080/players/team/${teamName}/position/${position}`
    } else if (teamName) {
      url = `http://localhost:8080/players/team/${teamName}`
    } else if (position) {
      url = `http://localhost:8080/players/position/${position}`
    } else {
      url = `http://localhost:8080/players?page=${page}&size=20`
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.content) {
          setPlayers(data.content)
          setTotalPages(data.totalPages)
        } else {
          setPlayers(data)
          setTotalPages(1)
        }
      })
      .catch((error) => console.error('Error fetching players:', error))
  }, [page, teamName, position, search])

  return (
    <div>
      <Link to="/">← Back</Link>
      <h1>{teamName ? decodeURIComponent(teamName) : 'All Players'}</h1>

      <div>
        <input
          type="text"
          placeholder="Search player name"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
        />

        <select
          value={position}
          disabled={!!search}
          onChange={(e) => { setPosition(e.target.value); setPage(0) }}
        >
          <option value="">All positions</option>
          <option value="Attacker">Attacker</option>
          <option value="Midfielder">Midfielder</option>
          <option value="Defender">Defender</option>
          <option value="Goalkeeper">Goalkeeper</option>
        </select>
      </div>

      <PlayerTable players={players} />

      {!teamName && !position && !search && (
        <div>
          <button onClick={() => setPage((p) => p - 1)} disabled={page === 0}>
            Previous
          </button>
          <span> Page {page + 1} of {totalPages} </span>
          <button onClick={() => setPage((p) => p + 1)} disabled={page + 1 >= totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default PlayerPage