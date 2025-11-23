# EmailJS Quick Start - 5 Minutes ⚡

## 1️⃣ Create Account (1 min)
- Go to https://www.emailjs.com/
- Sign up (free - 200 emails/month)
- Verify your email

## 2️⃣ Add Email Service (2 min)
- Dashboard → **Email Services** → **Add New Service**
- Choose Gmail/Outlook/Yahoo
- Connect your email
- Copy **Service ID** (looks like: `service_abc123`)

## 3️⃣ Create Template (1 min)
- Dashboard → **Email Templates** → **Create New Template**
- Paste this:

```
Subject: New Contact from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}
```

- Save and copy **Template ID** (looks like: `template_xyz789`)

## 4️⃣ Get Public Key (30 sec)
- Dashboard → **Account** → **General**
- Copy **Public Key** (looks like: `abcXYZ123456789`)

## 5️⃣ Configure App (30 sec)
Create `.env` file in project root:

```env
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=abcXYZ123456789
```

Replace with your actual IDs!

## 6️⃣ Test (30 sec)
```bash
npm run dev
```

Fill out your contact form → Check your email! 🎉

---

## For Deployment (Vercel/Netlify)

Add these 3 environment variables in your hosting dashboard:
- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

---

## ⚠️ Important
- Never commit `.env` file (already in .gitignore)
- Restart dev server after creating `.env`
- Free tier: 200 emails/month

---

## 🆘 Not Working?
1. Check browser console for errors
2. Verify all 3 variables in `.env`
3. Restart dev server
4. Check spam folder
5. See full guide: `EMAIL_SETUP_GUIDE.md`
