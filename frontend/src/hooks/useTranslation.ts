import { useCallback } from 'react'
import { useAppStore } from '../store/appStore'
import { en } from '../locales/en'
import { hi } from '../locales/hi'
import { ta } from '../locales/ta'
import type { Language } from '../types'

const translations: Record<Language, Record<string, string>> = { en, hi, ta }

export function useTranslation() {
  const language = useAppStore((s) => s.language)

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const lang = translations[language] || en
      const text = (lang as Record<string, string>)[key] || (en as Record<string, string>)[key] || key
      if (params) {
        let result = text
        Object.entries(params).forEach(([k, v]) => {
          result = result.replace(`{${k}}`, String(v))
        })
        return result
      }
      return text
    },
    [language],
  )

  return { t, language }
}
