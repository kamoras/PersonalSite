# Ryan Mack - Personal Portfolio

[![Azure Static Web Apps CI/CD](https://github.com/kamoras/PersonalSite/actions/workflows/azure-static-web-apps-calm-cliff-026fb3d10.yml/badge.svg)](https://github.com/kamoras/PersonalSite/actions/workflows/azure-static-web-apps-calm-cliff-026fb3d10.yml)

A modern, responsive personal portfolio website built with React, TypeScript, and Tailwind CSS. Features a clean design with smooth animations, dark/light mode toggle, and comprehensive career timeline.

🌐 **Live Site**: [ryan-mack.dev](https://ryan-mack.dev)

## ✨ Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Mobile-first design that works on all devices
- **Dark Mode**: Automatic system preference detection with manual toggle
- **Smooth Navigation**: Seamless scrolling between sections
- **Interactive Timeline**: Professional career history with company logos
- **Accessible**: Semantic HTML, ARIA labels, and keyboard navigation
- **Fast Performance**: Built with Vite for optimal loading speeds

## 🛠️ Tech Stack

- **Frontend**: React 19.1.0 + TypeScript 5.8.3
- **Styling**: Tailwind CSS 4.1.10
- **Build Tool**: Vite 6.3.5
- **Icons**: React Icons 5.5.0
- **Testing**: Vitest + React Testing Library
- **Deployment**: Azure Static Web Apps

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/kamoras/PersonalSite.git
   cd PersonalSite
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```
   
   The site will be available at `http://localhost:3000`

### Additional Commands

- **Build for production**: `npm run build`
- **Preview production build**: `npm run preview`
- **Run tests**: `npm test`
- **Deploy to GitHub Pages**: `npm run deploy`

## 📁 Project Structure

```text
src/
├── components/
│   ├── about.tsx          # About section component
│   ├── introduction.tsx   # Hero/introduction section
│   ├── sidebar.tsx        # Navigation sidebar with profile
│   ├── timeline.tsx       # Career timeline component
│   └── __tests__/         # Component tests
├── App.tsx                # Main application component
├── index.css              # Global styles and Tailwind directives
└── index.tsx              # Application entry point

public/
├── documents/
│   └── Ryan-M-Mack-Resume.pdf
└── images/
    ├── ryan.jpg           # Profile picture
    ├── penn.avif          # University logo
    └── [company-logos]    # Various company logos
```

## 🎨 Key Components

### Sidebar Navigation

- **Profile Section**: Clickable profile picture with smooth scroll to top
- **Navigation Menu**: Smooth scrolling to page sections
- **Social Links**: GitHub and LinkedIn integration
- **Dark Mode Toggle**: System preference detection with manual override

### Timeline Component

- **Modular Design**: Easily configurable company/position data
- **Company Logos**: Dynamic logo loading with fallback handling  
- **Responsive Layout**: Adapts beautifully to all screen sizes
- **Hover Effects**: Interactive cards with smooth transitions

### Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Hamburger Menu**: Collapsible navigation on smaller screens
- **Touch-Friendly**: Large tap targets and smooth interactions

## 🎯 Customization

### Adding New Timeline Entries

Edit `src/components/timeline.tsx` and update the `timelineData` array:

```typescript
const timelineData = [
  {
    company: "Your Company",
    position: "Your Position", 
    duration: "Start Date - End Date",
    description: "Brief description of your role and achievements.",
    logo: "your-company-logo.png" // Place in public/images/
  },
  // ... more entries
];
```

### Updating Profile Information

1. **Profile Picture**: Replace `public/images/ryan.jpg`
2. **Contact Info**: Update email in `src/components/sidebar.tsx`
3. **Social Links**: Modify GitHub/LinkedIn URLs in sidebar component
4. **Resume**: Replace `public/documents/Ryan-M-Mack-Resume.pdf`

### Styling Customization

The project uses Tailwind CSS for styling. Key customization points:

- **Colors**: Modify `tailwind.config.js` for theme colors
- **Fonts**: Update font families in Tailwind config
- **Spacing**: Adjust component spacing in individual components
- **Dark Mode**: Colors automatically adapt via Tailwind's dark mode classes

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit Tests**: Component testing with React Testing Library
- **Coverage**: Test coverage reports available
- **CI/CD**: Automated testing in deployment pipeline

Run tests with:

```bash
npm test
```

## 🚀 Deployment

### Azure Static Web Apps (Current)

The site is automatically deployed to Azure Static Web Apps via GitHub Actions when code is pushed to the main branch.

### GitHub Pages (Alternative)

```bash
npm run deploy
```

### Manual Build

```bash
npm run build
# Files will be in the 'dist' directory
```

## 🔧 Development Notes

### Code Architecture

- **TypeScript**: Strict typing for better code quality
- **Component Structure**: Modular, reusable components
- **State Management**: React hooks for local state
- **Error Boundaries**: Graceful error handling
- **Performance**: Optimized with React best practices

### Browser Support

- Chrome/Chromium (last 2 versions)
- Firefox (last 2 versions)  
- Safari (last 2 versions)
- Edge (last 2 versions)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📧 Contact

### Ryan Mack

- Email: [mack.ryanm@gmail.com](mailto:mack.ryanm@gmail.com)
- LinkedIn: [ryan-mack](https://www.linkedin.com/in/ryan-mack)
- GitHub: [kamoras](https://github.com/kamoras)

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
