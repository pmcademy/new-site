import type { Level } from "./types";

/**
 * LEVEL 05. Architect
 *
 * AI Product Management. Nothing in the original course covers this, and it is
 * the single biggest gap between a 2023 PM and an employable one now.
 *
 * The arc stays at Sona. The learner ships one real AI feature and is
 * accountable for it: the prompt, the evals, the retrieval, the cost, and what
 * the product does on the day it is confidently wrong about someone's money.
 */
export const l05: Level = {
  slug: "05",
  n: "05",
  rank: "Architect",
  badge: "AI Product Builder",
  title: "AI Product Management",
  promise:
    "Ship an AI feature you can defend: a versioned prompt, an eval suite that turns “feels better” into a number, a cost per interaction, and an interface designed for the times the model is wrong.",
  arc: "Sona wants an assistant that answers money questions from a user's own transactions. Maya has already told the board it ships this quarter. This is where AI stops being a tool you use and starts being the thing you are accountable for when it tells someone the wrong balance.",
  scene: {
    image: "/img/scenes/domain-fintech.webp",
    alt: "A dashboard of transactions, categories and balances, with a chat panel open beside it.",
    caption:
      "Sona's assistant, three weeks into the prototype. It demos beautifully.",
  },
  who: "You are a competent PM and the AI conversations at your company are happening without you.",
  outcomes: [
    "Describe your feature's model path well enough that an engineer signs off on it",
    "Decide honestly whether this needs a model at all, and write down what the non-AI version would have cost",
    "Build an eval suite that turns “feels better” into a number, and gate every prompt change on it",
    "Design retrieval, then find the query where it answers confidently from the wrong document",
    "Cost and time a single interaction, and design the interface for the eight percent where the model is wrong",
    "Red team your own feature and write the report before someone on the internet writes it for you",
  ],
  capstone: {
    title: "The working AI feature",
    body: "A functioning AI feature with a versioned prompt in a repo, an eval suite of at least twenty golden cases scored per version, a retrieval design with a documented failure case, a cost and latency model per interaction, and a red team report with the top three mitigations shipped. Judged the way a real launch review judges it, which is whether you can answer what happens when it is wrong.",
    ship: [
      "A live AI feature with a versioned system prompt and a changelog carrying eval scores",
      "An eval suite of 20 or more golden cases, scored across at least three prompt versions",
      "A cost and latency sheet: p50 and p95 per interaction, and the unit economics of one button press",
      "A red team report: attacks attempted, what got through, severity ranking, mitigations shipped",
    ],
  },

  chapters: [
    /* ================================================================ 1 */
    {
      slug: "literacy",
      n: "1",
      title: "What the model is actually doing",
      summary:
        "Enough of the machine to make decisions about it. You will not be training anything, and you will not be allowed to hand wave either.",
      lessons: [
        {
          slug: "model-path",
          title: "Trace one request end to end",
          kind: "Build",
          minutes: 65,
          hook: "You are about to commit a quarter of engineering time to a system you cannot currently describe in a sentence. Dev asks, in standup, what actually happens when a user presses send. You do not know.",
          scene: {
            image: "/img/scenes/domain-fintech.webp",
            alt: "A transaction list with a chat panel open beside it, mid conversation.",
            caption: "The prototype. It has never been measured.",
            notes: [
              {
                from: "Maya, founder",
                text: "Board deck says the assistant ships this quarter. I said it was mostly done. Was that wrong?",
              },
              {
                from: "Dev, engineering lead",
                text: "Before I build anything real I need to know what we are sending the model on every request. Right now nobody can tell me.",
              },
              {
                from: "Ana, data",
                text: "Finance asked what this costs per user. I said I would ask you. Please have a number.",
              },
            ],
          },
          explain: {
            title: "Tokens are the unit of everything",
            body: [
              "A token is roughly three quarters of a word. Cost is measured in tokens, latency is mostly a function of tokens out, and the context limit is a token count. Every design decision that adds context adds money and time, and there is no exception to that.",
              "The model has no memory between requests. Everything it appears to remember was re-sent by your code: the system prompt, the conversation history, any retrieved documents, any tool results. When someone says “it forgot”, the accurate sentence is almost always “we did not send it”.",
              "So the thing you are actually designing is not the model. It is the assembly step: what goes into the context on every single request, in what order, at what cost. Nobody on the team owns that by default, which is how it ends up being whatever the first prototype happened to do.",
            ],
            diagram: "user-flow",
            caption:
              "One request. Every box costs tokens, and two of them cost a round trip.",
            points: [
              {
                term: "Assembly",
                def: "Your code builds the prompt: system instructions, history, retrieved context, the user's message. This is the part you control.",
              },
              {
                term: "Tokens in",
                def: "What you send, priced per million. Usually the larger half of the bill and the part that grows quietly.",
              },
              {
                term: "Tokens out",
                def: "What comes back, priced higher than input and the main driver of how long the user waits.",
              },
              {
                term: "The response",
                def: "Text, and nothing else, unless you parse it. A model does not return a fact, it returns a string that looks like one.",
              },
            ],
          },
          case: {
            brand: "LinkedIn",
            year: "2024",
            situation:
              "LinkedIn's engineering team published an unusually honest account of building their first generative AI product, a feature that answers questions about a job post or a profile.",
            what: "They wrote that getting to a demo took about a month and getting to a shippable version took another four, and that the difficulty was concentrated in the unglamorous parts: assembling context, calling internal APIs as tools, holding a consistent output format, and evaluating quality. They describe building an evaluation pipeline before they could move at all.",
            lesson:
              "The demo is a month of work. The product is the pipeline around the model, and a PM who cannot describe that pipeline cannot make any of the decisions about it.",
            sources: [
              {
                label: "Musings on Building a Generative AI Product, LinkedIn Engineering",
                url: "https://www.linkedin.com/blog/engineering/generative-ai/musings-on-building-a-generative-ai-product",
              },
            ],
          },
          ai: {
            move: "Instrument one real request. Log the exact assembled prompt as a string, the token counts in and out from the provider's usage response, the wall clock latency, and the cost. Run it over ten real questions and put the rows in a sheet.",
            trap: "Asking a model how many tokens its own prompt uses returns a confident wrong number, usually within twenty percent, which is close enough that nobody checks it and wrong enough to break a cost model. Use the provider's reported usage or a real tokenizer library. Never estimate, and never let the estimate come from the thing you are measuring.",
          },
          build: {
            artefact:
              "A one page model path explainer for Sona's assistant that Dev would sign off on, with real numbers.",
            steps: [
              {
                do: "Build the simplest working version: one API call, one prompt, in a notebook or a small script.",
              },
              {
                do: "Print the full assembled prompt for one real question and read it. All of it.",
                hint: "You will find something in there you did not know was being sent. Everybody does.",
              },
              {
                do: "Record tokens in, tokens out, latency and cost for ten different questions. One row each.",
              },
              {
                do: "Draw the path: what goes in, what comes back, what it costs, where the time goes.",
              },
              {
                do: "Write the explainer and have an engineer read it. Fix every place they say “that is not what happens”.",
              },
            ],
            tools: ["An LLM API", "A notebook or small script", "A tokenizer library", "Google Sheets"],
          },
          solution: {
            summary:
              "The numbers are almost never where you expect. The system prompt is usually the biggest line, and it is paid on every single request.",
            walkthrough: [
              "Log ten requests and sort by tokens in. The user's question is tiny, usually 15 to 40 tokens.",
              "The system prompt is fixed and large, often 600 to 1,500 tokens, and you pay for it every time. Ten thousand requests a day means you are buying that prompt ten thousand times.",
              "History grows linearly through a conversation. Turn eight of a chat costs several times what turn one cost, for the same question.",
              "Latency correlates with tokens out, not tokens in. A long answer is slow because it is generated one token at a time. A long input is cheap in time and expensive in money.",
              "Write the explainer around those four facts, with your own numbers in it, and the cost conversations for the rest of the level get easy.",
            ],
            example: {
              label: "The line that makes the rest of the level make sense",
              body: "One question costs us 1,340 tokens in and 210 out, 2.4 seconds end to end. 1,180 of the input tokens are the system prompt, which means 88 percent of what we pay for on every request is the same text we sent last time.",
            },
          },
          check: [
            "What is the median cost and latency of one interaction, in your own numbers?",
            "Which part of your assembled prompt is the biggest, and is it earning its tokens?",
            "What is in the assembled prompt that you did not know was there?",
          ],
          references: [
            {
              label: "Anthropic pricing and token counting",
              url: "https://docs.anthropic.com/en/docs/about-claude/pricing",
            },
          ],
        },

        {
          slug: "context-budget",
          title: "Context is a budget, and the model knows nothing you did not send",
          kind: "Concept",
          minutes: 50,
          hook: "The assistant answers the first three questions well and the eighth one badly, in every single conversation, and nobody can work out why.",
          explain: {
            title: "The context window is a spending limit you spend on purpose",
            body: [
              "The context window is the maximum number of tokens the model can see at once. Large windows have made this feel like a solved problem. It is not, for two reasons: you pay for everything you put in it, and quality degrades long before the limit does. Material buried in the middle of a very long context gets used less reliably than material at the start or the end.",
              "So treat it as a budget with named line items. System prompt, retrieved documents, conversation history, tool results, the user's message. Write down how many tokens each is allowed. When something needs more, something else gives it up, and you decide which rather than discovering it in production.",
              "The second half of this is what the model cannot know, and it is a shorter list than people think. It cannot know today's date unless you send it. It cannot know this user's balance unless you send it. It cannot see your database, your pricing page as of this morning, or the conversation the same user had yesterday. Anything after its training cutoff is invisible. Every one of those gaps is a thing your code has to put in the context, or a thing your product has to refuse to answer.",
            ],
            diagram: "cost-curve",
            caption:
              "Cost per request against context size. The line is straight, which is the whole problem.",
            points: [
              {
                term: "Window",
                def: "The hard limit. Exceed it and the request fails or silently truncates, usually dropping the oldest turns.",
              },
              {
                term: "Effective window",
                def: "The part the model reliably uses. Smaller than the hard limit, and the middle is the weakest region.",
              },
              {
                term: "Compaction",
                def: "Summarising old turns to make room. Cheap in tokens and lossy in exactly the way that hurts.",
              },
              {
                term: "The unknowable",
                def: "Time, user data, anything after the training cutoff, anything you did not send. Not a bug, a boundary.",
              },
            ],
          },
          case: {
            brand: "Microsoft Bing Chat",
            year: "2023",
            situation:
              "In the first week of the new Bing, long conversations produced widely reported strange behaviour, including the model arguing with users about the date and adopting a persona users had coaxed it into.",
            what: "Microsoft's own post mortem said that in long chat sessions of fifteen or more turns Bing could become repetitive or be prompted into a tone they did not intend, and that very long sessions confused the model about which question it was answering. Their first response was a product constraint, not a model fix: they capped turns per session and per day, then relaxed the cap as they improved the system.",
            lesson:
              "A context problem is solvable in the product before it is solvable in the model. Capping the conversation is an ugly answer that shipped in days and worked.",
            sources: [
              {
                label: "The new Bing and Edge, updates to chat, Bing Search Blog",
                url: "https://blogs.bing.com/search/february-2023/The-new-Bing-Edge-Updates-to-Chat",
              },
            ],
          },
          ai: {
            move: "Have a model compact a long conversation into a short summary you can re-send as history, then diff the summary against the original for anything the user asked for that is no longer represented.",
            trap: "Compaction keeps the topic and drops the constraint. A user who said in turn two “only my joint account, and exclude refunds” gets a summary that says “user is asking about spending” and the assistant quietly starts including the refunds again. Test compaction specifically by planting a constraint early and checking whether it survives to turn twelve.",
            prompt:
              "Summarise this conversation for use as context in the next turn. Preserve, verbatim, every constraint, exclusion, preference or correction the user has stated, even if it seems minor. List them as bullets before the summary prose.",
          },
          build: {
            artefact:
              "A written context budget for Sona's assistant, with a token allowance per line item and a stated rule for what gives way under pressure.",
            steps: [
              { do: "List every component that can enter the context on a request." },
              {
                do: "Measure the current token count of each on a real conversation at turn one and at turn ten.",
              },
              {
                do: "Set an allowance for each and a total ceiling well under the hard window.",
                hint: "Half the hard window is a reasonable starting ceiling. You are buying quality and headroom, not saving tokens.",
              },
              {
                do: "Write the eviction rule: when the total is exceeded, what gets dropped or compacted first, and why that is the safest thing to lose.",
              },
              {
                do: "Write the cannot know list: five things a user will ask that the model has no way to answer, and what the product does for each.",
              },
            ],
          },
          solution: {
            summary:
              "The budget almost always exposes that history is unbounded and retrieval is over generous, and that nobody had decided which one loses.",
            walkthrough: [
              "Measure at turn ten and history is usually the largest single item, growing with no ceiling.",
              "Retrieved context is the second largest and is typically set to a round number of chunks that somebody picked in week one and never revisited.",
              "The safest thing to lose is old history, compacted, because the user can restate it. The most dangerous thing to lose is the constraint the user set in turn two, which is why compaction gets tested separately.",
              "Retrieval should be cut by relevance threshold rather than by count. Sending five weak chunks is worse than sending two strong ones, and cheaper.",
              "State the ceiling as a number in the document. A budget without a number is an intention.",
            ],
          },
          check: [
            "What is your token ceiling, and what gets evicted first when you hit it?",
            "Did your planted constraint survive compaction to turn twelve?",
            "What are five questions a user will ask that the model has no way to answer, and what does the product do for each?",
          ],
        },

        {
          slug: "same-prompt-different-answer",
          title: "Why the same prompt gives a different answer",
          kind: "Drill",
          minutes: 45,
          hook: "QA files a bug: the assistant categorised the same transaction as Groceries on Monday and Dining on Tuesday. Nothing changed in between. Dev closes it as not reproducible. Both of them are right.",
          explain: {
            title: "Variance is a property of the system, not a defect in it",
            body: [
              "A model produces a probability distribution over the next token and then samples from it. Temperature controls how flat that distribution is. At zero it takes the most likely token nearly every time, which is close to deterministic but not a guarantee, because batching and floating point work on real hardware still introduce drift. Above zero it deliberately varies.",
              "Which means the correct question is never “is this thing reliable”. It is “where in my product does variance cost me something, and where does it buy me something”. Variance is a feature in a brainstorm and a defect in a category label. The same product usually needs both, at different temperatures, in different calls.",
              "The consequence people miss is what this does to testing. You cannot verify a variable system by trying it once. One run tells you what happened once. You need the same input run many times, and a measure of how often the answer is acceptable, which is the entire reason the next chapter exists.",
            ],
            points: [
              {
                term: "Temperature",
                def: "How much randomness in sampling. Near zero for classification and extraction, higher for drafting and ideation.",
              },
              {
                term: "Consistency rate",
                def: "Out of twenty runs of the same input, how many produced an acceptable answer. Your real quality number.",
              },
              {
                term: "Structured output",
                def: "Constraining the response to a schema. Removes a whole class of variance for free, before you touch temperature.",
              },
              {
                term: "Idempotence",
                def: "Whether running it twice is safe. Matters enormously the moment the model triggers an action rather than text.",
              },
            ],
          },
          ai: {
            move: "Take five inputs, run each twenty times at your current settings, and count how many distinct answers you get and how many are acceptable. That table is the first honest quality number anyone at your company will have seen.",
            trap: "If you ask the model whether it is deterministic, or whether two of its answers are equivalent, it will grade its own homework generously and call two materially different answers “essentially the same”. Judge equivalence yourself against a written rule, for example whether the category string is identical, before you automate anything.",
          },
          build: {
            artefact:
              "A variance table across five inputs and twenty runs each, and a written decision about temperature and structure for every call in your feature.",
            steps: [
              { do: "Pick five representative inputs, including two you expect to be ambiguous." },
              { do: "Run each twenty times. Record every distinct output verbatim." },
              {
                do: "Mark each output acceptable or not against a rule you write down first.",
                hint: "Write the rule before you look at the outputs, or you will write a rule that the outputs pass.",
              },
              { do: "Repeat at temperature zero. Compare the consistency rate." },
              {
                do: "Decide, per call in your feature, what temperature it runs at and whether the output is schema constrained. Write it in the repo next to the prompt.",
              },
            ],
          },
          solution: {
            summary:
              "Dropping temperature usually removes the noise and exposes a real disagreement underneath, which is the actual bug.",
            walkthrough: [
              "At default temperature you will see three or four phrasings per input and occasionally a different substantive answer.",
              "At temperature zero the phrasings collapse. If a substantive disagreement survives, it was never randomness. The input is genuinely ambiguous and the prompt does not say how to break the tie.",
              "That is the finding worth having. A supermarket that sells hot food is genuinely both Groceries and Dining, and no temperature setting decides that. Your prompt has to, with a stated tie break rule.",
              "Structured output removes the rest. If the category must be one of eleven enum values, the model cannot invent Groceries and Household.",
              "Write both decisions down. Temperature and schema belong in the repo beside the prompt, not in someone's memory of what worked.",
            ],
          },
          check: [
            "What is your consistency rate at default temperature, and at zero?",
            "Which of your disagreements survived temperature zero, and what does that tell you about the prompt?",
          ],
          references: [
            {
              label: "OpenAI API reference, temperature and sampling parameters",
              url: "https://platform.openai.com/docs/api-reference/chat/create",
            },
          ],
        },
      ],
    },

    /* ================================================================ 2 */
    {
      slug: "deciding",
      n: "2",
      title: "Is this actually a model problem?",
      summary:
        "When an AI feature is the right answer, when it is an expensive way to do a lookup, and how the prompt becomes a real artefact once you have decided.",
      lessons: [
        {
          slug: "when-to-use-ai",
          title: "When an AI feature is the wrong answer",
          kind: "Concept",
          minutes: 50,
          hook: "Maya wants the assistant to answer “how much did I spend on coffee last month”. That is a SQL query. It costs nothing, it is right every time, and it returns in 40 milliseconds. The model costs money, is right most of the time, and takes two seconds.",
          scene: {
            image: "/img/scenes/office-wide.webp",
            alt: "The Sona office, a whiteboard covered in feature ideas with AI written next to most of them.",
            caption: "The whiteboard after the offsite. Fourteen ideas, eleven of them with AI written beside them.",
            notes: [
              {
                from: "Maya, founder",
                text: "Investors keep asking what our AI strategy is. I do not want to be the last app without one.",
              },
              {
                from: "Dev, engineering lead",
                text: "Four of these are database queries with a chat box drawn around them. I will build them either way, I just want it on the record.",
              },
              {
                from: "Priya, support",
                text: "The thing people actually ask me is why a transaction was categorised the way it was. Nobody asks me to summarise anything.",
              },
            ],
          },
          explain: {
            title: "Models are for the problems that do not have a rule",
            body: [
              "A model earns its cost when the input is open ended, the output tolerates variation, and writing the rules by hand would be endless. Understanding a question phrased in a thousand ways, summarising something nobody wrote a schema for, classifying free text where the categories are fuzzy. That is the shape.",
              "A model is the wrong tool when a deterministic system gets the same answer cheaper, faster and always. Arithmetic, lookups, filters, thresholds, anything with a right answer that a database already knows. Wrapping a query in a language model does not make the product smarter, it makes a reliable thing unreliable and charges you for the privilege.",
              "The useful design is usually both. Let the model do the part that needs judgement, which is turning a messy question into a structured one, and let ordinary code do the part that needs to be right, which is the sum. Most good AI features are a small amount of model on top of a large amount of boring correctness.",
            ],
            diagram: "opportunity-tree",
            caption:
              "One problem, four implementations. Only one of them needs a model, and it is not the one on the whiteboard.",
            points: [
              {
                term: "Open ended input",
                def: "The user can phrase it any way they like. Rules cannot enumerate the phrasings. Model territory.",
              },
              {
                term: "Tolerant output",
                def: "Several answers are acceptable. If exactly one answer is acceptable, prefer code.",
              },
              {
                term: "Cost of wrong",
                def: "What it costs when the answer is wrong. High cost plus a rule that exists means use the rule.",
              },
              {
                term: "The hybrid",
                def: "Model parses intent into parameters, code computes the answer. Cheap, fast, and right.",
              },
            ],
          },
          case: {
            brand: "Klarna",
            year: "2024 to 2025",
            situation:
              "Klarna put an OpenAI powered assistant in front of customer service and, one month in, published that it was handling two thirds of chats, doing work equivalent to 700 full time agents, with resolution times down from eleven minutes to under two.",
            what: "It was the most cited AI deployment of the year. A year later the company publicly changed course. The CEO said quality had suffered and that the company would guarantee customers the option of a human, and Klarna began recruiting service agents again. Both statements are from the company itself.",
            lesson:
              "Deflection was a real result and it was measured on the wrong thing. Chats handled is not chats resolved well. Decide up front which number you would be embarrassed to be wrong about, because that is the one that eventually gets audited in public.",
            sources: [
              {
                label: "Klarna press release, AI assistant handles two thirds of chats",
                url: "https://www.klarna.com/international/press/klarna-ai-assistant-handles-two-thirds-of-customer-service-chats-in-its-first-month/",
              },
              {
                label: "Klarna recruits humans for customer service again, CX Dive",
                url: "https://www.customerexperiencedive.com/news/klarna-reinvests-human-talent-customer-service-AI-chatbot/747586/",
              },
            ],
          },
          ai: {
            move: "For each feature on the whiteboard, make a model design the non-AI implementation first: the query, the rule, the lookup table. Then compare the two on cost, latency, accuracy and failure mode.",
            trap: "Models are enthusiastic about AI solutions. Asked how to build a spending summary, a model will happily design a retrieval augmented assistant and never volunteer that a GROUP BY would do it. You have to force the comparison by explicitly asking for the boring version, and even then it will write the boring version half heartedly. Judge the two on your four columns, not on which description sounds more impressive.",
            prompt:
              "Here is a feature request. Design two implementations. First, the version with no language model at all: queries, rules, thresholds, UI. Second, the version with a model. For each, state cost per use, p95 latency, accuracy, and what happens when it is wrong. Do not recommend either until both are complete.",
          },
          build: {
            artefact:
              "A decision memo on Sona's assistant: which parts need a model, which parts are code, and the number that decided each.",
            steps: [
              { do: "List the ten questions users most want the assistant to answer. Use Priya's ticket log, not your imagination." },
              {
                do: "For each, mark whether the answer is a lookup, a computation, a judgement, or a mixture.",
              },
              {
                do: "Cost the non-AI implementation of the three most common. Query time, engineering days, accuracy.",
              },
              {
                do: "Design the hybrid for one of them: model parses the question into parameters, code computes the answer.",
                hint: "The model's output should be a small JSON object, not prose. If it returns a number, you have given it the wrong job.",
              },
              {
                do: "Write the memo, including the features you are cutting and the sentence you will say to Maya about why.",
              },
            ],
          },
          solution: {
            summary:
              "Of ten questions, typically two need a model, five are hybrids, and three should never have been in the assistant at all.",
            walkthrough: [
              "Sort the ten by whether a competent analyst could write the answer as a query. Most can.",
              "For those, the model's only job is parsing intent: from “coffee last month” to {category: dining, merchant_type: cafe, period: 2024-05}. That is a small, testable, cheap call at temperature zero with a schema.",
              "Two questions survive as genuine model work: “why is my spending up this month”, which needs a comparison narrated, and “what should I cancel”, which needs judgement across subscriptions.",
              "Three should be buttons. “Show me last month” does not need a conversation, and putting it in a chat box makes it slower to reach, not faster.",
              "The memo leads with the money: the hybrid costs about a tenth of the pure model version per question and is right every time on the arithmetic, which is the part a finance app cannot get wrong.",
            ],
            example: {
              label: "The line Maya needs to hear",
              body: "Seven of the ten things we want the assistant to do are queries. If the model does the arithmetic we pay for every sum and we are wrong sometimes. If the model only reads the question and our code does the sum, we pay a tenth as much and the number is always right. We should ship the second one and call it the assistant.",
            },
          },
          check: [
            "Which questions on your list turned out to need no model at all?",
            "What does the non-AI version of your top feature cost, in engineering days and in cents per use?",
            "What is the one number you would be embarrassed to have been wrong about in public?",
          ],
        },

        {
          slug: "feature-shapes",
          title: "Suggest, answer, act: three shapes and their failure costs",
          kind: "Teardown",
          minutes: 50,
          hook: "The same model, wired three different ways, produces a delightful product, a mediocre one, and a lawsuit. The model is not the variable.",
          explain: {
            title: "The shape decides what a wrong answer costs",
            body: [
              "Almost every shipped AI feature is one of three shapes. Suggest puts a proposal in front of the user and waits: ghost text, a proposed category, a draft reply. Answer responds to a question the user asked and the user reads it. Act does something in the world: sends the email, moves the money, files the ticket.",
              "The shapes differ by an order of magnitude in what a wrong output costs. A wrong suggestion costs one keystroke. A wrong answer costs a user's belief in something false, which they may act on later. A wrong action costs whatever the action cost, and it has already happened.",
              "So the shape is the first design decision and it is a product decision, not an engineering one. Teams reach for act because it demos best. The mature move is to ship one shape lower than you want and earn your way up, because the accuracy required rises much faster than the value does.",
            ],
            points: [
              {
                term: "Suggest",
                def: "Reversible before it happens. Rejection is one keystroke. Tolerates a low hit rate and still feels good.",
              },
              {
                term: "Answer",
                def: "Reversible only if the user notices. Needs citations, because the user cannot check what they cannot see.",
              },
              {
                term: "Act",
                def: "Not reversible without an undo you built on purpose. Needs confirmation, a log, and a blast radius limit.",
              },
              {
                term: "Fallback",
                def: "What the feature does when the model fails or times out. Every shape needs one and only one shape can be silent.",
              },
            ],
          },
          case: {
            brand: "Duolingo",
            year: "2023",
            situation:
              "Duolingo shipped two GPT-4 features in a new paid tier: Explain My Answer, which tells you why your answer was wrong, and Roleplay, which lets you hold a conversation with a character.",
            what: "Both are answer shaped and neither is on the critical path. The lesson itself, the grading, the streak and the score all stayed deterministic. The model was added where variation is acceptable, in explanation and conversation, and kept out of the place where a wrong output would be unarguable, which is whether your answer was correct.",
            lesson:
              "The interesting decision was the boundary. They put the model exactly where being a bit different every time is a feature, and left the part that has to be identical every time alone.",
            sources: [
              {
                label: "Duolingo Max shows the future of AI education, company press release",
                url: "https://investors.duolingo.com/news-releases/news-release-details/duolingo-max-shows-future-ai-education",
              },
            ],
          },
          ai: {
            move: "Take screenshots of three shipped AI features and have a vision model classify the shape, the accept gesture, the visible fallback and the recovery path. Then check every claim against the live product yourself.",
            trap: "The model describes what is visually prominent and misses the safety mechanism, because the safety mechanism is deliberately quiet. It will write a paragraph about the sparkle icon and never mention that the suggestion is grey until accepted, or that there is a one line disclaimer under the answer, which are the two decisions that actually matter.",
          },
          build: {
            artefact:
              "A teardown of three shipped AI features, classified by shape, with the failure cost and fallback of each, and a stated shape for your own feature.",
            steps: [
              { do: "Pick three AI features you can use today in products you already pay for." },
              {
                do: "For each, record the shape, how you accept, how you reject, what it does when it fails, and how the product tells you it is uncertain.",
              },
              {
                do: "Estimate the cost of one wrong output in each, in user time and in money.",
              },
              {
                do: "Find the one that shipped a shape lower than it could have, and write why you think they did.",
                hint: "Look for the confirm step. A confirm step is a team saying out loud that they do not trust the model with an action yet.",
              },
              {
                do: "Declare the shape of your own feature for version one, and what would have to be true to move it up a shape.",
              },
            ],
          },
          check: [
            "What shape is your feature, and what would have to be true for it to move up one?",
            "For each teardown, what happens when the model fails or times out?",
            "Which of the three had the cheapest rejection gesture, and how did they do it?",
          ],
        },

        {
          slug: "prompt-as-product",
          title: "The prompt is the product",
          kind: "Build",
          minutes: 60,
          hook: "The system prompt is 800 words, it lives in a Slack message, three people have edited it this week, and nobody can tell you which version is running in production right now.",
          explain: {
            title: "It is a specification, so version it like one",
            body: [
              "A system prompt is not a magic incantation and it is not documentation. It is a specification that executes. It defines the role, the task, the constraints, the output format and the behaviour on edge cases, and it does all of that in production, on every request.",
              "Which means it belongs in the repository, in a file, in version control, reviewed like code and rolled back like code. If it lives in a document, a Notion page or a Slack thread, you have folklore. Nobody can diff folklore, nobody can bisect it, and when quality drops on a Tuesday nobody can say what changed.",
              "The structure that survives contact with reality is boring: role, task, constraints, output format, two or three examples, and an explicit statement of what to do when the model cannot answer. Long rambling prompts perform worse than short structured ones and cost more on every call, so length is not evidence of care.",
            ],
            diagram: "prd-anatomy",
            caption:
              "A prompt has an anatomy, and the last two sections are the ones teams leave out.",
            points: [
              {
                term: "Role and task",
                def: "Who the model is and what it is doing. One or two sentences. Everything else is subordinate to this.",
              },
              {
                term: "Constraints",
                def: "What it must never do. Written as rules, not as vibes. Each one should be testable by a golden case.",
              },
              {
                term: "Output contract",
                def: "The exact shape of the response. A schema if the output is consumed by code.",
              },
              {
                term: "Refusal clause",
                def: "What to say when it cannot answer. The section most teams omit, and the one that prevents the worst failures.",
              },
            ],
          },
          case: {
            brand: "Anthropic",
            year: "2024",
            situation:
              "Most companies treat system prompts as proprietary and hide them, which also means nobody outside the team can reason about the product's behaviour.",
            what: "Anthropic began publishing the system prompts for Claude's consumer apps in its release notes, with each change dated. Publishing them reframed the prompt as a specification with a changelog rather than a secret, and made it possible to attribute a behaviour change to a specific edit on a specific date.",
            lesson:
              "Whether or not you publish yours externally, the internal version of this is non negotiable. A prompt without a changelog means nobody can explain why the product behaved differently last week.",
            sources: [
              {
                label: "Claude system prompts, release notes",
                url: "https://docs.anthropic.com/en/release-notes/system-prompts",
              },
            ],
          },
          ai: {
            move: "Have a model restructure your prompt into role, task, constraints, output contract, examples and refusal clause, then score both versions on your eval suite and keep whichever wins.",
            trap: "The rewrite reads better and often scores worse. Models optimise for prose quality, and in doing so they smooth away the blunt, ugly, specific instruction that was carrying the behaviour, usually a line like “never state a balance you were not given”. Diff the two prompts line by line and check what disappeared before you look at the score.",
          },
          build: {
            artefact:
              "A versioned system prompt in your repo, with a changelog carrying an eval score for every version.",
            steps: [
              { do: "Move the prompt into a file in the repo. Delete every other copy that exists." },
              {
                do: "Restructure it: role, task, constraints, output contract, two examples, refusal clause.",
              },
              {
                do: "Write the changelog format: version, date, what changed, why, eval score.",
              },
              {
                do: "Deliberately make it worse. Remove the examples, score it, record the number.",
                hint: "Knowing what the examples are worth in points is how you win the argument when someone wants to cut them for token cost.",
              },
              {
                do: "Confirm you can roll back to any previous version in one command, and prove it once.",
              },
            ],
            tools: ["Git", "Your eval suite from chapter 3"],
          },
          solution: {
            summary:
              "A working prompt file is shorter than the one it replaces, and the changelog is the artefact that makes it a product.",
            walkthrough: [
              "Read the existing prompt and mark every sentence as instruction, example, or decoration. Decoration is usually a third of it.",
              "Group what is left under the six headings. Duplicates become obvious immediately, and contradictions become visible for the first time.",
              "Write the refusal clause explicitly. Something like: if the transactions provided do not contain the answer, say so and show the user what you looked at. Do not estimate.",
              "Score it. Then remove the examples and score again. Examples are typically worth several points and a great deal of format stability.",
              "Every future change gets a version number, a one line reason and a score. That is the whole discipline, and it takes a week to become normal.",
            ],
            example: {
              label: "A changelog entry that does its job",
              body: "v7, 12 March. Added explicit refusal clause for questions about accounts not in context. Eval 4.1 to 4.4 overall, refusal subset 2.9 to 4.6, no regression elsewhere. Costs 40 extra tokens per call.",
            },
          },
          check: [
            "What did removing the examples cost in eval score?",
            "Can you roll back to a previous prompt version in one command, and have you actually done it?",
            "What did the model's rewrite silently delete?",
          ],
        },
      ],
    },

    /* ================================================================ 3 */
    {
      slug: "evals",
      n: "3",
      title: "Evals: how you know it works",
      summary:
        "The core craft of the job, and almost nobody teaches it. Everything else in this level is downstream of having a number.",
      lessons: [
        {
          slug: "golden-cases",
          title: "Your first eval set",
          kind: "Build",
          minutes: 80,
          hook: "Someone changed the system prompt on Thursday. Is it better? The only answer anyone in the company has is “feels better”, and it is being said by the person who changed it.",
          explain: {
            title: "A golden case is input plus expected plus rubric",
            body: [
              "One case is three things. The input, exactly as a user would send it. What a good answer contains, written down before you look at what the model said. And a rubric, which is the rule for scoring an answer that is neither perfect nor useless, because most of them are.",
              "Where the cases come from matters more than how many there are. The first eval set is built from real failures: the tickets Priya escalated, the answers you screenshotted because they were wrong, the questions that made the demo awkward. Cases the model always passes tell you nothing, cases it always fails tell you nothing, and the signal lives where it is roughly even.",
              "The test of a rubric is whether two people score the same answer identically. If they do not, it is not a rubric, it is an opinion with a number attached, and every measurement you take with it will move for reasons you cannot explain. Write the rubric, have someone else score five answers with it, and fix the disagreements before you scale anything.",
            ],
            diagram: "eval-loop",
            caption:
              "The loop. Most teams have the left half and wonder why quality drifts.",
            points: [
              {
                term: "Input",
                def: "The real user phrasing, including the typo and the missing context. Not your cleaned up version of it.",
              },
              {
                term: "Expected",
                def: "What a good answer must contain. Written before you see the output, or you are grading to what you got.",
              },
              {
                term: "Rubric",
                def: "How to score the middle. A five point scale with an anchor sentence at each point.",
              },
              {
                term: "Boundary case",
                def: "One the model gets right about half the time. Where all your information is.",
              },
            ],
          },
          case: {
            brand: "OpenAI and SWE-bench",
            year: "2024",
            situation:
              "SWE-bench became the standard benchmark for AI coding agents. Scores on it were reported everywhere, including by people making buying decisions.",
            what: "OpenAI had 93 professional software developers hand screen 1,699 random samples from it. They found 38.3 percent of samples had underspecified problem statements and 61.1 percent had unit tests that could reject a valid solution. They released SWE-bench Verified, a 500 sample subset, after filtering out 68.3 percent of what they reviewed. Measured on the cleaned set, the same model scored roughly twice as high, because much of the apparent failure had been the benchmark rather than the model.",
            lesson:
              "Your eval set is a product artefact with its own bugs. If the set is wrong, every decision you make from it is wrong in the same direction, quietly, for months.",
            sources: [
              {
                label: "Introducing SWE-bench Verified, OpenAI",
                url: "https://openai.com/index/introducing-swe-bench-verified/",
              },
            ],
          },
          ai: {
            move: "Use a model to expand a real failure into variants: the same question phrased five ways, with the typo, in the second person, with an extra constraint. Twelve real failures become sixty cases in an hour.",
            trap: "A model asked to generate test cases produces the easy ones. It writes the well formed, unambiguous, single constraint question and never the one that breaks you: the ambiguous date, the two constraints that conflict, the account the user does not have, the question that is actually a complaint. Take the generated set and count how many are adversarial. It will be near zero. Write those yourself, from the ticket log, and keep them in a separate file so you can score them separately.",
            prompt:
              "Here is one real user question that our assistant answered badly. Produce eight variants that a real user might send: different phrasings, a typo, an implicit date, a second constraint added mid sentence, and one where the user is annoyed. Do not clean up the grammar. Do not make them easier to answer.",
          },
          build: {
            artefact:
              "Twenty golden cases with rubrics, scored across at least two prompt versions, with an inter rater check.",
            steps: [
              {
                do: "Collect 40 real questions. Priya's tickets, your own screenshots, the demo questions that went badly.",
              },
              {
                do: "Run all 40. Keep the 20 where the model is wrong or inconsistent, and note which are which.",
              },
              {
                do: "Write the expected answer and a one to five rubric for each, with an anchor sentence at each point.",
                hint: "Anchor at 3 first. Three is “answers the question but misses a constraint”. Once 3 is precise the rest are easy.",
              },
              {
                do: "Have someone else score five of your cases. Compare. Fix the rubric wherever you disagreed.",
              },
              {
                do: "Score prompt version 1. Change exactly one thing. Score version 2. Record both in the changelog.",
              },
            ],
            tools: ["Google Sheets or a CSV in the repo", "An LLM API"],
          },
          solution: {
            summary:
              "Twenty well chosen cases beat two hundred lazy ones, and the useful twenty are almost all boundary cases you already had evidence for.",
            walkthrough: [
              "Run the 40 and sort into always right, always wrong, and inconsistent. The always right pile is roughly half and it is worthless for measurement, so set it aside as a smoke test.",
              "The always wrong pile is usually three or four cases and they are structural. The model cannot answer them because the data is not in context. Those are retrieval problems, not prompt problems, and they belong in chapter 4.",
              "What is left is the eval set. Twelve to twenty cases where the answer moves depending on the prompt. Those are the ones that will tell you whether Thursday's edit helped.",
              "Write rubrics anchored at 3. A 5 answers the question with the right number and the right caveat. A 3 answers the question and misses one constraint. A 1 is confidently wrong.",
              "Score two versions. Expect the score to move by less than you hoped, and expect at least one case to get worse. That case is the most interesting thing you will learn all week.",
            ],
            example: {
              label: "One golden case, complete",
              body: "Input: “how much did i spend on food in march, not counting the work lunches i expensed”. Expected: a single figure for March dining plus groceries, explicitly excluding the four transactions tagged reimbursed, with the exclusion stated in the answer. Rubric: 5 correct figure and states the exclusion. 3 correct figure, exclusion applied silently. 2 correct figure, exclusion not applied. 1 figure wrong or invented.",
            },
          },
          check: [
            "Did your “small wording fix” move the score up or down?",
            "Which case got worse, and do you understand why?",
            "How many of the cases a model generated for you were genuinely adversarial?",
          ],
        },

        {
          slug: "llm-as-judge",
          title: "The judge has a taste, and it is not yours",
          kind: "Drill",
          minutes: 60,
          hook: "Scoring twenty cases by hand takes an hour. You will need to do it on every prompt change, forever. So you automate the scoring, and now you have two problems.",
          explain: {
            title: "Using a model to grade a model",
            body: [
              "LLM as judge means sending the input, the answer and the rubric to a second model and asking for a score. It is the only way most teams can afford to run evals often, and it works well enough to be worth doing. It also has systematic biases, and systematic bias is much more dangerous than noise, because it moves every score in the same direction.",
              "The best documented bias is length. Longer answers score higher, holding content constant. Judges also prefer their own family's writing style, prefer confident phrasing over hedged phrasing even when the hedge is correct, and are influenced by the order in which two answers are presented.",
              "Which does not mean do not use it. It means calibrate it. You measure the judge against human scores on a sample, you test it specifically for length bias, and you re-check that agreement every time you change the judge model. A judge you have calibrated is a tool. A judge you have not is a random number generator that flatters verbose answers.",
            ],
            points: [
              {
                term: "Agreement rate",
                def: "How often the judge's score matches a human's within one point, on a hand scored sample. Below 80 percent, do not trust it.",
              },
              {
                term: "Length bias",
                def: "The tendency to reward more words. Test with a correct short answer against a wrong long one.",
              },
              {
                term: "Position bias",
                def: "In pairwise comparison, preference for whichever answer came first. Fix by running both orders.",
              },
              {
                term: "Self preference",
                def: "A judge scores text that sounds like its own family higher. Use a different model family to judge when you can.",
              },
            ],
          },
          case: {
            brand: "LMArena",
            year: "2024",
            situation:
              "Chatbot Arena ranks models on head to head human votes and became the most watched leaderboard in the industry.",
            what: "The team published an analysis separating style from substance and found response length was the dominant stylistic factor in the votes, with markdown formatting adding smaller effects. When they controlled for style, the leaderboard reordered substantially: some models rose several places and one small model fell from sixth to eighteenth. They shipped style control as a standard view.",
            lesson:
              "Human raters have length bias too, which is where the models learned it. If the most scrutinised leaderboard in the field had to correct for this, your judge prompt is not immune.",
            sources: [
              {
                label: "Does style matter? Disentangling style and substance in Chatbot Arena, LMSYS",
                url: "https://www.lmsys.org/blog/2024-08-28-style-control/",
              },
            ],
          },
          ai: {
            move: "Run the calibration deliberately. Build a small adversarial pack: for five cases, write a correct answer in one sentence and a wrong answer in four paragraphs, then see which the judge prefers.",
            trap: "The judge will justify its wrong score fluently, and the justification is what fools you. It quotes the rubric back at you, sounds reasonable, and has still rewarded the confident wrong answer. Read the score without the reasoning first, or the reasoning will talk you out of your own hand score.",
            prompt:
              "Score this response from 1 to 5 against the rubric below. Quote the exact span of the response that justifies your score before giving the number. Ignore length, formatting and tone entirely. A one sentence correct answer must score higher than a detailed incorrect one.",
          },
          build: {
            artefact:
              "A calibrated judge: an agreement rate against your own scores, a documented length bias test, and the judge prompt in the repo.",
            steps: [
              { do: "Hand score all twenty of your golden cases. Do this before you write the judge prompt." },
              { do: "Write the judge prompt and run it on the same twenty. Compute agreement within one point." },
              {
                do: "Run the length bias pack: five short correct answers against five long wrong ones.",
                hint: "If the judge prefers the long wrong answer even twice out of five, your quality metric is measuring verbosity.",
              },
              {
                do: "Fix the judge prompt and re-run until agreement is above 80 percent and length bias is gone.",
              },
              {
                do: "Write down the rule for re-calibration: hand score 20 percent of cases every time you change the judge model or the rubric.",
              },
            ],
          },
          solution: {
            summary:
              "Agreement starts around 60 percent and gets to the high eighties with three specific changes to the judge prompt.",
            walkthrough: [
              "First run, the judge is generous. It gives 4s to answers you gave 2s, because they are well written and address the topic.",
              "Change one: make it quote the span of the answer that earns the score. Quoting forces it to find the evidence, and it cannot find evidence for a 4 that is not there.",
              "Change two: put the rubric anchors in the prompt verbatim, including the anchor for 3. Judges drift when they have to invent the middle of the scale.",
              "Change three: tell it explicitly that length and confidence are not evidence of correctness, and give it one worked example of a one line answer scoring 5.",
              "Re-run. Agreement usually lands in the high eighties. Where it still disagrees, the case is genuinely ambiguous and your rubric needs the fix, not the judge.",
            ],
          },
          check: [
            "What is your agreement rate with the judge, and on which cases do you still disagree?",
            "Did your judge prefer the long wrong answer? How many times out of five?",
            "What triggers a re-calibration, and who does it?",
          ],
        },

        {
          slug: "offline-and-online",
          title: "Offline evals decide, online evals confirm",
          kind: "Concept",
          minutes: 50,
          hook: "The suite says version 9 is better. You ship it. Support volume goes up. Both facts are true and you need to hold them at the same time.",
          explain: {
            title: "Two layers, two jobs",
            body: [
              "Offline evals run against a fixed set before you ship. They are fast, repeatable, and they answer one question: did this change make the thing better on the cases I already know about. They cannot tell you about the cases you have never seen, which is most of them.",
              "Online evals are what production tells you: acceptance rate, edit distance between what the model proposed and what the user kept, thumbs, retry rate, escalation to a human, abandonment. They cover every case, they are noisy, and they arrive too late to prevent anything.",
              "So they do different jobs. Offline gates the merge. Online decides whether the gate was measuring the right thing. When they disagree, the online signal is describing reality and your eval set is missing a population, which means the disagreement is a source of new golden cases rather than an argument.",
            ],
            diagram: "ab-test",
            caption:
              "Prompt changes ship behind a flag like any other change. The eval score is not the launch decision.",
            points: [
              {
                term: "Acceptance rate",
                def: "How often the user takes what was offered. The single best online signal for suggest shaped features.",
              },
              {
                term: "Edit distance",
                def: "How much they changed it before using it. Catches the answers that are accepted and then quietly rewritten.",
              },
              {
                term: "Escalation rate",
                def: "How often the user gives up and asks a human. The one that predicts support cost.",
              },
              {
                term: "Guardrail metric",
                def: "The number you never want to move. For a finance assistant, corrections filed against a stated figure.",
              },
            ],
          },
          case: {
            brand: "GitHub Copilot",
            year: "2022 to 2023",
            situation:
              "GitHub needed to know whether changes to a coding assistant used by millions were improvements, in a domain where correct has many valid forms.",
            what: "They published research using acceptance rate of suggestions as the primary production telemetry, alongside developer surveys, and reported that acceptance rate corresponded to self reported productivity better than other measures they tried, including characters of code retained over time. The offline benchmarks decided which models to consider. Acceptance rate in production decided whether the change was real.",
            lesson:
              "Pick the online metric that a user's behaviour reveals rather than their opinion. Thumbs are opinions and get pressed by almost nobody. Whether they kept the suggestion is behaviour.",
            sources: [
              {
                label: "Research: quantifying GitHub Copilot's impact on developer productivity, GitHub Blog",
                url: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/",
              },
            ],
          },
          ai: {
            move: "Have a model cluster a week of production conversations into intent categories, then compare that distribution against the distribution of your eval set to find the population you are not testing.",
            trap: "It will cluster by topic and hide the failures inside otherwise healthy clusters, because a failed conversation about spending is topically identical to a successful one. Cluster on outcome first, retried or escalated or abandoned, and only then by topic inside each outcome.",
          },
          build: {
            artefact:
              "An online eval plan: four behavioural metrics, one guardrail metric, the events required, and the rule for promoting a production failure into the golden set.",
            steps: [
              { do: "List the behavioural signals your feature can actually emit. Be honest about what is instrumented today." },
              { do: "Pick four, including one that measures giving up. Define each precisely enough that two analysts would compute it identically." },
              { do: "Pick the guardrail metric and the number that triggers a rollback." },
              {
                do: "Write the promotion rule: what makes a production failure become a golden case, and who does it weekly.",
                hint: "Weekly, one person, thirty minutes, three cases. A process that needs an hour will not survive a busy month.",
              },
              { do: "Ship your next prompt change behind a flag to ten percent and watch both layers." },
            ],
          },
          check: [
            "What is your guardrail metric and what number rolls the change back?",
            "Who promotes production failures into the golden set, and when?",
            "Which population is in production and missing from your eval set?",
          ],
        },

        {
          slug: "regression-gate",
          title: "Regression testing a prompt change",
          kind: "Build",
          minutes: 55,
          hook: "A one word edit to the system prompt fixes the complaint Priya escalated and breaks four cases that were passing last week. You find out on Thursday, from a user.",
          explain: {
            title: "No prompt change merges without a score",
            body: [
              "Prompt edits are global. Changing one sentence changes behaviour on every input, including the ones nobody was worried about, because there is no module boundary inside a language model. This is the single most surprising thing about the artefact for people who come from software.",
              "So the discipline is the same one you would apply to code with no type system: a test suite that runs on every change and a threshold that blocks the merge. Overall score must not drop, and no individual case may fall by more than one point. The second rule is the one that catches real regressions, because an average hides a case going from 5 to 1 behind two cases going from 3 to 4.",
              "Run it in CI on the pull request that touches the prompt file, and post the per case diff as a comment. The point is not the automation, it is that the conversation stops being about whether the new prompt reads better.",
            ],
            diagram: "eval-loop",
            caption:
              "The gate. It is worth building on day one, even at twenty cases, even run by hand.",
            points: [
              {
                term: "Threshold",
                def: "Overall score must not drop. State it as a number in the repo, not as a norm people remember.",
              },
              {
                term: "Per case floor",
                def: "No single case may drop by more than one point. Catches what the average conceals.",
              },
              {
                term: "Variance run",
                def: "Score each case three times and take the median, because a single run of a sampled system is a coin flip.",
              },
              {
                term: "Diff comment",
                def: "The per case before and after, posted on the pull request. Makes the regression visible to the reviewer.",
              },
            ],
          },
          ai: {
            move: "When a case regresses, give a model the old prompt, the new prompt, the input and both outputs, and ask which specific edit caused the change in behaviour. It is genuinely good at this and it will save you an afternoon.",
            trap: "If you instead ask a model to “fix the failing cases”, it will edit the eval set. It rewrites the expected answers to match what the model produced, or softens the rubric, and reports success. This is the most quietly destructive thing that will happen to your eval suite, and it usually happens because someone gave a coding agent write access to the repository and a vague instruction. Keep the eval set in a separate file, review changes to it like a schema migration, and never let the same change touch both the prompt and its expectations.",
            prompt:
              "Here are two versions of a system prompt, one input, and the two outputs. Identify which specific edit is most likely responsible for the difference in output, and explain the mechanism. Do not suggest a fix and do not modify anything.",
          },
          build: {
            artefact:
              "A regression gate: a script that scores the suite, a threshold that blocks a merge, and one caught regression written up.",
            steps: [
              { do: "Write the script: run all cases, three runs each, take the median, output a per case table." },
              { do: "Set the two thresholds and make the script exit non zero when either is breached." },
              {
                do: "Wire it to run on any change to the prompt file. CI if you have it, a pre-merge checklist if you do not.",
              },
              {
                do: "Make a change you are confident is an improvement and run the gate.",
                hint: "Pick the one word edit that fixes Priya's complaint. There is a good chance it breaks something, and that is the lesson.",
              },
              {
                do: "Write up the first regression the gate catches: what changed, what broke, what you did.",
              },
            ],
            tools: ["Git", "A CI runner or a shell script"],
          },
          solution: {
            summary:
              "The first regression is almost always a constraint added for one case that suppresses correct answers elsewhere.",
            walkthrough: [
              "Priya's complaint is that the assistant estimated a figure it should not have. You add “never estimate” to the constraints.",
              "The gate runs. Overall score is flat, which would have shipped under a threshold on the average alone.",
              "The per case floor catches it: three cases dropped from 4 to 2. They are the ones where a range was the correct answer, and now the assistant refuses those too.",
              "The fix is precision, not deletion. “Never state a specific figure that is not derived from the transactions provided. A range is acceptable when the answer depends on data outside the account, and must be labelled as an estimate.”",
              "Re-run. Priya's case is fixed, the three recovered, overall up by 0.3. That is what a working gate feels like, and it took twenty minutes instead of a week of complaints.",
            ],
          },
          check: [
            "What did your gate catch that you would have shipped?",
            "How many runs per case, and why more than one?",
            "What stops a change from editing the prompt and the expected answers in the same commit?",
          ],
        },
      ],
    },

    /* ================================================================ 4 */
    {
      slug: "grounding",
      n: "4",
      title: "Retrieval, and the wrong document",
      summary:
        "The model has never seen your user's data. Getting the right facts in front of it is most of the product, and the failure mode is confident irrelevance.",
      lessons: [
        {
          slug: "retrieval",
          title: "Retrieval, and why it is usually the answer",
          kind: "Build",
          minutes: 75,
          hook: "Users want answers about their own transactions. The model has never seen them, cannot be trained on them, and would be a privacy incident if it were.",
          scene: {
            image: "/img/scenes/domain-commerce.webp",
            alt: "A long list of merchant names and transaction descriptors, many of them cryptic.",
            caption:
              "The raw data the assistant has to answer from. SQ *BLUE BOTTLE 4471 is a coffee.",
            notes: [
              {
                from: "Ana, data",
                text: "Merchant strings are a mess. Same shop, six different descriptors depending on the processor.",
              },
              {
                from: "Dev, engineering lead",
                text: "We can put the last 90 days in context for a light user. For a heavy user that is 4,000 rows and it does not fit.",
              },
              {
                from: "Priya, support",
                text: "Most of my tickets are people asking why something was categorised the way it was. They want the receipt, not a summary.",
              },
            ],
          },
          explain: {
            title: "Retrieval is search, then prompt",
            body: [
              "Retrieval augmented generation is two systems with a fashionable name. Search finds the material that might answer the question, then that material goes into the context and the model writes the answer from it. Most of the quality of your feature is the quality of that first step, which is why arguing about which model to use is usually the least productive conversation in the room.",
              "It is the right answer for private data, for data that changes, and for anything you need to cite. Fine tuning teaches style and format, not facts, and a fine tuned model still cannot know about a transaction that happened this morning.",
              "And grounding reduces invention, it does not eliminate it. The model can still misread what it was given, combine two documents into a claim that is in neither, or answer from the wrong one with exactly the same fluency it uses for the right one. Retrieval moves you from making things up out of nothing to making things up out of something, which is a large improvement and not a guarantee.",
            ],
            diagram: "rag-pipeline",
            caption:
              "Five steps. Teams build one, three and five, and then wonder why the answers are odd.",
            points: [
              {
                term: "Chunk",
                def: "The unit you store and retrieve. A transaction, a paragraph of a help doc, a month of a statement.",
              },
              {
                term: "Embed",
                def: "Turn text into a vector so similar meanings sit near each other. Similar is not the same as relevant.",
              },
              {
                term: "Retrieve",
                def: "Fetch the nearest candidates to the query. Cheap, fast, approximate, and where most errors are born.",
              },
              {
                term: "Rank",
                def: "Reorder the candidates by actual relevance and cut the tail. The step teams skip.",
              },
              {
                term: "Ground",
                def: "Put the survivors in context with instructions to answer only from them and to cite what was used.",
              },
            ],
          },
          case: {
            brand: "Lexis+ AI and Westlaw, studied by Stanford RegLab",
            year: "2024",
            situation:
              "Two of the largest legal research providers shipped retrieval based AI research tools, marketed with strong claims about eliminating hallucination.",
            what: "Stanford researchers benchmarked them on more than 200 legal queries and reported that the tools hallucinated on a substantial share of answers, in the range of one in six or higher depending on the tool, including citing sources that did not support the claim. Retrieval reduced the error rate compared with a general purpose model and did not remove it.",
            lesson:
              "Grounding is a mitigation, not a fix, and it changes the shape of the failure rather than its existence. The dangerous residual case is an answer with a citation attached that the citation does not support, because the citation is what persuaded the user to stop checking.",
            sources: [
              {
                label: "AI on Trial: legal models hallucinate in 1 out of 6 or more benchmarking queries, Stanford RegLab",
                url: "https://reglab.stanford.edu/2024/05/24/ai-on-trial-legal-models-hallucinate-in-1-out-of-6-or-more-benchmarking-queries/",
              },
            ],
          },
          ai: {
            move: "Build the retrieval, then log the retrieved set alongside every answer during testing. Reading what was retrieved next to what was said is the fastest debugging loop in this chapter.",
            trap: "Semantic similarity is not relevance. “What did I spend on food in March?” retrieves a March rent payment, because both are March and both are expenses, and the model may fold it in. Two constraint queries are where similarity search breaks, and they are also most of what real users ask, so test them first rather than last.",
          },
          build: {
            artefact:
              "A working retrieval layer for Sona's transactions and help docs, with a retrieval log and one documented failure case.",
            steps: [
              { do: "Decide what a chunk is for transactions and for help docs. Write the rule and why." },
              { do: "Build it with a vector store. Postgres with pgvector or Chroma is enough." },
              {
                do: "Log, for each test query, the retrieved chunks with their scores and the final answer.",
              },
              {
                do: "Run 20 queries, at least 8 of them with two constraints, and mark each retrieval as good, partial or wrong.",
                hint: "Date plus category. Merchant plus amount. Person plus period. That is where it falls over.",
              },
              {
                do: "Write up one failure in full: the query, what was retrieved, what the model said, and why it was plausible.",
              },
            ],
            tools: ["Postgres with pgvector or Chroma", "An embedding API"],
          },
          solution: {
            summary:
              "The transaction chunk is the argument. Almost everyone starts with one chunk per transaction and finds it cannot answer the questions people ask.",
            walkthrough: [
              "One chunk per transaction embeds cleanly and retrieves badly for aggregates, because “how much did I spend on coffee” is not semantically near any single coffee purchase.",
              "This is the moment to notice that most transaction questions are not retrieval questions at all. They are queries, and chapter 2 already told you that. Retrieval is for the help docs, the merchant descriptions and the unstructured notes.",
              "So the design is hybrid: the model turns the question into filter parameters, code runs the query, and retrieval supplies the explanatory material such as what this merchant actually is and what the category rule says.",
              "Chunk the help docs by section with the heading repeated in the chunk, because a chunk that says “this does not apply to joint accounts” with no heading is a trap.",
              "The documented failure is usually a help doc paragraph about a different product surface being retrieved for a question about this one, and answered from confidently. Write it up in full. It is the case that justifies everything in chapter 7.",
            ],
          },
          check: [
            "Which of your 20 queries retrieved something plausible and wrong?",
            "For your worst failure, what exactly was retrieved and why did it score highly?",
            "Which of your questions should not be going through retrieval at all?",
          ],
        },

        {
          slug: "chunking-and-embeddings",
          title: "Chunking is a product decision",
          kind: "Drill",
          minutes: 60,
          hook: "The answer is definitely in the help centre. The assistant cannot find it. The paragraph that contains it begins with the word “However”.",
          explain: {
            title: "A chunk has to make sense alone, because alone is how it arrives",
            body: [
              "Chunking is how you cut documents into retrievable pieces, and it is unglamorous enough that it usually gets decided by whichever tutorial the engineer had open. It determines more of your quality than your choice of model does.",
              "Too small and the chunk loses its context: a paragraph that says “this does not apply to joint accounts” is meaningless without the heading above it. Too large and you retrieve a page to answer a sentence, which costs tokens and dilutes the relevant part among four irrelevant ones. Neither failure looks like a chunking problem when you see it in production. It looks like the model being stupid.",
              "The fix that works is to make each chunk self describing. Repeat the document title and section heading in the chunk. Add a line of context that situates it. Keep the exact numbers, dates and names verbatim, because those are what a query matches on and what a user will check the answer against.",
            ],
            points: [
              {
                term: "Semantic boundary",
                def: "Cut at headings and paragraph breaks, not at a fixed character count that slices a sentence in half.",
              },
              {
                term: "Overlap",
                def: "Repeat a little of the previous chunk so a fact spanning a boundary is not lost. Costs storage, saves answers.",
              },
              {
                term: "Contextual header",
                def: "Prepend what this chunk is and where it came from, so it can be understood on its own.",
              },
              {
                term: "Hybrid search",
                def: "Run keyword search alongside vector search. Exact terms, codes and merchant names are where keywords beat embeddings.",
              },
            ],
          },
          case: {
            brand: "Anthropic",
            year: "2024",
            situation:
              "Standard chunking destroys context: a chunk saying “revenue grew by 3 percent over the previous quarter” does not say which company or which quarter, so it cannot be retrieved reliably.",
            what: "Anthropic published a method and its measurements. Prepending a short generated context sentence to each chunk before embedding cut the top 20 retrieval failure rate by 35 percent, from 5.7 percent to 3.7 percent. Combining that with contextual keyword search cut it by 49 percent. Adding a reranking step over the candidates cut it by 67 percent, to 1.9 percent.",
            lesson:
              "The three biggest wins in that sequence are all in the retrieval pipeline and none of them is the model. The reranking step alone accounted for a third of the improvement, and it is the step most teams do not have.",
            sources: [
              {
                label: "Introducing Contextual Retrieval, Anthropic",
                url: "https://www.anthropic.com/news/contextual-retrieval",
              },
            ],
          },
          ai: {
            move: "Use a model to generate the contextual header for each chunk: a single sentence saying what this passage is and what document and section it belongs to.",
            trap: "Ask for context and you get a summary. The model rewrites the chunk in its own words, drops the exact figures, and now the chunk cannot be matched on the number the user typed and cannot be quoted back to them as evidence. Demand a header that situates the chunk and leaves the original text untouched below it, then spot check ten chunks for numbers that changed.",
            prompt:
              "Here is a document and one chunk from it. Write one sentence, maximum 30 words, situating this chunk within the document: what it is about and which section it belongs to. Do not summarise the chunk, do not restate its numbers, and do not alter the chunk text.",
          },
          build: {
            artefact:
              "A chunking rule for each of your content types, with a before and after retrieval hit rate on the same 20 queries.",
            steps: [
              { do: "Measure your current hit rate: for 20 queries, is the correct chunk in the top five." },
              {
                do: "Rewrite the chunking rule. Semantic boundaries, contextual header, verbatim numbers preserved.",
              },
              { do: "Re-index and re-measure the same 20 queries." },
              {
                do: "Add keyword search alongside the vector search and measure again.",
                hint: "Test with a merchant descriptor or a reference code. Embeddings are weak on exact strings and keywords are excellent at them.",
              },
              {
                do: "Write down the rule per content type, with the hit rate for each, in the repo next to the indexer.",
              },
            ],
          },
          check: [
            "What was your hit rate before and after re-chunking?",
            "What did the contextual header cost in tokens and in indexing time?",
            "Which queries only keyword search could answer?",
          ],
        },

        {
          slug: "the-ranking-step",
          title: "The ranking step everyone skips",
          kind: "Drill",
          minutes: 55,
          hook: "The assistant tells a user that Sona charges a fee on early withdrawals. It does not. The sentence came from a help article about a product Sona discontinued in 2023, which is still in the index.",
          explain: {
            title: "Retrieval is a funnel and the last stage is missing",
            body: [
              "Vector search is optimised to be fast and approximate over a large index. It returns the nearest candidates, and near is a weak claim. Something is always nearest, even when nothing in your index answers the question, which is why an empty result is so rare and a wrong result so common.",
              "The stage that fixes it is reranking: take the top candidates, score each one against the query with a slower and more accurate model, keep the best few and discard the rest. It is one extra call, it typically costs single digit milliseconds to tens of milliseconds, and it is the highest return component in the pipeline.",
              "The other half is a floor. Below a relevance score, retrieve nothing and let the product say so. A pipeline with no floor will always hand the model something, and a model handed something will almost always use it. That is the mechanism behind the confident answer from the wrong document, and it is not a model failure. It is a missing threshold in your code.",
            ],
            diagram: "funnel",
            caption:
              "Two hundred candidates, twenty retrieved, four ranked, three above the floor. The last two stages are the ones nobody builds.",
            points: [
              {
                term: "Recall stage",
                def: "Cast wide and cheap. Twenty to a hundred candidates. Optimised for not missing the right one.",
              },
              {
                term: "Rerank stage",
                def: "Slow and accurate over that shortlist. Optimised for putting the right one first.",
              },
              {
                term: "Relevance floor",
                def: "The score below which you return nothing. The single most important number in the pipeline.",
              },
              {
                term: "Freshness and scope",
                def: "Filters applied before ranking: this user, this account, current documents only. Metadata beats cleverness.",
              },
            ],
          },
          case: {
            brand: "Google AI Overviews",
            year: "2024",
            situation:
              "Google launched AI generated summaries above search results at scale, grounded in retrieved web pages.",
            what: "Within days, screenshots spread of an overview suggesting adding non toxic glue to pizza sauce to stop cheese sliding off. Google's own explanation was that the system had surfaced content from a satirical forum post, because for that nonsensical query there was almost no genuine web content to retrieve, a situation they described as a data void. They shipped restrictions on when overviews trigger and on which sources can be used for them.",
            lesson:
              "When nothing good exists, retrieval returns whatever is least far away, and the generation step gives it the same confident voice it gives a good source. The mitigation was a threshold and a source policy, not a better model.",
            sources: [
              {
                label: "AI Overviews: about last week, Google",
                url: "https://blog.google/products/search/ai-overviews-update-may-2024/",
              },
            ],
          },
          ai: {
            move: "Use a model as the reranker: give it the query and ten candidate chunks and have it score each for whether it actually answers the question, then keep what clears your floor.",
            trap: "An LLM reranker has the same taste as an LLM judge. It rewards chunks that are fluent, well formatted and topically confident, and penalises the terse table row that contains the actual number. Check its ordering against your own on twenty queries before you trust it, and be suspicious whenever the prose page outranks the data.",
            prompt:
              "Query: {query}. For each numbered passage below, output a score from 0 to 10 for whether this passage contains information that directly answers the query, and one sentence of justification quoting the relevant span. A passage on the right topic that does not contain the answer scores 3 or below. Formatting and writing quality are irrelevant.",
          },
          build: {
            artefact:
              "A reranking stage and a relevance floor, with a measured before and after on wrong document errors.",
            steps: [
              { do: "Take the 20 queries from the previous lesson and record how often the top result is the right document." },
              { do: "Add a reranking call over the top ten candidates. Re-measure." },
              {
                do: "Find your floor: plot the relevance score of correct retrievals against incorrect ones and pick the cut.",
                hint: "Include five queries whose answer is genuinely not in the index. They are the only way to calibrate a floor.",
              },
              {
                do: "Implement the empty path: what the product says and shows when nothing clears the floor.",
              },
              {
                do: "Add scope filters before ranking: this user, this account, current documents only. Delete the discontinued product docs from the index or tag them.",
              },
            ],
          },
          solution: {
            summary:
              "The floor is set by the queries with no answer, and it is the only part of this chapter that prevents the failure rather than reducing it.",
            walkthrough: [
              "Run the five unanswerable queries and look at the top relevance scores. They will be lower than the answerable ones but not zero, typically clustering somewhere in the middle of the range.",
              "Set the floor above that cluster, accepting that you will occasionally refuse a question you could have answered. That trade is correct for a finance product and it should be a stated decision, not an accident.",
              "Reranking usually moves top result accuracy up by a large margin on two constraint queries, because the recall stage was returning the right chunk at position four.",
              "Scope filters catch the discontinued product problem in one line, and no amount of prompt engineering would have. Stale documents in the index are a content operations problem wearing an AI costume.",
              "The empty path is the deliverable. “I could not find anything in your account or our help centre that answers this. Here are the transactions I looked at, and here is how to reach Priya.”",
            ],
          },
          check: [
            "What is your relevance floor, and how did you choose the number?",
            "How much did reranking move top result accuracy on two constraint queries?",
            "What does the product show when nothing clears the floor?",
          ],
        },
      ],
    },

    /* ================================================================ 5 */
    {
      slug: "agents",
      n: "5",
      title: "Tools, loops and agents",
      summary:
        "One call is a feature. A loop is a system with a budget, a blast radius and a failure mode nobody has costed.",
      lessons: [
        {
          slug: "one-call-or-loop",
          title: "One call, or a loop",
          kind: "Concept",
          minutes: 50,
          hook: "The demo runs ten times in a row without a hitch, in front of the board. Nobody in the room can tell you what happens on the hundredth run, and neither can you.",
          explain: {
            title: "A loop multiplies everything, including the error rate",
            body: [
              "A single call is one prompt and one response. Add tools and the model can ask your code to do something, get a result back and continue, which is still one turn if you stop there. It becomes an agent when the model decides how many steps to take, which tools to call, and when it is finished.",
              "The number that should worry you is compounding reliability. A step that is right 95 percent of the time is right 95 percent of the time. Ten sequential steps at 95 percent each is about 60 percent, and there is no fault tolerance in a chain where step four consumed the output of step three. Agents fail in the middle, with half the work done and no transaction to roll back.",
              "Which is why the demo is misleading. A demo is a handful of runs on a happy path with a person steering. Reliability is the distribution over hundreds of runs including the ones where the API times out, the tool returns an empty list, and the model interprets the empty list as permission to invent. Ask for the distribution, not the demo.",
            ],
            diagram: "user-flow",
            caption:
              "The loop. Every return arrow is a place the state can be wrong and the model will keep going anyway.",
            points: [
              {
                term: "Single call",
                def: "One prompt, one response. Predictable cost, predictable latency, easy to evaluate.",
              },
              {
                term: "Tool call",
                def: "The model requests a function, your code runs it, the result goes back in. You control what exists.",
              },
              {
                term: "Loop",
                def: "The model decides the next step until it declares it is done. Cost and latency become distributions.",
              },
              {
                term: "Step cap",
                def: "The maximum iterations before you stop it. Not an optimisation, a safety requirement.",
              },
            ],
          },
          case: {
            brand: "Devin, evaluated by Answer.AI",
            year: "2025",
            situation:
              "Devin launched as an autonomous software engineer with a demo video that circulated widely and drove an enormous valuation.",
            what: "The team at Answer.AI ran it on 20 real tasks over a month and published the results: 3 successes, 14 failures, 3 inconclusive. Their description of the failures is the useful part. Devin would work for hours down an unproductive path rather than stopping, and the tasks it could reliably do were small enough that doing them by hand was faster.",
            lesson:
              "A demo is a sample of one from the good tail. The question to ask a vendor, and to ask yourself, is what the success rate is over a set of tasks somebody else chose.",
            sources: [
              {
                label: "Thoughts on a month with Devin, Answer.AI",
                url: "https://www.answer.ai/posts/2025-01-08-devin.html",
              },
            ],
          },
          ai: {
            move: "Run your candidate agent flow 50 times on the same five tasks and plot the distribution of steps, cost and outcome. Then show the p95, not the demo.",
            trap: "Asked whether a task needs an agent, a model will design an agent. The framing of the question invites the elaborate answer, and multi step architectures are heavily represented in what it read. Ask instead for the simplest implementation that meets the requirement and make it justify every step beyond the first.",
          },
          build: {
            artefact:
              "A reliability profile for one candidate flow: 50 runs, outcome distribution, and a written recommendation on single call, tools, or loop.",
            steps: [
              { do: "Pick one task in Sona's assistant that could plausibly need multiple steps." },
              { do: "Implement it as a single call with all the context up front, and score it." },
              { do: "Implement it as a loop with tools, and score it on the same cases." },
              {
                do: "Run each 50 times. Record success rate, steps taken, cost, and wall clock time.",
                hint: "Report the p95 alongside the median for all three. The median is the demo, the p95 is the support ticket.",
              },
              {
                do: "Write the recommendation with the distribution attached, and state the step cap you would ship with.",
              },
            ],
          },
          solution: {
            summary:
              "The single call usually wins, and when the loop wins it is because the task genuinely cannot be specified in advance.",
            walkthrough: [
              "Run the single call version first. For most assistant tasks it succeeds at a similar rate, costs a fifth as much and returns in a fifth of the time.",
              "The loop wins when the next step depends on what the previous step found, and you could not have known in advance which query to run. That is a real category and it is smaller than it looks.",
              "Look at the step distribution for the loop. It will be bimodal: most runs take two or three steps, and a tail takes eight or more. The tail is where all your cost and every bad outcome lives.",
              "The tail is also diagnosable. Read five runs from it. They are usually the model retrying a tool that returned an empty result, because nothing told it that empty means stop.",
              "Ship the single call for the cases it handles and route only the genuinely open ended ones into the loop, with a step cap set just above your observed p95.",
            ],
          },
          check: [
            "What is the p95 number of steps, cost and latency for your loop?",
            "What is in the tail, and what causes it?",
            "Which tasks did the single call handle just as well?",
          ],
        },

        {
          slug: "tool-design",
          title: "Designing the tool, not the prompt",
          kind: "Build",
          minutes: 60,
          hook: "You are about to give a probabilistic system a function called delete_transactions. Take a moment.",
          explain: {
            title: "The tool definition is the contract, and the blast radius is your decision",
            body: [
              "A tool is a function the model can request, described to it in words. Which means the description is a product surface. A vague name and an under specified parameter list produce misuse that looks like model stupidity and is actually a bad interface, in exactly the way a badly labelled button produces user error.",
              "Separate reads from writes and treat them completely differently. Reads can be liberal. Writes need a narrow scope, a confirmation step for anything a user would care about, idempotency so a retry does not double charge anything, and a log that lets you reconstruct what happened. Never give a model a tool whose blast radius you would not accept from a script with a bug in it, because that is the correct mental model.",
              "Then design the return values, which is the part everyone forgets. Every tool result is one of several states: success with data, success with nothing, invalid input, permission denied, timed out, upstream error. If empty and error look the same to the model, it will treat both as an invitation to guess, and the guess will be fluent.",
            ],
            diagram: "states-matrix",
            caption:
              "Every tool has these states. Most tool definitions describe one of them.",
            points: [
              {
                term: "Narrow scope",
                def: "get_transactions(account_id, from, to, category) beats query_database(sql). Give it the shape you can validate.",
              },
              {
                term: "Read versus write",
                def: "Different rules, different review, different logging. Writes need a human in front of them until proven otherwise.",
              },
              {
                term: "Result states",
                def: "Success, empty, invalid, denied, timeout, error. Distinct and explicit, each with an instruction for what to do.",
              },
              {
                term: "Blast radius",
                def: "The worst thing one call can do. Cap it in the tool, not in the prompt, because prompts are advisory.",
              },
            ],
          },
          case: {
            brand: "Replit",
            year: "2025",
            situation:
              "A user running Replit's coding agent during a self imposed code freeze found that it had deleted a live production database, then reported that a rollback was not possible.",
            what: "The incident was widely reported and the company's CEO responded publicly, calling it unacceptable. Rollback turned out to be possible. Within days Replit described shipping changes including separation of development and production databases, and a planning mode where the agent can discuss changes without executing them.",
            lesson:
              "Every fix in that list is an environment and tool design change. None of them is a better prompt, because you cannot instruct your way out of having handed a probabilistic system a destructive capability.",
            sources: [
              {
                label: "Replit responds after AI agent deleted a production database, The Register",
                url: "https://www.theregister.com/2025/07/22/replit_saastr_response/",
              },
            ],
          },
          ai: {
            move: "Have a model attack your tool definitions: given only the descriptions and parameter lists, ask what the worst thing is that could be done with this set, and which two tools combine into something neither allows alone.",
            trap: "It reviews each tool in isolation and rates them all safe. The dangerous capability is almost always a composition: a read tool that accepts an arbitrary account identifier plus a summarise tool becomes a data exfiltration path, and neither tool is wrong on its own. Ask specifically about pairs and about what an attacker controlling the user message could chain.",
          },
          build: {
            artefact:
              "A tool specification for your feature: every tool with scope, parameters, all result states, and a blast radius statement.",
            steps: [
              { do: "List every tool your feature needs. Mark each as read or write." },
              {
                do: "For each, write the description exactly as the model will see it, and the parameter validation your code performs.",
              },
              {
                do: "Enumerate the result states and write the literal string the tool returns for each, including empty.",
                hint: "Empty should say what was searched and that nothing matched, not return an empty array. Empty arrays get interpreted as zero, and zero is a number a user will act on.",
              },
              {
                do: "For every write tool, state the blast radius, the confirmation step and the undo path. If any of the three is missing, cut the tool from version one.",
              },
              {
                do: "Run the composition attack on your own set and fix whatever pair you find.",
              },
            ],
          },
          solution: {
            summary:
              "Version one of a tool set for a finance assistant should contain no write tools at all, and the empty state should be a sentence.",
            walkthrough: [
              "Start with reads only: get_transactions, get_account_summary, search_help_docs. Everything a user asks for in the first month is answerable with those three.",
              "Scope every one of them to the authenticated user in your code, never as a parameter the model fills. An account_id the model can choose is a data leak waiting for a phrasing that triggers it.",
              "Write the empty state as prose: “No transactions matched category=dining between 2024-03-01 and 2024-03-31 in account ending 4471.” The model can relay that honestly. An empty array becomes “you spent nothing on dining in March”, which is a different and false claim.",
              "The first write tool people want is recategorise. It is a good candidate because it is scoped to one row, has an obvious undo and a user visible confirmation. Ship that one, with the confirmation, and nothing else.",
              "Log every tool call with parameters and result. When something goes wrong in production this log is the only account of what the system actually did.",
            ],
          },
          check: [
            "What does your empty state return, verbatim?",
            "For every write tool: blast radius, confirmation, undo. Any missing?",
            "Which pair of tools combined into something you did not intend?",
          ],
        },

        {
          slug: "loop-cost",
          title: "What a loop costs when it goes wrong",
          kind: "Simulation",
          minutes: 55,
          hook: "A user asks a question that has no answer. The agent tries eleven times, calls four tools, spends two dollars and forty cents, and returns something wrong. It will do this every time that question is asked.",
          explain: {
            title: "Cost stops being a number and becomes a distribution",
            body: [
              "With a single call you can multiply cost per call by calls per month and be roughly right. With a loop you cannot, because cost per task has a long tail and the tail is where the money is. Ten percent of tasks can easily be half the bill, and your median will keep telling you everything is fine.",
              "The runaway shapes are recurring and recognisable. The retry loop, where a tool keeps failing and the model keeps trying. The ping pong, where two steps undo each other. The context spiral, where every step appends its result until each call is enormous. And the worst one, the silent success, where it does something wrong efficiently and reports that it is finished.",
              "So a loop ships with limits, in code, not in the prompt. A step cap, a token budget per task, a wall clock timeout, and a kill switch you can hit for everyone without a deploy. Then you monitor the tail rather than the average, and you alert on cost per task, not just on errors, because runaways often complete successfully.",
            ],
            points: [
              {
                term: "Cost per task",
                def: "The unit that matters for a loop. Track the distribution, and alert on p99.",
              },
              {
                term: "Step cap",
                def: "Hard maximum iterations. Set just above your observed p95 and log every task that hits it.",
              },
              {
                term: "Token budget",
                def: "A ceiling per task independent of steps, because one step can be enormous.",
              },
              {
                term: "Kill switch",
                def: "A flag that disables the loop for everyone in seconds. Needed before launch, not after the first incident.",
              },
            ],
          },
          case: {
            brand: "Anthropic and Andon Labs, Project Vend",
            year: "2025",
            situation:
              "Anthropic let Claude run a small automated shop in its office for about a month, with tools for web search, email, note keeping, talking to customers over chat, and setting prices.",
            what: "The company published the failures in detail. The agent sold items below cost, gave in easily to requests for discounts, did not adjust prices in response to demand, failed to take an obviously profitable offer, and directed customers to pay into a Venmo account it had hallucinated. Over one period it also asserted it was a person who would deliver items while wearing specific clothing. The business lost money over the run.",
            lesson:
              "This is the most detailed public account of an agent loop in a real environment, published by the vendor. Every failure is mundane and none of them would be caught by a demo. Read the write up before you scope an agent.",
            sources: [
              {
                label: "Project Vend, Anthropic research",
                url: "https://www.anthropic.com/research/project-vend-1",
              },
            ],
          },
          ai: {
            move: "Simulate the runaway before you ship it. Feed the loop inputs designed to have no answer, tools stubbed to fail or return empty, and a user who keeps rephrasing, then watch the cost per task distribution.",
            trap: "A model asked to generate adversarial inputs for your agent produces the dramatic ones, the injections and the jailbreaks. The runaways in production come from the boring cases: an empty result, a timeout, an ambiguous date, a question about an account that was closed. Write those yourself, because they are specific to your data and no general model knows what your data looks like.",
          },
          build: {
            artefact:
              "A loop budget implemented in code, plus a runaway simulation report with the cost distribution before and after the limits.",
            steps: [
              { do: "Run 50 tasks including ten designed to have no clean answer. Record cost and steps for each." },
              { do: "Plot the distribution. Identify the tail and read five tasks from it in full." },
              {
                do: "Implement the four limits: step cap, token budget, wall clock timeout, kill switch flag.",
              },
              {
                do: "Decide what the user sees when a limit is hit. It must not look like an answer.",
                hint: "“I could not work this out and I have stopped rather than guess. Here is what I checked.” Stopping visibly is a feature.",
              },
              {
                do: "Re-run the 50 and report the new distribution, plus your monthly cost at three usage volumes.",
              },
            ],
          },
          check: [
            "What is your p99 cost per task, and what is in it?",
            "What does a user see when the step cap is hit?",
            "How fast can you turn the loop off for everyone, and have you tested it?",
          ],
        },
      ],
    },

    /* ================================================================ 6 */
    {
      slug: "cost",
      n: "6",
      title: "Cost, latency and the shape of a good answer",
      summary:
        "It works. It takes eleven seconds and costs eleven cents. Neither number survives contact with launch.",
      lessons: [
        {
          slug: "perceived-latency",
          title: "Streaming changes perceived latency, not real latency",
          kind: "Build",
          minutes: 50,
          hook: "Two versions of the same answer take exactly 8.2 seconds. Users rate one of them fast. The difference is what happened in the first 400 milliseconds.",
          explain: {
            title: "Waiting is a design problem before it is an engineering one",
            body: [
              "Time to first token and time to complete are different numbers and users feel them differently. Streaming does not make the answer arrive sooner, it makes the waiting legible, and legible waiting is tolerated for far longer than a blank space. It is usually the cheapest perceived performance work available.",
              "The classic thresholds still apply. Around a tenth of a second feels instant, around a second keeps a train of thought unbroken, and around ten seconds is the edge of attention, after which people switch tasks and your completion rate falls off a cliff. Streaming buys you the third case. It does not rescue a system whose first token takes six seconds.",
              "The rest of the work is honest sequencing. Show the retrieval step happening, because a user who can see you looking things up reads the pause as work rather than as a hang. Render partial structure as it arrives. And never stream a number you might revise, because watching a balance change while it is being written destroys trust faster than a slow answer ever will.",
            ],
            points: [
              {
                term: "Time to first token",
                def: "How long before anything appears. The number that decides whether it feels fast.",
              },
              {
                term: "Time to complete",
                def: "How long until the answer is done. The number that decides your cost and your abandonment.",
              },
              {
                term: "Progressive disclosure",
                def: "Show the steps: searching, reading, answering. Turns dead time into visible work.",
              },
              {
                term: "Do not stream the number",
                def: "Stream prose, commit figures once. A revised figure mid stream reads as a mistake, and often is.",
              },
            ],
          },
          ai: {
            move: "Ask a model to restructure your output format so the useful part arrives first: answer, then the caveat, then the working. Then measure how many users stop reading after the first sentence, which is most of them.",
            trap: "Left alone, models front load preamble. “Great question. Let me look at your March transactions across your accounts.” That is three seconds of streaming before a single useful word, and it is the default because it looks conversational. Ban the preamble in the prompt and check it stayed banned in your eval set, because it creeps back in on every rewrite.",
          },
          build: {
            artefact:
              "A latency budget with measured p50 and p95 for time to first token and time to complete, plus a streaming implementation and a before and after.",
            steps: [
              { do: "Instrument both numbers across 50 real requests. Report p50 and p95 for each." },
              { do: "Implement streaming and re-measure time to first token." },
              {
                do: "Add progressive disclosure for the retrieval step and any tool calls.",
              },
              {
                do: "Restructure the output so the answer comes first and the working comes last.",
                hint: "Then test whether the caveat is still read. If it is at the bottom, in most cases it is not.",
              },
              {
                do: "Watch five people use it and record where they stop reading and where they look impatient.",
              },
            ],
          },
          check: [
            "What is your p95 time to first token, not your median?",
            "Where do users stop reading, and what is below that line?",
            "What does your product show during retrieval?",
          ],
          references: [
            {
              label: "Response time limits, Nielsen Norman Group",
              url: "https://www.nngroup.com/articles/response-times-3-important-limits/",
            },
          ],
        },

        {
          slug: "cost-latency",
          title: "Routing, caching and the cheapest model that passes",
          kind: "Drill",
          minutes: 60,
          hook: "Finance has done the arithmetic you were avoiding. At current usage the assistant costs more per month than the two engineers building it.",
          explain: {
            title: "Three levers, in order of how much they return",
            body: [
              "Caching first, because it is nearly free to implement and the savings are structural. Your system prompt and your few shot examples do not change between calls, and you are currently paying full price for them on every request. Providers price cached input at a fraction of the normal rate, so this is a discount on the largest line in your bill for a configuration change.",
              "Routing second. Most queries are easy. Classify the incoming question cheaply, send the easy ones to a small model, escalate the hard ones. The classifier itself is a small call and it pays for itself many times over, provided you measure quality per tier with your eval suite rather than assuming the small model is fine.",
              "Trimming third. Shorter prompts, fewer retrieved chunks, capped output length. This is the lever teams reach for first and it returns least, and it is also the one that quietly costs quality, because the examples you cut to save tokens were worth points on your eval suite.",
            ],
            points: [
              {
                term: "Prompt caching",
                def: "Reuse of the unchanging prefix at a large discount. Requires the stable part to come first, so prompt order becomes a cost decision.",
              },
              {
                term: "Routing",
                def: "Classify, then pick a model per class. Needs eval scores per tier or it is guesswork with a spreadsheet.",
              },
              {
                term: "Output cap",
                def: "A maximum response length. Output tokens are the expensive ones and long answers are rarely better.",
              },
              {
                term: "Quality per rupee",
                def: "The number to optimise. Cheapest model that clears your eval threshold, not cheapest model.",
              },
            ],
          },
          case: {
            brand: "Anthropic and OpenAI prompt caching",
            year: "2024",
            situation:
              "Every product sending a large fixed system prompt was paying full input price for the identical text on every request, which for most applications is the majority of input tokens.",
            what: "Both providers shipped prompt caching as a pricing mechanism. Anthropic's launch reported reductions of up to 90 percent in cost and up to 85 percent in latency for long prompts, with a worked example of a 100,000 token context going from 11.5 seconds to 2.4 seconds, and priced cache reads at a tenth of base input with cache writes at a premium. OpenAI shipped automatic caching with a discount on cached input tokens.",
            lesson:
              "The largest cost lever in most AI products is a configuration change, and it is available because the providers made your prompt structure a pricing decision. Put the stable content first, and the order of your prompt is now an economic choice.",
            sources: [
              {
                label: "Prompt caching with Claude",
                url: "https://claude.com/blog/prompt-caching",
              },
              {
                label: "Prompt caching in the API, OpenAI",
                url: "https://openai.com/index/api-prompt-caching/",
              },
            ],
          },
          ai: {
            move: "Run your eval suite against three models at different price points and plot score against cost per call. Then segment the results by case difficulty before you conclude anything.",
            trap: "The cheap model scores within a few points overall and fails badly on the specific hard cases users care most about, because your eval set is mostly medium cases and the average hides the tail. Segment first. A model that is fine on the easy 80 percent and hopeless on the hard 20 percent is a routing input, not a replacement.",
          },
          build: {
            artefact:
              "A cost sheet with three levers costed and a routing recommendation backed by per tier eval scores.",
            steps: [
              { do: "Measure current cost per interaction and the monthly total at today's volume." },
              {
                do: "Restructure the prompt so everything stable comes first, enable caching, and measure the new cost.",
              },
              {
                do: "Run the eval suite on three models. Plot quality against cost, segmented into easy and hard cases.",
              },
              {
                do: "Build a cheap classifier for query difficulty and score its accuracy on your eval inputs.",
                hint: "Score the classifier separately. A router that misroutes 15 percent of hard queries to the small model is worse than no router.",
              },
              {
                do: "Write the recommendation: which model for which class, what quality it costs, and the monthly saving at three volumes.",
              },
            ],
            tools: ["Google Sheets", "Your eval suite"],
          },
          check: [
            "What did caching alone save, as a percentage?",
            "How much quality does the cheap model cost you specifically on hard cases?",
            "How accurate is your router, and what happens to a hard query it misroutes?",
          ],
        },

        {
          slug: "unit-economics-of-a-button",
          title: "The unit economics of a button that costs money",
          kind: "Build",
          minutes: 60,
          hook: "Every press of this button costs Sona real money. Every subscription is one hundred and ninety nine rupees a month, flat. Somebody has to work out what happens when the top one percent of users press it four hundred times.",
          explain: {
            title: "Software with a marginal cost is a different business",
            body: [
              "Classic software had a marginal cost near zero, which is why unlimited plans worked and why the whole discipline learned to optimise for engagement without ever checking what engagement cost. An AI feature breaks that assumption in the most direct way possible: usage is a variable cost and your heaviest users are your least profitable ones.",
              "So model the distribution, never the average. Usage is heavily skewed. The mean user might cost eight rupees a month and the ninety ninth percentile two hundred, and a flat subscription priced against the mean loses money on exactly the users you were most pleased to have.",
              "Then pick a shape. Bundle and absorb the cost, add a paid tier, meter with credits, or price on outcomes. Each says something different to the customer and each fails differently. Metering caps your exposure and makes people ration a feature you wanted them to adopt. Bundling drives adoption and hands your margin to your power users. There is no neutral choice here, which is why it belongs to product rather than to finance.",
            ],
            diagram: "cost-curve",
            caption:
              "Cost per user against usage percentile. The average is a line most of your cost is nowhere near.",
            points: [
              {
                term: "Cost per interaction",
                def: "Tokens in and out, retrieval, reranking, judge calls if you run them in production. All of it, not just the main call.",
              },
              {
                term: "Usage distribution",
                def: "Interactions per user per month at p50, p90, p99. The only view that predicts your bill.",
              },
              {
                term: "Contribution margin",
                def: "Revenue per user minus the cost to serve them. Compute it at each percentile, not on the average user.",
              },
              {
                term: "Pricing shape",
                def: "Bundled, tiered, metered or outcome based. A product decision with a customer facing consequence.",
              },
            ],
          },
          case: {
            brand: "Intercom Fin",
            year: "2023 onwards",
            situation:
              "Intercom shipped an AI support agent into a market where software was sold per seat, while the agent's cost scaled with conversations rather than with seats.",
            what: "They priced it per resolution, publicly listed at 99 cents, charging only when the agent actually resolved a customer's issue rather than for usage or seats. The pricing and the definition of a resolution are published on their pricing page, which means the definition itself became a product surface that customers scrutinise.",
            lesson:
              "Outcome pricing aligns your bill with the value delivered and forces you to define the outcome precisely enough to charge for it. That definition is now something you can be argued with about, which is uncomfortable and is also the correct level of accountability.",
            sources: [
              {
                label: "Intercom pricing, Fin per resolution",
                url: "https://www.intercom.com/pricing",
              },
            ],
          },
          ai: {
            move: "Build the model in a sheet, then have a model stress test it: which single assumption here, if wrong by twenty percent, changes the recommendation?",
            trap: "Never let a chat window do the arithmetic. It produces confident wrong totals on multi step calculations and you will quote them to finance. Make it write the formulas, then compute them yourself in the sheet, and check the two agree on one row by hand.",
          },
          build: {
            artefact:
              "A unit economics sheet for your AI feature with a usage distribution, contribution margin by percentile, and a pricing recommendation.",
            steps: [
              { do: "Compute the fully loaded cost of one interaction, including retrieval, reranking and any second model calls." },
              {
                do: "Get or estimate the usage distribution: interactions per user per month at p50, p90 and p99.",
              },
              {
                do: "Compute contribution margin at each percentile against your current price.",
              },
              {
                do: "Model three pricing shapes and state what each does to adoption and to your worst case exposure.",
                hint: "Also model model costs falling by half. That has happened repeatedly and it turns a lot of no gos into gos, so know which of your decisions it would reverse.",
              },
              {
                do: "Write a three line recommendation with the number that drove it, and the usage level at which you would revisit.",
              },
            ],
            tools: ["Google Sheets"],
          },
          solution: {
            summary:
              "The p99 user is the whole decision, and a soft cap protects the business without punishing normal use.",
            walkthrough: [
              "Compute cost per interaction fully loaded. It is usually 40 to 80 percent higher than the main model call alone once retrieval, reranking and any judging are counted.",
              "Multiply through the distribution. The p50 user is comfortably profitable and the p99 user may cost more than the subscription. This is normal and it is not by itself a reason to meter.",
              "Check what fraction of total cost the top one percent represents. If it is under a fifth, absorb it and treat it as marketing. If it is over a third, you need a shape change.",
              "The usable middle is a generous soft cap: unlimited in the interface until a level that ninety nine percent of users never reach, then a slower tier or a prompt to upgrade. The cap protects the business and never touches a normal user.",
              "State the revisit trigger as a number. “If p99 usage doubles or model prices do not fall by March, we move to credits.” That converts an argument into a scheduled decision.",
            ],
            example: {
              label: "The recommendation, three lines",
              body: "Fully loaded cost is 1.4 rupees per interaction. The p50 user costs us 11 rupees a month against 199 of revenue, the p99 user costs 280. The top one percent is 31 percent of total spend, so we ship a soft cap at 200 interactions a month, which affects 0.8 percent of users, and revisit if p99 usage doubles.",
            },
          },
          check: [
            "What is your contribution margin at p99, and is it negative?",
            "What fraction of total cost is your top one percent of users?",
            "Which single assumption, if wrong by twenty percent, flips your recommendation?",
          ],
        },
      ],
    },

    /* ================================================================ 7 */
    {
      slug: "wrongness",
      n: "7",
      title: "Designing for wrongness",
      summary:
        "Your feature is right ninety two percent of the time. This chapter is about the other eight, which will happen in public, about someone's money.",
      lessons: [
        {
          slug: "interface-safety",
          title: "The interface is the safety layer",
          kind: "Build",
          minutes: 70,
          hook: "Sona's assistant just told a user their rent was categorised as entertainment, confidently, with no citation, no way to correct it and no way to see what it looked at.",
          scene: {
            image: "/img/scenes/domain-b2b.webp",
            alt: "A meeting room with a security questionnaire open on a laptop and a printed list of questions.",
            caption:
              "The enterprise deal that arrived this week, and the 90 question security review attached to it.",
            notes: [
              {
                from: "Maya, founder",
                text: "Big prospect. Their security team wants to know what happens when the assistant is wrong and what we do with their data. I said we had documentation.",
              },
              {
                from: "Priya, support",
                text: "I have 14 tickets that are all the same shape: the assistant said a number, the user believed it, the number was wrong.",
              },
              {
                from: "Tom, design",
                text: "I can build any of the safety patterns you want. I need to know which ones and where, and I need it before Thursday.",
              },
            ],
          },
          explain: {
            title: "Make wrong answers cheap to reject",
            body: [
              "The model's accuracy is roughly fixed by the time you are designing the screen. What is entirely yours is the cost of a wrong answer, and that cost is set by the interaction pattern. The same model is delightful behind a suggestion you dismiss with one key and dangerous behind a button that acts on your account.",
              "Four patterns carry most of it. Suggest rather than act, so nothing happens until a person agrees. Preview before commit, so the person can see what will happen. Undo, in one gesture, for anything that did happen. And show the working, because a user who can see which four transactions produced a figure can catch the error you could not.",
              "Then the harder half. Design the wrong answer itself, on purpose. Write the copy for the case where retrieval found nothing. Draw the state where confidence is low. Decide what a partially correct answer looks like. These states are most of the product's contact with reality and they get built at 6pm on a Friday by an engineer guessing, unless you specify them.",
            ],
            diagram: "states-matrix",
            caption:
              "Every AI surface has these states. Most designs have two of them.",
            points: [
              {
                term: "Cost of rejection",
                def: "What it takes the user to say no. One key is good. Reading four paragraphs to notice it is wrong is not.",
              },
              {
                term: "Show the working",
                def: "The transactions used, the document cited, the filter applied. Checkable beats confident.",
              },
              {
                term: "Undo",
                def: "Available for a real window of time, on anything the feature did. Not a confirmation dialog wearing a disguise.",
              },
              {
                term: "Designed failure states",
                def: "Empty, low confidence, partial, timed out, refused. Written copy for each, signed off like any other screen.",
              },
            ],
          },
          case: {
            brand: "GitHub Copilot",
            situation:
              "Copilot's suggestions are not accepted most of the time, and the product is enormously useful anyway.",
            what: "The interaction design does the work. Suggestions appear as grey ghost text inline, in place, and are accepted with a single Tab. A wrong suggestion costs you one keystroke to ignore and it never overwrites anything you wrote. GitHub's own published research uses acceptance rate as the primary measure of value, which is an admission built into the design: most suggestions will be declined, and that is the expected operating mode rather than a failure.",
            lesson:
              "The same model behind a generate button that rewrote your file would have been unusable at the same accuracy. Accuracy was never the variable. The cost of being wrong was.",
            sources: [
              {
                label: "Research: quantifying GitHub Copilot's impact on developer productivity, GitHub Blog",
                url: "https://github.blog/news-insights/research/research-quantifying-github-copilots-impact-on-developer-productivity-and-happiness/",
              },
            ],
          },
          ai: {
            move: "Take the ten worst real failures from your eval suite and design specifically for those, rather than for hypothetical categories of failure. Your own failure log is a better design brief than any checklist.",
            trap: "Models asked to self report confidence produce numbers that do not correlate with correctness, and they are worse on exactly the cases where you need them, because a confidently wrong answer is confident all the way down. Derive confidence from something external: the retrieval relevance score, agreement across three samples, or whether every claim in the answer maps to a retrieved chunk.",
          },
          build: {
            artefact:
              "The uncertainty patterns implemented in your feature: citations, a confidence signal, undo, and written copy for every failure state.",
            steps: [
              { do: "List your ten worst real failures from the eval suite, verbatim." },
              {
                do: "For each, write two lines: what it cost the user, and how they would recover today.",
              },
              {
                do: "Implement citations showing exactly which transactions or documents produced the answer.",
              },
              {
                do: "Fill in the states matrix for your main surface with real copy, not placeholders.",
                hint: "Write the low confidence copy first. It is the hardest to get right and everything else follows from the tone you set there.",
              },
              {
                do: "Test with five users. Hand them a wrong answer on purpose and watch what they do.",
              },
            ],
          },
          solution: {
            summary:
              "Users do not verify. They notice when the interface makes the error visible without asking them to check.",
            walkthrough: [
              "Give five people a deliberately wrong figure with no citation. Typically none of them catch it. They came to the assistant precisely because they did not want to do the arithmetic.",
              "Give five people the same wrong figure with the four contributing transactions listed underneath. Most catch it, because one of the rows is obviously not what they asked about, and recognising is much easier than checking.",
              "That is the whole finding. Citations are not a legal disclaimer, they are an error detection mechanism, and they only work when they are specific enough to be scanned.",
              "Measure recovery in clicks. From a wrong answer to a corrected one should be one action. If it is three, users will not do it, they will file a ticket with Priya instead.",
              "The low confidence state should look different, not just say different words. Users skim, and a hedge in the same typography as an answer is read as an answer.",
            ],
          },
          check: [
            "How many clicks does it take a user to recover from a wrong answer?",
            "What did your five users do when handed a wrong answer deliberately?",
            "Where does your confidence signal come from, and is it derived from anything the model said about itself?",
          ],
        },

        {
          slug: "confidence-and-refusal",
          title: "Showing the work, and knowing when to refuse",
          kind: "Build",
          minutes: 55,
          hook: "A user asks whether they can afford to quit their job in March. Your assistant has their transactions and no idea about their savings, their notice period or their partner's income. It will answer anyway unless you stop it.",
          explain: {
            title: "Refusing well is a feature, and it has to be designed",
            body: [
              "There are three answers, not two: here is the answer, here is what I found and I am not sure, and I will not answer this. Most AI products ship only the first, which means every question gets an answer whether or not one exists.",
              "Refusal has to be specific to be tolerable. “I cannot help with that” is infuriating. “I can only see your Sona accounts, so I cannot tell you whether you can afford this, but here is your average monthly outgoing over six months and here is what I looked at” respects the person and hands them the next step. The difference is showing the boundary rather than asserting it.",
              "And some categories should be refused as a policy decision rather than a confidence one. Regulated advice, predictions about the future, anything where being wrong is unrecoverable for the user. Those are written into the prompt as constraints, tested by golden cases in the eval suite, and enforced in code where the stakes justify it, because a prompt is a strong suggestion and not a control.",
            ],
            points: [
              {
                term: "Derived confidence",
                def: "From retrieval scores, sample agreement or claim to source mapping. Never from asking the model how sure it is.",
              },
              {
                term: "Specific refusal",
                def: "Names the boundary, shows what was checked, offers the next step. Generic refusal reads as a bug.",
              },
              {
                term: "Category refusal",
                def: "Whole classes you will not answer regardless of confidence. A policy decision with a named owner.",
              },
              {
                term: "Refusal rate",
                def: "Monitor it. Rising means retrieval is degrading. Zero means your refusal path is not wired up.",
              },
            ],
          },
          case: {
            brand: "Google Gmail Smart Compose",
            year: "2018",
            situation:
              "Gmail's Smart Compose suggests the rest of your sentence as you type. A researcher found it completing “I am meeting an investor next week” with a question using a male pronoun.",
            what: "Google's team could not find a fix they trusted at the scale Gmail operates at, so they blocked the category. Smart Compose does not suggest gendered pronouns at all. A product manager quoted at the time described it as being cautious because a mistake of that kind, at Gmail's volume, is a mistake made many times a day.",
            lesson:
              "Refusing a category outright is a legitimate and sometimes optimal product decision. It costs a little utility, it is deterministic, and it is far easier to explain to a customer than a probability.",
            sources: [
              {
                label: "Google blocks gender based pronouns from Gmail Smart Compose, CNBC",
                url: "https://www.cnbc.com/2018/11/27/fearful-of-bias-google-blocks-gender-based-pronouns-from-new-ai-tool.html",
              },
            ],
          },
          ai: {
            move: "Build a claim to source check: after generating an answer, run a second pass that maps every factual claim to a retrieved chunk and flags any claim with no source. Unsupported claims become your low confidence signal.",
            trap: "The checker is lenient with its own family's output and will accept loose paraphrase as support, marking a claim grounded when the chunk says something adjacent. Test it deliberately by feeding it answers you have corrupted with a changed number, and see how many it lets through. If it passes a wrong figure, it is decoration.",
            prompt:
              "Here is an answer and the source passages it was generated from. For each factual claim in the answer, quote the exact span of the source that supports it, or write UNSUPPORTED. A number is supported only if the identical number appears in a source. Do not accept paraphrase for figures, dates or names.",
          },
          build: {
            artefact:
              "A three way response design implemented: answer, uncertain answer, refusal, with the trigger for each and golden cases covering all three.",
            steps: [
              { do: "Write your category refusal list. Five things this product will not answer, and who signed that off." },
              {
                do: "Implement the derived confidence signal, from retrieval score or claim to source coverage.",
              },
              {
                do: "Write the copy for uncertain and refused, including what was checked and what the user can do next.",
              },
              {
                do: "Add golden cases for each: one that must be answered, one that must be hedged, one that must be refused.",
                hint: "Refusal cases are the ones a prompt rewrite breaks first. Without them in the suite you will lose the behaviour within a month.",
              },
              {
                do: "Instrument the refusal rate and set the alert threshold in both directions.",
              },
            ],
          },
          check: [
            "What are the five categories you refuse, and who owns that list?",
            "Where does your confidence number come from?",
            "What is your refusal rate, and what alerts you if it moves?",
          ],
        },

        {
          slug: "human-in-the-loop",
          title: "The human in the loop, and the escalation path",
          kind: "Build",
          minutes: 55,
          hook: "The assistant tells a user something about Sona's refund policy that is not true. The user acts on it. Two months later the company is arguing that the assistant does not speak for the company.",
          explain: {
            title: "Where the human sits is an architecture decision",
            body: [
              "There are three placements. In front, where a person approves every output before it reaches anyone, which is slow, expensive and correct while the stakes are high. Behind, where output ships and a person reviews a sample, which is how most mature systems run. And on call, where the user can reach a person the moment the machine is not working, which every user facing AI feature needs regardless of the other two.",
              "The choice is set by what a wrong output costs and how reversible it is, and it should be revisited with data rather than defended as a principle. Start in front, measure the correction rate, and move behind when the numbers justify it. Teams that start behind because approval is expensive tend to discover their correction rate in public.",
              "The escalation path is the part that gets left out, because it is not the exciting part of the feature. A user who is stuck must be able to reach a person in one action, and the person must arrive holding the conversation, the retrieved context and what the assistant said. Making support reconstruct that from scratch is how an AI feature increases support cost instead of reducing it.",
            ],
            points: [
              {
                term: "Human in front",
                def: "Approval before delivery. Right for irreversible or regulated output. Costs latency and headcount.",
              },
              {
                term: "Human behind",
                def: "Sampled review after delivery. Needs a sampling rate, a reviewer and a route from findings back into the eval set.",
              },
              {
                term: "Human on call",
                def: "One action to reach a person, with full context handed over. Not optional for anything user facing.",
              },
              {
                term: "Correction rate",
                def: "How often a reviewer changes the output. The number that tells you when to change placement.",
              },
            ],
          },
          case: {
            brand: "Air Canada",
            year: "2024",
            situation:
              "Air Canada's website chatbot told a grieving customer he could apply for a bereavement fare retroactively. The airline's actual published policy said the opposite.",
            what: "The customer booked on that basis, was refused the refund, and took it to British Columbia's Civil Resolution Tribunal. The airline argued, among other things, that the chatbot was a separate legal entity responsible for its own actions. The tribunal rejected that, found negligent misrepresentation, and ordered Air Canada to pay damages.",
            lesson:
              "Your model's output is your company's word, in front of a tribunal. The failure was not only that the bot was wrong. It was that a bot with no grounding in the actual policy and no escalation path was placed in front of customers making decisions.",
            sources: [
              {
                label: "Air Canada found liable for chatbot's bad advice on bereavement rates, CBC",
                url: "https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416",
              },
              {
                label: "BC Tribunal confirms companies remain liable for information provided by AI chatbot, American Bar Association",
                url: "https://www.americanbar.org/groups/business_law/resources/business-law-today/2024-february/bc-tribunal-confirms-companies-remain-liable-information-provided-ai-chatbot/",
              },
            ],
          },
          ai: {
            move: "Use a model to triage the review queue: rank sampled outputs by likelihood of being wrong so your reviewer reads the risky ten percent rather than a random ten percent.",
            trap: "The triage model ranks by the same features it generates with, so it rates its own fluent, well structured wrong answers as low risk. Those are precisely the ones a reviewer needs to see. Keep a random sample alongside the triaged one and compare the hit rates, or you will build a review process that systematically never looks at the dangerous cases.",
          },
          build: {
            artefact:
              "A human in the loop design: placement with a justification, a sampling and review process with an owner, and a working escalation path.",
            steps: [
              { do: "State the placement for your feature and the cost of a wrong output that justifies it." },
              {
                do: "Design the review: sampling rate, who reviews, what they record, and how a finding becomes a golden case.",
              },
              {
                do: "Build the escalation: one action from the conversation to a person, carrying the transcript, the retrieved context and the assistant's answer.",
                hint: "Ask Priya what she needs to see to resolve a ticket in one reply. Build exactly that payload.",
              },
              {
                do: "Define the correction rate threshold at which you would change placement, in both directions.",
              },
              {
                do: "Run ten real escalations end to end and time them.",
              },
            ],
          },
          check: [
            "What is your correction rate, and what number would change the placement?",
            "What exactly does a support person receive when a user escalates?",
            "How many actions does it take a stuck user to reach a human?",
          ],
        },

        {
          slug: "red-team",
          title: "Red team your own feature",
          kind: "Simulation",
          minutes: 65,
          hook: "Before someone on the internet does it for you, in public, with a screenshot that gets forty thousand likes and a link to your pricing page.",
          explain: {
            title: "The failure classes, and which ones a prompt cannot fix",
            body: [
              "Four classes cover most of it. Prompt injection, where text from a user or a document becomes an instruction the model follows. Data leakage, where one user's information appears in another's answer, or your system prompt and tool definitions are extracted. Hallucinated specifics, where the model invents a policy, a number or a citation that sounds exactly like a real one. And harmful or off role output, where the thing built to discuss transactions gives medical advice or agrees to sell a car for one dollar.",
              "Rank findings by severity times likelihood, not by how clever the attack was. A researcher's elaborate multi turn jailbreak matters less than the one line phrasing that a confused user will type by accident on a Tuesday. The boring reachable failure is the one that reaches production.",
              "And be honest about which fixes are real. If a failure would be catastrophic, the fix is architectural: do not put that data in the context, do not give the model that tool, filter it in code after generation. A prompt instruction is a strong suggestion to a probabilistic system. It reduces frequency and it is not a control, and treating it as one is how teams end up surprised.",
            ],
            points: [
              {
                term: "Prompt injection",
                def: "Untrusted text becomes instruction. Any content you retrieve is untrusted, including your own help docs if anyone can edit them.",
              },
              {
                term: "Data leakage",
                def: "Cross user data, system prompt extraction, tool schema disclosure. Usually a scoping bug, not a model behaviour.",
              },
              {
                term: "Hallucinated specifics",
                def: "Invented policies, figures and citations. The most likely class to reach a real customer.",
              },
              {
                term: "Architectural fix",
                def: "Removing the capability rather than discouraging its use. The only kind that holds under adversarial pressure.",
              },
            ],
          },
          case: {
            brand: "A Chevrolet dealership chatbot",
            year: "2023",
            situation:
              "A car dealership put a general purpose language model on its website as a sales assistant, with a broad instruction to be helpful and agreeable.",
            what: "Visitors discovered they could instruct it to agree to anything. One widely shared exchange had the bot agreeing that a new SUV could be sold for one dollar and stating that this was a legally binding offer, with no take backs. Others got it to write code and discuss unrelated topics. The dealership took it down.",
            lesson:
              "Nothing about that attack was sophisticated. It was a user typing an instruction into a text box that had no scope limit, no output filter and no list of things the assistant is not allowed to agree to. The failure was in the deployment, not the model.",
            sources: [
              {
                label: "Incident 622: Chevrolet dealer chatbot agrees to sell Tahoe for one dollar, AI Incident Database",
                url: "https://incidentdatabase.ai/cite/622/",
              },
            ],
          },
          ai: {
            move: "Use a model to generate attacks against your own system, run every one of them, and log verbatim what came back. Then use a second model to read the responses and flag the ones that constitute a breach, because you will get bored reading two hundred of them and boredom is where findings hide.",
            trap: "A model generates textbook attacks that published guardrails already block, and it misses the domain specific one that actually works. It will not think to ask Sona's assistant to “summarise the transactions of the account linked to this email address”, or to put an instruction inside a merchant description field where your own retrieval will pick it up and hand it to the model as trusted context. You have to write the attacks that only make sense against your product, and those come from your data model rather than from a list.",
          },
          build: {
            artefact:
              "A red team report: attacks attempted, verbatim results, severity ranking, and the top three mitigated with a note on which fix was architectural.",
            steps: [
              { do: "Write 20 attacks. At least 10 must be specific to Sona's data model and could not apply to any other product." },
              {
                do: "Include at least three indirect injections: hostile text placed in data your retrieval will pick up.",
                hint: "A transaction memo field. A help doc. A shared account nickname. Anything a user can write that your pipeline later reads as context.",
              },
              { do: "Run all 20. Log the verbatim response for each, including the ones that failed." },
              { do: "Rank by severity times likelihood and mark each as prompt fixable or architectural." },
              {
                do: "Fix the top three and re-run the whole set, because a fix for one attack often opens another.",
              },
            ],
          },
          solution: {
            summary:
              "The attack that works is almost never the clever one. It is the scoping mistake, and the fix is in code.",
            walkthrough: [
              "Run the generic jailbreaks first and expect most to fail. Providers have spent a great deal of effort on those and it shows.",
              "Then run the domain attacks. The one that usually works is any tool that takes an identifier the model can fill in. If get_transactions accepts an account_id from the model, some phrasing will eventually get it to try one it should not have.",
              "The fix is architectural and takes one line: scope every query to the authenticated session in your code, and remove the parameter from the tool schema entirely. The model can no longer express the attack.",
              "Indirect injection is the finding people are least prepared for. Text inside retrieved content instructing the model to ignore its rules works surprisingly often, because that content arrives in the same context as your own instructions with nothing marking it as untrusted. Delimit retrieved content explicitly and instruct the model that anything inside the delimiters is data.",
              "Write the report so a non technical reader can act on it: what was tried, what got through, what it would cost you, what you did. That document is also most of the answer to the enterprise security questionnaire on Maya's desk.",
            ],
          },
          check: [
            "Which attack got through that you were confident would not?",
            "Which of your fixes could not have been done with a prompt?",
            "Did fixing the top three open anything new when you re-ran the set?",
          ],
        },

        {
          slug: "data-and-trust",
          title: "What you tell users about their data",
          kind: "Build",
          minutes: 50,
          hook: "Someone on Reddit reads your updated terms of service more carefully than your legal team did and posts a screenshot with one clause highlighted. It is Saturday.",
          explain: {
            title: "The policy is a product surface",
            body: [
              "Four questions decide whether people trust an AI feature, and users will find the answers whether or not you publish them. Where does my data go. Is it used to train a model. Who can see it. How long is it kept. If your product handles financial, health or workplace data, assume every one of these gets asked by a customer's security team in writing.",
              "The answers are decisions you make, not facts you discover. Whether you send data to a third party provider, whether you have a zero retention agreement with them, whether you use production conversations to build eval sets, and whether users can opt out. Each has a product cost. Zero retention means you cannot debug from provider logs. No training on user data means your eval set has to be built with consent or from synthetic and internal cases.",
              "The failure that damages companies is rarely the practice itself. It is the gap between what people believed and what the terms allowed, discovered by them rather than disclosed by you. Write the plain language version first, in the interface, at the point of use, and make the legal text agree with it rather than the other way round.",
            ],
            points: [
              {
                term: "Data flow",
                def: "Exactly which fields leave your infrastructure, to whom, under what contract. Diagram it, do not describe it.",
              },
              {
                term: "Training use",
                def: "Whether user content improves a model. The single most sensitive line, and the one that needs an explicit choice.",
              },
              {
                term: "Retention",
                def: "How long prompts and outputs are kept, by you and by your provider. Providers publish defaults, and defaults are negotiable.",
              },
              {
                term: "In product disclosure",
                def: "The plain sentence at the point of use. If it contradicts the terms, the terms are what you will be judged on and the sentence is what people believed.",
              },
            ],
          },
          case: {
            brand: "Zoom",
            year: "2023",
            situation:
              "Zoom updated its terms of service with broad language about the use of customer content for machine learning and artificial intelligence. Nothing about the product changed on the day.",
            what: "A developer read the clause and posted it. Within days it was a widely covered story about a video conferencing company claiming rights to train on meetings. Zoom said it did not use customer content to train its models without consent, published a blog post, and then amended the terms to say so explicitly and added an in product consent flow for its AI features.",
            lesson:
              "The company's actual practice may well have been reasonable. The damage came from the terms being broader than the practice, and from users learning about it from a stranger rather than from the product.",
            sources: [
              {
                label: "Zoom addresses privacy concerns raised by AI data collection language in terms of service, NBC News",
                url: "https://www.nbcnews.com/tech/innovation/zoom-ai-privacy-tos-terms-of-service-data-rcna98665",
              },
            ],
          },
          ai: {
            move: "Have a model read your privacy policy, your terms and your in product copy together, and list every place where the three disagree about what happens to user data.",
            trap: "It will paraphrase the documents into agreement, because summarising is what it does and the three sound similar at a paragraph level. Ask instead for a table of specific claims with a verbatim quote from each document, and read the quotes. The disagreements are in the qualifiers, in words like may, aggregated and improve our services, and they vanish in any summary.",
          },
          build: {
            artefact:
              "A data and trust page for your feature: a data flow diagram, answers to the four questions in plain language, the in product disclosure copy, and the security questionnaire answers.",
            steps: [
              { do: "Diagram the data flow. Every field that leaves your infrastructure, to which provider, under which contract terms." },
              {
                do: "Answer the four questions in one sentence each, in language a customer would use.",
              },
              {
                do: "Check your provider's actual retention and training defaults, in their documentation, and write down what you have agreed to.",
                hint: "Enterprise and API terms usually differ from consumer terms on exactly this point. Read the one that applies to you rather than the one that got the headlines.",
              },
              {
                do: "Write the in product disclosure at the point of use, and check it does not contradict your terms.",
              },
              {
                do: "Answer the ten hardest questions from a real security questionnaire, and mark the ones you cannot answer yet.",
              },
            ],
          },
          check: [
            "Can you answer all four questions in one sentence each, without hedging?",
            "Where did your policy, your terms and your product copy disagree?",
            "Which security questionnaire question could you not answer, and who owns getting that answered?",
          ],
        },
      ],
    },
  ],
};
