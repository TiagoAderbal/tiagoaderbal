import { useEffect, useId, useMemo, useRef, useState } from "react";

// Direções em passos de 45° (0 = direita, 2 = baixo, 4 = esquerda, 6 = cima).
const VEC = Array.from({ length: 8 }, (_, i) => [
  Math.cos((i * Math.PI) / 4),
  Math.sin((i * Math.PI) / 4),
]);

// Elementos da página que as trilhas contornam em vez de passar por cima.
const AVOID_SELECTOR =
  "h1,h2,h3,h4,h5,h6,p,li,a,button,img,input,label,.intrusion-tag,.infection-status,[data-infection-avoid]";
// Para estes, usa a caixa inteira; para o resto, só a área ocupada pelo texto.
const BOX_TAGS = new Set(["IMG", "INPUT", "BUTTON"]);

const REACH = 340; // até onde a infecção se espalha a partir do terminal
const GRID = 4; // célula do mapa de ocupação (evita trilhas se cruzando)

function mulberry32(seed) {
  return function random() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normalize(x, y) {
  const length = Math.hypot(x, y) || 1;
  return [x / length, y / length];
}

// Desloca uma polilinha lateralmente (junções em esquadria), gerando as pistas
// paralelas de um barramento.
function offsetPolyline(points, distance) {
  if (!distance) return points;

  return points.map((point, i) => {
    const prev = points[i - 1];
    const next = points[i + 1];
    const dirIn = prev && normalize(point[0] - prev[0], point[1] - prev[1]);
    const dirOut = next && normalize(next[0] - point[0], next[1] - point[1]);
    const nIn = dirIn && [-dirIn[1], dirIn[0]];
    const nOut = dirOut && [-dirOut[1], dirOut[0]];

    if (!nIn) return [point[0] + nOut[0] * distance, point[1] + nOut[1] * distance];
    if (!nOut) return [point[0] + nIn[0] * distance, point[1] + nIn[1] * distance];

    const miter = normalize(nIn[0] + nOut[0], nIn[1] + nOut[1]);
    const scale = distance / (miter[0] * nIn[0] + miter[1] * nIn[1]);
    return [point[0] + miter[0] * scale, point[1] + miter[1] * scale];
  });
}

const toPath = (points) =>
  `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")}`;

function buildCircuit({ canvas, term, obstacles }) {
  const rand = mulberry32(404);
  const compact = term.w < 560;
  const pitch = compact ? 4 : 5;
  const { w: W, h: H } = canvas;

  const cols = Math.ceil(W / GRID);
  const rows = Math.ceil(H / GRID);
  const occupied = new Uint8Array(cols * rows);

  const traces = [];
  const vias = [];
  const pulses = [];

  const inside = (x, y, r, pad) =>
    x > r.x - pad && x < r.x + r.w + pad && y > r.y - pad && y < r.y + r.h + pad;

  const isOccupied = (x, y, radius) => {
    const c0 = Math.max(0, Math.floor((x - radius) / GRID));
    const c1 = Math.min(cols - 1, Math.floor((x + radius) / GRID));
    const r0 = Math.max(0, Math.floor((y - radius) / GRID));
    const r1 = Math.min(rows - 1, Math.floor((y + radius) / GRID));
    for (let r = r0; r <= r1; r++) {
      for (let c = c0; c <= c1; c++) if (occupied[r * cols + c]) return true;
    }
    return false;
  };

  const markRoute = (points, radius) => {
    for (let i = 1; i < points.length; i++) {
      const [ax, ay] = points[i - 1];
      const [bx, by] = points[i];
      const steps = Math.ceil(Math.hypot(bx - ax, by - ay) / 2);
      for (let s = 0; s <= steps; s++) {
        const x = ax + ((bx - ax) * s) / steps;
        const y = ay + ((by - ay) * s) / steps;
        const c0 = Math.max(0, Math.floor((x - radius) / GRID));
        const c1 = Math.min(cols - 1, Math.floor((x + radius) / GRID));
        const r0 = Math.max(0, Math.floor((y - radius) / GRID));
        const r1 = Math.min(rows - 1, Math.floor((y + radius) / GRID));
        for (let r = r0; r <= r1; r++) {
          for (let c = c0; c <= c1; c++) occupied[r * cols + c] = 1;
        }
      }
    }
  };

  const blocked = (x, y, half) =>
    x < 4 ||
    y < 4 ||
    x > W - 4 ||
    y > H - 4 ||
    inside(x, y, term, half + 1) ||
    obstacles.some((o) => inside(x, y, o, half + 8)) ||
    isOccupied(x, y, half + 3);

  // Roteamento estilo PCB: trechos retos longos, dobras curtas em 45°,
  // nunca voltando em direção ao terminal.
  function route(sx, sy, base, maxLength, half) {
    if (blocked(sx, sy, half)) return null;

    const points = [[sx, sy]];
    let x = sx;
    let y = sy;
    let heading = base;
    let length = 0;
    let first = true;
    let detours = 0;

    for (let turns = 0; length < maxLength && turns < 9; turns++) {
      const diagonal = heading % 2 === 1;
      let segment = diagonal ? 6 + rand() * 16 : first ? 10 + rand() * 24 : 18 + rand() * 60;
      segment = Math.min(segment, maxLength - length);

      let moved = 0;
      let stopped = false;
      while (moved < segment) {
        const step = Math.min(2, segment - moved);
        const nx = x + VEC[heading][0] * step;
        const ny = y + VEC[heading][1] * step;
        if (blocked(nx, ny, half)) {
          stopped = true;
          break;
        }
        x = nx;
        y = ny;
        moved += step;
      }

      if (moved > 0.5) points.push([x, y]);
      length += moved;
      first = false;

      const relative = ((heading - base + 12) % 8) - 4;

      // bateu em texto/borda: tenta desviar de lado em vez de morrer ali
      if (stopped) {
        if (detours >= 2) break;
        const options = (rand() < 0.5 ? [-2, 2, -1, 1] : [2, -2, 1, -1])
          .map((offset) => Math.max(-2, Math.min(2, relative + offset)))
          .filter((rel) => rel !== relative);
        let free;
        for (const rel of options) {
          const h = (base + rel + 8) % 8;
          if (!blocked(x + VEC[h][0] * 6, y + VEC[h][1] * 6, half)) {
            free = rel;
            break;
          }
        }
        if (free === undefined) break;
        heading = (base + free + 8) % 8;
        detours++;
        continue;
      }

      let next;
      if (diagonal) {
        const towardBase = relative > 0 ? relative - 1 : relative + 1;
        const away = relative > 0 ? relative + 1 : relative - 1;
        next = rand() < 0.7 ? towardBase : away;
      } else {
        next = relative + (rand() < 0.5 ? -1 : 1);
      }
      next = Math.max(-2, Math.min(2, next));
      heading = (base + next + 8) % 8;
    }

    return length >= 14 ? points : null;
  }

  function pickLanes() {
    const r = rand();
    if (compact) return r < 0.6 ? 1 : 2;
    return r < 0.4 ? 1 : r < 0.68 ? 2 : r < 0.88 ? 3 : 4;
  }

  function spawnEdge(edgeLength, base, toPoint, edgeIndex) {
    for (
      let pos = 20 + rand() * 24;
      pos < edgeLength - 20;
      pos += (compact ? 16 : 22) + rand() * (compact ? 30 : 46)
    ) {
      if (rand() < 0.15) continue;

      const lanes = pickLanes();
      const half = ((lanes - 1) * pitch) / 2;
      const [sx, sy] = toPoint(pos, half + 4);
      const maxLength = compact ? 30 + rand() * 120 : 60 + rand() * 300;
      const points = route(sx, sy, base, maxLength, half);
      if (!points) continue;

      markRoute(points, half + 2);

      const growDelay = 0.15 + edgeIndex * 0.12 + rand() * 0.6;
      let routeLength = 0;
      for (let i = 1; i < points.length; i++) {
        routeLength += Math.hypot(points[i][0] - points[i - 1][0], points[i][1] - points[i - 1][1]);
      }
      const growDuration = 0.5 + routeLength / 260;

      for (let lane = 0; lane < lanes; lane++) {
        const lanePoints = offsetPolyline(points, -half + lane * pitch);
        const d = toPath(lanePoints);
        traces.push({ d, delay: growDelay, duration: growDuration });

        const [ex, ey] = lanePoints[lanePoints.length - 1];
        if (rand() < 0.8) vias.push({ x: ex, y: ey, delay: growDelay + growDuration });

        if (rand() < 0.3) {
          pulses.push({
            d,
            tone: rand() < 0.6 ? "red" : "lime",
            duration: 1.6 + rand() * 3,
            delay: growDelay + growDuration + rand() * 4,
          });
        }
      }

      pos += lanes * pitch;
    }
  }

  spawnEdge(term.w, 6, (pos, o) => [term.x + pos, term.y - o], 0);
  spawnEdge(term.h, 0, (pos, o) => [term.x + term.w + o, term.y + pos], 1);
  spawnEdge(term.w, 2, (pos, o) => [term.x + term.w - pos, term.y + term.h + o], 2);
  spawnEdge(term.h, 4, (pos, o) => [term.x - o, term.y + term.h - pos], 3);

  return { traces, vias, pulses, compact };
}

function rectsOf(element) {
  if (!BOX_TAGS.has(element.tagName)) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const rects = Array.from(range.getClientRects());
    if (rects.length) return rects;
  }
  return [element.getBoundingClientRect()];
}

