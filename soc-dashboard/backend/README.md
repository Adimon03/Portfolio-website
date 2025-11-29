# SOC Dashboard Backend

## Setup

1. Create virtual environment:
```bash
python -m venv venv
```

2. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the server:
```bash
python app.py
```

Server will start on http://localhost:5000

## API Endpoints

- `GET /api/dashboard/stats` - Overall dashboard statistics
- `GET /api/events/recent` - Recent security events
- `GET /api/events/realtime` - Generate new real-time event
- `GET /api/threats/map` - Threat map data
- `GET /api/timeline` - 24-hour event timeline
- `GET /api/health` - Health check

## Built by Adithya S
