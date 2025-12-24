# BuildBox

A modern, production-quality frontend for a Vercel-like deployment and hosting dashboard platform.

**Tagline:** Deploy. Scale. Ship Fast.

## 🎨 Design & Theme

- **Dark mode by default** - Modern, sleek dark theme with neon blue accents
- **Color scheme:** Deep black background, dark gray cards, bright cyan/blue primary colors
- **Typography:** Clean, professional font stack
- **Animations:** Smooth transitions, hover effects, and loading states
- **Responsive:** Fully optimized for desktop, tablet, and mobile devices

## 📱 Pages & Routes

### Public Pages

- **`/`** - Landing page with hero section, features, pricing, and CTA
- **`/login`** - Sign in page with OAuth and email/password options
- **`/signup`** - Registration page with OAuth and form validation

### Dashboard Pages (Protected)

- **`/dashboard`** - Main dashboard with stats, projects, and recent deployments
- **`/dashboard/projects`** - Projects management and listing
- **`/dashboard/deployments`** - Deployment history and timeline
- **`/dashboard/domains`** - Custom domain management
- **`/dashboard/analytics`** - Real-time analytics and metrics
- **`/dashboard/settings`** - Account and application settings

### Error Pages

- **`/404`** - Custom 404 page (auto-triggered for invalid routes)

## 🏗️ Project Structure

```
client/
├── pages/
│   ├── Landing.tsx              # Main landing page
│   ├── Login.tsx                # Login/signin page
│   ├── Signup.tsx               # Registration page
│   ├── Dashboard.tsx            # Main dashboard
│   ├── DashboardPages/
│   │   ├── Projects.tsx         # Projects page
│   │   ├── Deployments.tsx      # Deployments page
│   │   ├── Domains.tsx          # Domains page
│   │   ├── Analytics.tsx        # Analytics page
│   │   └── Settings.tsx         # Settings page
│   └── NotFound.tsx             # 404 page
├── components/
│   ├── Header.tsx               # Top navigation bar
│   ├── Footer.tsx               # Footer component
│   ├── DashboardSidebar.tsx     # Dashboard left sidebar
│   ├── PlaceholderPage.tsx      # Reusable placeholder template
│   └── ui/                      # ShadCN UI components
├── hooks/                        # Custom React hooks
├── lib/                         # Utility functions
├── App.tsx                      # Main app with routing
└── global.css                   # Global styles & CSS variables
```

## 🛠️ Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **ShadCN Components** - Pre-built, accessible UI components
- **Lucide Icons** - Beautiful, consistent icon set
- **TanStack React Query** - Data fetching and caching
- **Framer Motion** - Smooth animations
- **Vite** - Fast build tool

## 🎯 Key Features

### Landing Page
- ✨ Animated gradient hero section
- 📦 Feature grid with icons
- 💰 Pricing cards (Starter, Professional, Enterprise)
- 🏢 Trusted by section with company logos
- 📧 Email/OAuth signup options
- 💡 Code snippet preview UI
- 📱 Fully responsive design

### Authentication Pages
- 🔐 Modern glass effect cards
- 🔑 OAuth buttons (GitHub, Google)
- 📝 Email/password forms
- ✅ Form validation ready
- 🔗 Cross-page navigation
- 📱 Mobile-optimized layout

### Dashboard
- 📊 Real-time statistics cards
- 📦 Project cards with status badges
- 📅 Recent deployments timeline
- 🎯 Quick navigation sidebar
- 👤 User profile section
- 📱 Responsive sidebar layout

## 🎨 Customization

### Colors
All colors are managed via CSS variables in `client/global.css`:

```css
/* In :root and .dark selectors */
--primary: 210 100% 50%;        /* Neon blue */
--background: 222.2 84% 4.9%;   /* Deep black */
--card: 217.2 32.6% 17.5%;      /* Dark gray */
```

### Fonts
- **Primary Font:** Inter (Google Fonts)
- **Font Sizes:** Tailwind default scale with custom extensions
- **Font Weights:** 400, 600, 700, 800

### Spacing
- Uses Tailwind's default spacing scale
- 16px base unit (4px increments)
- Consistent padding/margins across components

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ or higher
- npm, yarn, or pnpm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run tests
pnpm run test
```

### Development
The app uses Vite for hot module reloading. Changes to any file are instantly reflected in the browser.

```bash
pnpm run dev
```

Visit `http://localhost:5173` in your browser.

