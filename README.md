# 🚀 ToolFinder - AI Tool Directory Platform

A modern, feature-rich directory platform for discovering and exploring AI tools. Built with Next.js 14, TypeScript, and Tailwind CSS, featuring intelligent search, advanced filtering, and a beautiful dual-theme interface.

<img width="1917" height="958" alt="image" src="https://github.com/user-attachments/assets/fb80e885-e490-4e89-918a-89d10fc96e30" />
---

## 📋 Table of Contents.   

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Data Structure](#data-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---
Dataset Used For this Website is Collected From - 
1) ProductHunt Official public api
2) Manual Addition of data Like Pricing and Type using AI like Gemini and Chatgpt as Cant get From official API.

Tech Stack used
-TypeScript (Nextjs)
Framework - Lenis (For smooth Scrolling)

Design Insipiration Taken From 
- Theresanaiforthat

AI Prompts used -
1) Create a ToolHero component that displays comprehensive tool information including name, tagline, description, thumbnail, topics, media gallery, vote count, website link, pricing tiers, and a verified badge (if votes > 100). Pass all the tool node properties as props to this component.
2)Create a Next.js client component for displaying individual AI tool details. It should accept tool data including id, name, tagline, description, thumbnail, topics, media array, votes count, website, and pricing information. Add a back button that uses Next.js router to navigate back. Make it responsive with Tailwind CSS.
3)Process data.json to add Type based on the Following types ["Music","Generate Image","Generate Video","For Text"] to the nodes according to the Tagline and Tags of the Node following the structure of Type to be added to each nodes of the data.json.Structure - Type:[Array of String type]


## ✨ Features

### 🔍 **Intelligent Search**
- Real-time search across tool names, taglines, and categories
- Works seamlessly across all view modes (Latest, Top Free, Top Paid, Top Grossing)
- Instant results with search query highlighting
- Clear search with a single click


### 🎯 **Advanced Filtering**
- **Price Range Slider**: Filter tools by pricing from $0 to $100+
- **Category Filtering**: Browse by AI categories (Image Gen, Video, Music, Writing, etc.)
- **Sort Options**:
  - Date (Newest/Oldest)
  - Price (Low to High / High to Low)
  - Popularity (Most Votes)

<img width="1918" height="958" alt="image" src="https://github.com/user-attachments/assets/f8063bb2-6fb3-4dd0-90d8-688f2694535e" />

### 📊 **Multiple View Modes**
- **Latest**: Newest AI tools with full filter support
- **Top Free**: Best free AI tools sorted by popularity
- **Top Paid**: Premium tools with highest ratings
- **Top Grossing**: Most popular tools by vote count

### 🕐 **View History Tracking**
- Automatically tracks recently viewed AI tools
- Persistent across sessions via localStorage
- Shows relative timestamps ("5 mins ago", "2 hours ago")
- Quick access to previously explored tools
- Clear history option

<img width="281" height="449" alt="image" src="https://github.com/user-attachments/assets/40422f1c-609d-4f64-92ba-735680b61ce4" />


### 🛠️ **Dedicated Tool Pages**
Each AI tool has a comprehensive detail page featuring:

- **Hero Section**: Tool logo, name, tagline, and verification badge
- **Media Gallery**: Multiple screenshots and demo videos
- **Detailed Description**: Full tool overview and capabilities
- **Pricing Plans**: Clear pricing breakdown with feature comparison
- **Engagement Section**:
  - Upvote system with vote counter
  - Overall rating visualization (out of 5)
  - Discussion threads with Latest/Top/Worst filters
  - Comment system with AI avatars

<img width="1917" height="948" alt="image" src="https://github.com/user-attachments/assets/24695e82-c57f-4a30-b7ca-3525da96181d" />
<img width="1917" height="953" alt="image" src="https://github.com/user-attachments/assets/93a098eb-24e2-4503-bf1d-b05b96d77d7a" />
<img width="1917" height="887" alt="image" src="https://github.com/user-attachments/assets/3cd37634-6241-4942-8c70-d10abb435e0d" />


