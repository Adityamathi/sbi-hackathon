import { create } from 'zustand'
import type { Language, Step, Profile, Product, KYCRequirement } from '../types'

interface AppState {
  language: Language
  setLanguage: (lang: Language) => void
  sessionId: string | null
  setSessionId: (id: string) => void
  currentStep: Step
  setStep: (step: Step) => void
  intent: string | null
  setIntent: (intent: string) => void
  profile: Partial<Profile>
  setProfile: (profile: Partial<Profile>) => void
  product: Product | null
  setProduct: (product: Product | null) => void
  kycRequirements: KYCRequirement[]
  setKycRequirements: (reqs: KYCRequirement[]) => void
  updateKycItem: (name: string, completed: boolean) => void
  digitalReadinessScore: number
  setDigitalReadinessScore: (score: number) => void
  isAuthenticated: boolean
  setAuthenticated: (val: boolean) => void
  reset: () => void
}

const initialState = {
  language: 'en' as Language,
  sessionId: null as string | null,
  currentStep: 'language' as Step,
  intent: null as string | null,
  profile: {} as Partial<Profile>,
  product: null as Product | null,
  kycRequirements: [] as KYCRequirement[],
  digitalReadinessScore: 0,
  isAuthenticated: !!localStorage.getItem('token'),
}

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  setLanguage: (language) => set({ language }),
  setSessionId: (sessionId) => set({ sessionId }),
  setStep: (currentStep) => set({ currentStep }),
  setIntent: (intent) => set({ intent }),
  setProfile: (profile) => set((s) => ({ profile: { ...s.profile, ...profile } })),
  setProduct: (product) => set({ product }),
  setKycRequirements: (kycRequirements) => set({ kycRequirements }),
  updateKycItem: (name, completed) =>
    set((s) => ({
      kycRequirements: s.kycRequirements.map((r) =>
        r.name === name ? { ...r, completed } : r,
      ),
    })),
  setDigitalReadinessScore: (digitalReadinessScore) => set({ digitalReadinessScore }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  reset: () => set(initialState),
}))
