export type LessonVisual = { kind: "timeline" | "conversation" | "comparison" | "tree" | "balance" | "pipeline" | "document" | "cycle" | "matrix" | "cohort" | "type" | "spacing" | "bars" | "branch" | "schema"; title: string; nodes: { label: string; detail: string }[]; caption: string };

export const lessonVisuals: Record<string, LessonVisual> = {
  "01/the-decision-meeting": {
    "kind": "timeline",
    "title": "A meeting that ends in a decision",
    "nodes": [
      {
        "label": "Before",
        "detail": "Name the decision"
      },
      {
        "label": "First 10 min",
        "detail": "Read the evidence"
      },
      {
        "label": "Next 15 min",
        "detail": "Resolve trade-offs"
      },
      {
        "label": "Last 5 min",
        "detail": "Owner and date"
      }
    ],
    "caption": "The meeting produces a named decision, not another meeting."
  },
  "01/talking-to-users": {
    "kind": "conversation",
    "title": "Ask about last Tuesday",
    "nodes": [
      {
        "label": "Situation",
        "detail": "When did it happen?"
      },
      {
        "label": "Action",
        "detail": "What did you do?"
      },
      {
        "label": "Cost",
        "detail": "What did that cost?"
      }
    ],
    "caption": "Follow one real event from trigger to workaround before proposing a solution."
  },
  "01/segments-with-evidence": {
    "kind": "comparison",
    "title": "Split by behaviour",
    "nodes": [
      {
        "label": "Group A",
        "detail": "Completes the job"
      },
      {
        "label": "Group B",
        "detail": "Abandons midway"
      },
      {
        "label": "Check",
        "detail": "Different constraints?"
      }
    ],
    "caption": "A segment earns its label when behaviour changes the product decision."
  },
  "01/where-money-comes-from": {
    "kind": "tree",
    "title": "Trace the money",
    "nodes": [
      {
        "label": "Customer",
        "detail": "Who pays?"
      },
      {
        "label": "Unit",
        "detail": "Seat, usage or sale?"
      },
      {
        "label": "Revenue",
        "detail": "What do they pay?"
      },
      {
        "label": "Cost",
        "detail": "What serves them?"
      }
    ],
    "caption": "Separate the buyer, the billing unit and the cost of one more user."
  },
  "01/unit-economics": {
    "kind": "balance",
    "title": "The customer must repay their cost",
    "nodes": [
      {
        "label": "Revenue",
        "detail": "ARPU × paid months"
      },
      {
        "label": "Service",
        "detail": "COGS × active months"
      },
      {
        "label": "Acquisition",
        "detail": "CAC paid up front"
      }
    ],
    "caption": "Contribution over the relationship must cover acquisition before the customer leaves."
  },
  "01/what-your-company-optimises": {
    "kind": "tree",
    "title": "A goal has three different jobs",
    "nodes": [
      {
        "label": "North star",
        "detail": "Lasting user value"
      },
      {
        "label": "Quarterly OKR",
        "detail": "Change this quarter"
      },
      {
        "label": "Health metric",
        "detail": "Protect this baseline"
      }
    ],
    "caption": "An OKR moves the product toward the north star while the guardrail limits harm."
  },
  "01/metric-and-counter": {
    "kind": "balance",
    "title": "The number and its guardrail",
    "nodes": [
      {
        "label": "Primary",
        "detail": "Faster completion"
      },
      {
        "label": "Counter",
        "detail": "Error rate"
      },
      {
        "label": "Exploit",
        "detail": "Skipping checks"
      }
    ],
    "caption": "Improving speed is only a win if the paired quality measure stays healthy."
  },
  "01/instrumenting-a-question": {
    "kind": "pipeline",
    "title": "From question to an event",
    "nodes": [
      {
        "label": "Question",
        "detail": "Did they connect?"
      },
      {
        "label": "Event",
        "detail": "bank_connected"
      },
      {
        "label": "Property",
        "detail": "Connection method"
      },
      {
        "label": "Decision",
        "detail": "Fix failed methods"
      }
    ],
    "caption": "Keep an event only when you can name the question it will answer."
  },
  "01/sizing-without-a-data-team": {
    "kind": "pipeline",
    "title": "Make the estimate inspectable",
    "nodes": [
      {
        "label": "Population",
        "detail": "Eligible users"
      },
      {
        "label": "Frequency",
        "detail": "Jobs per month"
      },
      {
        "label": "Value",
        "detail": "Value per job"
      },
      {
        "label": "Range",
        "detail": "Low / mid / high"
      }
    ],
    "caption": "Multiply visible assumptions, then vary the one that most changes the decision."
  },
  "01/scope-cuts": {
    "kind": "document",
    "title": "Design inside the appetite",
    "nodes": [
      {
        "label": "Appetite",
        "detail": "Time worth spending"
      },
      {
        "label": "Must work",
        "detail": "The one core job"
      },
      {
        "label": "Not now",
        "detail": "Explicit scope cuts"
      }
    ],
    "caption": "The cut list is part of the product specification, not a private intention."
  },
  "01/the-hard-questions": {
    "kind": "tree",
    "title": "Pressure-test your recommendation",
    "nodes": [
      {
        "label": "Recommendation",
        "detail": "The call you want"
      },
      {
        "label": "Evidence",
        "detail": "How do you know?"
      },
      {
        "label": "Economics",
        "detail": "What does it cost?"
      },
      {
        "label": "Reversal",
        "detail": "What if it fails?"
      }
    ],
    "caption": "A defensible recommendation includes a way to find out what you do not know."
  },
  "01/disagree-and-commit": {
    "kind": "timeline",
    "title": "Disagree clearly, then execute",
    "nodes": [
      {
        "label": "Record",
        "detail": "State the objection"
      },
      {
        "label": "Decide",
        "detail": "Name the final call"
      },
      {
        "label": "Commit",
        "detail": "Back the execution"
      }
    ],
    "caption": "Keep a written dissent without quietly weakening the chosen plan."
  },
  "01/deliver-the-memo": {
    "kind": "document",
    "title": "Lead with the ask",
    "nodes": [
      {
        "label": "Decision",
        "detail": "Say the ask first"
      },
      {
        "label": "Evidence",
        "detail": "Show the strongest proof"
      },
      {
        "label": "Action",
        "detail": "Owner and next step"
      }
    ],
    "caption": "Rehearse the short route from evidence to a decision, then leave room for questions."
  },
  "02/who-to-talk-to": {
    "kind": "comparison",
    "title": "Recruit beyond the survivors",
    "nodes": [
      {
        "label": "New users",
        "detail": "Friction still fresh"
      },
      {
        "label": "Stopped users",
        "detail": "Why they left"
      },
      {
        "label": "Non-users",
        "detail": "Their workaround"
      }
    ],
    "caption": "These groups answer different questions. Current happy customers cannot represent all three."
  },
  "02/recruiting-without-a-panel": {
    "kind": "pipeline",
    "title": "The interview recruitment funnel",
    "nodes": [
      {
        "label": "Reached",
        "detail": "Outreach sent"
      },
      {
        "label": "Screened",
        "detail": "Recent experience"
      },
      {
        "label": "Booked",
        "detail": "Time agreed"
      },
      {
        "label": "Attended",
        "detail": "Conversation held"
      }
    ],
    "caption": "Plan for loss at every step. A booked slot is not yet an interview."
  },
  "02/research-cadence": {
    "kind": "cycle",
    "title": "Keep the evidence fresh",
    "nodes": [
      {
        "label": "Recruit",
        "detail": "Next conversation"
      },
      {
        "label": "Listen",
        "detail": "One hour weekly"
      },
      {
        "label": "Share",
        "detail": "Evidence with team"
      },
      {
        "label": "Decide",
        "detail": "Update the bet"
      }
    ],
    "caption": "A repeating research habit changes this week's decisions instead of creating a document that decays."
  },
  "02/the-interview": {
    "kind": "conversation",
    "title": "Reconstruct a real event",
    "nodes": [
      {
        "label": "Trigger",
        "detail": "What started it?"
      },
      {
        "label": "Actions",
        "detail": "What happened next?"
      },
      {
        "label": "Workaround",
        "detail": "How did you cope?"
      }
    ],
    "caption": "Stay with the participant's recent behaviour rather than asking for a prediction."
  },
  "02/leading-the-witness": {
    "kind": "comparison",
    "title": "Remove the answer from the question",
    "nodes": [
      {
        "label": "Leading",
        "detail": "Was that frustrating?"
      },
      {
        "label": "Neutral",
        "detail": "What happened next?"
      },
      {
        "label": "Probe",
        "detail": "Show me that step"
      }
    ],
    "caption": "Neutral questions let the participant supply the experience and its meaning."
  },
  "02/clusters-that-are-real": {
    "kind": "matrix",
    "title": "A cluster needs a boundary",
    "nodes": [
      {
        "label": "Include",
        "detail": "Matches the rule"
      },
      {
        "label": "Exclude",
        "detail": "Fails the rule"
      },
      {
        "label": "Holdout",
        "detail": "Unseen examples"
      },
      {
        "label": "Agreement",
        "detail": "Two coders compare"
      }
    ],
    "caption": "Write inclusion rules before measuring whether another person can reproduce the grouping."
  },
  "02/lost-deals-and-cancellations": {
    "kind": "document",
    "title": "Read the evidence people left behind",
    "nodes": [
      {
        "label": "Objection",
        "detail": "Reason for leaving"
      },
      {
        "label": "Count",
        "detail": "How often it appears"
      },
      {
        "label": "Quote",
        "detail": "Traceable source"
      }
    ],
    "caption": "Counts rank recurring reasons; a source quote keeps the interpretation checkable."
  },
  "02/say-vs-do": {
    "kind": "balance",
    "title": "Two signals, two questions",
    "nodes": [
      {
        "label": "Said",
        "detail": "Reported priorities"
      },
      {
        "label": "Did",
        "detail": "Observed behaviour"
      },
      {
        "label": "Investigate",
        "detail": "The contradiction"
      }
    ],
    "caption": "Treat a contradiction as something to investigate, not a reason to discard one source."
  },
  "02/five-people-failing": {
    "kind": "timeline",
    "title": "Watch the task, not the tour",
    "nodes": [
      {
        "label": "Task",
        "detail": "Give the goal"
      },
      {
        "label": "Observe",
        "detail": "Stay quiet"
      },
      {
        "label": "Timestamp",
        "detail": "Mark the failure"
      },
      {
        "label": "Rank",
        "detail": "Severity and repeats"
      }
    ],
    "caption": "Record where the participant gets stuck without guiding them past the problem."
  },
  "02/locating-the-moment": {
    "kind": "pipeline",
    "title": "Turn a claim into a query",
    "nodes": [
      {
        "label": "Claim",
        "detail": "Where users struggle"
      },
      {
        "label": "Event",
        "detail": "Observable behaviour"
      },
      {
        "label": "Query",
        "detail": "Defined population"
      },
      {
        "label": "Split",
        "detail": "Which segment?"
      }
    ],
    "caption": "A measurable event and a segment split can overturn the first interpretation."
  },
  "02/problem-statement": {
    "kind": "document",
    "title": "Keep the solution out of the problem",
    "nodes": [
      {
        "label": "Person",
        "detail": "Who is affected?"
      },
      {
        "label": "Situation",
        "detail": "When it happens"
      },
      {
        "label": "Friction",
        "detail": "What blocks progress"
      },
      {
        "label": "Evidence",
        "detail": "Impact and sources"
      }
    ],
    "caption": "Describe the person, situation, barrier, impact and evidence before choosing a solution."
  },
  "02/sizing-the-problem": {
    "kind": "comparison",
    "title": "Size the population, not the ticket pile",
    "nodes": [
      {
        "label": "Low",
        "detail": "Conservative reach"
      },
      {
        "label": "Mid",
        "detail": "Working assumptions"
      },
      {
        "label": "High",
        "detail": "Plausible ceiling"
      }
    ],
    "caption": "Tickets are not a random sample. State the population and uncertainty behind each case."
  },
  "02/reading-cohorts": {
    "kind": "cohort",
    "title": "Read across age, down acquisition",
    "nodes": [
      {
        "label": "Cohort A",
        "detail": "Older observations"
      },
      {
        "label": "Cohort B",
        "detail": "Less time elapsed"
      },
      {
        "label": "Cohort C",
        "detail": "Not yet observable"
      }
    ],
    "caption": "Compare the same elapsed age. Empty future cells are unknown, not zero retention."
  },
  "02/fit-is-a-segment": {
    "kind": "comparison",
    "title": "Find where fit holds",
    "nodes": [
      {
        "label": "Segment A",
        "detail": "Predefined cut"
      },
      {
        "label": "Segment B",
        "detail": "Predefined cut"
      },
      {
        "label": "Failed cuts",
        "detail": "Keep them visible"
      }
    ],
    "caption": "Define segments before inspecting the results, and report the ones that did not fit."
  },
  "02/mvp": {
    "kind": "pipeline",
    "title": "Test one risky assumption",
    "nodes": [
      {
        "label": "Assumption",
        "detail": "What must be true?"
      },
      {
        "label": "Small test",
        "detail": "Only what tests it"
      },
      {
        "label": "Real use",
        "detail": "Expose to behaviour"
      },
      {
        "label": "Verdict",
        "detail": "Evidence against bet"
      }
    ],
    "caption": "A minimum version is scoped around a question, not a small collection of features."
  },
  "02/kill-your-favourite": {
    "kind": "timeline",
    "title": "Write the stop rule before the result",
    "nodes": [
      {
        "label": "Before",
        "detail": "Name kill criteria"
      },
      {
        "label": "After",
        "detail": "Compare evidence"
      },
      {
        "label": "Stop",
        "detail": "Record the decision"
      },
      {
        "label": "Revive",
        "detail": "Only with new proof"
      }
    ],
    "caption": "Revival criteria prevent a failed idea returning unchanged under a new name."
  },
  "03/heuristics-not-opinions": {
    "kind": "matrix",
    "title": "A usability finding needs a reason",
    "nodes": [
      {
        "label": "Principle",
        "detail": "Which heuristic?"
      },
      {
        "label": "Evidence",
        "detail": "Observed violation"
      },
      {
        "label": "Severity",
        "detail": "Cost to the user"
      },
      {
        "label": "Correction",
        "detail": "Verify the fix"
      }
    ],
    "caption": "Use the heuristic to explain a specific failure, not to turn preferences into scores."
  },
  "03/type-that-works": {
    "kind": "type",
    "title": "Give each size a job",
    "nodes": [
      {
        "label": "Title",
        "detail": "The main promise"
      },
      {
        "label": "Heading",
        "detail": "The next section"
      },
      {
        "label": "Body",
        "detail": "The explanation"
      },
      {
        "label": "Caption",
        "detail": "Supporting detail"
      }
    ],
    "caption": "A named type scale makes emphasis deliberate and keeps the same role consistent across screens."
  },
  "03/the-space-between": {
    "kind": "spacing",
    "title": "Repeat a small spacing scale",
    "nodes": [
      {
        "label": "4",
        "detail": "Tight relationships"
      },
      {
        "label": "8",
        "detail": "Related elements"
      },
      {
        "label": "16",
        "detail": "Within a group"
      },
      {
        "label": "32",
        "detail": "Between groups"
      }
    ],
    "caption": "Illustrative spacing units: larger gaps separate groups, smaller gaps join related parts."
  },
  "03/amateur-tells": {
    "kind": "comparison",
    "title": "Consistency makes a screen credible",
    "nodes": [
      {
        "label": "Type",
        "detail": "A named scale"
      },
      {
        "label": "Spacing",
        "detail": "Repeated intervals"
      },
      {
        "label": "Alignment",
        "detail": "Shared edges"
      }
    ],
    "caption": "Audit the screen for the lesson's five tells, then compare the before and after at the same size."
  },
  "03/colour-with-a-job": {
    "kind": "matrix",
    "title": "Separate brand from status",
    "nodes": [
      {
        "label": "Brand",
        "detail": "Identity and emphasis"
      },
      {
        "label": "Success",
        "detail": "Completed action"
      },
      {
        "label": "Warning",
        "detail": "Needs attention"
      },
      {
        "label": "Error",
        "detail": "Action failed"
      }
    ],
    "caption": "Pair status colour with words or symbols. Colour alone cannot carry the meaning."
  },
  "03/designing-for-not-average": {
    "kind": "pipeline",
    "title": "Make the whole task operable",
    "nodes": [
      {
        "label": "Reach",
        "detail": "Keyboard navigation"
      },
      {
        "label": "Identify",
        "detail": "Visible focus and labels"
      },
      {
        "label": "Activate",
        "detail": "Usable target size"
      },
      {
        "label": "Understand",
        "detail": "Readable feedback"
      }
    ],
    "caption": "A button is not accessible just because its text has contrast. Test the complete interaction."
  },
  "03/the-contrast-audit": {
    "kind": "matrix",
    "title": "Check every colour pairing",
    "nodes": [
      {
        "label": "Foreground",
        "detail": "Text or icon"
      },
      {
        "label": "Background",
        "detail": "Actual surface"
      },
      {
        "label": "State",
        "detail": "Default or focused"
      },
      {
        "label": "Result",
        "detail": "Measured contrast"
      }
    ],
    "caption": "Audit token pairs and interaction states so the fix applies across the system."
  },
  "03/shape-of-the-product": {
    "kind": "tree",
    "title": "Choose an information structure",
    "nodes": [
      {
        "label": "User task",
        "detail": "The organising goal"
      },
      {
        "label": "Hierarchy",
        "detail": "Parent and child"
      },
      {
        "label": "Sequence",
        "detail": "Ordered steps"
      },
      {
        "label": "Matrix",
        "detail": "Multiple ways in"
      }
    ],
    "caption": "Choose structure from the task instead of mirroring the company's internal departments."
  },
  "03/findability-and-labels": {
    "kind": "tree",
    "title": "Give people a route back",
    "nodes": [
      {
        "label": "Account",
        "detail": "Clear starting point"
      },
      {
        "label": "Billing",
        "detail": "Recognisable label"
      },
      {
        "label": "Invoices",
        "detail": "Specific destination"
      },
      {
        "label": "Search",
        "detail": "Alternate entry"
      }
    ],
    "caption": "Labels, breadcrumbs and search should describe the same destination in the user's language."
  },
  "03/navigation-drill": {
    "kind": "matrix",
    "title": "Let participants group the cards",
    "nodes": [
      {
        "label": "Cards",
        "detail": "Existing destinations"
      },
      {
        "label": "Groups",
        "detail": "Participant categories"
      },
      {
        "label": "Labels",
        "detail": "Their own language"
      },
      {
        "label": "Compare",
        "detail": "Agreement and outliers"
      }
    ],
    "caption": "A card sort exposes competing mental models. Do not pre-fill the groups you hope to see."
  },
  "03/the-button-that-beat-the-redesign": {
    "kind": "comparison",
    "title": "The words explain the consequence",
    "nodes": [
      {
        "label": "Vague",
        "detail": "Continue"
      },
      {
        "label": "Specific",
        "detail": "Connect my bank"
      },
      {
        "label": "Recovery",
        "detail": "Try another bank"
      }
    ],
    "caption": "A clear action label and a useful recovery path can change behaviour without changing the layout."
  },
  "03/prototyping-fast": {
    "kind": "timeline",
    "title": "Raise fidelity only to answer a question",
    "nodes": [
      {
        "label": "Sketch",
        "detail": "Explore structure"
      },
      {
        "label": "Wireframe",
        "detail": "Test sequence"
      },
      {
        "label": "Clickable",
        "detail": "Test behaviour"
      },
      {
        "label": "Polished",
        "detail": "Test visual detail"
      }
    ],
    "caption": "Choose enough fidelity to test the current uncertainty, then put it in front of someone."
  },
  "03/five-people-a-task-not-a-tour": {
    "kind": "timeline",
    "title": "Test the prototype without teaching it",
    "nodes": [
      {
        "label": "Goal",
        "detail": "Give a real task"
      },
      {
        "label": "Silence",
        "detail": "Let them navigate"
      },
      {
        "label": "Evidence",
        "detail": "Timestamp problems"
      },
      {
        "label": "Revision",
        "detail": "Fix highest severity"
      }
    ],
    "caption": "A guided tour tests whether someone can follow instructions, not whether the product is usable."
  },
  "03/critique": {
    "kind": "conversation",
    "title": "Anchor feedback in the goal",
    "nodes": [
      {
        "label": "Goal",
        "detail": "What should happen?"
      },
      {
        "label": "Observed",
        "detail": "What blocks it?"
      },
      {
        "label": "Question",
        "detail": "What could change?"
      }
    ],
    "caption": "Describe the problem before prescribing a layout the designer must use."
  },
  "03/working-with-a-designer": {
    "kind": "document",
    "title": "A handoff leaves room for design",
    "nodes": [
      {
        "label": "Fixed",
        "detail": "Evidence and constraints"
      },
      {
        "label": "Open",
        "detail": "Unanswered questions"
      },
      {
        "label": "Hypothesis",
        "detail": "Your wireframes"
      }
    ],
    "caption": "The drawing starts a conversation. It does not overrule the designer's responsibility to solve the problem."
  },
  "03/reuse-or-make": {
    "kind": "balance",
    "title": "An exception carries a future cost",
    "nodes": [
      {
        "label": "Reuse",
        "detail": "Existing component"
      },
      {
        "label": "Exception",
        "detail": "Unmet requirement"
      },
      {
        "label": "Cost",
        "detail": "Maintain every state"
      }
    ],
    "caption": "Approve a new component only when the existing system cannot meet a named need."
  },
  "04/request-lifecycle": {
    "kind": "pipeline",
    "title": "A request travels through a system",
    "nodes": [
      {
        "label": "Browser",
        "detail": "Sends request"
      },
      {
        "label": "Server",
        "detail": "Applies rules"
      },
      {
        "label": "Database",
        "detail": "Reads or writes"
      },
      {
        "label": "Browser",
        "detail": "Receives response"
      }
    ],
    "caption": "Measure the network and processing steps separately to locate the time a user actually waits."
  },
  "04/errors-and-status-codes": {
    "kind": "comparison",
    "title": "Status codes point to the next action",
    "nodes": [
      {
        "label": "2xx",
        "detail": "Request succeeded"
      },
      {
        "label": "4xx",
        "detail": "Check the request"
      },
      {
        "label": "5xx",
        "detail": "Server could not fulfil"
      }
    ],
    "caption": "A code narrows triage; the user still needs a clear explanation and a recovery action."
  },
  "04/latency-budget": {
    "kind": "bars",
    "title": "Account for the whole wait",
    "nodes": [
      {
        "label": "Network",
        "detail": "Travel time"
      },
      {
        "label": "Server",
        "detail": "Processing time"
      },
      {
        "label": "Data",
        "detail": "Query time"
      },
      {
        "label": "Render",
        "detail": "Visible result"
      }
    ],
    "caption": "Measure each contribution before choosing the part to optimise. Bars are schematic, not timings."
  },
  "04/reading-code-enough": {
    "kind": "pipeline",
    "title": "Read the behaviour through the code",
    "nodes": [
      {
        "label": "Input",
        "detail": "What enters?"
      },
      {
        "label": "Rule",
        "detail": "What branches?"
      },
      {
        "label": "Output",
        "detail": "What returns?"
      },
      {
        "label": "Failure",
        "detail": "What can break?"
      }
    ],
    "caption": "Translate the code into rules and questions before commenting on its implementation."
  },
  "04/branches-and-staging": {
    "kind": "branch",
    "title": "A change is not live just because it exists",
    "nodes": [
      {
        "label": "Branch",
        "detail": "Isolated change"
      },
      {
        "label": "Review",
        "detail": "Behaviour checked"
      },
      {
        "label": "Staging",
        "detail": "Integrated rehearsal"
      },
      {
        "label": "Production",
        "detail": "Real users"
      }
    ],
    "caption": "Each gate answers a different question. Map your actual release process before promising a launch."
  },
  "04/reviewing-a-change": {
    "kind": "matrix",
    "title": "Review against observable behaviour",
    "nodes": [
      {
        "label": "Criterion",
        "detail": "Expected result"
      },
      {
        "label": "Change",
        "detail": "Proposed behaviour"
      },
      {
        "label": "Test",
        "detail": "Evidence it works"
      },
      {
        "label": "Comment",
        "detail": "Specific missing case"
      }
    ],
    "caption": "A useful review comment connects an unmet criterion to a concrete path through the product."
  },
  "04/the-schema": {
    "kind": "schema",
    "title": "Follow keys, not repeated names",
    "nodes": [
      {
        "label": "Users",
        "detail": "id: primary key"
      },
      {
        "label": "Transactions",
        "detail": "user_id: foreign key"
      },
      {
        "label": "Events",
        "detail": "user_id: foreign key"
      }
    ],
    "caption": "Transactions and events can both point to users through user_id. Join on stable keys, and name the source of truth for duplicated facts."
  },
  "04/sql": {
    "kind": "pipeline",
    "title": "Build a query you can check",
    "nodes": [
      {
        "label": "SELECT",
        "detail": "Choose columns"
      },
      {
        "label": "FROM",
        "detail": "Choose source"
      },
      {
        "label": "WHERE",
        "detail": "Filter population"
      },
      {
        "label": "GROUP BY",
        "detail": "Choose aggregation"
      }
    ],
    "caption": "Check row counts and join cardinality before trusting the final aggregate."
  },
  "04/numbers-that-disagree": {
    "kind": "timeline",
    "title": "Reconcile one definition at a time",
    "nodes": [
      {
        "label": "Start",
        "detail": "Your reported total"
      },
      {
        "label": "Population",
        "detail": "Who is included?"
      },
      {
        "label": "Window",
        "detail": "Which dates count?"
      },
      {
        "label": "End",
        "detail": "Finance definition"
      }
    ],
    "caption": "Walk from one total to the other with a query-backed adjustment for each difference."
  },
  "04/event-design": {
    "kind": "pipeline",
    "title": "Give each event a question",
    "nodes": [
      {
        "label": "Question",
        "detail": "Did the job finish?"
      },
      {
        "label": "Trigger",
        "detail": "Exact transition"
      },
      {
        "label": "Properties",
        "detail": "Useful context"
      },
      {
        "label": "Validation",
        "detail": "Confirm the event"
      }
    ],
    "caption": "Define the trigger precisely so multiple engineers instrument the same behaviour."
  },
  "04/tickets": {
    "kind": "document",
    "title": "A ticket carries a problem",
    "nodes": [
      {
        "label": "Title",
        "detail": "Observed problem"
      },
      {
        "label": "Appetite",
        "detail": "Time worth spending"
      },
      {
        "label": "No-gos",
        "detail": "Explicit boundaries"
      }
    ],
    "caption": "Keep the problem visible so an engineer can propose a better solution inside the constraint."
  },
  "04/scope-the-v1": {
    "kind": "document",
    "title": "One job, one page",
    "nodes": [
      {
        "label": "Job",
        "detail": "A single outcome"
      },
      {
        "label": "Page",
        "detail": "Shortest usable path"
      },
      {
        "label": "Cuts",
        "detail": "Everything else"
      }
    ],
    "caption": "A written cut list protects the small scope when the build starts suggesting more features."
  },
  "04/build-with-ai": {
    "kind": "cycle",
    "title": "Build in reviewable increments",
    "nodes": [
      {
        "label": "Name",
        "detail": "One small change"
      },
      {
        "label": "Generate",
        "detail": "Bounded implementation"
      },
      {
        "label": "Check",
        "detail": "Run and inspect"
      },
      {
        "label": "Commit",
        "detail": "Working checkpoint"
      }
    ],
    "caption": "Repeat a short verified cycle instead of accepting a whole unreviewed application at once."
  },
  "04/read-what-it-wrote": {
    "kind": "matrix",
    "title": "Inspect the missing paths",
    "nodes": [
      {
        "label": "Validation",
        "detail": "Untrusted inputs"
      },
      {
        "label": "Permission",
        "detail": "Allowed actions"
      },
      {
        "label": "Failure",
        "detail": "Safe recovery"
      },
      {
        "label": "Evidence",
        "detail": "Run each case"
      }
    ],
    "caption": "Generated code needs deliberate checks at boundaries and failure paths, not only the happy path."
  },
  "04/domain-and-https": {
    "kind": "pipeline",
    "title": "A public URL needs the whole chain",
    "nodes": [
      {
        "label": "DNS",
        "detail": "Find the host"
      },
      {
        "label": "TLS",
        "detail": "Secure connection"
      },
      {
        "label": "App",
        "detail": "Serve the request"
      },
      {
        "label": "Form",
        "detail": "Deliver the submission"
      }
    ],
    "caption": "A page loading over HTTPS does not prove the form or its delivery destination works."
  },
  "04/first-ten-users": {
    "kind": "timeline",
    "title": "Observe real use after launch",
    "nodes": [
      {
        "label": "Recruit",
        "detail": "People with the job"
      },
      {
        "label": "Watch",
        "detail": "Unassisted sessions"
      },
      {
        "label": "Record",
        "detail": "Friction and failures"
      },
      {
        "label": "Fix",
        "detail": "Highest-value change"
      }
    ],
    "caption": "Ten real users are an opportunity to observe behaviour, not a claim of statistical certainty."
  },
  "04/what-the-ten-did": {
    "kind": "matrix",
    "title": "Ten people, ten traceable rows",
    "nodes": [
      {
        "label": "User",
        "detail": "Who tried it"
      },
      {
        "label": "First use",
        "detail": "What they did"
      },
      {
        "label": "Return",
        "detail": "What happened later"
      },
      {
        "label": "Change",
        "detail": "What you fixed"
      }
    ],
    "caption": "Keep individual observations visible. A small sample needs careful stories as well as counts."
  },
  "04/estimates": {
    "kind": "bars",
    "title": "Estimate a range with a reason",
    "nodes": [
      {
        "label": "Known work",
        "detail": "Small named pieces"
      },
      {
        "label": "Dependencies",
        "detail": "Waiting on others"
      },
      {
        "label": "Unknowns",
        "detail": "Investigation needed"
      },
      {
        "label": "Range",
        "detail": "Explain the spread"
      }
    ],
    "caption": "The bars show categories of uncertainty, not measured durations. Break large work into inspectable pieces."
  },
  "04/sprints-and-standups": {
    "kind": "cycle",
    "title": "A cadence should force a decision",
    "nodes": [
      {
        "label": "Plan",
        "detail": "Pick an outcome"
      },
      {
        "label": "Check",
        "detail": "Expose a blocker"
      },
      {
        "label": "Decide",
        "detail": "Change the plan"
      },
      {
        "label": "Review",
        "detail": "What actually moved?"
      }
    ],
    "caption": "Keep ceremonies only when they support a decision the team needs to make."
  },
  "04/the-date-slipped": {
    "kind": "document",
    "title": "Send a decision, not a surprise",
    "nodes": [
      {
        "label": "Change",
        "detail": "What slipped and why"
      },
      {
        "label": "Options",
        "detail": "Date or scope trade-off"
      },
      {
        "label": "Ask",
        "detail": "The call needed now"
      }
    ],
    "caption": "State the problem early and include a smaller version that can still create value."
  },
  "05/model-path": {
    "kind": "pipeline",
    "title": "The model works in tokens",
    "nodes": [
      {
        "label": "Input",
        "detail": "Text becomes tokens"
      },
      {
        "label": "Context",
        "detail": "Prompt and history"
      },
      {
        "label": "Model",
        "detail": "Predicts next token"
      },
      {
        "label": "Output",
        "detail": "Repeated generation"
      }
    ],
    "caption": "Input and output tokens both affect cost; generation proceeds token by token."
  },
  "05/context-budget": {
    "kind": "bars",
    "title": "Allocate a finite context window",
    "nodes": [
      {
        "label": "Instructions",
        "detail": "Persistent rules"
      },
      {
        "label": "History",
        "detail": "Relevant conversation"
      },
      {
        "label": "Retrieval",
        "detail": "Useful evidence"
      },
      {
        "label": "Output",
        "detail": "Reserve for answer"
      }
    ],
    "caption": "These are budget categories, not equal allocations. Set limits and an eviction rule for each."
  },
  "05/same-prompt-different-answer": {
    "kind": "matrix",
    "title": "Repeat the input, inspect the spread",
    "nodes": [
      {
        "label": "Input",
        "detail": "Keep it fixed"
      },
      {
        "label": "Runs",
        "detail": "Repeat twenty times"
      },
      {
        "label": "Rubric",
        "detail": "Score consistently"
      },
      {
        "label": "Decision",
        "detail": "Set structure and limits"
      }
    ],
    "caption": "A single successful response cannot show the variance of the system."
  },
  "05/when-to-use-ai": {
    "kind": "tree",
    "title": "Use a model where a rule is not enough",
    "nodes": [
      {
        "label": "Task",
        "detail": "What must happen?"
      },
      {
        "label": "Rule exists",
        "detail": "Use deterministic code"
      },
      {
        "label": "Ambiguous input",
        "detail": "Evaluate a model"
      },
      {
        "label": "Failure cost",
        "detail": "Choose the boundary"
      }
    ],
    "caption": "Compare an AI approach with a rule-based baseline before committing to the added uncertainty."
  },
  "05/feature-shapes": {
    "kind": "comparison",
    "title": "Control how far a wrong answer travels",
    "nodes": [
      {
        "label": "Suggest",
        "detail": "User chooses"
      },
      {
        "label": "Answer",
        "detail": "User forms a belief"
      },
      {
        "label": "Act",
        "detail": "System executes"
      }
    ],
    "caption": "As autonomy increases, the cost of an incorrect output changes. Design the fallback with the feature."
  },
  "05/llm-as-judge": {
    "kind": "balance",
    "title": "Calibrate the judge against a human",
    "nodes": [
      {
        "label": "Human",
        "detail": "Reference scores"
      },
      {
        "label": "Judge",
        "detail": "Same cases and rubric"
      },
      {
        "label": "Gap",
        "detail": "Agreement and bias"
      }
    ],
    "caption": "A model judging another model still needs checks for disagreement and preference for longer answers."
  },
  "05/offline-and-online": {
    "kind": "comparison",
    "title": "Two evaluation layers",
    "nodes": [
      {
        "label": "Offline",
        "detail": "Golden cases"
      },
      {
        "label": "Online",
        "detail": "Real behaviour"
      },
      {
        "label": "Feedback",
        "detail": "Failures join the suite"
      }
    ],
    "caption": "Offline scores support release decisions; production evidence finds the failures the suite missed."
  },
  "05/chunking-and-embeddings": {
    "kind": "pipeline",
    "title": "Retrieve a passage that stands alone",
    "nodes": [
      {
        "label": "Document",
        "detail": "Original context"
      },
      {
        "label": "Chunks",
        "detail": "Coherent passages"
      },
      {
        "label": "Embedding",
        "detail": "Search representation"
      },
      {
        "label": "Match",
        "detail": "Useful evidence"
      }
    ],
    "caption": "A chunk must retain enough meaning to help when retrieved without its surrounding document."
  },
  "05/the-ranking-step": {
    "kind": "pipeline",
    "title": "Retrieval needs a relevance gate",
    "nodes": [
      {
        "label": "Candidates",
        "detail": "Broad retrieval"
      },
      {
        "label": "Rerank",
        "detail": "Compare relevance"
      },
      {
        "label": "Threshold",
        "detail": "Discard weak matches"
      },
      {
        "label": "Context",
        "detail": "Only useful evidence"
      }
    ],
    "caption": "Do not fill the context window with the best available documents when none are relevant enough."
  },
  "05/one-call-or-loop": {
    "kind": "cycle",
    "title": "Every extra step adds another failure point",
    "nodes": [
      {
        "label": "Decide",
        "detail": "Choose next action"
      },
      {
        "label": "Call",
        "detail": "Use a bounded tool"
      },
      {
        "label": "Inspect",
        "detail": "Check the result"
      },
      {
        "label": "Stop",
        "detail": "Done or budget hit"
      }
    ],
    "caption": "A loop needs a stopping rule. Measure whole-run reliability, not just the accuracy of one call."
  },
  "05/tool-design": {
    "kind": "schema",
    "title": "A tool is a contract",
    "nodes": [
      {
        "label": "Parameters",
        "detail": "Validated inputs"
      },
      {
        "label": "Permission",
        "detail": "Allowed scope"
      },
      {
        "label": "Result",
        "detail": "Success or failure"
      }
    ],
    "caption": "Define the smallest permitted action and all result states before giving a model access to the tool."
  },
  "05/loop-cost": {
    "kind": "bars",
    "title": "Put a ceiling on the run",
    "nodes": [
      {
        "label": "Steps",
        "detail": "Maximum iterations"
      },
      {
        "label": "Tokens",
        "detail": "Maximum generation"
      },
      {
        "label": "Time",
        "detail": "Execution timeout"
      },
      {
        "label": "Money",
        "detail": "Cost limit"
      }
    ],
    "caption": "The limits bound different failure modes. Test a runaway case to verify they actually stop the loop."
  },
  "05/perceived-latency": {
    "kind": "timeline",
    "title": "Make the wait understandable",
    "nodes": [
      {
        "label": "Submit",
        "detail": "Acknowledge action"
      },
      {
        "label": "First token",
        "detail": "Visible response starts"
      },
      {
        "label": "Streaming",
        "detail": "Show ongoing progress"
      },
      {
        "label": "Complete",
        "detail": "Usable final answer"
      }
    ],
    "caption": "Measure time to first token separately from time to completion, including slow-tail behaviour."
  },
  "05/cost-latency": {
    "kind": "pipeline",
    "title": "Spend the expensive call where it matters",
    "nodes": [
      {
        "label": "Cache",
        "detail": "Reuse valid results"
      },
      {
        "label": "Route",
        "detail": "Choose a suitable model"
      },
      {
        "label": "Trim",
        "detail": "Remove unused context"
      },
      {
        "label": "Evaluate",
        "detail": "Check quality again"
      }
    ],
    "caption": "A cheaper route is useful only when the evaluation still supports its quality for that class of task."
  },
  "05/confidence-and-refusal": {
    "kind": "comparison",
    "title": "Three honest response paths",
    "nodes": [
      {
        "label": "Answer",
        "detail": "Evidence is sufficient"
      },
      {
        "label": "Uncertain",
        "detail": "Name the limitation"
      },
      {
        "label": "Refuse",
        "detail": "Cannot safely answer"
      }
    ],
    "caption": "Tie each response to an explicit trigger and test examples for all three paths."
  },
  "05/human-in-the-loop": {
    "kind": "comparison",
    "title": "Choose where the human sits",
    "nodes": [
      {
        "label": "Before",
        "detail": "Approve every output"
      },
      {
        "label": "After",
        "detail": "Review a sample"
      },
      {
        "label": "On call",
        "detail": "Escalate with context"
      }
    ],
    "caption": "Choose placement from the cost and reversibility of an error. Every user-facing flow still needs an owned escalation path."
  },
  "05/red-team": {
    "kind": "matrix",
    "title": "Test the boundary, then fix the layer",
    "nodes": [
      {
        "label": "Attack",
        "detail": "Attempted exploit"
      },
      {
        "label": "Result",
        "detail": "Verbatim response"
      },
      {
        "label": "Severity",
        "detail": "Possible harm"
      },
      {
        "label": "Mitigation",
        "detail": "Correct system layer"
      }
    ],
    "caption": "Some failures require permission or architecture changes. A rewritten prompt is not always the fix."
  },
  "05/data-and-trust": {
    "kind": "pipeline",
    "title": "Show where the user's data travels",
    "nodes": [
      {
        "label": "Collect",
        "detail": "What comes in"
      },
      {
        "label": "Process",
        "detail": "Where it is sent"
      },
      {
        "label": "Store",
        "detail": "What is retained"
      },
      {
        "label": "Delete",
        "detail": "How it leaves"
      }
    ],
    "caption": "Disclose where data goes, whether it is used for training, who can see it, and how long it is kept, at the point of use."
  },
  "06/saying-no": {
    "kind": "document",
    "title": "Write a no others can reuse",
    "nodes": [
      {
        "label": "Request",
        "detail": "What was proposed"
      },
      {
        "label": "Reason",
        "detail": "The governing constraint"
      },
      {
        "label": "Revisit",
        "detail": "What must change"
      }
    ],
    "caption": "A reusable reason prevents the same request returning without new evidence."
  },
  "06/strategy-changed": {
    "kind": "comparison",
    "title": "Separate three kinds of work",
    "nodes": [
      {
        "label": "Continue",
        "detail": "Still supports the goal"
      },
      {
        "label": "Stop now",
        "detail": "Premise invalidated"
      },
      {
        "label": "Finish then stop",
        "detail": "Close safely"
      }
    ],
    "caption": "A strategy change does not invalidate every current commitment. Make each call explicitly."
  },
  "06/rollout": {
    "kind": "pipeline",
    "title": "Expand only after the gate passes",
    "nodes": [
      {
        "label": "Internal",
        "detail": "Known users first"
      },
      {
        "label": "Small cohort",
        "detail": "Limit exposure"
      },
      {
        "label": "Review",
        "detail": "Check guardrails"
      },
      {
        "label": "Expand",
        "detail": "Or roll back"
      }
    ],
    "caption": "Define the evidence for expansion and the kill criteria before exposing the next group."
  },
  "06/gtm-brief": {
    "kind": "document",
    "title": "Give every team what they need",
    "nodes": [
      {
        "label": "Audience",
        "detail": "Who it helps"
      },
      {
        "label": "Promise",
        "detail": "What changes for them"
      },
      {
        "label": "Limits",
        "detail": "What it cannot do"
      },
      {
        "label": "Timing",
        "detail": "Owner and lead time"
      }
    ],
    "caption": "The brief aligns the promise with the shipped behaviour and leaves time for each team to prepare."
  },
  "06/internal-launch": {
    "kind": "tree",
    "title": "Prepare the first users inside the company",
    "nodes": [
      {
        "label": "Launch",
        "detail": "Working demo"
      },
      {
        "label": "Support",
        "detail": "Ready macros"
      },
      {
        "label": "Sales",
        "detail": "Known limitations"
      },
      {
        "label": "Escalation",
        "detail": "Named owner"
      }
    ],
    "caption": "The people explaining the product need a clear answer when it does not behave as expected."
  },
  "06/instrumentation": {
    "kind": "pipeline",
    "title": "Turn launch questions into evidence",
    "nodes": [
      {
        "label": "Question",
        "detail": "What must we know?"
      },
      {
        "label": "Event",
        "detail": "Observable action"
      },
      {
        "label": "Dashboard",
        "detail": "Defined calculation"
      },
      {
        "label": "Alert",
        "detail": "Guardrail breached"
      }
    ],
    "caption": "Use a question-led tracking plan and verify the events before reading launch performance."
  },
  "06/metric-moved": {
    "kind": "comparison",
    "title": "Check what changed beneath the number",
    "nodes": [
      {
        "label": "Population",
        "detail": "Different users?"
      },
      {
        "label": "Instrumentation",
        "detail": "Different counting?"
      },
      {
        "label": "Incentive",
        "detail": "Gaming the proxy?"
      }
    ],
    "caption": "An aggregate can move without anyone improving. Split the population before declaring success."
  },
  "06/confounds": {
    "kind": "matrix",
    "title": "Try the competing explanations",
    "nodes": [
      {
        "label": "Novelty",
        "detail": "Newness drives use?"
      },
      {
        "label": "Seasonality",
        "detail": "What time changed?"
      },
      {
        "label": "Primacy",
        "detail": "Change creates friction?"
      },
      {
        "label": "Mix shift",
        "detail": "Segment sizes changed?"
      }
    ],
    "caption": "Rule alternatives in or out with evidence before attributing a result to your intervention."
  },
  "06/worth-running": {
    "kind": "tree",
    "title": "An experiment must earn its cost",
    "nodes": [
      {
        "label": "Proposal",
        "detail": "Decision to inform"
      },
      {
        "label": "Uncertainty",
        "detail": "Is it unresolved?"
      },
      {
        "label": "Action",
        "detail": "Will results change it?"
      },
      {
        "label": "Feasibility",
        "detail": "Can we detect it?"
      }
    ],
    "caption": "Do not run a test when either outcome would lead to the same decision."
  },
  "06/win-or-noise": {
    "kind": "balance",
    "title": "Compare the result with the stopping rule",
    "nodes": [
      {
        "label": "Evidence",
        "detail": "Effect and uncertainty"
      },
      {
        "label": "Rule",
        "detail": "Pre-registered decision"
      },
      {
        "label": "Verdict",
        "detail": "Win, loss or unknown"
      }
    ],
    "caption": "Statistical significance does not by itself establish a useful business effect."
  },
  "06/loops-not-funnels": {
    "kind": "cycle",
    "title": "An output becomes the next input",
    "nodes": [
      {
        "label": "New user",
        "detail": "Enters the product"
      },
      {
        "label": "Value",
        "detail": "Completes the job"
      },
      {
        "label": "Output",
        "detail": "Creates an invitation"
      },
      {
        "label": "Next user",
        "detail": "Starts the next cycle"
      }
    ],
    "caption": "Draw the actual reinvestment path. A funnel does not become a loop just by bending its arrows."
  },
  "06/pricing-packaging": {
    "kind": "comparison",
    "title": "Choose the boundary before the price",
    "nodes": [
      {
        "label": "Free tier",
        "detail": "Who it serves"
      },
      {
        "label": "Paid tier",
        "detail": "Value worth paying for"
      },
      {
        "label": "Heavy use",
        "detail": "Margin at high usage"
      }
    ],
    "caption": "Test the billing unit against real usage patterns before choosing a price."
  },
  "06/post-launch-review": {
    "kind": "document",
    "title": "Compare the launch with its prediction",
    "nodes": [
      {
        "label": "Before",
        "detail": "Written expectations"
      },
      {
        "label": "After",
        "detail": "Observed outcomes"
      },
      {
        "label": "Learning",
        "detail": "Where you were wrong"
      },
      {
        "label": "Change",
        "detail": "Owner and date"
      }
    ],
    "caption": "Use the prediction as the reference, then update a working document so the learning persists."
  },
  "06/ethics": {
    "kind": "balance",
    "title": "Make the trade-off explicit",
    "nodes": [
      {
        "label": "Business",
        "detail": "Target metric"
      },
      {
        "label": "User",
        "detail": "Consequence and control"
      },
      {
        "label": "Alternative",
        "detail": "Honest route to value"
      }
    ],
    "caption": "Show the specific harm and a viable alternative that serves the same product goal."
  },
  "06/data-you-hold": {
    "kind": "pipeline",
    "title": "Every field needs a lifecycle",
    "nodes": [
      {
        "label": "Purpose",
        "detail": "Why collect it?"
      },
      {
        "label": "Access",
        "detail": "Who can use it?"
      },
      {
        "label": "Retention",
        "detail": "How long is needed?"
      },
      {
        "label": "Deletion",
        "detail": "How is it removed?"
      }
    ],
    "caption": "Review both stored fields and the inferences they enable. Aggregation alone does not guarantee anonymity."
  },
  "06/portfolio": {
    "kind": "document",
    "title": "Put the strongest evidence first",
    "nodes": [
      {
        "label": "Live product",
        "detail": "A link that works"
      },
      {
        "label": "Case study",
        "detail": "A decision explained"
      },
      {
        "label": "Supporting work",
        "detail": "Other shipped artefacts"
      }
    ],
    "caption": "Test the page on a phone while logged out. The working artefact is the lead evidence."
  },
  "06/interview-loop": {
    "kind": "matrix",
    "title": "Four rounds, four different signals",
    "nodes": [
      {
        "label": "Product sense",
        "detail": "Frame and choose"
      },
      {
        "label": "Execution",
        "detail": "Make trade-offs"
      },
      {
        "label": "Analytics",
        "detail": "Trust the number"
      },
      {
        "label": "Take-home",
        "detail": "Show judgement"
      }
    ],
    "caption": "Use a shipped example and score each round against the skill it is meant to test."
  },
  "06/the-offer": {
    "kind": "balance",
    "title": "Negotiate with evidence, not a bluff",
    "nodes": [
      {
        "label": "Level",
        "detail": "Scope and salary band"
      },
      {
        "label": "Package",
        "detail": "Pay and other levers"
      },
      {
        "label": "Evidence",
        "detail": "Market and contribution"
      }
    ],
    "caption": "Agree the level before optimising individual terms; never invent a competing offer."
  },
  "06/first-ninety-days": {
    "kind": "timeline",
    "title": "Earn the larger change",
    "nodes": [
      {
        "label": "Days 1–30",
        "detail": "Learn how decisions work"
      },
      {
        "label": "Days 31–60",
        "detail": "Ship a small improvement"
      },
      {
        "label": "Days 61–90",
        "detail": "Propose a meaningful change"
      }
    ],
    "caption": "Choose the larger proposal from what you learn, not from an answer imported from your last company."
  },
  "06/senior-pm": {
    "kind": "tree",
    "title": "The scope grows, the craft stays",
    "nodes": [
      {
        "label": "Craft",
        "detail": "Evidence and decisions"
      },
      {
        "label": "Ambiguity",
        "detail": "Frame the problem"
      },
      {
        "label": "Reach",
        "detail": "Influence other teams"
      },
      {
        "label": "Multiplication",
        "detail": "Help others improve"
      }
    ],
    "caption": "Senior scope is less defined at the start and improves decisions beyond the PM's own team."
  }
};
