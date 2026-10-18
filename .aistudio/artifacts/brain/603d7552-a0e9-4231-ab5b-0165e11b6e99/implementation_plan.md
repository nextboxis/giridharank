# Precision HUD Pointer & 120Hz+ Smoothness Optimization

Fix the custom Cyber HUD pointer alignment, eliminate native OS cursor overlap, and overhaul the pointer and card-tilt physics engines to use zero-reflow GPU compositor transforms and frame-rate-independent delta-time smoothing.

## User Review & Critical Decisions

> [!IMPORTANT]
> This plan incorporates your confirmed preferences from the clarification step:

- **Confirmed Decision 1 — Precision Centered HUD Dot & Smooth Trailing Ring**: Fix the transform centering offset so both the inner dot and outer ring stay locked to the exact sub-pixel pointer center, with delta-time normalized trailing interpolation.
- **Confirmed Decision 2 — Symmetrical Hover Scaling (No Off-Center Pull)**: Remove the magnetic center-pull on buttons so the outer ring stays centered on the pointer and smoothly scales using GPU-accelerated `scale()` transforms rather than layout-triggering `width`/`height` changes.
- **Confirmed Decision 3 — Complete Native OS Cursor Suppression**: Enforce `cursor: none !important` across all interactive elements when using a fine pointer (`mouse`/`trackpad`), and support touchscreen laptops that also use a mouse.

---

## 1. Overview & Core Concept

- **What It Does**: Resolves three major sources of pointer lag and visual misalignment:
  1. **Centering Offset Fix**: Previously, JavaScript overwrote `translate3d(-50%, -50%, 0)` with `translate3d(x, y, 0)`, placing the top-left corner of the 34px/58px ring at the pointer tip and causing asymmetric expansion on hover.
  2. **Zero-Reflow GPU Compositing**: Removes `backdrop-filter` and `width`/`height` transitions from the moving cursor elements and caches bounding boxes in the 3D card tilt engine, eliminating forced synchronous layout recalculations on every mouse move.
  3. **Universal Fine-Pointer Detection & Native Cursor Hiding**: Uses `(hover: hover) and (pointer: fine)` + `pointermove` detection instead of `navigator.maxTouchPoints > 0` so laptop users with touchscreens still get the custom HUD cursor, while hiding the native OS cursor on all child controls.
- **Target Audience / Persona**: Users navigating the Cyber Sentinel portfolio on 60Hz, 120Hz, or 240Hz displays who expect instant, zero-latency pointer response and silky-smooth card interactions.
- **Key Value**: Delivers a locked-in, zero-jitter tactile HUD pointer and noticeably smoother scrolling and card hovering across the entire application.

---

## 2. User Experience & Visual Design

- **Key User Flows**:
  1. **Instant Dot + Trailing Ring Tracking**: Moving the mouse moves the 6px cyan core dot with zero latency (`translate3d` at exact pointer coordinates) while the 34px outer HUD ring glides smoothly behind it using delta-time normalized interpolation and settles cleanly at rest.
  2. **Interactive Control Hover (`is-hovering`)**: Hovering any link, button, dock item, filter tag, or HUD tracker control smoothly scales the outer ring (`scale(1.45)`) around the exact pointer center and shifts the core dot to emerald green without pulling the ring away from the pointer.
  3. **Card Scanner Hover (`is-card-hover`)**: Hovering any portfolio card transitions the outer ring into a rounded HUD scanner reticle (`border-radius: 10px`, `scale(1.55)`) centered on the cursor, while the card tilts smoothly using cached geometry.
  4. **Click Compression (`is-clicking`)**: Pressing the mouse button compresses the outer ring (`scale(0.78)`) with an instant tactile spring response.
- **Visual Identity & Theme**:
  - *Aesthetic Direction*: High-precision Cyber Sentinel reticle with crisp vector borders and glow shadows, free of heavy per-frame `backdrop-filter` sampling.
  - *Color Palette & Mood*: Preserves `--cyber-cyan` core dot, `--cyber-green` interactive confirmation state, and `#ff003c` Red Team Override mode.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Fixed Centering Margins + Pure `translate3d(x, y, 0) scale(s)`**
  - *Chosen Approach*: Center `.cyber-cursor-dot` (`margin: -3px 0 0 -3px`) and `.cyber-cursor-ring` (`margin: -17px 0 0 -17px`) via fixed half-size negative margins and drive position + hover sizing purely via `translate3d(x, y, 0) scale(s)`.
  - *Why*: Animating `width` and `height` on a moving fixed element triggers browser layout + paint on every frame and shifts the visual center. Fixed dimensions with `scale()` run 100% on the GPU compositor thread.
- **Decision 2: Bounding-Box Caching in 3D Card Tilt & Dock Magnification**
  - *Chosen Approach*: Measure `card.getBoundingClientRect()` once on `mouseenter` (and update on `scroll`/`resize`) instead of calling `getBoundingClientRect()` on every `mousemove` event.
  - *Why*: Calling `getBoundingClientRect()` inside `mousemove` and `requestAnimationFrame` loops forces synchronous DOM reflows 60–120 times per second, which is the primary cause of pointer stutter.

---

## 4. Technical Architecture & Data Strategy *(Technical Reference)*

- **Architecture & Component Diagram**:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     Pointer & Motion Input Pipeline                     │
│  • window 'pointermove' (passive: true, fine pointer detection)         │
│  • Delegated 'mouseover' / 'mouseout' / 'pointerdown' / 'pointerup'     │
└───────────────────┬─────────────────────────────────┬───────────────────┘
                    ▼                                 ▼
┌───────────────────────────────────────┐ ┌───────────────────────────────┐
│   120Hz+ Delta-Time Cursor Engine     │ │  Cached-Rect 3D Tilt & Dock   │
│ • Dot: Instant translate3d(x, y, 0)   │ │ • Cache rect on mouseenter    │
│ • Ring: dt-normalized LERP position   │ │ • Invalidate on scroll/resize │
│   & scale (1.0 -> 1.45 -> 0.78)       │ │ • Auto-sleep rAF when settled │
│ • Auto-sleep rAF when delta < 0.05px  │ │ • Zero getBoundingClientRect  │
│ • Zero layout / paint per frame       │ │   inside mousemove / rAF      │
└───────────────────────────────────────┘ └───────────────────────────────┘
```

- **Data Model & State**:
  - **Cursor Physics State**: `mouseX`, `mouseY` (exact pointer target), `ringX`, `ringY` (interpolated ring coordinates), `currentScale`, `targetScale` (`1` default, `1.45` interactive hover, `1.55` card hover, `0.78` click press), `isVisible`, and `lastFrameTime`.
  - **Cached Card & Dock Geometry**: Each hovered card and the macOS dock stores its active `rect` on `mouseenter` and refreshes it only if a `scroll` or `resize` event occurs while hovered.
- **Interactive Component & State Mapping**:
  - **Universal Native Cursor Lock**: `body.has-custom-cursor, body.has-custom-cursor * { cursor: none !important; }` ensures zero native pointer bleed-through on buttons, links, inputs, skill pills, or HUD tracker dots.
  - **Hover State Resolution**: `e.target.closest(actionSelector)` sets `targetScale = 1.45` and `.is-hovering`; `e.target.closest(cardSelector)` sets `targetScale = 1.55` and `.is-card-hover`; `pointerdown` sets `isClicking = true` (`targetScale = 0.78`).
