function PlayerTable({ players }) {
  return (
    <div className="overflow-hidden rounded-lg border border-neutral-200">
      <table className="w-full text-sm text-left">
        <thead className="bg-neutral-50 text-neutral-500">
          <tr>
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Team</th>
            <th className="px-4 py-3 font-medium">Position</th>
            <th className="px-4 py-3 font-medium text-right">Goals</th>
            <th className="px-4 py-3 font-medium text-right">Assists</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="border-t border-neutral-200">
              <td className="px-4 py-3">{player.name}</td>
              <td className="px-4 py-3 text-neutral-500">{player.team}</td>
              <td className="px-4 py-3 text-neutral-500">{player.position}</td>
              <td className="px-4 py-3 text-right">{player.goals}</td>
              <td className="px-4 py-3 text-right">{player.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PlayerTable