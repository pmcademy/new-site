import type { Level } from "./types";

/**
 * LEVEL 03. Design & Prototyping
 *
 * Rebuilt from original modules 7 (Product Discovery) and 8 (UI Crash Course).
 * The brief is explicit: a modern PM needs real design judgement and the
 * ability to make things themselves, not just a vocabulary for handing off
 * tickets. Every lesson ends in something visual you made, and the capstone
 * is a full redesign: diagnosis, wireframes, prototype, and a usability test
 * with five real people.
 */
export const l03: Level = {
  slug: "03",
  n: "03",
  rank: "Artisan",
  badge: "Product Designer",
  title: "Design & Prototyping",
  promise:
    "Design a real interface yourself, critique one without being annoying, and prototype fast enough that arguments end.",
  arc: "Sona's onboarding loses 62% of the people who start it. Tom, the product's one designer, is heads-down on the dashboard rebuild for six weeks and can't touch it. You're going to diagnose it, design the fix yourself, prototype it, and test it on five real people before he's back.",
  scene: {
    image: "/scenes/domain-fintech.webp",
    alt: "A phone screen showing a half-finished bank-connection flow next to a laptop with a spreadsheet of drop-off numbers.",
    caption: "Sona's onboarding funnel, and the 62% nobody has explained yet.",
  },
  who: "You can spot that a screen is bad but you can't say why, and you've never made one yourself.",
  outcomes: [
    "Name why a screen fails using the vocabulary designers actually use, not \"clean\" or \"cluttered\"",
    "Turn a flow into a full state matrix, so empty, error and offline are designed instead of improvised at 6pm",
    "Take a flow from a paper sketch to a clickable prototype in a day",
    "Run a usability test on five people and read hesitation instead of opinions",
    "Give feedback that improves a designer's work instead of prescribing your own solution, and know when to reuse a component versus make one",
  ],
  capstone: {
    title: "The redesigned flow",
    body: "Sona's onboarding, redesigned end to end: a teardown of the current version in real design vocabulary, a full state matrix so nothing gets improvised later, wireframes, a working interactive prototype, and a usability test with five real people that shows whether it actually got better.",
    ship: [
      "A before/after annotated teardown of Sona's onboarding, in the vocabulary from chapter one",
      "A complete state matrix: every screen against empty, loading, error, partial, success, offline and permission denied",
      "An interactive prototype anyone can click through",
      "A usability test report from five real people, with timestamped notes and a severity-ranked issue list",
    ],
  },

  chapters: [
    /* ================================================================ 1 */
    {
      slug: "seeing",
      n: "1",
      title: "Learning to see",
      summary:
        "Before you can make a good screen you have to be able to say precisely what's wrong with a bad one, in words a designer would respect.",
      lessons: [
        {
          slug: "design-vocabulary",
          title: "Why this screen feels wrong",
          kind: "Teardown",
          minutes: 55,
          legacy: "Module 8.1. Interaction Design, Module 8.3. Design Psychology",
          hook: "You look at a screen and know it's bad. You say \"it feels cluttered\". The designer, reasonably, ignores you.",
          scene: {
            image: "/scenes/domain-fintech.webp",
            alt: "A phone screen showing four onboarding steps for a finance app, with a hand-drawn red circle around a crowded form field.",
            caption: "Sona's onboarding, screen two of four.",
            notes: [
              {
                from: "Maya, founder",
                text: "The board keeps asking why signups look fine but activation doesn't. I think it's the onboarding but I can't say why. Can you actually look at it properly this time?",
              },
              {
                from: "Priya, support",
                text: "Ticket volume on \"I can't find the connect bank button\" is up again. It's right there. I don't get it.",
              },
            ],
          },
          explain: {
            title: "Hierarchy, contrast, proximity, alignment",
            body: [
              "You look at a screen and know something's off, but naming it precisely is a different skill from feeling it, and it's the one that gets you taken seriously. Four levers explain almost every critique a professional designer makes. Hierarchy: what does the eye land on first? Contrast: is the important thing visually distinguishable from everything around it? Proximity: are related things grouped close together, and unrelated things kept apart? Alignment: is there a consistent line the eye can follow, or does it have to hunt?",
              "Underneath all four is a single resource you're always spending: attention. Every extra field, every icon without a label, every choice a user has to make costs a little of it. Hick's Law says decision time grows with the number of options, so \"this feels cluttered\" almost always means \"you made me spend attention on something that didn't earn it\".",
              "The last lever is quieter: does the thing look like what it does, and does it tell you when it worked? A button that looks like plain text, or a save action that gives no confirmation, produces the same behaviour every time: the user clicks again, then again, then complains. Most rage-clicking is a missing feedback loop, not a layout problem.",
            ],
            diagram: "hierarchy",
            caption: "The four levers, and the order the eye is meant to follow because of them.",
            points: [
              {
                term: "Hierarchy",
                def: "The order the eye is meant to move through the screen, set by size, weight, position and colour together, not any one of them alone.",
              },
              {
                term: "Contrast and proximity",
                def: "Contrast makes the important thing findable. Proximity tells the eye which things belong to which group before a single label is read.",
              },
              {
                term: "Affordance and feedback",
                def: "Affordance is whether something looks like what it does. Feedback is whether it confirms it did it. Miss either and the user assumes the product is broken.",
              },
            ],
          },
          case: {
            brand: "Google's homepage vs. Yahoo's, 1999",
            situation:
              "Yahoo's portal had hundreds of links, a directory, news, weather, stocks. Google had a logo and a box.",
            what: "Google's restraint wasn't minimalism as taste, it was a claim about the job. Yahoo believed you wanted to browse; Google believed you wanted to leave as fast as possible. One screen encoded a bet about user intent, and the bet was right.",
            lesson:
              "Visual hierarchy is an argument about what matters. Learning the vocabulary is how you join that argument instead of just having a feeling about it.",
          },
          ai: {
            move: "Screenshot a bad screen, give it to a vision model, and ask it to critique using only the four levers, naming the specific element behind each point.",
            trap: "Vision models default to generic advice like \"add more whitespace\" or \"improve the hierarchy\". Force it to be falsifiable: it has to quote the exact copy or name the exact element, and say what specifically is wrong with its size, position or colour compared to what surrounds it. If it can't quote something real, it's pattern-matching on what critiques usually sound like, not looking at your screen.",
            prompt:
              "Critique this screen using only hierarchy, contrast, proximity and alignment. For each issue: quote the exact text or name the exact element, say which of the four levers it violates, and say what a user does wrong because of it.",
          },
          build: {
            artefact:
              "An annotated critique of Sona's current onboarding, every issue named in the four levers and ranked by severity.",
            steps: [
              { do: "Screenshot all four screens of Sona's onboarding from the lesson files." },
              { do: "Annotate directly on the images. One label per issue, and the label must be one of the four levers, not a feeling." },
              {
                do: "Rank every issue: does it block completion, slow it down, or is it only cosmetic?",
                hint: "Blocks / slows / cosmetic. Only the first two ever get roadmap time, and separating them is most of the value of this exercise.",
              },
              { do: "Write a one-paragraph summary a designer would find useful rather than insulting: what's broken, not what you'd do about it yet." },
            ],
            tools: ["Figma or Excalidraw", "A vision model"],
          },
          solution: {
            summary:
              "The screens usually fail on the same lever twice before they fail on a second one, and that repetition is the highest-severity finding.",
            walkthrough: [
              "Start with contrast, it's the fastest to check: pick the one thing on each screen that must be seen first, and check whether it's actually the most visually dominant thing there. If the CTA and a legal disclaimer have similar weight, that's the finding.",
              "Check proximity next: does the helper text sit closer to the field it explains, or equidistant between two fields? Equidistant text gets misread as belonging to the wrong field constantly.",
              "Check alignment with a ruler, not your eye: screenshot, drop guides at the left edge of every element. Anything off the guide by more than a few pixels is a real finding.",
              "The severity ranking almost always surprises people: a missing button state is cosmetic, but helper text sitting next to the wrong field is a blocker, because it teaches the user to type the wrong thing.",
            ],
          },
          check: [
            "Can you name every issue without using the words \"clean\", \"modern\" or \"cluttered\"?",
            "Which issues actually block completion, and which are only cosmetic?",
          ],
          references: [
            {
              label: "Nielsen Norman Group, Visual Hierarchy",
              url: "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/",
            },
          ],
        },

        {
          slug: "heuristics-not-opinions",
          title: "Ten heuristics beat one opinion",
          kind: "Concept",
          minutes: 45,
          hook: "You tell the founder a screen is confusing. She asks what specifically, and you can list the discomfort but not the failure. \"Confusing\" isn't a bug report. A heuristic is.",
          explain: {
            title: "Nielsen's ten usability heuristics",
            body: [
              "In 1990, Jakob Nielsen and Rolf Molich published a short list of principles that catch the majority of usability problems without needing a single user in the room. They called it heuristic evaluation, and the list survives almost unchanged because it names failure modes that don't go out of style: visibility of system status, match between the system and the real world, user control and freedom, consistency, error prevention, recognition over recall, flexibility, minimalist design, helping users recover from errors, and documentation.",
              "The value isn't the list itself, it's that it turns a vague feeling into a specific, checkable claim. \"This feels confusing\" becomes \"this violates recognition over recall, because the user has to remember a code they saw four screens ago instead of it being shown again\". One of those you can fix. The other you can only argue about.",
              "Heuristic evaluation is fast and it is not a substitute for watching a real person, which is chapter six. It catches problems an expert would predict. It misses problems only a novice actually has. Use both.",
            ],
            points: [
              {
                term: "Visibility of system status",
                def: "The product always tells you what's happening: loading, saved, failed. Silence reads as broken.",
              },
              {
                term: "Recognition over recall",
                def: "Show the option rather than making someone remember it existed. Menus beat memorised commands, always.",
              },
              {
                term: "Error prevention over error messages",
                def: "The best error message is the one you never have to write, because the interface made the mistake impossible in the first place.",
              },
            ],
          },
          case: {
            brand: "Nielsen Norman Group",
            year: "1990",
            situation:
              "Jakob Nielsen and Rolf Molich were trying to make usability evaluation viable for teams with no budget for formal user testing, which was still rare and expensive in most software companies.",
            what: "They tested heuristic evaluation against real usability testing on the same interfaces and found that a small group of evaluators, checking a screen against the ten heuristics, found a large share of the problems that user testing later confirmed, at a fraction of the cost and none of the recruiting.",
            lesson:
              "A checklist is not a lesser form of judgement, it's a way of making your judgement repeatable and defensible to someone who disagrees with you.",
            sources: [
              { label: "Nielsen Norman Group, Ten Usability Heuristics", url: "https://www.nngroup.com/articles/ten-usability-heuristics/" },
            ],
          },
          ai: {
            move: "Screenshot a screen and ask a model to evaluate it against the ten heuristics by name, one violation per heuristic maximum, each one tied to a specific element.",
            trap: "Asked to justify a design, a model will invent a principle that supports it. Ask it to critique your own screen after telling it you designed it, and watch it soften real violations into \"consider exploring\" language, or cite a heuristic that isn't on the list to praise a choice you already made. Never tell it which screen is yours until after it has scored both.",
            prompt:
              "Score this screen against Nielsen's ten usability heuristics. For each heuristic, either name the specific element that violates it, or write \"no violation found\". Do not soften a violation into a suggestion. Do not invent a heuristic that isn't on the list of ten.",
          },
          build: {
            artefact:
              "A ten-row heuristic scorecard for Sona's onboarding, with the AI's pass, your correction of it, and a severity for each real violation.",
            steps: [
              { do: "Run the ten heuristics against Sona's onboarding screens with the model, screen by screen." },
              { do: "Check its work against the actual list of ten. It will occasionally cite something plausible-sounding that isn't one of them, cut those." },
              {
                do: "Run it a second time telling it you designed the screen, and compare the two outputs.",
                hint: "This is the trap lesson. If the second run is softer than the first on the same screen, you've caught it flattering you.",
              },
              { do: "Score each real violation: cosmetic, moderate, or catastrophic, using Nielsen's own 0-4 severity scale." },
            ],
          },
          solution: {
            summary: "The two runs disagree on two or three items, always in the same direction: softer once you say it's yours.",
            walkthrough: [
              "Run one, blind, usually surfaces six to eight real violations on a four-screen onboarding flow.",
              "Run two, after disclosure, keeps the same list but changes the language: \"consider\" replaces \"violates\", and one item quietly drops.",
              "The dropped item is your best finding of the lesson, because it shows exactly how the flattery failed, not because the design is necessarily wrong there.",
              "Severity-score what survives both runs from 0 (not a problem) to 4 (usability catastrophe, must fix before release).",
            ],
          },
          check: [
            "Which heuristic did the model score differently once it knew you designed the screen?",
            "Can you name the specific element behind every violation you kept?",
          ],
        },

        {
          slug: "gestalt-and-scanning",
          title: "How the eye actually moves",
          kind: "Teardown",
          minutes: 50,
          hook: "You've grouped things that make sense to you. A user's eye doesn't care what makes sense to you, it follows rules mapped a hundred years before either of you was born.",
          explain: {
            title: "Gestalt principles and the F-pattern",
            body: [
              "In the 1920s, German psychologists documented how the eye and brain group visual elements before any conscious reasoning happens: things close together are read as one group (proximity), things that look alike are read as the same kind of thing (similarity), a line is followed even where it's interrupted (continuity), and an incomplete shape gets finished automatically (closure). None of this is a design opinion, it's roughly how human perception works, which is why fighting it always loses.",
              "In 2006, Nielsen Norman Group ran eye-tracking studies on how people actually read web pages and found a consistent F-shaped pattern: a horizontal sweep across the top, a shorter sweep further down, then a vertical scan down the left edge. People don't read pages, they scan them, front-loading the first two words of every line and abandoning the rest if those two words don't earn attention.",
              "Put the two together and you get a rule for where things go: the important word goes first, not the important sentence last. A left-aligned list beats a centred one because centring destroys the vertical scan line the eye relies on. This is also why form labels should never be centred.",
            ],
            diagram: "hierarchy",
            caption: "The same four levers, now with a direction: where the eye actually goes first.",
            points: [
              {
                term: "Proximity and similarity",
                def: "Close together or similar in style reads as one group, whether or not you meant it to.",
              },
              {
                term: "Continuity and closure",
                def: "The eye follows a line past a gap, and finishes a shape that isn't quite complete. Broken alignment breaks this for free.",
              },
              {
                term: "F-pattern scanning",
                def: "People scan in a rough F shape and front-load the first words of a line. Bury the important word mid-sentence and it's functionally invisible.",
              },
            ],
          },
          case: {
            brand: "Nielsen Norman Group",
            year: "2006",
            situation:
              "Web teams commonly assumed users read pages the way they'd read a printed article, top to bottom, left to right, in full.",
            what: "Eye-tracking across hundreds of users showed a consistent F-shaped scan: a full sweep near the top, a shorter one lower down, then a vertical scan of the left edge, with attention dropping off sharply after the first two words of a line.",
            lesson: "Design copy for scanning, not reading. Front-load the keyword. Left-align. Assume the second half of every sentence is optional.",
            sources: [
              {
                label: "Nielsen Norman Group, F-Shaped Pattern For Reading Web Content",
                url: "https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content-discovered/",
              },
            ],
          },
          ai: {
            move: "Ask a vision model to trace the likely scan path on a screenshot and mark where attention would drop off.",
            trap: "Vision models describe what's visually salient, bright colours, large images, as if it were what gets scanned first, but salience and scan order aren't the same thing. A bright hero image can sit outside the actual F-pattern entirely while a small, well-placed heading gets read before it. Verify any claimed scan path against where real text actually starts on the left edge, not against what looks eye-catching.",
          },
          build: {
            artefact:
              "A rewritten version of one Sona onboarding screen with elements regrouped by gestalt rules and copy reordered for the F-pattern.",
            steps: [
              { do: "Take one onboarding screen. Circle every group your eye makes automatically before you think about it." },
              { do: "Check each group against the actual layout: is it grouped by real proximity and similarity, or does it only look grouped because you already know what it means?" },
              { do: "Rewrite every line of copy so the important word is the first word, not buried in a subordinate clause." },
              {
                do: "Left-align every label and every line of body copy. Centring anything but a single short heading is banned for this exercise.",
                hint: "This one rule alone fixes more screens than any other rule in this chapter.",
              },
            ],
          },
          check: [
            "Which group on the original screen only looks grouped because you already knew the meaning?",
            "Did moving any word to the front of a sentence change what the sentence actually promised?",
          ],
        },
      ],
    },

    /* ================================================================ 2 */
    {
      slug: "type-and-space",
      n: "2",
      title: "Typography and spacing",
      summary:
        "Two things make amateur work look amateur, and neither of them is the layout. Fix these and a screen jumps grades.",
      lessons: [
        {
          slug: "type-that-works",
          title: "The type scale nobody set on purpose",
          kind: "Concept",
          minutes: 50,
          hook: "Open Sona's onboarding in the inspector. There are eleven different font sizes across four screens, and nobody chose eleven, it just accumulated.",
          explain: {
            title: "A type scale is a decision, not a default",
            body: [
              "Amateur work is recognisable within a second, and it's almost never the layout that gives it away, it's the type. Too many sizes with no logic between them, line spacing that's either crushed or floating, lines of text that run the full width of a wide screen so the eye loses its place halfway through. Fix these two things and a screen jumps several grades in perceived quality even if nothing else changes.",
              "A type scale is a small, fixed set of sizes with a consistent ratio between them, usually four to six steps: a body size, one or two headings above it, a caption below it. Every piece of text on the product maps to one of those steps, never a size invented for one screen. Line height should sit around 1.4 to 1.6 times the font size for body text, tighter for headings. Line length, the measure, should run 45 to 75 characters; wider than that and the eye can't reliably track back to the start of the next line.",
              "None of this is decoration. A body size that's too small, a line height that's too tight, or a measure that's too wide are all measurable reasons a form takes longer to complete and gets more errors, independent of anything about the content.",
            ],
            diagram: "hierarchy",
            caption: "Type size and weight are two more levers for what the eye is meant to see first.",
            points: [
              {
                term: "Type scale",
                def: "A small fixed set of sizes with a consistent ratio, usually four to six steps. Every piece of text maps to a step, nothing is a one-off.",
              },
              {
                term: "Line height and measure",
                def: "1.4 to 1.6 times the font size for body text. 45 to 75 characters per line. Outside those ranges, reading speed and error rate both suffer.",
              },
              {
                term: "Weight over size",
                def: "A heavier weight at the same size reads as more important with less visual noise than simply making the text bigger.",
              },
            ],
          },
          case: {
            brand: "Stripe",
            year: "2016",
            situation:
              "Stripe's documentation had grown into a dense reference that developers needed but disliked using, with long, undifferentiated blocks of text and code.",
            what: "Stripe rebuilt the docs around a strict type scale, a fixed measure for body copy, and a layout that kept code samples beside the prose that explained them rather than interleaved with it. The team wrote publicly about treating the reading experience itself, typography, rhythm, scannability, as a product decision with the same rigour as the API it documented.",
            lesson: "Typography is not the last ten percent of polish. On a page whose entire job is being read, it's close to the whole job.",
            sources: [{ label: "Stripe, Rethinking documentation", url: "https://stripe.com/blog/rethinking-documentation" }],
          },
          ai: {
            move: "Ask a model to generate two or three layout variations for the same screen, holding content fixed and varying only type scale and spacing, so you can compare them instead of arguing from memory.",
            trap: "Every variation an AI tool produces tends to converge on the same safe, symmetrical, medium-weight defaults: centred headline, comfortable but unremarkable body text, evenly spaced everything. It rarely produces a version with real hierarchy, one dominant element and everything else quiet, because bold choices look riskier than safe ones in whatever shaped its defaults. If all three variations look like siblings, ask explicitly for one extreme option.",
            prompt:
              "Generate three layout variations of this screen. Keep all copy identical. Vary only type scale and spacing. Make variation three deliberately extreme: one dominant element, everything else minimised. Do not make all three variations look similar in visual weight.",
          },
          build: {
            artefact: "A defined type scale, five sizes, named, applied consistently across Sona's redesigned onboarding screens.",
            steps: [
              { do: "Audit the current onboarding: list every font size in use. There will be more than you expect." },
              { do: "Define a five-step scale: caption, body, subhead, heading, display. Pick a ratio, 1.25 is a safe start, and stick to it." },
              { do: "Reapply every piece of text on the four onboarding screens to one of the five steps. Nothing gets a custom size." },
              {
                do: "Check line height and measure on every body paragraph against the 1.4 to 1.6x and 45 to 75 character rules.",
                hint: "A field label three words long doesn't need this check. A paragraph of instructions does.",
              },
            ],
            tools: ["Figma", "A model for layout variations"],
          },
          check: [
            "Can you name which of your five steps every piece of text on the screen maps to?",
            "Which paragraph, if any, still runs wider than 75 characters?",
          ],
          references: [{ label: "Matthew Butterick, Practical Typography, Line Length", url: "https://practicaltypography.com/line-length.html" }],
        },

        {
          slug: "the-space-between",
          title: "Spacing is structure, not decoration",
          kind: "Concept",
          minutes: 45,
          hook: "Two elements sit twelve pixels apart on one screen and sixteen on the next, for no reason anyone can explain. Multiply that by forty screens and the whole product feels inconsistent without any single screen looking obviously wrong.",
          explain: {
            title: "The spacing scale",
            body: [
              "Just like type, spacing should come from a small fixed set of values rather than whatever felt right on a given day. The common approach is a base unit, usually 4 or 8 pixels, with every margin and padding being a multiple of it: 8, 16, 24, 32, 48. This is sometimes called an 8-point grid, and its real advantage is consistency: once a team commits to it, decisions about spacing stop being decisions.",
              "Spacing is also how proximity gets built, not just how a screen gets tidied. The white space around a group tells the eye where the group ends more reliably than a visible border does, and using a border to compensate for wrong spacing usually makes a screen busier rather than clearer. The rule of thumb: the space between related items should be visibly smaller than the space between unrelated groups. If it isn't, no amount of colour or line-work fixes the confusion.",
              "Whitespace is also read as confidence. A screen willing to leave room around its most important element signals that the element doesn't need help competing for attention. A screen that crams reads as unsure of what matters.",
            ],
            diagram: "hierarchy",
            caption: "The gap between two elements is doing as much work as their size or colour.",
            points: [
              {
                term: "The spacing scale",
                def: "A small set of values, usually multiples of 4 or 8, used for every margin and padding on the product. Nothing gets an invented one-off number.",
              },
              {
                term: "Space encodes grouping",
                def: "The gap between related items should read as visibly smaller than the gap between unrelated groups, before a single label is read.",
              },
              {
                term: "Whitespace as confidence",
                def: "Room around an element signals it doesn't need to compete. Crowding signals the opposite, whether or not that's the intent.",
              },
            ],
          },
          case: {
            brand: "IBM",
            year: "2018",
            situation:
              "IBM's Carbon Design System, used across dozens of internal and enterprise products, needed a spacing rule that hundreds of designers and engineers could apply without asking a designer every time.",
            what: "Carbon published a spacing scale built from a small base unit with fixed increments, each step given a name rather than a raw pixel value, so a component's padding is set by referring to the token, not by typing a number. The scale is documented publicly as part of the design system's open source foundations.",
            lesson: "Consistency at scale comes from turning a design decision into a named, reusable value once, not from every screen re-deciding it.",
            sources: [{ label: "IBM, Carbon Design System", url: "https://carbondesignsystem.com/" }],
          },
          ai: {
            move: "Feed a model your current, inconsistent spacing values from an audit and ask it to propose a scale that rounds each real value to the nearest step on a chosen base.",
            trap: "It will happily produce a plausible-sounding scale even from noisy input, and it won't flag which of your original values were genuinely ambiguous, sitting equally close to two different steps. Ask it explicitly to list every value that rounds equally well to two different steps, that list is where you need to make an actual design decision rather than accept a rounding.",
          },
          build: {
            artefact: "A defined spacing scale, five or six steps, reapplied to Sona's redesigned onboarding screens.",
            steps: [
              { do: "Audit current spacing values across the four onboarding screens, the same way you audited type sizes." },
              { do: "Pick a base unit, 4 or 8, and define five or six steps from it." },
              { do: "Reapply every margin and padding to one of the steps." },
              {
                do: "Check that related items sit at a visibly smaller step than the gap to the next unrelated group.",
                hint: "If two groups look equally spaced apart, they'll be read as one group whether you meant that or not.",
              },
            ],
          },
          solution: {
            summary: "Most of the mess isn't wrong values, it's the same visual gap built from three different actual pixel numbers that happen to look similar.",
            walkthrough: [
              "Measure the gap between a form label and its field on all four screens. You'll typically find two or three slightly different numbers doing the same job.",
              "Collapse them to one step. This alone removes most of the felt inconsistency without changing the layout.",
              "Then check group-to-group spacing separately, it should be a distinctly larger step, not just bigger by a few pixels.",
            ],
          },
          check: [
            "How many different pixel values were you using to mean \"label to its field\" before the audit?",
            "Is the gap between groups a clearly different step from the gap within a group?",
          ],
        },

        {
          slug: "amateur-tells",
          title: "Five tells and a fast rewrite",
          kind: "Drill",
          minutes: 40,
          hook: "You can now name what's wrong. This lesson is just speed: find it, fix it, move on, five times.",
          explain: {
            title: "The five amateur tells",
            body: [
              "Five patterns show up in almost every screen made by someone without design training, and once you can spot them in two seconds each, you can fix most of a rough draft before anyone else even looks at it. Centred body text past a single short heading. More than two typefaces, or more than two weights of the same one. Borders and drop shadows used to separate things that spacing should have separated. Buttons that all look identical regardless of importance, so nothing is clearly primary. Icons with no label, chosen because they looked nice rather than because anyone could reliably guess what they meant.",
              "None of these are hard to fix. They're just easy to not notice, because each individual instance looks like a small, reasonable choice, and it's only the accumulation across a whole flow that reads as amateur.",
            ],
            points: [
              {
                term: "Centred body text",
                def: "Fine for a single short headline. Anything longer becomes hard to scan, because the left edge moves every line.",
              },
              {
                term: "Too many typefaces or weights",
                def: "Two typefaces and three weights is already a lot. More than that and the screen looks indecisive rather than expressive.",
              },
              {
                term: "Borders instead of spacing",
                def: "A box around something is a crutch for spacing that wasn't given room to do the job on its own.",
              },
            ],
          },
          ai: {
            move: "Screenshot a rough screen and ask a model to flag which of the five tells are present, then generate a fixed version holding the content identical.",
            trap: "The fixed version it generates will usually overcorrect into the same safe, symmetrical, low-contrast layout every AI tool defaults to, trading five amateur tells for one generic one. Treat its output as a fast first pass to react to, not a final answer, and check it kept your intended hierarchy rather than flattening everything to the same visual weight.",
          },
          build: {
            artefact: "One Sona screen, rewritten to remove all five tells, with a before and after side by side.",
            steps: [
              { do: "Pick the roughest screen from your wireframes or the current product." },
              { do: "Find and mark every instance of the five tells." },
              { do: "Fix them one at a time: decentre the body text, cut to two typefaces, replace at least one border with spacing, pick one primary button, label every icon that doesn't have universal recognition." },
              { do: "Put before and after side by side and check it against chapter one's four levers." },
            ],
          },
          check: [
            "Which of the five tells took the longest to fix, and why?",
            "Which icon did you decide didn't need a label, and would a stranger agree?",
          ],
        },
      ],
    },

    /* ================================================================ 3 */
    {
      slug: "colour-and-access",
      n: "3",
      title: "Colour, contrast and accessibility",
      summary:
        "Not a nicety. Contrast and accessibility are functional requirements, and a meaningful share of users cannot use your product without them.",
      lessons: [
        {
          slug: "colour-with-a-job",
          title: "Colour is a signal, not a decoration",
          kind: "Concept",
          minutes: 50,
          hook: "Sona uses red for \"error\", orange for \"warning\", and also red for the brand's primary button. Guess what a user assumes when the primary button turns up in a form.",
          explain: {
            title: "Colour as a functional system, and the contrast maths behind it",
            body: [
              "Once a product has more than a handful of screens, colour stops being a taste question and becomes a signalling system, and like any signalling system it breaks if the same signal means two different things. Red for error and red for your brand's primary action is the most common version of this: it works fine in isolation and fails the moment both appear on the same screen.",
              "Beyond meaning, colour has a hard, measurable requirement: contrast. The Web Content Accessibility Guidelines set a minimum contrast ratio of 4.5 to 1 between text and its background for normal-size text, and 3 to 1 for large text and for the visual boundaries of interactive components like input borders. These aren't style guidelines, they're the difference between text a large share of users, not just users with a diagnosed vision impairment, can actually read in sunlight or on a dimmed screen, and text they can't.",
              "The fix is almost never \"make it prettier\", it's \"separate the palette that means status from the palette that means brand\", then run every foreground-background pairing that matters through an actual contrast checker rather than eyeballing it, because the eye is a bad judge of contrast ratio, especially for its own designs.",
            ],
            diagram: "hierarchy",
            caption: "Colour is one more lever for what the eye sees first, and it fails the same way the others do when it's used for two jobs at once.",
            points: [
              {
                term: "Status colours vs brand colours",
                def: "Keep them from overlapping. If your brand colour is also your error colour, one of them has to move.",
              },
              {
                term: "WCAG contrast minimums",
                def: "4.5:1 for normal text, 3:1 for large text and interactive component boundaries. Below that, a meaningful share of users genuinely cannot read it.",
              },
              {
                term: "Never colour alone",
                def: "A significant share of men have some form of colour vision deficiency. Any signal carried only by colour needs a second cue: an icon, a label, a shape.",
              },
            ],
          },
          case: {
            brand: "GOV.UK",
            year: "2018",
            situation:
              "The UK's Public Sector Bodies Accessibility Regulations made WCAG 2.1 AA compliance a legal requirement for government digital services, not a best practice.",
            what: "The Government Digital Service built accessibility checks into its published service manual and design system as a default rather than an afterthought, including contrast guidance for every component and explicit instructions not to convey meaning through colour alone.",
            lesson: "When accessibility is a legal and functional requirement rather than a nice-to-have, it stops being negotiable at design review, which is closer to how every product should treat it.",
            sources: [
              {
                label: "GOV.UK Service Manual, Making your service accessible",
                url: "https://www.gov.uk/service-manual/helping-people-to-use-your-service/making-your-service-accessible-an-introduction",
              },
            ],
          },
          ai: {
            move: "Ask a model to check whether a proposed foreground and background hex pair meets the WCAG contrast minimum.",
            trap: "Models are unreliable at this specific arithmetic and will often confidently state a contrast ratio that's wrong, sometimes wrong enough to flip a fail into a pass. Never trust an AI's stated ratio; use it to shortlist candidate pairs, then verify every one with an actual contrast-checking tool before you ship it.",
          },
          build: {
            artefact: "A colour system for Sona's redesigned onboarding: one brand palette, one status palette, no overlap, every pairing checked against WCAG minimums.",
            steps: [
              { do: "List every colour currently in use across the four onboarding screens and what job each one is doing: brand, status, or decoration." },
              { do: "Separate brand colours from status colours entirely. If they currently share a hue, change one." },
              {
                do: "Run every text-on-background and icon-on-background pairing through a real contrast checker.",
                hint: "WebAIM's contrast checker is free and fast. Don't ask the model, check the tool.",
              },
              { do: "Find every place meaning is carried by colour alone and add a second cue: an icon, a label, an underline." },
            ],
            tools: ["WebAIM Contrast Checker", "Figma"],
          },
          check: [
            "Which pairing failed the contrast check that you were sure would pass?",
            "Where was meaning carried by colour alone, and what second cue did you add?",
          ],
        },

        {
          slug: "designing-for-not-average",
          title: "Accessibility is a functional requirement",
          kind: "Case study",
          minutes: 45,
          hook: "A screen reader hits Sona's \"connect your bank\" button and reads it as \"button\". That's not a minor annoyance, that user cannot complete onboarding at all.",
          explain: {
            title: "Beyond colour: the requirements that actually block someone",
            body: [
              "Contrast is the easiest accessibility requirement to check and so it gets the most attention, but several others block completion just as hard and are far more common in real products. An icon-only button with no accessible label reads to a screen reader as nothing useful. A tap target smaller than roughly 44 by 44 pixels is genuinely hard to hit for anyone with reduced motor precision, which includes a lot of people just using their phone one-handed on a train. A focus state that's invisible makes the product unusable for anyone navigating by keyboard rather than a mouse or touch, including many power users, not only assistive-technology users.",
              "The pattern behind all of these is the same one from chapter one, feedback and affordance, just applied to users the visual design didn't have in mind. Accessible design isn't a separate discipline from good design, it's good design checked against more of the population than the designer happens to be part of.",
              "Legally, in many jurisdictions this is no longer optional. Courts have held that a company's digital product, not just its physical premises, has to be usable by people with disabilities, and companies have lost real cases over exactly this.",
            ],
            points: [
              {
                term: "Accessible names",
                def: "Every interactive element needs a text label a screen reader can announce, even if it's visually just an icon. \"Button\" with no name is a dead end for that user.",
              },
              {
                term: "Tap target size",
                def: "Roughly 44 by 44 pixels minimum. Below that, hit rate drops for a lot more people than just those with a diagnosed motor condition.",
              },
              {
                term: "Visible focus states",
                def: "If you can't see where keyboard focus is, the product is unusable without a mouse or touch, full stop.",
              },
            ],
          },
          case: {
            brand: "Domino's Pizza",
            situation:
              "A blind customer, Guillermo Robles, was unable to order a pizza through Domino's website or app using screen-reading software, despite being able to order in person at a store.",
            what: "Robles sued under the Americans with Disabilities Act. Domino's argued the ADA didn't clearly apply to websites and apps. The Ninth Circuit Court of Appeals ruled against Domino's, and the U.S. Supreme Court declined to hear Domino's further appeal in 2019, leaving the ruling in place: a company's digital ordering experience has to be accessible, the same as its physical restaurant.",
            lesson: "Accessibility isn't a design nicety a team gets to when there's time. For a real, sizeable share of users it's the difference between being a customer and not being able to become one, and courts increasingly agree.",
          },
          ai: {
            move: "Ask a model to generate accessible name suggestions for every icon-only element on a screen, based on what the icon does rather than what it looks like.",
            trap: "It will describe the icon, \"a magnifying glass\", rather than the action, \"search\", which is exactly backwards for what a screen reader user needs. Ask explicitly for the verb, the action the element performs, never the visual description of the icon.",
          },
          build: {
            artefact: "An accessibility pass on Sona's redesigned onboarding: labelled icons, checked tap targets, visible focus states.",
            steps: [
              { do: "List every icon-only interactive element across the four screens." },
              { do: "Write an accessible name for each: the action it performs, not the icon's appearance." },
              {
                do: "Measure every tappable element against the 44 by 44 pixel minimum.",
                hint: "Small icon buttons in a header row are the most common failure. Measure, don't eyeball.",
              },
              { do: "Design a visible focus state for every interactive element and tab through the prototype with a keyboard only to check it." },
            ],
          },
          check: [
            "Which icon's accessible name did you initially write as a description rather than an action?",
            "Which element failed the tap target minimum, and how did you fix it without breaking the layout?",
          ],
        },

        {
          slug: "the-contrast-audit",
          title: "Auditing the whole flow at once",
          kind: "Build",
          minutes: 50,
          hook: "One screen passed. That tells you nothing about the other twenty. An audit is the only way to know if you fixed a pattern or one instance of it.",
          explain: {
            title: "Auditing at the level of the system, not the screen",
            body: [
              "Everything in this chapter so far has worked on a single screen. A real product has dozens, and a fix applied to one screen and not propagated is worse than no fix at all, because now the product is inconsistent about which parts are accessible. An audit means going through every screen in a flow with the same checklist and logging every failure in one place, so you can see whether a problem is a one-off or a system-wide pattern in a specific component.",
              "The output of an audit isn't prose, it's a table: screen, element, check, pass or fail, fix. That format is what makes it possible to hand an engineer a fix for twelve instances of the same underlying component issue in one pull request, instead of fixing one screen and leaving the other eleven.",
            ],
            points: [
              {
                term: "Audit at the system level",
                def: "One fixed screen and eleven unfixed ones is a worse state than a consistently mediocre flow, because the product is now unpredictable about which parts work.",
              },
              {
                term: "Table, not prose",
                def: "Screen, element, check, pass or fail, fix. A table is what an engineer can act on; a paragraph of concerns usually isn't.",
              },
              {
                term: "Fix the component, not the instance",
                def: "If the same button component fails contrast on four screens, the fix is one change to the component, not four separate patches.",
              },
            ],
          },
          ai: {
            move: "Feed a model screenshots of every screen in the flow plus the checklist from the last two lessons, and have it produce a first-pass audit table you then verify.",
            trap: "It will mark items as \"pass\" with false confidence on contrast specifically, the exact failure named two lessons ago, and it may also silently skip screens or elements it wasn't explicitly asked to check, giving you a table that looks complete but isn't. Cross off every element on every screen against the table yourself before trusting a row is actually covered.",
          },
          build: {
            artefact: "A full accessibility and contrast audit table for the redesigned onboarding flow, verified by hand, with fixes assigned.",
            steps: [
              { do: "List every screen and every interactive or text element on it, no skipping." },
              { do: "Run each through: contrast ratio, colour-alone signalling, accessible name, tap target size, focus visibility." },
              { do: "Build the table: screen, element, check, pass or fail, fix." },
              {
                do: "Group failures by component rather than by screen, and check whether one fix clears several rows at once.",
                hint: "If the same input field fails contrast on three screens, that's one bug, not three.",
              },
            ],
          },
          solution: {
            summary: "Most audits find that four or five real problems account for the majority of failing rows, because they live in shared components.",
            walkthrough: [
              "Sort the audit table by the \"fix\" column once it's built. Identical fixes cluster immediately.",
              "A single input border colour, a single disabled-button state, and a single icon-only header button usually account for most of the failing rows across a whole flow.",
              "Fix those at the component level, then re-run the audit on just the affected screens to confirm the fix actually propagated.",
            ],
          },
          check: [
            "How many of your failing rows collapsed into a single component-level fix?",
            "Did you verify the AI's \"pass\" marks by hand, or trust them?",
          ],
        },
      ],
    },

    /* ================================================================ 4 */
    {
      slug: "architecture",
      n: "4",
      title: "Information architecture and navigation",
      summary:
        "The structure content lives in, decided before a single pixel is drawn. Get this wrong and no amount of visual polish fixes it.",
      lessons: [
        {
          slug: "shape-of-the-product",
          title: "The shape of the product before any screen exists",
          kind: "Concept",
          minutes: 55,
          hook: "Someone asks \"where does the settings page go\". There's no good answer, because nobody ever decided what shape the product actually is.",
          explain: {
            title: "Hierarchy, sequence, and matrix: the three shapes of information architecture",
            body: [
              "Information architecture is the structure content lives in before a single pixel is drawn: what's grouped with what, what sits above what, how someone gets from where they are to where they need to be. Most products are one of three underlying shapes, or a mix. A hierarchy, a tree where everything has one parent, like a settings menu. A sequence, a fixed order like an onboarding flow or a checkout, where step three assumes steps one and two happened. A matrix, where the same content can be reached multiple valid ways, like a media library with genres, artists and playlists all pointing at the same songs.",
              "The mistake that produces a confusing product isn't picking the wrong shape, it's mixing shapes without deciding to. A settings menu that's mostly a hierarchy but has three items that only make sense reached from a specific flow feels wrong precisely because it has silently switched shape without telling anyone.",
              "The most useful IA is organised around what a user is trying to do, not around how the company's org chart or database happens to be structured. Grouping by task rather than by internal category is the single biggest lever in this chapter, and it's exactly what a jobs-to-be-done framing gives you for free: not \"Account settings, Notification settings, Security settings\" mirroring three internal teams, but \"Manage how you sign in\", mirroring the actual task.",
            ],
            diagram: "jobs-to-be-done",
            caption: "The same settings, grouped by internal team on one side and by user task on the other.",
            points: [
              {
                term: "Hierarchy, sequence, matrix",
                def: "The three underlying shapes information can take. Confusion often comes from silently mixing them, not from picking the wrong one.",
              },
              {
                term: "Organise by task, not by org chart",
                def: "Group by what the user is trying to do, not by which internal team owns which setting.",
              },
              {
                term: "One parent per item, one job per screen",
                def: "In a true hierarchy, a screen reachable from two different parents is a sign the categories overlap and need to be redrawn.",
              },
            ],
          },
          case: {
            brand: "GOV.UK",
            year: "2012",
            situation:
              "Before GOV.UK, UK government information was spread across roughly two thousand separate websites, each department publishing in its own structure, so finding anything meant knowing which department owned it.",
            what: "The Government Digital Service replaced them with a single site organised entirely around tasks a citizen or business wants to do, renewing a passport, registering a business, rather than which department handles it. The reorganisation is documented extensively on GDS's own blog as one of the largest task-based IA projects ever undertaken.",
            lesson: "The user doesn't know or care which department, team, or database owns a piece of information. Organise around their task and the org chart becomes invisible, which is exactly the point.",
            sources: [{ label: "Government Digital Service blog", url: "https://gds.blog.gov.uk/" }],
          },
          ai: {
            move: "Describe your current navigation structure to a model and ask it to identify which items are organised by internal category rather than by user task.",
            trap: "It will readily agree with whatever framing you give it and rarely push back hard enough to actually rename a category, because renaming requires taking a position on what the real underlying task is, which is a judgement call, not a pattern match. Ask it to propose the task-based name first, before you tell it your current one, so it isn't just validating your existing structure.",
          },
          build: {
            artefact: "A task-based reorganisation of Sona's settings and account navigation, with every item's parent and job named.",
            steps: [
              { do: "List every item currently in Sona's navigation and settings, exactly as labelled today." },
              { do: "For each, write the actual task a user has when they go looking for it, not the internal team that owns it." },
              { do: "Group items by shared task rather than shared internal category, and rename the groups accordingly." },
              {
                do: "Check every item has exactly one clear parent group. Anything that seems to belong in two is a sign the groups overlap.",
                hint: "If \"export my data\" could live under both Account and Privacy, that's not a placement problem, it's a signal your two groups aren't actually distinct tasks.",
              },
            ],
          },
          check: [
            "Which navigation item's current label describes an internal team rather than a user task?",
            "Which item did you find belonged equally in two groups, and how did you resolve it?",
          ],
        },

        {
          slug: "findability-and-labels",
          title: "A label is a promise",
          kind: "Case study",
          minutes: 45,
          hook: "You click \"Manage Plan\" expecting to change your subscription. It opens a page about API keys. The label lied, and now you don't trust any other label on the page either.",
          explain: {
            title: "Naming, breadcrumbs, and search as a second architecture",
            body: [
              "A label is a promise about what's behind it, and every broken promise costs more than that one click, it teaches the user your other labels might also be lying, so they start opening everything to check rather than trusting a name at a glance. The fix is almost mechanical: use the exact words a user would use to describe their goal, tested by actually asking a handful of them what they'd call it, not the word your team uses internally.",
              "Breadcrumbs exist to answer one question honestly: where am I, and how do I get back up a level without starting over. They're most valuable in a deep hierarchy and close to useless in a flat one, so adding them everywhere out of habit adds noise rather than help.",
              "Search is a second, parallel architecture that exists precisely because navigation, however well designed, fails for users who already know exactly what they want and don't want to guess your category structure to find it. A product with good navigation still needs good search; they solve different problems, not the same one twice.",
            ],
            points: [
              {
                term: "A label is a promise",
                def: "Test it against what a real user would call the thing, not what your team calls it internally. A broken promise costs trust in every other label too.",
              },
              {
                term: "Breadcrumbs answer \"where am I\"",
                def: "Valuable in a deep hierarchy, near-useless in a flat one. Don't add them by reflex.",
              },
              {
                term: "Search is a parallel path, not a backup",
                def: "It exists for users who already know what they want and shouldn't have to guess your categories to get it.",
              },
            ],
          },
          case: {
            brand: "Craigslist",
            situation:
              "Craigslist's interface has looked essentially the same, plain text links on a white background, for over two decades, and has resisted redesign attempts even as every visual convention around it changed.",
            what: "The site's navigation and category labels map almost exactly to how people already describe the things they're looking for: \"for sale\", \"housing\", \"jobs\", with minimal nesting and no attempt at visual polish. Its endurance despite an outdated visual design is widely attributed to that label accuracy and shallow, predictable structure rather than to any aesthetic quality.",
            lesson: "Findability beats beauty. A plain interface with honest, task-matched labels outperforms a polished one with clever or internally-coined ones.",
          },
          ai: {
            move: "Ask a model to generate five candidate labels for a navigation item, written as a user would phrase their goal rather than as a feature name.",
            trap: "It defaults to marketing language, verbs like \"Discover\", \"Explore\", \"Unlock\", that sound appealing but describe nothing concrete, which is the opposite of what a findable label needs. Explicitly ban abstract verbs and ask for the most literal, boring phrasing possible; boring and findable beats clever and ambiguous every time.",
          },
          build: {
            artefact: "A relabelled navigation and a search-versus-navigation test for the top five tasks users try to do in Sona's account area.",
            steps: [
              { do: "List your current navigation labels next to the actual task each one leads to." },
              { do: "For each, write the most literal, boring label possible, and compare it against the current one." },
              { do: "Ask five people outside product to find a specific setting using only the labels, no search. Time them and note every wrong click." },
              {
                do: "For the same five tasks, test whether search alone gets there faster than navigation.",
                hint: "If search wins every time, that's not a search problem to fix, it's a sign your navigation structure isn't earning its place for those tasks.",
              },
            ],
          },
          check: [
            "Which relabelled item did a test user still get wrong, and what would you call it instead?",
            "For which task did search beat navigation, and what does that tell you about where that item lives?",
          ],
        },

        {
          slug: "navigation-drill",
          title: "Card sort in an afternoon",
          kind: "Drill",
          minutes: 45,
          hook: "You have forty items to organise and half a day. A card sort is the fastest honest way to find out how other people would group them, instead of guessing.",
          explain: {
            title: "Card sorting, fast and cheap",
            body: [
              "A card sort is simple: write every item on a card, physical or digital, hand them to a handful of real or representative users, and ask them to group the cards into categories that make sense to them, then name each group in their own words. Open card sorts, where participants invent their own categories, tell you how people naturally think about the content. Closed sorts, where you supply the categories, tell you whether your existing structure makes sense to people who didn't build it.",
              "Five to eight participants is usually enough to see the dominant groupings emerge; more than that mostly confirms rather than reveals. The output isn't a single right answer, it's a similarity pattern: which items consistently end up together across different people, regardless of what they called the group.",
            ],
            points: [
              {
                term: "Open vs closed sorts",
                def: "Open reveals how people naturally think. Closed tests whether your existing structure survives contact with someone who didn't build it.",
              },
              {
                term: "Five to eight participants",
                def: "Enough to see the dominant pattern. More mostly confirms what you already found rather than revealing something new.",
              },
              {
                term: "Look for co-occurrence, not labels",
                def: "The exact group names people invent matter less than which items different people consistently put together.",
              },
            ],
          },
          ai: {
            move: "Feed a model the raw card sort results, which items each participant grouped together, and ask it to identify the clusters that appear consistently across participants.",
            trap: "It will find a plausible clustering even when the actual data is genuinely inconsistent between participants, smoothing over real disagreement into a confident-sounding structure. Ask it explicitly to flag any item that different participants placed in clearly different groups, that disagreement is itself the finding, not noise to average away.",
          },
          build: {
            artefact: "A revised information architecture for Sona's account area, based on a real card sort with at least five participants.",
            steps: [
              { do: "Write every navigation and settings item onto individual cards, digital or physical." },
              { do: "Run an open card sort with five to eight people who aren't on the product team." },
              { do: "Cluster the results: which items ended up together across most participants?" },
              { do: "Name the resulting groups using the participants' own words, not your team's internal terms." },
              {
                do: "Flag any item that got placed inconsistently across participants, and decide deliberately where it goes rather than picking your first instinct.",
                hint: "An inconsistently placed item is often one that genuinely belongs to two tasks, which is useful information, not a sorting failure.",
              },
            ],
          },
          check: [
            "Which item did participants disagree about most, and what did you decide to do with it?",
            "Does your new structure use the participants' words, or did your team's internal terms creep back in?",
          ],
        },
      ],
    },

    /* ================================================================ 5 */
    {
      slug: "flows-and-states",
      n: "5",
      title: "The user flow and the state matrix",
      summary:
        "The happy path is the smallest part of the work. Empty, loading, error, partial, offline and permission denied are the rest of it, and the words that go in them.",
      lessons: [
        {
          slug: "the-flow-is-states-not-screens",
          title: "A flow is states, not screens",
          kind: "Concept",
          minutes: 50,
          hook: "Design shows you four screens for onboarding. The engineer building it will need roughly four times that many, because every screen has at least three ways to arrive at it that aren't the happy path.",
          scene: {
            image: "/scenes/office-wide.webp",
            alt: "A whiteboard covered in a flowchart, with most boxes on the happy path in one colour and a handful of hastily added boxes for error paths in another.",
            caption: "The whiteboard after someone finally asked \"what happens if this fails\".",
            notes: [
              {
                from: "Dev, engineering lead",
                text: "Built the connect-bank flow off your wireframes. What happens if the bank's API times out? There's nothing in the file for that, so I made something up. You should look at it.",
              },
            ],
          },
          explain: {
            title: "Screens are what you draw, states are what actually happens",
            body: [
              "A screen is a static picture. A state is a specific condition the product can actually be in when a user arrives at that screen: has data or doesn't, finished loading or hasn't, succeeded or failed, has full permission or partial, connected or offline. Most of a real flow's complexity lives in states nobody drew, because states are boring to draw and screens are satisfying to draw.",
              "There are seven states worth naming explicitly for almost any meaningful flow: empty, there's nothing here yet; loading, it's coming; error, it failed, and here's what to do; partial, some of it worked, some didn't; success, the happy path, the one everyone designs first; offline, no connection at all; and permission denied, the user asked for something they're not allowed to have. Draw all seven for every meaningful screen and you will find, reliably, that the happy path was the easy twenty percent of the actual work.",
              "The reason this matters commercially and not just aesthetically: every state you don't design, an engineer designs for you, at 6pm, under deadline pressure, usually by doing whatever the framework does by default, which is often a blank white screen or a spinner that never resolves. That's not a hypothetical, it's the default outcome of not deciding.",
            ],
            diagram: "user-flow",
            caption: "The happy path is one line through the diagram. The other six states are the rest of the actual work.",
            points: [
              {
                term: "Seven states",
                def: "Empty, loading, error, partial, success, offline, permission denied. Name all seven for a screen that matters.",
              },
              {
                term: "The happy path is the easy 20%",
                def: "Everything else is where real products actually break for real users, and where competitors differentiate without anyone noticing why.",
              },
              {
                term: "Undesigned states default to the framework, not to nothing",
                def: "An unspecified error state doesn't disappear, it becomes whatever the engineer's tooling does by default under deadline pressure.",
              },
            ],
          },
          case: {
            brand: "GitHub",
            situation:
              "Early versions of many developer tools, GitHub included in its own early years, showed a blank or barely-labelled screen when a new repository had no commits yet.",
            what: "GitHub's product and design teams later invested specifically in empty states: a new repository now shows setup instructions and suggested next actions rather than nothing. The company's Primer design system documents empty, loading and error states as reusable patterns rather than one-off screens improvised per feature.",
            lesson: "An empty state is not the absence of content, it's a screen with a specific job: tell the user what would normally be here and how to make it appear.",
            sources: [{ label: "GitHub, Primer Design System", url: "https://primer.style/" }],
          },
          ai: {
            move: "Describe a single happy-path screen to a model and ask it to generate the wireframe copy and layout for all seven states.",
            trap: "Left unprompted, it will produce the happy path plus maybe a generic loading spinner and stop there. It will not produce the empty, error, partial, offline or permission-denied states unless each one is named explicitly in the request, because the happy path is what's overwhelmingly represented in whatever shaped its defaults. Naming all seven every time is the discipline, not a one-off reminder.",
            prompt:
              "For this screen, generate the copy and layout for all seven states: empty, loading, error, partial, success, offline, and permission denied. Do not skip any. If a state genuinely cannot occur for this screen, say so explicitly and explain why, rather than omitting it silently.",
          },
          build: {
            artefact: "A seven-state map for the single most important screen in Sona's redesigned onboarding.",
            steps: [
              { do: "Pick the screen in the flow where the most people currently drop off." },
              { do: "Draw the happy path first, exactly as it exists today." },
              { do: "For each of the other six states, write one sentence: what causes it, and what the user sees." },
              {
                do: "Sketch the layout for the three states most likely to actually occur: error, empty and offline are the common ones for onboarding specifically.",
                hint: "Not every screen needs all seven fully designed. But every screen needs all seven considered and a deliberate decision about which matter.",
              },
            ],
          },
          check: [
            "Which of the seven states did you initially skip, and why did it feel unnecessary until you named it?",
            "For the screen you chose, which state is most likely to actually occur in production, and does it have a real design, or just a generic fallback?",
          ],
        },

        {
          slug: "the-state-matrix-nobody-draws",
          title: "The state matrix nobody draws",
          kind: "Build",
          minutes: 65,
          hook: "One screen's seven states, multiplied across five screens, is thirty-five conditions. Nobody keeps that in their head. It has to go in a table, or it doesn't exist as a design decision at all.",
          explain: {
            title: "The state matrix",
            body: [
              "A state matrix is a table: one row per screen, one column per state, and in each cell, either a real design or a deliberate \"not applicable, because\". Its whole value is forcing every combination to be considered at least once, instead of leaving the rare ones to be invented under deadline pressure. It's tedious to build and that tedium is exactly why almost nobody does it, and exactly why the ones who do stand out.",
              "The matrix also becomes the single most useful artefact for engineering handoff in this whole level, because it answers the question an engineer would otherwise have to ask you individually, screen by screen, mid-sprint: what happens if this fails. A completed matrix answers that in advance, for everything.",
            ],
            diagram: "states-matrix",
            caption: "Every screen against every state. An empty cell is a decision someone else will make for you, later, worse.",
            points: [
              {
                term: "One row per screen, one column per state",
                def: "Empty cells are not neutral, they're undecided decisions waiting to be made badly under pressure.",
              },
              {
                term: "\"Not applicable\" is a valid answer, silence isn't",
                def: "It's fine for a state to genuinely not apply to a screen. It's not fine for that to be assumed rather than stated.",
              },
              {
                term: "The matrix is the handoff artefact",
                def: "It pre-answers the \"what happens if\" questions an engineer would otherwise interrupt you with individually, mid-sprint.",
              },
            ],
          },
          ai: {
            move: "Give a model the full list of screens in your flow and ask it to generate a first-pass state matrix, one cell at a time, forcing it to address every combination.",
            trap: "This is the exact failure named at the start of this chapter: asked generally to \"design the states\" for a flow, a model reliably produces the happy path and maybe a loading state, and silently leaves empty, error, partial, offline and permission-denied blank or generic, because those are underrepresented in whatever shaped its defaults. The only fix is mechanical: force it to fill every cell of an explicit table, one state name at a time, and treat any cell it tries to skip as a finding, not an oversight to wave through.",
            prompt:
              "Here are the screens in this flow: [list]. Build a table with these screens as rows and these seven states as columns: empty, loading, error, partial, success, offline, permission denied. Fill every cell with either a one-line design description or \"not applicable\" plus a reason. Do not leave any cell blank.",
          },
          build: {
            artefact: "A complete state matrix for Sona's full redesigned onboarding flow, five screens by seven states, every cell filled.",
            steps: [
              { do: "List every screen in the redesigned flow as rows." },
              { do: "Set the seven states as columns: empty, loading, error, partial, success, offline, permission denied." },
              { do: "Fill every cell: either a one-line design decision or an explicit \"not applicable, because\"." },
              {
                do: "Where a cell is genuinely hard to fill, treat that as the finding of the exercise, not a reason to skip it.",
                hint: "A cell that's hard to answer is usually pointing at a real gap, like a state your backend can't currently even report.",
              },
              { do: "Hand the finished matrix to an engineer, real or role-played, and ask what questions it doesn't answer." },
            ],
          },
          solution: {
            summary: "The hardest cells to fill are almost always \"partial\" and \"offline\", and that difficulty is itself the most useful finding in the whole exercise.",
            walkthrough: [
              "Empty, loading and error are usually straightforward once you sit down to write them; teams have some instinct for these already.",
              "Partial is the one that exposes real gaps: what does the screen show if the bank connected but the balance hasn't synced yet? Most teams haven't decided, because it requires knowing exactly what the backend can and can't currently distinguish.",
              "Offline often reveals that the product currently has no offline behaviour at all beyond a generic connection error, which is worth surfacing explicitly rather than papering over with one line.",
              "The matrix's real value shows up here: it turns \"we haven't thought about that\" into a specific, nameable, assignable gap instead of a vague unease.",
            ],
          },
          check: [
            "Which cell was hardest to fill, and what did that difficulty reveal about the product, not just the design?",
            "Did the AI's first pass leave any cell blank or generic, and which one?",
          ],
        },

        {
          slug: "the-button-that-beat-the-redesign",
          title: "The button that beat the redesign",
          kind: "Case study",
          minutes: 45,
          hook: "Design wants six weeks for a new onboarding flow. You have a hunch that rewriting one button's label would recover half the drop-off, for free, this afternoon.",
          explain: {
            title: "Content design: the words are the interface",
            body: [
              "Content design treats the words in a product, button labels, error messages, empty states, confirmation copy, as a design discipline with its own rigour, not as filler text dropped in after the layout is finished. The words are frequently the entire interface for a decision: a button that says \"Continue\" communicates nothing about what happens next; a button that says \"Connect your bank securely\" tells the user exactly what's about to happen and why it's safe, using the same pixels.",
              "The reason a rewritten label so often beats a visual redesign is that visual redesigns take weeks and change many variables at once, making it hard to know which change actually helped, while a copy change can ship in an afternoon and be tested in isolation. It's the highest leverage-to-effort ratio move available to a PM who can't personally redraw the whole flow.",
              "Good microcopy is specific, honest about what will happen, and written in the reader's vocabulary rather than the company's internal terms, exactly the label discipline from the information architecture chapter, applied at the sentence level instead of the navigation level.",
            ],
            points: [
              {
                term: "Words are interface",
                def: "A button's label is doing the entire job of setting the user's expectation for what happens next. Vague labels cost completions.",
              },
              {
                term: "Copy ships faster than layout",
                def: "A rewritten sentence can go live and be measured in a day. A visual redesign takes weeks and confounds many variables at once.",
              },
              {
                term: "Write in the reader's words, not the company's",
                def: "The same discipline from labelling a navigation item, applied one level down, to the sentence.",
              },
            ],
          },
          case: {
            brand: "Mailchimp",
            situation:
              "Mailchimp built its reputation partly on a distinctive, carefully documented voice across every piece of product copy, from error messages to empty states to onboarding, at a time when most SaaS products treated microcopy as an afterthought.",
            what: "The company published a detailed, public style guide for its own writers and designers covering tone, word choice and specific patterns for error and empty states, treating product copy as a designed system with rules, not an improvisation left to whoever happened to write the ticket.",
            lesson: "Voice and tone are not branding exercises layered on top of the product. Done properly, they're a functional part of whether a user understands what to do next.",
            sources: [{ label: "Mailchimp, Content Style Guide", url: "https://styleguide.mailchimp.com/voice-and-tone/" }],
          },
          ai: {
            move: "Ask a model to draft five alternative labels or short messages for a specific moment in the flow, each optimised for a different goal: clarity, reassurance, urgency, brevity, trust.",
            trap: "Unprompted, it defaults to a generic, upbeat brand voice that sounds like it was written to satisfy a style guide rather than to help a specific confused person in a specific moment; phrases like \"Oops! Something went wrong\" tell a user nothing about what happened or what to do. Ask explicitly what a calm, competent human would say out loud to someone in this exact situation, and reject anything that could apply to any product.",
            prompt:
              "Someone just tried to connect their bank account and it failed because the bank's servers timed out. Write what a calm, competent human support agent would say to them out loud, in one sentence, including what they should do next. Do not use \"Oops\", an exclamation mark, or generic brand voice. It must name the actual cause.",
          },
          build: {
            artefact: "A rewritten set of the five highest-leverage copy moments in Sona's onboarding: the primary CTA, the top error message, and three microcopy strings identified from the usability findings so far.",
            steps: [
              { do: "Identify the five moments in the flow where copy is currently vague, generic, or unhelpfully cheerful." },
              { do: "For each, write what actually needs to be communicated: what happened, why, and what to do next." },
              { do: "Draft three alternatives per moment, then pick the one that's most specific and least brand-voiced." },
              {
                do: "Read every rewritten line out loud as if saying it to a confused friend. If it sounds like something a company would say rather than a person, rewrite it again.",
                hint: "This single test catches most remaining brand-voice residue that survives the earlier steps.",
              },
            ],
          },
          check: [
            "Which of your five rewrites would sound wrong if a human said it out loud?",
            "Did any rewrite still avoid naming the actual cause of the problem?",
          ],
        },

        {
          slug: "writing-the-states",
          title: "Writing what the state matrix only sketched",
          kind: "Build",
          minutes: 55,
          hook: "The matrix says \"error: bank connection timed out, offer retry\". That's a design decision, not a sentence a human will actually read. Someone still has to write the sentence.",
          explain: {
            title: "From matrix cell to real copy",
            body: [
              "The state matrix from earlier in this chapter names what each state needs to communicate, in a single line, as a design brief. This lesson is where that brief becomes the actual words a user reads, applying everything from the last lesson to every non-happy-path state you mapped, not just the one error message you happened to think of first.",
              "The discipline that separates a good error message from a bad one is almost always the same three things: say what happened, in plain language, without blaming the user; say what to do about it, specifically, not \"try again later\"; and never lose the user's work, if they filled in a form and it failed, the form stays filled in. Violate any of the three and the message technically informs while still frustrating.",
            ],
            diagram: "states-matrix",
            caption: "The same matrix, now with the actual words in every cell instead of a one-line brief.",
            points: [
              {
                term: "Say what happened, plainly",
                def: "No blame, no jargon, no error code as the whole message. \"Your bank's servers didn't respond in time\" beats \"Error 504\".",
              },
              {
                term: "Say what to do, specifically",
                def: "\"Try again\" is not an instruction. \"Try again, or connect a different bank if this keeps happening\" is.",
              },
              {
                term: "Never lose the user's work",
                def: "A failed state that clears a filled-in form punishes the user for the product's failure. Preserve input across every error and partial state.",
              },
            ],
          },
          ai: {
            move: "Feed the state matrix cells one at a time to a model and have it draft the actual copy for each, checking each draft against the three rules before moving to the next.",
            trap: "It will happily produce fluent, plausible-sounding copy for a state it doesn't actually understand the mechanics of, for instance suggesting \"refresh the page\" for a state where refreshing would genuinely lose the user's progress. Never accept a suggested recovery action without checking it against what the product actually does technically; a wrong recovery instruction is worse than a vague one.",
          },
          build: {
            artefact: "Finished, shippable copy for every state in the matrix that got a real design in the previous lesson, checked against the three rules.",
            steps: [
              { do: "Take every filled cell in your state matrix that has a real design, not \"not applicable\"." },
              { do: "Write the actual copy for each: what happened, what to do, and confirm the user's input is preserved." },
              { do: "Check every line against the three rules: plain, specific, non-destructive." },
              {
                do: "Read all the error and empty-state copy together in one list. If more than two lines sound interchangeable with a different product, rewrite them to be specific to Sona and the actual cause.",
                hint: "Interchangeable copy is the tell that it was written to satisfy a checklist rather than to help someone.",
              },
            ],
          },
          solution: {
            summary: "The copy that's hardest to write well is the partial state, because it has to communicate a mixed result honestly without sounding alarming or vague.",
            walkthrough: [
              "Empty and error states are usually fast once you have the three rules, because there's one clear cause and one clear action.",
              "Partial states resist a template: \"your bank connected but two of your three accounts synced\" needs to say clearly what worked, what didn't, and whether the user needs to do anything, without reading as a bigger failure than it is.",
              "The safest pattern for partial states: lead with what worked, name specifically what didn't, and only ask for action if action would actually help.",
            ],
          },
          check: [
            "Which state's copy did you have to rewrite after checking it against the three rules?",
            "Does every error message tell the user what to do next, specifically, not just what went wrong?",
          ],
        },
      ],
    },

    /* ================================================================ 6 */
    {
      slug: "making",
      n: "6",
      title: "Sketch to prototype in a day",
      summary:
        "Arguing about a flow in a document takes a week. Making it clickable takes an afternoon and ends the argument.",
      lessons: [
        {
          slug: "wireframing",
          title: "Wireframes that answer a question",
          kind: "Build",
          minutes: 60,
          legacy: "Module 8.4. Sketching & Wireframing, Module 8.6. Forms",
          hook: "You have a redesign in your head. Nobody else can see it, so every conversation about it goes in circles.",
          scene: {
            image: "/scenes/desk-day-one.webp",
            alt: "A desk with a notebook open to a rough pencil sketch of a phone screen, next to a laptop showing a blank Figma file.",
            caption: "Paper first, then Figma. In that order.",
            notes: [
              {
                from: "Tom, design",
                text: "I'm heads down on the dashboard rebuild until at least the 20th. Sorry, timing's bad. Steal my Figma library if it helps, the type scale from chapter two is already in it.",
              },
              {
                from: "Maya, founder",
                text: "No pressure, but the board asked about onboarding again. Whatever you've got by Friday is fine, it doesn't need to be pretty.",
              },
            ],
          },
          explain: {
            title: "Low fidelity on purpose",
            body: [
              "Grey boxes get you feedback on structure. Polished mockups get you feedback on the colour of a button. Match fidelity to the question you're asking, and if the question is \"does this flow make sense\", polish is actively in the way, because reviewers critique the paint job instead of the plan.",
              "The happy path is the easy 20%, and you already know why from the last chapter. Every state you don't draw here is one an engineer will invent under time pressure at 6pm, so pull the state matrix out now and check every screen against it before calling the wireframe set finished.",
              "If you can't say in one sentence what a screen is for, it's two screens. This one rule catches more scope creep in a single wireframing session than any review meeting will.",
            ],
            diagram: "hierarchy",
            caption: "Grey boxes still need the four levers. Fidelity is the only thing that's low.",
            points: [
              {
                term: "Low fidelity on purpose",
                def: "Grey boxes get you feedback on structure. Polished mockups get you feedback on the colour of a button. Match fidelity to the question you're asking.",
              },
              {
                term: "Design the empty, loading and error states",
                def: "The happy path is the easy 20%. Every state you don't draw is one an engineer will invent under time pressure at 6pm.",
              },
              {
                term: "One screen, one job",
                def: "If you can't say in one sentence what a screen is for, it's two screens.",
              },
            ],
          },
          case: {
            brand: "37signals",
            year: "2006",
            situation:
              "Most web app signup forms in the mid-2000s asked for a company name, job title, phone number and multiple confirmation fields before showing any product.",
            what: "37signals published \"Getting Real\", a free book documenting their approach of shipping the smallest possible version of everything, including signup forms that asked only for what was strictly needed to create an account, deferring every optional field to inside the product, asked for in context, if at all.",
            lesson: "Every field is a question, and every question is a chance for someone to quit. Wireframing at low fidelity, before any visual design, is when you actually notice how many questions you're asking.",
            sources: [{ label: "37signals, Getting Real", url: "https://basecamp.com/gettingreal" }],
          },
          ai: {
            move: "Describe each screen in prose and have an AI UI tool generate a first-pass layout, then edit it rather than accepting it.",
            trap: "AI layouts are competent and generic, they'll centre everything, add a hero image, and produce a screen that could belong to any product. They also silently pick defaults, which field is required, what happens on error, without telling you. List every default it chose for you before you move on.",
            prompt:
              "Here is a plain-language description of this screen: [description]. Generate a first-pass layout. Then list every default you chose that I didn't specify: which field is required, what happens on empty submit, what the primary action is.",
          },
          build: {
            artefact: "A full wireframe set for the redesigned onboarding, including every non-happy-path state from the matrix.",
            steps: [
              { do: "Sketch on paper first. Ten minutes, no tools. Photograph it." },
              { do: "Rebuild in Figma at low fidelity, grey boxes, real copy, no colour." },
              {
                do: "Add empty, loading, error, offline and already-registered states, using chapter five's state matrix as the checklist.",
                hint: "Aim for at least twice as many state frames as happy-path frames. That ratio is roughly what real products need.",
              },
              { do: "Write the one-sentence job of each screen next to it on the canvas." },
            ],
            tools: ["Figma (free)", "Paper and a phone camera"],
          },
          solution: {
            summary: "The state ratio catches people who think they're done after the happy path.",
            walkthrough: [
              "Sketch the happy path first, it's usually four to six screens for something like onboarding.",
              "Pull the state matrix from chapter five and check: for every screen, are empty, error and offline states actually drawn, not just mentioned?",
              "If your wireframe set has fewer non-happy-path frames than happy-path frames, you're not finished, you've stopped early.",
            ],
          },
          check: [
            "How many non-happy-path states did you draw, and does that match the matrix from chapter five?",
            "Can each screen's job be said in one sentence?",
          ],
        },

        {
          slug: "prototyping-fast",
          title: "Fast enough that the argument ends",
          kind: "Build",
          minutes: 55,
          hook: "Three people have three opinions about how the \"connect your bank\" screen should transition. You've spent forty minutes describing it in a meeting. A ninety second click-through would have ended this already.",
          explain: {
            title: "Fidelity is a dial, not a finish line",
            body: [
              "A prototype only needs to be as real as the question it's answering. Deciding whether a flow's order makes sense needs nothing more than tappable grey boxes linked together. Deciding whether an animation feels too slow needs real motion and real timing, and grey boxes won't tell you anything useful about that. Match the fidelity of the prototype to the fidelity of the question, and no higher, because every extra bit of polish is time spent not answering the actual question yet.",
              "The reason speed matters isn't laziness, it's that arguments about a flow, held as a discussion, go in circles for exactly as long as everyone is describing the same screen differently in their heads. The moment there's something clickable, most disagreements resolve themselves in the first thirty seconds of someone actually using it, because the ambiguity that fuelled the argument disappears the instant it's a specific, concrete thing.",
              "A modern PM has more ways to get to clickable fast than at any point before: linking frames in a design tool, generating a working front end directly from a sketch or a description with an AI tool, or wiring together static screens with a tool built for exactly this. None of these are the \"real\" build. All of them end the argument faster than the meeting does.",
            ],
            points: [
              {
                term: "Match fidelity to the question",
                def: "Testing flow order needs grey boxes and links. Testing whether a transition feels right needs real motion. Higher fidelity than the question needs is wasted time.",
              },
              {
                term: "A prototype ends an argument a meeting can't",
                def: "Verbal descriptions of a flow are each slightly different in every listener's head. A clickable version collapses that ambiguity in seconds.",
              },
              {
                term: "Speed to clickable has never been higher",
                def: "Linking frames, generating a live front end from a sketch, or a no-code prototyping tool. Pick whichever gets you to something tappable today.",
              },
            ],
          },
          case: {
            brand: "IDEO",
            year: "1999",
            situation:
              "ABC's Nightline sent a camera crew to film IDEO, a design consultancy, redesigning a supermarket shopping cart from scratch in five days for a segment called \"The Deep Dive\".",
            what: "The team moved from brainstorming to building rough foam and cardboard prototypes within the first two days, testing physical mock-ups with real shoppers well before any design was finalised, rather than debating cart features in a conference room. The broadcast became one of the most widely cited examples of rapid, low-fidelity prototyping as a decision-making tool rather than a final-stage formality.",
            lesson: "The prototype isn't the last step before you're done, it's the fastest way to find out you're wrong while being wrong is still cheap.",
          },
          ai: {
            move: "Photograph a paper sketch and ask a model to generate working HTML and CSS for it, close enough to click through in a browser within minutes.",
            trap: "It will confidently invent interactions you never specified: a submit button that navigates somewhere plausible-sounding rather than where your flow actually needs it to go, or missing content it fabricates rather than leaving as a placeholder. Review every generated interaction against your actual flow before sharing it, and never treat AI-fabricated content as a harmless placeholder, because a stakeholder reading a demo will read it as a real decision.",
            prompt:
              "Here's a photo of a hand-drawn wireframe. Generate HTML and CSS that reproduces this layout as closely as possible. For any interaction you're not certain of, what a button does, where it navigates, insert a visible TODO comment instead of guessing.",
          },
          build: {
            artefact: "A clickable prototype of the redesigned onboarding flow, built fast enough to have been shown to someone today.",
            steps: [
              { do: "Decide what question this specific prototype needs to answer: flow order, or something about feel and motion." },
              { do: "If it's flow order, link your wireframes in Figma, or generate a live version from a photographed sketch with an AI tool." },
              {
                do: "Check every generated or linked interaction against your actual flow. Fix any invented navigation or fabricated content.",
                hint: "This is the step people skip when a demo looks convincing. A convincing demo with a wrong interaction is worse than an obviously rough one.",
              },
              { do: "Show it to one person today, even a colleague in the next room, before you show it to anyone who matters." },
            ],
            tools: ["Figma prototyping", "An AI sketch-to-code tool", "v0 or a similar generator"],
          },
          solution: {
            summary: "The fastest path to clickable is almost always the one that skips a decision you didn't need to make yet.",
            walkthrough: [
              "If the question is order, not visuals, don't bother generating real UI at all: grey boxes linked in Figma answer it in twenty minutes.",
              "If the question is about a specific interaction's feel, isolate just that one screen and prototype only it in higher fidelity, rather than raising the fidelity of the whole flow.",
              "Show it to someone the same day it's built. A prototype that sits unshown for a week has already lost its main advantage over the meeting it was meant to replace.",
            ],
          },
          check: [
            "What specific question was this prototype built to answer?",
            "What did the AI invent that you had to correct before sharing it?",
          ],
        },

        {
          slug: "five-people-a-task-not-a-tour",
          title: "Five people, a task, and your silence",
          kind: "Workshop",
          minutes: 70,
          legacy: "Module 10.1. Usability Tests",
          hook: "Your prototype looks right to you. You are the worst possible judge of that, because you already know where everything is.",
          case: {
            brand: "Nielsen Norman Group",
            year: "2000",
            situation:
              "Teams routinely delayed usability testing until they could recruit a large, statistically comfortable sample, treating five or six participants as too small to trust.",
            what: "Jakob Nielsen's research, based on data across dozens of studies, showed that testing with five users surfaces roughly 85 percent of a product's usability problems, and that testing five people, fixing what you find, then testing five more, finds more real problems than testing fifteen people once with no fixes in between.",
            lesson: "Five people this week beats fifteen people next quarter, because the fixing-and-retesting cycle is where most of the value actually is, not the sample size.",
            sources: [
              { label: "Nielsen Norman Group, Why You Only Need to Test With 5 Users", url: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/" },
            ],
          },
          explain: {
            title: "Give a task, not a tour",
            body: [
              "\"Set up your account and connect a bank\", then say nothing. The instinct to help is the thing you must suppress; every hint you give destroys the data point, because it papers over exactly the confusion you're there to measure.",
              "At the end people will say \"it was fine, very clean\". Ignore it. The finding was the eleven seconds they spent hunting for the back button. People are conflict-avoidant about criticising something you clearly made, so what they say afterward is close to worthless and what you watched them do is close to everything.",
              "Blocked, couldn't finish. Struggled, finished slowly or wrongly. Noticed, mentioned it in passing. Only the first two are roadmap items; the third is usually just politeness looking for somewhere to land.",
            ],
            points: [
              {
                term: "Give a task, not a tour",
                def: "\"Set up your account and connect a bank\", then say nothing. The instinct to help is the thing you must suppress; every hint you give destroys the data point.",
              },
              {
                term: "Watch hands and hesitation, not opinions",
                def: "At the end people will say \"it was fine, very clean\". Ignore it. The finding was the eleven seconds they spent hunting for the back button.",
              },
              {
                term: "Severity-rank the issues",
                def: "Blocked, couldn't finish. Struggled, finished slowly or wrongly. Noticed, mentioned it. Only the first two are roadmap items.",
              },
            ],
          },
          ai: {
            move: "Have a model generate realistic task scenarios and a note-taking template, then use it after each session to cluster your raw observations into ranked issues.",
            trap: "Don't let it interpret behaviour it didn't see. Feed it your timestamped observations, not your conclusions, otherwise it confidently amplifies whatever theory you already had before the sessions started.",
            prompt:
              "Here are my timestamped observation notes from five usability sessions on the same task: [notes]. Cluster them into distinct issues. For each issue, say how many of the five participants hit it, and rate it blocked, struggled, or noticed. Do not infer a cause I didn't observe directly.",
          },
          build: {
            artefact: "A usability report from five real people testing the prototype from the last lesson, with timestamped notes and a severity-ranked issue list.",
            steps: [
              { do: "Take the prototype from the last lesson. Write exactly one task sentence: what the person should accomplish, not how." },
              { do: "Recruit five people who don't work in product. Friends and family are fine for a first round." },
              {
                do: "Run the sessions. Say the task, then say nothing else while they work.",
                hint: "When someone asks \"what should I do here?\", answer with \"what would you do if I weren't here?\", every single time, no exceptions.",
              },
              { do: "Log every hesitation, wrong click and moment of silence with a timestamp as you watch, not from memory afterward." },
              { do: "Cluster and severity-rank: blocked, struggled, noticed. Fix the top two blockers and retest with two more people." },
            ],
            tools: ["The prototype from the last lesson", "A screen recorder", "A notebook for timestamps"],
          },
          solution: {
            summary: "The finding that matters is almost never in what people say afterward.",
            walkthrough: [
              "People will say \"it was fine, really clean\" at the end almost regardless of how it went, because most people are conflict-avoidant about criticising something you clearly made.",
              "The real finding is the eleven seconds someone spent staring at the back button, or the moment they tried to tap something that wasn't tappable.",
              "Two blocked participants out of five on the same step is a roadmap item, full stop, regardless of what anyone said in the debrief.",
              "Fix the top blocker, retest with two fresh people specifically on that step. If it's still blocking, your fix addressed your theory of the cause, not the actual cause.",
            ],
          },
          check: [
            "How many people were blocked, and on which exact step?",
            "Did you fix and retest, or stop at the report?",
            "What did people say afterward that contradicted what you actually watched them do?",
          ],
        },
      ],
    },

    /* ================================================================ 7 */
    {
      slug: "working-with-design",
      n: "7",
      title: "Working with the craft",
      summary:
        "You now know enough to be dangerous. This chapter is about being useful instead: critique well, hand off well, and know when to reuse rather than reinvent.",
      lessons: [
        {
          slug: "critique",
          title: "Critique without redesigning",
          kind: "Simulation",
          minutes: 45,
          legacy: "Module 8.8. Presenting Designs",
          hook: "The designer presents a flow. Something's off. If you say \"what if we moved this button\", you've just spent your credibility and probably made it worse.",
          case: {
            brand: "Pixar",
            situation:
              "Pixar reviews unfinished films in front of a group of directors who are explicitly forbidden from prescribing solutions, a process it calls the Braintrust.",
            what: "The rule is that the Braintrust identifies problems and the film's director decides what to do about them. Ed Catmull, Pixar's co-founder, credits this single constraint, diagnose, never prescribe, with why the process produces honesty rather than defensiveness.",
            lesson: "Prescribing a solution transfers ownership and kills the expertise you hired. Describing the problem keeps both.",
            sources: [{ label: "Harvard Business Review, How Pixar Fosters Collective Creativity", url: "https://hbr.org/2008/09/how-pixar-fosters-collective-creativity" }],
          },
          explain: {
            title: "Problem-feedback, not solution-feedback",
            body: [
              "\"Users won't know this is tappable\" is useful. \"Make it blue\" is you doing someone else's job worse than they would.",
              "Anchor every note to the user goal or to something from your usability test. Feedback traceable to a real person watching is almost impossible to argue with.",
              "Naming what works isn't politeness, it's information. It stops the thing that works getting removed by accident in the next iteration.",
            ],
            points: [
              {
                term: "Problem-feedback, not solution-feedback",
                def: "\"Users won't know this is tappable\" is useful. \"Make it blue\" is you doing someone else's job worse than they would.",
              },
              {
                term: "Tie feedback to the goal or the evidence",
                def: "Anchor every note to the user goal or to something from your usability test. Feedback traceable to a real person watching is almost impossible to argue with.",
              },
              {
                term: "Say what's working, specifically",
                def: "Not politeness, information. Naming what works stops it getting removed in the next iteration.",
              },
            ],
          },
          ai: {
            move: "Rehearse against a model playing a designer who pushes back correctly on vague feedback and on anything that prescribes a solution.",
            trap: "Set it up to be difficult: if your feedback prescribes a solution rather than naming a problem, it should refuse it and say why. The agreeable default teaches you nothing.",
            prompt:
              "You are a senior designer at a 40 person fintech. If my feedback prescribes a solution rather than naming a problem, refuse it and tell me why, then wait for me to try again. My feedback is:",
          },
          build: {
            artefact: "A written critique of a real design with every note tied to a goal or an observed user behaviour.",
            steps: [
              { do: "Take a design, the designer's, or your own from earlier in this level." },
              { do: "Write every note as: observation, then the problem it causes, then the goal it threatens." },
              { do: "Run the simulation. Rewrite every note it refuses." },
              { do: "Add two specific things that are working and must survive the next iteration." },
            ],
          },
          solution: {
            summary: "Most feedback that gets rejected in the simulation turns out to name a solution while believing it named a problem.",
            walkthrough: [
              "\"Make it stand out more\" is still a solution wearing a problem's clothes. The fix is to stop one level earlier: what can't the user tell right now, and why does that matter to their goal?",
              "Anchoring every note to either the state matrix, the usability test, or a named user goal turns a taste argument into an evidence argument, which is much harder to simply disagree with.",
              "The two things you name as already working matter as much as the criticism, because unnamed strengths are the first thing removed in the next revision, by accident.",
            ],
          },
          check: [
            "Does any note contain a solution? Rewrite it.",
            "Is every note traceable to a goal or a real observation?",
          ],
        },

        {
          slug: "working-with-a-designer",
          title: "Working with a designer without redesigning their work",
          kind: "Simulation",
          minutes: 45,
          hook: "Tom's back from the dashboard project and picks up your onboarding redesign. Your instinct is to hand him your Figma file, pixel-perfect, and ask him to \"just polish it\". That's the fastest way to make him resent the project.",
          explain: {
            title: "Handoff is a relationship, not a file transfer",
            body: [
              "Everything in this level so far, the vocabulary, the wireframes, the prototype, the state matrix, exists to make you a better collaborator with a professional designer, not a replacement for one. The line between useful and overbearing is specific: bring a well-argued problem, a rough structural idea, and real evidence, the usability findings, the state matrix. Do not bring a finished visual design and ask for it to be \"tightened up\", because that leaves the designer with no actual design decisions left to make, only your decisions to execute.",
              "A good handoff hands over the problem and the constraints, not the solution: what needs to happen on this screen, what states it needs to handle, what a usability test already told you, and where you're genuinely unsure. It explicitly separates what's fixed, the redesign needs to fit inside the existing bank-connection API, from what's open, whether the flow is three screens or four.",
              "The reverse failure is just as real: over-deferring to \"it's their call\" on something that's actually a product decision, like which fields are required, leaves a designer making business trade-offs they don't have the context for. The skill is knowing exactly which decisions are yours, which are theirs, and saying so explicitly rather than leaving it to be inferred.",
            ],
            points: [
              {
                term: "Hand over the problem, not the solution",
                def: "Your wireframes are a hypothesis to hand over, not a finished design to ask them to skin. If nothing about the layout is left for them to decide, you've taken their job.",
              },
              {
                term: "Separate fixed constraints from open questions",
                def: "Say explicitly what can't change, like an API or a legal requirement, and what's genuinely open, like layout or flow length. Don't make them guess which is which.",
              },
              {
                term: "Know which decisions are yours",
                def: "Which fields are required is a product decision, not a design one. Deferring it to \"their call\" leaves them making a business trade-off blind.",
              },
            ],
          },
          case: {
            brand: "Shopify",
            situation:
              "Shopify's product and design teams work from a shared design system, Polaris, that documents not just components but the reasoning behind them, so a PM proposing a change can reference an existing pattern and its rationale rather than inventing new visual language.",
            what: "Polaris is published openly, including guidance on when a pattern applies and when it doesn't, functioning as a shared vocabulary that lets product and design collaborate on structure and content without either side having to redraw the other's work from scratch.",
            lesson: "A shared, documented system is what makes it possible for a PM to propose a structural change credibly, in the design's own vocabulary, without personally redesigning the screen.",
            sources: [{ label: "Shopify, Polaris Design System", url: "https://polaris.shopify.com/" }],
          },
          ai: {
            move: "Rehearse the handoff conversation against a model playing a designer who pushes back the moment you hand over a finished visual decision instead of a problem.",
            trap: "Set it up deliberately adversarial, otherwise it plays an agreeable designer who accepts your mockup gratefully, which teaches you nothing about how a real designer with real ownership would react. Instruct it explicitly to push back and ask what decision you actually left it to make, whenever what you hand over is a finished solution rather than a problem.",
            prompt:
              "You are a senior product designer joining this project after being heads-down elsewhere for six weeks. If what I hand you is a finished visual solution rather than a problem, evidence and constraints, push back and ask what design decision I actually left you to make. Here is what I'm handing you:",
          },
          build: {
            artefact: "A real handoff document for Tom, or a role-played designer: the problem, the evidence, the fixed constraints, the open questions, and your wireframes framed explicitly as a hypothesis.",
            steps: [
              { do: "Write the problem in one paragraph: what's broken, for whom, backed by the usability findings from chapter six." },
              { do: "List fixed constraints separately from open questions. Be honest about which is which." },
              { do: "Attach your wireframes and state matrix, labelled explicitly as a starting hypothesis, not a finished design." },
              { do: "Run the simulation. Rewrite anything it correctly identifies as a solution disguised as a constraint." },
            ],
          },
          check: [
            "Which of your \"constraints\" did the simulation correctly identify as actually just your preference?",
            "What decision did you leave open for the designer, specifically?",
          ],
        },

        {
          slug: "reuse-or-make",
          title: "Reuse the component, or justify the new one",
          kind: "Concept",
          minutes: 45,
          hook: "You need a banner for the new error state. There are already four slightly different banner styles in the product. Making a fifth is the path of least resistance, and it's exactly how a product ends up with nine banner styles.",
          explain: {
            title: "A design system is a set of defaults, and every exception has a cost",
            body: [
              "A design system is a shared library of components, patterns and rules, buttons, spacing, colour, type, so that a hundred small decisions get made once, well, by whoever's best placed to make them, instead of being re-decided slightly differently on every screen by whoever happens to be building it that week. Its value compounds: the first component costs the most to build properly, and every reuse after that is close to free, both to build and, more importantly, to learn, since a user who's seen one error banner recognises the next one instantly.",
              "The decision to make something new instead of reusing what exists should always be a deliberate, stated trade-off, not a default born of not knowing the system exists or not wanting to look it up. A genuinely new need, one the existing components can't serve without a real usability compromise, justifies a new component. \"I didn't check what already existed\" or \"the existing one is fine but I have a slightly different preference\" doesn't.",
              "The cost of an unjustified new component isn't paid today, it's paid every day afterward: one more thing to maintain, one more visual pattern for a user to learn, one more inconsistency for the next person doing a critique like the one in chapter one to have to explain.",
            ],
            points: [
              {
                term: "Reuse is close to free, a new component never is",
                def: "The first version of a pattern is expensive to get right. Every reuse after that is nearly free to build and free for the user to recognise.",
              },
              {
                term: "Every exception needs a stated reason",
                def: "\"I didn't check what existed\" isn't a reason. A real, specific usability gap the existing component can't cover is.",
              },
              {
                term: "The cost of an unjustified new component is paid forever, not once",
                def: "Every inconsistent pattern is a small tax on every future user and every future critique.",
              },
            ],
          },
          case: {
            brand: "IBM",
            situation:
              "Carbon, IBM's open design system, is used across dozens of internal enterprise products built by teams that don't talk to each other day to day, exactly the condition under which visual drift usually happens fastest.",
            what: "IBM documents Carbon's components with explicit guidance on when to use each one and when not to, and treats a request for a new pattern as something that goes through the system's own team for review, rather than being decided unilaterally by whichever product team wants it, specifically to prevent the slow accumulation of near-duplicate components.",
            lesson: "The friction of having to justify a new component to someone else is a feature, not bureaucracy. It's what keeps a hundred small local decisions from adding up to visual chaos.",
            sources: [{ label: "IBM, Carbon Design System", url: "https://carbondesignsystem.com/" }],
          },
          ai: {
            move: "Describe the new need to a model along with a list of your existing components, and ask it to check whether an existing one could serve it with a small variant rather than a wholly new component.",
            trap: "It will readily agree a new component is warranted if you frame the request that way, since it has no actual stake in your product's long-term consistency and no visibility into how many similar \"just this once\" requests already got approved before yours. Ask it to argue the other side first: assume the answer is reuse an existing component with a small variant, and make that case as strongly as possible before considering anything new.",
          },
          build: {
            artefact: "A written justification, or rejection, for the new error banner: which existing component it should have reused, or why it genuinely couldn't.",
            steps: [
              { do: "List every existing banner or alert-style component currently in the product, exactly as they are today." },
              { do: "Try to make the new error state work with the closest existing one first, changing only colour or icon if needed." },
              { do: "If it genuinely doesn't fit, write the specific usability reason it doesn't, not a preference." },
              {
                do: "Propose the new component to Tom, or a role-played designer, with that written justification attached.",
                hint: "If you can't write the justification in two sentences, it's probably a preference, not a genuine gap.",
              },
            ],
          },
          check: [
            "Which existing component did you try first, and specifically why didn't it work?",
            "Is your stated reason for the new component a usability gap, or a preference dressed up as one?",
          ],
        },
      ],
    },
  ],
};
