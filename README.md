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
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Layout**: Muuri (JavaScript library for masonry layout)
- **Icons**: React Icons with Simple Icons
- **Deployment**: Vercel

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/tahiru0/masonry-portfolio.git
cd masonry-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

### Adding New Portfolio Items

Edit `data/portfolio.json` to add new items to your portfolio. Each item can have:

- **Avatar**: Profile information
- **Skills**: Technical skills with progress bars
- **Projects**: Portfolio projects with images, descriptions, and links
- **Social Media**: Social media links and stats
- **Contact**: Contact information
- **Maps**: Location information

### Styling

The project uses Tailwind CSS for styling. Main styles are in:
- `src/app/globals.css`: Global styles and responsive breakpoints
- Component files: Inline Tailwind classes

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

## 👨‍💻 Author

**Nguyen Van A**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn]
- GitHub: [@tahiru0](https://github.com/tahiru0)
