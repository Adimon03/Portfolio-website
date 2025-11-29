"""
SOC Dashboard Backend - Flask API
Real-time Security Operations Center Dashboard
Built by Adithya S
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import random
import json
from collections import defaultdict

app = Flask(__name__)
CORS(app)

# Sample threat intelligence data
THREAT_COUNTRIES = ['Russia', 'China', 'North Korea', 'Iran', 'Unknown']
ATTACK_TYPES = [
    'Brute Force Attack',
    'SQL Injection',
    'DDoS Attack',
    'Malware Detection',
    'Phishing Attempt',
    'Port Scan',
    'Unauthorized Access',
    'Data Exfiltration',
    'Ransomware',
    'Zero-Day Exploit'
]

SEVERITY_LEVELS = ['Critical', 'High', 'Medium', 'Low', 'Info']
SEVERITY_COLORS = {
    'Critical': '#ef4444',
    'High': '#f97316',
    'Medium': '#eab308',
    'Low': '#3b82f6',
    'Info': '#6b7280'
}

# In-memory storage for demo (use database in production)
security_events = []
active_threats = []

def generate_ip():
    """Generate random IP address"""
    return f"{random.randint(1, 255)}.{random.randint(0, 255)}.{random.randint(0, 255)}.{random.randint(1, 255)}"

def generate_security_event():
    """Generate realistic security event"""
    severity = random.choices(
        SEVERITY_LEVELS,
        weights=[5, 15, 30, 35, 15]  # More low/medium, fewer critical
    )[0]
    
    attack_type = random.choice(ATTACK_TYPES)
    source_ip = generate_ip()
    country = random.choice(THREAT_COUNTRIES)
    
    event = {
        'id': len(security_events) + 1,
        'timestamp': datetime.now().isoformat(),
        'severity': severity,
        'attack_type': attack_type,
        'source_ip': source_ip,
        'destination_ip': f"192.168.1.{random.randint(1, 254)}",
        'country': country,
        'blocked': random.choice([True, False]),
        'description': f"{attack_type} detected from {source_ip} ({country})",
        'affected_asset': random.choice(['Web Server', 'Database', 'Email Server', 'Firewall', 'Workstation']),
        'protocol': random.choice(['TCP', 'UDP', 'HTTP', 'HTTPS', 'SSH', 'FTP']),
        'port': random.choice([22, 80, 443, 3306, 5432, 8080, 21])
    }
    
    return event

def calculate_threat_score(events):
    """Calculate overall threat score based on recent events"""
    if not events:
        return 0
    
    score = 0
    severity_weights = {'Critical': 10, 'High': 7, 'Medium': 4, 'Low': 2, 'Info': 1}
    
    for event in events[-50:]:  # Last 50 events
        score += severity_weights.get(event['severity'], 0)
    
    return min(100, score)

@app.route('/api/dashboard/stats', methods=['GET'])
def get_dashboard_stats():
    """Get overall dashboard statistics"""
    
    # Generate some events if empty
    if len(security_events) < 100:
        for _ in range(100):
            security_events.append(generate_security_event())
    
    # Calculate statistics
    total_events = len(security_events)
    critical_alerts = sum(1 for e in security_events if e['severity'] == 'Critical')
    high_alerts = sum(1 for e in security_events if e['severity'] == 'High')
    blocked_attacks = sum(1 for e in security_events if e['blocked'])
    
    # Threat score
    threat_score = calculate_threat_score(security_events)
    
    # Events by severity
    severity_distribution = defaultdict(int)
    for event in security_events:
        severity_distribution[event['severity']] += 1
    
    # Top attack types
    attack_type_count = defaultdict(int)
    for event in security_events[-50:]:
        attack_type_count[event['attack_type']] += 1
    
    top_attacks = sorted(attack_type_count.items(), key=lambda x: x[1], reverse=True)[:5]
    
    # Top countries
    country_count = defaultdict(int)
    for event in security_events[-50:]:
        country_count[event['country']] += 1
    
    top_countries = sorted(country_count.items(), key=lambda x: x[1], reverse=True)[:5]
    
    stats = {
        'total_events': total_events,
        'critical_alerts': critical_alerts,
        'high_alerts': high_alerts,
        'blocked_attacks': blocked_attacks,
        'threat_score': threat_score,
        'severity_distribution': dict(severity_distribution),
        'top_attacks': [{'type': t, 'count': c} for t, c in top_attacks],
        'top_countries': [{'country': c, 'count': cnt} for c, cnt in top_countries],
        'active_incidents': random.randint(2, 8),
        'avg_response_time': round(random.uniform(2.5, 8.5), 1)
    }
    
    return jsonify(stats)

@app.route('/api/events/recent', methods=['GET'])
def get_recent_events():
    """Get recent security events"""
    limit = request.args.get('limit', 20, type=int)
    severity_filter = request.args.get('severity', None)
    
    events = security_events[-limit:]
    
    if severity_filter:
        events = [e for e in events if e['severity'] == severity_filter]
    
    return jsonify({
        'events': list(reversed(events)),
        'total': len(events)
    })

@app.route('/api/events/realtime', methods=['GET'])
def get_realtime_event():
    """Generate and return a new real-time event"""
    event = generate_security_event()
    security_events.append(event)
    
    # Keep only last 1000 events in memory
    if len(security_events) > 1000:
        security_events.pop(0)
    
    return jsonify(event)

@app.route('/api/threats/map', methods=['GET'])
def get_threat_map():
    """Get threat data for world map visualization"""
    
    # Generate threat locations
    threat_locations = []
    for _ in range(random.randint(10, 25)):
        threat_locations.append({
            'country': random.choice(THREAT_COUNTRIES),
            'lat': random.uniform(-60, 70),
            'lon': random.uniform(-180, 180),
            'severity': random.choice(SEVERITY_LEVELS),
            'count': random.randint(1, 50)
        })
    
    return jsonify({'threats': threat_locations})

@app.route('/api/timeline', methods=['GET'])
def get_timeline():
    """Get events timeline for the last 24 hours"""
    hours = 24
    timeline = []
    
    for i in range(hours):
        hour_time = datetime.now() - timedelta(hours=hours-i)
        timeline.append({
            'time': hour_time.strftime('%H:00'),
            'events': random.randint(10, 100),
            'critical': random.randint(0, 5),
            'high': random.randint(2, 15),
            'medium': random.randint(5, 30)
        })
    
    return jsonify({'timeline': timeline})

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'version': '1.0.0'
    })

if __name__ == '__main__':
    print("🛡️  SOC Dashboard Backend Starting...")
    print("📊 Dashboard: http://localhost:5000")
    print("🔒 Built by Adithya S")
    app.run(debug=True, host='0.0.0.0', port=5000)
