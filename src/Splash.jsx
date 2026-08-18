import { Link } from 'react-router-dom'

const TEAMS = [
  { name: 'Real Madrid', label: 'Real Madrid', color: 'bg-yellow-400' },
  { name: 'Manchester City', label: 'Manchester City', color: 'bg-sky-400' },
  { name: 'Bayern Munich', label: 'Bayern München', color: 'bg-red-600' },
  { name: 'Barcelona', label: 'Barcelona', color: 'bg-blue-800' },
  { name: 'Arsenal', label: 'Arsenal', color: 'bg-red-700' },
  { name: 'Paris Saint Germain', label: 'Paris Saint-Germain', color: 'bg-blue-900' },
  { name: 'Liverpool', label: 'Liverpool', color: 'bg-red-600' },
  { name: 'Inter', label: 'Inter', color: 'bg-blue-950' },
]

function Splash() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-12 px-4">
      <Link to="/players" className="flex flex-col items-center gap-2">
        <div className="w-16 h-16 rounded-full bg-neutral-800 flex items-center justify-center text-white font-bold">
          UCL
        </div>
        <h1 className="text-2xl font-semibold">UCL Zone</h1>
        <p className="text-sm text-neutral-500">All players, every team</p>
      </Link>

      <div className="grid grid-cols-4 gap-8">
        {TEAMS.map((team) => (
          <Link
            key={team.name}
            to={`/team/${encodeURIComponent(team.name)}`}
            className="flex flex-col items-center gap-2"
          >
            <div
              className={`w-13 h-13 rounded-full ${team.color} flex items-center justify-center text-white text-sm font-semibold`}
            >
              {team.name.slice(0, 3).toUpperCase()}
            </div>
            <p className="text-xs text-neutral-600">{team.label}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Splash