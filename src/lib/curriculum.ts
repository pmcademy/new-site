/**
 * curriculum.ts, the single source of truth for the whole program.
 *
 * Six phases, each a certification the learner earns by shipping a capstone.
 * Every mission is goal-driven: a real brief with a constraint and a clock,
 * an AI move that includes where the model fails, an artefact, and the concept
 * named only after it was needed.
 *
 * Phase 01 is free behind a Tally form. One payment unlocks the rest.
 */

export type Kind = "Mission" | "Build" | "Drill" | "Simulation" | "Teardown";

export type Lesson = {
  /** Mission title, the goal, not the topic. */
  t: string;
  k: Kind;
  /** Minutes. */
  m: number;
  /** The brief. May contain <em> for emphasis. */
  b: string;
  /** The artefact produced. */
  ship: string;
  /** How AI is used, and the specific failure the learner must catch. */
  ai: string;
  /** The concept acquired. */
  l: string;
};

export type Phase = {
  n: string;
  slug: string;
  /** Badge name. */
  cert: string;
  free: boolean;
  title: string;
  promise: string;
  /** The running scenario for this phase. */
  arc: string;
  who: string;
  outcomes: string[];
  capstone: { t: string; b: string };
  lessons: Lesson[];
};

export const phases: Phase[] = [
{n:"01",slug:"01",cert:"Product Thinker",free:true,title:"Working Like a PM",
 promise:"Walk into a company with no product process and produce something useful in your first week.",
 arc:"You are Sona's first APM. Sona is an AI personal-finance app, Series A, 40 people. Nobody hands you a brief. You have App Store reviews, a support inbox, an engineer who is busy, and a CEO who wants an answer on Friday.",
 who:"You've never held a product title, or you have one and nobody ever taught you the job.",
 outcomes:["Turn a pile of unstructured feedback into a claim you can defend in a room","Use AI to process volume, and spot the specific places it quietly merges things it shouldn't","Scope a v1 against an engineer who says it's a two-month build","Write one page that a busy founder actually finishes"],
 capstone:{t:"The Friday memo",b:"One page to the CEO: what is actually broken at Sona, who it hurts, what you'd do first, and how you'd know it worked. Reviewed against the same bar a real APM's first memo gets."},
 lessons:[
 {t:"Your first Monday",k:"Mission",m:55,b:"The CEO forwards you 200 App Store reviews with the message <em>“what should we fix?”</em> and nothing else. No brief, no context, no meeting.",ship:"A ranked one-page memo: what's broken, for whom, and what you'd do first.",ai:"Cluster all 200 reviews with a structured extraction prompt. Then hand-read 20, and find the two complaints the model quietly merged into one.",l:"What a PM actually does all day; turning volume into a claim you can defend."},
 {t:"Who is this even for?",k:"Mission",m:50,b:"Support says “users are confused.” Which users? The CEO thinks it's students. Sales thinks it's freelancers. Both are guessing.",ship:"Three evidenced segments and a written argument for the one to build for.",ai:"Generate segment hypotheses from support transcripts, then delete every one you can't attach a real quote to.",l:"Segments built from evidence versus personas invented in a workshop."},
 {t:"Read the interface, find the intent",k:"Teardown",m:45,b:"Guest mission. Open a product you use every day and pick one screen. Somebody fought about every pixel on it.",ship:"A teardown of one screen: what it optimises for, what it trades away, and who lost the argument.",ai:"Have a vision model describe the screen and infer its goal, then argue with it and write down where you disagree.",l:"Reverse-engineering product decisions from the artefact they produced."},
 {t:"One page or it doesn't exist",k:"Drill",m:40,b:"Your PM lead has 90 seconds. Everything you know has to survive that.",ship:"Problem statement, one success metric, one counter-metric that stops you gaming it.",ai:"Ask for ten candidate metrics. Nine will be gameable. Work out which, and why the model can't tell.",l:"Success metrics, counter-metrics, and the sentence that carries the document."},
 {t:"“That's a two-month build”",k:"Simulation",m:50,b:"You take your idea to engineering. The tech lead says two months. You have three weeks and you don't know enough to argue.",ship:"A scoped v1 with three explicit cuts and the reasoning behind each.",ai:"Run the conversation against a simulated tech lead who pushes back with real objections until you find the cut that works.",l:"Scoping and trade-offs; disagreeing with an engineer without pretending to be one."},
 {t:"Build it before you spec it",k:"Build",m:75,b:"Arguing about a feature in a doc takes a week. Making it clickable takes an hour, and ends the argument.",ship:"A working, clickable prototype of one Sona screen.",ai:"Prompt to prototype in one sitting, then list the three decisions the tool made for you that you didn't notice.",l:"Prototypes as arguments; the hidden defaults inside AI-generated UI."},
 {t:"Numbers without a data team",k:"Drill",m:45,b:"“How big is this?” Nobody will run a query for you this quarter.",ship:"A sized opportunity with every assumption written down and each one attackable.",ai:"Get a model to build the Fermi estimate. Then check its arithmetic and, more importantly, its priors.",l:"Estimating honestly; making your assumptions the thing people argue with."},
 {t:"Deliver it",k:"Mission",m:60,b:"Friday. The CEO is in the room. You have one page and eight minutes.",ship:"The finished memo, plus the two questions you'd expect and your answers.",ai:"Adversarial review: have a model attack your memo as a skeptical CEO would, then fix what actually lands.",l:"Writing and speaking to someone impatient."}]},

{n:"02",slug:"02",cert:"Signal Hunter",free:false,title:"Discovery & Real Signal",
 promise:"Find problems worth solving in products that already have thousands of users and no research team.",
 arc:"Sona is growing and the roadmap is a wishlist. Your job this phase is to replace opinion with evidence, at a volume nobody could process by hand two years ago.",
 who:"You can write a decent brief but your evidence is thin, and you know it.",
 outcomes:["Run user interviews that don't lead the witness","Build a reusable AI extraction pipeline over thousands of tickets, calls and reviews","Tell the difference between what users say and what they do","Kill your own favourite idea in writing, and say what would revive it"],
 capstone:{t:"The discovery pack",b:"A defended problem, a full evidence trail, an opportunity tree, and the part most people skip: a written list of what you decided not to build and what would change your mind."},
 lessons:[
 {t:"Ten conversations you don't have yet",k:"Mission",m:70,b:"You need to talk to real users. You have no research panel, no budget, and a founder who is nervous about you emailing customers.",ship:"A screener, an interview guide, and three completed conversations.",ai:"Draft the guide, then have a model hunt your own questions for leading bias. Most of them will be leading.",l:"Non-leading questions; “tell me about the last time” instead of “would you use”."},
 {t:"You already have the data",k:"Build",m:80,b:"4,000 support tickets, 800 reviews, 60 recorded sales calls. All of it sitting there, none of it read.",ship:"A coded signal log where every finding still carries the original quote.",ai:"Build a reusable extraction pipeline, a prompt plus an output schema, instead of asking for a summary and losing the evidence.",l:"Structured extraction; why the quote outranks the summary every time."},
 {t:"Watch what they do instead",k:"Mission",m:60,b:"Users told you the export feature is critical. The session recordings say almost nobody opens it.",ship:"Three behavioural findings that contradict what people said in interviews.",ai:"Summarise twenty session transcripts, then watch three yourself and list what the summary flattened.",l:"Stated versus revealed preference, and which one you build for."},
 {t:"Someone already solved this",k:"Teardown",m:65,b:"A competitor shipped something close to your idea eighteen months ago. What happened next is free information.",ship:"A teardown of their solution, what it cost them, and what they quietly rolled back.",ai:"Mine twelve months of their changelog and reviews for the reversal nobody announced.",l:"Competitive intelligence that isn't a feature checklist."},
 {t:"From 200 quotes to 5 problems",k:"Build",m:75,b:"You have evidence. It's a pile. A pile is not a decision.",ship:"An opportunity tree with evidence attached to every single node.",ai:"Cluster the same corpus two ways, by embedding similarity and by prompt, and explain why they disagree.",l:"Opportunity solution trees; evidence density as a quality bar."},
 {t:"Which one is worth a quarter?",k:"Drill",m:55,b:"Five real problems. One team. Twelve weeks. The CEO wants all five.",ship:"A scored shortlist where the confidence column is the honest one.",ai:"Build the scoring model, then stress-test your own confidence numbers against the evidence you actually have.",l:"Prioritisation that isn't numerology; confidence as the load-bearing column."},
 {t:"Kill your favourite",k:"Simulation",m:50,b:"The idea you're most excited about has the thinnest evidence. You know it. You haven't said it.",ship:"A written kill decision, and the specific evidence that would revive it.",ai:"Ask a model to destroy your brief on the merits. Keep only the objections you can't answer.",l:"Falsifiability; pre-registering what would change your mind."},
 {t:"Present the evidence",k:"Mission",m:60,b:"Leadership wants the answer. You want them to understand the reasoning, because next quarter they'll do this without you.",ship:"The discovery pack, presented, with the kill list included on purpose.",ai:"Simulate the three stakeholders who'll push back hardest and rehearse against them.",l:"Making a decision legible so it survives you leaving the room."}]},

{n:"03",slug:"03",cert:"Spec Author",free:false,title:"Definition & Specs",
 promise:"Write the documents engineers actually read, and the ones that stop a build going sideways in week three.",
 arc:"The problem is picked and the team is assigned. Everything now depends on whether you can describe what to build precisely enough that six people build the same thing.",
 who:"Your docs get skimmed, and things you thought were obvious keep getting built wrong.",
 outcomes:["Write a one-page PRD an engineer reads on a Friday afternoon","Expose ambiguity with diagrams and a states matrix before QA finds it","Write acceptance criteria a test can be written against","Sequence twelve weeks of work around a demo that's five weeks away"],
 capstone:{t:"The spec",b:"A complete, buildable spec for Sona's next release: problem, scope, states, acceptance criteria, data contract, and a three-release sequence with dependencies named."},
 lessons:[
 {t:"The PRD an engineer reads on a Friday",k:"Mission",m:70,b:"Your last doc was nine pages. Two people opened it. One of them was you.",ship:"A one-page PRD with the four sections engineers actually use.",ai:"Have a model draft it, then delete sixty percent. Notice exactly what kind of filler it adds and why it reads as thorough.",l:"Document structure; the specific ways AI-written specs pad and hedge."},
 {t:"Draw the system",k:"Build",m:60,b:"You've written what happens. Nobody can see what happens. The two are not the same.",ship:"A user flow and a state diagram for the feature.",ai:"Generate the diagram from your prose, then find the edge states it invented and the real ones it dropped.",l:"Flows versus states; where prose hides ambiguity a diagram exposes."},
 {t:"Every empty, error and edge",k:"Drill",m:55,b:"The happy path is four screens. The unhappy paths are nineteen, and QA will find them for you in front of the CTO.",ship:"A complete states matrix: empty, loading, partial, error, offline, permission-denied, first-run.",ai:"Enumerate failure states with a model, then find the four it missed because they're specific to your product.",l:"Designing the unhappy path as a first-class part of the spec."},
 {t:"Critique without redesigning",k:"Simulation",m:50,b:"The designer shows you a flow. You have a feeling it's wrong. “I don't like it” will cost you the relationship.",ship:"A written critique that improves the design without prescribing the solution.",ai:"Rehearse against a simulated designer who correctly pushes back on vague feedback.",l:"Critique language; problem-feedback versus solution-feedback."},
 {t:"Acceptance criteria that can't be argued with",k:"Drill",m:50,b:"“It should feel fast.” Fast is not testable. This is how a release slips.",ship:"Testable acceptance criteria for every story in your release.",ai:"Turn your criteria into test cases and see which ones a model can't write a test for. Those are the ambiguous ones.",l:"Ambiguity detection; criteria as a contract rather than a wish."},
 {t:"The data you're actually asking for",k:"Mission",m:65,b:"Engineering asks what the API should return. You've never thought about it in your life.",ship:"A data contract sketch: fields, types, what's required, what happens when it's missing.",ai:"Have a model propose the schema, then work out which fields are expensive and why nobody told you.",l:"Reading a data contract; what “backend work” means in practice."},
 {t:"Sequence the releases",k:"Mission",m:60,b:"It's twelve weeks of work. The board demo is in five. Something has to be shippable by then.",ship:"A three-release sequence with dependencies mapped and the demo-ready cut identified.",ai:"Extract the dependency graph from your own spec and find the two orderings you hadn't considered.",l:"Sequencing; the difference between a roadmap and a dependency chain."},
 {t:"Hand it over",k:"Mission",m:55,b:"Kickoff. Six people, one hour, and everything you got wrong is about to become visible.",ship:"The spec, walked through, plus the open-questions list you're honest about.",ai:"Simulate the kickoff and collect the questions you can't answer yet.",l:"Running a kickoff; being publicly uncertain without losing the room."}]},

{n:"04",slug:"04",cert:"AI Product Builder",free:false,title:"Building AI Products",
 promise:"Make the calls that decide whether an AI feature is useful or a liability, evals, cost, latency, and what happens when it's wrong.",
 arc:"Sona wants an AI assistant that answers money questions from a user's own transactions. This is where AI stops being a tool you use and starts being the thing you're accountable for.",
 who:"You're a competent PM and the AI conversations in your company happen without you.",
 outcomes:["Describe your feature's model path well enough that an engineer signs off on it","Build an eval suite that turns “feels better” into a number","Design retrieval, and find the query where it returns confidently irrelevant context","Cost and time a single interaction, and design the interface for the 8% where the model is wrong"],
 capstone:{t:"The working feature",b:"A functioning AI feature with a versioned prompt, a real eval suite, a retrieval design, a cost-per-interaction model, and a written account of every trade-off you made."},
 lessons:[
 {t:"What the model is actually doing",k:"Mission",m:70,b:"You're about to make decisions worth a quarter of engineering time about a system you can't yet describe.",ship:"A one-page explainer of your feature's model path that an engineer would sign off on.",ai:"Trace one real request end to end: tokens in, context assembled, sampling, tokens out, cost.",l:"Tokens, context windows, temperature, and why it forgets what you told it."},
 {t:"Your first eval set",k:"Build",m:90,b:"Someone changed the prompt. Is it better? Right now the only answer anyone has is “feels better.”",ship:"Twenty golden cases and a scoring rubric that two people would score the same way.",ai:"Generate candidate cases, then throw out the easy ones. Evals are only useful where the model is close to failing.",l:"Evals as the unit of progress; why “feels better” is the most expensive sentence in AI product work."},
 {t:"The prompt is the product",k:"Build",m:70,b:"The system prompt is 800 words in a Slack message and three people have edited it.",ship:"A versioned system prompt with a changelog and eval scores per version.",ai:"Run each version against your eval set and watch a ‘small wording fix’ drop the score.",l:"Prompts as spec artefacts under version control, not folklore."},
 {t:"Retrieval, and why it's usually the answer",k:"Build",m:85,b:"Users want answers about <em>their</em> transactions. The model has never seen them and can't be trained on them.",ship:"A retrieval design for Sona's assistant: what gets chunked, how, and what gets retrieved when.",ai:"Build it, then break it, find the query where retrieval returns confidently irrelevant context.",l:"Chunking, embeddings, retrieval failure modes, and why the wrong answer looked right."},
 {t:"When to use an agent, and when not to",k:"Mission",m:65,b:"Someone in leadership read about agents. They want one. You have to decide whether that's right.",ship:"A decision memo: where autonomy earns its cost here, and where it's a support-ticket generator.",ai:"Build the same task twice, a single call versus a tool-using loop, and measure the difference honestly.",l:"Tool use, loops, the real cost of autonomy, and where a deterministic path wins."},
 {t:"Latency, cost, and the shape of a good answer",k:"Drill",m:60,b:"It works. It takes eleven seconds and costs eleven cents a question. Neither number survives launch.",ship:"A unit-economics sheet: cost and latency per interaction, with three levers costed out.",ai:"Test model routing, caching and streaming, and record what each one does to quality.",l:"Model routing, caching, streaming, and pricing that follows the cost curve."},
 {t:"Designing for wrongness",k:"Build",m:75,b:"Your feature is right about 92% of the time. The other 8% is going to happen in front of a customer, about their money.",ship:"Interface patterns for uncertainty: confidence, citations, undo, and a route to a human.",ai:"Collect real failures from your eval set and design the surface around the ones that actually occur.",l:"The interface as the safety layer; making a wrong answer recoverable."},
 {t:"Red-team your own feature",k:"Simulation",m:70,b:"Before someone on the internet does it for you, in public, with a screenshot.",ship:"An abuse and failure report with severity, likelihood, and a mitigation for the top three.",ai:"Attack your own system: prompt injection, PII leakage, hallucinated numbers, jailbreaks.",l:"Failure classes, severity triage, and what genuinely can't be fixed with a prompt."},
 {t:"Ship it",k:"Build",m:120,b:"End to end, running, in front of real people.",ship:"The working feature, the eval suite, and the trade-off log.",ai:"Final eval run, and a written answer to “how do you know it works?”",l:"Putting an AI system into someone's hands and owning what it does."}]},

{n:"05",slug:"05",cert:"Launch Operator",free:false,title:"Launch, Metrics & Growth",
 promise:"Get it in front of people, instrument it properly, and tell the difference between a win and noise.",
 arc:"The feature is built. Now the part that separates people who ship from people who build: rollout, instrumentation, and reading your own numbers without flattering yourself.",
 who:"You've built things that launched quietly and you were never sure whether they worked.",
 outcomes:["Instrument a feature for the questions you'll actually be asked","Run a staged rollout with kill criteria set before you're emotionally invested","Call a null result out loud when the chart looks like a win","Find the one action that predicts whether someone comes back"],
 capstone:{t:"The week-one readout",b:"A live feature, a tracking plan that answers real questions, a staged rollout with kill criteria, and an honest readout of what worked, what didn't, and what you changed."},
 lessons:[
 {t:"Instrument it before you launch",k:"Build",m:65,b:"Launch day is the worst possible time to discover you can't answer “did anyone use it?”",ship:"A tracking plan tied to the questions you already know you'll be asked.",ai:"Generate the event schema from your spec, then delete every event you can't name a question for.",l:"Event design; instrumenting for questions rather than for completeness."},
 {t:"The rollout",k:"Mission",m:60,b:"You could ship to everyone on Tuesday. You almost certainly shouldn't.",ship:"A staged rollout plan with cohorts, guardrail metrics, and written kill criteria.",ai:"Model the blast radius at each stage and set thresholds before you're emotionally invested.",l:"Feature flags, guardrail metrics, and deciding to stop before you need to."},
 {t:"Write the launch post",k:"Mission",m:55,b:"Most launch posts are read to the third line. Yours has to survive to the end.",ship:"A public launch post and an internal brief that say the same thing to different audiences.",ai:"Draft three openings in three registers, then cut the one that sounds most like a press release.",l:"Writing that gets finished; saying one true thing two ways."},
 {t:"The first ten users",k:"Mission",m:65,b:"Nobody is coming. Distribution is your job now, and you have no budget.",ship:"A distribution plan you can execute alone this week, and the first ten real users.",ai:"Find where your users already are, then draft outreach that doesn't read as automated, and check whether it does.",l:"Getting to signal fast; why the first ten matter more than the first thousand."},
 {t:"Read your own data honestly",k:"Drill",m:60,b:"The chart goes up. You want it to mean what you think it means. It might not.",ship:"A week-one readout with segment splits and the novelty effect accounted for.",ai:"Have a model propose five alternative explanations for your result, and rule them out one at a time.",l:"Novelty effects, survivorship, and why an average hides the finding."},
 {t:"Win or noise?",k:"Drill",m:55,b:"Your A/B test is up 4%. Someone wants to ship it today.",ship:"An experiment readout with power, runtime and an honest verdict, including “we don't know yet”.",ai:"Compute the sample size and detect whether you've been peeking. You have been.",l:"Statistical power, peeking, and the discipline of calling a null result."},
 {t:"Retention is the only number",k:"Mission",m:70,b:"Sign-ups are up and nobody comes back in week two. Everything else is a vanity metric.",ship:"A cohort retention curve and one testable hypothesis about the drop-off.",ai:"Cluster churned users by behaviour and find the one action that separates them from the ones who stayed.",l:"Activation, habit, retention curves, and the action that predicts staying."},
 {t:"The iteration that mattered",k:"Build",m:80,b:"One change. Grounded in the data. Shipped, measured, written up.",ship:"A shipped iteration with a before-and-after and an honest account of the effect.",ai:"Re-run your evals and your metrics together, because a quality change can move both.",l:"Closing the loop; proving a change did what you said it would."}]},

{n:"06",slug:"06",cert:"Certified AI Product Manager",free:false,title:"Strategy, Leadership & The Job",
 promise:"Own a product line, survive the rooms where decisions actually get made, and turn all of it into a job.",
 arc:"You're not the APM any more. You own an area, you have people who disagree with you, and at some point something you shipped is going to go wrong in public.",
 who:"You can execute. You now need to decide what's worth executing, and get other people to agree.",
 outcomes:["Write a one-page strategy that is a set of choices, not a list of ambitions","Survive twenty minutes with a CFO who thinks your AI feature is a cost centre","Handle a public model failure without hiding behind process language","Turn the whole program into a five-minute answer that ends an interview in your favour"],
 capstone:{t:"The full case",b:"A public portfolio page: the live product, the strategy behind it, the decisions and their outcomes, and the five-minute version you tell in an interview."},
 lessons:[
 {t:"Strategy on one page",k:"Mission",m:80,b:"The CEO asks what Sona should be in a year. “More features” is not an answer.",ship:"A one-page strategy: where to play, how to win, and what you're explicitly not doing.",ai:"Generate three strategies with genuinely different bets, then argue for the one you'd stake a year on.",l:"Strategy as a set of choices, not a list of ambitions."},
 {t:"A roadmap that survives a re-org",k:"Mission",m:65,b:"Your feature roadmap dies the moment priorities shift. An outcome roadmap doesn't.",ship:"An outcome-based roadmap with confidence bands instead of fake dates.",ai:"Convert a feature list into outcomes and notice which items have no outcome behind them at all.",l:"Outcomes over outputs; communicating uncertainty without losing credibility."},
 {t:"The exec conversation",k:"Simulation",m:70,b:"Twenty minutes with the leadership team. The CFO thinks your AI feature is a cost centre and is not entirely wrong.",ship:"A written pre-read and a five-slide narrative that works even if nobody reads the pre-read.",ai:"Rehearse against a simulated CFO who attacks your unit economics using the numbers you produced in Phase 04.",l:"Executive communication; leading with the decision you want made."},
 {t:"Stakeholders who disagree",k:"Simulation",m:60,b:"Sales promised a customer something you're not building. Support is drowning. Both escalated.",ship:"A written alignment doc that states the disagreement plainly and the decision anyway.",ai:"Simulate all three parties and find the framing that gets a real commitment rather than a polite one.",l:"Disagree-and-commit in practice; writing the decision down so it holds."},
 {t:"When it goes wrong in public",k:"Simulation",m:65,b:"Your assistant told a user something wrong about their money. It's on social media. It's climbing.",ship:"An incident response: user comms, internal comms, the fix, and the post-mortem.",ai:"Draft the response, then have it torn apart for the defensive phrasing you didn't notice writing.",l:"Owning a model failure publicly; post-mortems that change something."},
 {t:"The loop, from the other side",k:"Mission",m:60,b:"You're interviewing for a senior role. The questions are designed to find out whether you've actually done this.",ship:"Your PM story, structured, with the trap in each common question named.",ai:"Run a full mock loop, product sense, execution, analytics, and get scored against a real rubric.",l:"The interview loop; describing work versus demonstrating judgement."},
 {t:"The portfolio that gets the call",k:"Build",m:75,b:"A hiring manager gives your application ninety seconds. A URL beats a CV every time.",ship:"Your public project page: the product, the decisions, the outcomes, the honest bits.",ai:"Draft the case study from your own artefacts, then cut everything that reads as marketing.",l:"Showing work; writing about your own decisions without inflating them."},
 {t:"The five-minute version",k:"Mission",m:55,b:"“Tell me about something you shipped.” You have five minutes and one shot.",ship:"The complete case, delivered live, reviewed against a hiring rubric.",ai:"Rehearse against a simulated interviewer who interrupts, doubts you, and asks for numbers.",l:"Narrative under pressure; the answer that ends an interview in your favour."}]}
];

