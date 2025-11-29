import { Shield, Bell, User } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-2 rounded-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">SOC Dashboard</h1>
              <p className="text-sm text-gray-400">Security Operations Center</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden md:block">
              <p className="text-xs text-gray-400">Status</p>
              <p className="text-sm text-green-400 font-semibold">● Online</p>
            </div>
            <button className="p-2 hover:bg-slate-700 rounded-lg relative">
              <Bell className="w-5 h-5 text-gray-300" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-slate-700 rounded-lg">
              <User className="w-5 h-5 text-gray-300" />
            </button>
          </div>
        </div>
      </div>
      <div className="bg-slate-900 px-6 py-2">
        <p className="text-xs text-gray-500 text-center">Built by Adithya S | Real-time Security Monitoring</p>
      </div>
    </header>
  )
}
