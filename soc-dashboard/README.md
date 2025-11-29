# 🛡️ SOC Dashboard - Security Operations Center

**Real-time Security Monitoring & Threat Intelligence Platform**

Built by **Adithya S**

---

## 🌟 Features

- **Real-time Security Monitoring** - Live threat detection and event tracking
- **Threat Intelligence** - AI-powered threat scoring and risk assessment
- **Attack Analytics** - Visualize attack patterns and trends
- **Incident Management** - Track and respond to security incidents
- **Interactive Dashboard** - Beautiful, responsive UI with live updates
- **Alert System** - Severity-based alert classification

---

## 🚀 Quick Start

### Backend Setup (5 minutes)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python app.py
```

✅ Backend running at **http://localhost:5000**

### Frontend Setup (5 minutes)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend running at **http://localhost:3000**

---

## 📊 What It Does

1. **Monitors Security Events** - Tracks login attempts, network traffic, malware detections
2. **Detects Threats** - Identifies brute force attacks, SQL injections, DDoS attempts
3. **Analyzes Patterns** - Correlates events to identify coordinated attacks
4. **Provides Insights** - Real-time dashboards with threat intelligence
5. **Enables Response** - Helps security teams respond quickly to incidents

---

## 🎯 Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Lucide Icons
- Recharts (for visualizations)

**Backend:**
- Python 3.8+
- Flask
- Flask-CORS

---

## 📸 Features Overview

### Dashboard Components:
- **Threat Score Gauge** - Overall security posture (0-100)
- **Stats Cards** - Total events, critical alerts, blocked attacks
- **Top Attacks** - Most common attack types with visual bars
- **Recent Events** - Live feed of security events
- **Severity Classification** - Critical, High, Medium, Low, Info

### Real-time Updates:
- Dashboard refreshes every 5 seconds
- Events update every 3 seconds
- Live threat score calculation

---

## 🔧 API Endpoints

- `GET /api/dashboard/stats` - Overall statistics
- `GET /api/events/recent` - Recent security events
- `GET /api/events/realtime` - Generate new event
- `GET /api/threats/map` - Threat map data
- `GET /api/timeline` - 24-hour timeline
- `GET /api/health` - Health check

---

## 🎓 Learning Outcomes

This project demonstrates:
- Full-stack development (React + Flask)
- Real-time data processing
- Security monitoring concepts
- Data visualization
- RESTful API design
- Responsive UI/UX

---

## 🚀 Future Enhancements

- [ ] Machine Learning for anomaly detection
- [ ] Threat intelligence feed integration
- [ ] Automated incident response
- [ ] Email/SMS alerts
- [ ] Historical data analysis
- [ ] Compliance reporting (GDPR, HIPAA)
- [ ] Multi-user authentication
- [ ] Export reports (PDF/CSV)

---

## 📝 License

Open source for educational purposes.

---

## 🙏 Acknowledgments

Built as part of cybersecurity portfolio to demonstrate:
- Security Operations Center (SOC) concepts
- SIEM (Security Information and Event Management)
- Threat detection and response
- Real-time monitoring systems

---

**Built with ❤️ by Adithya S**

Repository: https://github.com/Adimon03/soc-dashboard