export const totalMissions = phases.reduce((a, p) => a + p.lessons.length, 0);
export const totalHours = Math.round(
  phases.reduce((a, p) => a + p.lessons.reduce((s, l) => s + l.m, 0), 0) / 60
);
export const phaseHours = (p: Phase) =>
  Math.round(p.lessons.reduce((a, l) => a + l.m, 0) / 60);
export const getPhase = (slug: string) => phases.find((p) => p.slug === slug);

export type Quote = { q: string; n: string; r: string; i: number };

/**
 * PLACEHOLDER. Replace with real learner quotes and photos before launch ,
 * these are sample copy, and the names are deliberately not real people.
 */
export const quotes: Quote[] = [
 {q:"I'd read three PM books and still couldn't answer “what would you do first?” in an interview. Phase 01 fixed that in a week, because it makes you actually do it.",n:"Sample Name",r:"Support lead → APM",i:0},
 {q:"The AI parts aren't a gimmick. Every exercise makes you find where the model got it wrong, which is the thing I now get asked about in every interview.",n:"Sample Name",r:"Clinician → Health PM",i:2},
 {q:"I finished with a live product, an eval suite and a case study. I stopped sending a CV and started sending a link.",n:"Sample Name",r:"Analyst → Product Manager",i:4}
];

export const faq: [string, string][] = [
 ["Is Phase 01 really free?","Yes. All eight missions, the capstone and the Product Thinker certification. You submit one short form and it opens, no card, no sales call. It's the prerequisite for everything else, and it's also how you find out whether the rest is for you."],
 ["What does the paid program cost?","One payment, and it unlocks all six phases permanently, there's no per-phase pricing and no subscription. Pricing is being finalised."],
 ["Do I need to be able to code?","No. You need to be willing to use AI tooling to assemble something that runs, and we walk you through it. The point isn't the code, it's making an informed call about latency, cost, and what happens when the model is wrong."],
 ["How long does the whole program take?",`The lessons themselves are about ${totalHours} hours. The projects are where the time goes, most people take three to five months at a few hours a week. Nothing expires.`],
 ["What do I actually walk away with?",`${totalMissions} artefacts, six certifications, and one live public product with your name on it: a memo, a discovery pack, a spec, a working AI feature, a launch readout, and a portfolio page that ties it together.`],
 ["Is this for people who already have a PM job?","Both work. If you're new, Phase 01 assumes nothing. If you already ship, Phases 04 to 06 are where the AI-specific work lives, and most PMs have never built an eval set or costed an interaction."]
];

