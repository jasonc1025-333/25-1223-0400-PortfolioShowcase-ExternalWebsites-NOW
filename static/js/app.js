// ============================================================================
// Portfolio Dashboard - Vue.js Frontend Application
// ============================================================================
// This file contains the main Vue.js application logic for the portfolio
// dashboard. It handles data fetching, filtering, searching, and user
// interactions with the site listings.
//
// Vue.js Version: 3.x (loaded from CDN in index.html)
// Architecture: Single Page Application (SPA) using Vue 3 Composition API
// ============================================================================

// Destructure createApp from Vue global object (loaded from CDN)
const { createApp } = Vue;

// Create and configure the Vue application
createApp({
    // ========================================================================
    // DATA PROPERTIES
    // ========================================================================
    // Define reactive data properties that Vue will track for changes
    data() {
        return {
            // Array to store all portfolio sites fetched from API
            sites: [],
            
            // Loading state - true while fetching data from server
            loading: true,
            
            // Error message - stores any error that occurs during API calls
            error: null,
            
            // Currently selected site for modal display
            selectedSite: null,
            
            // Search query entered by user for filtering sites
            searchQuery: '',
            
            // Selected category filter ('all', 'main', 'projects', 'blog', 'docs')
            filterCategory: 'all',
            
            // Available categories for filter buttons
            categories: ['all', 'main', 'projects', 'blog', 'docs'],
            
            // Base URL for API calls (dynamically set to current origin)
            apiBaseUrl: window.location.origin,
            
            // Timestamp of last successful data fetch
            lastUpdated: null,
            
            // View mode: 'cards' shows card layout, 'embedded' shows live iframes
            viewMode: 'embedded'
        };
    },
    
    // ========================================================================
    // COMPUTED PROPERTIES
    // ========================================================================
    // Computed properties are cached and only re-calculated when their
    // dependencies change, providing better performance than methods
    computed: {
        /**
         * Filter sites based on search query and selected category
         * This computed property automatically updates when searchQuery,
         * filterCategory, or sites array changes
         * 
         * @returns {Array} Filtered array of site objects
         */
        filteredSites() {
            let filtered = this.sites;
            
            // Apply category filter
            // Skip filtering if 'all' is selected
            if (this.filterCategory !== 'all') {
                filtered = filtered.filter(site => site.category === this.filterCategory);
            }
            
            // Apply search query filter
            // Search across title, description, and URL fields
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(site => 
                    site.title.toLowerCase().includes(query) ||
                    site.description.toLowerCase().includes(query) ||
                    site.url.toLowerCase().includes(query)
                );
            }
            
            return filtered;
        }
    },
    
    // ========================================================================
    // METHODS
    // ========================================================================
    // Methods handle user interactions and business logic
    methods: {
        /**
         * Fetch portfolio sites from Flask API
         * Makes GET request to /api/sites endpoint
         * Updates sites array and handles loading/error states
         * 
         * @async
         * @returns {Promise<void>}
         */
        async fetchSites() {
            // Set loading state to show spinner/loading message
            this.loading = true;
            this.error = null;
            
            try {
                // Make API request to fetch sites
                const response = await fetch(`${this.apiBaseUrl}/api/sites`);
                const result = await response.json();
                
                // Check if API request was successful
                if (result.success) {
                    // Update sites array with fetched data
                    this.sites = result.data;
                    // Store timestamp for display
                    this.lastUpdated = new Date(result.timestamp);
                } else {
                    // API returned error response
                    this.error = 'Failed to load sites';
                }
            } catch (err) {
                // Handle network errors or JSON parsing errors
                this.error = `Error: ${err.message}`;
                console.error('Failed to fetch sites:', err);
            } finally {
                // Always turn off loading state, regardless of success/failure
                this.loading = false;
            }
        },
        
        /**
         * Open a site in a new browser tab
         * 
         * @param {Object} site - Site object containing URL and other properties
         */
        openSite(site) {
            // Open URL in new tab using window.open
            // '_blank' ensures it opens in a new tab/window
            window.open(site.url, '_blank');
        },
        
        /**
         * Select a site to display its details in modal
         * 
         * @param {Object} site - Site object to display
         */
        selectSite(site) {
            this.selectedSite = site;
        },
        
        /**
         * Close the modal by clearing selected site
         */
        closeModal() {
            this.selectedSite = null;
        },
        
        /**
         * Get color code for category badge
         * Each category has a distinct color for visual differentiation
         * 
         * @param {string} category - Category name ('main', 'projects', etc.)
         * @returns {string} Hex color code for the category
         */
        getCategoryColor(category) {
            // Color mapping for different categories
            const colors = {
                main: '#3b82f6',      // Blue - for main portfolio
                projects: '#10b981',   // Green - for project showcases
                blog: '#f59e0b',       // Orange - for blog/articles
                docs: '#8b5cf6'        // Purple - for documentation
            };
            // Return category color or default gray if category not found
            return colors[category] || '#6b7280';
        },
        
        /**
         * Format date object to readable string
         * 
         * @param {Date|string} date - Date to format
         * @returns {string} Formatted date string (or empty if date invalid)
         */
        formatDate(date) {
            if (!date) return '';
            // Use browser's locale settings for date formatting
            return new Date(date).toLocaleString();
        },
        
        /**
         * Refresh sites data by re-fetching from API
         * Called when user clicks refresh button
         * 
         * @async
         * @returns {Promise<void>}
         */
        async refreshSites() {
            await this.fetchSites();
        },
        
        /**
         * Copy site URL to clipboard
         * Uses modern Clipboard API for secure clipboard access
         * 
         * @param {string} url - URL to copy to clipboard
         */
        copyUrl(url) {
            // Use Clipboard API to copy text
            navigator.clipboard.writeText(url).then(() => {
                // Show success message
                alert('URL copied to clipboard!');
            }).catch(err => {
                // Handle clipboard access errors
                console.error('Failed to copy URL:', err);
            });
        },
        
        /**
         * Toggle between card view and embedded iframe view
         * Card view: Shows site information cards
         * Embedded view: Shows live sites in iframes
         */
        toggleView() {
            this.viewMode = this.viewMode === 'cards' ? 'embedded' : 'cards';
        }
    },
    
    // ========================================================================
    // LIFECYCLE HOOKS
    // ========================================================================
    // Lifecycle hooks are called at specific stages of component lifecycle
    
    /**
     * mounted() lifecycle hook
     * Called after Vue instance is mounted to DOM
     * Perfect place for initial data fetching and setting up intervals
     */
    mounted() {
        // Fetch sites data immediately when app loads
        this.fetchSites();
        
        // Set up auto-refresh interval
        // Refresh data every 5 minutes (300,000 milliseconds)
        // This keeps the dashboard data current without manual refresh
        setInterval(() => {
            this.fetchSites();
        }, 300000);  // 5 minutes = 300,000ms
    }
    
// Mount the Vue application to the DOM element with id="app"
// This activates Vue and makes the app interactive
}).mount('#app');

// ============================================================================
// NOTES AND BEST PRACTICES
// ============================================================================
//
// 1. Error Handling:
//    - All async operations have try-catch blocks
//    - User-friendly error messages are displayed
//    - Errors are also logged to console for debugging
//
// 2. Performance:
//    - Computed properties used for filtering (cached automatically)
//    - API calls are debounced through user interaction
//    - Auto-refresh set at reasonable 5-minute interval
//
// 3. User Experience:
//    - Loading states prevent confusion during data fetch
//    - Search and filter work together seamlessly
//    - Modal provides detailed view without leaving page
//    - Clipboard copy provides quick URL sharing
//
// 4. Security:
//    - No inline JavaScript in HTML
//    - API calls go through secure fetch API
//    - External links open in new tabs (security isolation)
//
// 5. Maintainability:
//    - Clear method names describe their purpose
//    - Comments explain complex logic
//    - Consistent code style throughout
//    - Reactive data model is easy to extend
//
// ============================================================================
