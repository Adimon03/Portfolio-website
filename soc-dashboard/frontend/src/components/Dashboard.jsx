import { Activity, AlertTriangle, Shield, CheckCircle, Clock, TrendingUp } from 'lucide-react'
import StatCard from './StatCard'
import RecentEvents from './RecentEvents'
import ThreatScore from './ThreatScore'

export default function Dashboard({ stats }) {
  if (!stats) return null

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Events"
          value={stats.total_events}
          icon={Activity}
          color="blue"
          trend="+12%"
        />
        <StatCard
          title="Critical Alerts"
          value={stats.critical_alerts}
          icon={AlertTriangle}
          color="red"
          trend="-5%"
        />
        <StatCard
          title="Blocked Attacks"
          value={stats.blocked_attacks}
          icon={Shield}
          color="green"
          trend="+8%"
        />
        <StatCard
          title="Active Incidents"
          value={stats.active_incidents}
          icon={Clock}
          color="yellow"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Threat Score */}
        <div className="lg:col-span-1">
          <ThreatScore score={stats.threat_score} />
        </div>

        {/* Top Attacks */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-red-400" />
            Top Attack Types
          </h3>
          <div className="space-y-3">
            {stats.top_attacks.map((attack, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-300">{attack.type}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                      style={{ width: `${(attack.count / stats.top_attacks[0].count) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-semibold w-8">{attack.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Events */}
      <RecentEvents />
    </div>
  )
}
