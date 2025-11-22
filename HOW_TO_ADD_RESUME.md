# 📄 How to Add Your Resume

## Quick Steps (2 Minutes)

### Step 1: Prepare Your Resume
1. Make sure your resume is in **PDF format**
2. Name it: `resume.pdf` (lowercase, no spaces)

### Step 2: Add to Public Folder
1. Copy your `resume.pdf` file
2. Paste it into the `public` folder of your project
3. Path should be: `public/resume.pdf`

### Step 3: That's It!
The download button is already configured to use `/resume.pdf`

## 📁 File Location

```
project/
├── public/
│   ├── resume.pdf          ← Put your resume here
│   ├── IMG_20230920_150618_287.jpg
│   ├── AI 2 copy.webp
│   └── ...
├── src/
└── ...
```

## ✅ Verification

After adding your resume:

1. **Start your dev server** (if not running):
   ```bash
   npm run dev
   ```

2. **Test the download**:
   - Go to the About section
   - Click "Download Resume"
   - Your resume should download!

3. **Check the file**:
   - Open: http://localhost:5173/resume.pdf
   - You should see your resume

## 🔧 Alternative: Different Filename

If you want to use a different filename:

1. **Rename your file** (e.g., `Adithya_Resume.pdf`)
2. **Update the config**:
   - Open: `src/config/portfolio.ts`
   - Find: `resumeUrl: '/resume.pdf'`
   - Change to: `resumeUrl: '/Adithya_Resume.pdf'`

## 📝 Resume Tips

### Best Practices
- ✅ Use PDF format (not Word)
- ✅ Keep file size under 2MB
- ✅ Use a professional filename
- ✅ Make sure it's readable
- ✅ Include contact info

### Recommended Tools
- **Canva**: Free resume templates
- **Overleaf**: LaTeX resumes
- **Google Docs**: Export as PDF
- **Microsoft Word**: Save as PDF

## 🚀 For Production

When you deploy your site:
1. Make sure `resume.pdf` is in the `public` folder
2. Build your site: `npm run build`
3. The resume will be included automatically
4. It will be available at: `https://yourdomain.com/resume.pdf`

## 🔒 Privacy Note

Your resume will be **publicly accessible** at:
- Development: `http://localhost:5173/resume.pdf`
- Production: `https://yourdomain.com/resume.pdf`

Anyone with the link can download it. This is normal for portfolio websites!

## 🐛 Troubleshooting

### Resume Not Downloading?

**Problem**: Click doesn't work
**Solution**: 
1. Check file exists: `public/resume.pdf`
2. Check filename is correct (case-sensitive)
3. Restart dev server: `Ctrl+C` then `npm run dev`

**Problem**: 404 Error
**Solution**:
1. Make sure file is in `public` folder (not `src`)
2. Check filename matches config
3. Hard refresh browser: `Ctrl + Shift + R`

**Problem**: Wrong file downloads
**Solution**:
1. Clear browser cache
2. Check you uploaded the right file
3. Verify file in `public/resume.pdf`

## 📊 File Size

Keep your resume under 2MB for fast downloads:
- **Ideal**: 200-500 KB
- **Good**: 500 KB - 1 MB
- **Acceptable**: 1-2 MB
- **Too large**: Over 2 MB

### Reduce PDF Size
- Use online tools: smallpdf.com, ilovepdf.com
- Compress images in your resume
- Remove unnecessary pages
- Use standard fonts

## ✨ Current Setup

Your download button is already configured:
- Location: About section
- Button text: "Download Resume"
- File path: `/resume.pdf`
- Analytics: Tracks downloads ✅

## 🎯 Next Steps

1. **Add your resume**: Copy `resume.pdf` to `public/` folder
2. **Test it**: Click the download button
3. **Deploy**: Your resume will be live!

---

**Need help?** Just ask! 🚀
