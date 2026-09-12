/**
 * The screens drawn beside each beat of a case study.
 *
 * Hand-authored SVG, not screenshots. Two reasons: a screenshot of someone
 * else's product ages badly and carries their trade dress, and a drawing can
 * leave out everything that is not the point. Every colour is a token, so the
 * screens follow the theme.
 */

import type { ScreenId } from "@/lib/resources/types";

const S = {
  line: "var(--line-2)",
  soft: "var(--surface-2)",
  paper: "var(--surface)",
  ink: "var(--ink)",
  ink2: "var(--ink-2)",
  ink3: "var(--ink-3)",
  blue: "var(--blue)",
  navy: "var(--navy)",
  free: "var(--free)",
  amber: "var(--amber)",
};

/* -------------------------------------------------------------------------- */
/* Chrome                                                                      */
/* -------------------------------------------------------------------------- */

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <g>
      <rect
        x="110"
        y="16"
        width="260"
        height="488"
        rx="26"
        fill={S.paper}
        stroke={S.line}
        strokeWidth="1.5"
      />
      <rect x="215" y="30" width="50" height="5" rx="2.5" fill={S.line} />
      <g transform="translate(110 48)">{children}</g>
    </g>
  );
}

function Browser({ children }: { children: React.ReactNode }) {
  return (
    <g>
      <rect
        x="30"
        y="40"
        width="420"
        height="440"
        rx="14"
        fill={S.paper}
        stroke={S.line}
        strokeWidth="1.5"
      />
      <path d="M30 72h420" stroke={S.line} strokeWidth="1.5" />
      <circle cx="50" cy="56" r="4" fill={S.line} />
      <circle cx="64" cy="56" r="4" fill={S.line} />
      <circle cx="78" cy="56" r="4" fill={S.line} />
      <rect x="96" y="49" width="180" height="14" rx="7" fill={S.soft} />
      <g transform="translate(30 72)">{children}</g>
    </g>
  );
}

const T = ({
  x,
  y,
  children,
  size = 11,
  fill = S.ink2,
  weight = 400,
  anchor = "start",
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  fill?: string;
  weight?: number;
  anchor?: "start" | "middle" | "end";
}) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fill={fill}
    fontWeight={weight}
    textAnchor={anchor}
    fontFamily="var(--sans)"
  >
    {children}
  </text>
);

/** A greyed input row. */
const Field = ({
  x,
  y,
  w = 200,
  label,
}: {
  x: number;
  y: number;
  w?: number;
  label: string;
}) => (
  <g>
    <T x={x} y={y} size={9} fill={S.ink3}>
      {label}
    </T>
    <rect
      x={x}
      y={y + 6}
      width={w}
      height={22}
      rx="6"
      fill={S.paper}
      stroke={S.line}
    />
  </g>
);

/* -------------------------------------------------------------------------- */
/* The screens                                                                 */
/* -------------------------------------------------------------------------- */

