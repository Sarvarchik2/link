# 👥 Team Section - "System Operatives" Documentation

## 🎯 Concept Overview

**"Digital Dossiers"** - интерактивный раздел команды, где сотрудники представлены как операторы высокотехнологичной системы в стиле киберпанк/HUD интерфейса.

## 🚀 Key Features

### 1. **Infinite Horizontal Carousel**
- Автоматический скролл со скоростью 30 секунд на полный цикл
- Drag-to-scroll интеракция (пользователь может вручную листать)
- Плавная анимация с Motion library
- Бесконечная прокрутка (триплированные карточки)

### 2. **Central Scanner Line** (Лазерный Сканер)
Вертикальная зелёная линия в центре экрана:

```typescript
style={{
  background: 'linear-gradient(to bottom, transparent, #6FB98F, transparent)',
  boxShadow: '0 0 20px rgba(111, 185, 143, 0.6), 0 0 40px rgba(111, 185, 143, 0.4)',
}}
```

**Crosshair Effect:**
- Круглый прицел в центре с крестом
- Пульсирующая анимация (scale: 1 → 1.2 → 1)
- Зелёное свечение #6FB98F

### 3. **TeamCard Component** - Digital Dossier Card

#### **Visual Structure**
```
┌─────────────────────────┐
│  ┏━          [ONLINE] ┓ │  <- Corner brackets + Status
│  ┃                    ┃ │
│  ┃   [PHOTO B&W]      ┃ │  <- Black/White photo with scan lines
│  ┃   + Scan Lines     ┃ │
│  ┃   + Digital Noise   ┃ │
│  ┗━                  ━┛ │
│                         │
│  [ID: 001] [ACCESS: α]  │  <- Technical badges
│                         │
│  NAME IN CAPS           │  <- Monospace typography
│  ROLE                   │
│  ──────────────────     │  <- Divider
│  SPEC: TECHNOLOGY       │
│  UPTIME: 99.9%          │
│                         │
└─────────────────────────┘
```

#### **Photo Effects**

**Black & White Filter:**
```typescript
animate={{
  filter: isActive 
    ? 'grayscale(0%) contrast(1.1)'      // Color when active
    : 'grayscale(100%) contrast(1.3)',   // B&W when inactive
}}
```

**Scan Lines Overlay:**
```css
backgroundImage: 'repeating-linear-gradient(
  0deg, 
  transparent, 
  transparent 2px, 
  #6FB98F 2px, 
  #6FB98F 3px
)'
```

**Digital Noise:**
- SVG фильтр с `feTurbulence`
- `baseFrequency: 0.9`, `numOctaves: 4`
- Opacity: 10%

**Glitch Effect:**
При попадании карточки в центр экрана (isActive):
```typescript
// Red channel offset
<motion.div
  animate={{ opacity: [0, 0.8, 0, 0.6, 0], x: [-5, 5, -3, 3, 0] }}
  style={{ background: 'rgba(255, 0, 0, 0.3)', mixBlendMode: 'screen' }}
/>

// Green channel offset
<motion.div
  animate={{ opacity: [0, 0.8, 0, 0.6, 0], x: [5, -5, 3, -3, 0] }}
  style={{ background: 'rgba(0, 255, 0, 0.3)', mixBlendMode: 'screen' }}
/>
```
Duration: 300ms

#### **3D Tilt Effect** (on Hover)

**Mouse Tracking:**
```typescript
const x = useMotionValue(0);
const y = useMotionValue(0);

const rotateX = useTransform(y, [-100, 100], [10, -10]);
const rotateY = useTransform(x, [-100, 100], [-10, 10]);
```

**Calculation:**
```typescript
const centerX = rect.left + rect.width / 2;
const centerY = rect.top + rect.height / 2;
x.set(e.clientX - centerX);
y.set(e.clientY - centerY);
```

**CSS Transform:**
```typescript
style={{
  rotateX: isHovered ? rotateX : 0,
  rotateY: isHovered ? rotateY : 0,
  transformStyle: 'preserve-3d',
}}
```

### 4. **HUD Metadata Elements**

#### **Status Indicator** (Top Right)
```
┌────────────┐
│ • ONLINE   │  <- Pulsating dot + text
└────────────┘
```

