# Masonry Portfolio

A modern, interactive portfolio website built with Next.js, featuring a beautiful masonry layout with drag-and-drop functionality.

## ✨ Features

- **Masonry Layout**: Responsive grid layout that adapts to different screen sizes
- **Drag & Drop**: Interactive drag-and-drop functionality for rearranging portfolio items
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Auto Slideshow**: Project cards with automatic image slideshow
- **Modern UI**: Clean, modern design with smooth animations and transitions
- **TypeScript**: Full TypeScript support for better development experience

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.4
- **Frontend**: React 19.1.0 with TypeScript 5
- **Styling**: Tailwind CSS 4
- **Layout**: Muuri + React Masonry CSS (masonry layout)
- **Icons**: React Icons
- **Deployment**: Vercel
- **Linting**: ESLint 9

## 🛠️ Installation & Setup

1. Clone the repository:
```bash
git clone https://github.com/tahiru0/masonry-portfolio.git
cd masonry-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. **Customize Personal Information** (important):
   - Edit `data/portfolio.json` to fill in personal information
   - Replace `public/cv.pdf` with your actual CV
   - Update GitHub username in `src/app/api/github/route.ts`

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
masonry-portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       └── MasonryGrid.tsx
├── data/
│   └── portfolio.json
└── public/
    └── (images and assets)
```

## 🎨 Customization

### Fill in Personal Information

To customize personal information in the portfolio, you need to edit the `data/portfolio.json` file:

#### 1. Personal Information (Avatar)
```json
{
  "avatar": {
    "id": "avatar",
    "type": "avatar",
    "image": "https://picsum.photos/400/400?random=999", // Replace with your profile picture
    "title": "Your Name", // Replace with your real name
    "description": "Short description about yourself", // Replace with description about you
    "location": "City, Country", // Replace with your address
    "role": "Current Position/Role" // Replace with your role
  }
}
```

#### 2. Contact Information
```json
{
  "contactForm": {
    "id": "3",
    "type": "contact-form",
    "icon": "MdMail",
    "title": "Get In Touch",
    "description": "Send me a message",
    "email": "your@email.com" // Replace with your real email
  }
}
```

#### 3. GitHub Information
Edit file `src/app/api/github/route.ts`:
```typescript
const response = await fetch('https://api.github.com/users/tahiru0', {
  // Replace 'tahiru0' with your actual GitHub username
});
```

#### 4. Social Media
```json
{
  "socialMedia": {
    "linkedin": {
      "username": "Your LinkedIn Name", // Replace with your LinkedIn name
      "link": "https://linkedin.com/in/username" // Replace with your actual LinkedIn link
    },
    "twitter": {
      "username": "@username", // Replace with your Twitter/X username
      "link": "https://x.com/username" // Replace with your actual Twitter/X link
    }
  }
}
```

#### 5. Replace CV File
1. Prepare your CV file (PDF format)
2. Name the file `cv.pdf`
3. Replace the `public/cv.pdf` file with your actual CV
4. The file will be automatically linked in the portfolio

### Add New Projects

To add new projects, edit the `projects` section in `data/portfolio.json`:

```json
{
  "projects": [
    {
      "id": "4",
      "type": "project",
      "images": [
        "https://picsum.photos/400/300?random=21", // Replace with actual project images
        "https://picsum.photos/400/300?random=22"
      ],
      "icon": "MdSmartphone",
      "title": "Project Name",
      "description": "Detailed project description",
      "tags": ["Technology 1", "Technology 2"],
      "liveUrl": "https://demo-link.vercel.app", // Demo link
      "sourceUrl": "https://github.com/username/repo" // Source code link
    }
  ]
}
```

### Skills & Certifications

Edit the `skills` and `certifications` sections in `data/portfolio.json` to update your skills and certifications.

### Styling

The project uses Tailwind CSS for styling. Main styles are in:
- `src/app/globals.css`: Global styles and responsive breakpoints
- Component files: Inline Tailwind classes

## 📦 Dependencies & Libraries

The project uses the following libraries:

### Production Dependencies
- **Next.js 15.5.4**: React framework for production
- **React 19.1.0**: UI library
- **React DOM 19.1.0**: React rendering library
- **TypeScript 5**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **React Icons 5.5.0**: Icon library with 20+ icon packs
- **Muuri 0.9.5**: JavaScript library for masonry layout
- **Muuri React 3.1.7**: React wrapper for Muuri
- **React Masonry CSS 1.0.16**: Alternative masonry layout

### Development Dependencies
- **ESLint 9**: Code linting
- **ESLint Config Next 15.5.4**: Next.js ESLint rules
- **@eslint/eslintrc ^3**: ESLint configuration
- **@tailwindcss/postcss ^4**: Tailwind CSS PostCSS plugin
- **@types/node ^20**: Node.js type definitions
- **@types/react ^19**: React type definitions
- **@types/react-dom ^19**: React DOM type definitions

## 📱 Responsive Breakpoints

- **Mobile**: ≤640px (single column, no borders)
- **Tablet**: 641px-1023px (2 columns)
- **Small Desktop**: 1024px-1279px (3 columns)
- **Large Desktop**: ≥1280px (4 columns)

## 🚀 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tahiru0/masonry-portfolio)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

