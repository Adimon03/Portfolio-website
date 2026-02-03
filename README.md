# 🚀 Adithya S - Portfolio Website

**Modern, responsive portfolio website showcasing my projects, skills, and experience as a Data Analyst and Full Stack Developer.**

![Portfolio Preview](public/AI%202%20copy.webp)

## 🌟 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive**: Optimized for all devices (desktop, tablet, mobile)
- **Interactive**: Engaging user experience with 3D effects and transitions
- **Fast Performance**: Built with Vite for lightning-fast loading
- **SEO Optimized**: Structured for search engine visibility

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📊 Showcased Projects

### 🎯 Featured Projects
- **Business Intelligence Dashboard** - Complete data analysis pipeline with Power BI
- **Secure Password Vault** - Zero-knowledge encryption system
- **AI Voice Assistant** - Real-time voice recognition system
- **Phishing Email Detector** - AI-powered security tool
- **SOC Dashboard** - Cybersecurity monitoring system

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
│   ├── components/        # React components
│   ├── config/           # Portfolio configuration
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom hooks
│   └── utils/            # Utility functions
├── index.html            # Entry HTML file
└── package.json          # Dependencies and scripts
```

## ⚙️ Configuration

The portfolio content is managed through `src/config/portfolio.ts`:

- **Personal Information**: Name, title, contact details
- **Projects**: Project descriptions, technologies, links
- **Skills**: Technical skills and tools
- **Certifications**: Professional certifications
- **Experience**: Work experience and internships

## 🎨 Customization

### Adding New Projects
Edit `src/config/portfolio.ts` and add your project to the `projects` array:

```typescript
{
  title: 'Your Project Name',
  tags: ['React', 'TypeScript', 'API'],
  description: [
    'Project description line 1',
    'Project description line 2',
  ],
  link: 'https://github.com/username/project',
  image: '/project-image.jpg',
}
```

### Updating Personal Information
Modify the `personal` section in `src/config/portfolio.ts`:

```typescript
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
- **TypeScript**: Type-safe development
- **ESLint**: Code linting and formatting
- **Modern React**: Hooks, functional components
- **Performance**: Optimized images and lazy loading

## 🌐 Deployment

The portfolio is deployed on Netlify with automatic deployments from the main branch.

**Live Website**: [Your Portfolio URL]

### Deploy Your Own
1. Fork this repository
2. Update `src/config/portfolio.ts` with your information
3. Connect to Netlify or your preferred hosting platform
4. Deploy!

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