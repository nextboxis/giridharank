# Zero-Flash Background Wallpaper Crossfade Fix

Eliminate the white flash that occurs when switching between background wallpapers by fixing the root `<html>` background bleed-through, awaiting GPU bitmap decoding (`img.decode()`), and using a true **Over-Top Crossfade** where the outgoing wallpaper remains at 100% opacity underneath until the incoming wallpaper has completely faded in on top.

## 1. Root Cause of the White Flash

1. **`<html>` White Background Bleed-Through (`#eef2f9`)**:
   - In `style.css`, `:root` defines `--bg-darker: #eef2f9` (white/light gray), while `.dark-mode` is applied to `<body>`, not `<html>`.
   - When `#bg-layer-1` faded out (`1 → 0`) at the same time `#bg-layer-2` faded in (`0 → 1`), their combined opacity at the midpoint was only `75%` (`1 - 0.5 × 0.5 = 0.75`), allowing `25%` of the white `<html>` background (`#eef2f9`) to flash through on every transition.
2. **Same-Frame `backgroundImage` Swap Before GPU Texture Paint**:
   - Setting `style.backgroundImage` and triggering the opacity transition in the same frame caused the browser to decode the WebP image while the outgoing layer was already fading out.

---

## 2. Technical Solution

```
┌───────────────────────────────────────────────────────────────────────────┐
│                 TRUE ZERO-FLASH OVER-TOP CROSSFADE PIPELINE               │
├───────────────────────────────────────────────────────────────────────────┤
│ 1. Decode Bitmap in Memory:                                               │
│    await img.decode() ensures WebP texture is ready in GPU memory.        │
│                                                                           │
│ 2. Stage Incoming Layer (Opacity 0, Top Z-Index):                         │
│    Apply backgroundImage to incoming layer while opacity is 0;            │
│    wait 2 requestAnimationFrame ticks so texture is committed.            │
│                                                                           │
│ 3. Over-Top Fade-In (100% Solid Backing):                                 │
│    Incoming layer (top) fades 0 → 1 while Outgoing layer (bottom)         │
│    STAYS at opacity: 1 underneath. Combined opacity = 100% at all times.  │
│                                                                           │
│ 4. Clean Reset After Transition Completes:                                │
│    Once incoming layer reaches opacity: 1, silently reset outgoing layer. │
└───────────────────────────────────────────────────────────────────────────┘
```

- **`style.css`**:
  - Set `html` and `.bg-crossfade-layer` base fallback `background-color` to dark obsidian (`#080b12`) so no white surface ever exists behind the wallpaper layers.
  - Add `.bg-crossfade-layer.top-layer` (`z-index: 1`) and `.bg-crossfade-layer.base-layer` (`z-index: 0`), while elevating `#cyberCanvas` to `z-index: 2` and `main.container` / `.hud-footer` to `z-index: 3`.
- **`script.js` (`initBackgroundRotation`)**:
  - Pre-decode all 7 wallpapers using `img.decode()`.
  - During `transitionToNext()`, keep the current active layer at `opacity: 1` (`base-layer`), stage the new wallpaper on the incoming layer (`top-layer`), wait two `requestAnimationFrame` cycles, and fade the incoming layer to `opacity: 1` over the solid outgoing layer before resetting the old layer after completion.
