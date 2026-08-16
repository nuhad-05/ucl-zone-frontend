import { Link } from 'react-router-dom'

const TEAMS = [
  'Real Madrid',
  'Manchester City',
  'Bayern Munich',
  'Barcelona',
  'Arsenal',
  'Paris Saint-Germain',
  'Liverpool',
  'Inter',
]

function Splash() {
  return (
    <div>
      <div>
        <Link to="/players">
          <h1>UCL Zone</h1>
          <p>All players, every team</p>
        </Link>
      </div>

      <div>
        {TEAMS.map((team) => (
          <Link key={team} to={`/team/${encodeURIComponent(team)}`}>
            <div>{team.slice(0, 3).toUpperCase()}</div>
            <p>{team}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Splash