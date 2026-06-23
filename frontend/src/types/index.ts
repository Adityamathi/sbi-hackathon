export type Language = 'en' | 'hi' | 'ta'
export type Intent = 'open_account' | 'explore_products' | 'digital_banking' | 'loan' | 'general_help'
export type Step = 'language' | 'intent' | 'profile' | 'recommendation' | 'kyc' | 'onboarding' | 'digital' | 'completion'

export interface User {
  id: string
  name: string
  mobile: string
  email: string
  language: Language
  created_at: string
}

export interface Profile {
  age_band: string
  gender: string
  occupation: string
  income_range: string
  location: string
  area: 'urban' | 'rural'
  digital_literacy: 'low' | 'medium' | 'high'
}

export interface Product {
  id: string
  name: string
  description: string
  benefits: string[]
  eligibility: string[]
  confidence: number
  why_recommended: string
}

export interface KYCRequirement {
  name: string
  label: string
  required: boolean
  completed: boolean
}

export interface AgentResponse {
  session_id: string
  response: string
  step: Step
  language: Language
  suggested_actions?: string[]
}

export interface Session {
  session_id: string
  language: Language
  message: string
}

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface DashboardData {
  name: string
  language: Language
  profile_completion: number
  kyc_completion: number
  digital_adoption_score: number
  quick_actions: { label: string; icon: string; path: string }[]
}

export interface TranslationMap {
  [key: string]: string | TranslationMap
}
