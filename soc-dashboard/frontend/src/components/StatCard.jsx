export default function StatCard({ title, value, icon: Icon, color, trend }) {
  const colors = {
    blue: 'from-blue-500 to-cyan-500',
    red: 'from-red-500 to-pink-500',
    green: 'from-green-500 to-emerald-500',
    yellow: 'from-yellow-500 to-orange-500'
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={`bg-gradient-to-r ${colors[color]} p-3 rounded-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className={`text-sm font-semibold ${trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
            {trend}
          </span>
        )}
      </div>
      <h3 className="text-gray-400 text-sm mb-1">{title}</h3>
      <p className="text-3xl font-bold text-white">{value.toLocaleString()}</p>
    </div>
  )
}
