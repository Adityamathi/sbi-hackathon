import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { PublicLayout } from './layouts/PublicLayout'
import { AuthLayout } from './layouts/AuthLayout'
import { DashboardLayout } from './layouts/DashboardLayout'
import { Home } from './pages/public/Home'
import { About } from './pages/public/About'
import { Features } from './pages/public/Features'
import { Contact } from './pages/public/Contact'
import { Login } from './pages/auth/Login'
import { Signup } from './pages/auth/Signup'
import { ForgotPassword } from './pages/auth/ForgotPassword'
import { Dashboard } from './pages/dashboard/Dashboard'
import { LanguageSelect } from './pages/journey/LanguageSelect'
import { CaptureIntent } from './pages/journey/CaptureIntent'
import { CollectProfile } from './pages/journey/CollectProfile'
import { Recommendation } from './pages/journey/Recommendation'
import { KYC } from './pages/journey/KYC'
import { YONO } from './pages/journey/YONO'
import { Completion } from './pages/journey/Completion'
import { AiAssistant } from './components/AiAssistant'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/onboarding/language" element={<LanguageSelect />} />
            <Route path="/onboarding/intent" element={<CaptureIntent />} />
            <Route path="/onboarding/profile" element={<CollectProfile />} />
            <Route path="/onboarding/recommendation" element={<Recommendation />} />
            <Route path="/onboarding/kyc" element={<KYC />} />
            <Route path="/onboarding/yono" element={<YONO />} />
            <Route path="/onboarding/complete" element={<Completion />} />
          </Route>
        </Routes>
        <AiAssistant />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
