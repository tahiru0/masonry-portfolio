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
- **Frontend**: React 19.1.0 với TypeScript 5
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

3. **Tùy chỉnh thông tin cá nhân** (quan trọng):
   - Sửa `data/portfolio.json` để điền thông tin cá nhân
   - Thay file `public/cv.pdf` bằng CV thật của bạn
   - Cập nhật username GitHub trong `src/app/api/github/route.ts`

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

### Điền Thông Tin Cá Nhân

Để tùy chỉnh thông tin cá nhân trong portfolio, bạn cần sửa file `data/portfolio.json`:

#### 1. Thông Tin Cá Nhân (Avatar)
```json
{
  "avatar": {
    "id": "avatar",
    "type": "avatar",
    "image": "https://picsum.photos/400/400?random=999", // Thay bằng ảnh đại diện của bạn
    "title": "Tên của bạn", // Thay bằng tên thật
    "description": "Mô tả ngắn về bản thân", // Thay bằng mô tả về bạn
    "location": "Thành phố, Quốc gia", // Thay bằng địa chỉ của bạn
    "role": "Chức vụ/Vị trí hiện tại" // Thay bằng vai trò của bạn
  }
}
```

#### 2. Thông Tin Liên Hệ
```json
{
  "contactForm": {
    "id": "3",
    "type": "contact-form",
    "icon": "MdMail",
    "title": "Get In Touch",
    "description": "Send me a message",
    "email": "email@cuaban.com" // Thay bằng email thật của bạn
  }
}
```

#### 3. Thông Tin GitHub
Sửa file `src/app/api/github/route.ts`:
```typescript
const response = await fetch('https://api.github.com/users/tahiru0', {
  // Thay 'tahiru0' bằng username GitHub thật của bạn
});
```

#### 4. Mạng Xã Hội
```json
{
  "socialMedia": {
    "linkedin": {
      "username": "Tên thật trên LinkedIn", // Thay bằng tên LinkedIn
      "link": "https://linkedin.com/in/username" // Thay bằng link LinkedIn thật
    },
    "twitter": {
      "username": "@username", // Thay bằng username Twitter/X
      "link": "https://x.com/username" // Thay bằng link Twitter/X thật
    }
  }
}
```

#### 5. Thay File CV
1. Chuẩn bị file CV của bạn (định dạng PDF)
2. Đặt tên file là `cv.pdf`
3. Thay thế file `public/cv.pdf` bằng file CV thật của bạn
4. File sẽ tự động được link trong portfolio

### Thêm Dự Án Mới

Để thêm dự án mới, sửa phần `projects` trong `data/portfolio.json`:

```json
{
  "projects": [
    {
      "id": "4",
      "type": "project",
      "images": [
        "https://picsum.photos/400/300?random=21", // Thay bằng ảnh dự án thật
        "https://picsum.photos/400/300?random=22"
      ],
      "icon": "MdSmartphone",
      "title": "Tên Dự Án",
      "description": "Mô tả chi tiết về dự án",
      "tags": ["Công nghệ 1", "Công nghệ 2"],
      "liveUrl": "https://link-demo.vercel.app", // Link demo
      "sourceUrl": "https://github.com/username/repo" // Link source code
    }
  ]
}
```

### Kỹ Năng & Chứng Chỉ

Sửa phần `skills` và `certifications` trong `data/portfolio.json` để cập nhật kỹ năng và chứng chỉ của bạn.

### Styling

The project uses Tailwind CSS for styling. Main styles are in:
- `src/app/globals.css`: Global styles and responsive breakpoints
- Component files: Inline Tailwind classes

## 📦 Dependencies & Libraries

Dự án sử dụng các thư viện sau:

### Production Dependencies
- **Next.js 15.5.4**: React framework for production
- **React 19.1.0**: UI library
- **React DOM 19.1.0**: React rendering library
- **TypeScript 5**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **React Icons 5.5.0**: Icon library với 20+ icon packs
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

## 👨‍💻 Author

**Duan Can Han**
- Portfolio: [Portfolio URL của bạn]
- LinkedIn: [LinkedIn của bạn]
- GitHub: [@tahiru0](https://github.com/tahiru0)
- Email: [Email của bạn]
