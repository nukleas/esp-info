import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Compare from './pages/Compare'
import Pinouts from './pages/Pinouts'
import Circuits from './pages/Circuits'
import Boards from './pages/Boards'
import BoardDetail from './pages/BoardDetail'
import Reference from './pages/Reference'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/pinouts" element={<Pinouts />} />
        <Route path="/pinouts/:variantId" element={<Pinouts />} />
        <Route path="/circuits" element={<Circuits />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/boards/:boardId" element={<BoardDetail />} />
        <Route path="/reference" element={<Reference />} />
      </Routes>
    </Layout>
  )
}
