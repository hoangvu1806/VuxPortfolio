"use client";

import { useEffect, useRef } from "react";

/* Curved lanes of formulas that part around the pointer. Adapted from Originkit's
   Formula Stream. Transparent, so it can be layered over a photo. */

const BASE_RATE = 70; // px/s for a tier-1.0 lane at speed 50
const CURVE = 0.08; // bow height, as a fraction of host height
const STRIP_PX = 18;
const REACH = 240;
const LENS = 0.7; // spacing near the reach edge compresses by (1 - 0.8 * LENS): keep under 1.25
const TIERS = [
    { scale: 0.58, alpha: 0.32, rate: 0.55 },
    { scale: 0.78, alpha: 0.5, rate: 0.75 },
    { scale: 1.0, alpha: 0.75, rate: 1.0 },
    { scale: 1.3, alpha: 1.0, rate: 1.3 },
];
const SUP_SCALE = 0.62;
const SUP_RISE = 0.42;
const SUB_DROP = 0.22;
const SEED = 1729;

const FORMULAS = [
    "P(page exists) = 0",
    "404 = 2² × 101",
    "lim_{t→∞} P(page shows up) = 0",
    "Σ_{i} guests_{i} = 0",
    "balloons / guests = ∞",
    "e^{iπ} + 1 = 0",
    "∫_{−∞}^{∞} e^{−x²} dx = √π",
    "∇ · E = ρ / ε_{0}",
    "iħ ∂ψ/∂t = Ĥψ",
    "E = mc²",
    "a² + b² = c²",
    "ζ(s) = Σ_{n=1}^{∞} 1/n^{s}",
    "x = (−b ± √(b² − 4ac)) / 2a",
    "sin²θ + cos²θ = 1",
    "lim_{n→∞} (1 + 1/n)^{n} = e",
    "P(A|B) = P(B|A) P(A) / P(B)",
    "det(A − λI) = 0",
    "φ = (1 + √5) / 2",
    "S = k_{B} ln Ω",
    "Δx Δp ≥ ħ/2",
    "H(X) = −Σ p(x) log p(x)",
    "n! ≈ √(2πn) (n/e)^{n}",
    "|ψ⟩ = α|0⟩ + β|1⟩",
    "V − E + F = 2",
    "⟨a, b⟩ = |a| |b| cos θ",
];

