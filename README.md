# Engineering Portfolio

A modern, responsive portfolio website built with React for mechanical engineers.

## 🚀 Features

- **Centralized Data Management**: All content is managed from a single data file
- **No Hardcoded Values**: Everything is dynamic and easily editable
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Clean, professional design with smooth animations
- **Easy Customization**: Edit all content from one place

## 📝 How to Edit Your Portfolio

### Method 1: Using the Data Editor (Recommended for beginners)
1. Start the development server: `npm run dev`
2. Look for the "✏️ Edit Portfolio Data" button in the top-right corner
3. Click it to open the data editor
4. Make your changes and click "Save Changes"

### Method 2: Direct File Editing (For developers)
Edit the file `src/data/portfolioData.js` to update your information:

```javascript
export const portfolioData = {
  personalInfo: {
    name: "Your Name",           // Your actual name
    title: "Your Title",         // e.g., "Mechanical Engineer"
    tagline: "Your tagline",     // Brief description
    email: "your@email.com",     // Your email
    phone: "+1 (555) 123-4567",  // Your phone
    location: "Your City, State", // Your location
    // ... more fields
  },
  // ... other sections
};
```

## 📁 Data Structure

The portfolio data is organized into these sections:

### 1. Personal Information (`personalInfo`)
- `name`: Your full name
- `title`: Your professional title
- `tagline`: Brief description for hero section
- `email`: Contact email
- `phone`: Contact phone
- `location`: Your location
- `profileImage`: Emoji or image URL for profile
- `socialLinks`: LinkedIn, GitHub, Portfolio links

### 2. About Section (`about`)
- `description1`: First paragraph about you
- `description2`: Second paragraph about you
- `stats`: Array of statistics (years experience, projects, etc.)

### 3. Projects (`projects`)
Array of project objects with:
- `title`: Project name
- `description`: Project description
- `icon`: Emoji or image for project
- `technologies`: Array of technologies used
- `imageUrl`: Optional project image URL

### 4. Skills (`skills`)
Array of skill categories with:
- `category`: Category name (e.g., "Design & Analysis")
- `skills`: Array of skills with name and proficiency level (0-100)

### 5. Experience (`experience`)
Array of work experience with:
- `period`: Time period
- `position`: Job title
- `company`: Company name
- `description`: Job description

### 6. Education (`education`)
Array of education entries with:
- `degree`: Degree name
- `institution`: School name
- `period`: Time period
- `description`: Additional details

### 7. Certifications (`certifications`)
Array of certification names

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm start` - Start development server (same as dev)
- `npm run build` - Build for production
- `npm test` - Run tests

## 🎨 Customization Tips

1. **Add Your Photo**: Replace the emoji in `profileImage` with an actual image URL
2. **Project Images**: Add `imageUrl` to your projects for better visuals
3. **Colors**: Modify the CSS in `src/App.css` to change colors
4. **Sections**: Add or remove sections by editing the navigation array and adding corresponding JSX

## 📱 Responsive Design

The portfolio automatically adapts to different screen sizes:
- Desktop: Full layout with side-by-side sections
- Tablet: Adjusted grid layouts
- Mobile: Single column layout with optimized spacing

## 🚀 Deployment

To deploy your portfolio:

1. Build the project: `npm run build`
2. Upload the `build` folder to your hosting service
3. Your portfolio will be live!

## 📞 Support

If you need help customizing your portfolio, check the data structure in `src/data/portfolioData.js` and modify the values to match your information.

---

**Happy coding!** 🎉
