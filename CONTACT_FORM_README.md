# 📧 Contact Form - Ready to Use!

Your contact form is now set up with **EmailJS** (with automatic FormSubmit fallback).

## 🚀 Quick Setup (5 minutes)

### Option 1: EmailJS (Recommended)
Follow the simple guide: **`EMAILJS_QUICKSTART.md`**

### Option 2: FormSubmit (Automatic Fallback)
If you don't configure EmailJS, the form automatically uses FormSubmit:
1. Submit a test message
2. Check your email for confirmation
3. Click the link
4. Done!

## 📁 Files Created

- `.env.example` - Template for your credentials
- `EMAILJS_QUICKSTART.md` - 5-minute setup guide
- `EMAIL_SETUP_GUIDE.md` - Detailed documentation
- `CONTACT_FORM_README.md` - This file

## ✅ What's Working Now

✨ **Smart Dual System:**
- Tries EmailJS first (if configured)
- Falls back to FormSubmit automatically
- Shows clear success/error messages
- Includes your email in error messages

✨ **Form Features:**
- Name, Email, Message fields
- Loading state with spinner
- Success/error notifications
- Sound effects on submit
- Auto-reset after success
- Fully responsive design

## 🎯 Next Steps

1. **For Development:**
   - Create `.env` file (copy from `.env.example`)
   - Add your EmailJS credentials
   - Restart dev server

2. **For Production:**
   - Add environment variables in hosting dashboard
   - Test the form after deployment
   - Check spam folder for first email

## 🔗 Quick Links

- EmailJS Dashboard: https://www.emailjs.com/
- EmailJS Docs: https://www.emailjs.com/docs/
- FormSubmit: https://formsubmit.co/

## 💡 Tips

- EmailJS free tier: 200 emails/month
- FormSubmit: Unlimited but requires verification
- Both services are reliable and free
- Your email is in `src/config/portfolio.ts`

---

**Need help?** Check `EMAILJS_QUICKSTART.md` for step-by-step instructions!
