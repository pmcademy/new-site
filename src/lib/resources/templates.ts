import type { Template } from "./types";

/**
 * Eight templates. Each one is a document a working PM fills in, not a list
 * of headings. Every section has a real ask, a filled example written for
 * Sona, and a trap naming how that section usually goes wrong.
 */
export const templates: Template[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "prd-that-survives",
    title: "The PRD that survives contact with engineering",
    blurb:
      "One page. Four sections engineers actually read before they start arguing about scope.",
    when: "Before a build starts, when more than one person has to build it and nobody agrees yet what done means.",
    useIn: 45,
    level: "01",
    featured: true,
    sections: [
      {
        heading: "Problem, in one paragraph, with a number",
        purpose:
          "Grounds the document in evidence so engineering checks your data instead of trusting your judgement.",
        ask: "What is broken, for whom, and how do you know? Use one real number.",
        example:
          "38 percent of new Sona users abandon the linked-bank step before finishing, per Ana's funnel report for August. Priya's team has 61 support tickets this month with the same phrase: \"it says my bank isn't supported but it is.\" Both point at the same failure: our bank search returns no results for correctly spelled banks that just aren't in the top 50 by user count.",
        trap: "Writing the problem as the solution in disguise, for example \"we need a redesigned bank search.\" That forecloses the actual best fix, which might be adding banks to the index rather than touching the UI at all.",
      },
      {
        heading: "What we are building, and what we are not",
        purpose:
          "Sets the smallest version that solves the problem, and rules out the ideas that will otherwise attach themselves to it mid-sprint.",
        ask: "Describe the smallest version that solves the problem, then list what's explicitly out of scope.",
        example:
          "We add fuzzy matching to bank search, so \"chase\" also matches JPMorgan Chase and typos within two characters resolve. Out of scope: adding new banks to the index (a data problem, already Ana's ticket) and redesigning the results page.",
        trap: "Leaving the non-goals section empty. Every adjacent idea then becomes \"well, while we're in there,\" and the two week build becomes six.",
      },
      {
        heading: "Acceptance criteria, each one somebody could fail",
        purpose:
          "Turns the feature into conditions a tester can actually check, instead of a feeling everyone privately defines differently.",
        ask: "List the conditions that must be true before this ships, written so a tester could fail each one.",
        example:
          "1. Typing \"chase\" or \"chace\" returns JPMorgan Chase in the top 3 results. 2. Searching a bank not in our index returns \"we don't support this bank yet,\" never a blank list. 3. Search returns in under 400ms at the 95th percentile, measured against last week's volume.",
        trap: "Writing criteria nobody could ever fail, like \"search should feel fast and intuitive.\" Ask what would prove that wrong. If there's no answer, it's a mood, not a criterion, and it's exactly what a model asked to draft acceptance criteria tends to produce.",
      },
      {
        heading: "Rollout and the way it fails",
        purpose:
          "Plans for the version of this that goes wrong, before launch day turns into the first time anyone thought about it.",
        ask: "How does this reach users, and what's the plan if it's wrong?",
        example:
          "Ship behind a flag to 10 percent of new signups for 3 days. Watch the abandon rate at the linked-bank step. If it doesn't move, the fuzzy match isn't the fix, and we pull the flag instead of pushing to 100. Dev owns the flag, Ana owns the dashboard.",
        trap: "No rollback plan, so the first sign of trouble becomes a war room instead of a flag flip.",
      },
    ],
    rules: [
      "One page. If it doesn't fit, the scope is wrong, not the font size.",
      "Every acceptance criterion must be something a tester could fail.",
      "Write the non-goals before the goals. It's the only way they survive the first scope conversation.",
      "No adjective without a number behind it. \"Fast\" becomes \"400ms at p95.\"",
    ],
    ai: {
      prompt:
        "I'll give you a rough description of a feature and the evidence behind it. Draft a one page PRD with exactly four sections: Problem (with evidence), Solution and non-goals, Acceptance criteria (numbered, each independently testable), and Rollout and risk. Keep acceptance criteria concrete enough that a QA tester could fail each one. Do not use an adjective without a measurable threshold attached. Here's the feature: [paste your rough notes, ticket, or Slack thread here]",
      trap: "Asked for a PRD, the model produces acceptance criteria nobody could ever fail, like \"the flow should feel fast and intuitive\" or \"errors are handled gracefully.\" Read every criterion and ask what a tester would type into a bug report to prove it false. If there's no answer, rewrite it.",
    },
    markdown: `# [Feature name]: PRD

## Problem
What is broken, for whom, and how do you know?
(One paragraph. Use a real number: a metric, a ticket count, a quote.)


## Solution
What is the smallest version that solves the problem?


## Non-goals
What are we explicitly NOT building in this pass?


## Acceptance criteria
Numbered. Each one must be something a tester could fail.

1.
2.
3.

## Rollout and risk
How does this reach users? Flag, percentage, duration?


What's the rollback plan if we're wrong? Who owns pulling it?


Owner:
Target date:
`,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "signal-log",
    title: "The signal log",
    blurb:
      "One row per quote. A structured way to hold raw feedback without losing the exact words.",
    when: "Any time a pile of reviews, tickets, or call notes needs to become something you can sort and defend.",
    useIn: 30,
    level: "01",
    featured: true,
    sections: [
      {
        heading: "Source",
        purpose:
          "Keeps every claim traceable back to where it came from, so nobody has to trust your summary.",
        ask: "Where did this come from? Channel, date, and who said it if you know.",
        example: "App Store review, 14 Aug, iOS, 3 stars",
        trap: "Skipping the date. Six months later nobody can tell if a complaint is about the current release or one three versions ago.",
      },
      {
        heading: "Quote, verbatim",
        purpose:
          "The exact words carry information a paraphrase throws away: tone, specificity, whether they blame themselves or the app.",
        ask: "Copy the sentence exactly. Do not summarise, do not fix the grammar.",
        example:
          "\"it keeps saying my bank isnt supported but its literally chase, one of the biggest banks in the country\"",
        trap: "Paraphrasing it into \"user reports bank search issue,\" which is exactly what a model does when asked to summarise instead of extract. The mention of a specific well-known bank is lost, and with it the fact that this is a search index problem, not a coverage problem.",
      },
      {
        heading: "Label",
        purpose:
          "Groups the same underlying problem said different ways so you can count it.",
        ask: "What's the underlying problem, in two or three words? Use a short fixed vocabulary, don't invent a new label per row.",
        example: "bank-search-fuzzy-match",
        trap: "A new label for every row because every sentence is worded differently. Cap the vocabulary at 8 to 10 labels before reading a single row, and force each one into the closest fit.",
      },
      {
        heading: "Who it's from",
        purpose:
          "Not every user is equally informative. A churned power user and a day one signup are different signals.",
        ask: "New user, existing user, or churned. Guess if you have to, and say you guessed.",
        example:
          "New user, signed up but never linked a bank (guessed from context: \"I just downloaded this\")",
        trap: "Treating every row as equally weighted when a churned power user complaining is worth more than ten day one signups hitting a rough edge they'll happily forgive.",
      },
      {
        heading: "Severity",
        purpose:
          "Not every complaint is equally costly, so rank before counting.",
        ask: "On a 1 to 5 scale, how much does this block the person from getting value, not how angry they sound.",
        example: "5, they cannot complete signup at all",
        trap: "Scoring by how angry the review sounds rather than how blocking the problem is. A calm review about a total blocker matters more than a furious one about a font size.",
      },
    ],
    rules: [
      "One row per quote, never one row per person if they raised two problems.",
      "Fix the label vocabulary before you start. Cap it around 8 to 10.",
      "Never edit the quote. If it's badly spelled, it stays badly spelled.",
      "Revisit the log after a week. Labels that felt right at row 10 sometimes need splitting by row 100.",
    ],
    ai: {
      prompt:
        "I'm going to paste raw customer feedback (reviews, tickets, or call notes). For each distinct complaint, extract a row with: quote (copied exactly, do not paraphrase), source, date if present, label (choose from this fixed list: [list your 8 to 10 labels], or \"other\" if none fit), user_type_guess (new, existing, or churned), severity_1_to_5 (how much it blocks getting value, not tone). Return as a table. One row per distinct complaint; if a single review raises two problems, split it into two rows. Here's the feedback: [paste your reviews, tickets, or notes here]",
      trap: "It will summarise when you asked it to extract, and you lose the quote. Read the first ten output rows against the source text. If any quote has been reworded, restate the instruction more forcefully (\"copy verbatim, character for character\") rather than trusting it the second time.",
    },
    markdown: `# Signal log

One row per distinct quote. Never edit the words.

| Date | Source | Quote (verbatim) | Label | User type | Severity 1-5 |
|---|---|---|---|---|---|
|  |  |  |  |  |  |

Label vocabulary (fix this before you start, 8 to 10 max):
1.
2.
3.
4.

Rules:
- One row per quote, not per person.
- Copy the quote exactly, misspellings and all.
- Severity measures how much it blocks value, not how angry it sounds.
- Guess user type if you must, but write "guessed" next to it.
`,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "opportunity-tree",
    title: "The opportunity tree, on one page",
    blurb:
      "Outcome, opportunity, solution, experiment. The map from what you're chasing down to what you're testing this week.",
    when: "When the roadmap is a list of features nobody can explain the reason for, and it needs reconnecting to an outcome.",
    useIn: 40,
    level: "02",
    sections: [
      {
        heading: "Outcome",
        purpose:
          "The business result you're accountable for, not a feature.",
        ask: "What metric are you trying to move, and by when?",
        example:
          "Grow week-4 retention of new Sona signups from 22 percent to 30 percent by end of Q3.",
        trap: "Writing a feature as the outcome, like \"ship budgeting alerts.\" An outcome is a number that moves. A feature is a guess at how to move it.",
      },
      {
        heading: "Opportunities",
        purpose:
          "The needs and pain points that, if addressed, would move the outcome. Plural, because there's more than one path.",
        ask: "List the specific problems standing between users and the outcome. One per line, each traceable to evidence.",
        example:
          "1. Users who never link a bank in week 1 almost never return in week 4 (Ana's cohort data). 2. Users say they \"forgot the app existed\" after week 1 (12 support chats). 3. Users who set a budget in week 1 retain at 41 percent versus 19 percent who don't (Ana's cohort data).",
        trap: "Listing solutions dressed as opportunities, like \"add push notifications.\" Keep asking what problem the user has until the answer isn't already a feature.",
      },
      {
        heading: "Solutions",
        purpose:
          "For the opportunity you're pursuing, the range of ways you could address it, so you don't marry the first idea.",
        ask: "For your top opportunity, list at least two different ways to address it before picking one.",
        example:
          "For \"never link a bank in week 1\": (a) make bank linking mandatory in onboarding, (b) send a day-2 nudge if no bank is linked, (c) show a progress bar that stays visibly incomplete until a bank is linked.",
        trap: "Writing one solution because it's the one someone already wanted to build. The tree only earns its name if there's more than one branch at every level.",
      },
      {
        heading: "Experiment",
        purpose:
          "The smallest test that tells you whether the chosen solution actually moves the opportunity, before you build the full version.",
        ask: "What's the cheapest way to learn whether this solution works, and what result would make you build it for real?",
        example:
          "Send the day-2 nudge to 50 percent of new signups for two weeks. If 7-day bank-linking rate rises more than 5 points against the control, build the full nudge sequence.",
        trap: "Skipping straight to a full build because the experiment feels like extra work. The two week nudge test costs a day. The wrong full build costs a quarter.",
      },
    ],
    rules: [
      "One outcome per tree. Three outcomes means three trees.",
      "At least two opportunities and two solutions before you commit to a branch.",
      "Every opportunity needs evidence behind it: a number or a quote.",
      "The experiment needs a number that would kill the solution, not just prove it.",
    ],
    ai: {
      prompt:
        "Here is my outcome metric and a list of raw opportunities gathered from user research or data. Structure this into an opportunity tree: group opportunities that are really the same underlying need, propose at least two candidate solutions for my top opportunity, and suggest the cheapest experiment that would validate or kill each solution before a full build. Flag any opportunity that is actually a disguised solution. Outcome: [your outcome metric]. Opportunities: [paste your list of research findings, quotes, or data points here]",
      trap: "It proposes solutions that are safe, familiar, and already common in the category, because that's the median of its training data. It will not surface the odd, high-leverage idea that only someone who has sat with your users would think of. Treat its list as a floor, not a ceiling.",
    },
    markdown: `# Opportunity tree

## Outcome
The metric you're accountable for, and the date.


## Opportunities
The problems standing between users and that outcome. One per line, each with evidence.

1.
2.
3.

## Solutions
For your top opportunity, at least two different ways to address it.

Opportunity:
(a)
(b)

## Experiment
The cheapest test that would prove or kill the solution.

Test:
Result that means "build it":
Result that means "kill it":
`,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "experiment-brief",
    title: "The experiment brief",
    blurb:
      "The hypothesis, the metric, the sample, and the rule for stopping, all written before the test runs, not after.",
    when: "Before any A/B test or pilot goes live, so the goalposts can't move once the data shows up.",
    useIn: 35,
    level: "02",
    sections: [
      {
        heading: "Hypothesis",
        purpose:
          "States what you believe and why, so success has a definition before there's data to argue about.",
        ask: "If we do X, we believe Y will happen, because Z. Write it in that shape.",
        example:
          "If we add a progress bar to onboarding that stays visibly incomplete until a bank is linked, we believe bank-linking within 24 hours will rise, because Priya's tickets show users don't realise linking is required. They think the app works without it.",
        trap: "Writing the hypothesis after glancing at early results, so it quietly becomes whatever the data already shows. Timestamp the brief and don't touch the hypothesis line again.",
      },
      {
        heading: "Metric and guardrail",
        purpose:
          "The one number that decides the test, plus the number you're watching to confirm nothing else broke.",
        ask: "What's the single primary metric, and what's the guardrail metric that must not get worse?",
        example:
          "Primary: percent of new signups who link a bank within 24 hours. Guardrail: overall onboarding completion must not drop more than 2 points, in case the progress bar makes people feel pressured and quit instead.",
        trap: "Picking a metric only the new feature could move, so there's no way to tell if you helped or just shifted behaviour, and no guardrail, so a quiet regression elsewhere goes unnoticed.",
      },
      {
        heading: "Sample and duration",
        purpose:
          "Decides in advance how long you'll wait and how many people you need, so a promising trend on day 3 doesn't get called early.",
        ask: "What percent of traffic, and for how long, based on your normal weekly signup volume?",
        example:
          "50 percent of new signups, for 14 days. At roughly 800 new signups a week, that's about 1,600 people in the test, enough to detect a 5 point shift in linking rate at the confidence we use for a decision this size.",
        trap: "Peeking daily and stopping the moment the number looks good. Write the stop date in the brief before launch and hold it, even when day 4 looks great.",
      },
      {
        heading: "Stopping rule",
        purpose:
          "What ends the test besides the calendar, especially if something goes wrong.",
        ask: "What result, at what point, ends this early, in either direction?",
        example:
          "If the guardrail drops more than 2 points at any daily check, stop immediately regardless of the primary metric. If the primary metric shows no movement either way by day 10, let it run to day 14 rather than extending further.",
        trap: "Having no rule for stopping early on harm, so a broken variant runs the full two weeks because nobody wants to be the one who calls it.",
      },
      {
        heading: "What would change your mind",
        purpose:
          "Names the result that would make you walk away from this idea, written before you're attached to it.",
        ask: "What result means you don't ship this, rather than iterating on it?",
        example:
          "If linking rate within 24 hours moves less than 2 points either way and the guardrail is flat, we conclude the problem isn't awareness, and we don't ship the progress bar or try a louder version of it.",
        trap: "Only ever writing down what would confirm the idea, so any result gets read as \"promising, let's iterate,\" and the idea never actually dies no matter what the data says.",
      },
    ],
    rules: [
      "Write this before the test launches. Written after, it's a report, not a brief.",
      "One primary metric. If it takes three to tell a good story, there isn't a result.",
      "The stopping rule names a number and a direction, not \"when it feels done.\"",
      "Name what would kill the idea. If nothing would, it isn't a real test.",
    ],
    ai: {
      prompt:
        "Pressure test this experiment brief before I launch it. Check for: (1) a metric only the new feature could move, so I can't tell real impact from noise, (2) a missing guardrail metric that could get worse while the primary metric improves, (3) a stopping rule that doesn't name a specific number and direction, (4) whether I've stated what result would make me abandon the idea rather than iterate on it. Be specific about what's missing, don't just say it looks reasonable. Here's my brief: [paste your draft brief here]",
      trap: "It agrees the hypothesis is well reasoned, because you put the hypothesis and your own reasoning for it in the same prompt, so it's judging your logic by your own premises. Ask it separately, with the reasoning stripped out, to argue the opposite hypothesis, and see if it can build an equally plausible case.",
    },
    markdown: `# Experiment brief

## Hypothesis
If we [change], we believe [metric] will [move], because [evidence].


## Metric and guardrail
Primary metric:
Guardrail metric (must not worsen):


## Sample and duration
Percent of traffic:
Duration:
Expected sample size:


## Stopping rule
Stop early if:
Otherwise, run to:


## What would change our mind
Result that means we don't ship this:

`,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "launch-checklist",
    title: "The launch checklist",
    blurb:
      "Everything that has to be true before a feature goes to everyone, with a name and a date on every line.",
    when: "The week before a feature that's been in flags or beta goes to 100 percent.",
    useIn: 30,
    level: "06",
    sections: [
      {
        heading: "Engineering readiness",
        purpose:
          "Confirms the thing works at full scale, not just for the slice it's been running for.",
        ask: "What has to be true about performance, error rates, and infrastructure before 100 percent, and who confirms it?",
        example:
          "Error rate on the bank-linking endpoint stays under 0.5 percent at 10x current flag traffic in a load test. Dev confirms by Thursday 3pm, two days before the Saturday flip.",
        trap: "Testing at flag scale and assuming it holds at full scale. The flag ran fine at 10 percent because the database connection pool wasn't the bottleneck yet, and nobody finds that out until launch day.",
      },
      {
        heading: "Support readiness",
        purpose:
          "Makes sure the team fielding tickets on day one already knows what changed and what the known issues are.",
        ask: "What does support need to know before this ships, and has someone actually walked them through it?",
        example:
          "Priya's team gets a 20 minute walkthrough of the new bank search on Wednesday, plus three canned responses drafted from the beta's actual tickets. Priya confirms her team is ready by Friday noon.",
        trap: "Dropping a release notes doc in Slack the morning of launch and calling it support readiness. Nobody reads it, and the first ticket becomes a fire drill instead of a known answer.",
      },
      {
        heading: "Data and monitoring",
        purpose: "Confirms someone will notice if it's broken, and how fast.",
        ask: "What dashboard shows this is working, who's watching it in the first 48 hours, and what number triggers a page?",
        example:
          "Ana's dashboard tracks bank-linking success rate and search latency in real time. Ana watches it directly for the first 4 hours after the Saturday flip, then Dev is on call. A drop below 90 percent success for more than 15 minutes pages Dev.",
        trap: "Building the dashboard but nobody is assigned to watch it in the critical first hours, so a regression that started at 9am is discovered at 9am the next day.",
      },
      {
        heading: "Comms and rollback",
        purpose:
          "Decides in advance who says what if it goes wrong, and how fast the thing can be turned off.",
        ask: "Who can pull the flag, how long does that take, and who tells the team if it happens?",
        example:
          "Dev can kill the flag in under 2 minutes from the dashboard. If it's pulled, Maya posts in the all-hands channel within the hour so support isn't blindsided by a feature that silently disappeared.",
        trap: "The flag can technically be reverted, but only by one engineer who's on holiday launch week. The rollback plan exists on paper and nowhere else.",
      },
    ],
    rules: [
      "Every line has a name and a date, not a team name and \"soon.\"",
      "Nothing gets a checkmark from the person who built it. Someone else confirms it.",
      "The rollback plan is tested before launch day, not discovered on launch day.",
      "If a line can't get a real owner and date this week, the launch date is wrong, not the checklist.",
    ],
    ai: {
      prompt:
        "I'm taking a feature from a flagged rollout to 100 percent. Here's what it does and how it's been tested so far. Generate a launch checklist across four areas: engineering readiness (performance and error rates at full scale), support readiness (what the team fielding tickets needs to know), data and monitoring (what dashboard and threshold triggers action), and comms and rollback (who can revert it and how fast). Leave a blank for owner and date on every item rather than filling one in. Feature: [describe what shipped, how it's been tested, and current flag percentage]",
      trap: "It produces a checklist where every line reads \"engineering team\" or \"relevant stakeholders\" instead of a name, because it has no way to know your org chart. A checklist with a role instead of a person is a wish, not a checklist. Replace every role with a name before the meeting where you review it.",
    },
    markdown: `# Launch checklist: [feature]

## Engineering readiness
- [ ] Item ............................ Owner: ....... Date: .......
- [ ] Item ............................ Owner: ....... Date: .......

## Support readiness
- [ ] Item ............................ Owner: ....... Date: .......
- [ ] Item ............................ Owner: ....... Date: .......

## Data and monitoring
- [ ] Dashboard live and checked ....... Owner: ....... Date: .......
- [ ] Alert threshold set .............. Owner: ....... Date: .......

## Comms and rollback
- [ ] Rollback tested, time to revert: .......
- [ ] Who is told if it's pulled: .......

Launch date:
Full rollout percentage target:
`,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "eval-set",
    title: "The eval set",
    blurb:
      "The golden case sheet for an AI feature: the input, what a good answer looks like, how you'd grade it, and the real failure it came from.",
    when: "Before you ship, change the prompt for, or swap the model behind any AI feature.",
    useIn: 50,
    level: "05",
    featured: true,
    sections: [
      {
        heading: "Input",
        purpose:
          "The exact thing the model receives, captured from a real case rather than invented.",
        ask: "What's the real input, word for word, that this case is testing?",
        example:
          "User message to Sona's budgeting assistant: \"why did you tell me I overspent on dining when I only ate out twice this month\"",
        trap: "Writing a clean, well-formed input because it's easier to reason about, when the case that actually broke in production was messy, half a sentence, mixing English and transliterated Hindi. Golden cases have to include the ugly real ones.",
      },
      {
        heading: "Expected behaviour",
        purpose:
          "What a correct answer would do, described concretely enough that two different people would grade it the same way.",
        ask: "What should the model's response actually do here, not just what tone should it take?",
        example:
          "It should check the user's actual dining transactions for the month, name the specific merchants and amounts counted as \"dining,\" and if the category includes something the user wouldn't call dining (a grocery delivery miscategorised), say so rather than defending the total.",
        trap: "Writing the expected behaviour as a vibe, like \"should be helpful and accurate.\" That can't be graded consistently by two different people, which means it can't be graded consistently by a model either.",
      },
      {
        heading: "Rubric",
        purpose:
          "Turns the expected behaviour into a scored checklist, so grading doesn't depend on who's grading.",
        ask: "Break the expected behaviour into 3 to 5 pass or fail checks.",
        example:
          "1. Names the specific transactions counted as dining. 2. Total matches what's actually in the user's ledger for that category. 3. Does not restate the user's question back as the entire answer. 4. Offers to recategorise if a transaction looks miscategorised.",
        trap: "A rubric with one item, \"is the answer correct,\" graded holistically. That's exactly the shape an LLM judge is bad at: a single holistic score rewards a confident, well-written wrong answer over a shorter, hedged right one.",
      },
      {
        heading: "The failure it came from",
        purpose:
          "Ties every golden case back to something that actually broke, so the eval set grows from reality instead of imagination.",
        ask: "What real incident, ticket, or bad output is this case testing for? Link it.",
        example:
          "From ticket 4021: user was told they overspent on dining based on a $340 grocery delivery order auto-tagged \"dining\" because the merchant name contained the word \"kitchen.\" This case checks that the model catches likely miscategorisation instead of trusting the tag.",
        trap: "Writing eval cases from imagination, \"what might a user ask,\" instead of from real failures. Imagined cases test what you already thought of. Real failures test what you didn't.",
      },
    ],
    rules: [
      "Every case traces back to a real transcript, ticket, or incident. No invented cases in the first pass.",
      "The rubric has multiple binary checks, never one holistic score.",
      "Include the messy, malformed, real-world inputs, not the clean ones you'd write yourself.",
      "Re-run the whole set after every prompt or model change, not just the cases you think are affected.",
    ],
    ai: {
      prompt:
        "I'm building an eval set for an AI feature. I'll paste a real transcript or ticket where the model got something wrong. Turn it into a golden case: (1) the exact input as it actually occurred, don't clean it up, (2) expected behaviour described concretely enough that two graders would agree, (3) a rubric of 3 to 5 binary pass or fail checks derived from that expected behaviour, not one holistic score. Flag if my expected behaviour description is too vague to grade consistently. Here's the failure: [paste the real transcript, ticket, or bad output]",
      trap: "Used later as the grader, an LLM judge tends to prefer longer, more hedged, more agreeable answers, and it can prefer its own writing style over a plainer correct one. Spot check its grading against a human on at least 10 percent of cases, especially the ones it scores as borderline.",
    },
    markdown: `# Eval set: [feature]

## Case [number]

**Input** (verbatim, including the messy ones):


**Expected behaviour** (concrete enough that two people would agree):


**Rubric** (binary checks, not one score):
1.
2.
3.
4.

**Source of this case** (ticket, transcript, or incident link):


**Last run result**: pass / fail
**Model or prompt version tested**:
`,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "decision-memo",
    title: "The one page decision memo",
    blurb:
      "What is broken, who it hurts, what you'd do about it, and how you'd know it worked. One page to a founder.",
    when: "When a founder or exec needs to make a call, and a meeting alone won't produce one.",
    useIn: 40,
    level: "01",
    sections: [
      {
        heading: "The problem, with a number",
        purpose:
          "Grounds the whole memo in evidence in the first two sentences, before anyone can skim past it.",
        ask: "What's broken, and what evidence proves it, in the first two sentences.",
        example:
          "We're losing roughly 6 in 10 new signups at email verification, because the code expires in 10 minutes and the median user takes 14 to find it. This shows up as 88 of our last 200 app store reviews and matches the funnel drop from 41 percent to 19 percent completing signup.",
        trap: "Opening with background instead of the problem. If Maya has to read three paragraphs before she knows what's wrong, she'll skim, and skimming means she misses the number that makes the case.",
      },
      {
        heading: "Who it hurts, specifically",
        purpose:
          "Makes the cost concrete instead of abstract, so the decision feels urgent rather than theoretical.",
        ask: "Which users, how many, and what happens to them because of this problem.",
        example:
          "New signups only, roughly 550 people a month at current volume. They download the app, try to verify, fail, and 94 percent never open it again, per Ana's re-engagement data. We're not losing existing customers, we're losing everyone who never became one.",
        trap: "Vague language like \"many users are affected.\" A founder reading a one pager cannot act on \"many.\" They can act on 550.",
      },
      {
        heading: "What I would do",
        purpose:
          "Commits to a specific recommendation, because a memo that lists five options is asking the founder to do your job.",
        ask: "What's the one thing you'd do first, and roughly what does it cost in time?",
        example:
          "Extend the verification code expiry from 10 minutes to 24 hours and add a resend button on the entry screen. Dev estimates two days including testing. I'd ship it this sprint, ahead of the two features currently planned.",
        trap: "Presenting three options with pros and cons for each and no recommendation, which reads as thorough but is actually a way to avoid being wrong. Pick one and say why.",
      },
      {
        heading: "How you'd know it worked",
        purpose:
          "Names the metric that proves the decision right or wrong, so there's an actual verdict later instead of a vague sense that things improved.",
        ask: "What number moves, by when, if this was the right call?",
        example:
          "Signup completion rate rises from 41 percent toward the 65 to 70 percent range we see in comparable steps, within two weeks of shipping. I'll report back on the 14th.",
        trap: "No follow up date, so the memo becomes a one time event instead of a claim that gets checked. Put a date on your own accountability, not just the ask.",
      },
    ],
    rules: [
      "One page. Needing two means the scope of the decision hasn't been decided yet.",
      "Lead with the problem and the number, not the history of how you found it.",
      "Recommend one thing. A menu of options is a memo that avoids the job.",
      "Name the metric and the date you'll come back and report on it.",
    ],
    ai: {
      prompt:
        "Tighten this one page decision memo to a founder. Check whether: (1) the first two sentences state the problem with a real number, not background, (2) I've named who specifically is affected and how many, not \"many users,\" (3) I recommend one course of action rather than listing options, (4) I've named the metric and date I'll use to prove this was right or wrong. Cut anything that wouldn't change what the founder does next. Here's the draft: [paste your memo draft here]",
      trap: "It smooths the memo into safer, hedged language, \"we might consider exploring,\" because that reads as more careful. A memo that hedges is a memo that asks the founder to also do the deciding. Push back on any sentence it adds that doesn't commit to something.",
    },
    markdown: `# Decision memo: [subject]

## The problem
What's broken, and the evidence, in two sentences.


## Who it hurts
Which users, how many, and what happens to them.


## What I would do
The one recommendation, and roughly what it costs.


## How I'd know it worked
The metric that moves, by when. Follow-up date:


To:
From:
Date:
`,
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "user-interview-guide",
    title: "The user interview guide",
    blurb:
      "A discovery guide built on what people actually did, not what they say they'd do next.",
    when: "Before any round of user interviews, especially the first one on a new problem.",
    useIn: 35,
    level: "02",
    sections: [
      {
        heading: "Screener",
        purpose:
          "Makes sure you're talking to someone who has the actual behaviour you're studying, not someone willing to imagine having it.",
        ask: "What did this person actually do, recently, that qualifies them, not what they say they would do?",
        example:
          "Screen for: linked a bank account in Sona within the last 30 days, and set at least one budget category. Not: \"would you be interested in budgeting features,\" which qualifies anyone who says yes to a hypothetical.",
        trap: "Screening on stated interest (\"are you someone who cares about budgeting\") instead of actual behaviour. Everyone says yes to caring about budgeting. Far fewer have ever set one.",
      },
      {
        heading: "Opening: the last time it happened",
        purpose:
          "Anchors the whole interview in a specific, recent, real event instead of a general opinion.",
        ask: "What's the most recent specific instance of the behaviour you want to understand? Ask them to walk through it.",
        example:
          "Tell me about the last time you set a budget in Sona. Not this week in general, the actual last time. Where were you, what made you open the app right then?",
        trap: "Asking \"how do you usually budget\" instead of \"tell me about the last time.\" \"Usually\" invites a generalised, tidied up answer. \"Last time\" forces a specific memory with the mess still in it.",
      },
      {
        heading: "Follow the friction, not the feature",
        purpose:
          "Keeps the conversation on what actually went wrong or felt hard, rather than drifting into a feature request session.",
        ask: "At each step they describe, ask what almost made them stop, or what they weren't sure about.",
        example:
          "You said you weren't sure which category to pick for that purchase. What did you do? Did you guess, skip it, or go looking for help? What would have told you the answer faster?",
        trap: "Letting the conversation drift to \"what feature would you want,\" which produces a wishlist built from whatever they can imagine, usually a worse version of something they've seen elsewhere, instead of the actual friction in their real workflow.",
      },
      {
        heading: "Never ask about the future",
        purpose:
          "Removes the invitation to speculate. People are unreliable narrators of their own future behaviour and reliable narrators of what they already did.",
        ask: "Reframe any \"would you use X\" question as a question about what they've done in the past that's closest to X.",
        example:
          "Instead of \"would you use an automatic savings feature,\" ask: \"have you ever set up an automatic transfer anywhere, in any app or bank, and if so, why that one, and what stopped you doing it in others.\"",
        trap: "Asking \"would you pay for this\" or \"would you use this\" directly. People are polite and imaginative. They'll say yes to be helpful, and that yes predicts nothing about what they'll actually do.",
      },
      {
        heading: "Close: what happened right after",
        purpose:
          "Captures the immediate consequence of the behaviour, which is often more revealing than the behaviour itself.",
        ask: "What did they do in the minutes or days right after? Did they come back, tell someone, give up?",
        example:
          "After you set that budget, what happened next? Did you check it again? When? What made you check, or what made you forget about it?",
        trap: "Ending the interview at the moment of the action instead of following through to the consequence, which is where you learn whether the feature actually changed behaviour or just produced a one time action that was immediately forgotten.",
      },
    ],
    rules: [
      "Screen on behaviour in the last 30 days, never on stated interest.",
      "Every question should be answerable by describing something that already happened.",
      "Catch yourself asking \"would you,\" and rewrite it as \"have you ever.\"",
      "Book 45 minutes, use 30. The extra time is for the tangent that turns out to matter.",
    ],
    ai: {
      prompt:
        "Turn this research question into an interview guide built on past behaviour. My research question is: [your question, for example \"why do users set a budget once and then never return to it\"]. Draft: a screener based on a specific, checkable action in the last 30 days, not stated interest; an opening question that asks about the most recent specific instance of the behaviour; three to four follow up questions that dig into friction at each step; and flag any question in your draft that asks about future intent so I can rewrite it as a past behaviour question instead.",
      trap: "It defaults to future-facing phrasing, \"would you use,\" \"how interested would you be,\" because that's the common shape of survey and interview questions in its training data. Read every question it gives you and rewrite any \"would you\" into a \"tell me about the last time.\"",
    },
    markdown: `# User interview guide: [research question]

## Screener
Qualifying behaviour in the last 30 days (not stated interest):


## Opening
Tell me about the last time [behaviour happened]. Walk me through it.


## Friction, step by step
At each step: what almost made you stop? What weren't you sure about?

1.
2.
3.

## Past behaviour, not future intent
Instead of "would you use X," ask what they've done closest to X already.


## Close
What happened right after? Did you come back, tell someone, give up?


Duration booked: 45 min. Plan to use: 30 min.
`,
  },
];