function measure(anchor) {
  const frame = anchor.parentElement;
  const host = frame.parentElement?.closest("section") || frame.parentElement;
  if (!host) return null;

  const fr = frame.getBoundingClientRect();
  const hr = host.getBoundingClientRect();
  if (!fr.width || !fr.height) return null;

  const left = Math.max(hr.left, fr.left - REACH);
  const top = Math.max(hr.top, fr.top - REACH);
  const right = Math.min(hr.right, fr.right + REACH);
  const bottom = Math.min(hr.bottom, fr.bottom + REACH);
  const round = (value) => Math.round(value);

  const canvas = { x: round(left - fr.left), y: round(top - fr.top), w: round(right - left), h: round(bottom - top) };
  const term = { x: round(fr.left - left), y: round(fr.top - top), w: round(fr.width), h: round(fr.height) };

  const obstacles = Array.from(host.querySelectorAll(AVOID_SELECTOR))
    // ignora o próprio terminal e elementos decorativos (ex.: texto "corrompido" do Sobre)
    .filter((element) => !frame.contains(element) && !element.closest('[aria-hidden="true"]'))
    // ignora conteúdo visualmente oculto (sr-only): a caixa tem ~1px, mas as linhas
    // de texto dentro dela continuam gerando retângulos enormes e invisíveis
    .filter((element) => {
      const box = element.getBoundingClientRect();
      return box.width > 2 && box.height > 2;
    })
    .flatMap(rectsOf)
    .filter((r) => r.width > 0 && r.height > 0)
    .map((r) => ({ x: round(r.left - left), y: round(r.top - top), w: round(r.width), h: round(r.height) }))
    .filter((r) => r.x < canvas.w && r.y < canvas.h && r.x + r.w > 0 && r.y + r.h > 0);

  return { canvas, term, obstacles, key: JSON.stringify([canvas, term, obstacles]) };
}

