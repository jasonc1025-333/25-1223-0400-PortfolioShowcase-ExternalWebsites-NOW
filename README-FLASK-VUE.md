# 🌐 Portfolio Dashboard - Flask + Vue.js

A comprehensive two-tier portfolio dashboard system built with Flask backend and Vue.js frontend, designed to showcase and manage multiple portfolio websites from a centralized hub.

## 📋 Table of Contents

- [Architecture](#architecture)
- [Features](#features)
- [Project Structure](#project-structure)
- [Quick Start](#quick-start)
- [Detailed Setup](#detailed-setup)
- [API Documentation](#api-documentation)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Technology Stack](#technology-stack)

## 🏗️ Architecture

The application follows a **two-tier architecture** with clear separation between backend and frontend:

```
┌─────────────────┐      ┌─────────────────┐      ┌──────────────────┐
│   Browser       │ ←──→ │ Flask Server    │ ←──→ │ External Sites/  │
│  (Vue.js SPA)   │      │  (Python API)   │      │     APIs         │
└─────────────────┘      └─────────────────┘      └──────────────────┘
     Client Side              Server Side              Resources
```

### How It Works:

1. **Flask Backend**: Serves the Vue.js application and provides RESTful API endpoints
2. **Vue.js Frontend**: Single Page Application (SPA) that dynamically renders the UI
3. **API Communication**: Frontend fetches data from backend via JSON REST API
4. **CORS Proxy**: Backend can proxy requests to external sites to bypass CORS restrictions

## ✨ Features

### Backend (Flask) Features
- ✅ RESTful API endpoints for site management
- ✅ CORS support for cross-origin requests
- ✅ Proxy endpoint to bypass CORS restrictions
- ✅ Health check monitoring endpoint
- ✅ Comprehensive error handling
- ✅ JSON response formatting
- ✅ Development server with auto-reload

### Frontend (Vue.js) Features
- ✅ Real-time search functionality
- ✅ Category-based filtering
- ✅ Responsive grid layout
- ✅ Modal detail view
- ✅ Loading and error states
- ✅ Auto-refresh every 5 minutes
- ✅ URL copy to clipboard
- ✅ Smooth animations
- ✅ Mobile-responsive design

## 📁 Project Structure

```
portfolio-dashboard/
├── app.py                      # Flask backend server (main application)
├── requirements.txt            # Python dependencies
├── templates/
│   └── index.html             # HTML template (Vue.js container)
├── static/
│   ├── js/
│   │   └── app.js            # Vue.js application logic
│   └── css/
│       └── style.css         # Stylesheet (all visual styling)
└── README-FLASK-VUE.md       # This documentation file
```

### File Descriptions:

- **app.py**: Flask backend server that handles routing, API endpoints, and serves the Vue.js app
- **requirements.txt**: Lists all Python package dependencies needed to run the server
- **templates/index.html**: Main HTML template that loads Vue.js and provides the app structure
- **static/js/app.js**: Vue.js application with all frontend logic, data management, and interactions
- **static/css/style.css**: Complete stylesheet with responsive design and animations

## 🚀 Quick Start

### Prerequisites

- Python 3.7 or higher
- pip (Python package manager)

### Installation & Running

```bash
# 1. Navigate to the project directory
cd portfolio-dashboard

# 2. Install Python dependencies
pip3 install -r requirements.txt

# 3. Run the Flask server
python3 app.py

# 4. Open your browser and visit
http://localhost:8080
```

The server will start on port 8080 by default. You'll see output like:

```
============================================================
🚀 Starting Portfolio Dashboard Server...
============================================================
📍 Server running at: http://0.0.0.0:8080
🌐 Access from browser: http://localhost:8080
============================================================
```

## 🔧 Detailed Setup

### Step 1: Create Virtual Environment (Recommended)

Using a virtual environment isolates your project dependencies:

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### Step 2: Install Dependencies

**Important: pip vs pip3 inside venv**

When you're inside an activated virtual environment (you see `(venv)` in your terminal prompt), use `pip` instead of `pip3`:

```bash
# Install all required packages (inside venv - use pip, not pip3!)
pip install -r requirements.txt

# Verify installations  
pip list
```

**Why use `pip` (not `pip3`) inside venv?**

- **It's the Python community standard** - This is what all Python developers do
- **Works reliably across all systems** - Avoids permissions and path issues
- **What all tutorials and docs use** - Following conventions makes learning easier
- **pip3 is mainly for distinguishing Python 2 vs 3 outside venv** - Inside venv, `pip` already points to Python 3

Using `pip3` inside a venv can cause it to install packages to your user directory instead of the venv, leading to "ModuleNotFoundError" when running your app.

Expected packages:
- Flask (3.0.0) - Web framework
- flask-cors (4.0.0) - CORS support
- requests (2.31.0) - HTTP library

### Step 3: Configure (Optional)

Edit `app.py` to customize:

```python
# Change server port (default is 8080)
app.run(host='0.0.0.0', port=5000)

# Disable debug mode for production
app.run(host='0.0.0.0', port=8080, debug=False)

# Add or modify sites in SITES array
SITES = [
    {
        'id': 1,
        'url': 'https://your-site.com',
        'title': 'Your Site Title',
        'description': 'Your site description',
        'category': 'main'  # Options: main, projects, blog, docs
    },
    # Add more sites...
]
```

### Step 4: Run the Application

```bash
# Standard mode
python3 app.py

# Run in background (Linux/Mac)
nohup python3 app.py &

# Check if server is running
curl http://localhost:8080/api/health
```

## 📡 API Documentation

### Base URL
```
http://localhost:8080
```

### Endpoints

#### 1. Get All Sites
```http
GET /api/sites
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "url": "http://76.102.42.17:5100/",
      "title": "Main Portfolio Site",
      "description": "Primary portfolio website",
      "category": "main"
    }
  ],
  "timestamp": "2025-12-23T22:20:00.000000"
}
```

#### 2. Get Site by ID
```http
GET /api/sites/<site_id>
```

**Example:**
```bash
curl http://localhost:8080/api/sites/1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "url": "http://76.102.42.17:5100/",
    "title": "Main Portfolio Site",
    "description": "Primary portfolio website",
    "category": "main"
  }
}
```

#### 3. Proxy External Request
```http
GET /api/proxy?url=<external_url>
```

**Example:**
```bash
curl "http://localhost:8080/api/proxy?url=http://example.com"
```

**Response:**
```json
{
  "success": true,
  "status_code": 200,
  "content": "<!DOCTYPE html>...",
  "headers": {
    "Content-Type": "text/html",
    ...
  }
}
```

#### 4. Health Check
```http
GET /api/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-23T22:20:00.000000",
  "service": "Portfolio Dashboard API"
}
```

### Error Responses

All errors follow this format:

```json
{
  "success": false,
  "error": "Error message here"
}
```

**HTTP Status Codes:**
- 200: Success
- 400: Bad Request (missing parameters)
- 404: Not Found (endpoint or resource doesn't exist)
- 500: Internal Server Error

## 🎨 Customization Guide

### Adding New Portfolio Sites

Edit the `SITES` array in `app.py`:

```python
SITES = [
    {
        'id': 1,                           # Unique ID (increment for each)
        'url': 'https://example.com',      # Full URL
        'title': 'Example Site',           # Display name
        'description': 'Description here', # Brief description
        'category': 'projects'             # Category for filtering
    },
    # Add more sites here...
]
```

**Available Categories:**
- `main` - Main portfolio sites
- `projects` - Project showcases
- `blog` - Blog and articles
- `docs` - Documentation sites

### Changing Colors and Styling

Edit CSS variables in `static/css/style.css`:

```css
:root {
    --primary-color: #3b82f6;      /* Change primary color */
    --secondary-color: #1e40af;    /* Change secondary color */
    --success-color: #10b981;      /* Change success color */
    /* Add more customizations... */
}
```

### Modifying the Server Port

In `app.py`, change the port number:

```python
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)  # Change 8080 to any port
```

### Adding New Categories

1. Add category to `SITES` in `app.py`
2. Add category to `categories` array in `static/js/app.js`:

```javascript
categories: ['all', 'main', 'projects', 'blog', 'docs', 'new-category']
```

3. Add category color in `getCategoryColor()` method:

```javascript
getCategoryColor(category) {
    const colors = {
        'new-category': '#ff6b6b'  // Add your category color
    };
    return colors[category] || '#6b7280';
}
```

### Changing Auto-Refresh Interval

In `static/js/app.js`, modify the `mounted()` lifecycle hook:

```javascript
mounted() {
    this.fetchSites();
    
    // Change 300000 (5 minutes) to desired milliseconds
    setInterval(() => {
        this.fetchSites();
    }, 600000);  // Example: 10 minutes
}
```

## 🚀 Deployment

### Development Server (Current Setup)

The built-in Flask development server is suitable for:
- Local development
- Testing
- Small-scale personal use

**Not recommended for production!**

### Production Deployment

For production environments, use a production-ready WSGI server:

#### Option 1: Gunicorn (Linux/Mac)

```bash
# Install Gunicorn
pip install gunicorn

# Run with 4 worker processes
gunicorn -w 4 -b 0.0.0.0:8080 app:app

# Run in daemon mode
gunicorn -w 4 -b 0.0.0.0:8080 app:app --daemon
```

#### Option 2: Waitress (Windows-friendly)

```bash
# Install Waitress
pip install waitress

# Run server
waitress-serve --host=0.0.0.0 --port=8080 app:app
```

#### Option 3: Docker

Create `Dockerfile`:

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt gunicorn

COPY . .

EXPOSE 8080
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:8080", "app:app"]
```

Build and run:

```bash
docker build -t portfolio-dashboard .
docker run -p 8080:8080 portfolio-dashboard
```

### Environment Variables

For production, use environment variables for configuration:

```python
import os

# In app.py
PORT = int(os.environ.get('PORT', 8080))
DEBUG = os.environ.get('DEBUG', 'False') == 'True'

app.run(host='0.0.0.0', port=PORT, debug=DEBUG)
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use

**Error:** `Address already in use`

**Solution:**
```bash
# Find process using port 8080
lsof -i :8080

# Kill the process
kill -9 <PID>

# Or use a different port in app.py
```

#### 2. Module Not Found Error

**Error:** `ModuleNotFoundError: No module named 'flask'`

**Solution:**
```bash
# Ensure you're in the right environment
pip install -r requirements.txt

# Or install packages individually
pip install Flask flask-cors requests
```

#### 3. CORS Errors in Browser

**Error:** `Access to fetch at '...' from origin '...' has been blocked by CORS policy`

**Solution:**
- Use the `/api/proxy` endpoint to fetch external content
- Ensure flask-cors is installed and CORS(app) is called

#### 4. Sites Not Loading

**Symptoms:** Page loads but shows "Loading portfolio sites..." forever

**Solutions:**
1. Check Flask server is running
2. Open browser console (F12) to see error messages
3. Verify API endpoint: `curl http://localhost:8080/api/sites`
4. Check for JavaScript errors in console

#### 5. Changes Not Reflecting

**Solution:**
```bash
# Flask auto-reloads in debug mode, but if needed:
# Stop server (Ctrl+C) and restart
python3 app.py

# Clear browser cache
# Chrome/Firefox: Ctrl+Shift+Delete
# Or hard refresh: Ctrl+Shift+R (or Cmd+Shift+R on Mac)
```

### Debug Mode

To see detailed error messages, ensure debug mode is enabled in `app.py`:

```python
app.run(host='0.0.0.0', port=8080, debug=True)
```

### Testing the API

Test individual endpoints with curl:

```bash
# Test health endpoint
curl http://localhost:8080/api/health

# Test sites endpoint
curl http://localhost:8080/api/sites

# Test specific site
curl http://localhost:8080/api/sites/1

# Test with verbose output
curl -v http://localhost:8080/api/sites
```

## 💻 Technology Stack

### Backend
- **Flask 3.0.0** - Lightweight Python web framework
- **flask-cors 4.0.0** - Cross-Origin Resource Sharing support
- **requests 2.31.0** - HTTP library for making external requests

### Frontend
- **Vue.js 3** - Progressive JavaScript framework (loaded from CDN)
- **Vanilla CSS3** - Custom styling with modern CSS features
- **Fetch API** - Modern browser API for HTTP requests

### Development Tools
- **Python 3.7+** - Programming language
- **pip** - Package manager for Python
- **VSCode** - Recommended code editor

## 📝 Best Practices Implemented

### Code Organization
- ✅ Clear separation of concerns (backend/frontend)
- ✅ Modular code structure
- ✅ Comprehensive comments throughout
- ✅ Consistent naming conventions

### Security
- ✅ CORS properly configured
- ✅ Request timeouts prevent hanging
- ✅ Response size limiting
- ✅ Error messages don't expose sensitive info
- ✅ External links open in new tabs

### User Experience
- ✅ Loading states for async operations
- ✅ Error handling with user-friendly messages
- ✅ Empty states for better feedback
- ✅ Smooth animations and transitions
- ✅ Responsive design for all devices

### Performance
- ✅ Computed properties for efficient filtering
- ✅ Minimal DOM manipulation
- ✅ Lazy loading patterns
- ✅ Auto-refresh at reasonable intervals

## 🤝 Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add comments to new code
5. Test thoroughly
6. Submit a pull request

## 📄 License

This project is open source and available for personal and commercial use.

## 📞 Support

For issues or questions:
1. Check the troubleshooting section
2. Review the detailed comments in the code
3. Test API endpoints with curl
4. Check browser console for errors

## 🎯 Use Cases

This dashboard is perfect for:

- 📱 **Developers** - Showcase multiple portfolio projects
- 🏢 **Agencies** - Display client websites in one place
- 🎨 **Designers** - Centralize design work portfolios
- 📚 **Educators** - Organize course resources and demos
- 🚀 **Startups** - Manage multiple product sites

## 🌟 Future Enhancements

Possible improvements:
- Database integration (PostgreSQL, MongoDB)
- User authentication and authorization
- Admin panel for managing sites
- Site status monitoring
- Analytics integration
- Dark mode toggle
- Export functionality
- Site screenshots/thumbnails
- Search history
- Favorites/bookmarks

---

**Built with ❤️ using Flask and Vue.js**

Last Updated: December 23, 2025
