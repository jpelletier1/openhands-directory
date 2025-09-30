import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Category from './pages/Category'
import AssetDetail from './pages/AssetDetail'
import Contribute from './pages/Contribute'
import Search from './pages/Search'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:categoryType" element={<Category />} />
            <Route path="/asset/:id" element={<AssetDetail />} />
            <Route path="/contribute" element={<Contribute />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  )
}

export default App