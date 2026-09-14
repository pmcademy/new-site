/**
 * Builds the layered art for the learner workspace.
 *
 *   node scripts/build-workspace-art.mjs
 *
 * Writes one file per object per lighting state into public/workspace/.
 * The room is a stack of independent image layers, so any single object can be
 * replaced by commissioned art later without touching the engine: keep the
 * file name, the canvas size and the transparent margins, and the scene will
 * not notice the difference.
 *
 * Why SVG rather than PNG or WebP: these files are one to four kilobytes each,
 * they stay crisp on any display, and they are diffable in review. They are
 * loaded as plain images, not inlined, so they behave exactly like raster
 * layers. When real art arrives, point the manifest at .webp instead.
 *
 * Lighting is baked, not filtered. A night room is not a day room with a blue
 * overlay: the lamp pools warm light on the desk while the corners go cold,
 * and that reads as a room rather than a tinted screenshot.
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OUT = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "workspace");
mkdirSync(OUT, { recursive: true });

/* -------------------------------------------------------------------------- */
/* Palettes. Derived from the site tokens, then pushed for atmosphere.         */
/* -------------------------------------------------------------------------- */

const DAY = {
  wall: "#a8b79d",
  wallDeep: "#889679",
  wallLit: "#d5e0cd",
  floor: "#b98f52",
  floorDark: "#946f3c",
  skirt: "#ece5d1",
  wood: "#c99a5b",
  woodDark: "#a87b42",
  woodEdge: "#7d5a2d",
  ink: "#344659",
  ink2: "#5b6f7d",
  paper: "#fff7df",
  paperShade: "#ecdcb4",
  sky: "#cfe0e6",
  skyLow: "#f2e4cf",
  leaf: "#6d8a70",
  leafDeep: "#4f6a55",
  leafLight: "#8fae86",
  coral: "#c77764",
  blue: "#5c7f95",
  blueLight: "#afc9d4",
  sage: "#89ada3",
  metal: "#9aa7ab",
  glow: "#f6dfa8",
  shadow: "#8f9a90",
  cork: "#d8b57e",
  screen: "#e9edea",
};

const NIGHT = {
  wall: "#26333a",
  wallDeep: "#161f26",
  wallLit: "#3a4a4c",
  floor: "#2a2b2c",
  floorDark: "#1e1f20",
  skirt: "#333f44",
  wood: "#5f4e37",
  woodDark: "#4a3d2b",
  woodEdge: "#332a1d",
  ink: "#131c24",
  ink2: "#3b4a55",
  paper: "#d9cfae",
  paperShade: "#a89a76",
  sky: "#16232e",
  skyLow: "#1d2c38",
  leaf: "#3c5148",
  leafDeep: "#2b3b35",
  leafLight: "#4e6a5b",
  coral: "#8c5647",
  blue: "#3d5a6b",
  blueLight: "#5d7d8c",
  sage: "#4c6a66",
  metal: "#5a666b",
  glow: "#e5ae77",
  shadow: "#151d24",
  cork: "#8a7350",
  screen: "#cfe0d8",
};

const variants = [
  ["day", DAY],
  ["night", NIGHT],
];

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" fill="none">${body}</svg>\n`;

function write(name, contents) {
  writeFileSync(join(OUT, name), contents);
  return name;
}

/* -------------------------------------------------------------------------- */
/* The room. Everything fixed: wall, window, floor, desk, shelf, board.        */
/* -------------------------------------------------------------------------- */

