import { Routes, Route } from 'react-router-dom'
import Splash from './Splash'
import PlayerPage from './PlayerPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/players" element={<PlayerPage />} />
      <Route path="/team/:teamName" element={<PlayerPage />} />
    </Routes>
  )
}

export default App