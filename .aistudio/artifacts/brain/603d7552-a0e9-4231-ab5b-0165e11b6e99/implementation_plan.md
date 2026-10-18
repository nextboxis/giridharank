# Bidirectional 60fps Staggered Card Reveal & Cursor-Tracked Spotlight Physics

Deliver a unified, hardware-accelerated 60fps card animation engine across every card in the portfolio—featuring staggered slide-up + fade-in entrance transitions that replay smoothly when scrolling both down and up, paired with a floating hover lift and a cursor-tracked radial spotlight glow on card surfaces and borders.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following card motion decisions were confirmed during clarification and govern this implementation:

- **Confirmed Decision 1 (Staggered 60fps Card Entrance)**: Each card animates into view with a staggered 60fps GPU-composited slide-up and fade-in (`opacity` + `translate3d(0, 22px, 0) scale(0.985)` → `translate3d(0, 0, 0) scale(1)`), cascaded across grid columns (`--card-stagger` index).
- **Confirmed Decision 2 (Floating Hover Lift & Cursor-Tracked Glow)**: Cards respond on hover with a smooth floating elevation (`translate3d(0, -5px, 0)`) and a real-time cursor-tracked radial spotlight (`--mouse-x`, `--mouse-y`) that illuminates the card surface and corner brackets without causing layout reflow or 3D text distortion.
- **Confirmed Decision 3 (Bidirectional Scroll Replay)**: Card entrance animations replay smoothly when scrolling both down and back up the page via a bidirectional `IntersectionObserver`.

---

## 1. Overview & Core Concept

- **What It Does**: Brings cohesive, high-refresh-rate tactile motion to every card component across the portfolio—Hero cards, Technical Arsenal skill cards, Active Operations project cards and simulation rows, Academic Timeline cards, Verified Certification cards, TryHackMe telemetry cards, and Contact cards.
- **Target Audience / Persona**: Visitors and engineering leads exploring the portfolio on desktop, laptop, tablet, or mobile devices.
- **Key Value**: Makes every card feel responsive, alive, and cohesive at a locked 60fps+ without any blur-filter jank or text-warping artifacts.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Bidirectional Staggered Scroll Entrance**: As the user scrolls down or back up the page, cards entering the viewport smoothly glide into place (`translate3d(0, 22px, 0) scale(0.985)` → `translate3d(0, 0, 0) scale(1)`) with a subtle per-row stagger (`55ms` per column index) using a spring-like `cubic-bezier(0.22, 1, 0.36, 1)` curve.
  2. **Cursor-Tracked Surface & Border Spotlight**: Moving the pointer across any card updates CSS custom properties (`--mouse-x`, `--mouse-y`) inside a `requestAnimationFrame` throttle, rendering a soft cyan/accent radial spotlight across the card surface and illuminating the HUD corner brackets on hover.
  3. **Smooth Floating Hover & Active Press**: Hovering a card lifts it cleanly by `-5px` with an expanded ambient glow; clicking/pressing a card gives crisp tactile feedback (`translate3d(0, -2px, 0) scale(0.995)`).
- **Visual Identity & Theme**:
  - *Surface Glow*: Radial spotlight (`radial-gradient(380px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 229, 255, 0.11), transparent 70%)`) in dark mode and soft cobalt (`rgba(0, 102, 255, 0.07)`) in light mode.
  - *Motion Curve*: `cubic-bezier(0.22, 1, 0.36, 1)` for entrance and hover elevation; zero `filter: blur()` so mobile and laptop GPUs stay locked at 60fps.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Separate Scroll-Reveal State from Hover Transform**
  - *Chosen Approach*: Apply a dedicated `.card-reveal-item` class with `--card-stagger` delay during scroll entrance, and once revealed (`.is-card-visible`), transition smoothly to hover elevation (`translate3d(0, -5px, 0)`) with zero transition delay on hover.
  - *Why*: If stagger `transition-delay` remains active after a card is visible, hovering the card feels sluggish and delayed. Clearing the delay once `.is-card-visible` is active ensures instant, responsive hover feedback.
- **Decision 2: `requestAnimationFrame`-Throttled Pointer Spotlight Tracking**
  - *Chosen Approach*: Track pointer coordinates relative to the currently hovered card inside a passive `pointermove` listener gated by `requestAnimationFrame`.
  - *Why*: Delivers a 60fps–120Hz cursor-tracked spotlight across all card types without running `getBoundingClientRect()` on unhovered cards.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Card Animation Pipeline Diagram**:
```
┌───────────────────────────────────────────────────────────────────────────┐
│                    UNIFIED 60FPS CARD ANIMATION ENGINE                    │
├─────────────────────────────────────┬─────────────────────────────────────┤
│  1. Bidirectional Scroll Observer   │  2. Cursor-Tracked Card Spotlight   │
│     (IntersectionObserver)          │     (rAF Pointer Tracker)           │
├─────────────────────────────────────┼─────────────────────────────────────┤
│ • Observes all portfolio cards:     │ • Tracks active hovered card only   │
│   .cyber-card, .skill-card,         │ • Updates --mouse-x & --mouse-y     │
│   .project-card, .sim-row,          │   via requestAnimationFrame         │
│   .cert-card, .timeline-item,       │ • Renders radial surface spotlight  │
│   .thm-stat-box, .thm-badge-pill,   │   + glowing HUD corner brackets     │
│   .contact-method-item              │ • Smooth -5px floating hover lift   │
│ • Entering viewport (down or up):   │   with zero hover delay             │
│   Adds .is-card-visible with        │ • Disabled automatically on coarse  │
│   column-aware --card-stagger       │   touch screens for 60fps scroll    │
│ • Leaving viewport (down or up):    │                                     │
│   Resets .is-card-visible so card   │                                     │
│   replays smoothly on return        │                                     │
└─────────────────────────────────────┴─────────────────────────────────────┘
```
- **Interactive Component & State Mapping**:
  - **Bidirectional Card Observer (`initCardSmoothAnimations`)**: Assigns `--card-stagger` (`0` to `2` based on grid column position) and toggles `.is-card-visible` when `entry.isIntersecting` changes while scrolling down or up.
  - **Tab & Filter Integration**: Switching tabs (`REPOSITORIES` / `SIMULATIONS_&_WORK`) or clicking category filters (`ALL_NODES`, `OFFENSIVE_SEC`, etc.) immediately marks matching cards as `.is-card-visible` with a smooth staggered entrance.
