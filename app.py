"""
Portfolio Dashboard - Flask Backend Server
===========================================
This Flask application serves as the backend for a portfolio dashboard system.
It provides API endpoints for site management and serves the Vue.js frontend.

Features:
- RESTful API for portfolio site data
- CORS proxy to bypass same-origin policy restrictions
- Health check endpoints for monitoring
- Static file serving for Vue.js application
"""

from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import requests
from datetime import datetime

# Initialize Flask application
app = Flask(__name__)

# Enable CORS (Cross-Origin Resource Sharing) to allow requests from different origins
# This is essential for API access from various clients
CORS(app)

# ============================================================================
# SITE CONFIGURATION
# ============================================================================
# Portfolio sites database - can be replaced with actual database in production
SITES = [
    {
        'id': 1,  # Unique identifier for each site
        'url': 'http://76.102.42.17:5100/',  # Full URL to the site
        'title': 'Main Site (Port 5100)',  # Display name
        'description': 'Primary portfolio website',  # Brief description
        'category': 'main'  # Category for filtering (main, projects, blog, docs)
    },
    {
        'id': 2,
        'url': 'http://76.102.42.17:5000/video',
        'title': 'Video Demo',
        'description': 'Video demonstration and media showcase',
        'category': 'projects'
    },
    {
        'id': 3,
        'url': 'https://instructions.online/?id=4610-25-0922-0650-rq200-servoarms_small-now',
        'title': 'Instructions Online',
        'description': 'RQ200 Servo Arms instructions and guide',
        'category': 'docs'
    },
    {
        'id': 4,
        'url': 'http://quest.tny.cc/r200-ServoArmSm_Left-Test',
        'title': 'Quest Test - Servo Arm Left',
        'description': 'R200 ServoArm Left interactive test',
        'category': 'projects'
    }
]

# ============================================================================
# ROUTE HANDLERS
# ============================================================================

@app.route('/')
def home():
    """
    Serve the main Vue.js application
    
    Returns:
        Rendered HTML template containing the Vue.js app
    """
    return render_template('index.html')


@app.route('/api/sites')
def get_sites():
    """
    API endpoint to retrieve all portfolio sites
    
    Returns:
        JSON response containing:
        - success: Boolean indicating if request succeeded
        - data: Array of all site objects
        - timestamp: ISO format timestamp of when data was retrieved
    
    Example Response:
        {
            "success": true,
            "data": [{...}, {...}],
            "timestamp": "2025-12-23T22:20:00.000000"
        }
    """
    return jsonify({
        'success': True,
        'data': SITES,
        'timestamp': datetime.now().isoformat()
    })


@app.route('/api/sites/<int:site_id>')
def get_site(site_id):
    """
    API endpoint to retrieve a specific site by ID
    
    Args:
        site_id (int): The unique identifier of the site to retrieve
    
    Returns:
        JSON response with site data if found, or 404 error if not found
    
    Example Response (Success):
        {
            "success": true,
            "data": {"id": 1, "title": "...", ...}
        }
    
    Example Response (Not Found):
        {
            "success": false,
            "error": "Site not found"
        }
    """
    # Search for the site with matching ID using list comprehension
    site = next((s for s in SITES if s['id'] == site_id), None)
    
    if site:
        return jsonify({
            'success': True,
            'data': site
        })
    
    # Return 404 if site not found
    return jsonify({
        'success': False,
        'error': 'Site not found'
    }), 404


@app.route('/api/proxy')
def proxy_request():
    """
    Proxy endpoint to fetch content from external URLs
    
    This endpoint helps bypass CORS restrictions by making server-side requests
    to external sites and returning the response to the client.
    
    Query Parameters:
        url (str): The external URL to fetch (required)
    
    Returns:
        JSON response containing:
        - success: Boolean indicating if request succeeded
        - status_code: HTTP status code from external site
        - content: First 1000 characters of response (to limit size)
        - headers: Response headers from external site
    
    Security Note:
        Response content is limited to 1000 characters to prevent memory issues
        Request timeout is set to 10 seconds to prevent hanging
    
    Example Usage:
        GET /api/proxy?url=http://example.com
    """
    # Get the target URL from query parameters
    target_url = request.args.get('url')
    
    # Validate that URL parameter was provided
    if not target_url:
        return jsonify({
            'success': False,
            'error': 'URL parameter is required'
        }), 400
    
    try:
        # Make the external request with timeout to prevent hanging
        response = requests.get(target_url, timeout=10)
        
        return jsonify({
            'success': True,
            'status_code': response.status_code,
            'content': response.text[:1000],  # Limit response size for safety
            'headers': dict(response.headers)
        })
    except requests.RequestException as e:
        # Handle any request errors (network issues, timeouts, etc.)
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/health')
def health_check():
    """
    Health check endpoint for monitoring server status
    
    This endpoint can be used by monitoring tools or load balancers
    to verify the server is running properly.
    
    Returns:
        JSON response with:
        - status: "healthy" if server is operational
        - timestamp: Current server time in ISO format
        - service: Name of the service
    """
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'Portfolio Dashboard API'
    })


# ============================================================================
# ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    """
    Handle 404 Not Found errors
    
    Returns:
        JSON error response with 404 status code
    """
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """
    Handle 500 Internal Server Error
    
    Returns:
        JSON error response with 500 status code
    """
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500


# ============================================================================
# APPLICATION STARTUP
# ============================================================================

if __name__ == '__main__':
    # Print startup information to console
    print("=" * 60)
    print("🚀 Starting Portfolio Dashboard Server...")
    print("=" * 60)
    print("📍 Server running at: http://0.0.0.0:8080")
    print("🌐 Access from browser: http://localhost:8080")
    print("=" * 60)
    
    # Start the Flask development server
    # host='0.0.0.0' makes server accessible from any network interface
    # port=8080 specifies the port to listen on
    # debug=True enables auto-reload and detailed error messages (disable in production)
    app.run(host='0.0.0.0', port=8080, debug=True)
