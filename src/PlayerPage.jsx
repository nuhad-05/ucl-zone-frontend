import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PlayerTable from './PlayerTable'
import TEAM_BIOS from './TeamBios'

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
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-sm text-neutral-500 hover:text-neutral-800">
        ← Back
      </Link>

      <h1 className="text-2xl font-semibold mt-2 mb-2">
        {teamName ? decodeURIComponent(teamName) : 'All Players'}
      </h1>

      {teamName && TEAM_BIOS[decodeURIComponent(teamName)] && (
        <p className="text-sm text-neutral-500 mb-6 max-w-2xl">
          {TEAM_BIOS[decodeURIComponent(teamName)]}
        </p>
      )}

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search player name"
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0) }}
          className="flex-1 border border-neutral-300 rounded-md px-3 py-2 text-sm"
        />

        <select
          value={position}
          disabled={!!search}
          onChange={(e) => { setPosition(e.target.value); setPage(0) }}
          className="border border-neutral-300 rounded-md px-3 py-2 text-sm disabled:opacity-50"
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
        <div className="flex items-center justify-between mt-4 text-sm">
          <button
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
            className="px-3 py-1.5 border border-neutral-300 rounded-md disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-neutral-500">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={page + 1 >= totalPages}
            className="px-3 py-1.5 border border-neutral-300 rounded-md disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </div>
  )
}

export default PlayerPage