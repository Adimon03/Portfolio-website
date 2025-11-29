import { Info, Database, Wifi } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-slate-800 border-t border-slate-700 mt-12">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-blue-400 font-semibold mb-2">Demo Mode - Simulated Security Data</h4>
              <p className="text-gray-300 text-sm mb-3">
                This dashboard currently displays simulated security events for demonstration purposes. 
                The architecture is designed to easily integrate with real data sources.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-start gap-2">
                  <Database className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-cyan-400 text-sm font-semibold">Ready for Real Data Sources:</p>
                    <ul className="text-gray-400 text-xs mt-1 space-y-1">
                      <li>• SIEM Integration (Splunk, QRadar, ELK)</li>
                      <li>• Firewall Logs (Cisco, Palo Alto)</li>
                      <li>• IDS/IPS Systems (Snort, Suricata)</li>
                      <li>• Cloud Security (AWS CloudTrail, Azure)</li>
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Wifi className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-green-400 text-sm font-semibold">Extensible Architecture:</p>
                    <ul className="text-gray-400 text-xs mt-1 space-y-1">
                      <li>• RESTful API for data ingestion</li>
                      <li>• WebSocket support for real-time feeds</li>
                      <li>• Plugin system for custom integrations</li>
                      <li>• Scalable to enterprise environments</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-gray-400 text-sm mb-2">
            Security Operations Center Dashboard
          </p>
          <p className="text-gray-500 text-xs">
            Built by <span className="text-blue-400 font-semibold">Adithya S</span> | 
            Demonstrating SOC concepts, threat intelligence, and real-time monitoring capabilities
          </p>
          <p className="text-gray-600 text-xs mt-2">
            © 2025 | Educational & Portfolio Project
          </p>
        </div>
      </div>
    </footer>
  )
}
