# 📱 Access Your Portfolio on Mobile

## Quick Steps

### 1️⃣ Find Your Computer's IP Address

**Windows (PowerShell):**
```powershell
ipconfig
```

Look for **"IPv4 Address"** under your WiFi adapter.
Example: `192.168.1.100`

**Alternative - Quick Command:**
```powershell
(Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias Wi-Fi).IPAddress
```

### 2️⃣ Restart Your Dev Server

**Stop the current server:**
- Press `Ctrl + C` in your terminal

**Start it again:**
```powershell
npm run dev
```

You should now see:
```
➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.XXX:5173/
```

### 3️⃣ Access on Your Phone

1. **Make sure your phone is on the SAME WiFi network** as your computer
2. **Open your phone's browser** (Chrome, Safari, etc.)
3. **Type the Network URL**: `http://192.168.1.XXX:5173/`
   - Replace `XXX` with your actual IP address

## 🔧 Troubleshooting

### Issue: Can't Connect from Phone

**Solution 1: Check Firewall**
Windows Firewall might be blocking the connection.

1. Open Windows Defender Firewall
2. Click "Allow an app through firewall"
3. Find "Node.js" and check both Private and Public
4. Click OK

**Solution 2: Temporarily Disable Firewall (Testing Only)**
```powershell
# Run as Administrator
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled False

# To re-enable later:
Set-NetFirewallProfile -Profile Domain,Public,Private -Enabled True
```

**Solution 3: Check WiFi Network**
- Make sure both devices are on the SAME WiFi network
- Some public WiFi networks block device-to-device communication

### Issue: "Network: use --host to expose"

**Already Fixed!** The vite.config.ts now has `host: true`

Just restart your dev server:
```powershell
npm run dev
```

### Issue: Connection Refused

**Check if server is running:**
```powershell
netstat -ano | findstr :5173
```

If nothing shows up, the server isn't running. Start it:
```powershell
npm run dev
```

## 📋 Quick Reference

### Your URLs:
- **On PC**: `http://localhost:5173/`
- **On Phone**: `http://YOUR_IP:5173/`

### Find IP Address:
```powershell
ipconfig
```

### Restart Server:
```powershell
# Stop: Ctrl + C
# Start:
npm run dev
```

## 🌐 Alternative: Use ngrok (Internet Access)

If you want to access from anywhere (not just local network):

### 1. Install ngrok
Download from: https://ngrok.com/download

### 2. Run ngrok
```powershell
ngrok http 5173
```

### 3. Use the URL
ngrok will give you a public URL like:
```
https://abc123.ngrok.io
```

You can access this from anywhere!

## ✅ Verification Steps

1. **On PC**: Open `http://localhost:5173/` - Should work ✅
2. **Find IP**: Run `ipconfig` - Note your IPv4 address ✅
3. **Restart Server**: `npm run dev` - Should show Network URL ✅
4. **On Phone**: Open `http://YOUR_IP:5173/` - Should work ✅

## 🎯 Expected Output

When you run `npm run dev`, you should see:

```
VITE v5.4.2  ready in 500 ms

➜  Local:   http://localhost:5173/
➜  Network: http://192.168.1.100:5173/
➜  press h + enter to show help
```

Use the **Network** URL on your phone!

## 🔒 Security Note

- This only works on your local network
- Your portfolio is NOT accessible from the internet
- Only devices on the same WiFi can access it
- This is safe for development

## 🚀 For Production

When you deploy your site (Vercel, Netlify, etc.), it will have a public URL that works everywhere:
- Example: `https://adithya-portfolio.vercel.app`
- Accessible from any device, anywhere
- No IP address needed

---

**Need help?** Make sure:
1. ✅ Both devices on same WiFi
2. ✅ Dev server is running
3. ✅ Using the Network URL (not localhost)
4. ✅ Firewall allows Node.js
