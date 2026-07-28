/* =========================================================================
   NIGHT ENGINES — FINAL · the combined site
   index    : Vault's scroll-driven WebGL story + boot loader
   brain    : Relay's self-drawing signal path, trimmed to the brain's story
   engine   : Assembly's exploded machine, re-labeled as the engine's parts
   Every module guards on its own DOM — one file serves all pages.
   =========================================================================
   Landing: a scroll-driven WebGL scene in five labeled chapters —
     THE FLOOR   sealed monoliths, one is yours, data never mixes
     THE BRAIN   scattered shards organize into a clean lattice
     THE ENGINE  an agent core spins up, threads of work light the lattice
     THE AIRLOCK outbound items queue at the door; it opens on approval
     MORNING     sealed again; finished work streams to labeled outputs
   Pattern inherited from the Obsidian build: three.js via importmap +
   dynamic import, Float32Array formation targets lerped by smoothed scroll
   progress, spherical camera keyframes, additive-glow sprites, no-webgl
   fallback to a static CSS beauty shot. Subpages: DOM/CSS only.
   ========================================================================= */

const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- 0 · Shared chrome (every page) ------------------------------ */
(function chrome(){
  'use strict';

  // mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('navlinks');
  if (toggle && links){
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      links.classList.toggle('open', !open);
    });
    links.addEventListener('click', (e) => {
      if (e.target.closest('a')){
        toggle.setAttribute('aria-expanded','false');
        links.classList.remove('open');
      }
    });
  }

  const root = document.documentElement;

  if (REDUCED || !('IntersectionObserver' in window)){
    // everything visible, fully drawn, no motion classes added —
    // headings are never hidden unless .sweep-armed is set below
    return;
  }

  /* ink-sweep headings: arm the clip-path hide only now that JS runs */
  root.classList.add('sweep-armed');

  /* self-drawing SVG motifs (vault glyph) */
  root.classList.add('js-draw');
  const svgs = document.querySelectorAll('svg[data-draw]');
  svgs.forEach(svg => {
    let i = 0;
    svg.querySelectorAll('.vg').forEach(el => {
      let len; try { len = el.getTotalLength(); } catch(e){ len = 400; }
      el.style.strokeDasharray = len + ' ' + len;
      el.style.strokeDashoffset = len;
      el.style.setProperty('--d', Math.min(i*140, 1400) + 'ms');
      i++;
    });
  });
  const drawIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.vg').forEach(el => { el.style.strokeDashoffset = '0'; });
      drawIO.unobserve(entry.target);
    });
  }, { threshold:0.4 });
  svgs.forEach(svg => drawIO.observe(svg));

  /* reveals + ink sweeps on view */
  root.classList.add('js-anim');
  const seq = {};
  document.querySelectorAll('.rv').forEach(el => {
    const key = el.getAttribute('data-rv-group');
    if (key){
      seq[key] = seq[key] || 0;
      el.style.setProperty('--d', seq[key]*90 + 'ms');
      seq[key]++;
    }
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      entry.target.classList.add('in');
    });
  }, { threshold:0.15, rootMargin:'0px 0px -5% 0px' });
  document.querySelectorAll('.rv, [data-sweep]').forEach(el => io.observe(el));

  // 1.4s force-reveal safety net — content must never stay hidden
  setTimeout(() => {
    document.querySelectorAll('.rv, [data-sweep]').forEach(el => el.classList.add('in'));
    document.querySelectorAll('svg[data-draw] .vg').forEach(el => { el.style.strokeDashoffset = '0'; });
  }, 1400);
})();

/* ---------- 1 · Landing scene gate -------------------------------------- */
function webglOK(){
  try{
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext &&
      (c.getContext('webgl2') || c.getContext('webgl')));
  }catch(e){ return false; }
}

const sceneCanvas = document.getElementById('scene');
if (sceneCanvas){
  if (REDUCED || !webglOK()){
    document.body.classList.add('no-webgl');
  } else {
    // dynamic import so a CDN failure degrades gracefully to the beauty shot
    import('three').then(initScene).catch(() => document.body.classList.add('no-webgl'));
  }
}

