import type { PromptPack } from "./types";

/**
 * Seven packs, one per stage of the job. Each prompt is written to be
 * pasted with a couple of small edits, and each trap names the specific
 * way a model fails at that exact task, not a generic hallucination warning.
 */
export const promptPacks: PromptPack[] = [
  /* ---------------------------------------------------------------------- */
  {
    slug: "discovery",
    stage: "Discovery",
    title: "Discovery prompts",
    blurb: "Research and talking to users, with a model doing the first pass.",
    context:
      "The stage where a vague sense that something's wrong turns into evidence you'd defend in a room.",
    featured: true,
    prompts: [
      {
        title: "Extract structured signal from raw feedback",
        when: "There's a pile of reviews, tickets, or open-text survey responses and it needs sorting before you can say anything defensible about it.",
        text: `You are a research analyst helping a product manager turn raw customer feedback into structured data. You will not summarise, interpret, or paraphrase. You will extract.

For each distinct piece of feedback in the text below, output one row with these exact fields:
- quote: copied character for character, including typos and grammar
- source: where it came from, if stated
- problem_label: pick from this fixed list only: [list your 6 to 10 labels here], or "other" if genuinely none fit
- user_type_guess: new, existing, or churned, with your reasoning in one clause
- severity_1_to_5: how much this blocks the user from getting value, not how angry the tone is

If a single review raises two distinct problems, split it into two rows. Return the result as a table, not prose.

Feedback:
[paste your reviews, tickets, or survey responses here]`,
        trap: "It will summarise when you asked it to extract, folding a specific complaint into a tidy paraphrase, and the exact quote, the detail that would have told you which bug this actually is, is gone. Check the first ten rows against the source text before trusting the rest.",
      },
      {
        title: "Stress test a cluster before you report it",
        when: "A first extraction pass is done and one label holds far more rows than the others, which usually means two different problems got merged.",
        text: `I ran an extraction over customer feedback and got the label below with far more rows attached than any other. I'm going to paste a sample of the actual quotes. Your job is to tell me if this is really one problem or two or more problems that share vocabulary.

For each quote, note what specifically is broken, described as a mechanism (what fails, not how the user feels about it). Then group the quotes into sub-clusters based on the actual mechanism, not the words used to describe it. Tell me if any sub-cluster looks large enough to be its own problem, and name what would separate it from the rest.

Label: [your label]
Quotes:
[paste 15 to 20 quotes from that cluster]`,
        trap: "It tends to agree the cluster is coherent, because the quotes really do share vocabulary, which is exactly the surface signal that caused the merge in the first place. Push it to look at mechanism, not wording, or it will just confirm your first pass.",
      },
      {
        title: "Turn a support inbox into a jobs to be done statement",
        when: "There are weeks of support tickets about one area and the underlying need has to come out of them, not just the list of complaints.",
        text: `You are helping me write a jobs to be done statement from support tickets. A JTBD statement has this shape: "When [situation], I want to [motivation], so I can [expected outcome]." It describes the underlying need, not a feature.

Read the tickets below. Identify the situation that keeps recurring (not the bug, the moment in the user's life when they reach for this), the motivation underneath it, and the outcome they're actually trying to reach. Draft three candidate JTBD statements ranked by how many tickets they explain. For each, name a ticket that fits well and one that doesn't quite fit, so I can see the edges of the statement.

Tickets:
[paste 20 to 30 support tickets from the same area]`,
        trap: "It writes a JTBD statement shaped like a feature request wearing the JTBD template, for example \"I want to link my bank so I can budget,\" which just restates the feature. Push back until the situation and outcome could be true even if your product didn't exist yet.",
      },
      {
        title: "Draft a screener from a research question",
        when: "Recruiting for a round of interviews, when it's tempting to screen on who says they're interested rather than who actually did the thing.",
        text: `I'm recruiting for user interviews on this research question: [your research question].

Draft a screener survey of 5 to 7 questions that qualifies people based on specific, checkable actions they've taken in the last 30 days, never on stated interest or hypothetical willingness. Each question should have a factual answer I could verify against our product data if I had access to it (a date, a count, a specific action taken).

After the questions, list the answer combinations that would qualify someone, and flag any question in your draft that is actually asking about interest or intent rather than a past action, so I can rewrite it.`,
        trap: "It drifts into intent-based screening despite the instruction, phrasing a question like \"how likely are you to use budgeting features\" because that's the default shape of a screener in its training data. Read every question and confirm it has a factual, checkable answer, not an opinion.",
      },
      {
        title: "Build an interview guide anchored to past behaviour",
        when: "A guide is drafted but keeps sliding into asking people what they'd want next instead of what they actually did.",
        text: `Help me turn this research question into an interview guide built entirely on past behaviour: [your research question].

Structure it as:
1. An opening question asking about the single most recent specific instance of the behaviour, not "usually."
2. Three to four follow up questions that dig into friction or hesitation at each step of that instance.
3. A closing question about what happened immediately after, to capture the real consequence.

Do not include any question phrased as "would you," "how interested are you," or "what would make you." If you catch yourself about to write one, rewrite it as a question about something that has already happened.`,
        trap: "It defaults to future-facing phrasing anyway, because that's the common shape of interview questions online, and slips one or two \"would you\" style questions in even after the instruction. Read the final guide line by line and rewrite any question you could answer with an opinion instead of a memory.",
      },
      {
        title: "Simulate a skeptical stakeholder before the readout",
        when: "Before presenting research findings to the team, to find the holes in the argument while it's still just you and a draft.",
        text: `You are a skeptical engineering lead at a 40 person startup. You have seen research readouts before that overclaimed based on a handful of interviews, and you will not accept a claim just because it's stated confidently. You will ask about sample size, about whether the researcher is hearing what they wanted to hear, and about what evidence would have to exist for the opposite conclusion to be true.

I'm going to give you my research findings and how many people I talked to. Ask me the three hardest questions a genuinely skeptical person in the room would ask, one at a time, and wait for my answer before asking the next. Do not soften your questions to be encouraging.

Findings: [paste your summary of what you found and how many people you spoke with]`,
        trap: "Left to run freely it turns encouraging after your first answer, congratulating you instead of pushing further. Tell it explicitly not to concede until your answer addresses the specific concern, and to ask all three questions regardless of how good the first answer sounds.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "analysis",
    stage: "Analysis",
    title: "Analysis prompts",
    blurb: "Turning evidence into a claim you'd defend in a room.",
    context:
      "The stage between having a spreadsheet of signal and having one sentence you'd say to the founder.",
    featured: true,
    prompts: [
      {
        title: "Turn a signal log into ranked claims",
        when: "The signal log is full but nobody could tell you the top three problems from looking at it.",
        text: `I'm going to paste a table of customer feedback: one row per quote, with a problem label, a severity score, and a user type. Turn this into a ranked list of claims a product manager could defend to a founder.

For each distinct label, calculate: row count, average severity, and how many rows are from new versus existing versus churned users. Rank the labels by a combined score of reach (row count) and severity, and for the top three, write a one sentence claim in this exact shape: "[X percent / X out of Y] of [feedback type] describe [problem], most severely for [user type], for example: '[a real quote from the data]'."

Do not round the numbers in a way that makes the claim sound stronger than the data supports.

Data:
[paste your signal log]`,
        trap: "It writes the claim using a rounded, cleaner number than the data actually supports, turning 57 out of 103 into \"over half,\" which is technically true but hides how close it is to half. Ask for the exact fraction alongside any rounded language.",
      },
      {
        title: "Pressure test a hypothesis before you commit to it",
        when: "There's a theory about why a metric moved and it's about to be written down as a finding.",
        text: `I have a hypothesis about why a metric changed. I'm going to give you the hypothesis and the data behind it. Do not evaluate whether my reasoning is internally consistent. Instead, generate two alternative explanations for the same data that I have not considered, and for each, describe what additional evidence would distinguish it from my hypothesis.

Then tell me: based only on the data I've given you, could someone reasonably prefer one of your alternative explanations over mine? If so, say which one and why.

My hypothesis: [state your hypothesis]
The data: [paste the data or describe what you observed]`,
        trap: "Given the hypothesis and the data together, it tends to agree with the hypothesis, because you supplied the reasoning that connects them and it evaluates the data through that frame rather than independently. Get a genuinely separate read by asking for alternative explanations before it sees your reasoning, not after.",
      },
      {
        title: "Separate correlation from a real driver in a cohort",
        when: "Two things moved together in the data and it's tempting to call one the cause of the other.",
        text: `I have a cohort finding: [describe the correlation, for example "users who set a budget in week 1 retain at 41 percent versus 19 percent for those who don't"]. Help me think through whether this is likely to be causal or a shared cause behind both.

List at least two plausible reasons this correlation could exist without budget-setting causing retention (for example, a third trait that makes someone both more likely to set a budget and more likely to stick around). For each, suggest what data I would need to check to rule it in or out, using only data a small startup's analytics could realistically produce, not an idealised experiment.

End with a plain statement of how confident I should be in a causal read given only what I currently have.`,
        trap: "It often hedges so heavily that the answer becomes useless, listing every possible confound without weighing which one is actually plausible given your product. Ask it to name the single most likely alternative explanation, not just list all of them evenly.",
      },
      {
        title: "Write the counter-argument to your own conclusion",
        when: "Before a decision memo goes out, to see if the recommendation survives contact with the strongest objection.",
        text: `Here is a conclusion I've reached and the evidence behind it. Argue against it as persuasively as you can, using only the evidence I've given you plus reasonable inferences, not invented data. Do not soften the counter-argument to be polite. Assume you are a colleague who genuinely disagrees and has to convince a skeptical founder.

After the counter-argument, tell me honestly: does my original evidence hold up against it, or does the counter-argument expose a real gap I should address before I send this?

My conclusion: [state it]
My evidence: [summarise or paste it]`,
        trap: "It builds a counter-argument that sounds sharp but is actually just restating uncertainty in general terms (\"correlation isn't causation,\" \"sample size may be small\"), rather than engaging with your specific evidence. Ask it to name the single strongest specific objection, not a list of generic ones, and check whether that specific objection is actually true of your data.",
      },
      {
        title: "Check a metric for how easily it's gamed",
        when: "A new metric is being considered as the thing a team gets evaluated on.",
        text: `I'm considering [metric] as a metric a team will be evaluated on. Help me stress test it before we commit to it.

List the ways someone could improve this number without improving the thing it's meant to represent, being specific to how our product actually works, not generic gaming strategies. For each way, suggest a counter-metric that would catch it, something we could realistically track alongside the primary metric without much extra instrumentation.

Then tell me: of the gaming strategies you listed, which is the one a team under quarterly pressure would most likely reach for first, and why that one specifically.

Metric: [your metric]
Context on how the product works: [brief description]`,
        trap: "It generates generic gaming strategies that could apply to almost any metric (\"could focus on short term over long term\") instead of ones specific to your product's actual mechanics. Push for a gaming strategy that only makes sense given how your specific feature or flow works.",
      },
      {
        title: "Summarise a dataset without losing the outlier that matters",
        when: "A dataset has been analysed and needs to go into a memo, but the summary keeps flattening the one weird result that's actually the story.",
        text: `I'm going to paste a data summary or set of numbers. Write a two to three sentence summary of the overall pattern, and separately, in its own paragraph, describe the single most surprising or largest deviation from that pattern, even if it's a small subgroup. Name it specifically: which segment, what number, how far it departs from the average.

Do not fold the outlier into the overall summary as a caveat. Give it its own space, because it's often the more important finding than the average.

Data: [paste your numbers or summary]`,
        trap: "It averages the outlier into the general summary as a footnote or caveat clause, which is exactly how the most useful finding in a dataset gets buried. Read the summary and check whether the biggest number in the data actually appears as its own sentence, not folded into a range.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "spec",
    stage: "Spec",
    title: "Spec prompts",
    blurb: "Writing it down so it survives contact with engineering.",
    context:
      "The stage where a decision becomes a document specific enough that two people would build the same thing from it.",
    prompts: [
      {
        title: "Draft acceptance criteria that could actually fail",
        when: "A feature description exists but the acceptance criteria are still vague enough that two engineers would build different things.",
        text: `I'm going to describe a feature. Write acceptance criteria as a numbered list, where every single criterion is something a QA tester could concretely fail: it names a specific input, a specific expected output, and where relevant a measurable threshold (a time limit, a count, an error rate).

Do not write a criterion using words like "should feel," "intuitive," "smooth," or "graceful" unless you immediately follow it with the concrete, testable condition that word is standing in for. If you can't make a criterion concrete, flag it as a question for me rather than writing a vague version.

Feature: [describe the feature]`,
        trap: "Asked for acceptance criteria, it produces some that read as specific but are actually untestable, like \"errors are handled gracefully,\" because that phrase sounds concrete without naming an actual condition. Read every criterion and ask what a tester would type in a bug report to prove it false. Rewrite any you can't answer for.",
      },
      {
        title: "Find the missing non-goal",
        when: "A PRD's scope section only lists what's being built, and the review meeting is where scope creep usually starts.",
        text: `Here is a PRD's problem statement and proposed solution. Based on how similar features usually expand during a build, list 5 to 8 specific adjacent things someone on the team might reasonably assume are included, but that are not explicitly stated as in scope.

For each one, phrase it as a non-goal statement I could add directly to the document, for example "Out of scope: [specific thing], because [one clause reason]." Prioritise the ones most likely to come up in the first engineering review meeting, not the most exotic edge cases.

Problem and solution: [paste your PRD's problem and solution sections]`,
        trap: "It lists non-goals that are too obvious to need stating (\"out of scope: rewriting the entire app\") instead of the genuinely tempting adjacent scope a team would actually reach for mid-sprint. Push it to name the non-goal that someone on your specific team would actually raise in a planning meeting.",
      },
      {
        title: "Turn a Slack thread into a first draft PRD",
        when: "A decision got made across forty messages in a thread and now it needs to exist as one document.",
        text: `Below is a Slack thread where a product decision was worked out in conversation. Turn it into a first draft one page PRD with four sections: Problem (with any evidence mentioned in the thread), Solution and non-goals, Acceptance criteria, Rollout and risk.

Only include claims that are actually supported by something said in the thread. Where the thread doesn't settle a question needed for one of these sections, write "OPEN QUESTION:" followed by what needs deciding, instead of inventing an answer.

Thread:
[paste the Slack thread]`,
        trap: "It fills gaps in the thread with plausible-sounding specifics that were never actually said, quietly turning an unresolved question into a stated decision. Search the draft for every specific number or decision and confirm it actually appears in the thread, not just something reasonable the thread implies.",
      },
      {
        title: "Write the edge cases a happy-path spec is missing",
        when: "A spec describes the feature working correctly and hasn't yet described what happens when something goes wrong.",
        text: `Here is a feature spec that describes the intended, working behaviour. List the edge cases and failure states it doesn't address: empty input, a duplicate submission, a slow or failed network call, a user who does the steps out of order, and a user who already has the end state this feature is meant to create.

For each edge case, propose the specific behaviour rather than just naming that it's missing, so it can be added directly to the acceptance criteria.

Spec: [paste your spec]`,
        trap: "It surfaces generic edge cases (\"handle network errors\") without specifying what should actually happen, leaving the same ambiguity the exercise was meant to remove. Push it to state the exact behaviour for each case, in the same testable format as your other acceptance criteria.",
      },
      {
        title: "Translate a spec into a QA test plan",
        when: "The spec is done and needs to become something a tester can actually execute against, not just read.",
        text: `Turn this spec's acceptance criteria into a QA test plan. For each criterion, write: the exact steps to reproduce, the expected result, and one variant of the input that's likely to break it if the implementation is subtly wrong (a boundary value, an unusual but valid input, a repeat of the same action).

Format as a table: Test ID, Steps, Expected result, Notes. Do not write a test that just restates the acceptance criterion as a question; write the actual steps a person would follow with the actual product.

Spec: [paste your acceptance criteria]`,
        trap: "It writes tests that just rephrase the acceptance criterion (\"verify search is fast\") instead of concrete, repeatable steps a tester could follow without asking you what to do. Check that each row could be handed to someone who has never seen the spec and still be executable.",
      },
      {
        title: "Size the spec before you commit to a sprint",
        when: "Before a spec goes into planning, to catch the parts that will blow the estimate before an engineer has to say so out loud.",
        text: `Here is a feature spec. Without giving me a time estimate (you don't know our codebase), identify which parts of this spec are likely to be the most expensive to build, based on common patterns: anything touching data migration, anything requiring a new third party integration, anything with a real-time or performance requirement, and anything that changes an existing, already-shipped flow rather than being purely additive.

For each expensive-looking part, suggest a smaller first version that would let us ship and learn before committing to the full scope.

Spec: [paste your spec]`,
        trap: "It sometimes still guesses at time estimates despite the instruction, stating a number of days or sprints with false confidence and no visibility into your actual codebase or team. Ignore any estimate it gives and use only the qualitative flags: what's expensive in kind, not in days.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "design",
    stage: "Design",
    title: "Design prompts",
    blurb: "Interface, flows, and the copy that sits inside them.",
    context:
      "The stage where a decision becomes something a user actually sees and has to understand in three seconds.",
    prompts: [
      {
        title: "Generate flow alternatives before committing to one",
        when: "A first flow sketch exists and it's worth checking whether it's actually the best shape before it goes to design.",
        text: `I'm designing a flow for [describe the task the user is trying to complete, for example "linking a bank account during onboarding"]. Here is my first draft of the steps.

Propose two alternative structures for the same flow: one that reduces the number of screens even if each screen does more, and one that spreads the same information across more, simpler screens. For each alternative, name the specific tradeoff against my draft (what gets easier, what gets harder, and for which kind of user).

Do not just praise my draft or declare one alternative universally better. State the actual tradeoff for each.

My draft flow: [list your steps]`,
        trap: "It tends to declare the version with fewer steps unambiguously better, because \"fewer steps\" is a common shorthand for good UX in its training data, even when a single dense screen is actually harder for a first-time user than three simple ones. Ask it explicitly what kind of user each alternative is better for.",
      },
      {
        title: "Write microcopy for an error state, and check it against the real cause",
        when: "An error state needs copy and the draft keeps coming out either too technical or too vague to help.",
        text: `I need microcopy for an error state. Here is exactly what caused the error, technically. Write three versions of the message: one that names the specific cause in plain language, one that focuses only on what the user should do next, and one that combines both in under 15 words.

For each version, tell me what information is lost by keeping it short, so I can decide deliberately rather than by accident.

Do not write a message that could apply to more than one actual cause. If the message would be true regardless of what broke, it's too generic.

Technical cause: [describe exactly what failed and why]`,
        trap: "It writes copy that's technically true but generic enough to apply to five different failures (\"something went wrong, please try again\"), which gives the user no actual information and gives support no clue what happened either. Check the message against the specific cause: could it be reused verbatim for a different error? If yes, it's too generic.",
      },
      {
        title: "Critique a flow the way a first-time user would experience it",
        when: "Before user testing, to catch the obvious confusion a team that built the flow can no longer see.",
        text: `You have never seen this product before and you don't know what any of the following screens are for beyond what's on them. I'm going to describe each screen in a flow in order. After each one, tell me: what you think happens if you tap the most obvious button, what you're unsure about, and what you'd expect to see next that isn't mentioned.

Do not use any knowledge of how similar apps typically work to fill in gaps. React only to what's actually described, the way someone with no context would.

Screen 1: [describe what's on it]
Screen 2: [describe what's on it]
(continue for each screen)`,
        trap: "It quietly fills gaps using knowledge of how similar apps conventionally work, so it \"understands\" an unlabelled icon because it's seen that icon in a thousand other apps, when your actual first-time user might not. Re-ask what a specific element does whenever the answer seems to rely on convention rather than what you described.",
      },
      {
        title: "Check a design against accessibility basics",
        when: "Before a screen ships, as a first pass check before or alongside a real accessibility review.",
        text: `Here is a description of a screen: its layout, its text, its colour choices, and its interactive elements. Check it against these specific things and flag any that are unclear or likely to fail: whether interactive elements are described with a clear label and not just an icon or colour, whether any information is conveyed by colour alone, whether text size and contrast are specified anywhere, and whether the tab or focus order makes sense given the layout.

For anything you can't determine from my description because I haven't specified it, say so explicitly rather than assuming it's fine.

Screen description: [describe the layout, text, colours, and interactive elements]`,
        trap: "It marks things as fine by assuming reasonable defaults you never actually specified, for example assuming adequate colour contrast because you didn't mention a problem with it. Treat every \"assumed fine\" as actually unknown, and verify the specifics (hex values, actual focus order) separately.",
      },
      {
        title: "Name the flow's actual decision points",
        when: "A flow feels overcomplicated and it's not obvious which steps are genuinely necessary decisions versus just extra screens.",
        text: `Here is a flow, step by step. For each step, classify it as one of: a decision the user must actually make (the outcome depends on their input), a confirmation of something already decided, or pure information with no input required.

Then tell me: of the steps you classified as decisions, which ones could actually be defaulted or inferred from data we already have, removing the need for the user to decide at all. Be specific about what data would need to exist for the default to be safe.

Flow: [list your steps]`,
        trap: "It's cautious about recommending defaults, flagging almost every decision as \"necessary\" because removing a choice feels riskier to suggest than keeping it, even when the data to default it safely clearly exists. Push it to commit to at least one real recommendation to remove, not just flag risk.",
      },
      {
        title: "Turn a wireframe description into a written flow spec",
        when: "A flow exists as sketches or a Figma link that design understands, but engineering needs it written down step by step.",
        text: `I'm going to describe a wireframe screen by screen, including what's on each screen and what each interactive element does when tapped. Turn this into a written flow spec: a numbered sequence of states, where each state lists what's visible, what actions are available, and exactly which state each action leads to.

Explicitly name any screen that can be reached from more than one previous state, and any action whose destination I haven't specified, so I can fill those in rather than have you guess at them.

Wireframe description: [describe each screen and its interactive elements]`,
        trap: "It fills in an unspecified destination with a plausible guess instead of flagging it, so the written spec looks complete when it's actually hiding an undecided branch. Search the output for every transition and confirm each one traces back to something you actually described, not an inference.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "build",
    stage: "Build",
    title: "Build prompts",
    blurb: "Shipping it, and catching what breaks on the way.",
    context:
      "The stage where the spec becomes code, and a model is doing real work alongside the team, not just talking about it.",
    featured: true,
    prompts: [
      {
        title: "Write a test plan from a diff, not just a description",
        when: "A pull request is up and needs a test plan that actually covers what changed, not a generic checklist.",
        text: `I'm going to paste a code diff and a one line description of what it's meant to do. Write a test plan that covers: the intended behaviour described, at least one edge case that this specific diff could plausibly get wrong (based on what actually changed in the code, not generic edge cases), and one check that the change didn't affect a nearby piece of behaviour that wasn't meant to change.

Do not write generic test items like "test the happy path" without stating what the happy path actually is for this specific change.

Description: [one line on what this is meant to do]
Diff: [paste the diff]`,
        trap: "It writes edge cases that sound plausible for the feature in general but aren't actually implied by what changed in the diff, because it's pattern matching on the feature description rather than reading the code. Check that each edge case it names traces back to a specific line or condition in the diff.",
      },
      {
        title: "Explain a bug to support before engineering has time to",
        when: "A bug is confirmed and fixed or in progress, and support needs to answer tickets about it today, in plain language, before the postmortem exists.",
        text: `Here is a technical description of a bug: what broke, why, and what the fix does. Write a two to three sentence explanation support could use to answer a customer, in plain language with no jargon, that is accurate about what happened without overpromising on timeline if the fix isn't live yet.

Then write a separate one sentence internal note for the support lead with the technical detail support agents don't need but might want to have on hand for an escalation.

Technical description: [describe the bug and the fix]`,
        trap: "It smooths the explanation into something reassuring but slightly inaccurate, for example implying the fix is already live when it's still in review, because reassuring language is the default register for customer-facing copy. Check every claim about timing or status against what's actually true right now.",
      },
      {
        title: "Draft a flag rollout plan with real percentages and dates",
        when: "A feature is ready to go behind a flag and the rollout plan is still just \"ship it gradually.\"",
        text: `I'm rolling out [feature] behind a flag. Our current relevant traffic is roughly [your number] per day/week. Draft a staged rollout plan: specific percentages at each stage, how long to hold at each stage before moving to the next, and the specific metric and threshold that would pause or reverse the rollout at each stage, not just at the end.

Base the hold durations on getting enough volume at each stage to notice a real problem, not on a fixed number of days regardless of traffic.

Feature and what it changes: [describe it]
Guardrail metric: [your metric]`,
        trap: "It defaults to generic, round stage percentages and durations (10 percent for a week, 50 percent for a week) regardless of your actual traffic volume, which can mean a genuinely risky stage runs on far too little data to catch a problem, or a safe stage runs far longer than needed. Check that each stage's duration is justified by your actual volume, not just a round number.",
      },
      {
        title: "Turn a stack trace into a plain-language incident note",
        when: "Something broke in production and a note needs to go out to non-engineers before the full postmortem is written.",
        text: `Here is a stack trace and a brief description of what engineering found. Write a plain-language incident note for the rest of the team: what broke, roughly since when, who was affected (which users or what percentage, if known), what's been done so far, and what's still unknown.

Explicitly separate what is confirmed from what is still a hypothesis. Do not present a working theory as a confirmed cause.

Stack trace and engineering notes: [paste them]`,
        trap: "It reads confidence into the engineering notes that isn't actually there, presenting a working theory (\"looks like it's the connection pool\") as a stated fact in the incident note, because confident language reads better than hedged language. Check every causal claim in the note against whether it was actually confirmed or just suspected in your source material.",
      },
      {
        title: "Review a PR description for a claim it doesn't actually support",
        when: "Before approving a pull request, to check whether the description actually matches what the diff does.",
        text: `Here is a pull request description and the diff it describes. Check whether every claim in the description is actually supported by the code: if it says a case is handled, confirm the diff handles it; if it says something is unchanged, confirm nothing in the diff touches it.

List any claim in the description that the diff doesn't clearly support, and any change in the diff that isn't mentioned in the description at all.

Description: [paste the PR description]
Diff: [paste the diff]`,
        trap: "It tends to take the PR description at face value and match the diff to it loosely, confirming a claim as \"supported\" when the diff only partially addresses it. Ask it specifically to quote the line of the diff that supports each claim, not just say whether it seems supported.",
      },
      {
        title: "Draft release notes that name the actual behaviour change",
        when: "A feature or fix shipped and the release notes draft has turned vague enough that nobody could tell what actually changed for them.",
        text: `Here is a technical description of what changed in this release. Write release notes for users in one to two sentences per change, each one naming the specific, observable behaviour difference (what they'll see or be able to do now that they couldn't before), not the internal reason for the change.

For any change that's purely internal and has no user-visible effect, say so and suggest leaving it out of user-facing notes entirely rather than writing a vague sentence about it.

Changes: [list what changed, technically]`,
        trap: "It writes a technically accurate but vague sentence for an internal change instead of recommending it be left out, producing a release note that says something changed without saying what a user would actually notice. Cut any line where you can't picture a specific screen or moment where a user would see the difference.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "launch-growth",
    stage: "Launch & growth",
    title: "Launch and growth prompts",
    blurb: "Getting a feature in front of everyone, and reading what happens next.",
    context:
      "The stage where a decision meets the whole user base at once, and the metrics either confirm it or they don't.",
    prompts: [
      {
        title: "Write launch comms that name the actual change",
        when: "A feature is going to 100 percent and the announcement (in-app, email, or changelog) needs to say something real.",
        text: `Here is what this feature actually does, technically and in terms of what a user can now do that they couldn't before. Write three versions of a launch announcement: an in-app banner (under 20 words), a changelog entry (2 to 3 sentences), and an email (under 100 words with a single clear action).

Each version should name the specific, concrete thing that changed for the user. None should use "exciting," "new and improved," or similar language that doesn't tell the reader what actually changed if they skip the rest of the sentence.

What changed: [describe it plainly]`,
        trap: "It reaches for enthusiastic, vague marketing language as a default register (\"we're bringing you a smarter, more seamless experience\") that survives even after the instruction to avoid it, because that phrasing is extremely common in its training data for this exact task. Read the first five words of each version alone. If they don't say what changed, rewrite.",
      },
      {
        title: "Read a metric move for what it's actually telling you",
        when: "A metric moved after a launch and it's tempting to declare victory or defeat before checking what's actually behind the number.",
        text: `Here is a metric before and after a launch, plus context on what else was happening at the same time (other launches, seasonality, marketing pushes, anything relevant). Before concluding this launch caused the move, list what else could plausibly explain it, and for each, state whether the timing and magnitude of the move is more consistent with the launch or with the alternative.

Then give me a plain statement: how confident should I be that this launch specifically caused this move, and what additional data would raise that confidence.

Metric: [before, after, and dates]
Other context: [anything else happening in the same window]`,
        trap: "It treats the launch as the default explanation and other factors as afterthoughts to rule out, rather than weighing them evenly, because you framed the launch first. Ask it to independently rank all the plausible explanations by how well each one's timing matches the data, not just check the launch off first.",
      },
      {
        title: "Draft a win-back message grounded in why people actually left",
        when: "A win-back campaign is being planned and the draft keeps being generic because the actual reason people churned hasn't been named.",
        text: `Here is data or research on why users in this segment actually churned: [paste your churn reasons, quotes, or data]. Write a win-back message that addresses the specific reason, not a generic "we miss you" message.

Write two versions: one that leads with what's changed since they left (if something has), and one that asks a single question to find out if their specific reason for leaving has been resolved for them, without assuming it has.

Do not write a message that would make sense for someone who churned for a completely different reason. If the message is generic enough to send to any churned user, it needs to be more specific.`,
        trap: "It defaults to a generic re-engagement tone regardless of the specific churn reason you gave it, because \"we miss you, here's what's new\" is the dominant pattern for this task type. Check whether the message would need to change at all if you swapped in a different churn reason. If it wouldn't, it's too generic.",
      },
      {
        title: "Check a growth loop for where it actually breaks",
        when: "A growth loop (referral, viral, content) exists on paper and it's worth checking where the actual drop-off is before investing more in it.",
        text: `Here is a growth loop described step by step: [describe each step, for example "user completes a budget, sees a shareable summary card, shares it, a friend clicks the link, a friend signs up"]. For each step, estimate what would have to be true for that step to have a high completion rate, and flag which step is most likely to be the actual bottleneck based on how these kinds of steps typically perform, and why.

Then suggest, for the step you flagged, two ways to test whether that's really where the loop breaks, using only data we could plausibly already have or cheaply add, not a large new build.

Loop: [describe your loop]`,
        trap: "It flags the most commonly cited bottleneck for that type of loop in general (for example, \"share to click\" is a well known drop-off point) without adjusting for anything specific about your actual product or flow. Ask it to name what's specific about your version of this step that would make its estimate wrong.",
      },
      {
        title: "Segment a metric before declaring it moved",
        when: "An overall metric held steady or moved slightly, but there's a suspicion it's actually two different stories cancelling out.",
        text: `Here is an overall metric that stayed roughly flat after a change. Before concluding the change had no effect, suggest 3 to 4 ways to segment the user base that might reveal it moved differently in different groups and cancelled out overall (for example, by signup cohort, by platform, by whether they'd already done the related action before the change).

For each segmentation, state what result would suggest the change actually worked for a subgroup even though the top-line number looks flat.

Metric and change: [describe what changed and the overall metric result]`,
        trap: "It suggests generic segmentation axes (platform, geography) without connecting them to why this specific change might affect groups differently, producing a checklist rather than a reasoned hypothesis. Push it to explain, for each segment it suggests, the specific mechanism by which this change would affect that group differently.",
      },
      {
        title: "Write the post-launch retro prompt",
        when: "Two weeks after a launch, before memory of the actual decisions fades into a vague sense of how it went.",
        text: `Help me run a post-launch retro for [feature]. Here is what we predicted would happen (the hypothesis and target metric) and what actually happened (the real numbers).

Write five specific questions for the retro that compare the prediction to the actual result, not generic questions like "what went well." At least one question should address what we'd do differently in the experiment design itself if we ran this again, and at least one should address whether the stopping rule or guardrail we set in advance actually got used the way we planned.

Prediction: [your original hypothesis and target]
Actual result: [what happened]`,
        trap: "It writes generic retro questions (\"what went well, what didn't\") that could apply to any launch, rather than questions that reference your actual prediction and actual number. Check that each question would be impossible to answer without knowing the specific numbers from this launch.",
      },
    ],
  },

  /* ---------------------------------------------------------------------- */
  {
    slug: "career",
    stage: "Career",
    title: "Career prompts",
    blurb: "Portfolio, interviews, and surviving the first ninety days somewhere new.",
    context:
      "The stage where the work you did has to become a case someone else can evaluate in twenty minutes.",
    prompts: [
      {
        title: "Turn a project into a portfolio case study",
        when: "A finished piece of work needs to become something a hiring manager can read in five minutes and actually understand.",
        text: `I'm going to describe a product project I worked on: the situation, what I did, and the outcome. Help me turn this into a portfolio case study structured as: the problem (with a number if I have one), my specific role and what I actually decided versus what others decided, the approach I took and why, the outcome, and what I'd do differently now.

Be specific about pushing back on vague ownership claims: if I describe something as "we decided," ask me whether it was actually my call, and if it wasn't, help me phrase my actual contribution honestly rather than inflating it.

Project: [describe the situation, what you did, and the outcome]`,
        trap: "It happily accepts and even sharpens an inflated ownership claim, turning \"I was involved in the decision\" into confident first-person language like \"I decided,\" because that reads as a stronger case study. Read the draft back and mark every claim of ownership that a former teammate could dispute if asked.",
      },
      {
        title: "Rehearse a behavioural interview answer against the actual question asked",
        when: "Before an interview, to check whether a prepared story actually answers the specific question rather than a nearby one.",
        text: `The interview question is: [paste the exact question, for example "tell me about a time you disagreed with an engineering lead"]. Here is my draft answer.

Check whether my answer actually addresses this specific question or a nearby, easier one (for example, answering "tell me about a disagreement" with a story about a disagreement you didn't actually have to resolve, or where the other person just came around on their own). Point out the exact sentence where my answer drifts, if it does.

Then ask me one follow up question an interviewer would likely ask to probe the weakest part of my answer.

Question: [paste it]
My draft answer: [paste it]`,
        trap: "It's generous about whether the answer fits the question, treating an adjacent story as close enough because the topic overlaps, when an actual interviewer would notice the story didn't require you to do anything hard. Ask it explicitly to name the exact skill or tension the question is testing for, and check if your story actually demonstrates that, not just a related topic.",
      },
      {
        title: "Draft a 30-60-90 day plan grounded in what you don't yet know",
        when: "Before starting a new role, when a generic 30-60-90 template would say nothing specific to the actual company.",
        text: `I'm starting as a PM at [type of company, stage, and what little I know about the product]. Instead of a generic 30-60-90 day plan, help me draft one built around the specific things I don't know yet and need to learn before I can make a real recommendation.

For the first 30 days, list the specific questions I should be able to answer by the end (about the users, the metrics, the team, and how decisions currently get made), not generic activities like "meet with stakeholders." For 60 and 90 days, keep the commitments conditional on what I learn in the first 30, rather than pre-deciding what I'll ship.

What I know so far: [describe the company, product, and role]`,
        trap: "It writes a plan full of specific-sounding deliverables for day 60 and 90 (\"launch a new onboarding flow\") that are actually just generic PM activities dressed up with a deadline, committing to outcomes before you've learned anything the plan itself says you need to learn first. Check that nothing in the 60 or 90 day section is decided before the day 30 questions have actually been answered.",
      },
      {
        title: "Prepare for a product sense interview with a real product",
        when: "Before a product sense or product design interview, practising on a product you don't work on.",
        text: `Act as a product sense interviewer at a mid-size tech company. Ask me to improve [a real product, for example "the checkout flow of a grocery delivery app"]. Do not tell me what's actually wrong with it. Instead, ask me the follow up questions a real interviewer would ask as I answer: who is the user I'm designing for, how would I prioritise among the ideas I generate, and how would I measure success.

Push back if I jump straight to a solution without first stating who the user is and what problem they have. Keep the conversation going for at least four exchanges before summarising how I did.`,
        trap: "It's too quick to validate an early, underdeveloped answer as good, moving on before pushing on the parts a real interviewer would drill into, like an unstated assumption about the user. Ask it afterward what a stronger candidate would have said that you didn't.",
      },
      {
        title: "Write a case study close that survives a hard question",
        when: "A portfolio case study reads well until someone asks what actually went wrong, and the ending currently avoids that.",
        text: `Here is the ending of a portfolio case study: the outcome and what I'd do differently. Ask me the hardest question a skeptical interviewer would ask about this outcome, specifically about anything that sounds like it went perfectly, since real projects rarely do.

Then help me rewrite the closing paragraph to include one honest limitation or thing that didn't work as well as the rest of the case study implies, without undercutting the overall result.

Case study ending: [paste it]`,
        trap: "It's reluctant to genuinely challenge a case study that already sounds like a success story, offering a soft, easily answered question instead of the one that would actually expose an unaddressed weakness. Ask it directly what part of this story sounds too clean to be believable, and press on that specifically.",
      },
      {
        title: "Draft your first week questions before you ask them live",
        when: "Before day one at a new company, to walk in with sharper questions than \"tell me about the product.\"",
        text: `I'm starting as a PM at [company type and what you know]. Help me draft specific questions for my first meetings with the founder, an engineer, and a support or sales person, each tailored to what that specific role would actually know that the others wouldn't.

For each question, make sure it couldn't be answered from the company website or a pitch deck. Flag any question in my draft that's too generic (something any new hire would ask regardless of role) and suggest a sharper version specific to what only that person could tell me.

What I know: [describe the company and role]`,
        trap: "It generates polite, generic first-meeting questions (\"what does a typical day look like\") that any new hire could ask anyone, rather than questions specific to what only that person's seat would reveal. Check each question against whether the answer would actually differ if you asked a different person in a different role.",
      },
    ],
  },
];
