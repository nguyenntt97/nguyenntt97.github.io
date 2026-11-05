/*
 * splat-head.js — a tiny dependency-free "Gaussian splat" head.
 * Points start scattered (like a sparse-view SfM initialization), converge
 * onto a procedural head surface, then idle with listener-style nods.
 * Drag to orbit. Pauses when offscreen; respects prefers-reduced-motion.
 */
(function () {
  "use strict";
  const canvas = document.getElementById("splat-head");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- procedural head surface (displaced Fibonacci sphere) ----------
  const N = 6000;
  const G = (x, s) => Math.exp(-(x * x) / (s * s));
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  // unit direction -> point on the head surface (z+ faces the viewer)
  // facial-feature masks on the unit sphere (z+ faces the viewer)
  const eyeM = (x, y, z) => G(Math.abs(x) - 0.4, 0.13) * G(y - 0.12, 0.07) * Math.max(z, 0);
  const browM = (x, y, z) => G(Math.abs(x) - 0.4, 0.17) * G(y - 0.3, 0.035) * Math.max(z, 0);
  const lipM = (x, y, z) => G(x, 0.24) * G(y + 0.45, 0.06) * Math.max(z, 0);
  function surf(x, y, z) {
    const front = Math.max(z, 0);
    let d = 0;
    d += 0.34 * G(x, 0.1) * G(y + 0.02, 0.2) * front * front; // nose bridge + tip
    d += 0.08 * G(x, 0.2) * G(y + 0.2, 0.06) * front; // nostrils
    d -= 0.16 * G(Math.abs(x) - 0.4, 0.15) * G(y - 0.1, 0.1) * front; // eye sockets
    d += 0.1 * G(Math.abs(x) - 0.38, 0.24) * G(y - 0.28, 0.06) * front; // brow ridge
    d += 0.08 * lipM(x, y, z); // lips
    d += 0.07 * G(x, 0.22) * G(y + 0.75, 0.09) * front; // chin
    d += 0.06 * G(Math.abs(x) - 0.55, 0.16) * G(y + 0.12, 0.14) * front; // cheekbones
    d += 0.12 * G(Math.abs(x) - 0.98, 0.07) * G(y, 0.15) * G(z, 0.22); // ears
    const R = 1 + d;
    let px = x * R * 0.8,
      py = y * R * 1.04,
      pz = z * R * (z > 0 ? 0.82 : 0.95); // flatter face, rounder skull
    if (py < -0.2) {
      const k = Math.min(1, (-py - 0.2) / 0.85);
      px *= 1 - 0.4 * k; // jaw taper
      if (pz < 0) pz *= 1 - 0.45 * k; // slimmer back of the jaw
    }
    return [px, py, pz];
  }
  const norm = (v) => {
    const l = Math.hypot(v[0], v[1], v[2]) || 1;
    return [v[0] / l, v[1] / l, v[2] / l];
  };
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const x = Math.cos(th) * r,
      z = Math.sin(th) * r;
    const h = (Math.imul(i, 2654435761) >>> 0) / 4294967296; // stable hash in [0,1)
    if (z < -0.05 && h < 0.7) continue; // sample the face densely, the skull sparsely
    if (z >= -0.05 && z < 0.4 && h < 0.4) continue;
    const P = surf(x, y, z);
    if (P[1] < -0.92 && z < 0.3) continue; // open the bottom for the neck
    // surface normal by finite differences along two tangents of the sphere
    const t1 = norm(Math.abs(y) < 0.99 ? [-z, 0, x] : [1, 0, 0]);
    const t2 = [y * t1[2] - z * t1[1], z * t1[0] - x * t1[2], x * t1[1] - y * t1[0]];
    const e = 0.01;
    const A = surf(...norm([x + t1[0] * e, y + t1[1] * e, z + t1[2] * e]));
    const B = surf(...norm([x + t2[0] * e, y + t2[1] * e, z + t2[2] * e]));
    const u = [A[0] - P[0], A[1] - P[1], A[2] - P[2]],
      v = [B[0] - P[0], B[1] - P[1], B[2] - P[2]];
    let n = norm([u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]);
    if (n[0] * x + n[1] * y + n[2] * z < 0) n = n.map((k) => -k);
    // albedo: darker eyes, brows, and lips make the face legible as a point cloud
    const alb = 1 - 0.85 * Math.min(1, 1.6 * eyeM(x, y, z)) - 0.5 * Math.min(1, 1.5 * browM(x, y, z)) - 0.35 * Math.min(1, 1.5 * lipM(x, y, z));
    pts.push({ tx: P[0], ty: P[1], tz: P[2], nx: n[0], ny: n[1], nz: n[2], alb });
  }
  // neck
  for (let i = 0; i < 260; i++) {
    const a = Math.random() * Math.PI * 2,
      h = -0.8 - Math.random() * 0.55;
    pts.push({ tx: Math.cos(a) * 0.36, ty: h, tz: Math.sin(a) * 0.36 - 0.08, nx: Math.cos(a), ny: 0, nz: Math.sin(a) });
  }
  for (const p of pts) {
    // scattered init around a noisy shell
    const s = 1.6 + Math.random() * 1.2;
    const a = Math.random() * Math.PI * 2,
      b = Math.acos(2 * Math.random() - 1);
    p.sx = Math.sin(b) * Math.cos(a) * s;
    p.sy = Math.cos(b) * s;
    p.sz = Math.sin(b) * Math.sin(a) * s;
    p.delay = Math.random() * 0.35;
    p.size = 0.6 + Math.random() * 0.8;
  }

  // sparse capture cameras (yaw angles, radians)
  const cams = [-0.75, -0.25, 0.25, 0.75];

  // ---------- theme-aware splat sprites ----------
  let sprites = [],
    dark = false,
    lineColor = "rgba(0,0,0,.25)";
  function buildSprites() {
    dark = document.documentElement.getAttribute("data-theme") === "dark";
    lineColor = dark ? "rgba(255,255,255,.28)" : "rgba(20,24,35,.28)";
    // shadow -> accent -> highlight ramp, so lighting reads the same in both themes
    // monochrome "pencil" ramp: shadow -> highlight
    const lo = dark ? [45, 45, 45] : [17, 17, 17];
    const hi = dark ? [255, 255, 255] : [185, 185, 185];
    const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
    sprites = [];
    for (let k = 0; k < 16; k++) {
      const t = k / 15; // shade 0..1
      const c = mix(lo, hi, t);
      const sz = 32,
        sp = document.createElement("canvas");
      sp.width = sp.height = sz;
      const g = sp.getContext("2d");
      const grd = g.createRadialGradient(sz / 2, sz / 2, 0, sz / 2, sz / 2, sz / 2);
      grd.addColorStop(0, `rgba(${c},${dark ? 0.55 + 0.4 * t : 0.9})`);
      grd.addColorStop(0.45, `rgba(${c},${dark ? 0.2 + 0.15 * t : 0.35})`);
      grd.addColorStop(1, `rgba(${c},0)`);
      g.fillStyle = grd;
      g.fillRect(0, 0, sz, sz);
      sprites.push(sp);
    }
  }
  buildSprites();
  new MutationObserver(buildSprites).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  // ---------- sizing ----------
  let W = 0,
    H = 0,
    dpr = 1;
  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
  }
  resize();
  window.addEventListener("resize", resize);

  // ---------- interaction ----------
  let yaw = 0.5,
    pitch = 0,
    dragging = false,
    lastX = 0,
    lastY = 0,
    userYaw = 0,
    userPitch = 0,
    lastInteract = -1e9;
  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    userYaw += (e.clientX - lastX) * 0.01;
    userPitch = Math.max(-0.6, Math.min(0.6, userPitch + (e.clientY - lastY) * 0.006));
    lastX = e.clientX;
    lastY = e.clientY;
    lastInteract = performance.now();
  });
  const end = () => (dragging = false);
  canvas.addEventListener("pointerup", end);
  canvas.addEventListener("pointercancel", end);

  // ---------- render loop ----------
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const L = (() => {
    const v = [-0.35, 0.45, 0.85],
      n = Math.hypot(...v);
    return v.map((k) => k / n);
  })();
  let visible = true,
    start = performance.now(),
    raf = 0;
  const order = new Array(pts.length);
  const proj = pts.map(() => ({ x: 0, y: 0, z: 0, s: 0, k: 0 }));

  function frame(now) {
    const t = (now - start) / 1000;
    const conv = reduce ? 1 : Math.min(1, t / 2.6);
    // listener-style nod + small sway
    const nod = reduce ? 0 : 0.07 * Math.sin(t * 1.6) * Math.max(0, Math.sin(t * 0.45));
    // gentle three-quarter swing so the face stays readable
    yaw = userYaw + (reduce ? 0.35 : 0.1 + 0.55 * Math.sin(t * 0.3));
    pitch = userPitch + nod;
    const cy = Math.cos(yaw),
      sy = Math.sin(yaw),
      cp = Math.cos(pitch),
      sp = Math.sin(pitch);

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const scale = Math.min(W, H) * 0.37,
      cx = W / 2,
      cyy = H / 2 - scale * 0.16,
      camD = 7;
    const rot = (x, y, z) => {
      const x1 = x * cy + z * sy,
        z1 = -x * sy + z * cy;
      const y2 = y * cp - z1 * sp,
        z2 = y * sp + z1 * cp;
      return [x1, y2, z2];
    };
    const project = (x, y, z) => {
      const f = camD / (camD - z);
      return [cx + x * scale * f, cyy - y * scale * f, f];
    };

    // camera frustums (fade out after convergence)
    const camAlpha = reduce ? 0.35 : 0.15 + 0.6 * (1 - ease(Math.min(1, Math.max(0, (t - 2.2) / 1.5))));
    ctx.strokeStyle = lineColor;
    ctx.globalAlpha = camAlpha;
    ctx.lineWidth = 1;
    for (const a of cams) {
      const c = [Math.sin(a) * 2.2, 0.15, Math.cos(a) * 2.2];
      const fwd = [-Math.sin(a), 0, -Math.cos(a)],
        right = [Math.cos(a), 0, -Math.sin(a)];
      const corners = [
        [-1, -1],
        [1, -1],
        [1, 1],
        [-1, 1],
      ].map(([u, v]) => [c[0] + fwd[0] * 0.35 + right[0] * u * 0.18, c[1] + v * 0.13, c[2] + fwd[2] * 0.35 + right[2] * u * 0.18]);
      const pc = project(...rot(...c)),
        pk = corners.map((q) => project(...rot(...q)));
      ctx.beginPath();
      for (const q of pk) {
        ctx.moveTo(pc[0], pc[1]);
        ctx.lineTo(q[0], q[1]);
      }
      ctx.moveTo(pk[0][0], pk[0][1]);
      for (let i = 1; i <= 4; i++) ctx.lineTo(pk[i % 4][0], pk[i % 4][1]);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // splats
    for (let i = 0; i < pts.length; i++) {
      const p = pts[i];
      const k = ease(Math.max(0, Math.min(1, (conv - p.delay) / (1 - p.delay))));
      const x = p.sx + (p.tx - p.sx) * k,
        y = p.sy + (p.ty - p.sy) * k,
        z = p.sz + (p.tz - p.sz) * k;
      const r = rot(x, y, z),
        n = rot(p.nx, p.ny, p.nz);
      const pr = project(r[0], r[1], r[2]);
      const lam = Math.max(0, n[0] * L[0] + n[1] * L[1] + n[2] * L[2]);
      const o = proj[i];
      o.x = pr[0];
      o.y = pr[1];
      o.z = r[2];
      o.s = (3.2 + 8 * (1 - k)) * p.size * pr[2];
      o.k = Math.round(15 * Math.pow(lam, 1.3) * (p.alb ?? 1) * (0.4 + 0.6 * k));
      o.facing = n[2] > 0.08 || k < 0.9; // cull grazing/back splats (no rim pile-up)
      order[i] = i;
    }
    order.sort((a, b) => proj[a].z - proj[b].z);
    ctx.globalCompositeOperation = "source-over";
    for (const i of order) {
      const o = proj[i];
      if (!o.facing) continue;
      ctx.drawImage(sprites[o.k], o.x - o.s, o.y - o.s, o.s * 2, o.s * 2);
    }
    ctx.globalCompositeOperation = "source-over";

    if (visible && !(reduce && t > 0.1 && !dragging && now - lastInteract > 100)) raf = requestAnimationFrame(frame);
    else raf = 0;
  }

  const kick = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };
  canvas.addEventListener("pointermove", kick);
  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    if (visible) kick();
  }).observe(canvas);
  kick();
})();