/* ---------- 2 · The scene ------------------------------------------------ */
function initScene(THREE){
  const canvas = sceneCanvas;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias:true, powerPreference:'high-performance' });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.setSize(innerWidth, innerHeight);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x07111f);          // --paper
  scene.fog = new THREE.FogExp2(0x07111f, 0.024);

  const camera = new THREE.PerspectiveCamera(46, innerWidth/innerHeight, 0.1, 400);

  // brand palette only — Nocturne cyanotype (NOT obsidian indigo)
  const INK    = new THREE.Color(0xd9e6f2);
  const ACCENT = new THREE.Color(0x54c6ff);
  const FAINT  = new THREE.Color(0x5f7994);

  scene.add(new THREE.AmbientLight(0x22385a, 1.1));
  const key = new THREE.PointLight(0x54c6ff, 90, 80); key.position.set(2, 12, 12); scene.add(key);
  const rim = new THREE.DirectionalLight(0xd9e6f2, 0.35); rim.position.set(-24, 30, -8); scene.add(rim);

  /* ---- 2a · The floor: ground grid + sealed monolith row ---- */
  const grid = new THREE.GridHelper(300, 75, 0x22385a, 0x142842);
  grid.material.transparent = true; grid.material.opacity = 0.32;
  grid.position.y = 0.01;
  scene.add(grid);

  // additive-glow sprite texture (fake bloom, no postprocessing)
  function glowTexture(){
    const s = 128, c = document.createElement('canvas'); c.width = c.height = s;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(s/2,s/2,0,s/2,s/2,s/2);
    grd.addColorStop(0,   'rgba(255,255,255,1)');
    grd.addColorStop(0.25,'rgba(180,225,255,0.75)');
    grd.addColorStop(1,   'rgba(84,198,255,0)');
    g.fillStyle = grd; g.fillRect(0,0,s,s);
    return new THREE.CanvasTexture(c);
  }
  const glowTex = glowTexture();

  // mono-label sprite (for MORNING destinations)
  function labelSprite(text){
    const fs = 46, pad = 30;
    const c = document.createElement('canvas');
    let g = c.getContext('2d');
    g.font = `500 ${fs}px "Fragment Mono", Menlo, monospace`;
    const w = Math.ceil(g.measureText(text).width) + pad*2 + fs; // + tick square
    c.width = w; c.height = 110;
    g = c.getContext('2d');
    g.font = `500 ${fs}px "Fragment Mono", Menlo, monospace`;
    g.textBaseline = 'middle';
    g.fillStyle = '#54c6ff';
    g.fillRect(pad, 55 - fs*0.28, fs*0.5, fs*0.5);          // accent tick
    g.fillStyle = '#d9e6f2';
    g.fillText(text, pad + fs*0.9, 58);
    const tex = new THREE.CanvasTexture(c);
    tex.anisotropy = 4;
    const mat = new THREE.SpriteMaterial({ map:tex, transparent:true, opacity:0, depthWrite:false });
    const s = new THREE.Sprite(mat);
    const h = 1.35;
    s.scale.set(h * (w/110), h, 1);
    return s;
  }

  // one client, one server: a row of sealed monoliths receding into fog
  const VAULT_W = 9, VAULT_H = 12, VAULT_D = 9;
  const monoGeo = new THREE.BoxGeometry(VAULT_W, VAULT_H, VAULT_D);
  const monoEdges = new THREE.EdgesGeometry(monoGeo);
  const others = [];
  for (let k = 1; k <= 5; k++){
    const m = new THREE.Mesh(monoGeo, new THREE.MeshStandardMaterial({
      color:0x0b1a2c, metalness:0.55, roughness:0.6 }));
    m.position.set(k*15, VAULT_H/2, 0);
    scene.add(m); others.push(m);
    const e = new THREE.LineSegments(monoEdges, new THREE.LineBasicMaterial({
      color:0x5f7994, transparent:true, opacity:0.22 }));
    e.position.copy(m.position);
    scene.add(e);
  }

  // YOUR vault — the one that glows. Body fades to x-ray while we're inside.
  const vault = new THREE.Group();
  const vaultMat = new THREE.MeshStandardMaterial({
    color:0x0e2036, metalness:0.6, roughness:0.5,
    transparent:true, opacity:0.94, depthWrite:true });
  const vaultBody = new THREE.Mesh(monoGeo, vaultMat);
  vault.add(vaultBody);
  const vaultEdgeMat = new THREE.LineBasicMaterial({
    color:0x54c6ff, transparent:true, opacity:0.5, blending:THREE.AdditiveBlending });
  vault.add(new THREE.LineSegments(monoEdges, vaultEdgeMat));

  // door frame + slit on the front face (the airlock)
  const DOOR = new THREE.Vector3(0, 2.9, VAULT_D/2 + 0.02);
  const doorFrame = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.PlaneGeometry(3.6, 5.8)),
    new THREE.LineBasicMaterial({ color:0xd9e6f2, transparent:true, opacity:0.55 }));
  doorFrame.position.copy(DOOR);
  vault.add(doorFrame);
  const slitMat = new THREE.MeshBasicMaterial({ color:0x54c6ff, transparent:true, opacity:0.8,
    blending:THREE.AdditiveBlending, depthWrite:false });
  const slit = new THREE.Mesh(new THREE.PlaneGeometry(0.16, 5.4), slitMat);
  slit.position.set(DOOR.x, DOOR.y, DOOR.z + 0.03);
  vault.add(slit);

  vault.position.set(0, VAULT_H/2, 0);
  scene.add(vault);

  const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex, color:0x54c6ff,
    transparent:true, opacity:0.28, blending:THREE.AdditiveBlending, depthWrite:false }));
  halo.scale.set(26, 26, 1); halo.position.set(0, 6, 0); scene.add(halo);

  /* ---- 2b · The engine core (chapter 3) ---- */
  const CORE = new THREE.Vector3(2.7, 4.0, 1.6);
  const engine = new THREE.Group();
  const ringMat = new THREE.MeshBasicMaterial({ color:0x54c6ff, transparent:true, opacity:0,
    blending:THREE.AdditiveBlending, depthWrite:false });
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.05, 0.03, 8, 64), ringMat);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.72, 0.025, 8, 64), ringMat.clone());
  ring2.rotation.x = Math.PI/2;
  engine.add(ring1, ring2);
  const coreGlow = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex, color:0x54c6ff,
    transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false }));
  coreGlow.scale.set(4.5, 4.5, 1);
  engine.add(coreGlow);
  engine.position.copy(CORE);
  scene.add(engine);

  /* ---- held-item pulse at the airlock (chapter 4) ---- */
  const held = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex, color:0x54c6ff,
    transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false }));
  held.scale.set(2.2, 2.2, 1);
  held.position.set(0, 2.9, VAULT_D/2 - 0.7);
  scene.add(held);

  /* ---- morning destinations (chapter 5) ---- */
  const DESTS = [
    { name:'DRAFTS',  pos:new THREE.Vector3(-17.5, 6.0, 24) },
    { name:'REPORTS', pos:new THREE.Vector3( -6.5, 9.5, 29) },
    { name:'ALERTS',  pos:new THREE.Vector3(  6.5, 9.5, 29) },
    { name:'RECORDS', pos:new THREE.Vector3( 17.5, 6.0, 24) },
  ];
  const destSprites = DESTS.map(d => {
    const s = labelSprite(d.name);
    s.position.copy(d.pos).add(new THREE.Vector3(0, 1.6, 0));
    scene.add(s);
    const g = new THREE.Sprite(new THREE.SpriteMaterial({ map:glowTex, color:0x54c6ff,
      transparent:true, opacity:0, blending:THREE.AdditiveBlending, depthWrite:false }));
    g.scale.set(3, 3, 1); g.position.copy(d.pos); scene.add(g);
    return { label:s, glow:g };
  });

  /* ---- 2c · The particle field: five formation targets ------------------ */
  const N = innerWidth < 820 ? 1800 : 2600;
  const rnd = (a,b) => a + Math.random()*(b-a);

  const fFloor   = new Float32Array(N*3);  // ch1 scattered shards across the floor
  const fLattice = new Float32Array(N*3);  // ch2 clean lattice inside the vault
  const fEngine  = new Float32Array(N*3);  // ch3 lattice + work threads to the core
  const fAirlock = new Float32Array(N*3);  // ch4 ordered queue at the door
  const fMorning = new Float32Array(N*3);  // ch5 streams to labeled destinations
  const colors   = new Float32Array(N*3);
  const seedA    = new Float32Array(N);

  // lattice sites: 6 × 5 × 6 grid centered inside the vault
  const LX = 6, LY = 5, LZ = 6, SPACING = 1.05;
  const latticeCenter = new THREE.Vector3(0, 6.8, -0.6);
  const SITES = LX*LY*LZ;
  const sitePos = (s) => {
    const ix = s % LX, iy = ((s/LX)|0) % LY, iz = (s/(LX*LY))|0;
    return new THREE.Vector3(
      latticeCenter.x + (ix-(LX-1)/2)*SPACING,
      latticeCenter.y + (iy-(LY-1)/2)*SPACING,
      latticeCenter.z + (iz-(LZ-1)/2)*SPACING);
  };

  const doorWorld = new THREE.Vector3(0, 2.9, VAULT_D/2 + 0.4);
  const tmpV = new THREE.Vector3();

  for (let i = 0; i < N; i++){
    const j = i*3;
    seedA[i] = Math.random()*Math.PI*2;
    const u = ((i*137)%1000)/1000;         // stable per-particle hash

    // FLOOR — knowledge scattered across the whole site, low and chaotic
    fFloor[j]   = rnd(-24, 60);
    fFloor[j+1] = Math.pow(Math.random(), 2.2)*10 + 0.15;
    fFloor[j+2] = rnd(-16, 16);

    // LATTICE — each shard takes a shelf position; jitter is tiny = "clean".
    // ~14 shards stack per site, so each site reads as one bright node.
    const site = sitePos(i % SITES);
    fLattice[j]   = site.x + rnd(-0.02, 0.02);
    fLattice[j+1] = site.y + rnd(-0.02, 0.02);
    fLattice[j+2] = site.z + rnd(-0.02, 0.02);

    // ENGINE — 1 in 3 shards leaves the shelf to thread work through the core
    if (i % 3 === 0){
      if (i % 9 === 0){
        // orbit swirl around the core
        const a = seedA[i], r2 = rnd(1.0, 1.6);
        fEngine[j]   = CORE.x + Math.cos(a)*r2;
        fEngine[j+1] = CORE.y + rnd(-0.5, 0.5);
        fEngine[j+2] = CORE.z + Math.sin(a)*r2;
      } else {
        // thread: arc from this shard's shelf position to the core
        tmpV.set(fLattice[j], fLattice[j+1], fLattice[j+2]).lerp(CORE, u);
        const bow = Math.sin(u*Math.PI)*0.7;
        fEngine[j]   = tmpV.x + bow*Math.sin(seedA[i]);
        fEngine[j+1] = tmpV.y + bow*0.5;
        fEngine[j+2] = tmpV.z + bow*Math.cos(seedA[i]);
      }
    } else {
      fEngine[j] = fLattice[j]; fEngine[j+1] = fLattice[j+1]; fEngine[j+2] = fLattice[j+2];
    }

    // AIRLOCK — most shards stay shelved; outbound items queue in ordered
    // rows before the door, single file toward the slit
    if (i % 4 === 0){
      const q = (i/4)|0;
      const col = q % 5, row = ((q/5)|0) % 4, rank = (q/20)|0;
      fAirlock[j]   = (col-2)*0.72 * (1 - Math.min(1, rank*0.04));
      fAirlock[j+1] = 1.6 + row*0.72;
      fAirlock[j+2] = doorWorld.z - 1.2 - rank*0.5;
    } else {
      fAirlock[j] = fLattice[j]; fAirlock[j+1] = fLattice[j+1]; fAirlock[j+2] = fLattice[j+2];
    }

    // MORNING — approved work streams from the door to a labeled destination;
    // 1 in 5 stays as ambient night air
    if (i % 5 === 0){
      fMorning[j]   = rnd(-30, 30);
      fMorning[j+1] = rnd(0.5, 16);
      fMorning[j+2] = rnd(-14, 34);
    } else {
      const d = DESTS[i % 4].pos;
      // quadratic bezier: door → raised mid → destination
      const mx = (doorWorld.x + d.x)/2, my = Math.max(doorWorld.y, d.y) + 4.5, mz = (doorWorld.z + d.z)/2;
      const w = u, iw = 1-w;
      fMorning[j]   = iw*iw*doorWorld.x + 2*iw*w*mx + w*w*d.x + rnd(-0.22,0.22);
      fMorning[j+1] = iw*iw*doorWorld.y + 2*iw*w*my + w*w*d.y + rnd(-0.22,0.22);
      fMorning[j+2] = iw*iw*doorWorld.z + 2*iw*w*mz + w*w*d.z + rnd(-0.22,0.22);
    }

    // colour: pale ink → process cyan, a few bright flecks
    const c = INK.clone().lerp(ACCENT, Math.random()*0.8);
    if (i % 19 === 0) c.lerp(ACCENT, 0.9);
    else if (i % 7 === 0) c.lerp(FAINT, 0.5);
    colors[j] = c.r; colors[j+1] = c.g; colors[j+2] = c.b;
  }

  const geo = new THREE.BufferGeometry();
  const current = new Float32Array(N*3);
  current.set(fFloor);
  geo.setAttribute('position', new THREE.BufferAttribute(current, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const ptsMat = new THREE.PointsMaterial({
    size: innerWidth < 820 ? 0.13 : 0.15, map:glowTex, vertexColors:true,
    transparent:true, opacity:0.95, blending:THREE.AdditiveBlending,
    depthWrite:false, sizeAttenuation:true });
  scene.add(new THREE.Points(geo, ptsMat));

  const states = [fFloor, fLattice, fEngine, fAirlock, fMorning];

  /* ---- 2d · Camera keyframes: one per chapter ---- */
  const cam = [
    { t:new THREE.Vector3(18, 4.5,  0), r:42, theta: 2.66, phi:1.24 }, // FLOOR — drift along the row
    { t:new THREE.Vector3( 0, 6.6, -0.4), r:10, theta: 1.92, phi:1.42 }, // BRAIN — inside, x-ray on
    { t:new THREE.Vector3( 1.5, 5.4, 0.5), r: 9, theta: 0.85, phi:1.30 }, // ENGINE — orbit core + lattice
    { t:new THREE.Vector3( 0, 3.2, 3.0), r: 9, theta: 1.42, phi:1.46 }, // AIRLOCK — face the door
    { t:new THREE.Vector3( 0, 6.0, 9.0), r:36, theta: 1.22, phi:1.22 }, // MORNING — pull back outside
  ];
  const CHAPTERS = ['THE FLOOR','THE BRAIN','THE ENGINE','THE AIRLOCK','MORNING'];
  const hud = document.getElementById('hud');
  const hudItems = hud ? Array.from(hud.querySelectorAll('li')) : [];
  let lastChap = -1;

  /* ---- 2e · Scroll progress over the stage (not the whole document) ---- */
  const stage = document.getElementById('stage');
  let stageStart = 0, stageEnd = 1, fadeEnd = 2;
  function measure(){
    const top = stage ? stage.offsetTop : 0;
    const h = stage ? stage.offsetHeight : document.body.scrollHeight;
    stageStart = top - innerHeight*0.7;
    stageEnd = top + h - innerHeight;
    fadeEnd = stageEnd + innerHeight*0.7;
  }
  measure();

  let targetProg = 0, prog = 0;
  function readScroll(){
    const y = window.scrollY;
    targetProg = Math.min(1, Math.max(0, (y - stageStart) / Math.max(1, stageEnd - stageStart)));
    // fade the canvas + HUD once the story is over
    const fade = 1 - Math.min(1, Math.max(0, (y - stageEnd) / Math.max(1, fadeEnd - stageEnd)));
    canvas.style.opacity = fade.toFixed(3);
    if (hud) hud.classList.toggle('on', fade > 0.5);
  }
  readScroll();
  window.addEventListener('scroll', readScroll, { passive:true });
  window.addEventListener('resize', () => {
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth/innerHeight; camera.updateProjectionMatrix();
    measure(); readScroll();
  }, { passive:true });
  // re-measure once assets settle layout
  window.addEventListener('load', () => { measure(); readScroll(); }, { once:true });

  let mx = 0, my = 0, tmx = 0, tmy = 0;
  if (matchMedia('(pointer:fine)').matches){
    window.addEventListener('pointermove', (e) => {
      tmx = e.clientX/innerWidth - 0.5;
      tmy = e.clientY/innerHeight - 0.5;
    }, { passive:true });
  }

  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden; if (running) requestAnimationFrame(loop);
  });

  const smooth = (a,b,k) => a + (b-a)*k;
  const lerp = (a,b,t) => a + (b-a)*t;
  const smoothstep = (x) => x*x*(3-2*x);
  const clamp01 = (x) => Math.min(1, Math.max(0, x));
  // per-chapter weight: 1 at the chapter's center, 0 a chapter away
  const chW = (seg,k) => clamp01(1 - Math.abs(seg - k));
  const tmpTarget = new THREE.Vector3();

  /* ---- 2f · One rAF loop ---- */
  let t0 = performance.now();
  function loop(now){
    if (!running) return;
    const time = (now - t0)/1000;

    prog = smooth(prog, targetProg, 0.075);
    mx = smooth(mx, tmx, 0.06);
    my = smooth(my, tmy, 0.06);

    // formation interpolation across the 5 states
    const seg = prog*(states.length-1);
    const i0 = Math.min(states.length-2, Math.floor(seg));
    const ft = smoothstep(seg - i0);
    const A = states[i0], B = states[i0+1];
    // idle drift calms down while the shards are shelved (lattice chapters),
    // so the "organized" states actually read as organized
    const blendedSeg = i0 + ft;
    const organized = Math.max(chW(blendedSeg,1), chW(blendedSeg,2)*0.8, chW(blendedSeg,3)*0.8);
    const idleAmp = 0.055*(1 - 0.9*organized);
    for (let k = 0; k < N*3; k += 3){
      const s = seedA[k/3];
      const idle = Math.sin(time*0.6 + s)*idleAmp;
      current[k]   = A[k]   + (B[k]  -A[k]  )*ft + idle;
      current[k+1] = A[k+1] + (B[k+1]-A[k+1])*ft + Math.cos(time*0.5 + s)*idleAmp;
      current[k+2] = A[k+2] + (B[k+2]-A[k+2])*ft + idle;
    }
    geo.attributes.position.needsUpdate = true;

    // camera keyframes (same segmentation)
    const c0 = cam[i0], c1 = cam[i0+1];
    tmpTarget.copy(c0.t).lerp(c1.t, ft);
    const R     = lerp(c0.r, c1.r, ft);
    const theta = lerp(c0.theta, c1.theta, ft) + time*0.022 + mx*0.45;
    const phi   = THREE.MathUtils.clamp(lerp(c0.phi, c1.phi, ft) - my*0.24, 0.5, 2.4);
    camera.position.set(
      tmpTarget.x + R*Math.sin(phi)*Math.cos(theta),
      Math.max(1.2, tmpTarget.y + R*Math.cos(phi)),
      tmpTarget.z + R*Math.sin(phi)*Math.sin(theta));
    camera.lookAt(tmpTarget);

    // chapter weights drive the set dressing
    const blended  = i0 + ft;
    const wBrain   = chW(blended, 1);
    const wEngine  = chW(blended, 2);
    const wAirlock = chW(blended, 3);
    const wMorning = chW(blended, 4);
    const inside   = Math.max(wBrain, wEngine, wAirlock); // x-ray window

    // your vault: solid → x-ray → sealed again
    vaultMat.opacity = 0.94 - 0.88*smoothstep(inside);
    vaultMat.depthWrite = inside < 0.5;
    vaultEdgeMat.opacity = 0.35 + 0.45*inside;
    halo.material.opacity = 0.2 + 0.15*Math.sin(time*1.1) * 0.5 + 0.18*wMorning;

    // door: faint idle pulse; during THE AIRLOCK it opens briefly on "approval"
    const gate = Math.pow(Math.max(0, Math.sin(time*0.55)), 8); // mostly shut, brief open
    slit.scale.x = 1 + gate*wAirlock*10;
    slitMat.opacity = 0.35 + 0.3*Math.sin(time*2.1)*0.5 + 0.45*gate*wAirlock + 0.25*wMorning;
    doorFrame.material.opacity = 0.3 + 0.5*Math.max(wAirlock, wMorning);

    // held item pulses while it waits for the one-word approval
    held.material.opacity = wAirlock * (0.35 + 0.4*Math.abs(Math.sin(time*2.6)));
    held.scale.setScalar(1.8 + 0.5*Math.abs(Math.sin(time*2.6)));

    // engine core spins up beside the lattice
    ring1.rotation.x = time*0.9; ring1.rotation.y = time*0.55;
    ring2.rotation.y = time*1.15;
    ring1.material.opacity = 0.75*wEngine;
    ring2.material.opacity = 0.6*wEngine;
    coreGlow.material.opacity = wEngine*(0.5 + 0.18*Math.sin(time*3.2));

    // morning destinations
    for (const d of destSprites){
      d.label.material.opacity = wMorning;
      d.glow.material.opacity = wMorning*(0.4 + 0.15*Math.sin(time*2 + d.glow.position.x));
    }

    // fog opens up as we pull outside for the finale
    scene.fog.density = 0.024 - 0.009*wMorning;

    // chapter HUD
    const ci = Math.min(CHAPTERS.length-1, Math.round(blended));
    if (ci !== lastChap && hudItems.length){
      hudItems.forEach((li, idx) => li.classList.toggle('on', idx === ci));
      lastChap = ci;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame((n) => { t0 = n; loop(n); });
}

/* ---------- 3 · Boot loader (index only) --------------------------------
   Armed by the inline head script (html.booting, every visit).
   Holds for one full mark-draw, waits for load, never past 3s. */
(function boot(){
  const el = document.getElementById('loader');
  if (!el) return;
  const root = document.documentElement;
  if (!root.classList.contains('booting')){ el.remove(); return; }
  let done = false;
  function finish(){
    if (done) return; done = true;
    el.classList.add('loader--done');
    setTimeout(() => { root.classList.remove('booting'); el.remove(); }, 700);
  }
  const minT = new Promise(r => setTimeout(r, 1700));
  const loadT = new Promise(r => {
    if (document.readyState === 'complete') r();
    else window.addEventListener('load', r, { once:true });
  });
  Promise.all([minT, loadT]).then(finish);
  setTimeout(finish, 3000); // hard net — never trap the visitor
})();

/* ---------- 4 · Brain page: the signal path (from Relay) ----------------
   Three chapters: THE MESS → INGESTION → STRUCTURE (+ a query pulse).
   Groups draw/retract from smoothed scroll progress in chapter space
   (ch1 center = 0 … ch3 center = 2); a cyan pulse rides the live segment. */
(function brainSignal(){
  'use strict';
  const stage = document.getElementById('bstage');
  if (!stage) return;
  const chapters = Array.from(document.querySelectorAll('#brainSignal .chapter'));
  if (chapters.length !== 3 || REDUCED || !('IntersectionObserver' in window)) return;
  // bail-out above leaves the composed static schematic — all linework visible

  const clamp01 = (x) => x < 0 ? 0 : x > 1 ? 1 : x;
  const ss = (x) => x*x*(3-2*x);
  const act = (p,a0,a1) => ss(clamp01((p-a0)/(a1-a0)));
  const byId = (id) => document.getElementById(id);

  const GROUPS = [
    { id:'gSources', a0:-0.85, a1:-0.40 },
    { id:'gClean',   a0: 0.55, a1: 1.00 },
    { id:'gBrain',   a0: 1.30, a1: 1.85 },
    { id:'gQuery',   a0: 1.60, a1: 2.10 }
  ];
  const SCATTER = { id:'gScatter', in0:-0.55, in1:-0.10, out0:0.50, out1:0.90 };

  function collect(gid){
    const g = byId(gid);
    const strokes = [], texts = [];
    g.querySelectorAll('path,line,rect,circle').forEach(el => {
      if (el.classList.contains('hp')) return;
      let len; try { len = el.getTotalLength(); } catch(e){ len = 400; }
      el.style.strokeDasharray = len + ' ' + len;
      el.style.strokeDashoffset = len;
      strokes.push({ el, len });
    });
    g.querySelectorAll('text').forEach(el => { el.style.opacity = 0; texts.push(el); });
    return { strokes, texts, last:-1 };
  }
  const groupState = {};
  GROUPS.forEach(g => { groupState[g.id] = collect(g.id); });
  groupState[SCATTER.id] = collect(SCATTER.id);

  function applyGroup(state, a){
    if (Math.abs(a - state.last) < 0.0015) return;
    state.last = a;
    state.strokes.forEach(s => { s.el.style.strokeDashoffset = s.len * (1 - a); });
    const ta = clamp01(a*1.25 - 0.25);
    state.texts.forEach(t => { t.style.opacity = ta; });
  }

  function route(id, gid){
    const el = byId(id);
    let len; try { len = el.getTotalLength(); } catch(e){ len = 200; }
    return { el, len, gid };
  }
  const ROUTES = [
    ['ps1','ps2','ps3','ps4','ps5'].map(id => route(id,'gScatter')),
    ['pc1','pc2','pc3','pc4','pc5'].map(id => route(id,'gClean')),
    [route('pq','gQuery')]
  ];
  const pulse = byId('gPulse');

  const CH_NAMES = ['THE MESS','INGESTION','STRUCTURE'];
  const hudCh = byId('hudCh');
  const hudTicks = byId('hudTicks') ? byId('hudTicks').children : [];

  let centers = [0,1,2];
  function measure(){
    const sy = window.scrollY || 0;
    centers = chapters.map(el => {
      const r = el.getBoundingClientRect();
      return r.top + sy + r.height/2;
    });
  }
  function targetP(){
    const vc = (window.scrollY || 0) + innerHeight/2;
    const n = centers.length;
    let p;
    if (vc <= centers[0]) p = (vc - centers[0]) / Math.max(1, centers[1]-centers[0]);
    else if (vc >= centers[n-1]) p = (n-1) + (vc - centers[n-1]) / Math.max(1, centers[n-1]-centers[n-2]);
    else for (let i = 0; i < n-1; i++){
      if (vc < centers[i+1]){ p = i + (vc - centers[i]) / Math.max(1, centers[i+1]-centers[i]); break; }
    }
    return Math.max(-1.1, Math.min(2.4, p));
  }
  measure();
  window.addEventListener('resize', measure, { passive:true });
  window.addEventListener('load', measure, { once:true });
  setTimeout(measure, 600); // after fonts settle

  let prog = targetP(), lastIdx = -1;
  let pt = 0, routeIdx = 0, hold = 0;
  let running = true, lastT = performance.now();
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running){ lastT = performance.now(); requestAnimationFrame(loop); }
  });

  function setChapter(idx){
    chapters.forEach((el,i) => el.classList.toggle('is-live', i === idx));
    if (hudCh) hudCh.textContent = 'CH 0' + (idx+1) + ' · ' + CH_NAMES[idx];
    for (let i = 0; i < hudTicks.length; i++) hudTicks[i].classList.toggle('on', i <= idx);
    pt = 0; routeIdx = 0; hold = 0;
  }

  function loop(now){
    if (!running) return;
    const dt = Math.min(0.05, (now - lastT)/1000);
    lastT = now;
    prog += (targetP() - prog) * 0.09;
    const p = prog;

    const aOf = {};
    GROUPS.forEach(g => { aOf[g.id] = act(p, g.a0, g.a1); applyGroup(groupState[g.id], aOf[g.id]); });
    const vis = act(p, SCATTER.in0, SCATTER.in1) * (1 - act(p, SCATTER.out0, SCATTER.out1));
    aOf.gScatter = vis;
    applyGroup(groupState[SCATTER.id], vis);

    const idx = Math.max(0, Math.min(2, Math.round(p)));
    if (idx !== lastIdx){ lastIdx = idx; setChapter(idx); }

    const list = ROUTES[idx];
    const r = list[routeIdx % list.length];
    const maxLen = r.len * (aOf[r.gid] === undefined ? 1 : aOf[r.gid]);
    let op = 0;
    if (p > -0.45 && maxLen > 6){
      const dur = Math.max(1.0, Math.min(2.4, r.len/130));
      if (hold > 0){
        hold -= dt;
        op = Math.max(0, hold*4);
        if (hold <= 0){ pt = 0; routeIdx++; }
      } else {
        pt += dt/dur;
        if (pt >= 1){ pt = 1; hold = 0.22; }
        op = 1;
        if (idx === 0 && pt > 0.7) op = 1 - (pt-0.7)/0.3; // scattered signals die out
      }
      const pos = r.el.getPointAtLength(Math.min(pt*r.len, maxLen));
      pulse.setAttribute('transform', 'translate(' + pos.x + ' ' + pos.y + ')');
    }
    pulse.setAttribute('opacity', op.toFixed(3));
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(n => { lastT = n; loop(n); });
})();

