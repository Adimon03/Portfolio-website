export default function ThreatScore({ score }) {
  const getColor = () => {
    if (score >= 70) return 'text-red-500'
    if (score >= 40) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getLabel = () => {
    if (score >= 70) return 'High Risk'
    if (score >= 40) return 'Medium Risk'
    return 'Low Risk'
  }

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6">Threat Score</h3>
      <div className="flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="transform -rotate-90 w-40 h-40">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              className="text-slate-700"
            />
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="currentColor"
              strokeWidth="12"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 70}`}
              strokeDashoffset={`${2 * Math.PI * 70 * (1 - score / 100)}`}
              className={getColor()}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-bold ${getColor()}`}>{score}</span>
            <span className="text-gray-400 text-sm">/ 100</span>
          </div>
        </div>
      </div>
      <div className="text-center mt-4">
        <p className={`text-lg font-semibold ${getColor()}`}>{getLabel()}</p>
        <p className="text-gray-400 text-sm mt-1">Current threat level</p>
      </div>
    </div>
  )
}