**Pulsating Dot Animation:**
```typescript
animate={{
  opacity: [0.5, 1, 0.5],
  boxShadow: [
    '0 0 4px rgba(111, 185, 143, 0.6)',
    '0 0 12px rgba(111, 185, 143, 1)',
    '0 0 4px rgba(111, 185, 143, 0.6)',
  ],
}}
```

#### **ID Badge & Access Level**
```
[ID: 001_OPR]  [ACCESS: ALPHA]
```

**Access Levels:**
- `ALPHA` - Ярко-зелёный, повышенная яркость
- `BETA` - Средняя яркость
- `GAMMA` - Приглушённый

#### **Technical Data**
```
SPEC: FULL-STACK
UPTIME: 99.9%
CERT: VERIFIED
```

### 5. **Active State** (Central Card)

Когда карточка попадает в центр сканера:

**Visual Changes:**
- Scale: 1 → 1.05
- Border: 0.5px → 1px, opacity 0.2 → 0.6
- Box-shadow: 0 → `0 0 40px rgba(111, 185, 143, 0.4)`
- Photo: Grayscale → Color
- Corner brackets: opacity 0.3 → 1.0
- Name text-shadow: `0 0 10px rgba(111, 185, 143, 0.5)`

**Auto-glitch Effect:**
Запускается автоматически через 100ms после активации.

### 6. **Circuit Pattern Overlay**
Тонкий паттерн схемы на фоне карточки (opacity: 5%):

```svg
<svg width='60' height='60'>
  <path d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4z...' />
</svg>
```

### 7. **Glassmorphism 2.0**
```css
background: rgba(111, 185, 143, 0.03);
backdrop-filter: blur(12px);
border: 0.5px solid rgba(111, 185, 143, 0.2);
```

## 📊 Team Data Structure

```typescript
interface TeamMember {
  id: string;              // '001', '002', etc.
  name: string;            // 'DAMIR KHALIKOV'
  role: string;            // 'LEAD ARCHITECT'
  accessLevel: string;     // 'ALPHA' | 'BETA' | 'GAMMA'
  status: string;          // 'ONLINE' | 'OFFLINE' | 'AWAY'
  photo: string;           // Unsplash URL
  specialization: string;  // 'FULL-STACK', 'AI/ML', etc.
}
```

### Current Team Members

| ID | Name | Role | Access | Specialization |
|----|------|------|--------|----------------|
| 001 | DAMIR KHALIKOV | LEAD ARCHITECT | ALPHA | FULL-STACK |
| 002 | ALEKSANDR IVANOV | BACKEND ENGINEER | BETA | DJANGO/PYTHON |
| 003 | ELENA PETROVA | FRONTEND SPECIALIST | BETA | NUXT.JS/VUE |
| 004 | MIKHAIL SOKOLOV | AI INTEGRATION | GAMMA | ML/AI |
| 005 | ANASTASIA VOLKOVA | MOBILE DEVELOPER | BETA | FLUTTER/DART |
| 006 | SERGEY NOVIKOV | DEVOPS ENGINEER | GAMMA | KUBERNETES |

## 🎨 Color System

| Element | Color | Usage |
|---------|-------|-------|
| Primary Accent | #6FB98F | Scanner line, active states |
| Background | rgba(111, 185, 143, 0.03) | Card glass background |
| Border Inactive | rgba(111, 185, 143, 0.2) | Default card border |
| Border Active | rgba(111, 185, 143, 0.6) | Active card border |
| Text Primary | #FFFFFF | Names, main text |
| Text Secondary | #6FB98F | Roles, technical data |
| Text Tertiary | #9CA3AF | Metadata |

## ⚙️ Technical Implementation

### Auto-Scroll Mechanism

```typescript
useEffect(() => {
  const controls = animate(x, -100 * teamMembers.length, {
    duration: 30,
    repeat: Infinity,
    ease: 'linear',
  });

  return () => controls.stop();
}, [x]);
```

### Active Card Detection

```typescript
useEffect(() => {
  const unsubscribe = x.on('change', (latest) => {
    const cardWidth = 320;
    const scrollPosition = Math.abs(latest);
    const index = Math.round(scrollPosition / cardWidth) % teamMembers.length;
    setActiveIndex(index);
  });

  return () => unsubscribe();
}, [x]);
```