/* ---------- 5 · Engine page: the machine, exploded (from Assembly) ------
   Six plates — brain feed, MCP servers, skills, agents, approval gate,
   the report — seat on scroll with a machined snap, then the machine runs. */
(function engineAssembly(){
  'use strict';
  const asm = document.getElementById('assembly');
  const machine = document.getElementById('machine');
  if (!asm || !machine || REDUCED) return; // static assembled diagram stands

  const plates = [], seams = [];
  for (let i = 1; i <= 6; i++){
    const g = document.getElementById('pl' + i);
    if (!g) return; // markup mismatch → leave the static state alone
    plates.push(g);
    seams.push(g.querySelector('.seam'));
  }
  document.documentElement.classList.add('js-scrub');

  const SEAT = [640, 592, 544, 496, 448, 400];
  const EXP  = [55, 104, 153, 202, 251, 300];
  const S = 0.88/6;
  const SEATSPAN = S*0.72;

  const scan = document.getElementById('scan');
  const core = document.getElementById('core');
  const wrap3d = document.querySelector('.machine-wrap');
  const chaps = Array.from(asm.querySelectorAll('.chap'));
  const hudNo = document.getElementById('hudNo');
  const hudState = document.getElementById('hudState');
  const rail = document.getElementById('asmRail');
  const ticks = rail ? Array.from(rail.children) : [];

  const seated = [false,false,false,false,false,false];
  const flash = [0,0,0,0,0,0];

  let secTop = 0, secLen = 1, target = 0, prog = 0;
  function measure(){
    const r = asm.getBoundingClientRect();
    secTop = r.top + window.scrollY;
    secLen = Math.max(1, asm.offsetHeight - innerHeight);
    read();
  }
  function read(){
    target = Math.min(1, Math.max(0, (window.scrollY - secTop)/secLen));
  }
  measure();
  window.addEventListener('scroll', read, { passive:true });
  window.addEventListener('resize', measure, { passive:true });
  window.addEventListener('load', measure, { once:true });

  let tmx = 0, tmy = 0, mx = 0, my = 0;
  if (matchMedia('(pointer:fine)').matches && wrap3d){
    window.addEventListener('pointermove', (e) => {
      tmx = e.clientX/innerWidth - 0.5;
      tmy = e.clientY/innerHeight - 0.5;
    }, { passive:true });
  }

  function seatEase(t){
    const c = 0.9, s = c + 1, u = t - 1;
    return 1 + s*u*u*u + c*u*u;
  }
  const clamp01 = (v) => Math.min(1, Math.max(0, v));

  let lastChap = -1, lastState = '';
  const STATE_LABEL = ['EXPLODED','SEATING','SEATED'];

  function setChapter(ci){
    chaps.forEach((c,k) => c.classList.toggle('on', k === ci));
    plates.forEach((p,k) => p.classList.toggle('is-live', k === ci));
    if (hudNo) hudNo.textContent = ci < 6 ? 'PLATE 0' + (ci+1) + ' / 06' : 'ENGINE 06 / 06';
    ticks.forEach((t,k) => {
      t.classList.toggle('now', k === ci);
      t.classList.toggle('done', k < ci);
    });
    lastChap = ci;
  }

  let running = true;
  document.addEventListener('visibilitychange', () => {
    running = !document.hidden;
    if (running) requestAnimationFrame(loop);
  });

  function loop(now){
    if (!running) return;
    const time = now/1000;
    prog += (target - prog)*0.085;
    mx += (tmx - mx)*0.06;
    my += (tmy - my)*0.06;

    const runT = clamp01((prog - 0.9)/0.08);

    for (let k = 0; k < 6; k++){
      const t = clamp01((prog - k*S)/SEATSPAN);
      if (t >= 0.999 && !seated[k]){ seated[k] = true; flash[k] = 1; plates[k].classList.add('is-seated'); }
      else if (t < 0.999 && seated[k]){ seated[k] = false; plates[k].classList.remove('is-seated'); }

      const lift = EXP[k]*(1 - (t > 0 ? seatEase(t) : 0));
      const bob = Math.sin(time*0.8 + k*1.4)*4*(1 - t);
      plates[k].setAttribute('transform', 'translate(600,' + (SEAT[k] - lift + bob).toFixed(2) + ')');

      flash[k] *= 0.93;
      if (seams[k]){
        const pulse = runT*(0.22 + 0.26*(0.5 + 0.5*Math.sin(time*1.7 + k*0.9)));
        seams[k].style.opacity = Math.max(flash[k], pulse).toFixed(3);
      }
    }

    const ci = prog >= 0.88 ? 6 : Math.min(5, Math.floor(prog/S));
    if (ci !== lastChap) setChapter(ci);
    let st;
    if (ci === 6) st = 'RUNNING';
    else {
      const tt = clamp01((prog - ci*S)/SEATSPAN);
      st = STATE_LABEL[tt <= 0.02 ? 0 : (tt >= 0.999 ? 2 : 1)];
    }
    if (st !== lastState && hudState){ hudState.textContent = st; lastState = st; }

    if (scan){
      const sy = 664 - ((time*46) % 288);
      scan.setAttribute('transform', 'translate(600,' + sy.toFixed(1) + ')');
      scan.style.opacity = (runT*(0.24 + 0.12*Math.sin(time*3))).toFixed(3);
    }
    if (core) core.style.opacity = (runT*(0.3 + 0.08*Math.sin(time*2.1))).toFixed(3);

    if (wrap3d){
      machine.style.transform = 'rotateX(' + (my*-2.4) + 'deg) rotateY(' + (mx*3.2) + 'deg)';
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
})();
