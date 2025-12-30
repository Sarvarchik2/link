# 📱 Mobile Menu Documentation - LINK-DIGITAL

## Overview
Полноэкранное футуристичное мобильное меню в стиле системного терминала управления для IT-агентства LINK-DIGITAL.

## 🎯 Key Features

### 1. **Full-Screen System Overlay**
- **Background**: 95% black with heavy blur (backdrop-filter: blur(20px))
- **Overlay Effect**: Полностью перекрывает экран вместо выдвижного списка
- **Scroll Lock**: Блокирует скролл основной страницы при открытом меню

### 2. **Futuristic Toggle Button**
Уникальная кнопка-гамбургер с инженерной эстетикой:

```
Закрыто:          Открыто:
  ━━━━           ╲    ╱
    •       →      ╳
━━━━━━━━           ╱    ╲
```

**Features:**
- Две линии разной длины (16px и 24px)
- Пульсирующая точка в центре с outer ring effect
- Плавная трансформация в крестик (X) при клике
- Corner brackets при активном состоянии
- Glowing border и пульсирующая анимация

**Component:** `/components/MenuToggleButton.tsx`

### 3. **HUD Elements** (Heads-Up Display)

#### **Top Left**
```
SYSTEM_STATUS: ACTIVE  [пульсирующий текст]
NAV_MODE: MOBILE
```

#### **Top Right**
```
23:45:30           [обновляется каждую секунду]
GMT+5 TASHKENT
```

#### **Bottom Left**
```
COORD: 41.2995°N
       69.2401°E
```

#### **Bottom Right**
```
BUILD: 2024.12.30
VER: 1.0.0
```

### 4. **Navigation Items**
Вертикальный список в центре экрана:

```
01  ━━━  SERVICES
02  ━━━  PORTFOLIO
03  ━━━  ABOUT
04  ━━━  CONTACT
```

**Interaction:**
- **Number**: Меняет цвет с #6FB98F/40 на #6FB98F при hover
- **Divider**: Расширяется с 24px до 40px при hover
- **Label**: text-3xl, font-mono, tracking-wider
- **Active State**: Зелёный цвет + пульсирующая точка слева
- **Glitch Effect**: RGB-смещение при наведении

### 5. **Visual Effects**

#### **Staggered Reveal Animation**
```typescript
initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
```
Каждый пункт меню появляется с задержкой 100ms.

#### **Glitch on Hover**
```typescript
animate={{
  textShadow: [
    '2px 0 0 rgba(255, 0, 0, 0.3), -2px 0 0 rgba(0, 255, 0, 0.3)',
    '-2px 0 0 rgba(255, 0, 0, 0.3), 2px 0 0 rgba(0, 255, 0, 0.3)',
    '0 0 0 rgba(255, 0, 0, 0.3), 0 0 0 rgba(0, 255, 0, 0.3)',
  ],
}}
```

#### **Particle Effect**
20 плавающих зелёных частиц на фоне с:
- Случайное расположение (Math.random() * 100%)
- Размер: 1-4px
- Анимация: fade in → fade out
- Повторяющийся цикл с random delay

#### **Scan Lines**
```css
background-image: repeating-linear-gradient(
  0deg, 
  transparent, 
  transparent 2px, 
  #6FB98F 2px, 
  #6FB98F 4px
);
opacity: 0.05;
```

#### **Corner Markers**
Четыре угловых маркера (8x8px) с L-образными границами:
```
┏━        ━┓


┗━        ━┛
```

### 6. **Social Links**
Минималистичные иконки в центре внизу:

| Icon | Platform | Stroke Width |
|------|----------|--------------|
| Github | GitHub | 1.5 |
| Linkedin | LinkedIn | 1.5 |
| Send | Telegram | 1.5 |

**Hover Effect:**
- Border: #6FB98F/20 → #6FB98F/60
- Icon: #6FB98F/60 → #6FB98F
- Glow: box-shadow 0 0 20px rgba(111, 185, 143, 0.3)

### 7. **Sound Design**

#### **playGlitchSound()**
Вызывается при открытии меню:
```typescript
// 3 oscillators with different frequencies
[150, 250, 350].forEach((freq, index) => {
  oscillator.type = 'square';
  filter.type = 'bandpass';
  startTime = ctx.currentTime + index * 0.02; // staggered
});
```

#### **Sound Events**
- **Menu Open**: playGlitchSound()
- **Navigation Click**: playClickSound()
- **Hover on Items**: playHoverSound()
- **Social Link Click**: playClickSound()

## 🛠️ Technical Implementation

### Component Structure
```
/components
├── MobileMenu.tsx          # Main overlay component
├── MenuToggleButton.tsx    # Futuristic hamburger button
├── MenuParticleEffect.tsx  # Floating particles
└── Navigation.tsx          # Integration point
```

### State Management
```typescript
const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [currentTime, setCurrentTime] = useState('');
```

### Props Interface
```typescript
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}
```

## 📐 Responsive Behavior

### Desktop (md: 768px+)
- Menu toggle button скрыт (`md:hidden`)
- Показывается горизонтальная навигация

### Mobile (< 768px)
- Показывается MenuToggleButton
- При клике открывается full-screen overlay
- Body scroll блокируется

## 🎨 Color Palette

| Element | Color | Opacity |
|---------|-------|---------|
| Background | #000000 | 95% |
| Accent | #6FB98F | 100% |
| HUD Text | #6FB98F | 40-60% |
| Active Item | #6FB98F | 100% |
| Inactive Item | #9CA3AF | 100% |

## ⚡ Performance Optimizations

1. **AnimatePresence**: Unmount компонента при закрытии
2. **useEffect cleanup**: Восстановление body.overflow
3. **Dependency optimization**: Исключение playGlitchSound из deps
4. **Particle count**: Ограничено 20 частицами
5. **Interval cleanup**: clearInterval при unmount

## 🔧 Customization

### Изменить количество пунктов меню
```typescript
const menuItems = [
  { id: 'services', label: 'SERVICES', number: '01' },
  { id: 'portfolio', label: 'PORTFOLIO', number: '02' },
  // Add more...
];
```

### Изменить время анимации
```typescript
transition={{ 
  delay: 0.1 + index * 0.1,  // Stagger delay
  duration: 0.4               // Animation speed
}}
```

### Изменить количество частиц
```typescript
// В MenuParticleEffect.tsx
const particles = Array.from({ length: 20 }, ...); // Change 20
```

## 📱 Telegram Web App Integration

Для добавления haptic feedback:

```typescript
useEffect(() => {
  if (isOpen && window.Telegram?.WebApp) {
    window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
  }
}, [isOpen]);
```

## 🐛 Known Issues & Solutions

### Issue: playGlitchSound not defined
**Solution:** Добавлена функция в `/hooks/useSoundEffects.ts`

### Issue: Infinite useEffect loop
**Solution:** Удалена `playGlitchSound` из dependency array

### Issue: Body scroll не восстанавливается
**Solution:** Добавлен cleanup в useEffect return function

## 🚀 Future Enhancements

- [ ] **Gestures**: Swipe-to-close для мобильных
- [ ] **Themes**: Light mode support
- [ ] **Accessibility**: Focus trap и keyboard navigation
- [ ] **i18n**: Мультиязычность (RU/EN/UZ)
- [ ] **PWA**: Offline support
- [ ] **Analytics**: Track menu interactions

---

**Last Updated**: 2024.12.30  
**Maintainer**: LINK-DIGITAL Development Team  
**Location**: Tashkent, Uzbekistan