// Trilhas de circuito que saem do terminal e se espalham pela seção da página,
// contornando os textos. O cursor "acende" as trilhas próximas.
export default function CircuitInfection() {
  const anchorRef = useRef(null);
  const svgRef = useRef(null);
  const cursorRef = useRef(null);
  const [layout, setLayout] = useState(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const next = measure(anchor);
      setLayout((current) => (next && current?.key === next.key ? current : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const host = anchor.parentElement?.parentElement?.closest("section");
    const observer = new ResizeObserver(schedule);
    observer.observe(anchor);
    if (host) observer.observe(host);
    // animações de entrada (ex.: o chat "abrindo" no Sobre) mudam a posição sem
    // disparar o ResizeObserver; mede de novo quando terminam
    host?.addEventListener("animationend", schedule);
    host?.addEventListener("transitionend", schedule);
    window.addEventListener("resize", schedule);
    document.fonts?.ready.then(schedule);
    schedule();

    return () => {
      observer.disconnect();
      host?.removeEventListener("animationend", schedule);
      host?.removeEventListener("transitionend", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const circuit = useMemo(() => (layout ? buildCircuit(layout) : null), [layout]);

  // Lanterna do cursor: atualiza o círculo da máscara direto no DOM, sem re-render.
  useEffect(() => {
    const svg = svgRef.current;
    const cursor = cursorRef.current;
    if (!svg || !cursor || !layout) return undefined;

    const radius = circuit?.compact ? 90 : 150;
    let frame = 0;
    let last = null;

    const update = () => {
      frame = 0;
      if (!last) return;
      const rect = svg.getBoundingClientRect();
      const x = ((last.clientX - rect.left) * layout.canvas.w) / rect.width;
      const y = ((last.clientY - rect.top) * layout.canvas.h) / rect.height;
      const near = x > -80 && y > -80 && x < layout.canvas.w + 80 && y < layout.canvas.h + 80;
      cursor.setAttribute("cx", x.toFixed(1));
      cursor.setAttribute("cy", y.toFixed(1));
      cursor.style.r = `${near ? radius : 0}px`;
    };

    const onMove = (event) => {
      last = event;
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [layout, circuit]);

  const renderTraces = () => (
    <>
      {circuit.traces.map((trace, index) => (
        <path
          key={index}
          d={trace.d}
          pathLength="1"
          className="trace"
          style={{ animationDelay: `${trace.delay.toFixed(2)}s`, animationDuration: `${trace.duration.toFixed(2)}s` }}
        />
      ))}
      {circuit.vias.map((via, index) => (
        <circle
          key={`v${index}`}
          cx={via.x.toFixed(1)}
          cy={via.y.toFixed(1)}
          r={circuit.compact ? 1.8 : 2.4}
          className="trace-via"
          style={{ animationDelay: `${via.delay.toFixed(2)}s` }}
        />
      ))}
    </>
  );

  let fade = null;
  if (layout) {
    const { canvas, term } = layout;
    const cx = term.x + term.w / 2;
    const cy = term.y + term.h / 2;
    const rx = Math.max(cx, canvas.w - cx, 1);
    const ry = Math.max(cy, canvas.h - cy, 1);
    const inner = Math.min(0.9, term.w / 2 / rx);
    fade = { cx, cy, rx, ry, inner };
  }

  return (
    <div ref={anchorRef} className="circuit-anchor" aria-hidden="true">
      {layout && circuit && (
        <svg
          ref={svgRef}
          className="circuit-infection"
          style={{
            left: layout.canvas.x,
            top: layout.canvas.y,
            width: layout.canvas.w,
            height: layout.canvas.h,
          }}
          viewBox={`0 0 ${layout.canvas.w} ${layout.canvas.h}`}
        >
          <defs>
            <radialGradient
              id={`${uid}-fade`}
              gradientUnits="userSpaceOnUse"
              cx={fade.cx}
              cy={fade.cy}
              r={fade.rx}
              gradientTransform={`translate(${fade.cx} ${fade.cy}) scale(1 ${fade.ry / fade.rx}) translate(${-fade.cx} ${-fade.cy})`}
            >
              <stop offset="0" stopColor="#fff" />
              <stop offset={fade.inner} stopColor="#fff" />
              <stop offset={fade.inner + (1 - fade.inner) * 0.45} stopColor="#fff" stopOpacity="0.55" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id={`${uid}-fade-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={layout.canvas.w} height={layout.canvas.h}>
              <rect width={layout.canvas.w} height={layout.canvas.h} fill={`url(#${uid}-fade)`} />
            </mask>

            <radialGradient id={`${uid}-glow`}>
              <stop offset="0" stopColor="#fff" />
              <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
              <stop offset="1" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id={`${uid}-lit-mask`} maskUnits="userSpaceOnUse" x="0" y="0" width={layout.canvas.w} height={layout.canvas.h}>
              <circle ref={cursorRef} className="circuit-cursor" cx="-999" cy="-999" r="0" fill={`url(#${uid}-glow)`} />
            </mask>
          </defs>

          <g mask={`url(#${uid}-fade-mask)`}>
            <g className="traces">{renderTraces()}</g>
            <g className="traces traces--lit" mask={`url(#${uid}-lit-mask)`}>
              {renderTraces()}
            </g>
            <g className="trace-pulses">
              {circuit.pulses.map((pulse, index) => (
                <path
                  key={index}
                  d={pulse.d}
                  pathLength="1"
                  className={`trace-pulse trace-pulse--${pulse.tone}`}
                  style={{ animationDelay: `${pulse.delay.toFixed(2)}s`, animationDuration: `${pulse.duration.toFixed(2)}s` }}
                />
              ))}
            </g>
          </g>
        </svg>
      )}
    </div>
  );
}
