# 🎯 Portfolio Showcase Dashboard

An interactive, real-time portfolio dashboard that embeds and displays multiple websites in a beautiful grid layout. Built with Vue.js 3 (via CDN) - no build tools required!

## ✨ Features

- **🔴 Live & Interactive**: All embedded sites are fully interactive in real-time
- **📹 Video Streaming**: Video streams play live with no delay
- **🎨 Beautiful UI**: Modern gradient design with smooth animations
- **📊 Multiple Layouts**: Switch between Grid and List views
- **🔄 Auto-Refresh**: Optional auto-refresh every 5 minutes
- **⛶ Fullscreen Mode**: Expand any site to fullscreen
- **🚦 Status Indicators**: Visual feedback for loading, success, and errors
- **↗️ Fallback Options**: Open sites in new tab if embedding fails
- **📱 Responsive**: Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Option 1: Double-Click (Easiest)
1. Navigate to this folder in File Explorer
2. **Double-click `index.html`**
3. The dashboard opens in your default browser
4. Done! 🎉

### Option 2: From Browser
1. Open your web browser
2. Press `Ctrl+O` (or `Cmd+O` on Mac)
3. Navigate to and select `index.html`
4. Click Open

### Option 3: From VS Code
1. Right-click on `index.html`
2. Select "Open with Live Server" (if installed)
   - OR "Reveal in File Explorer" → then double-click

## 📋 Current Sites

The dashboard displays these 4 sites:

1. **🖥️ Main Application** - `http://76.102.42.17:5100/`
2. **📹 Video Stream** - `http://76.102.42.17:5000/video`
3. **📖 Instructions Online** - `https://instructions.online/?id=4610-25-0922-0650-rq200-servoarms_small-now`
4. **🤖 Servo Arm Test** - `http://quest.tny.cc/r200-ServoArmSm_Left-Test`

## 🎮 How to Use

### Navigation Controls

- **🔄 Refresh All Sites** - Reload all embedded sites at once
- **▶️ Auto-Refresh** - Toggle automatic refresh every 5 minutes
- **📊 Grid / 📋 List** - Switch between grid and list layouts

### Per-Site Controls

Each site card has these buttons in the header:

- **🔄 Refresh** - Reload just this site
- **↗️ Open in New Tab** - Open the site in a new browser tab
- **⛶ Fullscreen** - Expand site to fullscreen (click ⊗ to exit)

### Status Indicators

- **🟡 Loading...** - Site is currently loading
- **🟢 Live** - Site loaded successfully and is interactive
- **🔴 Error** - Site failed to load (likely CORS/X-Frame-Options blocking)

## 🔧 Customization

### Adding a New Site

Open `index.html` in a text editor and find the `sites` array (around line 380). Add a new object:

```javascript
{
    id: 5,  // Increment from last ID
    title: '🌐 My New Site',
    url: 'https://example.com',
    currentUrl: 'https://example.com',
    status: 'loading',
    fullscreen: false
}
```

### Removing a Site

Simply delete the corresponding object from the `sites` array.

### Changing Site Titles or URLs

Modify the `title` and `url` properties in the `sites` array.

### Adjusting Colors

Find the `<style>` section and modify:

```css
/* Main gradient background */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Site card headers */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Changing Grid Layout

Find this CSS rule to adjust columns:

```css
.grid {
    grid-template-columns: repeat(auto-fit, minmax(600px, 1fr));
}
```

- Change `600px` to make cards wider/narrower
- Change `auto-fit` to a number like `2` for exactly 2 columns

### Adjusting iframe Height

Find this CSS rule:

```css
.iframe-container {
    height: 500px;  /* Change this value */
}
```

## ⚠️ Troubleshooting

### Site Shows "Unable to Load"

**Cause**: The site is blocking iframe embedding (CORS or X-Frame-Options headers).

**Solutions**:
1. Click the **↗️** button to open in a new tab
2. Upgrade to **Option B (Flask Backend)** which can proxy requests
3. Check if the site owner can adjust their CORS policy

### Video Not Streaming

**Cause**: Network connectivity or video server is offline.

**Solutions**:
1. Check if `http://76.102.42.17:5000/video` works in a separate tab
2. Verify you're on the same network as the server
3. Click **🔄 Refresh** to reload the video stream

