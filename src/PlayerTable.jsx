function PlayerTable({ players }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Team</th>
          <th>Position</th>
          <th>Goals</th>
          <th>Assists</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.id}>
            <td>{player.name}</td>
            <td>{player.team}</td>
            <td>{player.position}</td>
            <td>{player.goals}</td>
            <td>{player.assists}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default PlayerTable