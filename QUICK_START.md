# 🚀 Quick Start Guide

## Prerequisites Needed

1. **Node.js** (includes npm) - Download from https://nodejs.org/ (LTS version)
2. **Web Browser** - Chrome, Firefox, Safari, or Edge
3. **Terminal** - Built-in on macOS/Linux, Command Prompt on Windows

---

## Installation Steps (First Time Only)

### 1. Install Node.js

**macOS:**
- Visit: https://nodejs.org/
- Download the **LTS version** (Long Term Support)
- Double-click the .pkg file and follow installation wizard
- Open Terminal and verify:
  ```bash
  node --version
  npm --version
  ```
- You should see version numbers like `v18.17.0` and `9.6.7`

### 2. Navigate to Project

Open Terminal and run:
```bash
cd /Users/apoorvdeshmukh/truck-unloading-app
```

### 3. Install Dependencies

```bash
npm install
```

Wait 2-5 minutes for all packages to download.

---

## Running the Application (Every Time)

### Start the App

```bash
npm start
```

### What Happens:
1. Terminal shows "Compiling..." then "Compiled successfully!"
2. Browser automatically opens to `http://localhost:3000`
3. You see the "Truck Management System" application

### Stop the App

Press `Ctrl + C` (or `Cmd + C` on Mac) in Terminal

---

## Accessing from Tablet

1. Find your computer's IP address:
   - **macOS:** Open Terminal, run: `ipconfig getifaddr en0`
   - **Windows:** Open Command Prompt, run: `ipconfig`, find "IPv4 Address"

2. Make sure tablet is on same Wi-Fi network

3. On tablet browser, go to:
   ```
   http://YOUR_IP_ADDRESS:3000
   ```
   Example: `http://192.168.1.100:3000`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `node: command not found` | Install Node.js from nodejs.org |
| `npm: command not found` | Node.js not installed correctly, reinstall |
| Port 3000 in use | React will use another port automatically |
| Can't access from tablet | Check Wi-Fi connection, firewall, IP address |

---

## Full Instructions

See `INSTALLATION_GUIDE.md` for detailed step-by-step instructions.