## 📝 Extending the App

### Adding New Pages

1. Create a new page in `client/pages/`:
```tsx
export default function MyPage() {
  return (
    <div className="...">
      {/* Your content */}
    </div>
  );
}
```

2. Add the route in `client/App.tsx`:
```tsx
<Route path="/my-page" element={<MyPage />} />
```

### Creating Reusable Components

Store reusable components in `client/components/`:

```tsx
export default function MyComponent({ title, description }) {
  return (
    <div className="...">
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
```

### Using ShadCN Components

All ShadCN components are pre-installed in `client/components/ui/`:

```tsx
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function MyComponent() {
  return (
    <Card>
      <Button>Click me</Button>
    </Card>
  );
}
```

### Styling with Tailwind

Use Tailwind CSS classes for styling:

```tsx
<div className="bg-card p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
  <h1 className="text-2xl font-bold text-primary">Title</h1>
  <p className="text-foreground/60">Description</p>
</div>
```

## 🎯 Design System

### Colors

#### Semantic
- **Primary (Blue):** Action items, links, highlights - `text-primary`, `bg-primary`
- **Background:** Main background - `bg-background`
- **Card:** Card backgrounds - `bg-card`
- **Foreground:** Text on background - `text-foreground`
- **Border:** Dividers and borders - `border-border`
- **Muted:** Disabled, secondary text - `text-muted-foreground`

#### Status
- **Success (Green):** ✓ Completed, online
- **Warning (Yellow):** ⚠ In progress, caution
- **Error (Red):** ✗ Failed, offline
- **Info (Blue):** ℹ Information, updates

### Typography

- **Display:** Headings - `text-4xl` to `text-7xl` with `font-bold`
- **Heading:** Section titles - `text-2xl` to `text-3xl` with `font-bold`
- **Body:** Regular text - `text-base` to `text-lg`
- **Label:** Form labels - `text-sm` with `font-medium`
- **Caption:** Small text - `text-xs` to `text-sm` with `text-foreground/60`

### Components

#### Buttons
```tsx
<Button>Primary</Button>
<Button variant="outline">Secondary</Button>
<Button variant="ghost">Tertiary</Button>
<Button variant="destructive">Delete</Button>
<Button size="lg">Large</Button>
<Button size="sm">Small</Button>
```

#### Cards
```tsx
<Card className="p-6">
  <h3 className="font-bold">Title</h3>
  <p className="text-foreground/60">Content</p>
</Card>
```

#### Inputs
```tsx
<Input placeholder="Enter text..." />
<Input type="email" placeholder="Email..." />
<Input type="password" placeholder="Password..." />
```

## 📦 Mock Data

The dashboard includes sample data:

**Projects:**
- React Dashboard (success)
- API Server (building)
- Mobile App Backend (failed)
- Docs Website (success)

**Deployments:**
- Recent deployment history with commit info
- Status indicators (success, failed, building)
- Deployment metadata (branch, author, time)

To integrate with real APIs, replace the mock data in page components with API calls using React Query.

## 🔐 Security Considerations

- **No sensitive data in code:** API keys, tokens, and credentials should be stored in environment variables
- **HTTPS only:** Always use HTTPS in production
- **CORS:** Configure proper CORS headers on the backend
- **Validation:** Client-side form validation is for UX; always validate on the server
- **OAuth**: Implement proper OAuth flow with secure secret storage

## 📱 Responsive Breakpoints

- **Mobile:** < 640px (`sm`)
- **Tablet:** 640px - 1024px (`md`)
- **Desktop:** 1024px+ (`lg` and above)

All pages are fully responsive and tested across device sizes.

## 🎬 Performance

- **Code Splitting:** Routes are automatically split by Vite
- **Tree Shaking:** Unused code is removed during build
- **Image Optimization:** Use modern formats (WebP) when possible
- **Lazy Loading:** Implement lazy loading for heavy components
- **Caching:** React Query handles API caching automatically

## 📚 Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ShadCN Components](https://ui.shadcn.com)
- [React Router Docs](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Next Steps

1. **Connect Backend APIs:** Replace mock data with real API calls
2. **Implement Authentication:** Add real auth with sessions/tokens
3. **Add Database:** Set up database for persistent data
4. **Deploy:** Deploy to production (Netlify, Vercel, etc.)
5. **Monitor:** Add error tracking (Sentry) and analytics (PostHog)

---

**Built with ❤️ using BuildBox**
