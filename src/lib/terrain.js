/**
 * Seeded organic terrain generator for the Atlas map graphics.
 * Produces nested, non-crossing contour rings (topographic style)
 * at build time. lerpPath() interpolates two homologous path strings
 * on the client for the Redraw scroll-morph.
 */

/** Deterministic PRNG (mulberry32). */
export function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Smooth closed path (Catmull-Rom → cubic bezier) through points. */
function closedCurve(pts) {
  const n = pts.length;
  let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + ' Z';
}

/**
 * Generate nested contour rings for one terrain feature.
 * All rings share one base wobble profile so they nest cleanly,
 * with small per-ring jitter so they don't look mechanically scaled.
 *
 * @returns {string[]} SVG path `d` strings, outermost first.
 */
export function terrainRings({
  seed = 1,
  cx,
  cy,
  rMax,
  rings = 5,
  points = 10,
  wobble = 0.42,
  jitter = 0.05,
  rMinFrac = 0.16,
  phase = 0,
  stretchX = 1,
  stretchY = 1,
}) {
  const rand = mulberry32(seed);
  const profile = Array.from({ length: points }, () => 1 + (rand() - 0.5) * wobble);
  const paths = [];
  for (let k = 0; k < rings; k++) {
    const frac = 1 - (k / Math.max(rings - 1, 1)) * (1 - rMinFrac);
    const r = rMax * frac;
    const pts = [];
    for (let i = 0; i < points; i++) {
      const a = phase + (i / points) * Math.PI * 2;
      const rr = r * profile[i] * (1 + (rand() - 0.5) * jitter * 2);
      pts.push([cx + rr * Math.cos(a) * stretchX, cy + rr * Math.sin(a) * stretchY]);
    }
    paths.push(closedCurve(pts));
  }
  return paths;
}

/** Open, gently waving horizontal contour line across a canvas. */
export function flowLine({ seed = 1, y, width, amp = 10, segments = 5 }) {
  const rand = mulberry32(seed);
  const step = width / segments;
  let d = `M ${-step * 0.2} ${(y + (rand() - 0.5) * amp).toFixed(1)}`;
  let px = -step * 0.2;
  let py = y + (rand() - 0.5) * amp;
  for (let i = 1; i <= segments + 1; i++) {
    const x = i * step;
    const ny = y + (rand() - 0.5) * amp * 2;
    const cx1 = px + step * 0.4;
    const cx2 = x - step * 0.4;
    d += ` C ${cx1.toFixed(1)} ${py.toFixed(1)}, ${cx2.toFixed(1)} ${ny.toFixed(1)}, ${x.toFixed(1)} ${ny.toFixed(1)}`;
    px = x;
    py = ny;
  }
  return d;
}

/**
 * Interpolate two homologous SVG path `d` strings (same commands / point count).
 * Used to morph terrainRings() output between two measurements.
 */
export function lerpPath(a, b, t) {
  if (t <= 0) return a;
  if (t >= 1) return b;
  const numsB = b.match(/-?\d*\.?\d+/g);
  if (!numsB) return a;
  let i = 0;
  return a.replace(/-?\d*\.?\d+/g, (n) => {
    const end = numsB[i++];
    if (end == null) return n;
    return (Number(n) + (Number(end) - Number(n)) * t).toFixed(1);
  });
}
