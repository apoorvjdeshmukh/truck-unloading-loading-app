# Step-by-Step Installation and Running Guide

## Prerequisites: What You Need

### 1. **Node.js and npm** (JavaScript Runtime and Package Manager)
   - Node.js is required to run the React application
   - npm comes bundled with Node.js

### 2. **A Code Editor** (Optional but recommended)
   - **VS Code** (Visual Studio Code) - Free, recommended
   - Or any text editor like Sublime Text, Atom, etc.

### 3. **A Web Browser**
   - **Chrome** (recommended for development)
   - **Firefox**
   - **Safari** (works well on macOS)
   - **Edge**

### 4. **Terminal/Command Line Application**
   - On macOS: **Terminal** (built-in, found in Applications > Utilities)
   - Or **iTerm2** (enhanced terminal, optional)

---

## Step 1: Install Node.js and npm

### For macOS:

**Option A: Using Homebrew (Recommended)**
1. Open **Terminal** application
2. Install Homebrew if you don't have it:
   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
3. Install Node.js:
   ```bash
   brew install node
   ```
4. Verify installation:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers (e.g., v18.17.0 and 9.6.7)

**Option B: Download from Official Website (Easier)**
1. Open your web browser
2. Go to: https://nodejs.org/
3. Click the **"LTS" (Long Term Support)** version download button (recommended)
4. Download the macOS installer (.pkg file)
5. Double-click the downloaded file and follow the installation wizard
6. Open Terminal and verify:
   ```bash
   node --version
   npm --version
   ```

### For Windows:
1. Go to https://nodejs.org/
2. Download the LTS version installer (.msi file)
3. Run the installer and follow the prompts
4. Open **Command Prompt** or **PowerShell** and verify:
   ```bash
   node --version
   npm --version
   ```

### For Linux:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Verify
node --version
npm --version
```

---

## Step 2: Navigate to Project Directory

1. Open **Terminal** (macOS/Linux) or **Command Prompt/PowerShell** (Windows)
2. Navigate to the project folder:
   ```bash
   cd /Users/apoorvdeshmukh/truck-unloading-app
   ```

   **Alternative:** You can also drag and drop the folder into Terminal to auto-fill the path, or use:
   ```bash
   cd ~/truck-unloading-app
   ```

---

## Step 3: Install Project Dependencies

1. Make sure you're in the project directory (you should see `package.json` file)
2. Run the installation command:
   ```bash
   npm install
   ```

   This will:
   - Read the `package.json` file
   - Download all required packages (React, Tesseract.js, UUID, etc.)
   - Create a `node_modules` folder with all dependencies
   - Take 2-5 minutes depending on your internet speed

   **Expected output:**
   ```
   added 1234 packages, and audited 1235 packages in 45s
   ```

   **If you see any warnings**, that's usually fine. Only errors need attention.

---

## Step 4: Start the Development Server

1. Run the start command:
   ```bash
   npm start
   ```

2. The application will:
   - Compile the React code
   - Start a development server
   - Automatically open your default browser

3. **Expected result:**
   - Terminal shows: `Compiled successfully!`
   - Browser automatically opens to: `http://localhost:3000`
   - You should see the "Truck Management System" application

4. **If browser doesn't open automatically:**
   - Manually open your browser
   - Go to: `http://localhost:3000`

---

## Step 5: Using the Application

### On Desktop/Computer:
- The app will work in your browser
- Use mouse clicks to interact

### On Tablet (Testing):
1. **Find your computer's IP address:**
   - macOS: Open Terminal and run `ipconfig getifaddr en0` (or check System Settings > Network)
   - Windows: Open Command Prompt and run `ipconfig` (look for IPv4 Address)
   - Linux: Run `hostname -I`

2. **Make sure your tablet is on the same Wi-Fi network** as your computer

3. **On your tablet's browser**, go to:
   ```
   http://YOUR_COMPUTER_IP:3000
   ```
   Example: `http://192.168.1.100:3000`

4. The app will work on your tablet just like a native app!

---

## Step 6: Stop the Server

When you're done:
1. Go back to Terminal
2. Press `Ctrl + C` (on Windows) or `Cmd + C` (on macOS)
3. The server will stop

---

## Troubleshooting

### Problem: "node: command not found"
**Solution:** Node.js is not installed or not in your PATH. Follow Step 1 to install Node.js.

### Problem: "npm: command not found"
**Solution:** npm comes with Node.js. Reinstall Node.js following Step 1.

### Problem: "EACCES: permission denied"
**Solution:** On macOS/Linux, don't use `sudo` with npm. If needed, fix npm permissions:
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### Problem: Port 3000 is already in use
**Solution:** Either:
- Stop the other application using port 3000
- Or let React use a different port (it will prompt you)

### Problem: "Module not found" errors
**Solution:** Make sure you ran `npm install` in the project directory. Delete `node_modules` folder and `package-lock.json`, then run `npm install` again.

### Problem: Application doesn't load or shows errors
**Solution:** 
1. Check Terminal for error messages
2. Clear browser cache (Ctrl+Shift+Delete or Cmd+Shift+Delete)
3. Make sure all dependencies installed correctly
4. Try stopping the server (Ctrl+C) and starting again (`npm start`)

### Problem: Can't access from tablet
**Solution:**
1. Make sure both devices are on same Wi-Fi
2. Check firewall settings (temporarily disable to test)
3. Try accessing from computer first using `localhost:3000`
4. Make sure development server is still running

---

## Quick Reference Commands

```bash
# Navigate to project
cd /Users/apoorvdeshmukh/truck-unloading-app

# Install dependencies (first time only)
npm install

# Start the application
npm start

# Stop the application
# Press Ctrl+C (Windows) or Cmd+C (macOS) in Terminal

# If you need to reinstall everything
rm -rf node_modules package-lock.json
npm install
```

---

## Additional Notes

- The application uses **localStorage** to save data, so your data persists even after closing the browser
- For production use, you'd need to build the app: `npm run build`
- The app automatically reloads when you make code changes (hot reload)
- The OCR functionality currently uses mock data - real OCR can be enabled by modifying `src/utils/ocr.js`

---

## Summary Checklist

- [ ] Install Node.js and npm
- [ ] Open Terminal/Command Prompt
- [ ] Navigate to project directory: `cd /Users/apoorvdeshmukh/truck-unloading-app`
- [ ] Install dependencies: `npm install`
- [ ] Start server: `npm start`
- [ ] Open browser to `http://localhost:3000`
- [ ] Test the application!

---

**Need Help?** Check the error messages in Terminal - they usually tell you exactly what's wrong!

