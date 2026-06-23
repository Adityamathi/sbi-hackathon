import {
  HiChartBar, HiUsers, HiDeviceMobile, HiDownload,
} from 'react-icons/hi'

const analytics = {
  totalUsers: 1247,
  activeUsers: 892,
  languageDistribution: [
    { lang: 'English', count: 523, pct: 42 },
    { lang: 'हिन्दी', count: 412, pct: 33 },
    { lang: 'தமிழ்', count: 312, pct: 25 },
  ],
  topProducts: [
    { name: 'Digital Savings Account', requests: 456 },
    { name: 'Salary Account', requests: 234 },
    { name: 'Kisan Credit Card', requests: 189 },
    { name: 'Senior Citizen Savings', requests: 123 },
  ],
  kycRate: 68,
  yonoRate: 45,
  adoptionRate: 52,
}

const recentLogs = [
  { user: '+91-98765****0', action: 'Account opened', time: '2 min ago', status: 'success' },
  { user: '+91-87654****3', action: 'KYC completed', time: '15 min ago', status: 'success' },
  { user: '+91-76543****9', action: 'YONO activated', time: '1 hour ago', status: 'success' },
  { user: '+91-65432****1', action: 'KYC pending', time: '2 hours ago', status: 'pending' },
  { user: '+91-54321****5', action: 'Profile created', time: '3 hours ago', status: 'success' },
]

export function AdminDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Monitor users, analytics, and system performance</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {[
          { icon: HiUsers, label: 'Total Users', value: analytics.totalUsers, color: 'text-sbi-500' },
          { icon: HiUsers, label: 'Active Users', value: analytics.activeUsers, color: 'text-secondary' },
          { icon: HiChartBar, label: 'KYC Rate', value: `${analytics.kycRate}%`, color: 'text-success' },
          { icon: HiDeviceMobile, label: 'YONO Rate', value: `${analytics.yonoRate}%`, color: 'text-accent-500' },
        ].map((item) => (
          <div key={item.label} className="card">
            <div className="flex items-center justify-between mb-2">
              <item.icon className={item.color} size={24} />
              <span className="text-2xl font-bold text-gray-900">{item.value}</span>
            </div>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Language Distribution</h2>
          <div className="space-y-3">
            {analytics.languageDistribution.map((l) => (
              <div key={l.lang}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{l.lang}</span>
                  <span className="text-gray-500">{l.count} users ({l.pct}%)</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-3">
            {analytics.topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-sbi-50 rounded-lg flex items-center justify-center text-xs font-bold text-sbi-500">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700">{p.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{p.requests}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentLogs.map((log) => (
            <div key={log.user + log.time} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${log.status === 'success' ? 'bg-success' : 'bg-accent'}`} />
                <div>
                  <p className="text-sm text-gray-700">{log.action}</p>
                  <p className="text-xs text-gray-500">{log.user}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{log.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="btn-outline flex items-center gap-2">
          <HiDownload size={16} /> Export CSV
        </button>
        <button className="btn-outline flex items-center gap-2">
          <HiDownload size={16} /> Export PDF
        </button>
      </div>
    </div>
  )
}
