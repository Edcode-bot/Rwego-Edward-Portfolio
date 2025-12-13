# Design Guidelines for Edcode Portfolio

## Design Approach
Reference-based approach drawing from award-winning portfolios (Awwwards winners, Brittany Chiang, Rafael Caferati, Aristide Benoist) with a fusion of **web3 futurism meets clean minimalism**. Prioritize high-impact visuals with restrained elegance—serious, professional energy with subtle tech-forward elements.

## Core Visual Direction
- **Style**: Minimal dark/neutral aesthetic with high-contrast accents
- **Theme**: Dark mode primary (light mode toggle available)
- **Vibe**: Futuristic but grounded, innovative yet approachable
- **Accent Strategy**: Strategic pops for AI/Web3 tech pills, CTAs, and interactive elements

## Typography System
- **Primary Font**: Inter or similar modern sans-serif via Google Fonts
- **Hierarchy**: 
  - Hero headline: Bold, extra-large (text-5xl to text-7xl)
  - Section headers: Bold, large (text-3xl to text-4xl)
  - Body: Regular, readable (text-base to text-lg)
  - Labels/pills: Medium weight, small (text-sm)
- **Special Treatment**: Variable fonts for smooth scaling across devices

## Layout & Spacing
- **Spacing Units**: Tailwind's 4, 8, 12, 16, 24 for consistent rhythm (p-4, m-8, gap-12, py-16, py-24)
- **Container Max-Width**: max-w-7xl for main content areas
- **Grid System**: 12-column grid for project cards (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- **Vertical Rhythm**: Generous section padding (py-16 to py-24 desktop, py-12 mobile)

## Homepage Structure
**Hero Section** (80vh):
- Large hero image: Abstract tech/coding visual or professional portrait with subtle overlay
- Centered animated intro text with fade-in effect
- Tech focus pills below headline (AI, Web3, Celo/Base, Full-Stack) with subtle glow
- Dual CTAs: Primary "View Projects" + Secondary "GitHub"
- Subtle parallax scroll on background

**Featured Projects Teaser**:
- Spotlight 3 key projects in card grid
- Each card: Project thumbnail image, title, tech stack pills, brief description
- Hover effects: subtle lift and glow

**Latest Achievements Snippet**:
- 2-3 recent blog/social posts in horizontal scroll
- Instagram-style cards with images and captions

**Contact CTA Section**:
- Centered call-to-action with blurred-background button
- Social links row (GitHub, X/Twitter, Email icons)

## Interior Pages Layout

**About Page**:
- Hero section with professional portrait
- Two-column layout: Bio text (left) + Skills visualization (right, interactive radar chart)
- "Journey" section: Timeline cards with key milestones
- Resume download button with icon

**Projects Page**:
- Filter pills at top (All, AI, Web3, Full-Stack)
- Masonry grid or standard grid of project cards
- Each card: Large project image, title, tech stack, impact metrics, CTA to detail page
- Project detail pages: Full-width hero image, detailed case study, live demo embed, GitHub link

**Blog/Social Feed Page**:
- Instagram-style feed layout with image-first posts
- Each post: Featured image, caption, timestamp, hashtags
- Sidebar: Recent achievements highlights, search bar

**Contact Page**:
- Split layout: Form (left, 60%) + Contact info/map (right, 40%)
- Form fields with modern floating labels
- Social links and availability info

## Navbar Design
- **Style**: Sticky with blur backdrop (backdrop-blur-lg bg-opacity-90)
- **Layout**: Logo left, nav links center, wallet status/theme toggle right
- **Mobile**: Smooth hamburger menu with slide-in drawer
- **Animation**: Morphing effects on scroll (shrinks slightly after 100px)
- **Links**: Home, About, Projects, Blog, Contact with subtle hover underline

## Component Library

**Buttons**:
- Primary: Solid with glow effect on hover
- Secondary: Outline with fill on hover
- Ghost: Text with underline animation
- All buttons on images: blurred background treatment

**Cards**:
- Rounded corners (rounded-xl)
- Subtle shadow (shadow-lg) with hover lift
- Dark card background with light border
- Image aspect ratio: 16:9 for project cards

**Tech Pills**:
- Small rounded badges (rounded-full px-3 py-1)
- Semi-transparent backgrounds with border
- Subtle glow for web3-related pills

**Forms**:
- Floating label inputs
- Focus states with border glow
- Validation states (success green, error red)

**Social Feed Posts**:
- Square images (aspect-square)
- Overlay gradient at bottom for caption
- Timestamp and interaction icons (likes/comments if enabled)

## Animations & Interactions
- **Page Transitions**: Subtle fade-in with Framer Motion
- **Scroll Animations**: Parallax on hero, stagger-in for card grids
- **Hover Effects**: Lift + shadow increase on cards, underline slide on links
- **Micro-interactions**: Button ripples, loading skeletons, smooth theme toggle
- **Performance**: Use transform/opacity only, avoid layout shifts

## Images Strategy
- **Hero Image**: Required - abstract tech visualization or professional portrait
- **Project Cards**: Each project needs featured image
- **Blog Posts**: User-uploaded images from achievements/events
- **About Page**: Professional portrait and optional skill icons
- **Optimization**: Next.js Image component, WebP format, lazy loading

## Responsive Breakpoints
- Mobile: Default (< 768px) - single column, stacked nav
- Tablet: md (768px+) - two columns where appropriate
- Desktop: lg (1024px+) - full multi-column grids
- Wide: xl (1280px+) - max content width with margins

## Accessibility Standards
- WCAG 2.1 AA compliance
- ARIA labels on all interactive elements
- Keyboard navigation for all features
- Color contrast minimum 4.5:1
- Alt text for all images
- Focus visible states on all interactive elements

## Web3 Visual Elements
- Wallet connect button in navbar with status indicator (connected/disconnected)
- Blockchain-verified achievements: Badge icon with chain logo
- NFT gallery: Grid with hover preview, link to blockchain explorer
- Subtle chain-themed decorative elements (hexagons, network visualizations)