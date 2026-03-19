import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

// Critical layout components (not lazy — needed immediately)
import Navbar from './components/Navbar'
import AppNavbar from './components/AppNavbar'

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Careers = lazy(() => import('./pages/Careers'))
const Imagine = lazy(() => import('./pages/Imagine'))
const AIInteriorDesign = lazy(() => import('./pages/AIInteriorDesign'))
const Blog = lazy(() => import('./pages/Blog'))
const Community = lazy(() => import('./pages/Community'))
const Canvas = lazy(() => import('./pages/Canvas'))
const Login = lazy(() => import('./pages/Login'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const SearchResults = lazy(() => import('./pages/SearchResults'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Profile = lazy(() => import('./pages/Profile'))

// Lazy-loaded heavy component
const Footer = lazy(() => import('./components/Footer'))

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

// Minimal loading fallback
function PageLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[200px]">
      <div
        className="w-6 h-6 rounded-full border-2 border-[#E5E2DD] border-t-[#1A1A1A]"
        style={{ animation: 'spin 0.6s linear infinite' }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

function App() {
  const location = useLocation()
  const isMarketing = marketingRoutes.some((r) => location.pathname.startsWith(r))

  if (isMarketing) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
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
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    )
  }

  // App layout (logged-in)
  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-app)' }}>
      <ScrollToTop />
      <AppNavbar />
      <main className="flex-1 flex flex-col min-w-0">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/gather" element={<Dashboard />} />
            <Route path="/imagine-app" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
