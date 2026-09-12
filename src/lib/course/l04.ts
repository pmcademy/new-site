import type { Level } from "./types";

/**
 * LEVEL 04. Build & Ship It Yourself
 *
 * Rebuilt from original modules 13 (Building New Products), 14 (Tech
 * Fundamentals), 15 (SQL-BI) and 16 (Python). The old version taught PMs to
 * talk to engineers. This one makes them read the machine, query their own
 * data, write a spec nobody has to rewrite, and put a working product on a
 * real URL, because that is now table stakes.
 */
export const l04: Level = {
  slug: "04",
  n: "04",
  rank: "Operator",
  badge: "Builder",
  title: "Build & Ship It Yourself",
  promise:
    "Understand how software actually works, answer your own data questions, write a spec an engineer does not have to rewrite, and put a real product on a real URL without waiting for anyone.",
  arc: "Still Sona. Engineering is booked for two quarters and you have a problem nobody will schedule. So you stop being the person who asks for things. You learn the machine well enough to argue with it, you build the thing yourself, you put it on the internet, and you let ten real users make the argument for you.",
  scene: {
    image: "/img/scenes/domain-fintech.webp",
    alt: "The Sona product floor: dashboards on one wall, a whiteboard covered in boxes and arrows on the other.",
    caption:
      "Sona, week one of the quarter. The roadmap is full and your problem is not on it.",
  },
  who: "You have never written code, or you wrote some once and have no idea how any of it connects. You are tired of being the person in the room who cannot check anything.",
  outcomes: [
    "Explain how a request travels from a browser to a database and back, and name where the time went",
    "Read a schema, write the queries that answer most product questions, and know why your number disagrees with finance",
    "Write a spec, a ticket and acceptance criteria that an engineer does not have to rewrite",
    "Build and deploy a working product to a live URL with AI tooling, and instrument it before you share it",
    "Recruit the first ten real users, read what they actually did, and say honestly why the date slipped",
  ],
  capstone: {
    title: "The thing you shipped",
    body: "A working product, live on a public URL, that solves one real problem for a real person who is not you. Instrumented before launch, with a tracking plan where every event answers a written question. Ten real users recruited by hand, and a readout of what they actually did rather than what they said.",
    ship: [
      "A live URL on a real domain that a stranger can open and finish the job on",
      "The repo, with a README that explains the architecture in plain language and a tracking plan",
      "A week one readout: ten real users, what each did, where they dropped, and the two things you changed because of it",
    ],
  },

  chapters: [
    /* ================================================================ 1 */
    {
      slug: "how-software-works",
      n: "1",
      title: "How software actually works",
      summary:
        "Enough of the machine to make informed trade-offs and to know when an answer is nonsense. Not enough to do an engineer's job, and that is the point.",
      lessons: [
        {
          slug: "request-lifecycle",
          title: "What happens when you press enter",
          kind: "Build",
          minutes: 60,
          legacy: "Module 14.1, 14.4. Core Functionality, APIs, Frontend-Backend",
          hook: "An engineer says “it is slow because of an N+1 on the transactions endpoint”. You nod. You have no idea what was just said, and the decision you make in the next ten minutes depends on it.",
          scene: {
            image: "/img/scenes/domain-fintech.webp",
            alt: "A standup in front of a monitor showing a dashboard with a red latency spike.",
            caption: "Tuesday standup. The p95 chart has a cliff in it.",
            notes: [
              {
                from: "Dev, engineering lead",
                text: "Transactions page p95 went from 800ms to 4.2s after Thursday's release. It is an N+1. I can fix it or I can do your onboarding ticket. Not both this sprint.",
              },
              {
                from: "Priya, support",
                text: "Forty tickets this week saying the app is frozen. It is not frozen. It is just taking so long people give up and force quit.",
              },
              {
                from: "Maya, founder",
                text: "Is 4 seconds actually bad? Genuine question. Tell me what it costs us and I will find the time.",
              },
            ],
          },
          explain: {
            title: "The path of a request",
            body: [
              "Press enter and a chain of handoffs begins. Your browser looks up the domain name to find an address, opens a connection to a server, and sends a request. The server runs some application code, which usually asks a database for data, gets rows back, turns them into a shape the browser understands, and sends it. Then the browser has to draw it. Every one of those hops costs time, and the total is what the user feels.",
              "An API is the contract in the middle of that chain. Send this shape, get that shape back. When an engineer says “we need an API change”, they mean the contract changes, so every piece of software that relies on it has to change too, including the mobile app people have not updated. That is why an API change is expensive and a colour change is not.",
              "The database holds the truth. The server enforces the rules. The client is a convenience that can be offline, out of date, or tampered with by anyone who opens developer tools. Every “can we just do it in the frontend” question is answered by that sentence. Yes you can, and anyone can then lie to you about it.",
            ],
            diagram: "user-flow",
            caption:
              "The signup flow from Level 1, read a second way. Every arrow is at least one round trip to a server, and every dashed box is what a request that failed looks like to a person.",
            points: [
              {
                term: "Round trip",
                def: "One request out and one response back. Ten of them in sequence is ten times the waiting, even if each is fast.",
              },
              {
                term: "N+1",
                def: "The code asks the database for a list, then asks it one more question per item on the list. One query becomes 201. It is the single most common cause of a page that used to be fast.",
              },
              {
                term: "Payload",
                def: "How much data comes back. A response can be quick to produce and still slow to arrive because it is four megabytes of JSON.",
              },
            ],
          },
          case: {
            brand: "Pinterest",
            year: "2017",
            situation:
              "Pinterest's mobile web experience was slow, and mobile web was where most new international users first met the product.",
            what: "The team rebuilt it as a progressive web app and treated performance as the feature. They published the result: perceived wait time cut by about 40 percent, and search engine traffic and signups both up around 15 percent. Nothing about the value proposition changed. The pages just arrived sooner.",
            lesson:
              "Speed is a feature with a revenue line attached. You can only argue for it in a prioritisation meeting if you can say where the time is going and which hop you would remove.",
            sources: [
              {
                label: "Driving user growth with performance improvements, Pinterest Engineering",
                url: "https://medium.com/pinterest-engineering/driving-user-growth-with-performance-improvements-cfc50dafadd7",
              },
            ],
          },
          ai: {
            move: "Open the Network tab on a real product, reload, export the waterfall as HAR or screenshot it, and ask a model to explain what each request is doing and which of the three categories the time falls into.",
            trap: "It will name specific frameworks, internal service names and database engines it cannot possibly know from a waterfall, and it will say them with the same confidence as the parts it can see. Keep every claim about categories of work. Delete every claim about that company's stack, because you have no way to check it and you will repeat it in a meeting.",
            prompt:
              "Here is a request waterfall. For each of the ten slowest entries, tell me only what can be inferred from the URL, method, size, timing and status. Mark any statement that is inference rather than observation with INFERRED. Do not name frameworks, databases or internal services.",
          },
          build: {
            artefact:
              "A performance teardown of a real product: an annotated waterfall, three named problems, and one of them costed.",
            steps: [
              { do: "Open DevTools, Network tab, on a product you use daily. Reload with the cache disabled. Screenshot the waterfall." },
              { do: "Identify the three slowest requests and write in one line what each is fetching." },
              {
                do: "Categorise each one: too many round trips, too much payload, or blocking the first paint.",
                hint: "Sort by size, then sort by time. The biggest file and the slowest request are almost always two different problems with two different fixes.",
              },
              { do: "Write the sentence you would say to an engineer. Name the request, the category, and what you think the fix costs." },
              { do: "Estimate what the slowest one is worth using the Pinterest numbers as a rough prior, and say clearly that it is a prior and not a measurement." },
            ],
            tools: ["Chrome DevTools", "PageSpeed Insights"],
          },
          solution: {
            summary:
              "A useful teardown names the category, not the cure. The category is what tells an engineer where to look, and it is the part a PM can actually establish.",
            walkthrough: [
              "Sort by time. The slowest entry is usually an API call, not an image. Note its path, its size and how long it waited before the first byte arrived.",
              "A long wait with a tiny response means the server was thinking. That is a query problem, and N+1 is the first suspect.",
              "A short wait with a huge response means the server was fine and the network is carrying too much. That is a payload problem, and the fix is usually pagination or dropping fields nobody renders.",
              "Anything that blocks before the page paints anything at all is the third category, and it is the one users describe as broken rather than slow.",
              "Write it as one line per problem, with the request path in it. An engineer can act on that. “The app feels sluggish” they cannot.",
            ],
            example: {
              label: "The line that gets a fix scheduled",
              body: "GET /api/transactions?range=90d waits 3.4s before the first byte and returns 38KB. Small response, long think, so I believe Dev that it is a query problem rather than the network. It is the only request on the page above one second. Everything else totals 600ms.",
            },
          },
          check: [
            "Can you explain N+1 to a non-technical person in one sentence?",
            "Which of your three problems is a think problem and which is a carry problem?",
            "Which is cheapest to fix, and how do you know rather than guess?",
          ],
          references: [
            {
              label: "MDN, an overview of HTTP",
              url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
            },
          ],
        },

        {
          slug: "errors-and-status-codes",
          title: "What a 500 actually means",
          kind: "Concept",
          minutes: 45,
          legacy: "Module 14.2. Debugging and Errors",
          hook: "Support is escalating. Half the users see a spinner forever, a few see “something went wrong”, and one has screenshotted a raw stack trace with your database table names in it. You have to tell the founder in five minutes whether this is one problem or three.",
          explain: {
            title: "The number tells you whose fault it is",
            body: [
              "Every response carries a three digit status code, and the first digit is the only part you need. 2xx means it worked. 3xx means it moved. 4xx means the request was wrong, which is usually the client, the user, or your own frontend sending nonsense. 5xx means the request was fine and the server broke while handling it. That single distinction routes the ticket.",
              "So a 404 on a page users reach from your own navigation is your bug, not theirs. A 401 means not logged in, a 403 means logged in and not allowed, and confusing those two produces the worst support conversations in software. A 500 means an unhandled exception: something threw, nobody caught it, and the user got the wreckage.",
              "The state that is worse than any error is the one with no code at all. The request never returns, the spinner runs forever, and nothing is logged because nothing failed. Timeouts are invisible in error dashboards and highly visible to users, which is why your error rate can be flat while support is on fire.",
            ],
            diagram: "states-matrix",
            caption:
              "The same eight states from Level 1, now with a status code behind each one. Amber is where your support queue comes from.",
            points: [
              {
                term: "4xx, the client was wrong",
                def: "400 malformed, 401 not signed in, 403 signed in but not allowed, 404 not there, 429 too many requests. Users see these constantly and most are your frontend's fault.",
              },
              {
                term: "5xx, the server broke",
                def: "500 unhandled exception, 502 and 504 a service behind the one you called did not answer. Every 5xx is a bug someone owns.",
              },
              {
                term: "The silent failure",
                def: "No response at all. No code, no alert, no log line. The user calls it frozen and your dashboard calls it fine.",
              },
            ],
          },
          case: {
            brand: "Cloudflare",
            year: "2019",
            situation:
              "On 2 July 2019 a large share of the web behind Cloudflare started returning 502 errors. It lasted about half an hour and it looked, from the outside, like an attack.",
            what: "It was a single regular expression deployed to their firewall rules that could consume unbounded CPU on certain inputs. Every CPU core across the network saturated, so healthy application servers behind Cloudflare were fine and unreachable. Cloudflare published a full postmortem naming the line, the deployment process that let it go global at once, and the changes they made.",
            lesson:
              "A 502 says the thing in front broke, not the thing behind it. Reading the code correctly is what stops you from sending an engineer to debug an application that was never down, and a public postmortem that names the line is a stronger trust signal than an apology.",
            sources: [
              {
                label: "Details of the Cloudflare outage on July 2, 2019",
                url: "https://blog.cloudflare.com/details-of-the-cloudflare-outage-on-july-2-2019/",
              },
            ],
          },
          ai: {
            move: "Paste a raw error, a stack trace or a browser console log in and ask what layer it came from and what a user would have seen at that moment.",
            trap: "Given a stack trace, a model will produce a confident single root cause and a patch. It is often a plausible cause rather than the cause, and it will not tell you which of the frames in the trace it is guessing about. Ask it for three candidate causes ranked, plus the one log line or check that would separate them. That question is useful. “What is the fix” is not, at your level.",
            prompt:
              "Here is an error and a stack trace. Give me three candidate causes ranked by likelihood. For each, state what a user would have seen, and name the single check that would confirm or eliminate it. Do not propose a code fix.",
          },
          build: {
            artefact:
              "An error triage sheet for your product: every failure a user can hit, its code, what they see, and who owns it.",
            steps: [
              { do: "List every way a request in your product can fail. Aim for at least ten, including the timeout." },
              { do: "For each, write the status code, the message the user currently sees, and the message they should see." },
              {
                do: "Mark each row client fault, server fault, or silent.",
                hint: "If two rows in your table show the same message to the user for different faults, that is why support cannot triage anything.",
              },
              { do: "Find one place in the product where a 403 is presented as a 404, or a timeout is presented as an error. There usually is one." },
              { do: "Write the two rows you would fix first and why." },
            ],
          },
          check: [
            "Which failures in your product are currently invisible to the error dashboard?",
            "Where does your product tell a user something is broken when it is actually a permission problem?",
          ],
          references: [
            {
              label: "MDN, HTTP response status codes",
              url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status",
            },
          ],
        },

        {
          slug: "latency-budget",
          title: "What latency is made of",
          kind: "Drill",
          minutes: 45,
          legacy: "Module 14.5. Performance and Caching",
          hook: "You have four seconds to spend and you are currently spending nine. Somebody has to decide which second to buy back first, and the engineer is waiting for you to say which.",
          explain: {
            title: "A budget, not a feeling",
            body: [
              "Total time is a sum, and you can write the sum down. Roughly: name lookup and connection setup, then the server thinking, then the database answering, then the bytes travelling, then the browser parsing and drawing. Give each line a number in milliseconds and the argument stops being about whether the app feels slow.",
              "A cache is a copy of an answer kept somewhere closer or cheaper than the place that computed it. That is the whole idea. The browser caches files, a CDN caches them near the user, the server caches expensive query results, the database caches its own pages. Every cache buys speed with staleness, so the real product question is never “can we cache it”, it is “how wrong is this allowed to be, and for how long”.",
              "Two things dominate real budgets. Sequential round trips, because six calls that each take 300ms take 1.8 seconds no matter how fast your server is. And cold starts, where the first request after a quiet period pays for waking something up, which is why your product is fast in the demo and slow for the first user of the morning.",
            ],
            points: [
              {
                term: "p50 and p95",
                def: "Median and near worst case. The median user is fine and the p95 user is the one writing to support. Never accept an average.",
              },
              {
                term: "Cache with a TTL",
                def: "Time to live. How long a copy is allowed to be believed. Setting it is a product decision about acceptable staleness, not an engineering detail.",
              },
              {
                term: "Cold start",
                def: "The first request after idle pays a wake up cost. Common on serverless hosting, invisible in your own testing because you are never idle.",
              },
            ],
          },
          case: {
            brand: "Google Search",
            year: "2009",
            situation:
              "Google's search team wanted to know what latency actually costs, so they deliberately made search slower for a subset of users.",
            what: "Injected delays of 100 to 400 milliseconds measurably reduced the number of searches people ran. A 400ms delay produced a drop of about 0.44 percent in daily searches per user, and the effect persisted for weeks after the delay was removed. People did not complain. They just used it slightly less, forever.",
            lesson:
              "Latency damage is quiet and it lags. Nobody files a ticket saying “I searched less this month”, which is exactly why speed loses prioritisation arguments unless someone puts a number on it in advance.",
            sources: [
              {
                label: "Speed matters, Google Research blog",
                url: "https://research.google/blog/speed-matters/",
              },
            ],
          },
          ai: {
            move: "Give a model your measured timings and have it build the budget table, compute what each candidate fix buys in milliseconds, and rank them by milliseconds saved per day of engineering work.",
            trap: "It will happily do arithmetic on numbers you invented and present the total with three decimal places, which makes a guess look like a measurement. Mark every input as measured or assumed before you paste it, and make the output carry that mark through.",
          },
          build: {
            artefact:
              "A latency budget for one page of your product, with a ranked list of what to buy back.",
            steps: [
              { do: "Pick one slow page. Measure p50 and p95 from the Network tab, three loads each, cache disabled." },
              { do: "Break the total into the five lines: connection, server think, data, transfer, render. Estimate where you cannot measure, and label those rows as estimates." },
              {
                do: "Set a target budget for the page and mark which lines are over it.",
                hint: "Two seconds to something readable is a defensible target for most content pages. Pick a number before you look at the data, otherwise you will pick whatever you already have.",
              },
              { do: "List three fixes, each with the milliseconds you think it buys and the engineering days it costs." },
              { do: "Name the one you would do first and the assumption that, if wrong, changes the answer." },
            ],
            tools: ["Chrome DevTools", "Google Sheets"],
          },
          solution: {
            summary:
              "The winner is almost never the biggest line. It is the biggest line you can move cheaply, and the cheapest move is usually removing a round trip rather than making one faster.",
            walkthrough: [
              "Write the five lines with numbers. If they do not sum to roughly what you measured, you have missed a line, usually render.",
              "Circle every line that is a sequence rather than a single wait. Sequences collapse: three calls that can happen at once become the slowest one instead of the total.",
              "Compare that against making the slowest single call faster, which is usually real engineering work against a database.",
              "Rank by milliseconds per engineering day. Removing a round trip is often a day and buys 600ms. Rewriting a query is often a week and buys 400ms.",
              "State the assumption you are least sure of. In most budgets it is the render line, because it varies wildly by device and you tested on a laptop.",
            ],
          },
          check: [
            "What is your p95, and how far is it from your p50?",
            "Which line in your budget is a sequence you could collapse?",
            "Which of your numbers are measured and which are assumed?",
          ],
        },
      ],
    },

    /* ================================================================ 2 */
    {
      slug: "reading-code",
      n: "2",
      title: "Reading code, and following a change",
      summary:
        "Not writing it. Reading enough to follow a change through a codebase, ask one real question in a review, and understand what “it is in staging” means.",
      lessons: [
        {
          slug: "reading-code-enough",
          title: "Reading code without pretending",
          kind: "Build",
          minutes: 55,
          legacy: "Module 14.3. Reading Code",
          hook: "Dev sends you a link to a file and says “the logic you are asking about is here”. It is 240 lines. You have never opened a code file in your life and you are about to say “looks good” to something you cannot see.",
          scene: {
            image: "/img/scenes/domain-b2b.webp",
            alt: "A laptop showing a code file with a diff view open beside a chat window.",
            caption: "Thursday afternoon. A file, a diff, and nobody to translate.",
            notes: [
              {
                from: "Dev, engineering lead",
                text: "The rule you keep asking about is in pricing.ts, line 88. It is not complicated. Read it and tell me if that is what you meant, because I do not think it is.",
              },
              {
                from: "Tom, design",
                text: "I have started reading the diffs. Half of it is noise but you can always find the four lines that matter. Ask me if you want the trick.",
              },
            ],
          },
          explain: {
            title: "You are reading for intent, not for syntax",
            body: [
              "Almost all code is one of five things. A name being given to a value, a condition, a loop, a function being defined, and a function being called. Once you can spot those five, a file stops being a wall and becomes a sequence of decisions, and decisions are your job.",
              "Read top down and out loud. Find the function whose name matches the thing you care about. Read only the conditions inside it, because the conditions are the product rules. Ignore the plumbing entirely: imports, types, logging, error wrapping. In a 240 line file, roughly twelve lines encode the behaviour a user experiences, and those twelve lines are usually if statements.",
              "The skill that actually matters is asking a question that names something specific. “Looks good” costs you credibility. “Line 94 says if the balance is exactly zero we treat it as unlinked, is that intentional” is a question an engineer respects, and it is available to you after one hour of practice.",
            ],
            points: [
              {
                term: "The conditions are the spec",
                def: "Every if statement is a product rule someone decided. Read the ifs and you have read the behaviour.",
              },
              {
                term: "Follow the name",
                def: "Search the codebase for the name of the thing you care about. Where it is defined and where it is used is the whole map you need.",
              },
              {
                term: "The plumbing is not the point",
                def: "Imports, types, logging, error wrapping and tests are most of the lines and almost none of the meaning. Skip them on the first pass.",
              },
            ],
          },
          case: {
            brand: "Apple",
            year: "2014",
            situation:
              "In February 2014 Apple shipped a security fix for iOS and macOS. The bug was in the code that verifies the certificate a website presents when you connect over https.",
            what: "A single line, goto fail, appeared twice in a row. The second one was not inside any condition, so it always ran, and it skipped the final signature check. Certificate verification silently succeeded for connections it should have rejected. The whole defect was visible in the diff as one duplicated line, in code that had presumably been reviewed.",
            lesson:
              "The bugs with the largest consequences are frequently the ones a careful non-expert could see. Reading a diff line by line is not beneath you and it is not futile.",
            sources: [
              {
                label: "Apple's goto fail bug, Adam Langley",
                url: "https://www.imperialviolet.org/2014/02/22/applebug.html",
              },
              {
                label: "Apple security update, CVE-2014-1266",
                url: "https://support.apple.com/en-us/103213",
              },
            ],
          },
          ai: {
            move: "Paste an unfamiliar file in and ask for a plain language walkthrough of what it does, in order, with the product rules pulled out as a numbered list of conditions.",
            trap: "It explains the code it can see and cannot know what happens elsewhere, so it fills the gap with a confident story about the rest of the system. It will tell you a function is called on signup when nothing in the file says so. Make it separate what the file states from what it is inferring, then check the inferences by searching for where the function is actually called.",
            prompt:
              "Explain this file to someone who does not code. First, list every product rule it encodes as a numbered list of conditions in plain English. Second, list every assumption you are making about code outside this file, marked ASSUMPTION, and tell me what to search for to verify each one.",
          },
          build: {
            artefact:
              "A plain English rules list extracted from one real code file, with one specific question for the author.",
            steps: [
              { do: "Pick a real file. Your own product, your company's repo, or any open source project you use." },
              { do: "Read it top to bottom once without stopping and without looking anything up. Note only the function names." },
              {
                do: "Second pass: write out every condition you find as a product rule in one sentence.",
                hint: "Search the file for the word if. That is the fastest route to the behaviour.",
              },
              { do: "Run the AI walkthrough and compare. Anything it found that you missed, and anything it asserted that the file does not say." },
              { do: "Write one question about a specific line number that you genuinely cannot answer from the file." },
            ],
            tools: ["GitHub", "VS Code or the GitHub web editor", "Claude or ChatGPT"],
          },
          solution: {
            summary:
              "A good extraction reads like a spec written after the fact, because that is exactly what it is. If it reads like a description of the code, you paraphrased instead of understanding.",
            walkthrough: [
              "Weak: “the function loops through transactions and applies a filter”. That is the syntax restated and it teaches nobody anything.",
              "Strong: “transactions under 1 rupee are excluded from the categorisation total, and refunds are counted as negative rather than skipped”. That is a product rule, and it is arguable.",
              "The test is whether a rule you wrote down could be wrong. If nobody could disagree with a line on your list, you described the code.",
              "Your question at the end should point at a line number and a behaviour, and it should be a question you would still want the answer to if you were not trying to look competent.",
            ],
            example: {
              label: "The question that earns you the next conversation",
              body: "pricing.ts line 94: if balance === 0 we return UNLINKED. A freshly linked account with a zero balance is a real case for students. Is that intended, or should UNLINKED depend on the link status field rather than the balance?",
            },
          },
          check: [
            "How many product rules did you extract, and could someone disagree with any of them?",
            "What did the model assert that the file does not actually say?",
            "What is your one question, and does it name a line?",
          ],
        },

        {
          slug: "branches-and-staging",
          title: "Branches, main, and what “it is in staging” means",
          kind: "Concept",
          minutes: 45,
          legacy: "Module 13.5. Release Process",
          hook: "You ask if the fix is live. You are told it is merged. Later you are told it is in staging. Then someone asks whether it made the cut for the release. Three answers, three different meanings, and you have already told the customer it is fixed.",
          explain: {
            title: "Four different words for not yet",
            body: [
              "Version control keeps every version of every file and who changed it. Work happens on a branch, which is a private copy of the codebase where you can break things safely. When the work is done it is merged into the main branch, which is the version everyone agrees is current. Merged does not mean users have it.",
              "Between merged and live there are environments. Local is on one engineer's laptop. Staging is a full copy of the product running on real infrastructure with fake or copied data, where the team checks things before customers see them. Production is the real thing with real people and real money. “It is in staging” means it exists and no user has it.",
              "Deploy is the act of moving a version to production, and it is separate from release, which is the act of turning it on for users. Modern teams deploy code dark behind a feature flag, then release by flipping the flag. This matters to you because it means the answer to “can we ship it Tuesday” has two halves, and you own the second one.",
            ],
            points: [
              {
                term: "Commit",
                def: "One saved change with a message explaining why. The message is the only documentation most code ever gets.",
              },
              {
                term: "Merged into main",
                def: "The change is now part of the agreed current version of the code. Nobody outside the team is affected yet.",
              },
              {
                term: "Deployed and released",
                def: "Deployed means it is running in production. Released means users can reach it. A feature flag is the switch between the two, and it is yours to decide.",
              },
              {
                term: "Rollback",
                def: "Putting the previous version back. Fast and safe for code, slow and frightening for anything that changed the database.",
              },
            ],
          },
          case: {
            brand: "Knight Capital",
            year: "2012",
            situation:
              "Knight Capital was one of the largest market makers in US equities. On 1 August 2012 they deployed new trading code to their production servers before the market opened.",
            what: "The deployment reached seven of the eight servers. The eighth kept old code that reused a configuration flag the new code had repurposed, which reactivated a retired function. When trading opened, that one server sent millions of unintended orders. In about 45 minutes the firm lost roughly 460 million dollars, and it was acquired shortly after. The SEC order describes the deployment process in detail, including that there was no second person reviewing the deployment and no automated check that all servers matched.",
            lesson:
              "The failure was not the code. It was that nobody could say with certainty what version was running where. That question is one a product manager is allowed to ask, and asking it is not micromanagement.",
            sources: [
              {
                label: "SEC administrative proceeding, Knight Capital Americas LLC",
                url: "https://www.sec.gov/litigation/admin/2013/34-70694.pdf",
              },
            ],
          },
          ai: {
            move: "Have a model turn your team's actual release process into a written diagram of environments and gates, then ask it what can reach production without passing each gate.",
            trap: "It will produce the textbook pipeline rather than yours, because the textbook one is what it has read ten thousand times. If your team deploys from a laptop on Fridays, it will not say so unless you tell it. Feed it what actually happens, including the embarrassing parts, or you will get a diagram of somebody else's company.",
          },
          build: {
            artefact:
              "A one page map of how a change reaches a user at your company, with every gate and every way around it.",
            steps: [
              { do: "Ask an engineer to walk you through the last change that shipped, from first commit to a user seeing it. Write down each step and who does it." },
              { do: "Draw the environments in order and label what data each one has." },
              {
                do: "Mark every gate: review, tests, staging check, approval. Then mark every documented way to skip each gate.",
                hint: "Ask “what happens when it is urgent”. The hotfix path is the real process and it is never in the wiki.",
              },
              { do: "Write, for each of the last three releases, how long each stage took. This is your lead time and you will need it in chapter 7." },
              { do: "Write down the single question you will ask from now on instead of “is it done”." },
            ],
          },
          check: [
            "For your last shipped change, how long between merged and a user having it?",
            "What can reach production without a second person looking at it?",
            "What is your question now instead of “is it done”?",
          ],
          references: [
            {
              label: "Atlassian, git branching workflows",
              url: "https://www.atlassian.com/git/tutorials/comparing-workflows",
            },
          ],
        },

        {
          slug: "reviewing-a-change",
          title: "Leaving one useful comment on a pull request",
          kind: "Drill",
          minutes: 45,
          hook: "You have been added as a reviewer on a pull request. You are not expected to approve the code. You are expected to notice that it does not do what the ticket said, and nobody else in the review is looking for that.",
          explain: {
            title: "Review the behaviour, not the code",
            body: [
              "A pull request is a proposed change plus a conversation about it. Engineers review it for correctness, style and risk. Nobody in that thread is checking it against the problem, because they are all looking at the same diff you are, and the diff does not contain the problem.",
              "Which leaves you the highest value question in the thread: does this change do the thing the ticket asked for, and what happens in the cases the ticket did not mention. Read the description, read the tests if there are any, read the conditions in the diff, and compare all three against your acceptance criteria.",
              "Comment sparingly and never on style. One good comment per review is a strong contribution. Ask about a missing state, a case the tests do not cover, or a rule in the diff that contradicts the ticket. Then say plainly what you did not review, because a reviewer who implies they checked the code and did not is worse than no reviewer.",
            ],
            points: [
              {
                term: "The diff",
                def: "Green lines added, red lines removed. Read only the green conditions first.",
              },
              {
                term: "The test file",
                def: "Usually the clearest statement of what the author believes the change should do. Read it before the implementation.",
              },
              {
                term: "The comment worth leaving",
                def: "Names a case, not a preference. “What happens when the file is empty” beats “could this be simpler”.",
              },
            ],
          },
          case: {
            brand: "Google",
            situation:
              "Google publishes the code review standards it expects across its engineering organisation, including what a reviewer is supposed to optimise for.",
            what: "The published standard is that a reviewer approves once a change definitely improves the overall health of the codebase, even if it is not perfect. It explicitly separates facts and data from personal preference, and tells reviewers to mark non-blocking nits as nits. The effect is that review is a decision with a stated bar rather than an open ended aesthetic argument.",
            lesson:
              "Reviews go badly when nobody has written down what the reviewer is deciding. That is the same failure as a spec with no acceptance criteria, and you can fix both with one sentence.",
            sources: [
              {
                label: "Google engineering practices, the standard of code review",
                url: "https://google.github.io/eng-practices/review/reviewer/standard.html",
              },
            ],
          },
          ai: {
            move: "Paste the diff and your acceptance criteria together and ask which criteria the change appears to satisfy, which it does not, and which cannot be determined from the diff alone.",
            trap: "Given a diff and a list of criteria, it will find a way to map each criterion onto some line, because agreeing is the shape of the answer it is rewarded for. It will also produce three or four generic review comments about error handling and naming that are true of every diff ever written. Force a fourth bucket, cannot be determined, and only take comments that name a line and a case.",
            prompt:
              "Here is a diff and my acceptance criteria. Sort every criterion into SATISFIED, NOT SATISFIED, or CANNOT TELL FROM THIS DIFF, and quote the line that justifies each. Then give me at most two questions to ask the author. Each must name a specific line and a specific input.",
          },
          build: {
            artefact:
              "One real review comment posted on a real pull request, plus your criteria mapping.",
            steps: [
              { do: "Find a real pull request. Your company's repo, or any active open source project." },
              { do: "Read the description and the tests before the implementation. Write in one line what you think this change does." },
              { do: "Map the diff against the acceptance criteria, or against the description if there are none." },
              {
                do: "Write one comment that names a line and a case, and one sentence saying what you did not review.",
                hint: "Good openers: “what happens if”, “the ticket said X and line 40 does Y”, “is this covered when the list is empty”.",
              },
              { do: "Post it. Note the reply." },
            ],
            tools: ["GitHub or GitLab"],
          },
          solution: {
            summary:
              "The comment that lands is a case the author has not considered, stated without a suggested fix.",
            walkthrough: [
              "Useless: “LGTM”. You have added nothing and quietly implied you checked something.",
              "Worse: “could we use a map here instead”. You are now arguing about style in someone else's discipline.",
              "Useful: “ticket says the banner clears after the user reconnects. Line 62 clears it on any successful sync. If the user syncs a second account, does the banner disappear while the first is still broken?”",
              "Close with the honest boundary: “I reviewed this against the acceptance criteria only, not the implementation.” Nobody has ever thought less of a person for that sentence.",
            ],
          },
          check: [
            "Which acceptance criterion could you not verify from the diff?",
            "Did your comment name a line and a case?",
            "What did the author reply, and were you right?",
          ],
        },
      ],
    },

    /* ================================================================ 3 */
    {
      slug: "your-own-data",
      n: "3",
      title: "Answering your own questions",
      summary:
        "The gap between having a question and having an answer is usually somebody else's queue. Close it, then make sure the next feature ships with the data to answer it.",
      lessons: [
        {
          slug: "the-schema",
          title: "Read the schema before you ask anything",
          kind: "Concept",
          minutes: 50,
          legacy: "Module 15.1. Data Models",
          hook: "You ask Ana for “active users by plan”. She asks which of the three plan fields you mean. You did not know there were three, and now you understand why every number you have ever been given came with a caveat.",
          scene: {
            image: "/img/scenes/domain-commerce.webp",
            alt: "A screen showing a database schema diagram with tables joined by lines.",
            caption: "Ana's schema diagram, printed and pinned up because it is faster than asking.",
            notes: [
              {
                from: "Ana, data",
                text: "There are three plan columns. users.plan is what they signed up on, subscriptions.plan is what they pay for now, and billing_events.plan is what Stripe last told us. They disagree for about 4 percent of accounts and every one of those is a support ticket waiting.",
              },
              {
                from: "Maya, founder",
                text: "The board deck says 12,400 paying users. Finance says 11,860. I need one number by Thursday and I need to know which one is wrong.",
              },
            ],
          },
          explain: {
            title: "Tables, keys, and where the truth is duplicated",
            body: [
              "A schema is the list of tables, the columns in each, and how they connect. Read it once and half your data questions answer themselves. A table is a spreadsheet with rules: every row is one thing, every column is one fact about that thing, and one column is the primary key, the unique id of the row.",
              "Tables connect through foreign keys. The transactions table has a user_id column that points at a row in users. That is the whole idea of a relational database, and it is why you can ask for transactions per user without storing a copy of the user in every transaction.",
              "The dangerous part is duplication. In every real product, some fact lives in more than one place because it was faster at the time. A status on the user row and a status derived from the events table. A price on the order and a price in the catalogue. Each pair will eventually disagree, and the question “which one is the truth” is a product decision that somebody usually made accidentally.",
            ],
            points: [
              {
                term: "Primary key",
                def: "The unique id of a row. If you do not know what one row of a table represents, you cannot trust any count from it.",
              },
              {
                term: "Foreign key",
                def: "A column pointing at another table's key. This is what a join follows.",
              },
              {
                term: "One to many",
                def: "One user has many transactions. Which is why counting rows in transactions and calling it users is the most common analytics mistake there is.",
              },
              {
                term: "Derived versus stored",
                def: "A number computed on demand cannot go stale. A number written into a column can, and eventually will.",
              },
            ],
          },
          case: {
            brand: "Notion",
            year: "2021",
            situation:
              "Notion's product lets people nest pages, databases, toggles and text inside each other without limit, which is a hard thing to store.",
            what: "Their data model treats almost everything as a block: one entity type with a parent pointer and a type field. That single decision is what makes the product's flexibility possible. It is also what made scale hard, and they published a detailed account of sharding that blocks table across Postgres instances as it grew into the hundreds of billions of rows.",
            lesson:
              "The schema is the product, expressed as nouns. If you can read the tables you can usually see both what the product can do and what it will struggle to do next year.",
            sources: [
              {
                label: "Herding elephants, lessons learned from sharding Postgres at Notion",
                url: "https://www.notion.com/blog/sharding-postgres-at-notion",
              },
              {
                label: "The data model behind Notion's flexibility",
                url: "https://www.notion.com/blog/data-model-behind-notion",
              },
            ],
          },
          ai: {
            move: "Paste the schema definition in and ask for a plain English description of what one row of each table represents, plus every place the same fact appears twice.",
            trap: "Given a partial schema it invents the rest, and it invents it in the most conventional shape possible: a created_at on every table, a status column with the values it expects, a users table with an email. Then it writes queries against the schema it imagined. Always paste the real table definitions, and always test one generated query against a count you already know.",
            prompt:
              "Here are my real table definitions. For each table, tell me in one sentence what a single row represents. Then list every fact that appears in more than one table, and for each, tell me what would have to be true for them to disagree. Do not add tables or columns that are not in what I pasted.",
          },
          build: {
            artefact:
              "An annotated schema map of your product, with the duplicated facts marked and one truth named for each.",
            steps: [
              { do: "Get the schema. Your database tool can export it, or ask an engineer for the table definitions." },
              { do: "For each table, write one sentence: what is one row of this?" },
              {
                do: "Draw the connections. Which column in which table points where.",
                hint: "Start from the table you care about most and go out two hops. You do not need the whole map on day one.",
              },
              { do: "Mark every fact stored in two places. For each pair, write which one you would treat as the truth and why." },
              { do: "Take the three numbers on your company dashboard and write which tables each one comes from." },
            ],
            tools: ["DBeaver, TablePlus or the Supabase table editor", "Excalidraw"],
          },
          check: [
            "What does one row of your biggest table actually represent?",
            "Which fact is stored in two places, and which one is the truth?",
            "Where does the number on your main dashboard come from, table by table?",
          ],
        },

        {
          slug: "sql",
          title: "SQL, the eight queries that cover most of it",
          kind: "Drill",
          minutes: 70,
          legacy: "Module 15. SQL-BI Crash Course",
          hook: "You ask data for retention by signup channel. It lands in eleven days, answers a slightly different question, and by then you have already shipped the thing it was supposed to inform.",
          explain: {
            title: "Four keywords and one habit",
            body: [
              "SELECT picks columns. FROM says which table. WHERE filters rows. GROUP BY rolls them up. JOIN combines tables. Nearly every product question you have is some arrangement of those five, and the remaining SQL you will ever need you can look up in the moment.",
              "The join is where the mistakes live. An inner join silently drops rows with no match on the other side, so the users who did nothing disappear, and your conversion rate looks wonderful. A left join keeps everything on the left and fills the gaps with nulls. Most product questions want a left join, and most generated SQL gives you an inner one.",
              "The habit that makes this safe: before you believe any result, check the row count against something you already know. If your query returns 900 users and the product has 40,000, you have filtered something you did not mean to filter. This takes ten seconds and it has saved more careers than any framework in this course.",
            ],
            diagram: "funnel",
            caption:
              "The funnel from Level 1, which is query number three. Every step is a WHERE clause and a COUNT, and the rate column is the reason anyone asked.",
            points: [
              {
                term: "COUNT versus COUNT DISTINCT",
                def: "One counts rows, the other counts unique values. On a one to many table these give wildly different answers and only one of them is users.",
              },
              {
                term: "LEFT JOIN",
                def: "Keeps every row on the left even when there is no match. This is how the people who did nothing stay in your denominator.",
              },
              {
                term: "The sanity check",
                def: "Compare your total against a number you already trust before you look at the interesting part of the result.",
              },
            ],
          },
          case: {
            brand: "Stitch Fix",
            year: "2016",
            situation:
              "Stitch Fix's data platform team faced the pattern every data team faces: a queue of requests from people who could not answer their own questions.",
            what: "Jeff Magnusson published their position that engineers should not sit in the middle as a service department writing other people's data pipelines. Instead the platform team builds tools and the people with the questions do the work end to end. The argument is explicitly about ownership and queue length, not about who is technically capable.",
            lesson:
              "You are not trying to become an analyst. You are trying to stop your cheap questions from consuming a queue that should be answering the expensive ones.",
            sources: [
              {
                label: "Engineers shouldn't write ETL, Stitch Fix multithreaded",
                url: "https://multithreaded.stitchfix.com/blog/2016/03/16/engineers-shouldnt-write-etl/",
              },
            ],
          },
          ai: {
            move: "Describe the question in plain English, paste your real schema, let a model write the SQL, then read it line by line and check the joins and the grain before you run it.",
            trap: "It writes SQL that runs perfectly and answers a slightly different question than the one you asked. Ask for weekly active users and you often get a count of events rather than distinct users. It also defaults to inner joins and, if your schema is incomplete, it invents a column with a plausible name and the query fails or, worse, silently succeeds against a column that means something else.",
            prompt:
              "Here is my exact schema. Write SQL to answer: [question]. Before the query, restate in one sentence what the result set will contain, one row per what. Use LEFT JOIN unless dropping unmatched rows is explicitly correct, and add a comment above each join saying what would be lost with an inner join. Use only columns present in the schema I pasted.",
          },
          build: {
            artefact:
              "Eight working queries against the Sona dataset, each answering a real product question, each with a row count check.",
            steps: [
              { do: "Load the Sona dataset into a free Postgres such as Supabase or Neon, or use SQLite locally." },
              {
                do: "Write eight queries: daily active users, retention by weekly cohort, funnel conversion, revenue by segment, feature adoption, churn by acquisition channel, top support issue by volume, and a definition of a power user.",
                hint: "Write the question in a comment above each query. In six months that comment is the only reason the query is still useful to anyone.",
              },
              { do: "For each one, write the sanity check next to it: the total it should be consistent with, and whether it was." },
              { do: "Deliberately break one query by switching a LEFT JOIN to an INNER JOIN. Record how far the number moves." },
              { do: "Take one query the model wrote and write, in a comment, the question it actually answers versus the one you asked." },
            ],
            tools: ["Supabase or Neon free tier", "DBeaver or the browser SQL editor"],
          },
          solution: {
            summary:
              "The eight queries are mostly the same query with a different GROUP BY. The value is in the sanity checks, not the SQL.",
            walkthrough: [
              "Start with the simplest count you can check by hand: total users. Now you have a denominator you trust.",
              "Daily active users is that count with a WHERE on the event date and a COUNT DISTINCT on user_id. If it comes out higher than total users, you counted events.",
              "Retention is the same shape with two dates: users who appeared in week zero, and how many of those same ids appear in week n. It has to be a left join from the cohort, otherwise the people who churned vanish and retention is always 100 percent.",
              "The funnel is four filtered counts from the same base. Compute the rate between steps rather than against the top, because that is the column that tells you which step to fix.",
              "For every result, write the check. Cohort sizes must sum to total signups in the period. Segment revenue must sum to total revenue. When one of those fails, the failure is the finding.",
            ],
            example: {
              label: "A query with its question and its check",
              body: "-- Q: how many distinct users categorised at least one transaction last week? -- Check: must be <= total active users last week (4,812).  SELECT COUNT(DISTINCT user_id) FROM events WHERE name = 'transaction_categorised' AND occurred_at >= now() - interval '7 days';",
            },
          },
          check: [
            "How far did the number move when you switched the join, and could you have spotted that in a dashboard?",
            "Which of the eight queries answers a slightly different question than the one you set out to ask?",
            "Can you answer a brand new question in under ten minutes now?",
          ],
          references: [
            { label: "Select Star SQL, a free interactive book", url: "https://selectstarsql.com/" },
          ],
        },

        {
          slug: "numbers-that-disagree",
          title: "Why your number disagrees with finance",
          kind: "Case study",
          minutes: 50,
          legacy: "Module 15.4. Reporting",
          hook: "Your dashboard says 12,400 paying users. Finance says 11,860. The board deck goes out Thursday. Neither of you is lying and one of you is about to look careless in front of investors.",
          explain: {
            title: "Two right answers to two different questions",
            body: [
              "Numbers disagree for four reasons and it is almost never a bug. Different definition: you count anyone with an active subscription, finance counts anyone whose payment cleared. Different time window: your month is calendar, theirs is the billing period. Different timezone: your day ends at midnight UTC, theirs at midnight local. Different treatment of the awkward cases: trials, refunds, failed payments retried on the third, accounts with two subscriptions.",
              "The fix is not to argue about which is right. Both are right for the question they answer. The fix is a reconciliation: start from one number, list each adjustment with its row count, and end at the other. Once the gap is itemised, the conversation moves from whose data is bad to which definition belongs on which slide.",
              "Then write the definition down where the number is displayed. A metric without a written definition is regenerated from memory by whoever is asked next, and it will be different. This is the cheapest governance in product and almost nobody does it.",
            ],
            diagram: "funnel",
            caption:
              "The same funnel counted two ways. Change the definition of step two and every rate below it moves, without anything in the product changing at all.",
            points: [
              {
                term: "Reconciliation",
                def: "A line by line walk from one number to the other. Not an argument, a table.",
              },
              {
                term: "The awkward cases",
                def: "Trials, refunds, dunning, duplicates, internal accounts, test data. The gap is almost always here.",
              },
              {
                term: "The written definition",
                def: "One sentence, next to the number, precise enough that two people compute it identically.",
              },
            ],
          },
          case: {
            brand: "WeWork",
            year: "2019",
            situation:
              "WeWork filed to go public in August 2019. The filing reported a loss of roughly 1.9 billion dollars on roughly 1.8 billion dollars of revenue for 2018.",
            what: "Alongside standard measures, the filing presented community adjusted EBITDA, a metric that excluded not only interest, tax, depreciation and amortisation but also marketing, general and administrative expenses, and development and design costs. Under that definition the business looked profitable. Analysts and journalists took the filing apart, the IPO was withdrawn, and the metric became a shorthand for a definition designed to produce an answer.",
            lesson:
              "Any number can be made to say what you want by moving the definition. Which is why the definition, not the number, is the thing you defend, and why a reconciliation beats a louder assertion every time.",
            sources: [
              {
                label: "The We Company S-1 filing, SEC EDGAR",
                url: "https://www.sec.gov/Archives/edgar/data/1533523/000119312519220499/d781982ds1.htm",
              },
            ],
          },
          ai: {
            move: "Give a model both definitions in words and both query results, and ask it to enumerate every category of row that could be in one and not the other, as a checklist you then go and count.",
            trap: "Asked why two numbers differ, it will produce a confident narrative explanation and a plausible split of the gap that adds up to exactly the difference. It is arithmetic dressed as evidence. Use it only to generate the checklist of candidate causes, then count each one in SQL yourself. Any line in your reconciliation without a query behind it is a guess.",
            prompt:
              "Here are two definitions of paying user and the two counts. List every category of account that could be included in one and excluded by the other. For each, write the SQL predicate that would count it. Do not estimate the size of any category.",
          },
          build: {
            artefact:
              "A reconciliation table that walks from your number to finance's, every line backed by a query.",
            steps: [
              { do: "Get both numbers and, more importantly, both definitions in writing. Ask for the definition, not the dashboard." },
              { do: "Generate the candidate list of differences and turn each into a counting query." },
              {
                do: "Build the table: start number, each adjustment with its count and sign, end number.",
                hint: "If it does not reconcile exactly, the remainder is a finding. Do not round it away. Twice out of three it is duplicate accounts or test data in production.",
              },
              { do: "Agree which definition belongs on the board slide and which belongs on the product dashboard." },
              { do: "Write both definitions in one sentence each, and put them next to the numbers where they live." },
            ],
            tools: ["Google Sheets", "Your SQL client"],
          },
          solution: {
            summary:
              "A 540 account gap usually decomposes into four lines, and one of them is embarrassing.",
            walkthrough: [
              "Start at your 12,400. Subtract accounts in a failed payment state that you still count as active: 210.",
              "Subtract trials that have entered the paid plan but not yet been charged: 180.",
              "Subtract internal and test accounts that finance excludes by email domain and you never filtered: 90.",
              "Subtract duplicate subscriptions on one account, which you count once and finance counts by invoice: 60.",
              "That lands on 11,860. Now the meeting is about whether a failed payment is still a customer, which is a real question with a real answer, instead of about whose dashboard is broken.",
            ],
            example: {
              label: "The definition line that ends the argument",
              body: "Paying users (product): accounts with a subscription in status active or past_due, excluding @sona.com addresses, counted once per account, at 00:00 UTC on the last day of the calendar month.",
            },
          },
          check: [
            "Does your reconciliation land exactly, and if not, what is the remainder?",
            "Which line in your table was the embarrassing one?",
            "Where is each definition written down now?",
          ],
        },

        {
          slug: "event-design",
          title: "Instrumentation before the feature ships",
          kind: "Build",
          minutes: 55,
          legacy: "Module 15.5, 20.3. Instrumentation and Analytics",
          hook: "The feature ships on Thursday. On the following Thursday Maya asks whether anyone used it. There is no event. The honest answer is that you will know in two weeks, and that answer costs you more credibility than the feature earned.",
          explain: {
            title: "Write the question first, then the event",
            body: [
              "An event is a record that something happened: a name, a timestamp, who did it, and a few properties. Your analytics is nothing but a long list of those. Which means the questions you can answer after launch were decided before launch, by whoever named the events, and if that was nobody then the answer is nobody knows.",
              "Work backwards. Write the five questions you will be asked in week one, because they are always roughly the same: did anyone use it, who, did they come back, did it break, and did it move the number we said it would. Then design the smallest set of events that answers exactly those five, and delete everything else. Over-instrumented products are as unanalysable as bare ones and they cost more to store.",
              "Naming matters more than it should. Pick object_action, past tense, lower case with underscores, and never change a name after launch, because renaming an event breaks every chart built on it and the old data does not come back. Properties carry the dimensions you will want to split by, and the one everyone forgets is where the action was initiated from.",
            ],
            diagram: "user-flow",
            caption:
              "Every arrow needs an event name before the flow is built. The dashed states need them most, because that is where the people go.",
            points: [
              {
                term: "Event",
                def: "Something happened. transaction_categorised, bank_link_failed. Past tense, one name forever.",
              },
              {
                term: "Property",
                def: "A dimension you will split by later: source, plan, method, error_code. Cheap to add now, impossible to backfill.",
              },
              {
                term: "Identity",
                def: "Which user, and how anonymous visitors get stitched to accounts at signup. Get this wrong and every funnel above signup is fiction.",
              },
              {
                term: "The tracking plan",
                def: "One table: event name, when it fires, its properties, and the question it answers. If a row has no question, delete the row.",
              },
            ],
          },
          case: {
            brand: "GOV.UK",
            situation:
              "The UK's Government Digital Service had to hold hundreds of separate public services to a common standard, built by different teams and suppliers.",
            what: "The service manual requires every transactional service to measure four things and publish them: cost per transaction, user satisfaction, completion rate, and digital take-up. Because the four are fixed and mandatory, the measurement gets designed into the service rather than retrofitted, and the numbers for different services can be compared at all.",
            lesson:
              "Deciding the questions before the build is what makes measurement possible. Deciding them after is what makes it expensive, approximate, and late.",
            sources: [
              {
                label: "GOV.UK service manual, measuring success",
                url: "https://www.gov.uk/service-manual/measuring-success",
              },
            ],
          },
          ai: {
            move: "Paste the spec and ask it to derive the tracking plan: every event, its properties, and the question each answers, as a table.",
            trap: "It generates an exhaustive taxonomy, every click, hover and page view, and it attaches a question to each because you asked it to, so the questions become generic filler like understanding user engagement. That is noise you pay to store and never query. Make it produce the plan in the other direction: give it your five questions and forbid any event that is not required by one of them.",
            prompt:
              "Here are the five questions I must answer in week one. Design the minimum event set that answers exactly those, no more. For each event: name in object_action past tense, exact firing condition, required properties, and which of the five questions it serves. If an event serves none of the five, do not include it.",
          },
          build: {
            artefact:
              "A tracking plan for the thing you are about to build, where every event is tied to a written question.",
            steps: [
              { do: "Write the five questions you will be asked in week one, in the words the person will use." },
              { do: "Take the flow you drew and put an event name on every arrow, including the failure arrows." },
              {
                do: "Define the properties for each event, and the exact condition that fires it.",
                hint: "Fire on the server when the thing actually succeeded, not on the click. Click events measure intent, not outcome, and the difference is your error rate.",
              },
              { do: "Delete every event that does not answer one of the five questions. Expect to delete half." },
              { do: "Write the identity rule: how an anonymous visitor becomes a known user, and what happens to their earlier events." },
            ],
            tools: ["PostHog, Plausible or GA4", "Google Sheets"],
          },
          solution: {
            summary:
              "A working plan for a small feature is usually six to nine events, and at least two of them are failures.",
            walkthrough: [
              "Question one, did anyone use it, needs exactly one event on the successful completion of the core action. Not the page view.",
              "Question two, who, is not an event. It is a property, plus a correct identity rule.",
              "Question three, did they come back, needs no new events at all, only the same event with a timestamp.",
              "Question four, did it break, is the one people skip. You need an event on each failure path with an error_code property, otherwise your error rate lives in a log file nobody queries.",
              "Question five, did it move the number, means the metric from your spec has to be computable from these events alone. Check that before you ship, by writing the query against zero rows.",
            ],
            example: {
              label: "Two rows from a real tracking plan",
              body: "bank_link_completed | fires server side when the provider returns a success and at least one account is stored | props: provider, duration_ms, accounts_returned, entry_point | answers Q1, Q5. bank_link_failed | fires server side on any non-success return or timeout | props: provider, error_code, step, duration_ms | answers Q4.",
            },
          },
          check: [
            "Can every event in your plan be tied to one of the five questions in writing?",
            "How many of your events are failures, and can you compute an error rate from them?",
            "Could you write the query for your success metric today, against an empty table?",
          ],
        },
      ],
    },

    /* ================================================================ 4 */
    {
      slug: "writing-it-for-engineers",
      n: "4",
      title: "Writing it so nobody has to rewrite it",
      summary:
        "A spec, a ticket and acceptance criteria. Three documents, one job: make sure the thing that gets built is the thing that was needed.",
      lessons: [
        {
          slug: "the-spec",
          title: "A spec an engineer does not have to rewrite",
          kind: "Build",
          minutes: 60,
          legacy: "Module 13.1. Product Requirements",
          hook: "Dev opens your document, reads two pages, and opens a blank one to write what he thinks you meant. That rewrite is the real spec and you are no longer the author of it.",
          scene: {
            image: "/img/scenes/office-wide.webp",
            alt: "A meeting room with a long document on the screen and two people reading it in silence.",
            caption: "Spec review. Ten minutes of silent reading, then the questions.",
            notes: [
              {
                from: "Dev, engineering lead",
                text: "Your last doc had eleven pages and no decisions in it. I need to know what happens when the provider returns nothing, and I could not find it. Everything else I can figure out.",
              },
              {
                from: "Ana, data",
                text: "If the spec does not say which number this is supposed to move, I cannot tell you afterwards whether it did.",
              },
            ],
          },
          explain: {
            title: "A spec is a set of decisions, not a description",
            body: [
              "Everything an engineer needs from you is a decision they would otherwise have to make alone, at six on a Friday, without the context. What problem, for whom, how we will know it worked, what is in scope, what is explicitly out, and what happens in every case that is not the happy path. Background, competitor tables and appendices are decoration and they push the decisions below the fold.",
              "Write the decisions in the order a reader needs them. Problem and evidence, then the metric and its counter-metric, then scope with explicit cuts, then the rules and states, then the open questions you honestly have not resolved. That last section is the mark of a spec written by someone confident: an unanswered question stated plainly is worth ten paragraphs of hedging.",
              "Length is not the measure. A one page spec with all six decisions beats eleven pages with four of them. If your document is long because the thinking is not finished, more pages will not finish it.",
            ],
            diagram: "prd-anatomy",
            caption:
              "The four sections that survive contact with an engineer, and the three that make your document unread.",
            points: [
              {
                term: "The problem, with evidence",
                def: "Who hurts, how many, and one quote or number. Without it, every scope argument later is a matter of taste.",
              },
              {
                term: "The metric and its counter",
                def: "One number this should move, and one number that must not get worse. Written before the build, not after.",
              },
              {
                term: "Scope and the cuts",
                def: "What ships, and at least three things you deliberately are not doing. The cuts are the most credible part of the document.",
              },
              {
                term: "Open questions",
                def: "What you do not know, who will answer it, and by when. Hiding these does not make them go away, it makes them surface in code review.",
              },
            ],
          },
          case: {
            brand: "Google",
            situation:
              "Google's engineering culture runs on the design doc: an informal document written before a significant project starts, circulated for comment, and kept as the record of why the approach was chosen.",
            what: "As described publicly by a Google engineer, the doc is deliberately not a template driven artefact. It covers context and scope, the goals and explicitly the non-goals, the design, alternatives considered, and cross-cutting concerns. The non-goals section and the alternatives section do most of the work, because they force the author to show the choices rather than the conclusion.",
            lesson:
              "The parts of a spec that carry the most weight are the ones about what you decided not to do. They are also the first parts people cut for length.",
            sources: [
              {
                label: "Design docs at Google, Malte Ubl",
                url: "https://www.industrialempathy.com/posts/design-docs-at-google/",
              },
            ],
          },
          ai: {
            move: "Write the spec yourself, then have a model read it as the engineer who has to build it and list every decision it cannot find an answer to.",
            trap: "Ask it to write the spec and you get a document that reads beautifully and decides nothing. Smooth prose, a goals section, and acceptance criteria phrased so generously that no implementation could fail them. It also will not tell you that the thing you are specifying is the wrong thing to build, because you did not ask and it will not volunteer. Ask separately and adversarially: what would have to be true for this feature to be a mistake.",
            prompt:
              "You are the engineer who has to build this on Monday and I am on leave. List every decision you would have to make yourself because this document does not answer it. Then list every acceptance criterion here that no reasonable implementation could fail. Do not rewrite the document.",
          },
          build: {
            artefact:
              "A spec for the thing you are going to build in chapter 5, with all six decisions and no decoration.",
            steps: [
              { do: "Write the problem in three sentences with one piece of evidence from your own signal, not from a deck." },
              { do: "Write the metric and the counter-metric, and confirm both are computable from the tracking plan you just wrote." },
              {
                do: "Write scope, then write three explicit cuts.",
                hint: "Name a cut you actually wanted. Cuts that cost you nothing do not convince anyone that you made a choice.",
              },
              { do: "Write the rules: every condition, every state, every case that is not the happy path." },
              { do: "Run the missing decisions pass and fill the holes. Then run the wrong thing to build pass and record your answer honestly." },
              { do: "Give it to a real engineer and ask them what they would still have to decide alone." },
            ],
            tools: ["Notion, Google Docs or plain markdown"],
          },
          solution: {
            summary:
              "The holes in a first spec are always in the same three places: the empty case, the failure case, and who is allowed to see it.",
            walkthrough: [
              "Read your own spec and count the decisions. If you find fewer than six, you wrote a description.",
              "For every noun in your spec, ask what happens when there are none of them, one of them, and ten thousand of them. Most specs answer only the middle case.",
              "For every external thing you depend on, ask what happens when it is slow, when it fails, and when it succeeds but returns nothing useful. The third one is the case nobody writes and it is the most common in practice.",
              "For every screen, ask who can see it and what a person without permission gets instead.",
              "Then cut. Anything that does not change what someone builds, tests or measures goes.",
            ],
            example: {
              label: "The open questions section that gets respect",
              body: "Open: (1) if the provider returns accounts with zero transactions, do we treat the link as successful? Priya says yes, I am not sure. Deciding Wednesday with Dev. (2) Do we need consent copy reviewed by legal for the export path? Asked, no answer yet, blocks launch not build.",
            },
          },
          check: [
            "How many decisions does your spec make, and how many did the engineer still have to make?",
            "Which of your three cuts actually hurt?",
            "What did the model say would have to be true for this feature to be a mistake, and do you believe it?",
          ],
        },

        {
          slug: "tickets",
          title: "Tickets that carry the problem",
          kind: "Drill",
          minutes: 45,
          legacy: "Module 13.2. Writing Stories, 13.4. Backlogs & Sprints",
          hook: "Your ticket says improve the onboarding flow. It is estimated at eight points, built in a sprint, and it is not what you wanted. Everybody did their job.",
          explain: {
            title: "Problem in the title, solution in the comments",
            body: [
              "A ticket that names a solution gets you that solution. A ticket that names a problem gets you the best solution the team can find, which is frequently better than yours and always cheaper, because the person who knows what is expensive is the person who has to build it.",
              "So: “users cannot tell whether their bank connected” in the title, and your suggested green tick further down as one option among several. State the appetite, which is how much this problem is worth rather than how long the solution takes. Two days, a week, a sprint. That single change turns an estimation ritual into a design conversation.",
              "Then say what this ticket is not. The no-go list is the cheapest scope control in existence and it takes one line. Without it, the ticket grows in review, in standup, and in the mind of whoever picks it up on a slow afternoon.",
            ],
            points: [
              {
                term: "The title is the problem",
                def: "If the title contains a UI element, you have specified a solution and you will get exactly it.",
              },
              {
                term: "Appetite",
                def: "How much the problem is worth in time. Set by you, before any estimate exists.",
              },
              {
                term: "No-gos",
                def: "What this explicitly does not include. One line, and it saves a week.",
              },
              {
                term: "Ready",
                def: "A ticket is ready when someone could start it without asking you anything. Anything less is a note to yourself.",
              },
            ],
          },
          case: {
            brand: "Basecamp",
            year: "2019",
            situation:
              "Basecamp replaced backlogs and story point estimation with six week cycles and written pitches, and published the method as a book, Shape Up.",
            what: "A pitch contains the problem, the appetite, a deliberately rough sketch of a solution, the rabbit holes to avoid, and the no-gos. The appetite inverts the normal process: rather than asking how long something will take, the team decides how much time it is worth and shapes the work to fit. Nothing carries over automatically, which means an unfinished project has to be re-pitched to continue.",
            lesson:
              "Fixed time and variable scope is a different game to fixed scope and variable time, and the pitch is what makes it playable. The most valuable section in the whole format is the one that says what this is not.",
            sources: [
              { label: "Shape Up, Basecamp", url: "https://basecamp.com/shapeup" },
            ],
          },
          ai: {
            move: "Write the ticket, then ask a model to list every interpretation of it that a reasonable engineer could hold. Every genuine ambiguity produces two readings that are both defensible.",
            trap: "Asked to review your ticket, it will improve the writing and leave the ambiguity intact, because polished text reads unambiguous. It will also silently pick one reading and answer as if that were the only one. Force the plural: ask for at least three readings and refuse the first response if it gives you one.",
            prompt:
              "Here is a ticket. Give me at least three different implementations that would all satisfy it as written, and describe how each would look to a user. Then tell me which sentence causes each divergence. Do not improve the wording.",
          },
          build: {
            artefact:
              "Three tickets written from real findings, each with a problem title, an appetite, and no-gos.",
            steps: [
              { do: "Take three findings from your own signal log or your usability tests in Level 3." },
              { do: "Write each as problem title, evidence in two lines, appetite, no-gos, and a suggested approach clearly marked as a suggestion." },
              { do: "Run the three readings pass on each. Rewrite the sentence that causes the divergence." },
              {
                do: "Apply the ready test: would someone pick this up on Monday without messaging you?",
                hint: "Give it to a person who was not in any of the meetings. Their first question is your first missing sentence.",
              },
              { do: "Ask a real engineer to read one and tell you what is missing." },
            ],
            tools: ["Linear, Jira or GitHub Issues"],
          },
          check: [
            "Does any of your titles contain a UI element?",
            "Which sentence produced the three different readings?",
            "Does each ticket say what it explicitly does not include?",
          ],
        },

        {
          slug: "acceptance-criteria",
          title: "Criteria someone could actually fail",
          kind: "Drill",
          minutes: 45,
          legacy: "Module 13.3. Acceptance Criteria and QA",
          hook: "The build is demoed. It matches every acceptance criterion you wrote. You watch it and know immediately it is wrong, and you have no grounds to say so.",
          explain: {
            title: "If nothing could fail it, it is not a criterion",
            body: [
              "An acceptance criterion is a statement that is either true or false about the built thing, checkable by a person who was not in the room. “The connection status is clear to the user” cannot be false. “The status text changes from Connecting to Connected within 2 seconds of the provider callback returning success” can.",
              "The format that keeps you honest is given, when, then. Given the user has one failed account and one working account, when they open the accounts page, then the failed account appears first with the retry action visible. That shape forces a starting state, which is where the missing cases hide.",
              "Then cover the states. Every screen has roughly eight: empty, loading, partial, error, offline, denied, first run, success. Most specs write the last one. The others get invented under time pressure by whoever is building it, which is how you end up with an error message that says undefined.",
            ],
            diagram: "states-matrix",
            caption:
              "Write a criterion for each of these before the build. The amber ones are where the support tickets come from.",
            points: [
              {
                term: "Falsifiable",
                def: "A tester who was not in the meeting can mark it pass or fail without asking you.",
              },
              {
                term: "Given, when, then",
                def: "Starting state, action, observable result. The starting state is the part people skip and the part that matters.",
              },
              {
                term: "One criterion, one thing",
                def: "The word and in a criterion usually means it should be two, and one of them will quietly not be tested.",
              },
            ],
          },
          case: {
            brand: "Hawaii Emergency Management Agency",
            year: "2018",
            situation:
              "On 13 January 2018 an alert went to phones across Hawaii reading BALLISTIC MISSILE THREAT INBOUND TO HAWAII. SEEK IMMEDIATE SHELTER. THIS IS NOT A DRILL.",
            what: "It was a drill. According to the FCC's investigation, an employee selected the wrong option from a menu that placed the real alert and the test alert next to each other, and confirmed a generic are you sure dialogue. The system had no way to cancel a sent alert and no prepared correction template, so the correction took 38 minutes to reach the same phones.",
            lesson:
              "Two states nobody specified: the confirmation that distinguishes a real action from a test one, and the undo. Both are boring criteria that would have been cut for length, and their absence is the entire incident.",
            sources: [
              {
                label: "FCC report on the Hawaii false emergency alert",
                url: "https://www.fcc.gov/document/fcc-releases-report-hawaii-false-emergency-alert",
              },
            ],
          },
          ai: {
            move: "Give it your criteria and ask it to write the test cases. Anything it cannot turn into a test with a definite expected result is ambiguous, and you have found the ambiguity for free.",
            trap: "It writes tests for the criteria you wrote and never mentions the ones you did not. It will not tell you the empty state is missing, because nothing you gave it mentioned an empty state. The generic eight it can produce on request. The domain ones, like a bank connection that succeeds and returns zero transactions, it will not, because those come from knowing the product. Ask the two questions separately and expect to supply the third answer yourself.",
            prompt:
              "First: turn each acceptance criterion below into a test case with a definite expected result, and flag any you cannot. Second, separately: list every state this feature could be in that these criteria do not mention, including empty, partial, denied, offline and stale data.",
          },
          build: {
            artefact:
              "A complete criteria set for one feature, covering all eight states plus at least three domain specific ones.",
            steps: [
              { do: "Take one feature from your spec and write its criteria in given, when, then." },
              { do: "Split every criterion containing the word and." },
              { do: "Run the test case conversion. Rewrite every criterion that could not be converted." },
              {
                do: "Fill in the eight generic states with the actual copy each would show.",
                hint: "Write the real words, not “show an error”. The copy is a decision and if you do not make it, an engineer will, at speed.",
              },
              { do: "Add at least three states specific to your product that no generic list contains." },
            ],
          },
          solution: {
            summary:
              "The domain specific states are the ones worth the hour. They are always about a dependency that succeeded and gave you nothing useful.",
            walkthrough: [
              "Start from the eight and write them out even where they feel obvious. Obvious ones take thirty seconds and half of them turn out to be undefined in the product.",
              "Now go dependency by dependency. For each external service, write the state where it returns success with an empty result.",
              "Then time. What does this screen show for a user who did this a year ago, or one who did it four seconds ago and the data has not propagated.",
              "Then permission. What does a viewer see where an owner sees an action.",
              "Mark which of these states currently do not exist in the product at all. That list is your next three tickets and it cost you an hour.",
            ],
            example: {
              label: "A criterion that can fail",
              body: "Given the provider link succeeded and returned zero accounts, when the user lands on the accounts page, then the page shows “We connected to HDFC but found no accounts on this login” with a Try a different login action, and bank_link_completed fires with accounts_returned=0.",
            },
          },
          check: [
            "How many of your criteria could a tester fail without asking you a question?",
            "How many domain specific states did you find beyond the generic eight?",
            "Which of those states does not exist in the product today?",
          ],
        },
      ],
    },

    /* ================================================================ 5 */
    {
      slug: "build-it",
      n: "5",
      title: "Building the thing",
      summary:
        "One job, one page, one file at a time. AI writes most of it, you decide all of it, and you read what it wrote before it goes anywhere.",
      lessons: [
        {
          slug: "scope-the-v1",
          title: "One job, one page",
          kind: "Concept",
          minutes: 40,
          hook: "You have an evening, a free tier, and an idea with nine features in it. Eight of them are why this will not exist by Sunday.",
          scene: {
            image: "/img/scenes/domain-health.webp",
            alt: "A single laptop on a kitchen table at night with a notebook showing one sentence circled.",
            caption: "Friday, 9pm. One sentence, circled, and everything else crossed out.",
            notes: [
              {
                from: "Maya, founder",
                text: "If you actually build it I will look at it. I am not funding a slide about it.",
              },
              {
                from: "Dev, engineering lead",
                text: "Serious advice: pick the boring stack and commit after every step that works. The thing that kills side projects is not difficulty, it is not being able to get back to Tuesday.",
              },
            ],
          },
          explain: {
            title: "Scope is subtraction",
            body: [
              "Write the one job as a sentence: this lets a specific person do a specific thing in under a specific time. If your sentence has an and in it, you have two products and you will finish neither. Everything you add multiplies the ways it can break and the states you have to design, and states are what actually consume the evening.",
              "Cut in a fixed order. No accounts if you can avoid them, because auth is a day. One page, because navigation is a day. No settings, because every setting is a state and a place to store it. No admin screen, because you can look at the database yourself. Say no to anything whose only justification is that a real product would have it.",
              "What you keep is the one flow, end to end, working. A user arrives, does the thing, and gets something back that is worth having. Ugly is fine. Manual is fine, and doing the back half by hand for the first ten users is not cheating, it is the fastest way to learn what to automate.",
            ],
            points: [
              {
                term: "The one sentence",
                def: "This lets [who] do [what] in under [time]. If you cannot write it, you are not ready to build it.",
              },
              {
                term: "The concierge back half",
                def: "The user sees a product. You do the work manually behind it for the first ten. Real output, no build.",
              },
              {
                term: "Cost of a feature",
                def: "Not the build time. The states, the errors, the copy, and the thing it will break in six weeks.",
              },
            ],
          },
          case: {
            brand: "Nomad List",
            year: "2014",
            situation:
              "Pieter Levels wanted a ranked list of cities for people who work remotely. He was not a trained engineer and had no team.",
            what: "The first version was a public Google spreadsheet with a handful of columns, shared once. People kept using it and asking for more cities, so he turned it into a website, and only then into a product with an account and a subscription. He has written up the method repeatedly and publishes his revenue openly, running the business alone.",
            lesson:
              "Spreadsheet, then page, then product is the order. Skipping to the product is how you spend three months building the wrong columns.",
            sources: [
              {
                label: "How I build my minimum viable products, Pieter Levels",
                url: "https://levels.io/how-i-build-my-minimum-viable-products/",
              },
            ],
          },
          ai: {
            move: "Describe your idea and ask a model to list everything it would need, then ask it separately which single item you could ship alone this weekend that a person would still get value from.",
            trap: "Ask what should I build and you get a feature list with auth, a dashboard, notifications and a settings page, because that is the average of every product it has read about. It optimises for completeness and it will never tell you to build less. It also will not tell you the idea is wrong, only how to build it. Ask it to argue against the whole thing, in a separate message, and read that one twice.",
            prompt:
              "Here is my idea. First, argue that it should not be built at all, in five specific sentences about this idea rather than about startups. Then, assuming I build it anyway, name the single smallest slice a person would still find useful, and list what I must cut to get there.",
          },
          build: {
            artefact:
              "A one sentence scope, a cut list, and a sketch of the single page.",
            steps: [
              { do: "Write the one sentence. Rewrite it until it has no and in it." },
              { do: "List everything a full version would have. Aim for at least fifteen items." },
              {
                do: "Cross out everything not required for the one sentence to be true. Keep the crossed out list.",
                hint: "The crossed out list is your roadmap and your evidence that you made choices. Do not throw it away.",
              },
              { do: "Decide what you will do manually for the first ten users." },
              { do: "Sketch the single page on paper. One input, one output, one action." },
            ],
          },
          check: [
            "Does your sentence contain an and?",
            "What are you doing by hand, and how many users does that survive?",
            "Which cut are you least comfortable with, and what would make you add it back?",
          ],
        },

        {
          slug: "build-with-ai",
          title: "Build the thing",
          kind: "Build",
          minutes: 70,
          legacy: "Module 16. Building with code",
          hook: "You have the sentence, the sketch and an evening. There is no longer an excuse, and by the end of this lesson there is a URL.",
          explain: {
            title: "Small named steps, committed",
            body: [
              "Do not ask for the app. Ask for one thing at a time, in a named step: put a form with these three fields on the page. Store a submission in the database. Show the last ten. Each step you can see working, and each step you commit. A big request produces a large amount of code that mostly works, and the parts that do not are now buried inside the parts that do.",
              "Git is the difference between a calm build and a miserable one. Commit after every step that works, with a message saying what works. When the model breaks something while fixing something else, and it will, you go back to the last good state in one command instead of arguing with it for an hour.",
              "Read what it wrote. Not to write it yourself, but so that when something breaks you can describe what broke, and so you notice the API key it put in the page that gets sent to every browser. You practised this in chapter 2. This is where it pays.",
            ],
            points: [
              {
                term: "One step, one commit",
                def: "A step is something you can see working in the browser. If you cannot see it, it is not a step.",
              },
              {
                term: "Environment variable",
                def: "A secret kept outside the code and outside the browser. Anything in client code is public, including in a private repo.",
              },
              {
                term: "The revert",
                def: "Going back to the last working version. Free if you committed, expensive if you did not.",
              },
            ],
          },
          case: {
            brand: "Y Combinator",
            year: "2025",
            situation:
              "In March 2025 Y Combinator partners described the composition of the Winter 2025 batch on their own channel.",
            what: "Jared Friedman said around a quarter of the batch had codebases that were roughly 95 percent AI generated, and that the founders involved were not less technical than previous batches. The partners were explicit that the founders still had to be able to read and debug the code, because when something broke, teams who could not read it were stuck.",
            lesson:
              "The bar moved. Generating the code is no longer the constraint and reading it is. That is a good trade for a product manager, because reading is a skill you can acquire in a week.",
            sources: [
              {
                label: "A quarter of startups in YC's current cohort have codebases that are almost entirely AI-generated",
                url: "https://techcrunch.com/2025/03/06/a-quarter-of-startups-in-ycs-current-cohort-have-codebases-that-are-almost-entirely-ai-generated/",
              },
            ],
          },
          ai: {
            move: "Scaffold with v0, Lovable, Cursor or Claude, then iterate in small named steps and paste real error messages back verbatim rather than describing them.",
            trap: "Two failures cost real money here. It puts secrets in client side code without mentioning it, so check every key is in an environment variable before you deploy. And when you report a bug, it will confidently rewrite working code that has nothing to do with the bug, because a rewrite looks like progress. Constrain every request to named files and commit before each one.",
            prompt:
              "Add [one specific feature] only. Do not refactor, rename or modify any code unrelated to this feature. List every file you changed and one line on why. If this requires a secret, tell me the environment variable name and confirm it is never referenced from client side code.",
          },
          build: {
            artefact:
              "A working product deployed to a public URL that does the one job.",
            steps: [
              { do: "Set up the repo and make the first commit before you write anything. An empty commit is fine." },
              { do: "Scaffold the single page. Get something ugly on screen in the first hour." },
              {
                do: "Add the data layer. One table, the columns you actually need, nothing speculative.",
                hint: "Generate the schema with a model, then read every column and delete the ones nothing in your sketch uses. It will add created_by, is_deleted and metadata whether or not you need them.",
              },
              { do: "Wire the one action end to end so a submission is stored and visible. Commit." },
              { do: "Move every secret into environment variables. Search the built page source for your keys before you go further." },
              { do: "Deploy. Open the URL on your phone, on mobile data, and do the job as a stranger would." },
            ],
            tools: ["Claude, Cursor, v0 or Lovable", "Next.js", "Supabase or Neon", "Vercel", "GitHub"],
          },
          solution: {
            summary:
              "The build goes wrong in the same four places every time, and three of them are avoidable with a habit rather than a skill.",
            walkthrough: [
              "It stops working and you do not know when it last worked. Fix: commit after every visible step, with a message that says what works.",
              "It fixes one thing and breaks two. Fix: constrain every request to named files, and revert rather than negotiate.",
              "Something fails silently. The form submits, nothing appears, no error. Almost always a missing environment variable or a permission rule on the database. Check the server logs before you touch the code.",
              "It works locally and not deployed. Almost always environment variables that exist on your laptop and not in the host's settings.",
              "The fourth one is not avoidable: at some point you will not understand what it wrote. Ask for a walkthrough of that file in plain English and read it. That is a fifteen minute cost and skipping it compounds.",
            ],
          },
          check: [
            "Can a stranger open your URL and finish the one job with no explanation from you?",
            "Are all your secrets in environment variables? Check the deployed page source, not your intentions.",
            "How many commits do you have, and does each message say what worked?",
          ],
        },

        {
          slug: "read-what-it-wrote",
          title: "What it quietly left out",
          kind: "Teardown",
          minutes: 50,
          hook: "It works. You did the job three times in a row and it worked every time. You are about to send the link to ten people who will not do it the way you did.",
          explain: {
            title: "The three things generated code drops",
            body: [
              "Error handling. Generated code writes the happy path and, under instruction to be concise, omits the catch. The request fails, nothing is logged, the interface shows the spinner forever. You saw this state in chapter 1 and now you have built one.",
              "Validation. It trusts the input. Empty submissions, a name field with 40,000 characters pasted into it, an email that is not an email, the same form submitted twice by an impatient person on a slow connection. Each of those is a row in your database you will have to explain later.",
              "Access rules. On a hosted database, the default is frequently that any client with the public key can read the table. Your form works, and so does anyone else's request for every row in it. This is the single most common way a first product leaks data, and it is invisible in the browser because everything looks fine.",
            ],
            points: [
              {
                term: "The silent catch",
                def: "An error swallowed with no log and no user message. Your product looks fine and does nothing.",
              },
              {
                term: "Validation on the server",
                def: "Client checks are a courtesy. Anyone can send a request directly, so the rule has to live where the data does.",
              },
              {
                term: "Row level security",
                def: "The database rule for who can read which rows. Off by default in more setups than you would like.",
              },
            ],
          },
          case: {
            brand: "Uber",
            year: "2016",
            situation:
              "Attackers obtained credentials that Uber engineers had left in a private code repository, and used them to reach a cloud storage account holding data on about 57 million riders and drivers.",
            what: "The breach itself was a credentials handling failure. What turned it into a criminal case was the cover up: the company paid the attackers through a bug bounty programme and did not disclose. Uber's chief security officer was later convicted of obstruction. The credentials in a repository part of the story is the part that happens to ordinary teams every week.",
            lesson:
              "A private repository is not a secret store. The habit of checking where the key lives costs ten seconds per key and there is no upper bound on what it saves.",
            sources: [
              {
                label: "Former chief security officer of Uber convicted, US Department of Justice",
                url: "https://www.justice.gov/usao-ndca/pr/former-chief-security-officer-uber-convicted-federal-charges-covering-2016-hack",
              },
            ],
          },
          ai: {
            move: "Paste each file back in and ask specifically what happens when the network call fails, when the input is empty, and when a stranger sends a request directly to the endpoint.",
            trap: "Ask if this code is safe and you will be told it looks good with a few generic suggestions, because a broad question invites a broad reassurance. Ask what happens when the fetch throws and it will find the missing catch immediately. Narrow, hostile, specific questions get real answers. General ones get comfort.",
            prompt:
              "For each file: list every external call and say exactly what the user sees if it fails, times out, or returns an empty result. List every input and what happens if it is empty, enormous, or submitted twice. State whether an unauthenticated request to each endpoint would succeed. Answer with file and line references only, no reassurance.",
          },
          build: {
            artefact:
              "A hardened version of your product, plus the log of what was missing.",
            steps: [
              { do: "Run the three questions over every file. Write down each gap you find as a row." },
              {
                do: "Break it on purpose. Submit the form empty, twice, with a huge string, and with the network throttled to offline.",
                hint: "Chrome DevTools can set the network to offline and to slow 3G. Do both. Slow 3G finds more bugs than offline.",
              },
              { do: "Add the missing states from chapter 4: loading, error with a real message, empty, and success." },
              { do: "Check the access rules on your database directly. Try to read your table from a browser console with only the public key." },
              { do: "Fix the top three. Commit each separately with a message naming what it prevents." },
            ],
            tools: ["Chrome DevTools", "Your database's policy editor"],
          },
          solution: {
            summary:
              "A first pass on a small app usually turns up five to eight gaps, and two of them matter: an unhandled failure and an open table.",
            walkthrough: [
              "Throttle to slow 3G and submit. If nothing happens for eight seconds and there is no spinner, you have found your loading state.",
              "Turn the network off and submit. If it fails silently, you have found your error state, and the fix is a message that says what happened and what to do.",
              "Submit empty. If a blank row lands in your database, your validation is client side only or absent.",
              "Open the console on the deployed page and try to select every row of your table with the public key. If rows come back, stop and fix the policy before anyone else sees the URL.",
              "Write the copy for each state yourself. This is the part AI writes worst, because a good error message needs to know what the user should do next, and only you know that.",
            ],
          },
          check: [
            "What does your product do right now when the network drops mid submission?",
            "Can an anonymous request read your table?",
            "Which state did you have to write the copy for yourself, and why was the generated version wrong?",
          ],
        },

        {
          slug: "what-it-costs-to-run",
          title: "What it costs to run",
          kind: "Drill",
          minutes: 45,
          hook: "The free tier is free until a thousand people arrive at once, which is exactly the day you would least like to find out where the limit is.",
          explain: {
            title: "Per user, per month, at three volumes",
            body: [
              "Everything you deployed has a free tier and a cliff. Hosting is free until bandwidth or function invocations run out. The database is free until rows or storage or connections run out. Email is free for a hundred a day. Each has a number, each number is on a pricing page, and you should know all of them before you share the link.",
              "If your product calls a model, that is a real marginal cost per use and it is the one that behaves unlike classic software. Cost scales with tokens in and out, so a feature that reads a long document every time is expensive per call in a way a database read is not. The good news is that the cheapest model is often good enough for the specific job, and the difference between the cheapest and the best on your task is something you can measure rather than assume.",
              "Then write the number: cost per active user per month, at ten users, at a thousand, at ten thousand. Not to be precise, but because a plan that costs nothing at ten and forty rupees a user at a thousand is a different product decision than one that stays flat.",
            ],
            diagram: "cost-curve",
            caption:
              "Quality against cost per call. The last three points of quality often cost five times as much, and on most jobs nobody notices them.",
            points: [
              {
                term: "The cliff",
                def: "The specific number on the pricing page where free becomes billed. Write it down for each service.",
              },
              {
                term: "Marginal cost",
                def: "What one more active user costs you per month. Near zero for classic software, distinctly not zero once a model is in the loop.",
              },
              {
                term: "Good enough on this task",
                def: "Measured on your own inputs, not on a leaderboard. Most jobs do not need the largest model.",
              },
            ],
          },
          case: {
            brand: "Vercel",
            year: "2024",
            situation:
              "Hosting platforms with generous free tiers periodically make the news when a small project gets unexpected traffic and generates a large bill overnight.",
            what: "In response to a widely discussed case, Vercel published guidance and shipped spend management controls that let an account set a spending limit and pause a project when it is reached. The general pattern across usage based platforms is the same: the default is to keep serving and keep billing, and the safety valve exists but is off unless you turn it on.",
            lesson:
              "Usage based pricing means your cost curve is decided by strangers. Set the limit on the day you deploy, not on the day it goes wrong.",
            sources: [
              {
                label: "Vercel spend management documentation",
                url: "https://vercel.com/docs/pricing/spend-management",
              },
            ],
          },
          ai: {
            move: "Have a model build the cost model as a formula per service, then run the same task through a cheap model and an expensive one on twenty of your real inputs and compare the outputs yourself.",
            trap: "It quotes prices from memory and prices change. Every per token and per month figure it gives you is from its training data and may be a year stale, or from the wrong region, or the wrong tier. Make it produce the formula with the price as a named input, then fill the prices yourself from the pricing pages today.",
          },
          build: {
            artefact:
              "A cost sheet for your product at three volumes, with the free tier cliff for each service.",
            steps: [
              { do: "List every service your product uses. Hosting, database, email, model, domain, anything." },
              { do: "For each, open the pricing page today and write the free limit and the first paid rate." },
              {
                do: "Build the sheet: cost per active user per month at 10, 1,000 and 10,000 users.",
                hint: "The line that surprises people is almost never hosting. It is the model call, email, or database egress.",
              },
              { do: "If you use a model, run twenty real inputs through the cheapest and the most capable, and score the outputs yourself. Note where the cheap one is genuinely worse." },
              { do: "Set a spending limit on every service that offers one, today." },
            ],
            tools: ["Google Sheets", "The pricing pages, opened today"],
          },
          check: [
            "What does one more active user cost you per month?",
            "Which service hits its free limit first, and at how many users?",
            "On your twenty real inputs, where was the cheap model actually worse?",
          ],
        },
      ],
    },

    /* ================================================================ 6 */
    {
      slug: "on-the-internet",
      n: "6",
      title: "Putting it on the internet",
      summary:
        "A real domain, https, and the first ten people who are not you. Then reading what they actually did.",
      lessons: [
        {
          slug: "domain-and-https",
          title: "A real domain, and what breaks when you get one",
          kind: "Build",
          minutes: 50,
          hook: "The product works on the URL the host gave you. You buy a domain, point it at the app, and now the form submits to nowhere, the browser says not secure, and the emails go to spam.",
          scene: {
            image: "/img/scenes/domain-commerce.webp",
            alt: "A laptop showing a DNS settings panel with several records listed.",
            caption: "The DNS panel. Four records, and each one breaks something different.",
            notes: [
              {
                from: "Dev, engineering lead",
                text: "Whatever you do, do not set the TTL to a day while you are still changing things. You will spend the evening looking at a cached answer and thinking you are wrong.",
              },
              {
                from: "Priya, support",
                text: "If you are sending anything from your own domain, set up the email records first. Otherwise it goes to spam and you will think nobody opened it.",
              },
            ],
          },
          explain: {
            title: "A name, a certificate, and a place to send things",
            body: [
              "A domain is a name that points at an address. DNS is the lookup that resolves the name, and it is a system of records: an A record points at an IP address, a CNAME points at another name, MX records say where email for the domain goes, and TXT records carry proof of things such as who is allowed to send email as you. Changes propagate on a delay set by the TTL, which is why the internet appears to disagree with itself for an hour after you change something.",
              "https means the connection is encrypted and the certificate proves the server is who the name says. Certificates are free now and most hosts issue and renew them automatically, but they expire, and an expired certificate takes a working product completely offline behind a frightening browser warning.",
              "Then the parts that only break in production. A form with nowhere to send anything, because email from a new domain with no authentication records lands in spam. Links that point at the old host. Cookies scoped to the wrong domain, so signing in works and then immediately does not. None of these appear on your laptop.",
            ],
            points: [
              {
                term: "A and CNAME",
                def: "Where the name points. Your host tells you exactly which to add. Getting this wrong shows a parking page, not an error.",
              },
              {
                term: "TTL",
                def: "How long the answer is cached. Set it low while you are changing things and raise it after.",
              },
              {
                term: "SPF, DKIM and DMARC",
                def: "TXT records that prove your mail is really yours. Without them your form emails go to spam and you conclude nobody used the product.",
              },
              {
                term: "Certificate expiry",
                def: "A date on which your working product stops working. Automated in most hosts, and worth confirming rather than assuming.",
              },
            ],
          },
          case: {
            brand: "Microsoft Teams",
            year: "2020",
            situation:
              "On 3 February 2020 Microsoft Teams stopped working worldwide for several hours, at the start of a working day for millions of people.",
            what: "Microsoft's status updates attributed it to an authentication certificate that had not been renewed. Nothing was wrong with the code, the servers or the network. A date passed.",
            lesson:
              "The infrastructure that never needs attention is the infrastructure that takes you offline. If a working product can stop working because of a calendar date, that date belongs in a calendar.",
            sources: [
              {
                label: "Microsoft Teams goes down after Microsoft forgot to renew a certificate, The Verge",
                url: "https://www.theverge.com/2020/2/3/21121808/microsoft-teams-down-outage-certificate-issue-status",
              },
            ],
          },
          ai: {
            move: "Paste your host's instructions and your registrar's DNS panel fields together and have a model tell you exactly which record type, name and value to enter in which box.",
            trap: "It gives you a generic set of records that is correct for the average host and wrong for yours, most often on the root domain, where some hosts need an A record and others need a special kind of CNAME. It also cannot see whether the change worked. Verify with a lookup tool rather than by asking whether it should work.",
          },
          build: {
            artefact:
              "Your product live on a real domain, over https, with a working form and a launch checklist.",
            steps: [
              { do: "Buy the domain. Point it at your host using exactly the records your host specifies." },
              { do: "Confirm https is issued and that the plain http address redirects to it." },
              {
                do: "Send a real email from the product to three different providers, including a work address.",
                hint: "Check the spam folder in each. If it landed there, add the authentication records your email provider gives you and try again.",
              },
              { do: "Open the live site on a phone, on mobile data, logged out, and complete the whole job." },
              { do: "Write the launch checklist: certificate expiry date, spending limits, who to contact when it breaks, and where the logs are." },
            ],
            tools: ["A registrar", "Your host's domain settings", "A DNS lookup tool", "Resend or Postmark"],
          },
          solution: {
            summary:
              "Four checks catch almost everything, and the email one is the one people skip and then blame on lack of interest.",
            walkthrough: [
              "Check the name resolves to your host and not to the registrar's parking page. A lookup tool answers this in five seconds and your browser cache does not.",
              "Check https on both the bare domain and the www version. One of the two is usually forgotten and someone will type it.",
              "Check the form end to end from a phone on mobile data, because your laptop may still be resolving the old address.",
              "Check email delivery to three providers. Consumer mail is stricter than work mail on new domains, and a form with nowhere to send anything looks exactly like a product nobody wanted.",
              "Then write down the certificate expiry date and set a reminder for a week before it. That one line is the whole lesson.",
            ],
          },
          check: [
            "Does the bare domain and the www version both work over https?",
            "Did your test email reach the inbox at three different providers?",
            "What is your certificate expiry date, and where is that written down?",
          ],
        },

        {
          slug: "first-ten-users",
          title: "Ten real people",
          kind: "Workshop",
          minutes: 70,
          hook: "It is live, it is instrumented, and nobody is coming. A product with no users is a screenshot with a domain name.",
          explain: {
            title: "Go where they already are",
            body: [
              "Ten users are recruited by hand, one at a time, in places where the people who have this problem are already talking about it. A named subreddit, a specific Discord, a WhatsApp group, the comments under someone else's post about the same problem. Not a launch announcement into your own timeline, which reaches people who like you rather than people who have the problem.",
              "Do not send a link and hope. Ask one person a question about the problem, and offer the thing only if their answer says they have it. Then watch at least five of them use it, live, without helping. Every instinct you have will be to explain the interface. The moment you explain it, you have destroyed the only data in the room.",
              "Ten engaged beats a thousand curious. A spike of visitors who never return tells you nothing except that a headline worked. Ten people you can name, who came back on day seven, tells you whether the thing is real.",
            ],
            points: [
              {
                term: "Named rooms",
                def: "Five specific communities, with names and links. Categories such as fintech founders are not places.",
              },
              {
                term: "Ask before you pitch",
                def: "One question about the problem. If the answer is not clearly yes, they are not one of your ten.",
              },
              {
                term: "Watch, do not narrate",
                def: "Say nothing for the first two minutes. The silence is where the finding is.",
              },
            ],
          },
          case: {
            brand: "Stripe",
            situation:
              "The Collison brothers needed developers to try an unproven payments API when established alternatives already existed.",
            what: "Rather than sending a signup link, when someone expressed mild interest they would ask for the person's laptop and set it up for them on the spot. Paul Graham describes this practice in Do Things That Don't Scale as the Collison installation. It did not scale and was not meant to. It got the first users and it showed the founders exactly which parts of setup were confusing.",
            lesson:
              "Manual recruitment is not a phase you tolerate before real growth. It is the highest information work available to you, and it is only available while you are small.",
            sources: [
              { label: "Do Things That Don't Scale, Paul Graham", url: "https://paulgraham.com/ds.html" },
            ],
          },
          ai: {
            move: "Use a model to find the specific communities where your users already gather, including ones you have never heard of, and to draft the outreach. Then rewrite every word of the message yourself.",
            trap: "AI drafted outreach is recognisable in the first line and gets you removed from exactly the communities you need, permanently. The tells are an opening compliment about the community, a tidy three part structure, and the phrase I would love to. Use it to find the rooms and to check your own message for those tells, not to write it.",
            prompt:
              "Find specific named online communities where people who have [this problem] already talk about it. For each: the name, the link, roughly how active it is, and its rules on self promotion. Do not write me a message.",
          },
          build: {
            artefact:
              "Ten real users on your live product, five watched sessions, and the fixes that came out of them.",
            steps: [
              { do: "List five named communities with links, and read the self promotion rules of each before you post anything." },
              { do: "Recruit ten people by hand. Write every message yourself, one at a time." },
              {
                do: "Watch five of them use it live. Say nothing for the first two minutes.",
                hint: "Ask them to narrate what they expect to happen before each click. The gap between expectation and result is the entire finding.",
              },
              { do: "Write down every point of confusion with the timestamp and the exact words they used." },
              { do: "Fix the top two blockers and tell all ten people you fixed them. That message is why they come back." },
            ],
          },
          check: [
            "Which five named communities, and what were their rules?",
            "What broke that you were certain would not?",
            "Did you stay silent for the first two minutes, honestly?",
          ],
        },

        {
          slug: "what-the-ten-did",
          title: "Reading what the ten actually did",
          kind: "Drill",
          minutes: 50,
          hook: "All ten said it was useful. Your events say four of them finished the job once and one of them came back. Both of those are true and only one of them is information.",
          explain: {
            title: "Behaviour beats sentiment, at every sample size",
            body: [
              "People are kind, especially to someone who built something and asked them to look at it. Sentiment from ten friendly users is close to worthless. What they did is not: it is recorded, it is not polite, and you designed the events for exactly this a chapter ago.",
              "With ten users you count individuals, never percentages. Four of ten is four people, and you can name them. A percentage on ten is a lie with a decimal point in it. Build the table by hand: one row per person, one column per step of your funnel, and mark where each one stopped. That table is more useful than any dashboard you could build at this size.",
              "Then read the shape over time. Did anyone come back without being asked? A single unprompted return is the strongest signal available at this scale, worth more than nine compliments, because it is the only thing that cannot be produced by politeness.",
            ],
            diagram: "retention-curve",
            caption:
              "At ten users you cannot plot this yet. You can name the people on it, which is better.",
            points: [
              {
                term: "Count people, not percentages",
                def: "Under a hundred users, report the raw number and the names. Percentages invent precision you do not have.",
              },
              {
                term: "The unprompted return",
                def: "Someone came back without a message from you. The single most valuable event in your log at this stage.",
              },
              {
                term: "Said versus did",
                def: "Put both columns in your table side by side. The rows where they disagree are the interesting ones.",
              },
            ],
          },
          case: {
            brand: "Buffer",
            year: "2010",
            situation:
              "Joel Gascoigne wanted to know whether anyone would pay for a tool that scheduled social posts, before building it.",
            what: "He put up a two page site. The first page explained the idea with a button to try it. The button led to a page saying the product was not ready, with a field to leave an email. Only when people clicked through, and specifically when they clicked through the pricing page he added next, did he start building. He has written the sequence up publicly, including the numbers.",
            lesson:
              "The click is the data. Asking people whether they would use something gets you a polite yes from everyone, including the ones who would never open it again.",
            sources: [
              {
                label: "Idea to paying customers in 7 weeks, Buffer",
                url: "https://buffer.com/resources/idea-to-paying-customers-in-7-weeks-how-we-did-it/",
              },
            ],
          },
          ai: {
            move: "Paste your raw event log and ask for one row per user, in order, with the time between their steps, so you can read ten stories rather than one aggregate.",
            trap: "Give it ten users and it will hand you percentages, averages and a confident conclusion, because that is the shape of an analysis. Forty percent conversion from a sample of ten is a sentence that will follow you into a board meeting. Instruct it to report counts only, and to state explicitly where the sample is too small to support a claim.",
            prompt:
              "Here is a raw event log for 10 users. Produce one row per user in a table: their steps in order with timestamps, where they stopped, and whether they returned on a later day. Report counts only. Do not compute percentages, averages or rates, and do not draw conclusions about the population.",
          },
          build: {
            artefact:
              "A week one readout: ten named rows, what each did, and the two things you changed.",
            steps: [
              { do: "Export your events. One row per user, one column per funnel step." },
              { do: "Mark where each person stopped, and how long they spent before stopping." },
              {
                do: "Add a said column next to the did column for each person.",
                hint: "The rows where a warm compliment sits next to an abandoned first step are the rows to reread. That gap is usually one specific confusing screen.",
              },
              { do: "Count returns. Name anyone who came back unprompted, and message them to ask what brought them back." },
              { do: "Write the readout in one page: what they did, where they dropped, the two things you changed, and what you would need to see to keep going." },
            ],
            tools: ["Your analytics tool", "Google Sheets"],
          },
          solution: {
            summary:
              "The readout that is worth writing has three parts and no percentages: what happened, what you changed, and what would make you stop.",
            walkthrough: [
              "Line one is the count that matters: how many of the ten completed the job, and how many came back without prompting.",
              "Then the drop. With ten rows you can usually see the exact step, and frequently the exact screen, where people stopped.",
              "Then the said versus did gap, quoted. One sentence from someone who praised it and never finished is more persuasive than any chart at this size.",
              "Then the two changes you made, and the date you made them.",
              "Then the honest part: what you would need to see in the next twenty users to keep going, written before you have seen them. That sentence is what separates a builder from someone in love with their product.",
            ],
            example: {
              label: "The first three lines of a week one readout",
              body: "Ten users, recruited by hand from two subreddits. Six completed the job once, two came back unprompted on day three, four never got past connecting an account. Three of the four who stalled pasted an account number into the field that expects an email, which is my label, not their mistake.",
            },
          },
          check: [
            "How many of the ten came back without being asked?",
            "Which person said it was useful and did not finish, and what did they get stuck on?",
            "What did you write down as the thing that would make you stop?",
          ],
        },
      ],
    },

    /* ================================================================ 7 */
    {
      slug: "with-a-team",
      n: "7",
      title: "Shipping with a team",
      summary:
        "Now that you have built something alone, working with engineers is a different conversation. You know what you are asking for, and you know what it costs.",
      lessons: [
        {
          slug: "estimates",
          title: "Why the estimate was wrong",
          kind: "Concept",
          minutes: 50,
          legacy: "Module 13.4. Backlogs & Sprints",
          hook: "Dev says two weeks. It takes five. Nobody lied, nobody slacked, and you have already told the founder two weeks in writing.",
          scene: {
            image: "/img/scenes/office-wide.webp",
            alt: "A sprint board with more cards in the in-progress column than in done.",
            caption: "End of sprint. Four cards moved, nine did not.",
            notes: [
              {
                from: "Dev, engineering lead",
                text: "The estimate was for the change. It was not for the migration the change needs, the two dependent services, or the week Priya's escalation ate. I should have said that out loud.",
              },
              {
                from: "Maya, founder",
                text: "I do not need it to be fast. I need to know when, so I can tell the customer something true.",
              },
            ],
          },
          explain: {
            title: "Estimates are wrong in one direction, always",
            body: [
              "People estimate the work they can picture. What they cannot picture is the migration, the flaky test, the second service that needs the same field, the review that sat for two days, and the support escalation that took Tuesday. So estimates are systematically short, and the error grows with the size of the task, because bigger tasks hide more of what nobody pictured.",
              "Two habits fix most of it. Break work down until every piece is two days or less, because a two day piece is small enough to have been imagined completely, and a two week piece is not. And ask for a range with the reason for the spread: two days if the provider's API does what the docs say, a week if it does not. The spread is the information, and a single number throws it away.",
              "Then track your own lead time. How long a similar change actually took, from start to a user having it, over the last five changes. That measured number beats any estimate anybody gives you, and you already collected it in chapter 2.",
            ],
            points: [
              {
                term: "The planning gap",
                def: "The difference between the work you can picture and the work there is. It is always in the same direction.",
              },
              {
                term: "The range with a reason",
                def: "Not two to five days. Two days if X, five if Y. Now you know what to go and check.",
              },
              {
                term: "Lead time",
                def: "Measured, from your own last five changes. The only number in this lesson that is not a guess.",
              },
            ],
          },
          case: {
            brand: "Sydney Opera House",
            year: "1973",
            situation:
              "Construction began in 1959 with a published estimate of about seven million Australian dollars and a completion date of 1963.",
            what: "It opened in 1973, ten years late, at a final cost of about 102 million Australian dollars. Work began before the design was finished, which meant the estimate was made against a building nobody had fully specified yet. It is the standard example in the research literature on how large projects overrun, and the pattern it illustrates is a scale, not a category: the same mechanism runs in a two week ticket.",
            lesson:
              "Estimating before the thing is specified produces a number about a thing that does not exist yet. That is what your two week estimate on a one line ticket is.",
            sources: [
              {
                label: "Sydney Opera House, our story",
                url: "https://www.sydneyoperahouse.com/our-story",
              },
            ],
          },
          ai: {
            move: "Describe the change and ask a model to list everything that usually has to happen alongside it: migrations, backfills, other services, tests, documentation, rollout and rollback. Use it as a checklist to hand to the estimator, not as the estimate.",
            trap: "Ask it how long something will take and it produces a confident number in days, from nothing. It has no knowledge of your codebase, your team, or how long code review sits in your queue, and the number will sound reasonable, which is the problem. Use it for the checklist of forgotten work. Never for the duration.",
            prompt:
              "Here is a change we are planning. List everything that typically has to happen alongside a change like this and is routinely forgotten in estimates: data migrations, backfills, other consumers of the same field, tests, feature flags, rollout, rollback, docs, support comms. Do not estimate any durations.",
          },
          build: {
            artefact:
              "A re-estimate of a real piece of work, broken to two day pieces, with a range and a reason.",
            steps: [
              { do: "Take a real estimate your team gave recently. Write down what actually happened, in days." },
              { do: "Break the same work into pieces of two days or less. Count how many pieces the original estimate did not include." },
              {
                do: "Run the forgotten work checklist over it and add what is missing.",
                hint: "The most commonly missing item is not engineering. It is the review, the deploy window, and the person being on leave.",
              },
              { do: "Rewrite it as a range with the reason for the spread." },
              { do: "Compute your team's actual lead time from the last five shipped changes and compare it to what people say." },
            ],
            tools: ["Your issue tracker", "Google Sheets"],
          },
          check: [
            "How many pieces did the original estimate not include?",
            "What is your team's measured lead time for a change of this size?",
            "What is the specific thing that decides which end of your range you land on?",
          ],
        },

        {
          slug: "sprints-and-standups",
          title: "What the sprint is actually for",
          kind: "Case study",
          minutes: 45,
          legacy: "Module 13.4. Backlogs & Sprints",
          hook: "Standup takes twenty five minutes, everyone reports status to you, and nothing is unblocked. It has been like this for a year and everyone assumes it is how software is made.",
          explain: {
            title: "A cadence exists to force a decision",
            body: [
              "A sprint is a fixed period after which you look at what is real and decide again. That is the whole mechanism. The value is not in the ceremony, the points or the burndown chart, it is that on a known date you are forced to see what actually shipped and choose what happens next with that information.",
              "Standup is for surfacing blockers, not for reporting status to a product manager. If it is a status round, it is a meeting that could be a message, and the tell is that people speak to you rather than to each other. Retro is for changing one thing. A retro that produces five actions produces zero, because nobody owns five.",
              "The failure mode you should watch for is a roadmap of features with dates rather than outcomes with bets. A feature roadmap makes you accountable for shipping the thing, which you can do while the number does not move. An outcome roadmap makes you accountable for the number, which is harder and is the job.",
            ],
            diagram: "roadmap-outcome",
            caption:
              "The same quarter written twice. Only one of them can be wrong, which is why it is the useful one.",
            points: [
              {
                term: "The cadence",
                def: "A fixed date on which reality is inspected. Any length works. Not inspecting is what fails.",
              },
              {
                term: "Blocker, not status",
                def: "Standup answers one question: what is stopping anyone. Status belongs in the tracker.",
              },
              {
                term: "One retro action",
                def: "One change, one owner, checked at the next retro. Five actions is a wish list.",
              },
            ],
          },
          case: {
            brand: "Takeuchi and Nonaka, Harvard Business Review",
            year: "1986",
            situation:
              "Two researchers studied how companies including Honda, Canon and Fuji-Xerox developed new products faster than their competitors.",
            what: "They described teams that worked in overlapping phases rather than a relay of handoffs between specialist departments, with self organising teams and management setting direction rather than assigning tasks. They borrowed a rugby metaphor, the scrum, for the overlapping formation. The software method later took the name from this paper, and took the cadence while frequently leaving behind the part about autonomy.",
            lesson:
              "The original insight was about overlapping work and self direction, not about ceremonies. If your process has the meetings and not the autonomy, you have copied the visible half.",
            sources: [
              {
                label: "The New New Product Development Game, HBR 1986",
                url: "https://hbr.org/1986/01/the-new-new-product-development-game",
              },
            ],
          },
          ai: {
            move: "Paste a week of standup notes and ask which items were blockers, which were status, and which blocker went unresolved for more than two days.",
            trap: "It will suggest a tidier process: a template, a time box, a new column. Process suggestions are cheap and it produces them endlessly, and adopting them is how a team ends up with four ceremonies and the same problem. Make it point at your evidence instead: which specific blocker sat for how long, on which day.",
          },
          build: {
            artefact:
              "One change to your team's cadence, with the evidence that it was needed.",
            steps: [
              { do: "Log one week of standups. For each item, mark blocker or status." },
              { do: "Count the ratio, and find the blocker that sat longest before anyone acted on it." },
              { do: "Rewrite your current roadmap for one quarter as outcomes with a number instead of features with dates." },
              {
                do: "Propose exactly one change, with the evidence, and get the team to agree to try it for two weeks.",
                hint: "One change with a review date gets adopted. A new process gets nodded at and quietly abandoned.",
              },
            ],
          },
          check: [
            "What is your blocker to status ratio?",
            "Which blocker sat longest, and why did nobody pick it up?",
            "Can your outcome roadmap be wrong? If not, it is still a feature list.",
          ],
        },

        {
          slug: "the-date-slipped",
          title: "The date slipped. What you say.",
          kind: "Simulation",
          minutes: 45,
          hook: "It will not be ready Thursday. Sales has told two customers. You have known for four days and said nothing, which is now the bigger problem.",
          explain: {
            title: "Early, specific, and with a decision attached",
            body: [
              "The damage from a slipped date is mostly a function of notice. Four weeks warning is a planning problem. Four hours warning is a trust problem, and trust is the thing you spend on everything else. So the moment you believe the date is at risk, you say so, even though at that moment you are not certain, and being uncertain is not a reason to wait.",
              "Say four things and nothing else. What will not be ready. The new date, with the reason for the spread. What you are doing to reduce the impact, which is usually a smaller version of the thing on the original date. And what you will do differently, which is the only sentence in the message that buys back credibility.",
              "Never explain by listing everyone who let you down. It reads as a defence, it is remembered, and it does not answer the question anyone has, which is when. And never repeat a date that you know is optimistic to end the conversation faster, because you will have this exact conversation again in two weeks with less credit.",
            ],
            points: [
              {
                term: "Notice is the variable",
                def: "The same slip is a planning problem with four weeks of warning and a trust problem with four hours.",
              },
              {
                term: "The reduced version",
                def: "What you can put in front of users on the original date, even if it is manual. Frequently more valuable than the full thing two weeks later.",
              },
              {
                term: "The one change",
                def: "The specific thing you will do differently. Not we will improve estimation. Something a person could check.",
              },
            ],
          },
          case: {
            brand: "HealthCare.gov",
            year: "2013",
            situation:
              "The US federal health insurance exchange had a launch date fixed by statute: 1 October 2013. Requirements changed late, testing was compressed, and the date did not move.",
            what: "On the first day the site was effectively unusable and, according to internal notes released to Congress, only a handful of people completed enrolment. A recovery team was brought in and the site was substantially working within about two months. Subsequent GAO reporting documented the oversight and contract management failures, and the fixed date driving compressed testing is the thread running through them.",
            lesson:
              "A date that cannot move converts every problem into a quality problem. If you cannot move the date, the only lever left is scope, and refusing to pull it is a decision even when nobody says it out loud.",
            sources: [
              {
                label: "GAO, HealthCare.gov: ineffective planning and oversight practices",
                url: "https://www.gao.gov/products/gao-14-694",
              },
            ],
          },
          ai: {
            move: "Draft the message, then have a model flag every sentence that assigns blame, hedges, or fails to give a date, and rewrite each one.",
            trap: "Asked to make bad news sound better, it produces corporate padding: we are working hard to ensure, we remain committed to delivering. It reads as evasion to anyone senior and it makes a two sentence message four paragraphs. Ask it to cut, not to soften, and cap the length before you start.",
            prompt:
              "Here is my message about a slipped date. Flag every sentence that assigns blame, hedges without giving a date, or could be deleted without losing information. Do not soften anything and do not add reassurance. The final version must be under 120 words.",
          },
          build: {
            artefact:
              "The slip message, sent for real or reviewed by a real manager, plus the reduced scope option.",
            steps: [
              { do: "Write what will not be ready, in one sentence, with no context in front of it." },
              { do: "Write the new date as a range with the reason for the spread." },
              {
                do: "Design the reduced version that could land on the original date.",
                hint: "Manual is allowed. Ten customers served by hand on the promised date beats a clean automated launch two weeks late, almost every time.",
              },
              { do: "Write the one specific thing you will do differently next time." },
              { do: "Run the blame and hedge pass, cut to under 120 words, and send it." },
            ],
          },
          solution: {
            summary:
              "The message is four sentences. Anything longer is either an apology nobody asked for or a defence nobody believes.",
            walkthrough: [
              "Sentence one names the thing and the fact: the export feature will not be ready on the 14th.",
              "Sentence two gives the new date and the spread: the 28th if the provider sandbox behaves, the 4th if we have to build the fallback path.",
              "Sentence three gives them something on the original date: on the 14th we will run exports manually for the four customers who asked, same output, same day.",
              "Sentence four is the change: I am going to give you a range with a reason from now on instead of a single date, starting with this one.",
              "Then stop. The urge to add a paragraph of context is the urge to be understood, and it is not what the reader needs from this message.",
            ],
            example: {
              label: "The whole message",
              body: "Export will not be ready on the 14th. New date is the 28th if the provider sandbox works as documented, the 4th if we need the fallback path, and I will know which by Tuesday. On the 14th we will run exports by hand for the four customers who asked, same output. From now on I will give you a range and the reason for the spread rather than a single date.",
            },
          },
          check: [
            "How many days did you know before you said something?",
            "Does your message give a date and a reason for the spread?",
            "What can you put in front of users on the original date?",
          ],
        },
      ],
    },
  ],
};