function room(c, night) {
  const W = 1200;
  const H = 675;

  /* Hanging foliage across the top, the one motif borrowed from the brief's
     reference images. Two layers, deterministic, so the room never reshuffles
     between renders or between the day and night versions. */
  const vine = (i, x, back) => {
    const len = (back ? 30 : 44) + ((i * 53) % (back ? 46 : 78));
    const sway = 8 + ((i * 17) % 9);
    const stroke = back ? c.leafDeep : c.leaf;
    let g = `<path d="M${x} -4 q ${sway} ${len * 0.52} ${-sway * 0.5} ${len}" stroke="${stroke}" stroke-width="${
      back ? 2 : 2.8
    }" stroke-linecap="round" fill="none"/>`;
    const leaves = back ? 3 : 5;
    for (let k = 1; k <= leaves; k++) {
      const t = k / (leaves + 0.6);
      const lx = x + sway * t * (1.6 - t) * 1.5;
      const ly = len * t;
      const r = back ? 4.4 : 6.2;
      g += `<ellipse cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" rx="${r}" ry="${(r * 0.6).toFixed(
        1
      )}" fill="${k % 2 ? stroke : back ? c.leaf : c.leafLight}" opacity="${
        back ? 0.7 : 0.95
      }" transform="rotate(${((i * 23 + k * 37) % 80) - 40} ${lx.toFixed(1)} ${ly.toFixed(1)})"/>`;
    }
    return g;
  };

  let vinesBack = "";
  for (let i = 0; i < 52; i++) vinesBack += vine(i, 6 + i * 23 + ((i * 31) % 9), true);
  let vinesFront = "";
  for (let i = 0; i < 30; i++) vinesFront += vine(i + 7, 18 + i * 40 + ((i * 47) % 15), false);

  /* Daylight falls through the window and lands on the wall and the floor. At
     night the pool comes from the desk lamp instead, so the bright part of the
     room moves from the left wall to the middle of the desk. */
  const light = night
    ? `<ellipse cx="700" cy="430" rx="360" ry="200" fill="url(#lampGlow)"/>
       <ellipse cx="660" cy="600" rx="300" ry="58" fill="url(#floorGlow)"/>`
    : `<path d="M92 120 L392 96 L520 470 L120 470 Z" fill="${c.wallLit}" opacity="0.5"/>
       <path d="M150 472 L520 472 L640 640 L190 640 Z" fill="${c.paper}" opacity="0.22"/>`;

  const stars = night
    ? Array.from({ length: 22 }, (_, i) => {
        const x = 112 + ((i * 61) % 244);
        const y = 190 + ((i * 43) % 210);
        return `<circle cx="${x}" cy="${y}" r="${i % 4 === 0 ? 1.9 : 1.1}" fill="#f4ecd6" opacity="${
          0.35 + ((i * 13) % 45) / 100
        }"/>`;
      }).join("")
    : "";

  /* Cork has a grain, and without it the board reads as a brown rectangle. */
  const corkGrain = Array.from({ length: 90 }, (_, i) => {
    const x = 486 + ((i * 71) % 254);
    const y = 134 + ((i * 97) % 156);
    return `<circle cx="${x}" cy="${y}" r="${1 + ((i * 7) % 3) * 0.5}" fill="${
      c.ink
    }" opacity="0.07"/>`;
  }).join("");

  return svg(
    W,
    H,
    `
  <defs>
    <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.wallDeep}"/>
      <stop offset="42%" stop-color="${c.wall}"/>
      <stop offset="100%" stop-color="${c.wallDeep}"/>
    </linearGradient>
    <radialGradient id="vig" cx="52%" cy="46%" r="78%">
      <stop offset="52%" stop-color="${c.wall}" stop-opacity="0"/>
      <stop offset="100%" stop-color="${c.wallDeep}" stop-opacity="${night ? 0.98 : 0.75}"/>
    </radialGradient>
    <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.sky}"/>
      <stop offset="62%" stop-color="${c.skyLow}"/>
      <stop offset="100%" stop-color="${night ? c.sky : c.leafLight}"/>
    </linearGradient>
    <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${c.floorDark}"/>
      <stop offset="26%" stop-color="${c.floor}"/>
      <stop offset="100%" stop-color="${c.floorDark}"/>
    </linearGradient>
    <radialGradient id="lampGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${c.glow}" stop-opacity="0.30"/>
      <stop offset="45%" stop-color="${c.glow}" stop-opacity="0.13"/>
      <stop offset="100%" stop-color="${c.glow}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="floorGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${c.glow}" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="${c.glow}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="deskTop" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${c.woodDark}"/>
      <stop offset="38%" stop-color="${c.wood}"/>
      <stop offset="100%" stop-color="${c.woodDark}"/>
    </linearGradient>
  </defs>

  <!-- wall -->
  <rect width="${W}" height="${H}" fill="url(#wallGrad)"/>
  <rect width="${W}" height="${H}" fill="url(#vig)"/>
  ${light}

  <!-- picture rail -->
  <rect x="0" y="86" width="${W}" height="7" fill="${c.skirt}" opacity="0.5"/>
  <rect x="0" y="93" width="${W}" height="3" fill="${c.ink}" opacity="0.12"/>

  <!-- ============================================================ window -->
  <g>
    <rect x="78" y="108" width="312" height="336" rx="3" fill="${c.skirt}"/>
    <rect x="92" y="122" width="284" height="308" fill="url(#glass)"/>
    ${
      night
        ? `${stars}
           <circle cx="312" cy="180" r="42" fill="#f6efdc" opacity="0.10"/>
           <circle cx="312" cy="180" r="18" fill="#f6efdc" opacity="0.92"/>
           <circle cx="318" cy="174" r="5" fill="#e6dcc4" opacity="0.5"/>
           <circle cx="306" cy="188" r="3.4" fill="#e6dcc4" opacity="0.45"/>
           <path d="M92 372 q 70 -34 142 -6 q 76 30 142 -12 v76 H92 Z" fill="${c.wallDeep}" opacity="0.75"/>`
        : `<circle cx="318" cy="176" r="30" fill="#fbe6b4" opacity="0.85"/>
           <path d="M92 336 q 62 -52 130 -14 q 58 32 154 -20 v128 H92 Z" fill="${c.leafDeep}" opacity="0.45"/>
           <path d="M92 372 q 74 -34 146 -4 q 70 28 138 -10 v72 H92 Z" fill="${c.leaf}" opacity="0.6"/>`
    }
    <!-- blinds, pulled up to the top third -->
    ${Array.from(
      { length: 7 },
      (_, i) =>
        `<rect x="92" y="${124 + i * 13}" width="284" height="9" rx="3" fill="${c.skirt}" opacity="${
          night ? 0.95 : 0.88
        }"/>`
    ).join("")}
    <rect x="92" y="216" width="284" height="7" rx="3" fill="${c.skirt}"/>
    <path d="M234 223 v22" stroke="${c.ink}" stroke-width="2" opacity="0.3"/>
    <!-- frame and sill -->
    <rect x="78" y="108" width="312" height="336" rx="3" stroke="${c.ink}" stroke-opacity="0.45" stroke-width="4"/>
    <path d="M234 122 v308" stroke="${c.skirt}" stroke-width="7"/>
    <rect x="66" y="438" width="336" height="14" rx="4" fill="${c.skirt}"/>
    <rect x="66" y="452" width="336" height="6" rx="2" fill="${c.ink}" opacity="0.18"/>
  </g>

  <!-- ============================================================= shelf -->
  <g>
    <rect x="852" y="134" width="292" height="209" rx="4" fill="${c.ink}" opacity="0.12"/>
    <rect x="846" y="126" width="292" height="14" fill="${c.woodDark}"/>
    <rect x="846" y="126" width="14" height="196" fill="${c.woodDark}"/>
    <rect x="1124" y="126" width="14" height="196" fill="${c.woodDark}"/>
    <rect x="860" y="140" width="264" height="182" fill="${c.wallDeep}" opacity="0.85"/>
    <!-- shelf boards, with a shadow under each so they read as boards -->
    <rect x="860" y="204" width="264" height="11" fill="${c.wood}"/>
    <rect x="860" y="215" width="264" height="5" fill="${c.ink}" opacity="0.22"/>
    <rect x="860" y="278" width="264" height="11" fill="${c.wood}"/>
    <rect x="860" y="289" width="264" height="5" fill="${c.ink}" opacity="0.22"/>
    <rect x="846" y="322" width="292" height="13" rx="2" fill="${c.wood}"/>
    <rect x="846" y="335" width="292" height="6" rx="2" fill="${c.ink}" opacity="0.2"/>
    <rect x="846" y="126" width="292" height="209" stroke="${c.ink}" stroke-opacity="0.35" stroke-width="2.5"/>
  </g>

  <!-- ========================================================= corkboard -->
  <g>
    <rect x="476" y="126" width="286" height="188" rx="4" fill="${c.ink}" opacity="0.12"/>
    <rect x="470" y="118" width="286" height="188" rx="4" fill="${c.woodDark}"/>
    <rect x="482" y="130" width="262" height="164" rx="2" fill="${c.cork}" opacity="${
      night ? 0.34 : 0.95
    }"/>
    ${corkGrain}
    <rect x="470" y="118" width="286" height="188" rx="4" stroke="${c.ink}" stroke-opacity="0.4" stroke-width="4"/>
    <path d="M476 124 l12 12 M750 124 l-12 12 M476 300 l12 -12 M750 300 l-12 -12" stroke="${
      c.ink
    }" stroke-opacity="0.2" stroke-width="2"/>
  </g>

  <!-- socket, because a room has one -->
  <rect x="1040" y="512" width="34" height="46" rx="5" fill="${c.skirt}" opacity="0.9"/>
  <circle cx="1051" cy="532" r="3.4" fill="${c.ink}" opacity="0.5"/>
  <circle cx="1063" cy="532" r="3.4" fill="${c.ink}" opacity="0.5"/>

  <!-- ============================================================= floor -->
  <rect y="466" width="${W}" height="209" fill="url(#floorGrad)"/>
  ${Array.from(
    { length: 11 },
    (_, i) =>
      `<path d="M${-120 + i * 140} 675 L${120 + i * 140} 478" stroke="${c.floorDark}" stroke-width="2.5" opacity="0.4"/>`
  ).join("")}
  ${Array.from(
    { length: 3 },
    (_, i) => `<path d="M0 ${520 + i * 52} H${W}" stroke="${c.floorDark}" stroke-width="2" opacity="0.28"/>`
  ).join("")}
  <rect y="458" width="${W}" height="16" fill="${c.skirt}"/>
  <rect y="472" width="${W}" height="5" fill="${c.ink}" opacity="0.16"/>

  <!-- rug -->
  <ellipse cx="640" cy="614" rx="342" ry="60" fill="${c.blue}" opacity="${night ? 0.22 : 0.34}"/>
  <ellipse cx="640" cy="614" rx="264" ry="44" fill="${c.blueLight}" opacity="${night ? 0.14 : 0.3}"/>
  <ellipse cx="640" cy="614" rx="184" ry="28" fill="${c.blue}" opacity="${night ? 0.16 : 0.22}"/>

  <!-- ============================================================== desk -->
  <g>
    <ellipse cx="700" cy="600" rx="310" ry="24" fill="${c.shadow}" opacity="${night ? 0.55 : 0.3}"/>
    <rect x="396" y="398" width="612" height="24" rx="5" fill="url(#deskTop)"/>
    <rect x="396" y="420" width="612" height="10" fill="${c.woodEdge}" opacity="0.85"/>
    <rect x="424" y="430" width="556" height="66" rx="4" fill="${c.woodDark}"/>
    <rect x="446" y="448" width="234" height="32" rx="4" fill="${c.wood}" opacity="0.72"/>
    <rect x="722" y="448" width="234" height="32" rx="4" fill="${c.wood}" opacity="0.72"/>
    <rect x="540" y="462" width="46" height="5" rx="2.5" fill="${c.ink}" opacity="0.4"/>
    <rect x="816" y="462" width="46" height="5" rx="2.5" fill="${c.ink}" opacity="0.4"/>
    <rect x="440" y="496" width="18" height="112" rx="5" fill="${c.woodDark}"/>
    <rect x="946" y="496" width="18" height="112" rx="5" fill="${c.woodDark}"/>
    <rect x="396" y="398" width="612" height="24" rx="5" stroke="${c.ink}" stroke-opacity="0.35" stroke-width="2"/>
  </g>


  <!-- chair, in front of the desk so the learner has somewhere to sit -->
  <g>
    <ellipse cx="700" cy="648" rx="118" ry="17" fill="${c.shadow}" opacity="${night ? 0.55 : 0.28}"/>
    <path d="M626 566 h150 a10 10 0 0 1 0 20 h-150 a10 10 0 0 1 0 -20 Z" fill="${c.woodDark}"/>
    <path d="M632 570 v-92 a70 60 0 0 1 138 0 v92" fill="none" stroke="${c.woodDark}" stroke-width="11" stroke-linecap="round"/>
    ${Array.from({ length: 11 }, (_, i) => {
      const x = 644 + i * 11.4;
      const dip = Math.cos((i - 5) / 5.2) * 24;
      return `<path d="M${x} 568 v-${46 + dip}" stroke="${c.woodDark}" stroke-width="4" stroke-linecap="round" opacity="0.92"/>`;
    }).join("")}
    <path d="M642 586 l-14 62 M760 586 l14 62" stroke="${c.woodDark}" stroke-width="9" stroke-linecap="round"/>
    <path d="M628 616 h146" stroke="${c.woodDark}" stroke-width="6" stroke-linecap="round" opacity="0.8"/>
  </g>

  <!-- foliage sits in front of everything on the wall -->
  <g opacity="${night ? 0.9 : 1}">${vinesBack}${vinesFront}</g>
  `
  );
}

/* -------------------------------------------------------------------------- */
/* Props. Each one is its own layer, sized to its own canvas.                  */
/* -------------------------------------------------------------------------- */

const props = {
  /* The laptop is the mentor. At night the screen is the second light source. */
  laptop: (c, night) =>
    svg(
      220,
      150,
      `
      ${night ? `<ellipse cx="110" cy="70" rx="105" ry="66" fill="${c.glow}" opacity="0.18"/>` : ""}
      <path d="M46 112 L60 34 a8 8 0 0 1 8-7 h84 a8 8 0 0 1 8 7 l14 78 Z" fill="${c.metal}"/>
      <path d="M64 104 L76 40 h68 l12 64 Z" fill="${night ? c.glow : c.screen}" opacity="${
        night ? 0.9 : 1
      }"/>
      <path d="M78 56 h44 M78 68 h56 M78 80 h34" stroke="${night ? "#6b5a33" : c.ink2}" stroke-width="4" stroke-linecap="round" opacity="0.75"/>
      <rect x="30" y="112" width="160" height="12" rx="6" fill="${c.metal}"/>
      <rect x="30" y="112" width="160" height="12" rx="6" stroke="${c.ink}" stroke-opacity="0.4" stroke-width="2"/>
      <rect x="92" y="116" width="36" height="4" rx="2" fill="${c.ink}" opacity="0.35"/>
    `
    ),

  /* Three days running earns a better lamp. It is the first thing that
     changes in the room, and at night it is what lights the desk. */
  lamp: (c, night) =>
    svg(
      170,
      210,
      `
      ${night ? `<ellipse cx="85" cy="120" rx="82" ry="86" fill="${c.glow}" opacity="0.22"/>` : ""}
      <path d="M85 190 h58 a10 10 0 0 0 10-10 v-2 H17 v2 a10 10 0 0 0 10 10 Z" fill="${c.woodDark}"/>
      <rect x="76" y="96" width="18" height="86" rx="6" fill="${c.woodDark}"/>
      <path d="M36 96 L66 36 h38 l30 60 Z" fill="${c.sage}"/>
      <path d="M36 96 L66 36 h38 l30 60 Z" stroke="${c.ink}" stroke-opacity="0.45" stroke-width="2.5"/>
      ${Array.from({ length: 5 }, (_, i) => `<path d="M${52 + i * 16} 96 L${72 + i * 8} 36" stroke="${c.ink}" stroke-opacity="0.2" stroke-width="2"/>`).join("")}
      ${night ? `<ellipse cx="85" cy="100" rx="46" ry="10" fill="${c.glow}" opacity="0.7"/>` : ""}
    `
    ),

  /* The streak plant, in three sizes. It grows, it does not multiply. */
  plant1: (c) =>
    svg(
      130,
      170,
      `
      <path d="M42 104 h46 l-5 44 a10 10 0 0 1 -10 9 h-16 a10 10 0 0 1 -10 -9 Z" fill="${c.coral}"/>
      <rect x="36" y="96" width="58" height="15" rx="7" fill="${c.coral}"/>
      <rect x="36" y="96" width="58" height="6" rx="3" fill="#000" opacity="0.08"/>
      <path d="M65 96 v-26" stroke="${c.leafDeep}" stroke-width="4" stroke-linecap="round"/>
      <path d="M65 84 q -18 -6 -22 -26 M65 78 q 18 -8 22 -26" stroke="${c.leafDeep}" stroke-width="3" fill="none"/>
      <ellipse cx="41" cy="56" rx="13" ry="8" fill="${c.leaf}" transform="rotate(-34 41 56)"/>
      <ellipse cx="89" cy="50" rx="13" ry="8" fill="${c.leafLight}" transform="rotate(30 89 50)"/>
      <ellipse cx="65" cy="62" rx="12" ry="9" fill="${c.leaf}"/>
    `
    ),
  plant2: (c) =>
    svg(
      150,
      230,
      `
      <path d="M48 150 h56 l-6 54 a12 12 0 0 1 -12 11 h-20 a12 12 0 0 1 -12 -11 Z" fill="${c.coral}"/>
      <rect x="40" y="140" width="72" height="18" rx="8" fill="${c.coral}"/>
      <rect x="40" y="140" width="72" height="7" rx="3" fill="#000" opacity="0.08"/>
      <path d="M76 140 v-52" stroke="${c.leafDeep}" stroke-width="5" stroke-linecap="round"/>
      <path d="M76 122 q -30 -10 -38 -42 M76 110 q 30 -14 40 -44 M76 98 q -12 -26 -6 -46" stroke="${c.leafDeep}" stroke-width="3.6" fill="none"/>
      <ellipse cx="34" cy="72" rx="17" ry="10" fill="${c.leaf}" transform="rotate(-36 34 72)"/>
      <ellipse cx="118" cy="58" rx="17" ry="10" fill="${c.leafLight}" transform="rotate(32 118 58)"/>
      <ellipse cx="68" cy="46" rx="14" ry="9" fill="${c.leaf}" transform="rotate(-70 68 46)"/>
      <ellipse cx="76" cy="84" rx="16" ry="11" fill="${c.leafLight}"/>
      <ellipse cx="52" cy="98" rx="13" ry="9" fill="${c.leaf}" transform="rotate(-20 52 98)"/>
    `
    ),
  plant3: (c) =>
    svg(
      190,
      310,
      `
      <path d="M62 208 h70 l-8 70 a14 14 0 0 1 -14 12 h-26 a14 14 0 0 1 -14 -12 Z" fill="${c.coral}"/>
      <rect x="52" y="196" width="90" height="21" rx="9" fill="${c.coral}"/>
      <rect x="52" y="196" width="90" height="8" rx="4" fill="#000" opacity="0.08"/>
      <path d="M96 196 v-86" stroke="${c.leafDeep}" stroke-width="6" stroke-linecap="round"/>
      <path d="M96 170 q -46 -14 -58 -62 M96 152 q 48 -18 60 -66 M96 134 q -26 -32 -24 -74 M96 124 q 30 -24 26 -60" stroke="${c.leafDeep}" stroke-width="4.4" fill="none"/>
      <ellipse cx="32" cy="102" rx="22" ry="12" fill="${c.leaf}" transform="rotate(-36 32 102)"/>
      <ellipse cx="160" cy="82" rx="22" ry="12" fill="${c.leafLight}" transform="rotate(32 160 82)"/>
      <ellipse cx="68" cy="54" rx="18" ry="11" fill="${c.leaf}" transform="rotate(-66 68 54)"/>
      <ellipse cx="124" cy="60" rx="18" ry="11" fill="${c.leafLight}" transform="rotate(58 124 60)"/>
      <ellipse cx="96" cy="104" rx="20" ry="13" fill="${c.leaf}"/>
      <ellipse cx="56" cy="140" rx="16" ry="10" fill="${c.leafLight}" transform="rotate(-24 56 140)"/>
      <ellipse cx="140" cy="132" rx="16" ry="10" fill="${c.leaf}" transform="rotate(22 140 132)"/>
    `
    ),

  /* Papers land on the desk with the first finished lesson. */
  papers: (c) =>
    svg(
      190,
      90,
      `
      <g transform="rotate(-6 95 45)">
        <rect x="18" y="18" width="150" height="56" rx="4" fill="${c.paperShade}"/>
        <rect x="12" y="10" width="150" height="56" rx="4" fill="${c.paper}"/>
        <path d="M28 26 h84 M28 38 h110 M28 50 h64" stroke="${c.ink2}" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
      </g>
    `
    ),

  stickies: (c) =>
    svg(
      150,
      120,
      `
      <rect x="12" y="16" width="52" height="52" rx="3" fill="${c.glow}" transform="rotate(-7 38 42)"/>
      <rect x="74" y="30" width="52" height="52" rx="3" fill="${c.sage}" transform="rotate(6 100 56)"/>
      <rect x="40" y="58" width="52" height="52" rx="3" fill="${c.coral}" opacity="0.9" transform="rotate(-3 66 84)"/>
    `
    ),

  mug: (c) =>
    svg(
      90,
      86,
      `
      <path d="M18 26 h44 v34 a18 18 0 0 1 -18 18 h-8 a18 18 0 0 1 -18 -18 Z" fill="${c.blueLight}"/>
      <path d="M62 34 a14 14 0 0 1 0 28" stroke="${c.blueLight}" stroke-width="7" fill="none"/>
      <ellipse cx="40" cy="26" rx="22" ry="6" fill="${c.paper}" opacity="0.9"/>
      <path d="M18 26 h44 v34 a18 18 0 0 1 -18 18 h-8 a18 18 0 0 1 -18 -18 Z" stroke="${c.ink}" stroke-opacity="0.35" stroke-width="2"/>
    `
    ),

  /* A submitted project is a folder you can point at. */
  folders: (c) =>
    svg(
      200,
      120,
      `
      <path d="M14 44 h60 l12 14 h96 a8 8 0 0 1 8 8 v42 a8 8 0 0 1 -8 8 H14 a8 8 0 0 1 -8 -8 V52 a8 8 0 0 1 8 -8 Z" fill="${c.wood}"/>
      <path d="M20 34 h56 l11 13 h88" stroke="${c.woodDark}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <rect x="26" y="70" width="66" height="9" rx="4" fill="${c.paper}" opacity="0.85"/>
      <rect x="26" y="86" width="42" height="7" rx="3" fill="${c.paper}" opacity="0.6"/>
    `
    ),

  /* Referral postcard. Someone joined because you told them to. */
  postcard: (c) =>
    svg(
      160,
      110,
      `
      <g transform="rotate(-4 80 55)">
        <rect x="10" y="12" width="140" height="86" rx="4" fill="${c.paper}" stroke="${c.ink}" stroke-opacity="0.35" stroke-width="2"/>
        <rect x="18" y="20" width="64" height="70" rx="3" fill="${c.blueLight}"/>
        <path d="M18 74 l22 -22 l16 14 l14 -18 l12 20 v22 h-64 Z" fill="${c.leaf}" opacity="0.85"/>
        <circle cx="66" cy="34" r="7" fill="${c.glow}"/>
        <path d="M92 30 h48 M92 44 h48 M92 58 h34" stroke="${c.ink2}" stroke-width="3" stroke-linecap="round" opacity="0.5"/>
        <rect x="116" y="68" width="24" height="18" rx="2" fill="${c.coral}" opacity="0.8"/>
      </g>
    `
    ),

  /* Thirty days, framed. */
  trophy: (c) =>
    svg(
      130,
      160,
      `
      <rect x="14" y="14" width="102" height="126" rx="5" fill="${c.wood}"/>
      <rect x="24" y="24" width="82" height="106" rx="3" fill="${c.paper}"/>
      <circle cx="65" cy="66" r="24" fill="none" stroke="${c.glow}" stroke-width="6"/>
      <path d="M53 66 l9 10 l19 -22" stroke="${c.leafDeep}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M40 106 h50 M50 118 h30" stroke="${c.ink2}" stroke-width="4" stroke-linecap="round" opacity="0.55"/>
      <rect x="14" y="14" width="102" height="126" rx="5" stroke="${c.ink}" stroke-opacity="0.4" stroke-width="2.5"/>
    `
    ),

  /* One per level completed. */
  certificate: (c) =>
    svg(
      120,
      150,
      `
      <rect x="10" y="10" width="100" height="130" rx="4" fill="${c.woodDark}"/>
      <rect x="19" y="19" width="82" height="112" rx="2" fill="${c.paper}"/>
      <path d="M60 40 l26 15 v30 l-26 15 l-26 -15 v-30 Z" fill="none" stroke="${c.blue}" stroke-width="4"/>
      <path d="M34 112 h52" stroke="${c.ink2}" stroke-width="4" stroke-linecap="round" opacity="0.5"/>
      <rect x="10" y="10" width="100" height="130" rx="4" stroke="${c.ink}" stroke-opacity="0.4" stroke-width="2.5"/>
    `
    ),

  notebook: (c) =>
    svg(
      140,
      100,
      `
      <g transform="rotate(5 70 50)">
        <rect x="14" y="18" width="112" height="64" rx="5" fill="${c.coral}"/>
        <rect x="24" y="18" width="102" height="64" rx="5" fill="${c.paper}"/>
        <path d="M24 18 v64" stroke="${c.ink}" stroke-opacity="0.25" stroke-width="2"/>
        <path d="M40 38 h64 M40 52 h72 M40 66 h44" stroke="${c.ink2}" stroke-width="3" stroke-linecap="round" opacity="0.45"/>
      </g>
    `
    ),
};

/* -------------------------------------------------------------------------- */

const written = [];
for (const [name, c] of variants) {
  written.push(write(`room-${name}.svg`, room(c, name === "night")));
  for (const [prop, draw] of Object.entries(props)) {
    written.push(write(`${prop}-${name}.svg`, draw(c, name === "night")));
  }
}

console.log(`wrote ${written.length} files to public/workspace/`);