function mulberry32(a: number) {
    return () => {
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

interface Run {
    text: string;
    level: 0 | 1 | -1; // base, superscript, subscript
    group: number; // runs sharing a group start at the same x (stacked scripts)
}

function parseFormula(src: string): Run[] {
    const runs: Run[] = [];
    let buf = "";
    let group = 0;
    let i = 0;
    let lastWasScript = false;
    const flush = () => {
        if (buf) runs.push({ text: buf, level: 0, group: ++group });
        buf = "";
    };
    while (i < src.length) {
        const c = src[i];
        if ((c === "^" || c === "_") && i + 1 < src.length) {
            flush();
            let body: string;
            if (src[i + 1] === "{") {
                const end = src.indexOf("}", i + 2);
                body = src.slice(i + 2, end < 0 ? src.length : end);
                i = end < 0 ? src.length : end + 1;
            } else {
                body = src[i + 1];
                i += 2;
            }
            // A script directly after a script stacks on it.
            if (!lastWasScript) group++;
            runs.push({ text: body, level: c === "^" ? 1 : -1, group });
            lastWasScript = true;
            continue;
        }
        buf += c;
        lastWasScript = false;
        i++;
    }
    flush();
    return runs;
}
const PARSED = FORMULAS.map(parseFormula);

const fontOf = (px: number) => `italic 400 ${px}px Georgia, "Times New Roman", serif`;

function layoutFormula(ctx: CanvasRenderingContext2D, runs: Run[], px: number) {
    const placed: { text: string; x: number; dy: number; size: number }[] = [];
    let g = -1;
    let gStart = 0;
    let gEnd = 0;
    for (const r of runs) {
        const size = r.level === 0 ? px : px * SUP_SCALE;
        ctx.font = fontOf(size);
        const w = ctx.measureText(r.text).width;
        if (r.group !== g) {
            gStart = gEnd;
            g = r.group;
        }
        const dy = r.level === 1 ? -px * SUP_RISE : r.level === -1 ? px * SUB_DROP : 0;
        placed.push({ text: r.text, x: gStart, dy, size });
        gEnd = Math.max(gEnd, gStart + w + (r.level !== 0 ? px * 0.06 : 0));
    }
    return { width: gEnd, placed };
}

interface Sprite {
    sx: number;
    sy: number;
    sw: number; // device px
    sh: number;
    w: number; // CSS px
    h: number;
    baseline: number;
}

function buildAtlas(px: number, color: string, dpr: number) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;
    const pad = Math.ceil(px * 0.3);
    const h = Math.ceil(px * 1.9);
    const baseline = Math.round(px * 1.2);
    const layouts = PARSED.map((runs) => layoutFormula(ctx, runs, px));
    const maxW = Math.max(...layouts.map((l) => l.width)) + pad * 2;
    const atlasW = Math.max(1024, Math.ceil(maxW * dpr));
    const rowH = Math.ceil(h * dpr) + 2;
    const sprites: Sprite[] = [];
    let cx = 0;
    let cy = 0;
    for (const l of layouts) {
        const sw = Math.ceil((l.width + pad * 2) * dpr);
        if (cx + sw > atlasW) {
            cx = 0;
            cy += rowH;
        }
        const sh = Math.ceil(h * dpr);
        sprites.push({ sx: cx, sy: cy, sw, sh, w: sw / dpr, h: sh / dpr, baseline });
        cx += sw + 2;
    }
    canvas.width = atlasW;
    canvas.height = cy + rowH;
    ctx.fillStyle = color;
    ctx.textBaseline = "alphabetic";
    layouts.forEach((l, i) => {
        const s = sprites[i];
        ctx.setTransform(dpr, 0, 0, dpr, s.sx, s.sy);
        for (const p of l.placed) {
            ctx.font = fontOf(p.size);
            ctx.fillText(p.text, pad + p.x, baseline + p.dy);
        }
    });
    return { canvas, sprites };
}

type Atlas = ReturnType<typeof buildAtlas>;

interface Lane {
    y: number;
    tier: number;
    items: { f: number; x: number }[];
    cycle: number;
    offset: number;
}

function buildLanes(W: number, H: number, density: number, gap: number, bow: number, atlases: Atlas[]): Lane[] {
    const rnd = mulberry32(SEED);
    const span = H + bow * 2 + 80;
    const step = span / density;
    const top = -bow - 40 + step / 2;
    const lanes: Lane[] = [];
    for (let i = 0; i < density; i++) {
        const tier = Math.floor(rnd() * TIERS.length);
        const { sprites } = atlases[tier];
        const order = FORMULAS.map((_, k) => k);
        for (let k = order.length - 1; k > 0; k--) {
            const j = Math.floor(rnd() * (k + 1));
            [order[k], order[j]] = [order[j], order[k]];
        }
        const g = gap * TIERS[tier].scale;
        const maxW = Math.max(...sprites.map((s) => s.w));
        const items: Lane["items"] = [];
        let x = 0;
        let k = 0;
        // The cycle must exceed the viewport plus one formula so a wrap is never visible.
        while (x < W + maxW + g || k < 3) {
            const f = order[k % order.length];
            items.push({ f, x });
            x += sprites[f].w + g;
            k++;
        }
        lanes.push({
            y: top + i * step + (rnd() - 0.5) * step * 0.35,
            tier,
            items,
            cycle: x,
            offset: rnd() * x,
        });
    }
    return lanes;
}

interface FormulaStreamProps {
    color?: string;
    accent?: string;
    /** Overall opacity of the resting text. */
    alpha?: number;
    speed?: number;
    gap?: number;
    className?: string;
}

export function FormulaStream({
    color = "rgb(255, 240, 225)",
    accent = "#ff7a45",
    alpha = 0.3,
    speed = 40,
    gap = 81,
    className,
}: FormulaStreamProps) {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas?.getContext("2d");
        if (!canvas || !ctx) return;

        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const pointer = { tx: 0, ty: 0, x: 0, y: 0, active: false, presence: 0 };
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        let W = 0;
        let H = 0;
        let bow = 0;
        let base: Atlas[] = [];
        let tint: Atlas[] = [];
        let lanes: Lane[] = [];
        let raf = 0;
        let last = -1;

        const laneY = (baseY: number, x: number, s: number) => {
            const u = (x - W / 2) / (W / 2);
            let y = baseY - bow * (1 - u * u);
            if (s > 0) {
                const dx = x - pointer.x;
                const dy = y - pointer.y;
                const q = (dx * dx + dy * dy) / (REACH * REACH);
                if (q < 1) y += dy * s * (1 - q) * (1 - q);
            }
            return y;
        };

        const frame = (now: number) => {
            const dt = last < 0 ? 0 : Math.min(0.05, (now - last) / 1000);
            last = now;

            const ease = 1 - Math.exp(-dt * 10);
            pointer.x += (pointer.tx - pointer.x) * ease;
            pointer.y += (pointer.ty - pointer.y) * ease;
            pointer.presence += ((pointer.active ? 1 : 0) - pointer.presence) * (1 - Math.exp(-dt * 5));
            const strength = LENS * pointer.presence;

            const rate = (speed / 50) * BASE_RATE;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (const lane of lanes) {
                const tier = TIERS[lane.tier];
                lane.offset = (lane.offset + dt * rate * tier.rate) % lane.cycle;
                const b = base[lane.tier];
                const a = tint[lane.tier];
                for (const it of lane.items) {
                    const s = b.sprites[it.f];
                    for (const copy of [0, -lane.cycle]) {
                        const x0 = it.x + lane.offset + copy;
                        if (x0 > W || x0 + s.w < 0) continue;
                        const nStrips = Math.max(1, Math.ceil(s.w / STRIP_PX));
                        const stripW = s.w / nStrips;
                        const srcStrip = s.sw / nStrips;
                        let yL = laneY(lane.y, x0, strength);
                        for (let k = 0; k < nStrips; k++) {
                            const xl = x0 + k * stripW;
                            const yR = laneY(lane.y, xl + stripW, strength);
                            if (xl + stripW >= 0 && xl <= W) {
                                // Vertical shear: x maps straight across, y follows the lane.
                                ctx.setTransform(dpr, ((yR - yL) / stripW) * dpr, 0, dpr, xl * dpr, (yL - s.baseline) * dpr);
                                const sx = s.sx + k * srcStrip;
                                // +0.5 device px of overlap hides the resampling hairline.
                                ctx.globalAlpha = alpha * tier.alpha;
                                ctx.drawImage(b.canvas, sx, s.sy, srcStrip + 0.5, s.sh, 0, 0, stripW + 0.5 / dpr, s.h);
                                if (pointer.presence > 0.005) {
                                    const q = ((xl + stripW / 2 - pointer.x) ** 2 + ((yL + yR) / 2 - s.baseline * 0.35 - pointer.y) ** 2) / (REACH * REACH);
                                    if (q < 1) {
                                        ctx.globalAlpha = tier.alpha * pointer.presence * (1 - q) * (1 - q);
                                        ctx.drawImage(a.canvas, sx, s.sy, srcStrip + 0.5, s.sh, 0, 0, stripW + 0.5 / dpr, s.h);
                                    }
                                }
                            }
                            yL = yR;
                        }
                    }
                }
            }
            ctx.globalAlpha = 1;
            if (!reduced) raf = requestAnimationFrame(frame);
        };

        const resize = () => {
            W = canvas.clientWidth;
            H = canvas.clientHeight;
            if (!W || !H) return;
            canvas.width = Math.round(W * dpr);
            canvas.height = Math.round(H * dpr);
            bow = CURVE * H;
            // Phones get smaller, sparser text: fewer strips to draw and less noise over the copy.
            const narrow = W < 640;
            const px = narrow ? 18 : 26;
            base = TIERS.map((t) => buildAtlas(px * t.scale, color, dpr));
            tint = TIERS.map((t) => buildAtlas(px * t.scale, accent, dpr));
            lanes = buildLanes(W, H, narrow ? 11 : 18, narrow ? gap * 0.6 : gap, bow, base);
            if (reduced) frame(performance.now());
        };
        resize();
        const ro = new ResizeObserver(resize);
        ro.observe(canvas);

        // The canvas sits behind the content, so the pointer is tracked on the window.
        const onMove = (e: PointerEvent) => {
            if (e.pointerType === "touch") return;
            const r = canvas.getBoundingClientRect();
            pointer.tx = e.clientX - r.left;
            pointer.ty = e.clientY - r.top;
            if (!pointer.active && pointer.presence < 0.01) {
                pointer.x = pointer.tx;
                pointer.y = pointer.ty;
            }
            pointer.active = true;
        };
        const onLeave = () => {
            pointer.active = false;
        };
        document.documentElement.addEventListener("pointerleave", onLeave);
        if (!reduced) {
            window.addEventListener("pointermove", onMove, { passive: true });
            raf = requestAnimationFrame(frame);
        }

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            window.removeEventListener("pointermove", onMove);
            document.documentElement.removeEventListener("pointerleave", onLeave);
        };
    }, [color, accent, alpha, speed, gap]);

    return <canvas ref={ref} aria-hidden className={className} />;
}
