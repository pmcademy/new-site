export type CaseStory={slug:string;brand:string;title:string;category:string;art:"research"|"collaboration"|"priority"|"cinema"|"music"|"travel";period:string;source:{label:string;url:string};dek:string;fact:string;chapters:{id:string;label:string;title:string;body:string}[];options:{label:string;feedback:string}[];build:string;prompt:string};
export const caseStories:CaseStory[]=[
  {
    "slug": "superhuman-product-market-fit",
    "brand": "Superhuman",
    "title": "Find the people who need you most.",
    "category": "Discovery",
    "art": "research",
    "period": "2018 founder account",
    "source": {
      "label": "Superhuman: original account",
      "url": "https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/"
    },
    "dek": "An average can hide a group with an urgent need. Explore how segmentation changes the question, then inspect what the numbers cannot prove.",
    "fact": "Superhuman’s founder describes using a product-market fit survey, identifying strong supporters, studying their main benefit, and using that focus to guide product work. This is a historical founder account, not independent proof that the method will work for every business.",
    "chapters": [
      {
        "id": "context",
        "label": "The tension",
        "title": "A launch decision needs more than enthusiasm.",
        "body": "Imagine you manage a new reporting tool. Some people rely on it every afternoon, while others tried it once and left. A single satisfaction average gives the team an easy number but a difficult decision. Should you broaden the feature set or deepen the experience for the people who already depend on it? Start by defining what you need to learn, rather than choosing the answer with the largest audience."
      },
      {
        "id": "person",
        "label": "The person",
        "title": "A situation is more useful than a flattering persona.",
        "body": "Our fictional learner, Leena, coordinates five client updates each day. A missed message can block another person’s work. Compare her situation with someone who prepares one personal report a month. These people may want similar-looking screens for very different reasons. A segment becomes useful when it explains a recurring need, constraint, or benefit. Calling someone a power user only restates the activity you observed."
      },
      {
        "id": "mechanism",
        "label": "The mechanism",
        "title": "Change the group. Keep the denominator.",
        "body": "Use the model below to inspect three fictional survey groups. Notice that a higher support percentage can come from a smaller selected group. That can be a promising lead, but selecting the best-performing group after seeing the data creates a hypothesis to validate. It does not turn a small survey into proof of a broad market. Keep eligibility, response counts and nonresponse beside every percentage."
      },
      {
        "id": "tradeoff",
        "label": "The trade-off",
        "title": "Focus creates both clarity and exclusions.",
        "body": "Suppose daily coordinators consistently value reliable handoffs. You might prioritise that workflow, explain it more clearly in onboarding, and recruit more people in the same situation. That choice also postpones other needs. Write down who benefits, who waits, and what would justify expanding later. Avoid assuming that every complaint from a less-engaged group is irrelevant; accessibility and safety problems can cross segment boundaries."
      },
      {
        "id": "evidence",
        "label": "The evidence",
        "title": "Look for the behaviour behind the survey.",
        "body": "For your project, combine the survey lead with an observed task and a meaningful return event. Ask which benefit people would miss and what alternative they would use. Check whether the promising group remains promising in a fresh sample. Keep acquisition channel and tenure visible. If the story depends on excluding inconvenient responses without a principled eligibility rule, revisit the claim before presenting it to the team."
      },
      {
        "id": "decision",
        "label": "Your decision",
        "title": "Which uncertainty deserves the next week?",
        "body": "Your fictional team can either add three features requested by occasional users or investigate the daily coordinators’ handoff problem. Neither option is universally correct. Choose the next action that most reduces uncertainty about a valuable, reachable need. Explain the cost of being wrong, the evidence you already have, and the smallest observation that could reverse your choice."
      },
      {
        "id": "apply",
        "label": "Make it yours",
        "title": "Leave with a segment hypothesis.",
        "body": "Create a one-page segment brief: situation, repeated need, current workaround, main benefit, source evidence, and missing evidence. Add one comparison group and a fresh-sample validation plan. Keep survey counts separate from forecasts. Your deliverable is a focused research decision, not a declaration that you have found product-market fit."
      }
    ],
    "options": [
      {
        "label": "Recruit a contrasting fresh sample",
        "feedback": "This checks whether the segment survives beyond the evidence used to discover it. Define eligibility before recruiting."
      },
      {
        "label": "Add every requested feature",
        "feedback": "More features may blur the benefit. First identify which requests address a supported need."
      },
      {
        "label": "Declare fit from the best percentage",
        "feedback": "The selected percentage is a lead, not a certificate. Check denominators, selection and behaviour."
      }
    ],
    "build": "Write a segment hypothesis and a two-week evidence plan. Include one result that would make you abandon the focus.",
    "prompt": "Critique my project artifact using only the evidence I provide. Write a segment hypothesis and a two-week evidence plan. Include one result that would make you abandon the focus. Separate observed facts, assumptions, proposed tests and missing evidence. Identify a failure mode and a cheap check. Do not invent company results or user research. Ask for my artifact before starting."
  },
  {
    "slug": "figma-multiplayer",
    "brand": "Figma",
    "title": "When everyone edits at once.",
    "category": "Systems",
    "art": "collaboration",
    "period": "2019 engineering account",
    "source": {
      "label": "Figma: original account",
      "url": "https://www.figma.com/blog/how-figmas-multiplayer-technology-works/"
    },
    "dek": "A shared canvas is also a promise about whose work is saved. Explore local edits, connection loss and reconciliation.",
    "fact": "Figma’s engineering article explains a client-server multiplayer system influenced by CRDT ideas, including how edits are synchronised and how an offline client reconnects. The account illustrates the system work behind a collaborative interface; the model here is deliberately simpler than Figma’s implementation.",
    "chapters": [
      {
        "id": "context",
        "label": "The tension",
        "title": "Two people can be right locally.",
        "body": "Imagine Leena and Omar editing a shared project brief. Leena changes a heading while Omar moves a section. Each person expects an immediate response and assumes their work will survive. If the interface waits for every network roundtrip, editing feels slow. If it confirms everything instantly without distinguishing local and shared state, it can promise more than the system knows."
      },
      {
        "id": "person",
        "label": "The person",
        "title": "A cursor is a social signal, not a save guarantee.",
        "body": "Seeing another person’s cursor can help coordination, but it does not tell you whether your last change reached the server. Separate presence, local editing, shared state and persistence in your requirements. Ask what the person needs to know in each state. A designer may tolerate a brief delay in another cursor while being very sensitive to uncertainty about whether a major edit has been preserved."
      },
      {
        "id": "mechanism",
        "label": "The mechanism",
        "title": "Follow an edit across the connection.",
        "body": "Move through the three states below. Leena first sees her local edit. The connection then disappears, so the interface must not claim that shared state is current. Reconciliation eventually gives both clients a resolved result. This teaching model does not implement a CRDT or Figma’s conflict rules. Its purpose is to make the product promise explicit before you choose the technical mechanism."
      },
      {
        "id": "tradeoff",
        "label": "The trade-off",
        "title": "Instant feedback needs honest boundaries.",
        "body": "Optimistic interaction makes work feel responsive, but error and recovery states become essential. Write the rules for two edits to different fields and two edits to the same field. Consider undo: does it reverse only your action, or can it unexpectedly remove a collaborator’s later work? A PM need not invent a synchronisation algorithm, but must describe the outcomes people expect and review the edge cases with engineering."
      },
      {
        "id": "evidence",
        "label": "The evidence",
        "title": "Test the transitions that happy-path demos omit.",
        "body": "For a prototype review, disconnect one client, edit the same field in two windows, reconnect, and attempt undo. Inspect the visible state and the saved result. Include slow connections and refreshes. Track lost-work reports separately from ordinary latency. A system can feel fast in a demo while leaving users uncertain in the exact situations where trust matters most."
      },
      {
        "id": "decision",
        "label": "Your decision",
        "title": "What should the interface promise while offline?",
        "body": "Your fictional editor can show a generic “saved” label, an explicit local-only state, or block every edit. Choose based on what the system can actually preserve and reconcile. Explain the cost of a misleading success message and the cost of unnecessary interruption. The right choice connects the technical guarantee with a clear user expectation."
      },
      {
        "id": "apply",
        "label": "Make it yours",
        "title": "Write a collaboration state contract.",
        "body": "Create a matrix for connected, slow, offline, reconnecting and conflicted states. For each, specify permitted actions, visible feedback, persistence guarantees and recovery. Add a same-field conflict example and an undo example. Review the matrix with an engineer before designing decorative presence indicators."
      }
    ],
    "options": [
      {
        "label": "Show local-only state and a recovery path",
        "feedback": "This makes the boundary visible. Confirm what local persistence actually guarantees and how reconciliation works."
      },
      {
        "label": "Always show “saved” immediately",
        "feedback": "An optimistic display cannot guarantee server persistence. This can create false confidence about important work."
      },
      {
        "label": "Block editing on any delay",
        "feedback": "This protects consistency at a usability cost. Distinguish a brief delay from an unrecoverable condition."
      }
    ],
    "build": "Create the five-state collaboration matrix, with a same-field edit conflict and an undo rule.",
    "prompt": "Critique my project artifact using only the evidence I provide. Create the five-state collaboration matrix, with a same-field edit conflict and an undo rule. Separate observed facts, assumptions, proposed tests and missing evidence. Identify a failure mode and a cheap check. Do not invent company results or user research. Ask for my artifact before starting."
  },
  {
    "slug": "intercom-rice",
    "brand": "Intercom",
    "title": "A number should start a conversation.",
    "category": "Strategy",
    "art": "priority",
    "period": "RICE framework account",
    "source": {
      "label": "Intercom: original account",
      "url": "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/"
    },
    "dek": "Reach, impact, confidence and effort make assumptions visible. Move one input and watch the preferred option change.",
    "fact": "Intercom describes RICE as reach multiplied by impact and confidence, divided by effort. Its explanation also allows dependencies and other strategic reasons to justify work outside strict score order. The framework structures a comparison rather than replacing judgement.",
    "chapters": [
      {
        "id": "context",
        "label": "The tension",
        "title": "A confident pitch can outrun weak evidence.",
        "body": "Imagine two roadmap proposals. One has a vivid customer story; the other affects a larger group but sounds less exciting. A shared scoring method can expose the assumptions behind the pitches. It becomes less useful if the team treats a precise-looking number as an objective truth or adjusts inputs until a favourite proposal wins."
      },
      {
        "id": "person",
        "label": "The person",
        "title": "Different roles see different parts of the burden.",
        "body": "A support lead notices repeated tickets, an engineer sees implementation risk, and a salesperson remembers a lost deal. Give each person a way to contribute evidence without pretending the observations are interchangeable. Ask which population the reach estimate describes, which outcome impact changes, and what effort includes. Shared definitions matter more than an attractive spreadsheet."
      },
      {
        "id": "mechanism",
        "label": "The mechanism",
        "title": "Turn the uncertain dial.",
        "body": "Use the confidence control below. Option A reaches 100 people, has impact 2 and takes two person-months. Option B reaches 160, has impact 1, confidence 80 percent and the same effort. Both use the same reach period. As A’s confidence changes, the ordering can reverse. These are fictional inputs used to expose sensitivity, not recommended scores for a real roadmap."
      },
      {
        "id": "tradeoff",
        "label": "The trade-off",
        "title": "Measurable work can crowd out necessary work.",
        "body": "A scoring framework can understate enabling infrastructure, mandatory fixes, or a dependency that unlocks another project. Keep these reasons explicit rather than distorting reach or effort to make them fit. A separate strategic rationale is easier to review than an inflated score. Also record the opportunity cost: which plausible work waits if you choose this proposal?"
      },
      {
        "id": "evidence",
        "label": "The evidence",
        "title": "Investigate the input that changes the decision.",
        "body": "If a small confidence change reverses the order, a short discovery task may be valuable. If the ranking stays stable across plausible inputs, another week refining decimals may not help. Ask the owners of the estimates for source links and uncertainty ranges. Revisit effort after technical exploration and include coordination, rollout and support where those costs matter."
      },
      {
        "id": "decision",
        "label": "Your decision",
        "title": "Would you build, investigate, or override?",
        "body": "Your fictional team has one week before planning. You can accept the current ranking, gather evidence for the most sensitive assumption, or prioritise a dependency with an explicit rationale. Choose the action that makes the decision more defensible. Explain what evidence would change your mind and avoid using the framework as a way to end a legitimate disagreement."
      },
      {
        "id": "apply",
        "label": "Make it yours",
        "title": "Build a scorecard with an audit trail.",
        "body": "Compare three project opportunities using consistent reach periods and effort units. Attach a source, confidence rationale and plausible range to each uncertain input. Add dependencies and strategic exceptions in a separate column. Finish with a decision statement and a review date so the scorecard can evolve as you learn."
      }
    ],
    "options": [
      {
        "label": "Check the most sensitive assumption",
        "feedback": "A focused check is useful when it can change the order or reduce an expensive risk."
      },
      {
        "label": "Pick the largest score automatically",
        "feedback": "The score inherits uncertain inputs and may omit dependencies. Review those before committing."
      },
      {
        "label": "Inflate a dependency’s score",
        "feedback": "Keep the dependency rationale explicit instead of corrupting the comparison."
      }
    ],
    "build": "Build a three-option RICE scorecard with ranges, sources, dependencies and a written recommendation.",
    "prompt": "Critique my project artifact using only the evidence I provide. Build a three-option RICE scorecard with ranges, sources, dependencies and a written recommendation. Separate observed facts, assumptions, proposed tests and missing evidence. Identify a failure mode and a cheap check. Do not invent company results or user research. Ask for my artifact before starting."
  },
  {
    "slug": "netflix-artwork",
    "brand": "Netflix",
    "title": "One story. Different invitations.",
    "category": "Personalisation",
    "art": "cinema",
    "period": "2017 technical account",
    "source": {
      "label": "Netflix: original account",
      "url": "https://netflixtechblog.com/artwork-personalization-c589f074ad76"
    },
    "dek": "The title stays the same while its visual invitation changes. Explore relevance, recognition and truthful expectations.",
    "fact": "Netflix’s technical account describes personalising artwork used to present a title, including exploration and learning from responses. It distinguishes choosing an image from choosing the underlying item. This case uses original fictional artwork and does not reproduce a current Netflix screen.",
    "chapters": [
      {
        "id": "context",
        "label": "The tension",
        "title": "The first frame sets an expectation.",
        "body": "Imagine a fictional film called The Long Way Home. One image emphasises a relationship, another a tense moment, and another a journey. Each can be truthful while attracting attention for a different reason. The product question is not simply which picture receives more clicks. It is whether the invitation helps someone choose an experience they will value."
      },
      {
        "id": "person",
        "label": "The person",
        "title": "Relevance is not permission to stereotype.",
        "body": "A viewer’s past behaviour is incomplete and contextual. A family may share an account, a mood can change, and a click may represent curiosity rather than a lasting preference. Avoid treating a thin behavioural signal as a fixed identity. In your own project, explain the input you can actually observe and give people routes to recover from an irrelevant recommendation."
      },
      {
        "id": "mechanism",
        "label": "The mechanism",
        "title": "Change the invitation, keep the item.",
        "body": "Switch between the three fictional artwork treatments. The film identity remains stable while the emphasis changes. This separates presentation from selection so you can reason about each. The model is a visual teaching tool, not a trained personalisation system. It does not infer your preferences or send viewing behaviour to Netflix."
      },
      {
        "id": "tradeoff",
        "label": "The trade-off",
        "title": "Attention can rise while trust falls.",
        "body": "An image might increase selection by promising a tone or character that barely appears. That can harm satisfaction even when clicks rise. Write content-faithfulness and recognition constraints before optimising the invitation. Also consider repeated exposure: a person may struggle to recognise a title if its artwork changes too dramatically between visits."
      },
      {
        "id": "evidence",
        "label": "The evidence",
        "title": "Measure after the click.",
        "body": "For a fictional experiment, define selection, meaningful consumption, early abandonment and negative feedback. Check the time window and eligible population. A presentation change can affect who starts the item, which complicates naive comparisons among only those who watched. Ask how the experiment assignment and analysis preserve a fair comparison, and keep guardrails for misleading imagery."
      },
      {
        "id": "decision",
        "label": "Your decision",
        "title": "Which result would make you hesitate?",
        "body": "Suppose one treatment wins clicks but more people leave immediately. Another has fewer starts but clearer expectations. You need the actual experiment design and uncertainty before choosing a winner, but the disagreement already identifies a useful question: is the artwork attracting the right intention? Write the next check before requesting more variants."
      },
      {
        "id": "apply",
        "label": "Make it yours",
        "title": "Create a truthful invitation test.",
        "body": "Choose one item in your project and sketch three honest ways to present it. State what stays constant, which relevance hypothesis changes, and what would count as a misleading expectation. Define a downstream outcome and a recognition guardrail. Use original or appropriately licensed images, and keep company results separate from your proposed experiment."
      }
    ],
    "options": [
      {
        "label": "Inspect downstream satisfaction",
        "feedback": "Selection should lead to value. Check expectations, consumption and the assignment design."
      },
      {
        "label": "Optimise only for clicks",
        "feedback": "A persuasive invitation can disappoint after selection. Add a downstream outcome and a truthfulness boundary."
      },
      {
        "label": "Infer a permanent identity from one click",
        "feedback": "A single event is weak contextual evidence. Avoid turning it into a rigid personal label."
      }
    ],
    "build": "Sketch three truthful presentations of one item and write a test with a downstream outcome and guardrail.",
    "prompt": "Critique my project artifact using only the evidence I provide. Sketch three truthful presentations of one item and write a test with a downstream outcome and guardrail. Separate observed facts, assumptions, proposed tests and missing evidence. Identify a failure mode and a cheap check. Do not invent company results or user research. Ask for my artifact before starting."
  },
  {
    "slug": "spotify-discover-weekly",
    "brand": "Spotify",
    "title": "Fresh discovery. A familiar place.",
    "category": "Retention",
    "art": "music",
    "period": "2015 launch account",
    "source": {
      "label": "Spotify: original account",
      "url": "https://engineering.atspotify.com/2015/11/what-made-discover-weekly-one-of-our-most-successful-feature-launches-to-date"
    },
    "dek": "A recurring collection can offer novelty without making the interface unfamiliar. Explore the boundary between refresh and saved value.",
    "fact": "Spotify’s launch account discusses Discover Weekly as a personalised collection delivered through a familiar playlist format and a recurring refresh. The article reflects on product choices around the launch. Our tracks, interface and state transitions are fictional teaching material.",
    "chapters": [
      {
        "id": "context",
        "label": "The tension",
        "title": "Novelty asks for attention every time.",
        "body": "Imagine a learner who wants useful new reading but has little time to explore a large library. A changing collection can reduce search effort, yet too much unpredictability makes it hard to form a routine. The opportunity is to put changing content inside a recognisable container with an understandable rhythm."
      },
      {
        "id": "person",
        "label": "The person",
        "title": "A return needs a reason beyond a reminder.",
        "body": "Our fictional listener, Omar, opens a collection during a weekly commute. He does not need to relearn controls each time. He does need to understand what is new, what will change later, and how to keep something he likes. A reminder alone cannot create that value. The recurring experience needs a clear job in the person’s life."
      },
      {
        "id": "mechanism",
        "label": "The mechanism",
        "title": "Refresh the collection, preserve saved value.",
        "body": "Switch between week one, week two and a saved item. The container remains familiar while its contents change. Saving creates a different state from merely encountering a recommendation. This model does not use Spotify data or play music. It helps you inspect the promise made when a temporary collection contains something a person wants to keep."
      },
      {
        "id": "tradeoff",
        "label": "The trade-off",
        "title": "A rhythm can become pressure.",
        "body": "A regular refresh may support anticipation, but it can also create anxiety about missing content. Give people an understandable way to save, revisit or decline. Do not imply that every item must be consumed before the next refresh. Consider accessibility and variable schedules: useful recurring value should not depend on a perfect weekly routine."
      },
      {
        "id": "evidence",
        "label": "The evidence",
        "title": "Separate exposure, discovery and lasting value.",
        "body": "In your project, distinguish opening the collection, trying an item, saving it, and returning to something saved. A high open rate might reflect curiosity without usefulness. Inspect skips and feedback alongside deeper actions. Define the evaluation period before declaring that a weekly feature formed a habit, and avoid claiming retention lift from a simple before-and-after comparison."
      },
      {
        "id": "decision",
        "label": "Your decision",
        "title": "What should happen to a useful find?",
        "body": "Your fictional reading collection refreshes tomorrow. A learner wants to retain one article. You can provide a clear save action, silently overwrite the collection, or make saving require an unrelated social post. Choose a flow that preserves the learner’s agency and the value already discovered. Explain what feedback confirms the action and where the saved item lives."
      },
      {
        "id": "apply",
        "label": "Make it yours",
        "title": "Design the next two visits.",
        "body": "Sketch the first collection, the next refresh, and the saved-item view. Name the recurring job, the refresh rule, and the preservation rule. Add a way to recover after a missed week. Your experiment should measure useful discovery and return to value, not just notification opens."
      }
    ],
    "options": [
      {
        "label": "Make saving and retrieval explicit",
        "feedback": "The person can preserve value while the collection changes. Make the saved destination and confirmation clear."
      },
      {
        "label": "Overwrite without explanation",
        "feedback": "This can break expectations and lose useful finds. Explain refresh behaviour and offer preservation."
      },
      {
        "label": "Require a social share to save",
        "feedback": "This adds an unrelated obstacle. Let learners keep useful work without forced promotion."
      }
    ],
    "build": "Design a two-visit journey with refresh, save, retrieval and missed-week recovery states.",
    "prompt": "Critique my project artifact using only the evidence I provide. Design a two-visit journey with refresh, save, retrieval and missed-week recovery states. Separate observed facts, assumptions, proposed tests and missing evidence. Identify a failure mode and a cheap check. Do not invent company results or user research. Ask for my artifact before starting."
  },
  {
    "slug": "airbnb-categories",
    "brand": "Airbnb",
    "title": "Start with the stay, not only the place.",
    "category": "Discovery",
    "art": "travel",
    "period": "2022 product release",
    "source": {
      "label": "Airbnb: original account",
      "url": "https://news.airbnb.com/product-releases/airbnb-2022-summer-release"
    },
    "dek": "Browsing by the kind of stay changes the starting question. Explore inspiration without losing dates, budget and access needs.",
    "fact": "Airbnb’s 2022 release introduced Categories as a way to explore stays by qualities such as style, location or activities, alongside other product changes. The public announcement describes the intended experience; it does not by itself establish the causal effect on bookings.",
    "chapters": [
      {
        "id": "context",
        "label": "The tension",
        "title": "A destination box assumes a decision is already made.",
        "body": "Imagine Leena planning a short break. She knows she wants a quiet cabin but has not chosen a town. A location-first search asks for certainty she does not yet have. A category-based route can let her begin with the experience she wants, while a conventional search remains useful for someone with a fixed destination."
      },
      {
        "id": "person",
        "label": "The person",
        "title": "Inspiration still has constraints.",
        "body": "A compelling picture does not remove a budget, a date range, a mobility requirement, or a maximum travel time. Write those constraints beside the exploratory intent. Consider a traveller who needs step-free access and another who can only travel on a specific weekend. A discovery experience becomes useful when attractive possibilities can be narrowed into feasible options."
      },
      {
        "id": "mechanism",
        "label": "The mechanism",
        "title": "Change the organising idea.",
        "body": "Switch between cabins, design and countryside in the fictional model. Each category changes the visual route into the collection. These properties have no live availability and are not Airbnb listings. The exercise isolates the navigation mechanism so you can ask which labels make sense, what belongs in each group, and how the person returns to a previous choice."
      },
      {
        "id": "tradeoff",
        "label": "The trade-off",
        "title": "An attractive category can hide a poor match.",
        "body": "Categories can overlap and their names can be interpreted differently. A place may fit a style category while failing a practical requirement. Preserve filters and explain why an item appears where that information helps a decision. Avoid allowing beautiful exploration to reset constraints silently. A person should not have to re-enter essential needs after every new branch."
      },
      {
        "id": "evidence",
        "label": "The evidence",
        "title": "Watch the route from inspiration to feasibility.",
        "body": "For your own test, observe whether people can find a plausible option, understand the category, apply constraints, and compare alternatives. Track dead ends and repeated filter changes as well as selection. Do not interpret a longer browsing session as automatic success; it could mean delight or difficulty. Ask the person to explain what changed in their decision."
      },
      {
        "id": "decision",
        "label": "Your decision",
        "title": "Should a category reset the search?",
        "body": "Your fictional travel product preserves the chosen dates when someone explores a cabin category. A designer suggests clearing dates to show more beautiful options. That might expand inspiration while frustrating someone with fixed availability. Choose an explicit behaviour and explain the trade-off. A visible opt-in to flexible dates is different from silently discarding a constraint."
      },
      {
        "id": "apply",
        "label": "Make it yours",
        "title": "Map exploratory and directed journeys.",
        "body": "Pick a project where users can begin with either a known target or an experience they want. Sketch both entry routes, the shared constraints, a category transition, and a dead-end recovery. Include a label test with realistic examples. Define success as progress toward a feasible decision, not simply time spent browsing."
      }
    ],
    "options": [
      {
        "label": "Preserve constraints with explicit flexibility",
        "feedback": "This supports exploration while respecting known needs. Make flexibility a visible choice."
      },
      {
        "label": "Clear filters silently",
        "feedback": "The extra results may be irrelevant. Silent resets can undermine trust and create repeated work."
      },
      {
        "label": "Force every person into categories",
        "feedback": "Directed users may already know what they need. Keep a clear route for that intent."
      }
    ],
    "build": "Map exploratory and directed search, including preserved constraints and one dead-end recovery.",
    "prompt": "Critique my project artifact using only the evidence I provide. Map exploratory and directed search, including preserved constraints and one dead-end recovery. Separate observed facts, assumptions, proposed tests and missing evidence. Identify a failure mode and a cheap check. Do not invent company results or user research. Ask for my artifact before starting."
  }
];