const screens: Record<ScreenId, React.ReactNode> = {
  /* ------------------------------------------------------------- streaks */
  "streak-lost": (
    <Phone>
      <T x={20} y={30} size={13} weight={600} fill={S.ink}>
        Your streak ended
      </T>
      <g opacity="0.45">
        <path
          d="M130 96c0-22-18-30-18-48-14 10-22 24-22 40 0 24 18 42 40 42s40-18 40-42c0-30-24-46-24-46 4 26-16 34-16 54Z"
          fill="none"
          stroke={S.ink3}
          strokeWidth="2"
        />
      </g>
      <T x={130} y={196} size={30} weight={600} fill={S.ink3} anchor="middle">
        0
      </T>
      <T x={130} y={216} size={10} fill={S.ink3} anchor="middle">
        day streak
      </T>
      <rect
        x={30}
        y={240}
        width={200}
        height={54}
        rx="10"
        fill="var(--amber-bg)"
        stroke={S.amber}
        strokeOpacity="0.4"
      />
      <T x={44} y={262} size={10} weight={600} fill={S.amber}>
        You had 47 days
      </T>
      <T x={44} y={280} size={9.5} fill={S.ink2}>
        Longest streak of anyone you know
      </T>
      <rect x={30} y={312} width={200} height={30} rx="8" fill={S.navy} />
      <T x={130} y={331} size={10.5} weight={600} fill="var(--on-dark)" anchor="middle">
        Get it back
      </T>
    </Phone>
  ),

  "streak-freeze": (
    <Phone>
      <T x={20} y={30} size={13} weight={600} fill={S.ink}>
        Shop
      </T>
      <rect
        x={20}
        y={48}
        width={220}
        height={92}
        rx="12"
        fill={S.paper}
        stroke={S.blue}
        strokeOpacity="0.5"
      />
      <rect x={34} y={62} width={40} height={40} rx="8" fill="var(--blue-soft)" />
      <T x={54} y={87} size={16} anchor="middle" fill={S.blue}>
        ❄
      </T>
      <T x={86} y={74} size={11.5} weight={600} fill={S.ink}>
        Streak freeze
      </T>
      <T x={86} y={90} size={9.5} fill={S.ink2}>
        Keeps your streak for one
      </T>
      <T x={86} y={102} size={9.5} fill={S.ink2}>
        day you miss
      </T>
      <rect x={34} y={112} width={80} height={20} rx="6" fill={S.soft} />
      <T x={74} y={126} size={9.5} weight={600} fill={S.ink2} anchor="middle">
        200 gems
      </T>
      <T x={20} y={172} size={10} fill={S.ink3}>
        Equipped 2 of 2
      </T>
      <rect x={20} y={186} width={220} height={64} rx="12" fill={S.soft} />
      <T x={36} y={210} size={10.5} weight={600} fill={S.ink2}>
        Double or nothing
      </T>
      <T x={36} y={226} size={9.5} fill={S.ink3}>
        Wager 50 gems on 7 days
      </T>
    </Phone>
  ),

  "streak-repair": (
    <Phone>
      <T x={20} y={30} size={13} weight={600} fill={S.ink}>
        Repair your streak
      </T>
      <rect
        x={20}
        y={48}
        width={220}
        height={120}
        rx="12"
        fill="var(--free-bg)"
        stroke={S.free}
        strokeOpacity="0.35"
      />
      <T x={130} y={86} size={26} weight={600} fill={S.free} anchor="middle">
        47
      </T>
      <T x={130} y={104} size={9.5} fill={S.ink2} anchor="middle">
        days, restored
      </T>
      <T x={130} y={132} size={9.5} fill={S.ink2} anchor="middle">
        One practice session and it is
      </T>
      <T x={130} y={146} size={9.5} fill={S.ink2} anchor="middle">
        like you never missed
      </T>
      <rect x={20} y={190} width={220} height={32} rx="8" fill={S.navy} />
      <T x={130} y={211} size={11} weight={600} fill="var(--on-dark)" anchor="middle">
        Practice now
      </T>
      <T x={130} y={246} size={9.5} fill={S.ink3} anchor="middle">
        No thanks
      </T>
    </Phone>
  ),

  /* --------------------------------------------------------------- forms */
  "form-many": (
    <Browser>
      <T x={24} y={34} size={13} weight={600} fill={S.ink}>
        Apply for a licence
      </T>
      <Field x={24} y={54} label="Title" w={90} />
      <Field x={130} y={54} label="First name" w={130} />
      <Field x={276} y={54} label="Last name" w={130} />
      <Field x={24} y={104} label="Date of birth" w={120} />
      <Field x={160} y={104} label="National insurance number" w={246} />
      <Field x={24} y={154} label="Address line 1" w={382} />
      <Field x={24} y={204} label="Address line 2" w={382} />
      <Field x={24} y={254} label="Town" w={180} />
      <Field x={220} y={254} label="Postcode" w={186} />
      <Field x={24} y={304} label="Phone" w={180} />
      <Field x={220} y={304} label="Email" w={186} />
      <rect x={24} y={350} width={100} height={28} rx="6" fill={S.soft} stroke={S.line} />
      <T x={74} y={368} size={10} fill={S.ink3} anchor="middle">
        Continue
      </T>
      <T x={406} y={368} size={9} fill={S.ink3} anchor="end">
        11 fields, 1 page
      </T>
    </Browser>
  ),

  "form-one": (
    <Browser>
      <T x={24} y={32} size={9} fill={S.ink3}>
        Step 3 of 9
      </T>
      <rect x={24} y={40} width={382} height={4} rx="2" fill={S.soft} />
      <rect x={24} y={40} width={127} height={4} rx="2" fill={S.blue} />
      <T x={24} y={82} size={16} weight={600} fill={S.ink}>
        What is your date of birth?
      </T>
      <T x={24} y={104} size={10} fill={S.ink2}>
        For example, 31 3 1980
      </T>
      <Field x={24} y={124} label="Day" w={54} />
      <Field x={92} y={124} label="Month" w={54} />
      <Field x={160} y={124} label="Year" w={80} />
      <rect x={24} y={196} width={110} height={32} rx="6" fill={S.free} />
      <T x={79} y={217} size={11} weight={600} fill="var(--on-dark)" anchor="middle">
        Continue
      </T>
      <T x={24} y={262} size={10} fill={S.blue}>
        Back
      </T>
      <T x={406} y={368} size={9} fill={S.ink3} anchor="end">
        1 question, 1 page
      </T>
    </Browser>
  ),

  "form-error": (
    <Browser>
      <rect
        x={24}
        y={28}
        width={382}
        height={56}
        rx="8"
        fill="var(--amber-bg)"
        stroke={S.amber}
        strokeWidth="2"
      />
      <T x={40} y={50} size={11.5} weight={600} fill={S.amber}>
        There is a problem
      </T>
      <T x={40} y={70} size={10} fill={S.amber}>
        Enter your date of birth, for example 31 3 1980
      </T>
      <T x={24} y={122} size={15} weight={600} fill={S.ink}>
        What is your date of birth?
      </T>
      <rect x={24} y={136} width={4} height={56} fill={S.amber} />
      <g transform="translate(12 0)">
        <Field x={24} y={140} label="Day" w={54} />
        <Field x={92} y={140} label="Month" w={54} />
        <Field x={160} y={140} label="Year" w={80} />
      </g>
      <rect x={24} y={216} width={110} height={32} rx="6" fill={S.free} />
      <T x={79} y={237} size={11} weight={600} fill="var(--on-dark)" anchor="middle">
        Continue
      </T>
      <T x={406} y={368} size={9} fill={S.ink3} anchor="end">
        Error, then the field
      </T>
    </Browser>
  ),

  /* ------------------------------------------------------------------ ar */
  "ar-browse": (
    <Phone>
      <T x={20} y={28} size={12} weight={600} fill={S.ink}>
        Sofas
      </T>
      <rect x={20} y={42} width={104} height={86} rx="8" fill={S.soft} />
      <path d="M36 108v-18a8 8 0 0 1 8-8h56a8 8 0 0 1 8 8v18" stroke={S.ink3} fill="none" strokeWidth="1.5" />
      <rect x={132} y={42} width={104} height={86} rx="8" fill={S.soft} />
      <path d="M148 108v-18a8 8 0 0 1 8-8h56a8 8 0 0 1 8 8v18" stroke={S.ink3} fill="none" strokeWidth="1.5" />
      <T x={20} y={148} size={10} weight={600} fill={S.ink}>
        Two seat, grey
      </T>
      <T x={20} y={164} size={10} fill={S.ink2}>
        399
      </T>
      <T x={132} y={148} size={10} weight={600} fill={S.ink}>
        Three seat, beige
      </T>
      <T x={132} y={164} size={10} fill={S.ink2}>
        549
      </T>
      <rect
        x={20}
        y={190}
        width={216}
        height={40}
        rx="10"
        fill="var(--blue-soft)"
        stroke={S.blue}
        strokeOpacity="0.4"
      />
      <T x={128} y={215} size={11} weight={600} fill={S.blue} anchor="middle">
        See it in your room
      </T>
      <T x={128} y={266} size={9.5} fill={S.ink3} anchor="middle">
        Will it fit? Will it clash?
      </T>
      <T x={128} y={282} size={9.5} fill={S.ink3} anchor="middle">
        The two questions a photo cannot answer
      </T>
    </Phone>
  ),

  "ar-place": (
    <Phone>
      {/* the room, seen through the camera */}
      <rect x={0} y={0} width={260} height={340} fill={S.soft} />
      <path d="M0 200h260M70 0v200M190 0v200" stroke={S.line} strokeWidth="1" />
      <path
        d="M60 250v-40a10 10 0 0 1 10-10h120a10 10 0 0 1 10 10v40"
        fill="var(--blue-soft)"
        stroke={S.blue}
        strokeWidth="1.5"
      />
      <path d="M52 250h156v22H52z" fill="var(--blue-soft)" stroke={S.blue} strokeWidth="1.5" />
      <ellipse cx={130} cy={278} rx="86" ry="8" fill={S.ink3} opacity="0.15" />
      <rect x={20} y={296} width={100} height={22} rx="6" fill={S.paper} stroke={S.line} />
      <T x={70} y={311} size={9.5} fill={S.ink2} anchor="middle">
        Scale 1:1
      </T>
      <rect x={130} y={296} width={110} height={22} rx="6" fill={S.paper} stroke={S.line} />
      <T x={185} y={311} size={9.5} fill={S.ink2} anchor="middle">
        Change colour
      </T>
      <rect x={20} y={330} width={220} height={32} rx="8" fill={S.navy} />
      <T x={130} y={351} size={11} weight={600} fill="var(--on-dark)" anchor="middle">
        Add to bag, 399
      </T>
    </Phone>
  ),

  "ar-buy": (
    <Phone>
      <rect x={20} y={24} width={216} height={120} rx="10" fill={S.soft} />
      <path
        d="M60 116v-30a10 10 0 0 1 10-10h116a10 10 0 0 1 10 10v30"
        fill="none"
        stroke={S.ink3}
        strokeWidth="1.5"
      />
      <T x={20} y={170} size={13} weight={600} fill={S.ink}>
        Two seat sofa, grey
      </T>
      <T x={20} y={190} size={11} fill={S.ink2}>
        399, delivery in 5 days
      </T>
      <rect
        x={20}
        y={206}
        width={216}
        height={44}
        rx="10"
        fill="var(--free-bg)"
        stroke={S.free}
        strokeOpacity="0.35"
      />
      <T x={34} y={226} size={9.5} weight={600} fill={S.free}>
        You placed this in your room
      </T>
      <T x={34} y={241} size={9} fill={S.ink2}>
        Fits the wall with 40cm to spare
      </T>
      <rect x={20} y={266} width={216} height={32} rx="8" fill={S.navy} />
      <T x={128} y={287} size={11} weight={600} fill="var(--on-dark)" anchor="middle">
        Add to bag
      </T>
      <T x={128} y={322} size={9.5} fill={S.ink3} anchor="middle">
        Returns drop when the doubt goes
      </T>
    </Phone>
  ),

  /* ------------------------------------------------------------ checkout */
  "checkout-long": (
    <Browser>
      <T x={24} y={32} size={13} weight={600} fill={S.ink}>
        Checkout
      </T>
      <T x={24} y={54} size={9} fill={S.ink3}>
        Create an account to continue
      </T>
      <Field x={24} y={66} label="Email" w={186} />
      <Field x={220} y={66} label="Password" w={186} />
      <Field x={24} y={116} label="Card number" w={186} />
      <Field x={220} y={116} label="Expiry" w={80} />
      <Field x={310} y={116} label="CVC" w={96} />
      <Field x={24} y={166} label="Name on card" w={186} />
      <Field x={220} y={166} label="Billing postcode" w={186} />
      <Field x={24} y={216} label="Billing address" w={382} />
      <Field x={24} y={266} label="Delivery address" w={382} />
      <rect x={24} y={316} width={120} height={30} rx="6" fill={S.soft} stroke={S.line} />
      <T x={84} y={336} size={10} fill={S.ink3} anchor="middle">
        Pay 399
      </T>
      <T x={406} y={368} size={9} fill={S.ink3} anchor="end">
        Nine fields between want and have
      </T>
    </Browser>
  ),

  "checkout-short": (
    <Browser>
      <T x={24} y={32} size={13} weight={600} fill={S.ink}>
        Checkout
      </T>
      <rect
        x={24}
        y={48}
        width={382}
        height={40}
        rx="8"
        fill="var(--blue-soft)"
        stroke={S.blue}
        strokeOpacity="0.4"
      />
      <T x={40} y={73} size={11} weight={600} fill={S.blue}>
        Pay with saved card, ending 4242
      </T>
      <T x={24} y={116} size={9} fill={S.ink3}>
        or
      </T>
      <Field x={24} y={128} label="Card number" w={382} />
      <Field x={24} y={178} label="Expiry and CVC" w={186} />
      <Field x={220} y={178} label="Postcode" w={186} />
      <rect x={24} y={230} width={382} height={34} rx="8" fill={S.navy} />
      <T x={215} y={252} size={11} weight={600} fill="var(--on-dark)" anchor="middle">
        Pay 399
      </T>
      <T x={24} y={292} size={9.5} fill={S.ink3}>
        No account. The account offer comes after the money.
      </T>
      <T x={406} y={368} size={9} fill={S.ink3} anchor="end">
        Three fields, or none
      </T>
    </Browser>
  ),
};

/**
 * Each screen is drawn inside a phone or a browser, so the view box is
 * cropped to that chrome. Without this the drawing floats in a field of
 * empty space and comes out postage stamp sized in the reader.
 */
const phoneScreens: ScreenId[] = [
  "streak-lost",
  "streak-freeze",
  "streak-repair",
  "ar-browse",
  "ar-place",
  "ar-buy",
];

export default function Screen({
  id,
  className,
}: {
  id: ScreenId;
  className?: string;
}) {
  const box = phoneScreens.includes(id) ? "102 8 276 504" : "22 32 436 456";
  return (
    <svg
      viewBox={box}
      className={className}
      role="img"
      aria-label="Illustration of the interface being discussed"
    >
      {screens[id]}
    </svg>
  );
}