### 🎨 **Dual Theme Support**
- **Dark Mode**: Sleek dark interface with neon blue accents
- **Light Mode**: Clean white interface with professional styling
- Smooth theme transitions
- Custom toggle switch with visual indicators
- Persistent theme preference

<img width="1913" height="955" alt="image" src="https://github.com/user-attachments/assets/5a7fbb40-6613-44b5-9db9-f2845725c360" />

### 📱 **Responsive Design**
- Fully responsive layout for mobile, tablet, and desktop
- Collapsible sidebars for optimal screen space
- Touch-optimized interactions
- Adaptive grid layouts

<div style="display:flex; gap:10px; flex-wrap:wrap;">
  <img src="https://github.com/user-attachments/assets/f0b6d98d-f833-469d-a16f-3d543412139c" width="30%" />
  <img src="https://github.com/user-attachments/assets/c8126c5c-28fc-475e-930c-20cc164fa620" width="30%" />
  <img src="https://github.com/user-attachments/assets/32fcfa44-efc8-464e-9ff1-2076fcc32d7b" width="30%" />
</div>

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + CSS Variables
- **State Management**: React Context API
- **Image Optimization**: Next.js Image Component

### Key Libraries
- **next**: ^15.1.4
- **react**: ^19.0.0
- **typescript**: ^5
- **tailwindcss**: ^3.4.17

### Features
- Server-Side Rendering (SSR)
- Client-Side Routing
- Dynamic Route Parameters
- Local Storage Persistence
- Custom Event System

---

## 📊 Data Structure

### `data2.json` Format

The platform uses a JSON data file located at `data/data2.json` with the following structure:

```json
{
  "data": {
    "posts": {
      "edges": [
        {
          "node": {
            "id": "1042085",
            "name": "Tool Name",
            "tagline": "Short description",
            "description": "Full markdown description with ### headers",
            "website": "https://tool-website.com",
            "type": ["Generate Image", "For Design"],
            "createdAt": "2025-11-28T08:01:00Z",
            "pricing": [
              {
                "plan-type": "Free",
                "pricing in usd": "0",
                "description": "Plan features"
              }
            ],
            "founder": {
              "name": "Founder Name",
              "mail": "email@example.com"
            },
            "thumbnail": {
              "url": "https://image-url.com/logo.png"
            },
            "media": [
              {
                "url": "https://image-url.com/screenshot.png",
                "type": "image"
              }
            ],
            "topics": {
              "edges": [
                {
                  "node": {
                    "id": "267",
                    "name": "Developer Tools"
                  }
                }
              ]
            },
            "votesCount": 191
          }
        }
      ]
    }
  }
}
```

### Field Descriptions

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique identifier for the tool |
| `name` | string | Display name of the AI tool |
| `tagline` | string | Short one-line description |
| `description` | string | Full markdown description with features |
| `website` | string | Official product URL |
| `type` | string[] | Categories (e.g., "Generate Image", "For Code") |
| `createdAt` | ISO 8601 | Launch date timestamp |
| `pricing` | object[] | Array of pricing plans |
| `thumbnail.url` | string | Logo/icon URL |
| `media` | object[] | Screenshots and demo videos |
| `topics.edges` | object[] | Tags and categories |
| `votesCount` | number | Community upvotes |

### Adding New Tools

To add a new AI tool to the directory:

1. Open `data/data2.json`
2. Add a new object to the `edges` array following the structure above
3. Ensure all required fields are populated
4. Save and restart the development server

---

## 🚀 Installation

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm** or **yarn** or **pnpm**

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/topaitool.git
cd topaitool
```

### Step 2: Install Dependencies

```bash
# Using npm
npm install

# Or using yarn
yarn install

# Or using pnpm
pnpm install
```

### Step 3: Set Up Environment (Optional)

Create a `.env.local` file if you need environment variables:

```bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Step 4: Add Background Images

Place the following images in the `public` folder:
- `bg.jpg` - Dark mode background
- `30.jpg` - Light mode background
- `switch-dark.png` - Dark mode toggle icon
- `switch-light.png` - Light mode toggle icon

---

## 🎮 Usage

### Development Mode

```bash
# Using npm
npm run dev

# Or using yarn
yarn dev

# Or using pnpm
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

---
