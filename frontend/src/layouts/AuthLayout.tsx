import { Outlet, Link } from 'react-router-dom'
import { useTranslation } from '../hooks/useTranslation'

export function AuthLayout() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-sbi-50 to-blue-50 flex flex-col">
      <div className="p-4">
        <Link to="/" className="flex items-center gap-2 w-fit">
          <div className="w-8 h-8 bg-sbi-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">SB</span>
          </div>
          <span className="font-bold text-lg text-sbi-500">{t('app_name')}</span>
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
