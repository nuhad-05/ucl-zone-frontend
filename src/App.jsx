import { useEffect, useState } from 'react'
import PlayerTable from './PlayerTable'

function App() {
  const [players, setPlayers] = useState([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [team, setTeam] = useState('')
  const [position, setPosition] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let url

    if (search) {
      url = `http://localhost:8080/players/search?name=${encodeURIComponent(search)}`
    } else if (team && position) {
      url = `http://localhost:8080/players/team/${team}/position/${position}`
    } else if (team) {
      url = `http://localhost:8080/players/team/${team}`
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
  }, [page, team, position, search])

  return (
    <div>
      <h1>UCL Zone</h1>

      <div>
        <input
          type="text"
          placeholder="Search player name"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
        />

        <select
          value={team}
          disabled={!!search}
          onChange={(e) => { setTeam(e.target.value); setPage(0) }}
        >
          <option value="">All teams</option>
          <option value="Real Madrid">Real Madrid</option>
          <option value="Manchester City">Manchester City</option>
          <option value="Bayern Munich">Bayern Munich</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Arsenal">Arsenal</option>
          <option value="Paris Saint-Germain">Paris Saint-Germain</option>
          <option value="Liverpool">Liverpool</option>
          <option value="Inter">Inter</option>
        </select>

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

      {!team && !position && !search && (
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

export default App