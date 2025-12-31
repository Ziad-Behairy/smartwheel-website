# 📸 Image Guide - Adding Professional Images to SmartWheel Website

## ✅ Current Images

1. **SmartWheel Infographic.png** - ✅ Already added to homepage!
   - Location: `smartwheel-website/public/SmartWheel Infographic.png`
   - Displays on homepage in "SmartWheel System Overview" section

## 🎨 Where to Add More Images

### Recommended Images to Download:

1. **Wheelchair/Mobility Images**
   - Modern electric wheelchair
   - Person using wheelchair
   - Autonomous wheelchair technology

2. **Technology/AI Images**
   - Raspberry Pi board
   - Sensors and circuits
   - AI/Machine learning graphics
   - Healthcare technology

3. **Health Monitoring Images**
   - Heart rate monitor
   - Health dashboard
   - Medical sensors
   - Wearable technology

4. **Team/University Images**
   - Zewail City University campus
   - VEX Robotics competition
   - Team working photos

## 📁 How to Add Images

### Step 1: Download Images
Visit free stock photo sites:
- **Unsplash** (unsplash.com) - High quality, free
- **Pexels** (pexels.com) - Free stock photos
- **Pixabay** (pixabay.com) - Free images

Search terms:
- "electric wheelchair"
- "healthcare technology"
- "medical monitoring"
- "raspberry pi"
- "AI technology"
- "autonomous vehicle"

### Step 2: Save Images
Place images in: `smartwheel-website/public/images/`

Recommended names:
```
smartwheel-website/public/images/
├── wheelchair-main.jpg          # Main product photo
├── health-monitoring.jpg        # Health dashboard
├── ai-technology.jpg            # AI/Technology visual
├── team-photo.jpg               # Team photo
├── raspberry-pi.jpg             # Hardware component
├── navigation-demo.jpg          # Navigation system
├── emergency-system.jpg         # Emergency alert
└── zewail-campus.jpg           # University
```

### Step 3: Update the Code

#### Option A: Replace Placeholder (Recommended for wheelchair image)

Find this line in `src/pages/Home.tsx` (around line 343):
```tsx
{/* Placeholder for wheelchair image */}
<div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center relative overflow-hidden group">
```

Replace the entire div with:
```tsx
<img
  src="/images/wheelchair-main.jpg"
  alt="SmartWheel Autonomous Wheelchair"
  className="w-full h-auto rounded-lg shadow-2xl"
/>
```

#### Option B: Add to Team Page

In `src/pages/Team.tsx`, find the avatar section (around line 33):
```tsx
<div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white text-3xl font-bold group-hover:scale-110 transition-transform">
  {name.charAt(0)}
</div>
```

Replace with:
```tsx
<img
  src="/images/team-member-name.jpg"
  alt={name}
  className="w-24 h-24 mx-auto mb-4 rounded-full object-cover shadow-lg group-hover:scale-110 transition-transform"
/>
```

#### Option C: Add to Architecture Page

Add images of hardware components to the Architecture page layers.

## 🚀 Quick Image URLs (Copy & Download)

Here are some suggested free stock photos you can download:

### 1. Wheelchair/Mobility
```
Search: "electric wheelchair" on Unsplash
Search: "mobility assistance" on Pexels
```

### 2. Technology
```
Search: "raspberry pi" on Unsplash
Search: "circuit board" on Pexels
Search: "AI technology" on Unsplash
```

### 3. Healthcare
```
Search: "health monitoring" on Unsplash
Search: "medical technology" on Pexels
Search: "smart health" on Pixabay
```

### 4. Team/University
```
Search: "university students" on Unsplash
Search: "robotics team" on Pexels
Search: "engineering students" on Pixabay
```

## 📐 Image Specifications

### Recommended Sizes:
- **Main Hero Image**: 1920x1080px (16:9)
- **Feature Images**: 800x600px (4:3)
- **Team Photos**: 400x400px (square)
- **Icons/Logos**: 256x256px (square)
- **Infographic**: Current size is perfect

### File Formats:
- **Photos**: `.jpg` or `.webp` (best compression)
- **Graphics**: `.png` (if transparency needed)
- **Logos**: `.svg` (scalable) or `.png`

### File Size:
- Keep images under 500KB each
- Use online tools to compress:
  - TinyPNG (tinypng.com)
  - Squoosh (squoosh.app)

## 🎯 Example: Adding Main Wheelchair Image

1. **Download** a professional wheelchair image from Unsplash
2. **Save as**: `smartwheel-website/public/images/wheelchair-main.jpg`
3. **Edit** `src/pages/Home.tsx` line ~343:

```tsx
// BEFORE (placeholder)
<div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center relative overflow-hidden group">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-accent/40 opacity-0 group-hover:opacity-100 transition-opacity" />
  <div className="relative z-10 text-center p-8">
    <Navigation className="w-24 h-24 mx-auto mb-4 text-primary" />
    <p className="text-gray-700 dark:text-gray-300 font-semibold">
      SmartWheel Prototype
    </p>
    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
      AI-Powered Autonomous Navigation
    </p>
  </div>
</div>

// AFTER (real image)
<img
  src="/images/wheelchair-main.jpg"
  alt="SmartWheel Autonomous Wheelchair Prototype"
  className="w-full h-auto rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300"
/>
```

4. **Refresh** your browser - image appears!

## 🎨 Current Sections With Images

### ✅ Homepage:
1. **Line 239**: SmartWheel Infographic (already working!)
2. **Line 343**: Product showcase (placeholder - ready for your image)

### 📝 Ready for Images:
- Team page: Team member photos
- Architecture page: Hardware component images
- Live Demo page: Dashboard screenshots

## 💡 Pro Tips

1. **Consistent Style**: Use photos with similar color tones
2. **High Quality**: Min 1000px width for large images
3. **Compress**: Always compress before adding
4. **Alt Text**: Always add descriptive alt text for accessibility
5. **Responsive**: Images automatically resize on mobile

## 🔥 Quick Start

**Want to add 5 images in 5 minutes?**

1. Go to Unsplash.com
2. Download these searches (pick first result):
   - "electric wheelchair" → Save as `wheelchair-main.jpg`
   - "raspberry pi" → Save as `raspberry-pi.jpg`
   - "health monitor" → Save as `health-monitoring.jpg`
   - "AI robot" → Save as `ai-technology.jpg`
   - "university students" → Save as `team-photo.jpg`
3. Save all to `smartwheel-website/public/images/`
4. Replace placeholder in Home.tsx (line 343)
5. Refresh browser!

---

**Need help?** The infographic is already working as proof of concept!
Just follow the same pattern for any new images.

**Current Image**: Your SmartWheel Infographic is beautifully displayed on the homepage! 🎉