### Infinite Scroll Trick

```typescript
{[...teamMembers, ...teamMembers, ...teamMembers].map((member, index) => (
  <TeamCard
    key={`${member.id}-${index}`}
    member={member}
    isActive={index % teamMembers.length === activeIndex}
  />
))}
```

## 🎬 Animations

### Card Entrance (on first render)
- **Duration**: N/A (controlled by parent scroll)
- **Effect**: Smooth horizontal slide

### Active State Transition
- **Duration**: 300ms
- **Properties**: scale, border, box-shadow, filter

### Glitch Effect
- **Trigger**: Auto (when isActive becomes true)
- **Delay**: 100ms after activation
- **Duration**: 300ms
- **Channels**: Red & Green RGB offset

### 3D Tilt
- **Trigger**: Mouse hover
- **Range**: -10° to +10° on both axes
- **Smooth**: Motion's useTransform with interpolation

### Pulsing Status Dot
- **Duration**: 2s
- **Loop**: Infinite
- **Properties**: opacity, box-shadow

## 📱 Responsive Behavior

### Desktop (1024px+)
- Cards width: 320px
- Gap: 32px (gap-8)
- Visible cards: ~3-4 depending on viewport

### Tablet (768px - 1023px)
- Cards width: 280px
- Gap: 24px
- Visible cards: ~2-3

### Mobile (< 768px)
- Cards width: 280px
- Gap: 16px
- Visible cards: 1-2
- Drag interaction more prominent

## 🔊 Future Sound Integration

Planned sound effects:
```typescript
- onCardActive: playPulseSound()
- onGlitch: playGlitchSound()
- onDragStart: playWhooshSound()
- onDragEnd: playClickSound()
```

## 🚀 Performance Optimizations

1. **React.memo** on TeamCard to prevent unnecessary re-renders
2. **useTransform** instead of re-calculating on every frame
3. **Tripple buffering** for infinite scroll (only 3x data, not infinite)
4. **CSS transforms** for animations (GPU-accelerated)
5. **Lazy loading** images with ImageWithFallback

## 🎯 User Interactions

### Mouse/Touch Events

| Action | Effect |
|--------|--------|
| Hover card | 3D tilt effect + auto-scroll pause |
| Drag left/right | Manual scroll control |
| Card enters center | Color photo + scale up + glitch |
| Card leaves center | B&W photo + scale down |

## 🛠️ Customization Guide

### Add New Team Member

1. Add to `teamMembers` array in `/components/TeamSection.tsx`:
```typescript
{
  id: '007',
  name: 'YOUR NAME',
  role: 'YOUR ROLE',
  accessLevel: 'BETA',
  status: 'ONLINE',
  photo: 'UNSPLASH_URL',
  specialization: 'YOUR_TECH',
}
```

2. Update navigation counter automatically updates

### Change Auto-Scroll Speed

```typescript
animate(x, -100 * teamMembers.length, {
  duration: 30,  // Change this (seconds for full cycle)
  repeat: Infinity,
  ease: 'linear',
});
```

### Modify Card Dimensions

In `/components/TeamCard.tsx`:
```typescript
style={{
  width: 320,  // Change card width
}}

className="relative h-[480px]"  // Change card height
```

### Adjust Glitch Intensity

```typescript
// Offset distance
animate={{ x: [-5, 5, -3, 3, 0] }}  // Increase numbers

// Color opacity
style={{ background: 'rgba(255, 0, 0, 0.3)' }}  // Increase 0.3
```

## 📖 Component Files

```
/components
├── TeamSection.tsx      # Main section container
├── TeamCard.tsx         # Individual card component
└── ImageWithFallback.tsx # Image loader (existing)
```

## 🎨 Design Philosophy

Вместо скучных сеток фотографий, команда представлена как:

✅ **Операторы высокотехнологичной системы**  
✅ **Пилоты космического корабля**  
✅ **Агенты в киберпанк-мире**  
✅ **Инженеры будущего**

❌ Не офисные работники  
❌ Не стандартные портреты  
❌ Не статичные карточки

---

**Last Updated**: 2024.12.30  
**Version**: 1.0.0  
**Designed for**: LINK-DIGITAL IT Agency
