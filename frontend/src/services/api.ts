import axios from 'axios'

const API = axios.create({ baseURL: '/api' })

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

API.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  },
)

export const api = {
  // Session
  startSession: (language: string) =>
    API.post('/session/start', { language }).then((r) => r.data),

  // Auth
  login: (mobile: string, password: string) =>
    API.post('/auth/login', { mobile, password }).then((r) => r.data),
  signup: (data: Record<string, unknown>) =>
    API.post('/auth/signup', data).then((r) => r.data),
  sendOtp: (mobile: string) =>
    API.post('/auth/send-otp', { mobile }).then((r) => r.data),
  verifyOtp: (mobile: string, otp: string) =>
    API.post('/auth/verify-otp', { mobile, otp }).then((r) => r.data),
  resetPassword: (mobile: string, otp: string, password: string) =>
    API.post('/auth/reset-password', { mobile, otp, password }).then((r) => r.data),

  // Intent
  captureIntent: (sessionId: string, intent: string) =>
    API.post('/intent/capture', { session_id: sessionId, intent }).then((r) => r.data),

  // Profile
  submitProfile: (sessionId: string, profile: Record<string, unknown>) =>
    API.post('/profile/submit', { session_id: sessionId, ...profile }).then((r) => r.data),

  // Agent
  agentRespond: (sessionId: string, message: string) =>
    API.post('/agent/respond', { session_id: sessionId, message }).then((r) => r.data),

  // Dashboard
  getDashboard: () => API.get('/dashboard').then((r) => r.data),
  getProducts: () => API.get('/products').then((r) => r.data),

  // KYC
  checkKyc: (sessionId: string) =>
    API.post('/kyc/check', { session_id: sessionId }).then((r) => r.data),

  // Feedback
  submitFeedback: (sessionId: string, rating: number, comment: string) =>
    API.post('/feedback', { session_id: sessionId, rating, comment }).then((r) => r.data),
}
