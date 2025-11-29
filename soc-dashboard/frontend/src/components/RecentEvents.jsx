import { useState, useEffect } from 'react'
import { AlertCircle, Shield, Clock } from 'lucide-react'

export default function RecentEvents() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents()
    const interval = setInterval(fetchEvents, 3000)
    return () => clearInterval(interval)
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events/recent?limit=10')
      const data = await response.json()
      setEvents(data.events)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const getSeverityColor = (severity) => {
    const colors = {
      Critical: 'bg-red-500',
      High: 'bg-orange-500',
      Medium: 'bg-yellow-500',
      Low: 'bg-blue-500',
      Info: 'bg-gray-500'
    }
    return colors[severity] || 'bg-gray-500'
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center">
          <AlertCircle className="w-5 h-5 mr-2 text-blue-400" />
          Recent Security Events
        </h3>
        <span className="text-sm text-gray-400">Live Updates</span>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-slate-900 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getSeverityColor(event.severity)}`}>
                    {event.severity}
                  </span>
                  <span className="text-gray-400 text-sm">{event.attack_type}</span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{event.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <span>IP: {event.source_ip}</span>
                  <span>Port: {event.port}</span>
                  <span>{event.protocol}</span>
                  {event.blocked && (
                    <span className="text-green-400 flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      Blocked
                    </span>
                  )}
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-xs text-gray-500 flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(event.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
