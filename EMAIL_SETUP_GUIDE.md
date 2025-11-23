# Email Contact Form Setup Guide

Your contact form now supports **EmailJS** (recommended) with automatic fallback to FormSubmit.

## ✅ EmailJS Setup (Recommended - 5 Minutes)

EmailJS is more reliable and doesn't require verification. Follow these steps:

### Step 1: Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service
1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps
5. Copy your **Service ID** (e.g., `service_abc123`)

### Step 3: Create Email Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template content:

```
Subject: New Portfolio Contact from {{from_name}}

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save and copy your **Template ID** (e.g., `template_xyz789`)

### Step 4: Get Public Key
1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `abcXYZ123456789`)

### Step 5: Configure Your App
1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your credentials:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcXYZ123456789
```

3. **Important**: Add `.env` to your `.gitignore` (already done)

### Step 6: Deploy Configuration
When deploying to Vercel/Netlify/etc., add these environment variables in your hosting dashboard:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

### Step 7: Test It
1. Run your app: `npm run dev`
2. Fill out the contact form
3. Check your email inbox - you should receive the message!

---

## 🔄 Fallback: FormSubmit (Automatic)

If EmailJS is not configured, the form automatically falls back to FormSubmit.

### Activate FormSubmit (One-Time)
1. Submit a test message through your form
2. Check your email for confirmation from FormSubmit
3. Click the confirmation link
4. Done! Future submissions will be forwarded

---

## 📧 What's Configured

**Form Fields:**
- `from_name` - Sender's name
- `from_email` - Sender's email
- `message` - Message content

**Your Email:** Check `src/config/portfolio.ts`

---

## 🐛 Troubleshooting

### EmailJS not working?
1. Check browser console for errors
2. Verify all 3 environment variables are set correctly
3. Make sure `.env` file is in project root
4. Restart dev server after adding `.env`
5. Check EmailJS dashboard for usage limits (200/month free)

### Still not receiving emails?
1. Check spam/junk folder
2. Verify email service is connected in EmailJS dashboard
3. Test the template directly in EmailJS dashboard
4. Make sure your email provider allows EmailJS

### Environment variables not loading?
- File must be named `.env` (not `.env.local` or `.env.development`)
- Variables must start with `VITE_`
- Restart dev server after changes
- For production, set variables in hosting platform

### Form shows error immediately?
- Open browser console to see detailed error
- Verify EmailJS credentials are correct
- Check network tab for failed requests

---

## 🎯 Benefits of EmailJS

✅ No verification needed
✅ Instant delivery
✅ Custom email templates
✅ Better deliverability
✅ Email tracking/analytics
✅ 200 free emails per month
✅ No spam folder issues

---

## 🔒 Security Note

Never commit your `.env` file to Git! It's already in `.gitignore` to protect your credentials.

---

## 💡 Quick Backup

Users can always click the "Email" button in your contact section to open their default email client.

---

Need help? Check the EmailJS documentation: https://www.emailjs.com/docs/
