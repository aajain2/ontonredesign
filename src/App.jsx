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
const SurfaceDetail = lazy(() => import('./pages/SurfaceDetail'))
const RoomDetail = lazy(() => import('./pages/RoomDetail'))
const ImagineRoom = lazy(() => import('./pages/ImagineRoom'))

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
    <div className="flex-1 px-[52px] pt-8 pb-12">
      <div className="h-6 w-40 bg-[#EEEDEB] rounded-lg mb-6 skeleton-pulse" />
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-[16px]">
        {[0,1,2,3,4,5,6,7,8,9].map((i) => (
          <div key={i} className="mb-[16px] break-inside-avoid rounded-[4px] bg-[#EEEDEB] skeleton-pulse" style={{ aspectRatio: ['4/5','3/4','1/1','4/3'][i%4], animationDelay: `${i*80}ms` }} />
        ))}
      </div>
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
            <Route path="/surface/:id" element={<SurfaceDetail />} />
            <Route path="/room/:id" element={<RoomDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/gather" element={<Dashboard />} />
            <Route path="/imagine-app" element={<ImagineRoom />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  )
}

export default App
