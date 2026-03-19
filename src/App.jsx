import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AppNavbar from './components/AppNavbar'
import ScrollToTop from './components/ScrollToTop'

// Marketing pages
import Home from './pages/Home'
import About from './pages/About'
import Pricing from './pages/Pricing'
import Careers from './pages/Careers'
import Imagine from './pages/Imagine'
import AIInteriorDesign from './pages/AIInteriorDesign'
import Blog from './pages/Blog'
import Community from './pages/Community'
import Canvas from './pages/Canvas'
import Login from './pages/Login'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

// App pages (logged-in)
import Dashboard from './pages/Dashboard'
import SearchResults from './pages/SearchResults'
import ProductDetail from './pages/ProductDetail'
import Profile from './pages/Profile'

const marketingRoutes = [
  '/about-us',
  '/pricing',
  '/careers',
  '/imagine',
  '/ai-interior-design',
  '/blog',
  '/community',
  '/canvas',
  '/login',
  '/privacy',
  '/terms',
  '/home',
]

function App() {
  const location = useLocation()
  const isMarketing = marketingRoutes.some((r) => location.pathname.startsWith(r))

  if (isMarketing) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about-us" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/imagine" element={<Imagine />} />
            <Route path="/ai-interior-design" element={<AIInteriorDesign />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/community" element={<Community />} />
            <Route path="/canvas" element={<Canvas />} />
            <Route path="/login" element={<Login />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
        </main>
        <Footer />
      </div>
    )
  }

  // App layout (logged-in)
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-app)' }}>
      <ScrollToTop />
      <AppNavbar />
      <main className="flex-1 flex flex-col min-w-0">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/gather" element={<Dashboard />} />
          <Route path="/imagine-app" element={<Dashboard />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
