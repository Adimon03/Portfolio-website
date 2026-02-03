# 🚀 Adithya S - Portfolio Website

**Modern, responsive portfolio website showcasing my projects, skills, and experience as a Data Analyst and Full Stack Developer.**

![Portfolio Preview](public/AI%202%20copy.webp)

## 🌟 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive**: Engaging user experience with 3D effects and transitions
- **Fast Performance**: Built with Vite for lightning-fast loading
- **SEO Optimized**: Structured for search engine visibility
- **Dark/Light Theme**: Toggle between themes for better user experience

## 🛠️ Tech Stack

- **Frontend**: React 18 + JavaScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Email Service**: EmailJS
- **Deployment**: Netlify

## 📊 Showcased Projects

### 🎯 Featured Projects
- **Business Intelligence Dashboard** - Complete data analysis pipeline analyzing $118.7M in sales data
- **Secure Password Vault** - Zero-knowledge encryption system with AES-256-CBC
- **Customer Intelligence Analytics** - Shopping behavior analysis with Power BI dashboards
- **AI Voice Assistant** - Real-time voice recognition and call summary system
- **Phishing Email Detector** - AI-powered security tool with risk scoring
- **SOC Dashboard** - Cybersecurity monitoring with real-time threat tracking

## 🏆 Certifications

- **IBM Data Analysis with Python** - Coursera Verified
- **IBM Cyber Security Analyst** - IBM Cognitive Class
- **MERN Full Stack Developer** - Ethnus
- **OCI 2025 Certified Generative AI Professional** - Oracle
- **Japanese N4 Course** - Udemy
- **Foundations of Cybersecurity** - Google

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/Adimon03/Portfolio-website.git

# Navigate to project directory
cd Portfolio-website

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
portfolio-website/
├── public/                 # Static assets
│   ├── images/            # Project images and icons
│   └── Resume_adi_new.pdf # Resume file
├── src/
│   ├── components/        # React components (JavaScript)
│   ├── config/           # Portfolio configuration
│   ├── contexts/         # React contexts (Theme)
│   ├── hooks/            # Custom hooks (animations, scroll)
│   └── utils/            # Utility functions (analytics, performance)
├── index.html            # Entry HTML file
└── package.json          # Dependencies and scripts
```

## ⚙️ Configuration

The portfolio content is managed through `src/config/portfolio.js`:

- **Personal Information**: Name, title, contact details
- **Projects**: Project descriptions, technologies, links
- **Skills**: Technical skills and tools
- **Certifications**: Professional certifications with verification links
- **Experience**: Work experience and internships
- **SEO**: Meta tags and social media optimization

## 🎨 Customization

### Adding New Projects
Edit `src/config/portfolio.js` and add your project to the `projects` array:

```javascript
{
  title: 'Your Project Name',
  tags: ['React', 'JavaScript', 'API'],
  description: [
    'Project description line 1',
    'Project description line 2',
  ],
  link: 'https://github.com/username/project',
  image: '/project-image.jpg',
}
```

### Adding New Certifications
Add certifications to the `certifications` array:

```javascript
{
  title: 'Certification Name',
  issuer: 'Issuing Organization',
  icon: '🏆',
  link: 'https://verification-link.com',
}
```

### Updating Personal Information
Modify the `personal` section in `src/config/portfolio.js`:

```javascript
personal: {
  name: 'Your Name',
  title: 'Your Title',
  email: 'your.email@example.com',
  // ... other fields
}
```

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Desktop**: Full-featured experience with animations
- **Tablet**: Adapted layout for medium screens
- **Mobile**: Touch-optimized interface

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **JavaScript**: Modern ES6+ syntax with React best practices
- **ESLint**: Code linting and formatting
- **Modern React**: Hooks, functional components, context API
- **Performance**: Optimized images, lazy loading, and code splitting

## 🌐 Deployment

The portfolio is deployed on Netlify with automatic deployments from the main branch.

**Live Website**: [Portfolio Website](https://your-portfolio-url.netlify.app)

### Deploy Your Own
1. Fork this repository
2. Update `src/config/portfolio.js` with your information
3. Replace images in the `public/` folder with your own
4. Connect to Netlify or your preferred hosting platform
5. Deploy!

### Environment Setup
```bash
# Clone and setup
git clone https://github.com/Adimon03/Portfolio-website.git
cd Portfolio-website
npm install

# Development
npm run dev

# Production build
npm run build
```

## 📞 Contact

**Adithya S**
- **Email**: adithyain03@gmail.com
- **LinkedIn**: [linkedin.com/in/adithya-s07](https://linkedin.com/in/adithya-s07)
- **GitHub**: [github.com/Adimon03](https://github.com/Adimon03)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ by Adithya S**

*Showcasing the intersection of technology, design, and innovation.*