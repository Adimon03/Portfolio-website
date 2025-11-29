import { useState, useEffect } from 'react'
import { Shield, Activity, AlertTriangle, CheckCircle, Clock } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    const interval = setInterval(fetchStats, 5000) // Update every 5 seconds
    return () => clearInterval(interval)
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/dashboard/stats')
      const data = await response.json()
      setStats(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching stats:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-16 h-16 text-blue-500 animate-pulse mx-auto mb-4" />
          <p className="text-white text-xl">Loading SOC Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      <Header />
      <div className="flex-grow">
        <Dashboard stats={stats} />
      </div>
      <Footer />
    </div>
  )
}

export default App
