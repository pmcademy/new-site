import type { LessonVisual } from "../lesson-visuals";
export type LabKind = "flow" | "funnel" | "economics" | "retention" | "extraction" | "rice";
export type ArticleAssignment = { number: number; title: string; brief: string; artifact: string };
export type LessonEnrichment = {
  intro: string; teaching: { title: string; body: string }[];
  example: { title: string; body: string }; prompt: string; verify: string[];
  hint: string; practice: string; visual: LessonVisual;
  reading: { label: string; url: string }[]; lab?: LabKind; article?: ArticleAssignment;
};
// Explicitly reviewed lesson-by-lesson. Additional examples are fictional, not research findings.
export const levelOneEnrichment: Record<string, LessonEnrichment> = {
  "your-first-monday": {
    "teaching": [
      {
        "title": "Separate observation from interpretation",
        "body": "An observation is something you can point at: a review says the second account never appears. “Users do not trust us” is an interpretation. Keep the quote, source identifier and date in one column, then your interpretation in another. This lets a colleague disagree with your explanation without disputing that the event occurred."
      },
      {
        "title": "Use a denominator before a ranking",
        "body": "Twenty complaints might represent one loud customer, one bank integration or twenty independent failures. Deduplicate people and distinguish reports from affected users. A frequency ranking without a population definition can promote the easiest problem to complain about rather than the most expensive problem to have."
      },
      {
        "title": "Recommend the next decision",
        "body": "Your first memo need not name a finished solution. It can ask for one day to inspect failed callbacks because that investigation distinguishes an integration bug from a confusing interface. State the evidence you have, what it cannot establish, the cheapest next check and the person who can run it. That is progress a founder can approve."
      }
    ],
    "intro": "Your first useful contribution is a claim someone else can inspect. Treat the review pile as an evidence problem before treating it as a feature backlog.",
    "example": {
      "title": "A narrower claim wins",
      "body": "Suppose three anonymised reviews mention a missing second account. One is a duplicate and none names the bank. The defensible claim is “two independent reports describe missing second accounts.” It is not “most users abandon because the integration is broken.” Ask Dev for the connection events and ask Priya for the affected bank names before ranking a fix."
    },
    "prompt": "Act as an evidence analyst. I will provide anonymised feedback with source IDs. Return one row per distinct reported incident: source ID, exact quote, observed behaviour, interpretation, missing context. Do not infer frequency beyond the supplied sample. Mark unsupported causes as hypotheses. Then propose the smallest check that could disprove each interpretation. Ask for the feedback before starting.",
    "verify": [
      "Check five quotes against their sources",
      " count unique incidents rather than rows",
      " remove any claim whose evidence cannot be opened."
    ],
    "hint": "If the model gives a polished summary, ask it to reconstruct the table with exact source IDs. If it cannot, restart with smaller batches rather than accepting the prose.",
    "practice": "Rewrite your strongest claim so a teammate could disprove it with a query or a user conversation. Save both versions in your evidence log.",
    "visual": {
      "kind": "pipeline",
      "title": "From a report to a defensible next step",
      "nodes": [
        {
          "label": "Report",
          "detail": "Exact source quote"
        },
        {
          "label": "Check",
          "detail": "Unique incident"
        },
        {
          "label": "Claim",
          "detail": "Narrow interpretation"
        },
        {
          "label": "Next move",
          "detail": "A disconfirming check"
        }
      ],
      "caption": "From a report to a defensible next step. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: analyse a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ]
  },
  "three-chairs": {
    "teaching": [
      {
        "title": "Name the question each person answers",
        "body": "Product asks whether the outcome is worth pursuing. Design asks whether a person can understand and use the proposed experience. Engineering asks whether it can be built and operated within the constraints. A strong proposal can fail any one of these tests; enthusiasm in one discipline does not answer another discipline's question."
      },
      {
        "title": "Distinguish constraints from preferences",
        "body": "“The provider cannot return this field” is a constraint to investigate. “A modal would look cleaner” is a proposed solution. Write the constraint independently from the person's preferred implementation. Once the team sees the underlying restriction, several better options may appear without anyone having to lose face."
      },
      {
        "title": "Write the trade-off and the owner",
        "body": "A decision note should say which option was chosen, which credible option was rejected, the evidence behind the choice and what would trigger a revisit. Name who owns execution and who needs to be consulted. This prevents the room from leaving with three different versions of what was decided."
      }
    ],
    "intro": "Product, design and engineering share a decision, but they contribute different evidence. Your role is to make the disagreement explicit enough to resolve.",
    "example": {
      "title": "A connection-status disagreement",
      "body": "Tom wants a persistent status banner. Dev says the provider only updates status after a callback. You want fewer duplicate attempts. Separate the user need, reliable feedback, from the implementation. A pending state with a timestamp and a safe retry rule might satisfy the need without pretending that live status exists."
    },
    "prompt": "Role-play a design lead and an engineering lead reviewing my proposal. For each, state the question they must answer, the evidence missing and one alternative. Separate constraints from preferences. Do not invent capabilities of our API. Finish with a decision table that leaves unknowns explicitly unresolved. Here is my proposal: [paste it].",
    "verify": [
      "Confirm technical constraints with an engineer",
      " tie design objections to a user task",
      " state which trade-off you personally own."
    ],
    "hint": "Use the simulated disagreement to prepare questions, not as evidence that a real colleague agrees. Bring the unanswered questions to the actual team.",
    "practice": "Write a five-line decision note that includes a rejected option and a reason to revisit the call.",
    "visual": {
      "kind": "tree",
      "title": "One decision, three evidence requirements",
      "nodes": [
        {
          "label": "Decision",
          "detail": "What should change?"
        },
        {
          "label": "Value",
          "detail": "Worth the cost?"
        },
        {
          "label": "Usability",
          "detail": "Can people do it?"
        },
        {
          "label": "Feasibility",
          "detail": "Can we operate it?"
        }
      ],
      "caption": "One decision, three evidence requirements. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "Nielsen Norman Group: ten usability heuristics",
        "url": "https://www.nngroup.com/articles/ten-usability-heuristics/"
      }
    ]
  },
  "the-decision-meeting": {
    "teaching": [
      {
        "title": "Design the decision before the agenda",
        "body": "Write the choice as a sentence: approve a one-day investigation, choose one of two scope options, or stop a weak experiment. Identify who is authorised to make that choice and what information they need. If the agenda cannot name a choice, use a written update or a working session instead."
      },
      {
        "title": "Give disagreement a place to land",
        "body": "Send a short brief with the options and uncertainties. During silent reading, let people mark assumptions rather than forcing them to interrupt a speaker. Group objections into evidence, constraints and preferences. Deal with the objection that changes the decision first, even when a less important point is easier to answer."
      },
      {
        "title": "Close the loop while everyone is present",
        "body": "Read back the decision, owner, date and unresolved risk. Ask whether anyone heard something different. Record a revisit trigger for uncertainty that remains. A meeting with no decision can still be useful if it names the missing evidence and the person responsible for getting it by a specific time."
      }
    ],
    "intro": "A meeting is useful when it changes what happens next. Preparation, a decision owner and a record matter more than a confident presentation.",
    "example": {
      "title": "Thirty minutes with Maya",
      "body": "The ask is one day of engineering investigation. Spend the first ten minutes reading the memo, fifteen on the integration-versus-interface uncertainty and five on the decision. If Dev cannot estimate the logging work, the output becomes a scoped investigation question with a same-day estimate owner, not a vague promise to improve onboarding."
    },
    "prompt": "Turn this decision brief into a 30-minute meeting plan. Name the decision owner, prerequisites, reading time, three objections likely to change the call, and the exact read-back at the end. Flag questions that cannot be answered from the brief. Do not schedule a presentation unless it serves the decision. Brief: [paste].",
    "verify": [
      "Make sure every agenda item serves the named choice",
      " check the owner is real",
      " preserve dissent in the final note."
    ],
    "hint": "Ask AI to play the busiest participant and identify what it could not decide after reading the brief. Fix the brief before rehearsing your speaking voice.",
    "practice": "Run a five-minute rehearsal with a peer. Ask them to repeat the requested decision without looking at your notes.",
    "visual": {
      "kind": "timeline",
      "title": "Make the decision observable",
      "nodes": [
        {
          "label": "Before",
          "detail": "Brief and owner"
        },
        {
          "label": "Read",
          "detail": "Mark assumptions"
        },
        {
          "label": "Discuss",
          "detail": "Resolve the key risk"
        },
        {
          "label": "Close",
          "detail": "Decision and date"
        }
      ],
      "caption": "Make the decision observable. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "Shape Up: set boundaries",
        "url": "https://basecamp.com/shapeup/1.2-chapter-03"
      }
    ]
  },
  "reading-an-interface": {
    "teaching": [
      {
        "title": "Start from one person's task",
        "body": "Choose a specific user and a concrete job, such as finding last month's spending. Describe the starting state, what information they need and what counts as completion. The same dense screen may help a returning expert while overwhelming a first-time user; a critique without a task cannot resolve that difference."
      },
      {
        "title": "Trace prominence, defaults and friction",
        "body": "Mark the largest element, the primary action, preselected choices and steps that take extra effort. These features suggest what the interface prioritises, but they do not prove the designers' intentions. Phrase intent as a hypothesis and use observable interaction costs as the evidence you can defend."
      },
      {
        "title": "Separate a usability issue from taste",
        "body": "“I prefer green” does not predict behaviour. “The primary action and secondary action have identical emphasis, so the next step is unclear” is testable. Rank findings by whether they block the task, slow it or merely change appearance. Keep a note of what already works so your redesign does not remove it accidentally."
      }
    ],
    "intro": "An interface is a set of priorities made visible. Learn to describe what it encourages before deciding whether you like how it looks.",
    "example": {
      "title": "The export button that dominates",
      "body": "Imagine an account page where exporting data is visually stronger than connecting a bank. For a new learner trying to see a balance, the prominence may send them toward an empty export. Test the task with someone unfamiliar with the page. Do not infer a conversion loss from a screenshot alone."
    },
    "prompt": "Review this screenshot for a user trying to [specific task]. Separate observations, hypotheses about intent and questions requiring a usability test. Identify prominence, defaults and friction. Give three findings with severity and an observable test. Do not invent user behaviour or declare the design bad because of visual taste.",
    "verify": [
      "Check the screenshot's actual state",
      " distinguish visible evidence from inferred intent",
      " test the highest-severity finding with a real task."
    ],
    "hint": "If the AI invents hidden screens, explicitly restrict it to visible evidence. Provide additional screenshots only after naming the missing state.",
    "practice": "Annotate one screen with three arrows and three sentences: what is emphasised, what costs effort and who might struggle.",
    "visual": {
      "kind": "comparison",
      "title": "Three kinds of critique",
      "nodes": [
        {
          "label": "Observation",
          "detail": "What is visible"
        },
        {
          "label": "Hypothesis",
          "detail": "What it encourages"
        },
        {
          "label": "Test",
          "detail": "What a user actually does"
        }
      ],
      "caption": "Three kinds of critique. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "Nielsen Norman Group: ten usability heuristics",
        "url": "https://www.nngroup.com/articles/ten-usability-heuristics/"
      }
    ]
  },
  "drawing-the-flow": {
    "teaching": [
      {
        "title": "Name states precisely",
        "body": "“Bank screen” is not a state. “No bank connected,” “connection pending” and “provider callback failed” are different conditions that may share one screen. Give each state an entry condition and the actions it permits. This exposes states that cannot be reached or escaped with the current design."
      },
      {
        "title": "Label transitions with evidence",
        "body": "For each arrow, write the trigger, the success condition and the event that would prove it happened. A click on Connect is an attempted transition, not proof of a connection. Distinguish the user's action from the provider's response and the persisted result so analytics does not count intent as success."
      },
      {
        "title": "Design the return path",
        "body": "Add timeout, retry, cancellation and returning-later paths. Ask whether retrying duplicates work, whether the person's input survives and where they land after reopening the product. A recoverable failure is part of the product experience; it should not exist only in an engineer's exception handler."
      }
    ],
    "intro": "A useful flow describes state transitions, including what happens when the expected action fails. It becomes a shared contract for design, engineering and analytics.",
    "example": {
      "title": "A callback arrives late",
      "body": "A user starts connecting a bank, closes the tab, and the provider later reports success. The next visit must read the saved connection state rather than restart from the first screen. Draw both the immediate path and the return path. Label which component owns the truth in each transition."
    },
    "prompt": "Convert my state list into a Mermaid state diagram. Preserve my state names. For each transition include trigger, success evidence and analytics event in a separate table. Ask about missing retry, timeout, cancellation and return paths. Do not equate a clicked button with a successful provider response. State list: [paste].",
    "verify": [
      "Walk every arrow using a concrete scenario",
      " ensure every failure has a recovery or explanation",
      " validate event semantics with engineering."
    ],
    "hint": "Render the generated diagram and trace it aloud. If the model cannot explain a transition without introducing a new state, add that state explicitly.",
    "practice": "Follow the late-callback scenario through your own flow and add the missing return path.",
    "visual": {
      "kind": "pipeline",
      "title": "A click is not a completed connection",
      "nodes": [
        {
          "label": "Intent",
          "detail": "Connect clicked"
        },
        {
          "label": "Pending",
          "detail": "Provider handoff"
        },
        {
          "label": "Result",
          "detail": "Callback received"
        },
        {
          "label": "Saved",
          "detail": "State persisted"
        }
      ],
      "caption": "A click is not a completed connection. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "Nielsen Norman Group: task scenarios for usability testing",
        "url": "https://www.nngroup.com/articles/task-scenarios-usability-testing/"
      }
    ],
    "lab": "flow",
    "article": {
      "number": 1,
      "title": "The flow I thought I understood",
      "brief": "Publish a 500–800 word project teardown. Show your original flow and a revised version with one recovery path. Explain a mistaken assumption, the evidence behind your revision, and what you would test next.",
      "artifact": "A readable before-and-after flow with captions explaining the changed state."
    }
  },
  "finding-the-drop": {
    "teaching": [
      {
        "title": "Keep the population consistent",
        "body": "Define who enters, the allowed time window and the order of events. A same-session funnel answers a different question from a seven-day funnel. If a step can be skipped, repeated or completed on another device, state how you count it before calculating any percentages."
      },
      {
        "title": "Separate step rate and total conversion",
        "body": "The step rate divides completers by the people who reached the previous step. Overall conversion divides final completers by entrants. In a simple sequential funnel the overall rate is the product of the step rates. Improving a late step cannot recover people who already left earlier; calculate the expected absolute gain as well as the local rate."
      },
      {
        "title": "Use the drop to choose the next investigation",
        "body": "Split the largest loss by provider, device or new-versus-returning users before redesigning a screen. A provider-specific failure suggests a different next move from a broad comprehension problem. Treat the split as a hypothesis check, and keep the original population definition attached to every chart."
      }
    ],
    "intro": "A funnel locates loss; it does not explain the cause. Read the arithmetic correctly before choosing an intervention.",
    "example": {
      "title": "One step improves",
      "body": "In a fictional four-step funnel, 1,000 entrants pass successive steps at 80%, 50%, 80% and 90%, leaving 288 completers. Raising only the second step to 60% yields about 346, not 100 extra users. Calculate the change, then explain what evidence would make that improvement plausible."
    },
    "prompt": "Audit this funnel table. Show entrants, step conversion, overall conversion and lost users with formulas. Flag missing denominators, inconsistent time windows and impossible increases. Calculate the result if only [named step] improves to [rate]. Do not invent a causal explanation for the drop. Data: [paste].",
    "verify": [
      "Recalculate one row manually",
      " verify the event order",
      " check whether the segment split changes your recommendation."
    ],
    "hint": "Ask for spreadsheet formulas with cell references and paste a tiny sample first. A plausible-looking chart is not evidence that the formula uses the correct denominator.",
    "practice": "Estimate the additional completed jobs from your proposed fix and write the assumption behind the expected rate change.",
    "visual": {
      "kind": "pipeline",
      "title": "Read the rates before the story",
      "nodes": [
        {
          "label": "Population",
          "detail": "Who enters?"
        },
        {
          "label": "Step rate",
          "detail": "Kept from prior step"
        },
        {
          "label": "Overall",
          "detail": "Kept from the start"
        },
        {
          "label": "Investigation",
          "detail": "What explains the loss?"
        }
      ],
      "caption": "Read the rates before the story. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: measuring success",
        "url": "https://www.gov.uk/service-manual/measuring-success"
      }
    ],
    "lab": "funnel"
  },
  "jobs-not-demographics": {
    "teaching": [
      {
        "title": "Reconstruct a moment",
        "body": "Choose one recent episode. Record the trigger, the environment, what the person tried, and what happened next. Someone reconciling invoices before a deadline has different constraints from the same person exploring software on a quiet afternoon. Describe that context before assigning a persona."
      },
      {
        "title": "Separate progress from a feature",
        "body": "“I need a dashboard” is a proposed solution. Ask what decision the dashboard enables and what happens without it. “Know which invoices need chasing before Friday” leaves room for an email, a list, or a service. This makes the job useful when comparing options instead of merely restating the feature request."
      },
      {
        "title": "Keep competing explanations",
        "body": "A workaround is evidence that someone acted, but not proof of why. Note the alternative explanations and ask a follow-up question that could distinguish them. Avoid converting a single vivid story into a universal need. Keep the original words beside your interpretation so a teammate can challenge the jump."
      }
    ],
    "intro": "A useful job statement helps you choose what to build. A demographic label rarely tells you what happened just before someone opened the product or what successful progress would look like.",
    "example": {
      "title": "A fictional invoice workflow",
      "body": "A freelancer says they want automatic reminders. Their last episode involved a client who had already paid under a different reference. The desired progress may be confidence about payment status, not more reminders. Your first experiment could therefore be a reconciliation checklist rather than an automated email sequence."
    },
    "prompt": "Using the anonymised episode below, extract trigger, desired progress, workaround, anxiety, and missing evidence. Cite a source sentence for each field. Propose two competing job statements and one neutral interview question that distinguishes them. Do not invent motivations or population sizes. Episode: [paste your notes].",
    "verify": [
      "Every motivation has a source or is marked a hypothesis",
      "The job does not prescribe a feature",
      "A recent event supports the statement"
    ],
    "hint": "If AI produces an elegant but vague sentence, ask which actual decision it would change. Rewrite it using the user's situation, a concrete action, and an observable result.",
    "practice": "Write two possible jobs for your project and explain which piece of evidence would make you choose one over the other.",
    "visual": {
      "kind": "comparison",
      "title": "From a person to a moment",
      "nodes": [
        {
          "label": "Trigger",
          "detail": "What changed?"
        },
        {
          "label": "Progress",
          "detail": "What must improve?"
        },
        {
          "label": "Evidence",
          "detail": "What actually happened?"
        }
      ],
      "caption": "From a person to a moment. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: using in-depth interviews",
        "url": "https://www.gov.uk/service-manual/user-research/using-in-depth-interviews"
      }
    ]
  },
  "talking-to-users": {
    "teaching": [
      {
        "title": "Prepare a learning question",
        "body": "Start with the decision you need to make, then list what you do not know. Recruit someone who recently attempted the relevant task. A friendly person who has never faced the situation can help rehearse questions, but cannot validate the problem. Ask permission before recording and remove identifying details from shared notes."
      },
      {
        "title": "Follow the sequence",
        "body": "Ask what happened last time, what they did next, what they used, and what the result cost them. Pause after an answer. A specific artifact such as a redacted spreadsheet often reveals more than a general opinion. Avoid introducing your solution until you understand the existing process and its constraints."
      },
      {
        "title": "Debrief without smoothing",
        "body": "Separate direct quotes, observed behavior, and your interpretation immediately after the session. Capture contradictions rather than resolving them through storytelling. “Would use” is a statement about a possible future; a paid workaround is a past action. Neither alone tells you how common the problem is."
      }
    ],
    "intro": "A good interview produces a reconstructable episode. Your job is to understand the participant's world before persuading them that your idea belongs in it.",
    "example": {
      "title": "Repair a leading question",
      "body": "“Would automatic reminders save you time?” invites agreement. In a fictional invoice project, ask: “Tell me about the last overdue invoice you followed up.” Then explore how they noticed it, chose the wording, checked payment, and decided to stop. You can test reminder concepts later with a concrete task."
    },
    "prompt": "Review this interview guide against my learning question: [question]. Flag leading, hypothetical, double-barrelled, and solution-revealing questions. Rewrite each as a question about a recent event. Return the original, the risk, and a replacement. Do not generate participant answers. Guide: [paste].",
    "verify": [
      "The guide asks about actual events",
      "The participant matches the task context",
      "Quotes and interpretations remain separate"
    ],
    "hint": "Use AI as a rehearsal partner to spot awkward phrasing, but label all simulated answers synthetic. Never add a simulated interview to your evidence count.",
    "practice": "Conduct one short interview or observe a consenting person doing the task. Write a five-line debrief and one thing you still cannot conclude.",
    "visual": {
      "kind": "pipeline",
      "title": "Follow one real episode",
      "nodes": [
        {
          "label": "Trigger",
          "detail": "Why that day?"
        },
        {
          "label": "Action",
          "detail": "Show the steps"
        },
        {
          "label": "Workaround",
          "detail": "What filled the gap?"
        },
        {
          "label": "Outcome",
          "detail": "What happened next?"
        }
      ],
      "caption": "Follow one real episode. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: using in-depth interviews",
        "url": "https://www.gov.uk/service-manual/user-research/using-in-depth-interviews"
      }
    ]
  },
  "segments-with-evidence": {
    "teaching": [
      {
        "title": "Define the split before the story",
        "body": "Pick an observable attribute: first-time versus returning, one account versus several, or individual versus team approval. Specify how a person enters each group and whether groups overlap. Do not name a group “power users” until you can explain exactly how that label is assigned."
      },
      {
        "title": "Compare comparable populations",
        "body": "Use the same observation window and outcome definition for both groups. Show counts alongside percentages. Five successes out of six and five hundred out of six hundred have the same rate but very different uncertainty. A tiny group can inspire a research question without justifying a broad rollout."
      },
      {
        "title": "Explain what changes",
        "body": "A segment should lead to a different interview sample, experience, or priority. If both groups need exactly the same fix, keep the simpler design. When differences appear, investigate acquisition source, tenure, and permissions before attributing everything to the segment label. Correlation is a clue for discovery, not a causal mechanism."
      }
    ],
    "intro": "Segmentation becomes useful when it changes a product decision. Build groups around a relevant difference in behavior or constraints, then check whether the available evidence supports the distinction.",
    "example": {
      "title": "An illustrative split",
      "body": "In a fictional sample, 8 of 10 multi-account users abandon a connection step, compared with 12 of 60 single-account users. That is worth investigating, but the first group may also use a different provider. Interview across both account count and provider before deciding to build a separate multi-account flow."
    },
    "prompt": "Given this anonymised table [paste], propose at most three behavior-based segments relevant to [decision]. Define membership and show numerator, denominator, time window, and missing values. List confounders and a disconfirming observation for each. Do not invent statistical significance or infer protected attributes.",
    "verify": [
      "Group membership is reproducible",
      "Rates include counts and windows",
      "The split changes a specific decision"
    ],
    "hint": "Ask AI to show the rows behind one aggregate, then reproduce the calculation manually. If the sample is small, use it to recruit follow-up interviews rather than to claim a market size.",
    "practice": "Create a two-group comparison for your project and identify one extra variable that might explain the apparent difference.",
    "visual": {
      "kind": "comparison",
      "title": "A segment must earn its name",
      "nodes": [
        {
          "label": "Membership",
          "detail": "Observable rule"
        },
        {
          "label": "Comparison",
          "detail": "Same outcome window"
        },
        {
          "label": "Decision",
          "detail": "Different next action"
        }
      ],
      "caption": "A segment must earn its name. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: analyse a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ]
  },
  "where-money-comes-from": {
    "teaching": [
      {
        "title": "Trace the transaction",
        "body": "Draw the payer, user, unit sold, price, and delivery cost. The user and payer may be different people. A team member can love a tool that procurement will not approve. Identify the buying decision and the usage decision separately before interpreting free activity as purchase intent."
      },
      {
        "title": "Name the revenue mechanism",
        "body": "A subscription, usage fee, transaction commission, and service contract each reward different behavior. Describe the actual charging rule for your chosen product using public pricing or a clearly labelled assumption. Revenue is not profit, and a prepaid annual contract is not the same thing as monthly cash arriving forever."
      },
      {
        "title": "Connect a feature to a mechanism",
        "body": "Spell out the chain from the feature to an observable behavior and then to a business outcome. Each arrow is an assumption to test. Better onboarding might improve activation, but revenue also depends on eligible users converting, price, and retention. Avoid multiplying several optimistic assumptions and presenting the result as a forecast."
      }
    ],
    "intro": "A product decision can create user value without creating revenue immediately. Understanding the business model helps you explain who pays, why they pay, and which behavior connects the two.",
    "example": {
      "title": "A fictional seat-based tool",
      "body": "A workspace pays $20 per active seat per month. Adding exports may help an administrator retain the workspace, but does not automatically add seats. Your case should distinguish retaining existing revenue from expanding paid usage, then choose evidence that could support one of those mechanisms."
    },
    "prompt": "Map the business model from these supplied pricing facts [paste]. Separate user, payer, billing unit, revenue mechanism, and major variable costs. Mark unknowns. For my feature [describe], write the shortest plausible chain to revenue and a way each link could fail. Do not invent customer economics.",
    "verify": [
      "Pricing facts have a dated source",
      "Revenue and contribution are distinct",
      "Every projected effect is labelled an assumption"
    ],
    "hint": "If AI cannot access the pricing page, paste the relevant public terms yourself. Ask it to calculate one customer example before discussing the entire market.",
    "practice": "Draw the money flow for your project and write a feature hypothesis that could improve user value without increasing revenue this quarter.",
    "visual": {
      "kind": "pipeline",
      "title": "Follow one transaction",
      "nodes": [
        {
          "label": "Payer",
          "detail": "Who approves?"
        },
        {
          "label": "Unit",
          "detail": "What is charged?"
        },
        {
          "label": "Revenue",
          "detail": "Price times units"
        },
        {
          "label": "Cost",
          "detail": "What serves them?"
        }
      ],
      "caption": "Follow one transaction. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: measuring success",
        "url": "https://www.gov.uk/service-manual/measuring-success"
      }
    ]
  },
  "unit-economics": {
    "teaching": [
      {
        "title": "Choose a consistent unit",
        "body": "Use one customer per month, one order, or one completed job. Keep revenue and variable costs on the same basis. Do not compare annual revenue with monthly support cost. Record what is excluded, especially fixed salaries and overhead, so contribution is not mistaken for company profit."
      },
      {
        "title": "Calculate before narrating",
        "body": "Contribution per unit is revenue minus the variable costs included in your model. A simple acquisition payback estimate divides acquisition cost by positive monthly contribution. It assumes that contribution continues and ignores timing complications; it is not a retention model. If contribution is zero or negative, this calculation does not produce a meaningful payback period."
      },
      {
        "title": "Test the fragile assumption",
        "body": "Change one input at a time and see which changes the decision. An AI feature may have variable inference costs that grow with usage. Include support, retries, and failure handling when those are material. A single average can hide a small group of very expensive users, so inspect a heavy-usage scenario too."
      }
    ],
    "intro": "Unit economics gives you a small, inspectable model of how serving one customer works. In this exercise the numbers are fictional; the aim is to make assumptions visible, not to value a business.",
    "example": {
      "title": "A fictional monthly model",
      "body": "A customer pays $30. Included variable costs total $12, leaving $18 contribution. At $90 acquisition cost the simple payback is five months, assuming the customer remains and contribution stays constant. If variable cost rises to $24, contribution becomes $6 and payback becomes fifteen months. The same price now supports a very different decision."
    },
    "prompt": "Create a transparent spreadsheet model with revenue $30/month, variable cost [value]/month, and acquisition cost $90. Show formulas, units, exclusions, and the zero/negative contribution case. Add a sensitivity table, not an invented forecast. Explain which input needs real evidence before a product decision.",
    "verify": [
      "All inputs use the same period",
      "Zero or negative contribution is handled",
      "Excluded costs and retention assumptions are stated"
    ],
    "hint": "Ask AI for formulas rather than a screenshot of a spreadsheet. Change an input yourself and verify that every dependent cell updates as expected.",
    "practice": "Build base, low-usage, and heavy-usage cases for your project. State the cost level at which the proposed feature needs a different price or usage limit.",
    "visual": {
      "kind": "document",
      "title": "A small model with visible assumptions",
      "nodes": [
        {
          "label": "Revenue",
          "detail": "Per customer per month"
        },
        {
          "label": "Variable cost",
          "detail": "Same unit and period"
        },
        {
          "label": "Contribution",
          "detail": "Revenue less cost"
        },
        {
          "label": "Payback",
          "detail": "CAC / contribution"
        }
      ],
      "caption": "A small model with visible assumptions. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: measuring success",
        "url": "https://www.gov.uk/service-manual/measuring-success"
      }
    ],
    "lab": "economics"
  },
  "what-your-company-optimises": {
    "teaching": [
      {
        "title": "Translate a goal into behavior",
        "body": "“Grow” is not enough to guide a choice. Ask which customer behavior needs to change, for which population, and by when. Distinguish a measurable outcome from a deliverable: launching a dashboard is work completed; helping more eligible users finish a valuable task is a change in behavior."
      },
      {
        "title": "Find the limiting step",
        "body": "Trace how your team's work could influence the outcome. If the current constraint is unreliable data import, polishing a report may not help users reach value. This is a hypothesis about the system, so write down what evidence would contradict it. Team ownership does not automatically mean team causality."
      },
      {
        "title": "Name the sacrifice",
        "body": "A strategy matters when it changes a choice. Write what the team will delay or decline while pursuing this outcome. Include a guardrail so a local win does not cause a larger loss. A shorter signup flow that creates more unusable accounts may improve one chart while damaging the actual experience."
      }
    ],
    "intro": "A team can agree that a feature is useful and still choose not to build it. Your proposal needs to explain which current outcome it supports and what it would displace.",
    "example": {
      "title": "A fictional quarterly choice",
      "body": "A team wants more new workspaces to send their first reconciled report within seven days. It can improve import recovery or add a dashboard theme. If failures prevent reports, recovery has a clearer path to the outcome. The theme may still matter later; the current decision needs a named constraint and evidence, not a verdict about design's value."
    },
    "prompt": "Here are the stated goals, evidence, and proposed work [paste]. Separate outcomes from outputs. Map each proposal to a behavior change and identify unsupported causal links. Suggest one guardrail and one item to defer. Ask for missing priorities instead of inventing leadership intent.",
    "verify": [
      "The outcome names a population and window",
      "The proposal addresses a plausible constraint",
      "The deferred work and guardrail are explicit"
    ],
    "hint": "When AI produces a generic strategy statement, require it to compare two actual backlog items and explain what new evidence would reverse its recommendation.",
    "practice": "Write a four-sentence recommendation: goal, constraint, proposed work, and what you will not do yet. Ask a peer to identify the weakest link.",
    "visual": {
      "kind": "pipeline",
      "title": "Make the goal actionable",
      "nodes": [
        {
          "label": "Outcome",
          "detail": "Whose behavior?"
        },
        {
          "label": "Constraint",
          "detail": "What blocks it?"
        },
        {
          "label": "Bet",
          "detail": "What will change?"
        },
        {
          "label": "Guardrail",
          "detail": "What must not worsen?"
        }
      ],
      "caption": "Make the goal actionable. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "Shape Up: set boundaries",
        "url": "https://basecamp.com/shapeup/1.2-chapter-03"
      }
    ]
  },
  "metric-and-counter": {
    "teaching": [
      {
        "title": "Write the measurement contract",
        "body": "Specify the event, eligible population, counting unit, time window, and exclusions. “Activation improved” is ambiguous until two people can independently calculate the same rate. Decide how duplicate events, test accounts, and incomplete observation windows are handled before looking at the result."
      },
      {
        "title": "Choose a counter that can catch harm",
        "body": "Pair the desired change with a plausible adverse effect. Faster support responses need a quality check; more notifications need a measure of unwanted interruption. A counter-metric is useful when it could change the launch decision, not merely decorate the dashboard. Explain what you would investigate or stop if it worsens."
      },
      {
        "title": "Keep a decision attached",
        "body": "Name the owner and review date. Separate normal variation, measurement errors, and product effects. Do not treat an arbitrary threshold as scientifically established. For a small project, a manual review of failures may be more useful than an impressive-looking statistical claim based on very few observations."
      }
    ],
    "intro": "A metric is a compact definition of what you are trying to change. Its counter-metric protects you from celebrating a result that makes the overall product worse.",
    "example": {
      "title": "An illustrative reminder feature",
      "body": "The main outcome is the share of eligible overdue invoices resolved within seven days. The counter is the share of sent reminders that recipients report as incorrect. Sending more reminders is an activity measure. The team should inspect incorrect reminders before scaling, even if resolution appears to rise."
    },
    "prompt": "Audit this metric definition [paste] for ambiguous population, numerator, denominator, window, deduplication, and exclusions. Propose a counter-metric tied to a concrete failure mode. Return a sample calculation using explicitly fictional rows and list decisions the metric cannot support.",
    "verify": [
      "Two people could reproduce the calculation",
      "The counter detects a plausible harm",
      "Thresholds are identified as proposed or established"
    ],
    "hint": "Ask AI to create an edge-case table: duplicate, late event, cancelled account, and missing timestamp. Decide the treatment yourself and add it to the definition.",
    "practice": "Write a metric contract and a counter-metric for your project. Have someone calculate both from five sample rows without additional explanation.",
    "visual": {
      "kind": "balance",
      "title": "A useful win has boundaries",
      "nodes": [
        {
          "label": "Outcome",
          "detail": "What improves?"
        },
        {
          "label": "Counter",
          "detail": "What could worsen?"
        },
        {
          "label": "Decision",
          "detail": "Review both together"
        }
      ],
      "caption": "A useful win has boundaries. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: measuring success",
        "url": "https://www.gov.uk/service-manual/measuring-success"
      }
    ]
  },
  "retention-is-the-number": {
    "teaching": [
      {
        "title": "Define the cohort",
        "body": "Group users by the same starting event and period. Compare them at the same age, not simply on the same calendar date. A cohort that started yesterday cannot yet have a week-four result. Keep incomplete cells empty rather than counting them as zero and creating a false decline."
      },
      {
        "title": "Choose what return means",
        "body": "An app open may be too weak for your product. Pick an action that represents renewed value, and state whether you count return in a particular interval or on-or-after it. Those definitions answer different questions. A monthly invoicing tool should not be judged by an unexplained daily habit benchmark."
      },
      {
        "title": "Investigate the shape",
        "body": "An early fall can suggest an activation problem; continued loss can suggest weak repeated value. These are hypotheses, not diagnoses from a line. Compare cohorts and interview people who returned and who did not. A flat-looking tail based on a tiny remaining group needs counts and longer observation before a broad claim."
      }
    ],
    "intro": "Retention asks whether a defined group returns to do a meaningful action after a starting event. A curve becomes interpretable only after you specify those events and the product's natural usage rhythm.",
    "example": {
      "title": "An illustrative cohort",
      "body": "Of 100 workspaces that completed a first report, 40 complete another in week one and 30 in week four. Week-four interval retention is 30% of the original cohort, not 75% of week-one returners. A newer cohort with only two weeks of observation has no week-four value yet. Your chart should communicate that absence honestly."
    },
    "prompt": "Given these anonymised events [paste], define a starting event, meaningful return event, interval, and cohort. Show the cohort-age table with counts and mark unobserved periods as unavailable. Explain interval versus on-or-after retention. Do not infer causality or invent industry benchmarks.",
    "verify": [
      "The denominator stays the original cohort",
      "Unobserved periods are not zero",
      "The return action reflects the product's usage rhythm"
    ],
    "hint": "Ask AI to show one user's inclusion across the table. Manually trace that user before trusting the aggregate. Export the table alongside the chart so the definition remains inspectable.",
    "practice": "Build a small cohort table for your project, label any synthetic data, and write two competing explanations for the curve plus a follow-up interview question.",
    "visual": {
      "kind": "pipeline",
      "title": "Read a cohort at the same age",
      "nodes": [
        {
          "label": "Start",
          "detail": "One qualifying event"
        },
        {
          "label": "Return",
          "detail": "A meaningful action"
        },
        {
          "label": "Age",
          "detail": "Equal elapsed time"
        },
        {
          "label": "Interpret",
          "detail": "Counts plus context"
        }
      ],
      "caption": "Read a cohort at the same age. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "Amplitude: build a retention analysis",
        "url": "https://amplitude.com/docs/analytics/charts/retention-analysis/retention-analysis-build"
      }
    ],
    "lab": "retention",
    "article": {
      "number": 2,
      "title": "What my retention chart can and cannot tell me",
      "brief": "Publish a 500–800 word project analysis. Define the starting event, return action, cohort, and interval. Include counts, explain one competing interpretation, and propose a next check. If you used synthetic events, say so beside the chart and do not present them as customer results.",
      "artifact": "A cohort table and chart with a clear denominator and unobserved periods marked."
    }
  },
  "instrumenting-a-question": {
    "teaching": [
      {
        "title": "Work backwards from the decision",
        "body": "Write the decision and the comparison you need. “Why does connection fail?” may require a start event, a confirmed result, provider, and a non-sensitive error category. It does not require storing every click or raw customer content. A tracking plan should explain why each property exists."
      },
      {
        "title": "Define when events fire",
        "body": "Distinguish intent from confirmed outcome. A button click says the user tried; a server-confirmed success says the operation completed. Assign ownership, a schema, and an identifier that can deduplicate retries. Document how client and server events relate so the same action does not appear twice in a funnel."
      },
      {
        "title": "Test the awkward paths",
        "body": "Exercise success, failure, retry, refresh, and delayed response. Inspect actual payloads in a development environment and compare them with the specification. Check missing properties and time handling. An event name that looks right in a dashboard can still be emitted at the wrong moment."
      }
    ],
    "intro": "Instrumentation should make a decision answerable. Start with the question, then capture the smallest reliable set of events and properties needed to answer it.",
    "example": {
      "title": "A fictional connection flow",
      "body": "The plan records connection_started with an attempt ID and connection_finished with the same ID plus outcome. A retry uses a new attempt ID. A repeated delivery of the same success event is deduplicated. Counting “clicked connect” as completed would hide the exact failure the team wants to understand."
    },
    "prompt": "Turn this decision question and flow [paste] into a minimal tracking plan. Include event name, firing condition, source, required properties, deduplication key, and owner. Add acceptance tests for retry, duplicate delivery, and late success. Exclude personal content and mark unknown implementation details.",
    "verify": [
      "Success reflects confirmed completion",
      "Retries and duplicate delivery differ",
      "Every property answers a stated question"
    ],
    "hint": "Ask AI to generate sample payloads and test assertions, then have the implementing engineer review the firing conditions. Plausible JSON alone does not prove the system records the right event.",
    "practice": "Write a tracking plan for one project question and manually walk through five edge cases, showing the expected event sequence for each.",
    "visual": {
      "kind": "schema",
      "title": "A question becomes a contract",
      "nodes": [
        {
          "label": "Question",
          "detail": "Decision to support"
        },
        {
          "label": "Event",
          "detail": "Confirmed occurrence"
        },
        {
          "label": "Property",
          "detail": "Needed context"
        }
      ],
      "caption": "A question becomes a contract. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: measuring success",
        "url": "https://www.gov.uk/service-manual/measuring-success"
      }
    ]
  },
  "extraction-not-summary": {
    "teaching": [
      {
        "title": "Define a row before prompting",
        "body": "Choose the unit: one interview episode, support ticket, or distinct observation. Give each source a stable ID and define the fields you need. A theme is an interpretation; a direct quote is source material. Store them in separate columns so a reviewer can tell which is which."
      },
      {
        "title": "Make absence representable",
        "body": "Include an unknown value when evidence does not support a field. Require exact source snippets and allow multiple interpretations. A forced category for every row makes missing information look like knowledge. Do not ask a model to estimate how many users share a problem from a handful of selected quotes."
      },
      {
        "title": "Audit the transformation",
        "body": "Manually inspect a sample and every row used for a consequential claim. Count distinct source units, not mentions, if one person repeats the same issue. Record how the sample was collected. A reliable extraction from a biased sample still cannot establish population prevalence."
      }
    ],
    "intro": "AI can turn messy material into a useful table, but a fluent summary can quietly merge people, erase disagreement, or invent a frequency. Extraction keeps the source visible.",
    "example": {
      "title": "A fictional three-ticket sample",
      "body": "Ticket A says “I retried because nothing changed.” Ticket B says “The success email arrived after I closed the page.” Ticket C asks for a darker theme. A useful extraction preserves all three and links the first two to a possible feedback-delay theme. It does not claim that two-thirds of all users experience the problem."
    },
    "prompt": "Extract one row per source ID from the material below. Columns: source ID, exact quote, observed action, inferred theme, uncertainty, and follow-up question. Use unknown for absent evidence. Do not merge sources, rewrite quotes, or estimate population prevalence. After the table, identify claims needing manual verification. Sources: [paste anonymised material].",
    "verify": [
      "Quoted text matches the source exactly",
      "Counts use distinct source units",
      "Themes and facts occupy separate fields"
    ],
    "hint": "Ask AI to return a machine-readable table, then compare a few rows against the source yourself. If it invents a field, revise the schema to explicitly permit unknown and rerun the audit.",
    "practice": "Extract five observations into a source-linked table. Write one supported claim, one tempting unsupported claim, and the difference between them.",
    "visual": {
      "kind": "pipeline",
      "title": "Keep the chain inspectable",
      "nodes": [
        {
          "label": "Source",
          "detail": "Stable ID"
        },
        {
          "label": "Extraction",
          "detail": "Exact evidence"
        },
        {
          "label": "Theme",
          "detail": "Your interpretation"
        },
        {
          "label": "Claim",
          "detail": "Bounded conclusion"
        }
      ],
      "caption": "Keep the chain inspectable. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: analyse a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ],
    "lab": "extraction"
  },
  "sizing-without-a-data-team": {
    "teaching": [
      {
        "title": "Build a small equation",
        "body": "Break the opportunity into eligible people, frequency, and effect per event. State the period and the definition of eligibility. Avoid adding overlapping groups without deduplication. A bottom-up model tied to your product is often easier to inspect than an impressive total addressable market number unrelated to this decision."
      },
      {
        "title": "Use ranges honestly",
        "body": "Give uncertain inputs a low, base, and high assumption with a reason. Do not call these confidence intervals unless you actually calculated them using a suitable method. Change one input to see what dominates the result. That tells you which missing fact is worth researching before spending more time on the model."
      },
      {
        "title": "Connect size to a choice",
        "body": "An opportunity estimate does not prove your solution will capture the opportunity. Separate the affected population from adoption and from the expected improvement. Ask whether a conservative case would still justify a small investigation. If only the most optimistic case works, the next action should resolve the fragile assumption."
      }
    ],
    "intro": "A rough estimate is useful when it exposes the inputs that matter. It becomes dangerous when a precise-looking total hides guesses, overlapping populations, or incompatible units.",
    "example": {
      "title": "An illustrative time-saving estimate",
      "body": "Suppose 200 eligible users do a task twice a month and a proposed change could save three minutes each time. Full adoption would imply 1,200 minutes per month. At 25% adoption, the estimate is 300 minutes. Neither figure is an observed saving; both depend on the task frequency and effect assumptions being true."
    },
    "prompt": "Build a bottom-up sizing model for [project] using only these supplied inputs [paste]. Show units, formula, low/base/high assumptions, overlap risks, and adoption separately. Do not invent market data. Identify the single input whose verification would most improve the decision.",
    "verify": [
      "Units cancel correctly",
      "Adoption is separate from eligibility",
      "Ranges are assumptions rather than claimed certainty"
    ],
    "hint": "Ask AI to calculate a one-user, one-event example first. Scaling a wrong unit conversion across a large population only makes the wrong answer more persuasive.",
    "practice": "Create a three-scenario model and write the cheapest way to replace its most consequential guess with evidence.",
    "visual": {
      "kind": "pipeline",
      "title": "Size the reachable change",
      "nodes": [
        {
          "label": "Eligible",
          "detail": "Who faces the task?"
        },
        {
          "label": "Frequency",
          "detail": "How often?"
        },
        {
          "label": "Adoption",
          "detail": "Who uses the fix?"
        },
        {
          "label": "Effect",
          "detail": "Change per event"
        }
      ],
      "caption": "Size the reachable change. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: measuring success",
        "url": "https://www.gov.uk/service-manual/measuring-success"
      }
    ]
  },
  "prioritising-honestly": {
    "teaching": [
      {
        "title": "Choose comparable inputs",
        "body": "For a RICE exercise, use reach over the same period, a shared impact scale, confidence as a fraction, and effort in the same unit. Define each scale before scoring. If one proposal uses annual reach and another monthly reach, the ranking is an artifact of the spreadsheet rather than a meaningful comparison."
      },
      {
        "title": "Attach evidence to confidence",
        "body": "Confidence should reflect the support behind reach and impact, not how much someone likes the idea. Record the source and date next to each estimate. Keep dependencies, mandatory work, and strategic constraints visible outside the score; not every decision belongs in the same ranking exercise."
      },
      {
        "title": "Test ranking stability",
        "body": "Vary uncertain inputs and see whether the order changes. If two options swap after a small adjustment, treat them as close and discuss evidence or a smaller test. The next best action may be research that improves confidence rather than immediate delivery of the current highest-scoring feature."
      }
    ],
    "intro": "A prioritisation score helps a team discuss assumptions consistently. It does not remove judgment or make a weak estimate objective by giving it decimal places.",
    "example": {
      "title": "A fictional RICE comparison",
      "body": "Option A reaches 100 users, has impact 2, confidence 50%, and effort 2 person-months: its score is 50. Option B reaches 80, has impact 1, confidence 80%, and effort 1: its score is 64. A wins only if its confidence rises above 64% with the other assumptions fixed. This is a reason to inspect evidence, not to adjust the score until A wins."
    },
    "prompt": "Audit this prioritisation table [paste]. Check periods, scales, confidence fractions, effort units, dependencies, and source quality. Recalculate each score transparently and show which plausible input changes reverse the ranking. Do not choose confidence values just to support my preferred idea.",
    "verify": [
      "All proposals use consistent units",
      "Confidence has an evidence rationale",
      "Dependencies and close rankings remain visible"
    ],
    "hint": "Ask AI to argue for the lower-ranked option using only supplied facts. This can expose a missing constraint, but it cannot manufacture evidence for that option.",
    "practice": "Rank two project options, vary the least certain input, and write the evidence threshold that would change your recommendation.",
    "visual": {
      "kind": "document",
      "title": "Make the score auditable",
      "nodes": [
        {
          "label": "Reach",
          "detail": "Same period"
        },
        {
          "label": "Impact",
          "detail": "Shared scale"
        },
        {
          "label": "Confidence",
          "detail": "Evidence quality"
        },
        {
          "label": "Effort",
          "detail": "Same work unit"
        }
      ],
      "caption": "Make the score auditable. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "Intercom: the RICE prioritisation framework",
        "url": "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/"
      }
    ],
    "lab": "rice"
  },
  "the-one-pager": {
    "teaching": [
      {
        "title": "Start with the decision",
        "body": "Put the recommendation and the decision needed near the top. Name the affected user and situation, then show the evidence that makes the problem worth addressing. Separate observed facts from assumptions. A long introduction about the market can distract from the specific choice your team needs to make this week."
      },
      {
        "title": "Show the alternative",
        "body": "Explain the smallest credible alternative, including doing nothing for now. Compare the trade-off using the same outcome and constraints. This makes the proposal reviewable and prevents it from becoming a sales pitch for the first idea. A good reviewer can disagree with your recommendation while still understanding your reasoning."
      },
      {
        "title": "Make the request executable",
        "body": "End with owner, scope, success measure, guardrail, and review date. State what remains unknown and how the next step reduces that uncertainty. A request for a one-day investigation is different from a request for a six-week build. The document should make that commitment unmistakable."
      }
    ],
    "intro": "A one-pager is a decision document. A reader should understand the problem, the evidence, the proposed bet, and the request without needing you to narrate the missing connections.",
    "example": {
      "title": "A fictional recommendation",
      "body": "“Approve one day to inspect delayed connection responses” is a smaller request than “rebuild onboarding.” The evidence might be two source-linked reports and a reproducible pending state. The alternative is to wait for broader data. The one-pager should explain why a bounded investigation is worthwhile while acknowledging that the sample cannot establish prevalence."
    },
    "prompt": "Review this one-pager as a busy decision owner [paste]. Identify the decision requested, evidence, assumptions, alternative, scope, owner, success measure, and review date. Mark absent fields. Suggest cuts and unresolved questions without inventing facts or silently rewriting the recommendation.",
    "verify": [
      "The opening names an actual decision",
      "Evidence and assumptions differ visibly",
      "The final request includes owner and timing"
    ],
    "hint": "Ask AI to summarise the decision in one sentence before editing. If that sentence is wrong, repair the document's structure rather than polishing its wording.",
    "practice": "Give your one-pager to a peer for two minutes. Ask them to repeat the request, strongest evidence, and biggest uncertainty without looking back.",
    "visual": {
      "kind": "document",
      "title": "A page that supports a choice",
      "nodes": [
        {
          "label": "Problem",
          "detail": "User and situation"
        },
        {
          "label": "Evidence",
          "detail": "Facts plus uncertainty"
        },
        {
          "label": "Proposal",
          "detail": "Smallest useful bet"
        },
        {
          "label": "Ask",
          "detail": "Owner and review date"
        }
      ],
      "caption": "A page that supports a choice. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "Shape Up: set boundaries",
        "url": "https://basecamp.com/shapeup/1.2-chapter-03"
      }
    ]
  },
  "scope-cuts": {
    "teaching": [
      {
        "title": "Find the complete slice",
        "body": "Describe one user completing one valuable job. Keep the path from entry to confirmed outcome intact, including the most important recovery states. A narrow working slice teaches you more than several polished screens with no completion path. Write explicit exclusions so the team can recognise new work when it appears."
      },
      {
        "title": "Trade breadth before reliability",
        "body": "Consider fewer account types, one supported import format, or manual operations behind the scenes. Do not automatically remove error messages, accessibility, or safe retry behavior to meet a date. Those may be necessary for the selected slice to work at all. Discuss the real delivery cost with the people implementing it."
      },
      {
        "title": "Give deferred work a reason",
        "body": "Record what you cut, why the current slice still creates value, and what evidence would justify revisiting it. “Later” without a condition becomes a second backlog no one understands. If a cut undermines the target outcome, reduce the ambition or change the deadline rather than hiding the gap."
      }
    ],
    "intro": "Scope is the set of behaviors you commit to deliver, including failure handling. Cutting scope should preserve the smallest useful end-to-end outcome rather than leave half of every feature unfinished.",
    "example": {
      "title": "A fictional import release",
      "body": "The team supports one CSV format and a downloadable error report instead of five integrations and an inline correction editor. Users can still import valid rows and understand rejected ones. Supporting only success with a generic failure screen would be a smaller implementation, but it would not reliably complete the chosen job."
    },
    "prompt": "Given this outcome, deadline, and feature list [paste], propose a complete thin slice. Separate essential user behavior, safe failure handling, optional breadth, and deferred work. Explain what value survives each cut. Do not assume engineering estimates or remove accessibility and recovery without discussion.",
    "verify": [
      "One valuable job remains complete",
      "Exclusions are explicit",
      "Deferred items have a revisit condition"
    ],
    "hint": "Ask AI to walk through the proposed slice as a user who hits an error halfway through. If the user cannot recover or understand what happened, the cut needs another pass.",
    "practice": "Cut your proposal by a third using clearly stated assumptions about effort, then draw the surviving end-to-end path and its main recovery state.",
    "visual": {
      "kind": "comparison",
      "title": "Cut breadth, keep the job whole",
      "nodes": [
        {
          "label": "Keep",
          "detail": "Complete useful outcome"
        },
        {
          "label": "Defer",
          "detail": "Additional breadth"
        },
        {
          "label": "Protect",
          "detail": "Recovery and clarity"
        }
      ],
      "caption": "Cut breadth, keep the job whole. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "Shape Up: set boundaries",
        "url": "https://basecamp.com/shapeup/1.2-chapter-03"
      }
    ]
  },
  "the-states-you-forgot": {
    "teaching": [
      {
        "title": "List state families",
        "body": "For each important object, consider initial, loading, empty, success, partial success, error, and unavailable states. Do not add all of them mechanically; explain which can actually occur in your flow. Distinguish no data yet from no results after filtering, because the useful next action differs."
      },
      {
        "title": "Connect the user and system views",
        "body": "Specify what the system knows, what the user sees, and what action is safe. A timeout may mean the client does not know the outcome, not that the operation failed. Confirming status before retrying can prevent duplicate work. Ask engineering which outcomes can be verified and which remain uncertain."
      },
      {
        "title": "Write recovery as behavior",
        "body": "An error message needs a next step when one is possible. Explain whether entered data remains, whether a retry is safe, and how a user can leave and return. Test keyboard focus and status announcements as part of the interaction, not just the visual layout. Decorative animation should never be the only indication of state."
      }
    ],
    "intro": "A product is a collection of states and transitions, not just a happy-path screenshot. The user needs to understand what is happening when the system is empty, slow, partially successful, or unavailable.",
    "example": {
      "title": "A fictional delayed import",
      "body": "An import request times out, but the server continues processing. Showing “failed, try again” can create a duplicate import. A better specified state says the result is still being checked, preserves the attempt ID, and offers a status refresh. The exact behavior depends on the backend contract and must be confirmed with engineering."
    },
    "prompt": "Audit this flow and API behavior [paste]. Create a table of system state, user message, available action, data preservation, and accessibility behavior. Include timeout with unknown outcome, partial success, retry, and return visits where applicable. Mark backend assumptions for engineer review.",
    "verify": [
      "Unknown outcome differs from confirmed failure",
      "Recovery preserves necessary user work",
      "State is understandable without animation or color"
    ],
    "hint": "Ask AI to generate acceptance scenarios in Given/When/Then form. Run through them against the prototype and implementation contract rather than assuming generated tests describe real capabilities.",
    "practice": "Add five missing-state specifications to your project, including at least one ambiguous outcome and one accessible recovery path.",
    "visual": {
      "kind": "branch",
      "title": "A timeout is not always failure",
      "nodes": [
        {
          "label": "Request",
          "detail": "Attempt begins"
        },
        {
          "label": "Unknown",
          "detail": "Check the status"
        },
        {
          "label": "Confirmed",
          "detail": "Show the outcome"
        },
        {
          "label": "Recover",
          "detail": "Safe next action"
        }
      ],
      "caption": "A timeout is not always failure. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "Nielsen Norman Group: ten usability heuristics",
        "url": "https://www.nngroup.com/articles/ten-usability-heuristics/"
      }
    ]
  },
  "the-hard-questions": {
    "teaching": [
      {
        "title": "Prepare the evidence trail",
        "body": "For each major claim, keep a source, an assumption label, and a limitation. Reviewers may ask how often a problem occurs, why this segment matters, or what happens if the estimate is wrong. You do not need an answer to every question; you need to avoid confusing a guess with a fact."
      },
      {
        "title": "Answer the actual objection",
        "body": "Listen for whether the concern is about evidence, feasibility, scope, or priority. Restate it briefly before responding. A question about operational cost is not answered by repeating user enthusiasm. If the question changes the decision, update the proposal rather than defending the original wording at all costs."
      },
      {
        "title": "Turn uncertainty into a plan",
        "body": "Name the smallest check, an owner, and a date. Explain which possible result would change your recommendation. This prevents “we will investigate” from becoming an indefinite delay. Record open questions after the meeting and distinguish blockers from details that can be resolved during implementation."
      }
    ],
    "intro": "Review questions are a chance to locate the weak parts of your recommendation before committing resources. A strong answer can be “we do not know yet” when it is followed by a useful next step.",
    "example": {
      "title": "A fictional review exchange",
      "body": "A reviewer asks whether delayed responses affect most users. With two reports, the honest answer is no population estimate yet. You can propose inspecting a week of eligible attempts and comparing provider-specific outcomes. That check might justify a broader fix, a narrower provider workaround, or no build at all."
    },
    "prompt": "Challenge this proposal [paste] using only supplied facts. Ask six questions across evidence, feasibility, economics, scope, and measurement. For each, identify what a supported answer would require. After I answer, flag overclaims and missing evidence. Do not invent hostile stakeholder personalities or new research findings.",
    "verify": [
      "Answers address the stated concern",
      "Unknowns remain explicitly unknown",
      "Follow-up checks could change the decision"
    ],
    "hint": "Practise a thirty-second answer with AI, then ask it to remove every unsupported assertion. Keep the source table open while rehearsing so fluency does not replace evidence.",
    "practice": "Record answers to three difficult questions about your project. Rewrite the answer that relies most heavily on confidence rather than support.",
    "visual": {
      "kind": "pipeline",
      "title": "Make a hard question useful",
      "nodes": [
        {
          "label": "Concern",
          "detail": "What is at risk?"
        },
        {
          "label": "Evidence",
          "detail": "What do we know?"
        },
        {
          "label": "Unknown",
          "detail": "What is missing?"
        },
        {
          "label": "Check",
          "detail": "Owner and date"
        }
      ],
      "caption": "Make a hard question useful. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: analyse a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ]
  },
  "disagree-and-commit": {
    "teaching": [
      {
        "title": "Locate the disagreement",
        "body": "Separate differences about facts, predictions, priorities, and decision authority. Two people can share the same facts and value the trade-offs differently. Write each position fairly enough that its owner recognises it. Do not use a meeting summary to erase an objection or imply consent that was never given."
      },
      {
        "title": "Close the decision explicitly",
        "body": "Name who has authority to decide, what was chosen, and what remains open. Record the strongest alternative and the reason it was not selected. Commitment means carrying out the agreed plan within its boundaries; it does not mean concealing new evidence or ignoring a serious unresolved risk."
      },
      {
        "title": "Set a reopening trigger",
        "body": "Choose a review date and concrete conditions for revisiting the choice. A dependency failing or a guardrail worsening can justify a new discussion. Without a trigger, the team may relitigate the choice daily or continue long after its assumptions fail. Make the trigger specific enough to recognise in practice."
      }
    ],
    "intro": "A team can make a clear decision without pretending everyone agrees. The goal is to preserve the reasoning and remaining risks while allowing coordinated work to begin.",
    "example": {
      "title": "A fictional scope decision",
      "body": "Design prefers inline correction; engineering recommends an error report for the first import release. The owner chooses the report to preserve the delivery window, records the usability concern, and schedules observation of three task attempts. Repeated inability to recover becomes a reason to revisit the choice, not evidence that someone failed to commit."
    },
    "prompt": "Convert these anonymised meeting notes [paste] into a decision record. Separate agreed facts, competing positions, chosen option, decision owner, unresolved risks, actions, and reopening triggers. Mark ambiguous agreement as unconfirmed. Do not assign consent or authority that the notes do not establish.",
    "verify": [
      "Dissent is represented accurately",
      "The decision owner is confirmed",
      "A meaningful reopening trigger is recorded"
    ],
    "hint": "Ask each participant to review the line attributed to them. AI can organise notes, but only the people involved can confirm that the record represents their position.",
    "practice": "Write a decision record for one project trade-off and have a peer argue that the reopening trigger is either too vague or too sensitive.",
    "visual": {
      "kind": "document",
      "title": "Commit with a memory",
      "nodes": [
        {
          "label": "Choice",
          "detail": "Owner and date"
        },
        {
          "label": "Alternative",
          "detail": "Why not now?"
        },
        {
          "label": "Risk",
          "detail": "Still unresolved"
        },
        {
          "label": "Reopen",
          "detail": "A concrete trigger"
        }
      ],
      "caption": "Commit with a memory. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "Shape Up: set boundaries",
        "url": "https://basecamp.com/shapeup/1.2-chapter-03"
      }
    ]
  },
  "deliver-the-memo": {
    "teaching": [
      {
        "title": "Build the evidence spine",
        "body": "Select the artifacts that support the recommendation: a source-linked observation, a flow, a measurement definition, and a bounded estimate. Show the chain between them. Remove impressive material that does not affect the decision. Clearly label synthetic data and untested hypotheses so the reader can judge the work on its actual merits."
      },
      {
        "title": "Make the commitment bounded",
        "body": "State the user problem, smallest proposed change, scope exclusions, owner, and review plan. Include the strongest alternative and a reason to reverse the recommendation. A capstone can demonstrate good judgment without claiming a shipped result. Explain whether you researched, prototyped, tested, or launched, using those words accurately."
      },
      {
        "title": "Invite a useful review",
        "body": "Ask the reviewer to identify an unsupported claim, a missing state, and a weak measurement assumption. Use that feedback to revise the memo, then keep a short change log. Reflect on one way AI accelerated your process and one output you rejected after checking it. Your judgment is part of the artifact."
      }
    ],
    "intro": "Your final memo should let another person inspect how you reached a decision. It is the connecting thread across the work, not a scrapbook of every exercise you completed.",
    "example": {
      "title": "A fictional capstone conclusion",
      "body": "“Investigate delayed connection feedback before expanding onboarding” can be a defensible conclusion when the evidence is narrow. The memo includes the observed states, competing explanations, proposed event checks, and a one-day investigation request. It does not pretend the team shipped a fix or achieved a conversion lift that was never measured."
    },
    "prompt": "Review my capstone and linked artifact excerpts [paste] against this rubric: clear decision, traceable evidence, honest uncertainty, complete scope, measurable outcome, and credible review plan. Cite the exact passage behind each finding. Flag invented results and unsupported claims. Suggest the three highest-value revisions; do not rewrite the work as if you performed it.",
    "verify": [
      "Every result is observed or labelled hypothetical",
      "Artifacts support the recommendation",
      "AI assistance and human verification are disclosed"
    ],
    "hint": "Ask AI to trace one claim all the way back to its source. If the chain breaks, weaken the claim or collect evidence before improving the prose.",
    "practice": "Run a final review, revise the memo, and write a short change log explaining what feedback changed your decision and what did not.",
    "visual": {
      "kind": "pipeline",
      "title": "Turn practice into a case",
      "nodes": [
        {
          "label": "Evidence",
          "detail": "What you found"
        },
        {
          "label": "Decision",
          "detail": "What you recommend"
        },
        {
          "label": "Artifact",
          "detail": "What makes it inspectable"
        },
        {
          "label": "Reflection",
          "detail": "What changed your mind?"
        }
      ],
      "caption": "Turn practice into a case. Apply this sequence to your own project; it is a conceptual guide, not measured data."
    },
    "reading": [
      {
        "label": "GOV.UK: analyse a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ],
    "article": {
      "number": 3,
      "title": "From a product problem to a defensible decision",
      "brief": "Publish a 700–1,000 word project case study. Link your Friday memo, show the strongest evidence, compare the option you chose with one you rejected, and explain what feedback changed your mind. State what you actually researched or built and what has not been tested.",
      "artifact": "Your final memo plus two supporting artifacts and a short revision log."
    }
  }
};