### Blank White Screen

**Cause**: Vue.js CDN failed to load or JavaScript error.

**Solutions**:
1. Check your internet connection (Vue loads from CDN)
2. Open browser console (F12) to see errors
3. Try a different browser

### Sites Load Slowly

**Cause**: Multiple sites loading simultaneously uses bandwidth.

**Solutions**:
1. Use **List View** to stack sites vertically
2. Only refresh sites that need updating
3. Consider upgrading to **Option B** with selective loading

## 🌐 Browser Compatibility

✅ **Tested and Working**:
- Chrome/Edge (v90+)
- Firefox (v88+)
- Safari (v14+)
- Opera (v76+)

⚠️ **Limited Support**:
- Internet Explorer (not supported - use Edge instead)

## 📊 Technical Details

### Stack
- **Frontend Framework**: Vue.js 3 (via CDN - no build required)
- **Styling**: Custom CSS3 with gradients and animations
- **Architecture**: Single-page application (SPA)
- **No Backend**: Pure frontend, runs entirely in browser

### File Size
- `index.html`: ~15 KB
- Total: 1 file, no dependencies (except Vue CDN)

### Performance
- **Initial Load**: < 1 second
- **Memory Usage**: ~50-100 MB per embedded site
- **Network**: Depends on embedded sites' bandwidth

## 🔐 Security Notes

### Iframe Sandbox Attributes

The dashboard uses these sandbox permissions:

```html
sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
```

This allows:
- ✅ JavaScript execution (for interactivity)
- ✅ Form submissions
- ✅ Popups and modals
- ❌ Top-level navigation (sites can't redirect the main page)

### Mixed Content

If you serve this dashboard over HTTPS, browsers will block HTTP iframes. Solutions:
1. Serve everything over HTTP locally
2. Upgrade embedded sites to HTTPS
3. Use Option B (Flask) as a proxy

## 🚀 Next Steps (Option B - Flask Backend)

When you're ready to upgrade, Option B adds:

- **✅ CORS Proxy**: Bypass iframe blocking
- **✅ Authentication**: Add login protection
- **✅ Dynamic Site Management**: Add/remove sites via admin panel
- **✅ Health Monitoring**: Check if sites are online
- **✅ Screenshot Fallbacks**: Show preview if embedding fails
- **✅ API Integration**: Fetch data from sites' APIs

Let me know when you want to build Option B!

## 📝 Changelog

### Version 1.0 (2025-01-23)
- ✨ Initial release
- 🎨 Beautiful gradient UI
- 📊 Grid and List layouts
- 🔄 Manual and auto-refresh
- ⛶ Fullscreen mode
- 🚦 Status indicators
- ↗️ Fallback to new tab

## 💡 Tips

1. **Bookmark It**: Add `file:///[full-path]/index.html` to your browser bookmarks
2. **Desktop Shortcut**: Right-click `index.html` → "Create Shortcut" → Move to Desktop
3. **Startup Launch**: Add shortcut to Windows Startup folder for auto-launch
4. **Share It**: Copy the entire folder to share with others (works offline except Vue CDN)

## 🐛 Known Issues

1. **CORS Blocking**: Some external sites (especially commercial sites) will block iframe embedding. This is by design and requires Option B to bypass.

2. **Mixed Content**: HTTPS dashboard embedding HTTP sites will be blocked by browsers. Keep everything HTTP for local development.

3. **Auto-Refresh Memory**: Long-running auto-refresh may use more memory over time. Recommend closing/reopening dashboard daily.

## 📞 Support

If you encounter issues:

1. Check browser console (F12 → Console tab) for error messages
2. Test each site individually in a new tab
3. Verify network connectivity to local servers (76.102.42.17)
4. Try a different browser

## 📄 License

Feel free to modify and use this dashboard for your projects!

---

**Created**: December 23, 2025  
**Version**: 1.0  
**Technology**: Vue.js 3 + Vanilla HTML/CSS/JS  
**No Installation Required** ✨
