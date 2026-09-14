import type { Level } from "./types";

/**
 * LEVEL 06. Principal
 *
 * Rebuilt from the original modules 9 (Roadmaps), 10 (Experimentation),
 * 19 (Launching), 20 (Analysing & Sharing Results), 22 (Legal & Ethical),
 * 11 (Professional Persona) and 24 (Careers).
 *
 * Two halves. Shipping at scale, then turning five levels of artefacts into
 * a career. The last level, so everything built earlier is treated as
 * material rather than as homework.
 */
export const l06: Level = {
  slug: "06",
  n: "06",
  rank: "Principal",
  badge: "Certified AI Product Manager",
  title: "Launch, Growth & Your Career",
  promise:
    "Get it in front of people, tell the difference between a win and noise, and turn everything you have built into a job.",
  arc: "The assistant you built in Level 05 works. Sona now has to put it in front of 60,000 people without breaking the ones who already pay, and you have to be able to say afterwards whether it worked. Then, in the second half of the level, you leave the building. Six capstones, a live product and a hiring manager who will give you ninety seconds.",
  scene: {
    image: "/scenes/office-wide.webp",
    alt: "The Sona office in launch week: two monitors showing dashboards, a whiteboard with a rollout ladder drawn on it.",
    caption: "Launch week. The whiteboard says 1, 10, 50, everyone.",
  },
  who: "You can discover, design, build and ship. You now need to launch it in public, read the result honestly, and be hired for it.",
  outcomes: [
    "Publish a roadmap made of outcomes, and a not doing list that survives contact with sales",
    "Run a staged rollout with kill criteria written before you are emotionally invested",
    "Say “this did not work” out loud when the chart looks like a win, and prove it",
    "Design one growth loop and price the thing it feeds",
    "Turn six capstones into a portfolio, a case study and a five minute answer that ends an interview in your favour",
  ],
  capstone: {
    title: "The full case",
    body: "Everything from all six levels, packaged as a portfolio a hiring manager will actually read. The live product, the strategy behind it, the decisions and what they cost, the numbers after launch including the ones that went the wrong way, and the five minute version you can tell without notes.",
    ship: [
      "A public portfolio page linking a working artefact from every level",
      "One case study written to the format in chapter 7, with real numbers and one thing you got wrong",
      "A recorded five minute walkthrough, second take",
      "A CV and profile rewritten around shipped work rather than responsibilities",
    ],
  },

  chapters: [
    /* ================================================================ 1 */
    {
      slug: "roadmap",
      n: "1",
      title: "Roadmaps, bets and saying no",
      summary:
        "A roadmap is mostly a list of things you are not doing. This chapter is how to write that list so it holds for a quarter.",
      lessons: [
        {
          slug: "outcome-roadmap",
          title: "A roadmap made of outcomes",
          kind: "Build",
          minutes: 55,
          legacy: "Module 9.1, Roadmaps",
          hook: "Sales has a spreadsheet of 61 features promised to named customers. Maya wants the roadmap on one slide by Thursday because the board deck is due. Every version you draw is a list of dates that will be wrong by March.",
          scene: {
            image: "/scenes/office-wide.webp",
            alt: "The Sona office with a whiteboard showing three columns and a row of sticky notes below them.",
            caption: "Thursday, 9am. Three columns on the board and nothing in them yet.",
            notes: [
              {
                from: "Maya, founder",
                text: "Board deck Monday. I need one slide showing what we are doing for the next two quarters. Please do not send me the spreadsheet again.",
              },
              {
                from: "Dev, engineering lead",
                text: "Whatever goes on that slide, four people can build it. Not nine. Last roadmap had nine people's worth of work on it and we shipped a third of it.",
              },
              {
                from: "Ana, data",
                text: "Onboarding completion is 38 percent. Week 2 retention is 21 percent. If you want baselines for anything else, ask me today, I am out from Friday.",
              },
            ],
          },
          explain: {
            title: "Commit to the outcome, hold the solution loosely",
            body: [
              "A feature roadmap is a list of solutions with dates attached. It reads as a plan and behaves as a promise, and it stops being true the first time you learn something. Then you either break the promise or you build the wrong thing on schedule.",
              "An outcome roadmap says what you intend to change and by how much. “Onboarding completion 38 percent to 60 percent by end of Q2” commits you to the thing that matters while leaving the team free to find out what actually moves it. If a better solution appears in week four you take it, and the roadmap is still correct.",
              "The part everyone skips is confidence. Put a band next to each outcome: high means you know the mechanism and have evidence, medium means you know the problem and are guessing at the fix, low means you are exploring. A roadmap with three high confidence rows and six low confidence ones is an honest document. A roadmap where everything is committed is a work of fiction that someone will hold you to.",
            ],
            diagram: "roadmap-outcome",
            caption:
              "Same quarter, two documents. Only one of them is still true in March.",
            points: [
              {
                term: "Outcome",
                def: "The change in the world, with a number and a baseline. Not the thing you will build.",
              },
              {
                term: "Confidence band",
                def: "High, medium or low. Says how much of this is knowledge and how much is hope.",
              },
              {
                term: "Not doing",
                def: "The named requests you are declining this quarter, each with a reason. The most reused section of the document.",
              },
            ],
          },
          case: {
            brand: "ProdPad and the now, next, later roadmap",
            year: "2013",
            situation:
              "Janna Bastow was building roadmapping software and watching customers produce timeline roadmaps with quarterly Gantt bars that nobody believed, including the people who drew them.",
            what: "ProdPad replaced the timeline with three columns: now, next and later. The further right a card sits, the less detail it carries and the less anyone pretends to know. It removed the fake precision of a date on something nobody has scoped, and it survived because you can reorder a column without renegotiating a commitment.",
            lesson:
              "Precision that you do not have is not neutral. A date on an unscoped item reads to everyone else as a promise, and you pay for it later.",
            sources: [
              {
                label: "Why I invented the now, next, later roadmap",
                url: "https://www.prodpad.com/blog/invented-now-next-later-roadmap/",
              },
            ],
          },
          ai: {
            move: "Paste the 61 row feature spreadsheet in and ask the model to restate each row as the outcome it is meant to produce, plus the number that would prove it happened. Rows that collapse into the same outcome are the same bet wearing different names.",
            trap: "It will invent target numbers. You will get “increase retention by 15 percent” for a product it has never seen, phrased with total confidence and no baseline. Strip every target that does not attach to a number Ana can actually pull today, and go and get the baseline before you write the target.",
            prompt:
              "For each row below return JSON: {feature, implied_outcome, metric_name, baseline_needed}. Do not invent a target value. Where the outcome is unclear from the row, set implied_outcome to UNKNOWN rather than guessing.",
          },
          build: {
            artefact:
              "A one page outcome roadmap: three to five outcomes with baselines, targets and confidence bands, plus a not doing list.",
            steps: [
              {
                do: "Collapse the feature list into candidate outcomes. Aim for under eight. Anything that will not collapse is probably a real separate bet.",
              },
              {
                do: "For each outcome, write the metric, today's number, and the target. Get the baseline from data rather than memory.",
                hint: "No baseline, no target. An outcome with a target and no baseline cannot be judged, which is usually why it got written that way.",
              },
              {
                do: "Add a confidence band to each. Justify every high in one sentence, or drop it to medium.",
              },
              {
                do: "Write the not doing list. Name at least five requests you are declining, each with a one line reason and, where it exists, the condition that would change the answer.",
              },
              {
                do: "Sanity check capacity against Dev's number. If the committed rows need more people than exist, cut rows rather than shrinking estimates.",
              },
            ],
            tools: ["Google Sheets", "Notion or a doc"],
          },
          solution: {
            summary:
              "Sixty one features collapse into five outcomes, two of which are the same bet, and the capacity check kills one of the survivors.",
            walkthrough: [
              "Cluster by the change each row is trying to produce, not by the surface. “Bank connect retry”, “clearer error copy” and “support live chat during connect” are all one outcome: get more people through account connection.",
              "You end up with roughly five: onboarding completion, connection success, week 2 retention, support ticket volume, and enterprise export. The last one has one customer behind it and no baseline.",
              "Write baselines from Ana's numbers. Onboarding completion 38 percent, week 2 retention 21 percent. Two of the five have no baseline at all, which is itself the finding.",
              "Confidence: onboarding completion is high, because Level 01 evidence names the exact step. Retention is medium, you know it is bad and not why. Export is low.",
              "Capacity: four engineers cannot commit to three high confidence outcomes plus exploration. The export row moves to later, with the customer named so nobody pretends it was forgotten.",
            ],
            example: {
              label: "One row of a roadmap that survived a re-org",
              body: "NOW. Onboarding completion 38 percent to 55 percent by 30 June. Baseline from Ana's funnel query on 3 April. High confidence: 88 of 200 reviews and the funnel both point at verification expiry. Owner: you. Not committing to a specific fix yet, the team picks it in week one.",
            },
          },
          check: [
            "Does every row have a baseline you can point at, or did you write a target on a guess?",
            "How many rows are high confidence, and could you defend each one with a specific piece of evidence?",
            "Which named request is on the not doing list, and what would change your answer?",
          ],
          references: [
            {
              label: "ProdPad, what a now next later roadmap is",
              url: "https://www.prodpad.com/glossary/now-next-later-roadmap/",
            },
          ],
        },

        {
          slug: "prioritisation",
          title: "Betting the quarter",
          kind: "Drill",
          minutes: 55,
          legacy: "Module 9.2, Prioritization",
          hook: "Five outcomes, four engineers, twelve weeks. Maya wants all five and has said so in front of the team, which means saying no now costs more than it did an hour ago.",
          explain: {
            title: "A quarter is a portfolio of bets, not a queue",
            body: [
              "RICE is reach times impact times confidence, divided by effort. You met it in Level 01 on single problems. At quarter scale it does something different: it forces you to compare a large bet for a few users against a small one for many, using the same arithmetic, in front of people who each want a different answer.",
              "Confidence is still the honest column and it is still the one that gets faked. The tell is a sheet where every row is 80 percent or higher. Real confidence at the start of a quarter is a spread, and the spread is the useful information, because it tells you which bets need a week of discovery before they need engineers.",
              "Add one column the classic model leaves out: cost of delay. Some outcomes get cheaper to fix later and some get more expensive. A compliance deadline, a contract renewal date, a competitor shipping the same thing: these change the answer without changing reach or impact, and if you do not write them down someone will produce them in the meeting as a trump card.",
            ],
            diagram: "rice",
            caption:
              "The biggest reach loses, because nobody can defend the confidence score behind it.",
            points: [
              {
                term: "Reach",
                def: "How many people this touches in a defined period. Use a real count from a real query.",
              },
              {
                term: "Confidence",
                def: "How much of the score is evidence and how much is hope. The only column that costs you something to fill in honestly.",
              },
              {
                term: "Cost of delay",
                def: "What it costs to do this next quarter instead of this one. Often zero, occasionally enormous.",
              },
            ],
          },
          case: {
            brand: "Intercom and RICE",
            year: "2016",
            situation:
              "Intercom's product team needed a way to compare a large project benefiting a few customers against a small one benefiting many, without the loudest advocate winning by default.",
            what: "They published RICE, and the column that did the work turned out to be confidence. It gave the team a legitimate way to say “this might be great and we do not know yet”, which moved those ideas into a week of discovery instead of a quarter of engineering.",
            lesson:
              "A scoring framework does not make the decision. It moves the argument from which idea is best, which nobody can settle, to which number is wrong, which two people can actually resolve.",
            sources: [
              {
                label: "Intercom, RICE: simple prioritization for product managers",
                url: "https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/",
              },
            ],
          },
          ai: {
            move: "Build the sheet yourself, then hand the model the sheet and your evidence log from Level 02 and ask which confidence scores the evidence does not support.",
            trap: "Give it the sheet with no instruction and it will do arithmetic on your numbers and congratulate you on the ranking. It has no way to know that your reach figure for the enterprise outcome is one customer. Make it attack the inputs, never compute the output, and do the multiplication yourself in the sheet.",
            prompt:
              "Here is a scoring sheet and the evidence behind it. Do not compute or rank anything. For each row, state whether the confidence score is supported by the evidence provided, and if not, what the score should be and what evidence would justify the original.",
          },
          build: {
            artefact:
              "A scored quarter: five outcomes with reach, impact, confidence, effort and cost of delay, and a committed set that fits the team you actually have.",
            steps: [
              { do: "Score the five outcomes from your roadmap. Pull reach from a query, not from memory." },
              {
                do: "Justify every confidence score above 60 percent with a specific piece of evidence, or lower it.",
              },
              {
                do: "Add the cost of delay column. Most rows are zero. Name the ones that are not and say why.",
              },
              {
                do: "Draw the capacity line. Commit above it, explore below it, and write the number of engineer weeks each committed row assumes.",
                hint: "Reserve about 20 percent for the work you cannot see yet. Every quarter has some, and a plan with no slack fails in week five rather than week twelve.",
              },
              { do: "Recompute after the honesty pass and note which rows moved." },
            ],
            tools: ["Google Sheets"],
          },
          solution: {
            summary:
              "The honesty pass moves two rows, and the capacity line does the rest of the work.",
            walkthrough: [
              "First pass, everything scores 80 percent confidence and the assistant upsell wins on reach.",
              "Look for the evidence. The upsell reach number is every active user, but the actual reachable set is users who have connected an account, which is a third of them. Reach drops.",
              "Onboarding completion has 88 verbatim quotes and a funnel step behind it. It is the only row that survives at high confidence.",
              "Cost of delay changes exactly one row: the enterprise export has a contract renewal in September, so doing it in Q3 is fine and doing it in Q4 is not. It moves to next, not now.",
              "Capacity: four engineers, twelve weeks, minus 20 percent slack. Two committed outcomes and one discovery track. The fifth row goes on the not doing list with its reason.",
            ],
          },
          check: [
            "Which confidence score dropped when you went looking for the evidence?",
            "Did the ranking change after the honesty pass, or did you just decorate the decision you had already made?",
            "How many engineer weeks does your committed set assume, and does that number exist?",
          ],
        },

        {
          slug: "saying-no",
          title: "Saying no so it survives the person hearing it",
          kind: "Simulation",
          minutes: 45,
          hook: "The head of sales has a deal worth 14 percent of next year's revenue and one blocker: a custom report the buyer asked for in the demo. He has already told the buyer it is on the roadmap. He is not a villain and he is not lying, he is being measured on something you are not.",
          explain: {
            title: "A no that does not explain itself comes back in six weeks",
            body: [
              "There are three kinds of no and only one of them holds. “Not now” is a deferral, and the request returns next month with the same evidence and more emotion. “No because we are busy” is a capacity claim, and it dies the moment capacity changes or the requester finds someone less busy. The one that holds is “no because of this, and here is what would change my mind”.",
              "The reason has to be about the outcome, not about you. “That does not move onboarding completion, which is what this quarter is for” is arguable, checkable and impersonal. “I do not have time” invites a negotiation about your time, which you will lose.",
              "Then give something back. Not the feature, the mechanism: the date you will revisit, the evidence you would need, or the smaller thing that solves 70 percent of the real problem this week. A no with a door in it is remembered as a decision. A no with no door is remembered as an obstruction, by a person you will need next quarter.",
            ],
          },
          case: {
            brand: "WhatsApp",
            year: "2012",
            situation:
              "WhatsApp was under constant pressure, internally and from the market, to monetise through advertising, which was the default business model for consumer messaging at the time.",
            what: "They published a post, “Why we don't sell ads”, that stated the reasoning rather than the decision: ads require data collection, data collection requires knowing who you are and who you talk to, and that is the opposite of what the product is for. It made the no reusable. Anyone inside the company could apply the same argument to a new proposal without asking the founders again.",
            lesson:
              "Write the reason, not the ruling. A published reason lets other people say no on your behalf, which is the only way a no scales past you. Note the other half of the lesson: WhatsApp under Meta later did introduce advertising in parts of the app, which is what happens to any no whose owner leaves.",
            sources: [
              {
                label: "WhatsApp blog, Why we don't sell ads",
                url: "https://blog.whatsapp.com/why-we-don-t-sell-ads",
              },
            ],
          },
          ai: {
            move: "Rehearse it. Give the model the sales lead's actual incentive, the deal size, and what he has already promised the customer, then argue until you find the phrasing that he can repeat to the buyer without losing face.",
            trap: "Ask a model to write the no and it hands you a deferral in a polite jacket: “this is not on the roadmap right now, but we will revisit it next quarter”. That is not a no, it is a promise with a delay on it, and it guarantees the same conversation in six weeks. Require it to name the reason and the condition that would reverse the decision, and reject any draft where the word “revisit” is doing the work.",
            prompt:
              "You are a head of sales with a deal worth 14 percent of next year's revenue. You have already told the buyer this custom report is coming. You are measured on closed revenue this quarter, not on retention. Do not accept a deferral or a vague promise, and push back at least three times unless I give you something you can say to the buyer this week.",
          },
          build: {
            artefact:
              "A written no to a real request, plus the reusable version of the reason that other people can apply without you.",
            steps: [
              {
                do: "Take a real request from your not doing list. Write down what the requester is actually being measured on.",
              },
              {
                do: "Write the no in four sentences: the decision, the reason in terms of the outcome, the condition that would change it, and the thing you are offering instead.",
              },
              {
                do: "Run the simulation until the requester can repeat your reason back accurately, including to their customer.",
                hint: "If they cannot repeat it, it was not a reason, it was a refusal with vocabulary on it.",
              },
              {
                do: "Generalise it. Write the one line version of the reason that applies to the next ten requests of the same shape, and put it where other people can find it.",
              },
            ],
            tools: ["Claude or ChatGPT"],
          },
          solution: {
            summary:
              "The workable no separates the deal from the feature, and gives sales something to say on Monday.",
            walkthrough: [
              "Find out what the buyer actually needs. Nine times in ten a custom report is one number in a format their finance team accepts, not a reporting product.",
              "The reason: building a report builder does not move onboarding completion or retention, which is what the quarter is for, and it creates a surface we then support forever for one customer.",
              "The condition: three paying customers asking for the same export, or this one signing a contract that funds the work explicitly.",
              "The offer: a scheduled CSV export that Dev can do in two days, delivered this month, which covers the finance team's actual need.",
              "The reusable line: we do not build single customer reporting surfaces. We will ship data out in a standard format and let their tools do the reporting.",
            ],
          },
          check: [
            "Can the requester repeat your reason back correctly, in their own words?",
            "Does your no contain a condition that would reverse it, and is that condition checkable?",
            "Is your reason reusable by someone else next month without asking you?",
          ],
        },

        {
          slug: "strategy-changed",
          title: "Week three, and the strategy just changed",
          kind: "Simulation",
          minutes: 50,
          hook: "Maya comes out of a board meeting and says enterprise is the priority now. The roadmap you published nine days ago is consumer. Two engineers are mid build on onboarding. Everyone is looking at you and the honest answer is that you do not yet know what this changes.",
          explain: {
            title: "Separate what is invalidated from what merely feels invalidated",
            body: [
              "A strategy change invalidates less than the room assumes in the first hour and more than the room assumes in the first week. The immediate instinct is to stop everything, which throws away work that was still correct, or to carry on and hope, which is worse.",
              "Run three questions over every in flight item. Does the outcome still matter to somebody who pays. Does the evidence behind it still hold. Would we start this today, knowing what we now know. An item that fails the third question but passes the first two is usually worth finishing rather than abandoning, because half built things cost more to leave than to complete.",
              "Then be explicit about what stops. A re-plan that moves everything to the right and cancels nothing is not a re-plan, it is the same plan under stress, and it will fail in the same order it was going to fail before, just later. Name the thing you are killing, and name who has to be told.",
            ],
          },
          case: {
            brand: "Basecamp and the betting table",
            year: "2019",
            situation:
              "Basecamp's teams kept getting caught between shipping and replanning, because work that ran over had no natural place to stop.",
            what: "Shape Up puts work into fixed six week cycles with a fixed appetite. At the end of a cycle, nothing rolls over automatically. Every project has to be bet on again at a betting table, competing with everything else, and unfinished work is stopped by default rather than continued by default. There is a circuit breaker: if it did not ship in the cycle, it does not get an extension.",
            lesson:
              "The reason mid cycle change is so painful at most companies is that there is no scheduled moment to stop things. Build the moment and the change costs a meeting instead of a quarter.",
            sources: [
              {
                label: "Shape Up, chapter 8: the betting table",
                url: "https://basecamp.com/shapeup/2.2-chapter-08",
              },
            ],
          },
          ai: {
            move: "Draft the re-plan as three explicit options: stop now, finish then stop, or split the team. Have the model cost each one in engineer weeks and in what gets thrown away, then argue for the one you did not pick.",
            trap: "Ask for a revised plan and the model will keep every item and move the dates right. It optimises for the plan looking complete, because a plan with things missing looks like a worse answer. Ask it directly: which item is cancelled outright, and who has to be told. If the answer is none, it has rescheduled rather than re-planned.",
          },
          build: {
            artefact:
              "A one page re-plan: what continues, what stops today, what finishes then stops, and the three things you need from Maya to make it real.",
            steps: [
              {
                do: "List every in flight item with the engineer weeks already spent and the engineer weeks remaining. Sunk cost is not a reason to continue, but remaining cost is a reason to finish.",
              },
              {
                do: "Run the three questions over each. Mark each item continue, finish, or stop.",
              },
              {
                do: "Write the stop list with names attached: who promised what to whom, and who tells them.",
                hint: "Every stopped item has at least one person outside the team who is expecting it. The re-plan is not done until each of them has a named owner for the conversation.",
              },
              {
                do: "Write the three questions you need Maya to answer before the next cycle, with a date on each. A strategy change that arrives without those answers is a mood, not a strategy.",
              },
              { do: "Publish it the same day. A re-plan that lands a week later has already been overtaken by rumour." },
            ],
          },
          solution: {
            summary:
              "Of six in flight items, one stops, two finish and stop, and three continue unchanged because enterprise buyers need working onboarding too.",
            walkthrough: [
              "The verification fix continues. Enterprise users sign up through the same flow, so the outcome still matters to whoever pays. It also passes the would we start this today test.",
              "The referral loop stops today. It only makes sense for consumer growth, three days are sunk, nine remain, and nobody outside the team is waiting on it.",
              "The transaction categorisation improvement finishes. Two days remain out of eleven, and stopping now produces a half migrated data model that costs more to unwind than to complete.",
              "The stop list names one person: the growth marketer who has a campaign built around referral. You tell her yourself, today, before she hears it in standup.",
              "The three questions for Maya: which enterprise segment, what is the deadline, and does the consumer number still count this quarter. Without the third answer you cannot score anything next cycle.",
            ],
            example: {
              label: "The first paragraph of a re-plan that worked",
              body: "Enterprise is the priority from today. Three of six in flight items continue because enterprise users hit the same onboarding. One stops today: referral. Two finish this week then stop. Net effect is nine engineer days lost, not a quarter. I need three answers from you by Friday to plan the next cycle, listed at the bottom.",
            },
          },
          check: [
            "What did you cancel outright, and who did you tell?",
            "Which in flight item did you keep, and can you defend it without using the words “we already started”?",
            "What do you still need from the founder, and by when?",
          ],
        },
      ],
    },

    /* ================================================================ 2 */
    {
      slug: "launch",
      n: "2",
      title: "The launch",
      summary:
        "Shipping to everyone on a Tuesday is not a launch, it is a hope. Rollout, the checklist, the brief, and the internal launch that matters more than the external one.",
      lessons: [
        {
          slug: "rollout",
          title: "Flags, gates and the checklist behind them",
          kind: "Build",
          minutes: 70,
          legacy: "Module 19.1, Product Marketing",
          hook: "The assistant is done. Dev asks when you want it on, and you realise “on” is not one thing. Sona has 60,000 users, 900 of whom pay, and the paying ones are the least tolerant of a bad answer about their own money.",
          scene: {
            image: "/scenes/domain-fintech.webp",
            alt: "A dashboard screen showing a transaction feed and an assistant panel, with a rollout percentage control at the top.",
            caption: "The flag is at 0 percent. Everything after this is a decision about blast radius.",
            notes: [
              {
                from: "Dev, engineering lead",
                text: "Flag is in. I can move it by percentage of users or by cohort. Rolling back is instant. Rolling back a bad database migration is not, so tell me if any of this touches schema.",
              },
              {
                from: "Priya, support",
                text: "Please tell me before it goes to more than a few hundred people. Last time we found out from a ticket.",
              },
            ],
          },
          explain: {
            title: "Blast radius is a design decision, and so is the gate",
            body: [
              "A feature flag separates deploying code from releasing behaviour. The code ships dark, and you turn it on for 1 percent, then 10, then 50, then everyone. That is not caution for its own sake: at 1 percent of 60,000 users you get 600 people, which is enough to see a crash rate and nowhere near enough to make the front page.",
              "The gate between stages is the part people skip. A stage without a written check is just a slower way of shipping to everyone. Each gate needs three things: the metric you are watching, the threshold that stops you, and how long you wait before moving on. Time matters because most problems arrive on a delay, in the support queue and in day 2 retention rather than in the error rate.",
              "Kill criteria have to be written before you are emotionally invested. Once a launch is live and someone has posted about it, the number that would have stopped you on Monday becomes a number you explain away on Thursday. Write them down, with thresholds, and tell Dev and Priya what they are so that stopping is not solely your decision to make.",
            ],
            points: [
              {
                term: "Flag",
                def: "A switch that turns behaviour on for a chosen set of users. Deploy is not release.",
              },
              {
                term: "Gate",
                def: "A named metric, a threshold and a wait time between two stages. No gate, no stage.",
              },
              {
                term: "Kill criterion",
                def: "The number at which you turn it off, agreed before launch by more than one person.",
              },
              {
                term: "Owner and date",
                def: "Every line of the checklist carries a name and a day. Lines without them do not happen.",
              },
            ],
          },
          case: {
            brand: "Flickr",
            year: "2009",
            situation:
              "Flickr's engineering team was deploying to production many times a day, which is incompatible with long lived feature branches that have to be merged and tested as a lump.",
            what: "They wrote up their practice of “flipping out”: every feature ships to production behind a flag, disabled, and is turned on for staff, then a percentage, then everyone. They also kept a separate class of flag for capacity, so that expensive features could be degraded under load rather than falling over. Code is in main all the time; the switch, not the merge, is the release.",
            lesson:
              "Once release is a switch rather than a deploy, rolling back stops being a crisis and becomes a click, which is what makes staged launches practical rather than theoretical.",
            sources: [
              {
                label: "Flickr code blog, Flipping Out",
                url: "https://code.flickr.net/2009/12/02/flipping-out/",
              },
            ],
          },
          ai: {
            move: "Ask the model to generate the launch checklist from your spec, covering engineering, data, support, legal, marketing and the rollback path. It is genuinely good at remembering the categories you forget, particularly legal review and the support macro.",
            trap: "It will hand you a beautiful checklist where not one line has an owner or a date. Every item reads “ensure analytics events are verified” in the passive voice, which is a sentence that nobody has to do. Rewrite every line as name, verb, day. Any line you cannot assign is either not real or belongs to you, and both of those are findings.",
            prompt:
              "Generate a launch checklist for the feature described below. Every line must be in the form: OWNER ROLE | action in the imperative | day relative to launch (L minus 7, L minus 1, L, L plus 1). Do not produce any line in the passive voice. Flag any line where the owner role is ambiguous rather than guessing.",
          },
          build: {
            artefact:
              "A staged rollout plan with gates and kill criteria, plus a launch checklist where every line has a name and a date.",
            steps: [
              {
                do: "Write the stages. Start with internal staff only, then 1 percent, 10, 50, 100, and say how many real users each stage is.",
              },
              {
                do: "For each gate, write the metric, the threshold and the wait time. At least one gate must be a support metric rather than an engineering one.",
                hint: "Error rate tells you the code works. Tickets per thousand users tells you the product works. They fail at different stages.",
              },
              {
                do: "Write the kill criteria with numbers, and get Dev and Priya to agree to them in writing before launch day.",
              },
              {
                do: "Generate the checklist, then rewrite every line as owner, action, date. Delete any line nobody will own.",
              },
              {
                do: "Write the rollback runbook: who can flip the flag, how long it takes to take effect, and what state users are left in if they were mid interaction.",
              },
            ],
            tools: ["PostHog, LaunchDarkly or a config flag", "A shared doc"],
          },
          solution: {
            summary:
              "Five stages, four gates, and the gate that catches the real problem is the support one at 10 percent.",
            walkthrough: [
              "Stage 0 is staff only, 40 people, for two days. This catches the embarrassing things, not the statistical ones.",
              "Stage 1 is 1 percent, 600 users, for 48 hours. Gate: crash free sessions above 99.5 percent and no increase in failed bank syncs. Two days rather than two hours, because the assistant is used weekly rather than hourly and a two hour window sees almost nobody.",
              "Stage 2 is 10 percent, 6,000 users, for a week. Gate is tickets per thousand users, which must not rise by more than 20 percent against the previous week. This is the gate that fires in practice, because the assistant answers confidently and wrongly about pending transactions and people write in.",
              "Stage 3 is 50 percent for a week with a retention gate, then 100 percent. Kill criterion throughout: any incident involving a wrong balance shown to a user stops the rollout immediately, at any stage, no discussion.",
              "The rollback runbook says Dev or you can flip it, it takes effect within 60 seconds, and in flight conversations are preserved read only rather than disappearing, because a vanished conversation generates more tickets than a disabled feature.",
            ],
            example: {
              label: "Three lines of a checklist that works",
              body: "Ana | verify assistant_message_sent and assistant_answer_rated arrive in the warehouse with correct user ids | L minus 5. Priya | publish the three support macros and the escalation path to the team channel | L minus 2. You | confirm kill criteria in writing with Dev and Priya | L minus 3.",
            },
          },
          check: [
            "Does every checklist line have a name and a day on it?",
            "What is your support gate, and at which stage does it apply?",
            "Who other than you can stop the rollout, and do they know it?",
          ],
        },

        {
          slug: "gtm-brief",
          title: "The go to market brief, and what marketing needs from you",
          kind: "Build",
          minutes: 55,
          legacy: "Module 19.1, Product Marketing",
          hook: "Marketing asks for “the messaging” on Tuesday for a launch on Friday. You send them the PRD. They send back copy that describes a feature you are not shipping, and they are right to, because the PRD does not say what this is for.",
          explain: {
            title: "The brief is what you owe them, and it is short",
            body: [
              "Marketing does not need your spec. They need six things: who this is for, what it replaces, the one sentence claim, the proof for that claim, what it does not do, and the date. If you supply those, the copy writes itself and it will be accurate. If you supply a spec, someone in marketing will infer the claim from a feature list, and the inference will be more generous than the truth.",
              "Lead times are the part product managers get wrong. Marketing needs the claim about three weeks out because assets and scheduling take that long. Support needs the FAQ and the macros about a week out. Sales needs pricing and packaging before they need anything else, because they cannot talk about something they cannot quote. Legal, if you are in a regulated space, needs the claim in writing early enough to say no to it.",
              "The single most valuable line in the brief is the one that says what this does not do. It is what stops marketing writing a promise your product will break, and it is the line that saves Priya from a queue of people who expected something else.",
            ],
            diagram: "prd-anatomy",
            caption:
              "The keep column is the brief. The cut column is the reason your last document went unread.",
            points: [
              {
                term: "The claim",
                def: "One sentence a customer would repeat. Not a feature list, and not an adjective.",
              },
              {
                term: "The proof",
                def: "The number, quote or demo that makes the claim checkable. Legal will ask for this specifically.",
              },
              {
                term: "The anti claim",
                def: "What it explicitly does not do. Protects support and keeps marketing honest.",
              },
            ],
          },
          case: {
            brand: "Gmail",
            year: "2004",
            situation:
              "Google launched a free webmail product into a market where Hotmail and Yahoo offered a few megabytes of storage, and where a new free email service was not obviously news.",
            what: "The launch was built on one claim with a number attached: a gigabyte of storage, roughly a hundred times the competition, so you never delete another message. Everything else, search instead of folders, conversation threading, was proof for that claim rather than a separate message. The invite only rollout kept load manageable while the claim spread, and it launched on 1 April, which made the number itself the story.",
            lesson:
              "One claim with a number carries a launch. A list of six features carries nothing, because the audience keeps none of them. Pick the claim first and let the feature list argue for it.",
            sources: [
              {
                label: "Google press release, Google Gets the Message, Launches Gmail",
                url: "https://googlepress.blogspot.com/2004/04/google-gets-message-launches-gmail.html",
              },
            ],
          },
          ai: {
            move: "Draft the brief with a model from your spec, your evidence log and your metric definitions, then have it write three versions of the one sentence claim at different levels of ambition and pick the one you can prove.",
            trap: "Its default claim is adjectives. You will get “a seamless, intelligent way to understand your spending”, which contains no falsifiable statement and which no user would ever repeat. Force it: the claim must contain either a number or a specific job, and it must be a sentence a real customer could say out loud to a friend. Then ask it what proof it has for the claim, and watch it fail to produce any.",
            prompt:
              "Write three candidate one sentence claims for this feature. Each must contain either a specific number or a specific user job, and must avoid the words seamless, powerful, intelligent, effortless and revolutionary. For each, list the evidence in my materials that supports it, and say plainly if there is none.",
          },
          build: {
            artefact:
              "A one page go to market brief, plus a lead time schedule showing who needs what and when.",
            steps: [
              { do: "Write the claim first, in one sentence, with a number or a job in it." },
              {
                do: "Write the proof underneath it. If your only proof is that you built it, the claim is too big.",
              },
              {
                do: "Write the anti claim. At least three things this does not do, in the words a customer would use.",
              },
              {
                do: "Fill in the audience: who this is for and, specifically, who it is not for.",
              },
              {
                do: "Build the lead time schedule backwards from launch day. Marketing at L minus 21, sales at L minus 14, support at L minus 7, legal wherever your legal team says.",
                hint: "Send the brief to all of them at once, on the same day, and ask each to reply with the one thing they still need. That reply is worth more than another meeting.",
              },
            ],
          },
          solution: {
            summary:
              "The claim shrinks twice before it is provable, and the anti claim is what makes it safe to ship in a money product.",
            walkthrough: [
              "First attempt: “Sona understands your money”. Unprovable and unrepeatable, and in a regulated context it is close to advice.",
              "Second: “Ask Sona anything about your spending”. Better, but “anything” is a promise the eval suite from Level 05 says you cannot keep.",
              "Third: “Ask Sona where your money went last month and get an answer in seconds, from your own transactions”. Specific job, checkable, and it matches what the retrieval design actually supports.",
              "Proof: the eval suite scores, and a 20 second demo on a real account. Both are things legal can look at.",
              "Anti claim: it does not give financial advice, it does not see transactions your bank has not settled, and it does not work for accounts that failed to connect. All three come straight from the support queue you will otherwise create.",
            ],
          },
          check: [
            "Does your claim contain a number or a specific job, and could a customer repeat it?",
            "What is your proof, and would a sceptical lawyer accept it?",
            "Which three things does the brief say the product does not do?",
          ],
        },

        {
          slug: "internal-launch",
          title: "The internal launch nobody runs",
          kind: "Workshop",
          minutes: 50,
          hook: "It goes to 50 percent on Monday. On Friday you ask Priya what she will say when someone writes in asking why the assistant got their rent wrong, and she says she did not know it was launching.",
          explain: {
            title: "The first users of every launch work at your company",
            body: [
              "Every external launch has an internal launch inside it, and the internal one fails more often because nobody schedules it. Support has to answer questions about a thing they have not used. Sales has to demo it. The person on call has to know what a spike in one particular error means at 2am. None of that happens because you posted in a channel.",
              "The test is specific and it is not a meeting: can somebody who did not build this give the demo, unaided, and answer the three questions a real user asks. If they cannot, the launch is not ready, regardless of what the code is doing.",
              "Support needs three things by name: the macros for the questions you know are coming, the escalation path with a named person on it, and permission to say “this is a known limitation” rather than “we are working on it”. That last one matters. A support agent who cannot admit a limitation will invent a timeline, and the timeline becomes a promise you did not make.",
            ],
          },
          case: {
            brand: "Google Wave",
            year: "2009",
            situation:
              "Google announced Wave at its developer conference to a standing ovation, released it by invitation, and generated enormous external anticipation for a product that combined email, chat and collaborative documents.",
            what: "The external launch was excellent and the internal one did not exist in any usable form. There was no simple answer to what Wave was for or who should use it, so early users arrived, could not work out what to do, and left. Google shut it down about a year after the announcement, citing user adoption that did not match the interest.",
            lesson:
              "Hype is not distribution and a demo is not an explanation. If the people closest to the product cannot say in one sentence who should use it and why, no amount of external launch will supply that sentence for them.",
            sources: [
              {
                label: "Official Google Blog, Update on Google Wave",
                url: "https://googleblog.blogspot.com/2010/08/update-on-google-wave.html",
              },
            ],
          },
          ai: {
            move: "Generate the support FAQ and the macros from your spec, your eval failures from Level 05 and your anti claim. The eval failures are the best possible source, because they are literally the list of things the product gets wrong.",
            trap: "It writes the happy path FAQ and it writes answers support is not allowed to give. You will get “we are actively working on improving this” attached to a limitation that is permanent, and a cheerful non answer for the case where the product told someone the wrong number. Feed it the eval failures explicitly and require every answer to be something a support agent could say verbatim to an angry customer without promising anything.",
          },
          build: {
            artefact:
              "An internal launch pack: a two minute demo script, three support macros, an escalation path with a name on it, and a known limitations list.",
            steps: [
              {
                do: "Write the two minute demo script. One sentence of who it is for, one live action, one thing it does not do.",
              },
              {
                do: "Take your five worst eval cases from Level 05 and write the support macro for each.",
                hint: "The macro says what happened, what the user should do now, and whether it will be fixed. Vagueness on the third one is what creates a second ticket.",
              },
              {
                do: "Write the escalation path: who gets paged for a wrong balance, who for a billing question, and what the response time is.",
              },
              {
                do: "Run the test for real. Get someone who did not build it to give the demo while two people ask hostile questions. Note every question they could not answer.",
              },
              {
                do: "Fix the pack, then send it once, in one message, with the launch date in the subject line.",
              },
            ],
          },
          check: [
            "Could a colleague who did not build this give the demo and survive three hostile questions?",
            "Which known limitation is support allowed to state plainly, and in whose words?",
            "Who is on the escalation path, and have they agreed to be?",
          ],
        },
      ],
    },

    /* ================================================================ 3 */
    {
      slug: "measure",
      n: "3",
      title: "Reading your own numbers honestly",
      summary:
        "The hardest skill in the level. Saying “this did not work” about a chart that appears to say it did.",
      lessons: [
        {
          slug: "instrumentation",
          title: "Instrument for the questions you will be asked",
          kind: "Build",
          minutes: 55,
          legacy: "Module 20.3, Google Analytics",
          hook: "It is Tuesday after launch. Maya asks four questions in one message: is anyone using it, are they the paying ones, does it make them come back, and did it break anything. You can answer one of the four.",
          explain: {
            title: "Events answer questions, and questions come in five shapes",
            body: [
              "You did a version of this in Level 01: write the question, then the event. At launch scale two things change. First, the questions are asked by other people, on their schedule, and they will not wait for a query. Second, the events have to survive versioning, because the feature will change and a dashboard that silently mixes v1 and v2 behaviour is worse than no dashboard.",
              "The five shapes are always the same. Did anyone use it. Who were they. Did they come back. Did it break. Did it move the number we said. Three of those need a user id attached to the event, one needs a timestamp you can trust across timezones, and one needs a guardrail metric you agreed before launch.",
              "The guardrail is the one people leave out. It is the metric you never want to move: crash rate, ticket volume, unsubscribes, refunds, latency at the 95th percentile. Launches fail sideways much more often than they fail forwards, and the guardrail is how you find out before a customer tells you.",
            ],
            points: [
              {
                term: "Event",
                def: "A thing that happened, with a user id, a timestamp and a version. No version, no comparability.",
              },
              {
                term: "Guardrail",
                def: "A metric you do not want to move at all. Agreed before launch, watched during it.",
              },
              {
                term: "Dashboard",
                def: "One screen, five questions, no scrolling. If it needs explaining, nobody will open it twice.",
              },
            ],
          },
          ai: {
            move: "Have the model turn your spec into an event schema with properties, then have it write the exact SQL or query for each of the five questions against that schema. Running those queries before launch is how you find out the schema does not answer them.",
            trap: "It produces an exhaustive taxonomy, every click and hover, forty events for a feature with three screens. It is optimising for coverage because coverage looks thorough. Worse, it will not notice that none of your events carry a version field, so the day you change the prompt your before and after comparison quietly becomes meaningless. Delete every event without a written question, and add the version field yourself.",
            prompt:
              "Here is my feature spec and my five launch questions. Produce the minimum event set that answers exactly those five questions and nothing else. For each event, list its properties and the question it serves. Then write the query for each question. Flag any question the schema cannot answer.",
          },
          build: {
            artefact:
              "A live tracking plan, a five question dashboard, and one guardrail metric with an alert on it.",
            steps: [
              { do: "Write the five questions in the exact words the founder would use." },
              { do: "Design the minimum event set. Add a version property to every event." },
              {
                do: "Implement on your Level 04 product and verify events actually arrive, with correct user ids, from a real device rather than a test harness.",
                hint: "Most tracking bugs are ids: logged out users, ad blockers, and a mobile client that sends a different id format. Check by finding yourself in the data.",
              },
              { do: "Build the dashboard. One screen, five answers, no scrolling." },
              { do: "Pick one guardrail metric, set the threshold, and set an alert that reaches a human." },
            ],
            tools: ["PostHog, Plausible or GA4", "SQL or the tool's query builder"],
          },
          solution: {
            summary:
              "The schema is four events, and the thing that breaks it is the id on logged out users.",
            walkthrough: [
              "Four events cover it: assistant_opened, assistant_message_sent, assistant_answer_rated, assistant_error. Everything else you were tempted to add answers no written question.",
              "Properties: user_id, plan, prompt_version, latency_ms, and for errors, error_class. Prompt version is what lets you compare next month.",
              "Question three, do they come back, needs a cohort table rather than a count. Build it once as a saved query, because you will be asked it every week for a month.",
              "The guardrail is tickets per thousand active users, not crash rate. Crash rate stays flat on this launch. Tickets do not.",
              "The bug you find during verification: anonymous users get a new id per session, so opened counts are inflated by about 8 percent. Fix it before launch, not after, because you cannot retroactively deduplicate.",
            ],
          },
          check: [
            "Can every event be tied to one of the five written questions?",
            "Does every event carry a version, and did you verify a real event from a real device?",
            "What is your guardrail, what is the threshold, and who does the alert wake up?",
          ],
        },

        {
          slug: "metric-moved",
          title: "The metric moved and the product did not",
          kind: "Teardown",
          minutes: 55,
          hook: "Weekly active users are up 19 percent since launch. Maya has already told an investor. You have a feeling about it and no evidence yet, and you have until Friday to work out whether the number is real.",
          explain: {
            title: "Three ways a number moves without the product improving",
            body: [
              "Composition. The mix of people in the denominator changed. A marketing push brings in a cohort that behaves differently, and the average moves without a single existing user changing behaviour. This is the most common one and the hardest to see, because nothing in the chart tells you the population changed underneath it.",
              "Measurement. Somebody changed the definition, the tracking, or the timezone. A new event fires on page load rather than on interaction, and activity jumps 19 percent on the day of the release with no human involved. Always check what shipped on the day the line bent, including things your team did not ship.",
              "Incentive. The number is a proxy for value, and once it becomes a target, people optimise the proxy. That includes your own team, acting in good faith. A notification that drives a session is a session, and it is not value, and the chart cannot tell the difference.",
            ],
          },
          case: {
            brand: "Wells Fargo",
            year: "2016",
            situation:
              "Wells Fargo ran a cross selling strategy measured by products per household, and pushed the target hard down through the retail branch network.",
            what: "Employees opened accounts and cards customers had not asked for. The regulator found roughly 1.5 million unauthorised deposit accounts and around 565,000 credit card applications, and fined the bank 100 million dollars, at the time the largest penalty the Consumer Financial Protection Bureau had issued. The cross sell metric had been rising the whole time and had been reported to investors as evidence the strategy worked.",
            lesson:
              "The metric was real, the reporting was accurate, and the product got worse. Any number that becomes a target and has no counter metric will eventually be met in the cheapest available way, and the cheapest way is rarely the one you had in mind.",
            sources: [
              {
                label: "CFPB enforcement action, Wells Fargo Bank, 2016",
                url: "https://www.consumerfinance.gov/enforcement/actions/wells-fargo-bank-2016/",
              },
            ],
          },
          ai: {
            move: "Give the model the raw weekly counts, the release log and the marketing calendar in one paste, and ask it to line up every date on which something changed against the shape of the curve.",
            trap: "Ask it why the number went up and every answer you get back will be a product explanation, because your question framed it as one. It will never volunteer “the event definition changed on the 14th” unless the release log is in front of it. Give it the release log, the marketing calendar and the tracking changelog, and ask specifically which non product event could produce this shape.",
            prompt:
              "Here are weekly counts, a deploy log, a tracking changelog and a marketing calendar. Do not explain the trend yet. First, list every date on which anything changed, and for each, state what shape of change it would produce in the metric if it were the cause. Then tell me which of those shapes matches what I actually see.",
          },
          build: {
            artefact:
              "A one page verdict on whether a real metric movement is real, with the composition split that proves it.",
            steps: [
              {
                do: "Take a real metric movement from your own launch, or from the Sona dataset if your product is too young.",
              },
              {
                do: "Split the metric into new users and existing users and plot both. If the existing line is flat, the movement is composition.",
                hint: "This one split resolves the majority of suspicious metric movements, and it takes ten minutes.",
              },
              {
                do: "Check the tracking changelog and the deploy log for the day the line bends. Write down everything that shipped that week, including other teams' work.",
              },
              {
                do: "Name the counter metric that would have caught a cheap way of hitting this number, and check it.",
              },
              {
                do: "Write the verdict in three sentences, including the words “we do not know” if that is where you land.",
              },
            ],
            tools: ["Google Sheets", "Your analytics tool"],
          },
          solution: {
            summary:
              "The 19 percent is composition plus one tracking change, and the underlying behaviour of existing users has not moved at all.",
            walkthrough: [
              "Split new against existing. Existing weekly actives are flat within noise. The entire movement is in users who joined in the last three weeks.",
              "Ask what happened three weeks ago. A paid campaign started, bringing a cohort that opens the app more often and connects an account less often.",
              "Check the tracking changelog. The assistant panel fires assistant_opened on render rather than on interaction, which adds about 4 points of the 19 by itself.",
              "The counter metric, accounts connected per new user, has fallen. So the campaign is buying activity and not customers.",
              "The verdict: the number is real, the interpretation was wrong, and the honest sentence is that the launch has not yet moved existing user behaviour and it is too early to say whether it will.",
            ],
            example: {
              label: "The verdict paragraph",
              body: "Weekly actives are up 19 percent. Roughly 4 points of that is a tracking change on 14 May and the rest is a new cohort from the paid campaign. Existing user activity is flat within noise. We cannot yet say the assistant moved anything, and I would not repeat the 19 percent to the board without the split next to it.",
            },
          },
          check: [
            "Is the existing user line flat, and how do you know?",
            "What shipped on the day the line bent, including work from other teams?",
            "Which counter metric did you check, and what did it say?",
          ],
        },

        {
          slug: "confounds",
          title: "Novelty, seasonality, and the split you did not make",
          kind: "Drill",
          minutes: 60,
          hook: "Week one of the assistant looks extraordinary. Week three looks ordinary. Both of those are the same product, and somebody is going to ask you which one is the truth.",
          explain: {
            title: "Four explanations that are not the one you like",
            body: [
              "Novelty and primacy. New things get used because they are new, and changed things get resisted because they changed. Both effects usually fade within two weeks, in opposite directions, which means week one exaggerates in whichever direction your change went. Nothing you learn in week one about magnitude is reliable.",
              "Seasonality. A personal finance product looks different on payday, at month end and in January. If your control period is the last week of the month and your test period is the first, you have measured the calendar. The fix is boring: compare like periods, or run long enough to cover a full cycle.",
              "Mix shift and Simpson's paradox. This is the one that catches good analysts. A result can hold in every single segment and reverse when you add the segments together, because the segments have different sizes and different baselines. If mobile improves, desktop improves, and the total gets worse, nobody has made an arithmetic error: more of your traffic has moved to the segment with the lower baseline.",
              "The practical rule is that you split by segment before you form an opinion, not after somebody challenges you. Splitting afterwards looks like defending. Splitting first is analysis.",
            ],
          },
          case: {
            brand: "University of California, Berkeley",
            year: "1975",
            situation:
              "Berkeley's 1973 graduate admissions figures showed men admitted at about 44 percent and women at about 35 percent, a gap large enough to look like clear evidence of bias across the university.",
            what: "Bickel, Hammel and O'Connell published the department level breakdown in Science. Within individual departments there was no such pattern, and several departments admitted women at a slightly higher rate. Women had applied in larger numbers to departments with low admission rates for everyone. The aggregate and the parts told opposite stories, and both numbers were correct.",
            lesson:
              "An aggregate is a weighted average, and the weights can carry the entire result. This is the plain language version of Simpson's paradox, and it appears in product data every time your traffic mix changes between two periods.",
            sources: [
              {
                label: "Bickel, Hammel and O'Connell, Sex Bias in Graduate Admissions, Science 1975",
                url: "https://www.science.org/doi/10.1126/science.187.4175.398",
              },
            ],
          },
          ai: {
            move: "Paste the raw numbers with no commentary and ask for five explanations that would produce this pattern, ranked by how easy each is to rule out with data you already have. Then rule them out one at a time, in writing.",
            trap: "This is the failure to watch for in the whole level. Tell the model what you think the result means and it will agree with you, then supply better arguments for your reading than you had yourself. Hint at the opposite reading in a fresh conversation and it will build that case just as convincingly. Never state your interpretation before you have its list, and if you have already stated one, start a new conversation.",
            prompt:
              "Below are raw weekly numbers for a feature launch, split by cohort. Do not interpret them and do not tell me what you think happened. List five distinct mechanisms that could produce this exact pattern, including at least two that involve no change in user behaviour. For each, name the specific check that would rule it in or out.",
          },
          build: {
            artefact:
              "A confound audit: four alternative explanations for a real result of yours, each ruled in or out with data.",
            steps: [
              {
                do: "Take a result you believe. Write your interpretation on a separate page and put it away.",
              },
              {
                do: "Generate the alternatives without showing anyone your interpretation, including the model.",
              },
              {
                do: "Plot week by week for at least four weeks. Novelty is visible as a first week spike that decays, not as a level shift.",
                hint: "If you only have two weeks of data, the honest output of this exercise is a date in the future, not a verdict.",
              },
              {
                do: "Split by two segments: new against existing, and one platform or plan split. Check whether the direction holds inside every segment.",
              },
              {
                do: "Write which explanations survive. If more than one survives, you do not have a finding, you have a shortlist.",
              },
            ],
            tools: ["Google Sheets"],
          },
          solution: {
            summary:
              "Week one is novelty, weeks two and three are the truth, and one segment is carrying the whole aggregate.",
            walkthrough: [
              "Plot four weeks rather than comparing week one to the pre period. The curve spikes then settles about a third of the way above baseline, which is the shape of novelty plus a real effect, not one or the other.",
              "Check the calendar. Week one contained payday for most users. That accounts for part of the spike and none of the settled level.",
              "Split new against existing. New users are strongly up. Existing users are flat. So the feature helps people decide to stay, and does not change what current users do.",
              "Split by plan. Free users are up, paying users slightly down, and because free users are 98 percent of the base the aggregate is positive while your most valuable segment got a marginally worse product. That is the Berkeley shape.",
              "Surviving explanation: a real activation effect for new users, a small negative for paying users, and a magnitude that cannot be stated until week four.",
            ],
          },
          check: [
            "Does the direction of your result hold inside every segment you split by?",
            "How many weeks of data do you have, and is that enough for novelty to have decayed?",
            "Which alternative explanation survived alongside yours, and what would separate them?",
          ],
          references: [
            {
              label: "Ronny Kohavi and Stefan Thomke on running trustworthy online experiments",
              url: "https://hbr.org/2020/03/building-a-culture-of-experimentation",
            },
          ],
        },
      ],
    },

    /* ================================================================ 4 */
    {
      slug: "experiments",
      n: "4",
      title: "Experiments worth running",
      summary:
        "Most tests are not worth the traffic. This chapter is how to tell which ones are, how long to run them, and what the result actually licenses you to say.",
      lessons: [
        {
          slug: "worth-running",
          title: "An experiment worth running",
          kind: "Concept",
          minutes: 50,
          legacy: "Module 10.1, Experimentation",
          hook: "Someone proposes A/B testing the button colour on a screen that 400 people see a week. It would take eleven months to reach a conclusion, and no decision hangs on the answer.",
          explain: {
            title: "Three conditions, and most proposals fail the third",
            body: [
              "A decision has to hang on the result. If you would ship it regardless, or kill it regardless, you are not running an experiment, you are collecting a number to put in a slide. That is fine, but call it what it is and do not spend traffic on it.",
              "The effect has to be plausibly detectable with the traffic you have. Small effects need enormous samples. A screen with 400 weekly visitors cannot resolve a two point difference this year, and running the test anyway produces a random answer that feels like evidence.",
              "You have to be willing to act on either outcome, including the flat one. The most common failed experiment is one where the team ships the variant regardless because the work is already done. If that is going to happen, skip the test and own the decision, which is more honest and considerably cheaper.",
              "Write it down before you start. The hypothesis, the primary metric, the guardrails, the sample size, the end date and what you will do for each outcome. That document is what stops the result being reinterpreted after the fact by whoever is most disappointed.",
            ],
          },
          case: {
            brand: "Booking.com",
            year: "2020",
            situation:
              "Booking.com built an experimentation platform that let any employee, without needing approval from a data scientist, run a controlled test on live traffic, and ran over a thousand concurrent experiments.",
            what: "Stefan Thomke's account of the company describes the cultural cost of that infrastructure as well as the benefit. The large majority of ideas tested failed to improve the target metric, including ideas from senior people, and the organisation had to build the habit of treating a failed test as information rather than as a personal defeat. The infrastructure was the easy part.",
            lesson:
              "The value of experimentation is not the wins. It is that you stop shipping the losses, which you were previously shipping without knowing. That only works if a negative result is a normal Tuesday rather than an embarrassment.",
            sources: [
              {
                label: "Stefan Thomke, Building a Culture of Experimentation, HBR 2020",
                url: "https://hbr.org/2020/03/building-a-culture-of-experimentation",
              },
            ],
          },
          ai: {
            move: "Have the model write the pre registration document from your hypothesis: metric, guardrails, minimum detectable effect, sample size, end date, and the action for each of the three outcomes.",
            trap: "It will happily design a rigorous test for a question you have already answered, and it will not tell you that your traffic makes the test impossible unless you give it the traffic number and ask directly. It has no sense of whether the test is worth running, only of whether it is well formed. You supply the judgement, it supplies the structure.",
          },
          build: {
            artefact:
              "A pre registration document for one real experiment, and a written decision to not run two others.",
            steps: [
              { do: "List three tests someone at your company has suggested, or three you have considered." },
              {
                do: "For each, answer the three conditions in one line each. Kill the ones that fail.",
              },
              {
                do: "For the survivor, write the pre registration: hypothesis, primary metric, two guardrails, minimum detectable effect, end date.",
              },
              {
                do: "Write the action for each outcome: positive, negative, and flat. The flat one is the row people leave blank.",
              },
              { do: "Get one other person to sign it before the test starts." },
            ],
          },
          check: [
            "Which decision hangs on this result, and who makes it?",
            "What will you do if the result is flat, and did you write that down before starting?",
            "Which two proposals did you kill, and why?",
          ],
        },

        {
          slug: "sample-size",
          title: "Sample size, stopping rules, and the temptation to peek",
          kind: "Drill",
          minutes: 60,
          legacy: "Module 10.2, A/B Testing",
          hook: "Day three. The variant is up 4 percent and the graph is green. Someone in the channel says we should just ship it. You know the test needs two more weeks, and saying so is going to make you the person slowing everything down.",
          explain: {
            title: "Decide the sample and the end date before you look",
            body: [
              "Sample size is arithmetic, not judgement. A serviceable rule of thumb for a conversion rate test at the conventional 5 percent significance and 80 percent power is that you need roughly 16 times p times one minus p, divided by the square of the absolute effect you want to detect, in each arm. At an 8 percent baseline, detecting a 1 point absolute change needs about 11,800 users per arm. Detecting a half point change needs four times that, because the term is squared.",
              "That squared term is the whole reason most product experiments are impossible. Halving the effect you want to detect quadruples the traffic. Which means the useful question at the start is not “can we test this”, it is “what is the smallest effect we could detect in three weeks”, and if that number is bigger than the effect you actually expect, do not run the test.",
              "Peeking breaks it. The 5 percent false positive rate assumes you look once, at the end. Check every day and stop the first time it crosses the line, and your real false positive rate climbs well above the number you think you are protected by, because you are giving noise many chances to look like signal. Either set the end date and honour it, or use a method designed for continuous monitoring, which is a real thing and is not the same as squinting at a dashboard.",
            ],
            diagram: "ab-test",
            caption:
              "The same experiment on day 3, day 7 and day 14. Two of these would have been shipped.",
            points: [
              {
                term: "Minimum detectable effect",
                def: "The smallest difference the test can find. Decided by you, before the test, and it sets everything else.",
              },
              {
                term: "Power",
                def: "The chance of finding a real effect if one exists. Convention is 80 percent, which means one real effect in five is missed.",
              },
              {
                term: "Stopping rule",
                def: "The written condition under which the test ends. A date, a sample size, or a proper sequential method. Not a feeling.",
              },
            ],
          },
          case: {
            brand: "Optimizely",
            year: "2015",
            situation:
              "Optimizely's customers were running A/B tests through a dashboard that updated continuously, and they were doing what anyone would do with a live dashboard, which is watch it and stop when it looked good.",
            what: "Rather than telling customers to stop looking, Optimizely rebuilt its statistics engine around sequential testing, where the reported results remain valid under continuous monitoring. It was an admission that the classic fixed horizon test is a poor fit for a product where the results are always visible, and that the fix belonged in the tool rather than in a warning label.",
            lesson:
              "People will peek. If your process depends on humans not looking at a number that is on their screen, the process is wrong. Either hide the interim result or use a method that survives being watched.",
            sources: [
              {
                label: "Evan Miller, How Not To Run An A/B Test",
                url: "https://www.evanmiller.org/how-not-to-run-an-ab-test.html",
              },
              {
                label: "Evan Miller, Simple Sequential A/B Testing",
                url: "https://www.evanmiller.org/sequential-ab-testing.html",
              },
            ],
          },
          ai: {
            move: "Have the model write the sample size formula and the runtime calculation, then compute it yourself in a sheet and check the two agree. Use it as a calculator of last resort and a formula writer of first resort.",
            trap: "It does multi step arithmetic in prose confidently and wrongly, and a sample size that is out by a factor of four looks exactly as plausible as the correct one. It will also happily justify stopping early if you ask it whether a result is significant on day three, because it answers the question you asked rather than the question of whether you should have asked it.",
            prompt:
              "Write the formula for the per arm sample size for a two sided test of two proportions at 5 percent significance and 80 percent power. Show the formula and the substitution with my numbers, but do not give me a final figure. I will compute it.",
          },
          build: {
            artefact:
              "A sample size and runtime calculation for your real experiment, plus a written stopping rule you have shown to somebody else.",
            steps: [
              { do: "Get the baseline conversion rate for your primary metric from real data." },
              {
                do: "Decide the minimum detectable effect. Ask what size of change would actually change the decision, and use that, not the smallest number you can imagine.",
              },
              {
                do: "Compute the per arm sample size in a sheet. Then divide by your weekly eligible traffic to get the runtime in weeks.",
                hint: "If the runtime is over six weeks, the test is probably not worth running. Go back and either pick a bigger effect, a larger surface, or a different way of deciding.",
              },
              {
                do: "Write the stopping rule as a date and a sample size, and post it in the channel where the dashboard lives.",
              },
              {
                do: "Write the sentence you will say on day three when somebody asks to ship early. Rehearse it, because you will need it.",
              },
            ],
            tools: ["Google Sheets", "A sample size calculator"],
          },
          solution: {
            summary:
              "The arithmetic kills the test as designed, and the fix is a bigger effect rather than a longer run.",
            walkthrough: [
              "Baseline: 8 percent of users who see the panel go on to connect an account. You would like to detect a 1 point absolute improvement.",
              "16 times 0.08 times 0.92 divided by 0.01 squared gives roughly 11,800 per arm, so about 23,600 users in total.",
              "Eligible traffic is about 6,000 users a week across both arms, so the runtime is about four weeks. That is acceptable.",
              "Now check the half point version: 47,000 per arm, roughly sixteen weeks. Same product, same test, four times the wait, because the term is squared. That is the version to refuse.",
              "The stopping rule: this test ends on 14 June at 23,600 users, whichever is later, and no interim result is reported before then except the guardrails, which are watched daily and can stop the test early only in the negative direction.",
            ],
          },
          check: [
            "What is your minimum detectable effect, and would an effect that size actually change your decision?",
            "How long does your test have to run, and did you compute that before you started it?",
            "What is your stopping rule, and who else has seen it?",
          ],
        },

        {
          slug: "win-or-noise",
          title: "Win or noise?",
          kind: "Drill",
          minutes: 60,
          legacy: "Module 10.3, A/B Test Results, 20.6, Ship, Iterate or Kill",
          hook: "The test is over. The variant is up 2.1 percent with a confidence interval running from minus 0.4 to plus 4.6. Three people in the room have already read that as a win and one of them has told sales.",
          explain: {
            title: "What a significant result actually licenses you to say",
            body: [
              "A significant result licenses one narrow sentence: for this population, in this period, on this metric as defined, the difference we observed is unlikely to have arisen by chance alone, and our best estimate of its size is the interval. It does not license “users love it”, it does not license “this will hold at scale”, and it does not license anything at all about a metric you did not test.",
              "The interval is more useful than the p value and gets quoted far less. An interval from minus 0.4 to plus 4.6 crosses zero, which means the honest verdict is that you do not know. A tight interval around a small positive is a much better result than a wide interval around a large one, and only one of those two makes it into most readouts.",
              "Then there is the cost the test did not measure. A variant can win on the metric and lose something the metric does not see: trust, coherence, the design system, the goodwill of the people who have to maintain it. That is not an argument against testing, it is an argument for writing down what the test did not measure, in the readout, next to the result.",
              "Write the verdict in one sentence, at the top, before the charts. Ship, iterate, or kill. A readout that makes the reader infer the verdict will have the verdict inferred wrongly.",
            ],
          },
          case: {
            brand: "Microsoft and the Bing experimentation platform",
            year: "2013",
            situation:
              "Microsoft ran controlled experiments on Bing and other products at very large scale, with enough traffic to detect effects most companies cannot see at all.",
            what: "Ronny Kohavi's published work from that platform reports a base rate that surprises most product teams: only about a third of well designed experiments produce a positive result on the target metric, roughly a third are flat, and roughly a third are negative. That includes ideas that senior people were confident about. The same body of work documents effects so small that they were only detectable because of the traffic available, and effects that reversed once novelty decayed.",
            lesson:
              "Most of your ideas will not work, and that is the base rate rather than a personal failing. The value of the measurement is that you find out which third you are in before you have shipped it to everyone.",
            sources: [
              {
                label: "Large Scale Experimentation at Bing",
                url: "https://blogs.bing.com/search-quality-insights/August-2013/Large-Scale-Experimentation-at-Bing/",
              },
              {
                label: "Kohavi et al, Online Controlled Experiments at Large Scale, KDD 2013",
                url: "https://www.exp-platform.com/Documents/2013%20controlledExperimentsAtScale.pdf",
              },
            ],
          },
          ai: {
            move: "Give the model your numbers and ask it to write the one sentence verdict in three versions: the version you would defend to a statistician, the version for the founder, and the version for the changelog. Compare them and notice what got lost between the first and the third.",
            trap: "It turns intervals into headlines. Hand it a result that crosses zero and ask for a summary, and you get “the variant showed a promising 2.1 percent improvement”, which is a true sentence that will be read as a false one. Require the interval in every version, including the changelog one, and delete the word promising.",
          },
          build: {
            artefact:
              "A one page experiment readout with a verdict at the top, including the words “we do not know” if that is the honest answer.",
            steps: [
              { do: "State the verdict in one sentence, at the top: ship, iterate or kill." },
              { do: "Report the effect with its confidence interval, never the point estimate alone." },
              {
                do: "Report the guardrails, including the ones that did not move. Silence on a guardrail reads as a problem being hidden.",
              },
              {
                do: "Split by the two segments you pre registered. Note if the direction differs, and do not go hunting through segments you did not pre register.",
                hint: "Test enough segments and one of them will look significant by chance. That is not a finding, it is the number of segments you looked at.",
              },
              {
                do: "Write the section called what this does not tell us. Include the thing the metric cannot see.",
              },
            ],
          },
          solution: {
            summary:
              "The verdict is iterate, not ship, and the sentence that makes it credible is the one admitting what the test could not see.",
            walkthrough: [
              "The interval crosses zero, so the primary result is inconclusive. Write that as the first line rather than burying it under a chart.",
              "The guardrail on tickets per thousand users rose 11 percent, which is inside the threshold and still worth reporting, because it is the shape of a problem that grows with exposure.",
              "The pre registered split shows new users clearly positive and existing users flat. That is a real finding and it is a different feature: it belongs in onboarding rather than in the main product.",
              "What this does not tell us: nothing about paying users, because there were 41 of them in the test and no interval worth quoting. Nothing beyond three weeks.",
              "Verdict: iterate. Move the panel into onboarding where the effect appears to live, and rerun with a design that can resolve the paying segment.",
            ],
            example: {
              label: "The top line of a readout that survived the room",
              body: "Verdict: iterate, do not ship. The variant moved account connection by 2.1 percent, interval minus 0.4 to plus 4.6, so we cannot rule out no effect at all. The effect that does look real is confined to new users, which suggests this belongs in onboarding rather than in the main product. Guardrails held. We know nothing about paying users from this test.",
            },
          },
          check: [
            "Does your interval cross zero, and does your verdict say so in the first sentence?",
            "Did you peek, and if you did, does the readout admit it?",
            "What did the test not measure that a reasonable person would care about?",
          ],
          references: [
            {
              label: "Doug Bowman on leaving Google, and testing 41 shades of blue",
              url: "https://stopdesign.com/journal/2009/03/20/goodbye-google.html",
            },
            {
              label: "The ASA statement on p values",
              url: "https://www.tandfonline.com/doi/full/10.1080/00031305.2016.1154108",
            },
          ],
        },
      ],
    },

    /* ================================================================ 5 */
    {
      slug: "growth",
      n: "5",
      title: "Growth, pricing, and the review nobody schedules",
      summary:
        "Loops rather than funnels, activation before acquisition, the price as a product decision, and the meeting after launch that everyone skips.",
      lessons: [
        {
          slug: "loops-not-funnels",
          title: "A loop is not a funnel",
          kind: "Concept",
          minutes: 50,
          hook: "Maya wants a growth plan. The last one was a list of acquisition channels with budgets next to them, and it worked exactly as long as the budget lasted.",
          explain: {
            title: "A funnel spends, a loop compounds",
            body: [
              "A funnel is linear. People go in the top, some come out the bottom, and to get more out of the bottom you put more in the top, which costs money every single time. It is a useful diagnostic and a terrible growth strategy, because nothing about last month's spend helps this month.",
              "A loop reinvests its own output as its next input. A user arrives, gets value, and that act of getting value produces the next user: an invite, a shared artefact, a public page that ranks, a piece of content that the product generated. The output of step four is the input to step one. That is the whole difference, and it is why a loop has a factor and a funnel only has a rate.",
              "Acquisition is the least interesting of the three growth levers and gets the most attention, because it is the one you can buy. Activation and retention are harder to work on and they change the economics of every acquisition channel underneath them. Improving retention makes every channel more affordable at once, including the ones you already gave up on.",
            ],
            diagram: "funnel",
            caption:
              "This is a diagnostic, not a strategy. It tells you where you leak, not where growth comes from.",
            points: [
              {
                term: "Funnel",
                def: "Linear, one way, paid for again each month. Good for finding the leak.",
              },
              {
                term: "Loop",
                def: "The output becomes the input. Has a factor: how many new inputs each pass produces.",
              },
              {
                term: "Loop factor",
                def: "New users produced per user per cycle. Below 1 the loop decays, and that is still useful if it lowers your blended cost.",
              },
            ],
          },
          case: {
            brand: "Reforge and the growth loop framing",
            year: "2018",
            situation:
              "Growth teams across the industry were organised around funnel stages, with separate owners for acquisition, activation and retention, and the funnel model was producing strategies that were mostly channel spending plans.",
            what: "Brian Balfour and colleagues published the argument that funnels are the wrong unit: products that compound do so through loops, where the output of one cycle is the input to the next, and the loop is a system property rather than a stage anyone owns. The practical consequence is organisational as much as analytical. If acquisition, activation and retention are owned by three teams, nobody owns the loop, and the loop is the thing that grows.",
            lesson:
              "Model your growth as a loop and you get one question worth arguing about: what does a user produce that brings the next user. If the answer is nothing, you do not have a growth model, you have a marketing budget.",
            sources: [
              {
                label: "Reforge, Growth Loops are the New Funnels",
                url: "https://www.reforge.com/blog/growth-loops",
              },
            ],
          },
          ai: {
            move: "Describe your product and ask the model to propose three candidate loops, each written as four numbered steps where step four feeds step one, with the specific artefact or action that carries the loop.",
            trap: "It proposes referral for every product, because referral is the loop in the training data. For a private personal finance product, referral is the weakest available loop, because the artefact people would share is the one thing they will not share. Ask it what the product naturally produces that a non user could see, and reject any loop where step four is “the user tells a friend” with no mechanism attached.",
          },
          build: {
            artefact:
              "Three candidate loops drawn as four step cycles, with the loop factor you would need for each to matter.",
            steps: [
              { do: "Draw your current growth as it actually is. Most are a funnel with paid at the top." },
              {
                do: "Write three candidate loops. Each must have four steps and step four must produce step one.",
              },
              {
                do: "For each, name the artefact that carries the loop and whether it can exist without violating privacy.",
                hint: "In fintech this is the hard constraint. The loop has to run on something the user is happy to be seen with.",
              },
              {
                do: "Estimate the loop factor honestly, and say what it would need to be to matter against your current acquisition cost.",
              },
              { do: "Pick one and write what you would build first to test whether the loop closes at all." },
            ],
          },
          check: [
            "Does step four of your loop actually produce step one, or does it just stop?",
            "What artefact carries the loop, and would a real user be comfortable with it existing?",
            "What loop factor would make this worth building, and how far away is it?",
          ],
        },

        {
          slug: "activation",
          title: "Activation first, retention second, acquisition last",
          kind: "Build",
          minutes: 60,
          hook: "Sona acquires 4,000 users a month and keeps about 800. Maya wants to double acquisition. Doubling acquisition doubles the 3,200 people a month who leave, and it costs money to do it.",
          explain: {
            title: "Activation is the moment the product becomes worth coming back to",
            body: [
              "Activation is not signup and it is not onboarding completion. It is the first moment the user gets the thing they came for, and the useful version of the definition is behavioural and time bounded: the action, within a window, that separates the people who are still here in a month from the people who are not.",
              "You find it by looking backwards. Take users from three months ago, split into retained and churned, and compare what they did in their first session and their first week. You are looking for an action with a large gap between the groups and a plausible causal story. Then you have a candidate, not a finding, because the action may be a symptom of already being the kind of person who retains.",
              "The test of whether it is causal is whether pushing people towards it moves retention. Most activation metrics fail that test, which is fine and worth knowing. The ones that pass become the single most valuable thing your onboarding can do, and they usually take the form of a small number of a specific action rather than a completed tour.",
            ],
            diagram: "retention-curve",
            caption:
              "Two cohorts, identical acquisition. Only the one that flattens is a business.",
            points: [
              {
                term: "Activation",
                def: "An action, a count and a window. “Connected one account and categorised five transactions within seven days.”",
              },
              {
                term: "Flattening",
                def: "The point where the retention curve stops falling. If it never flattens, growth spend leaks straight out.",
              },
              {
                term: "Symptom or cause",
                def: "The action may predict retention without producing it. Only an intervention tells you which.",
              },
            ],
          },
          case: {
            brand: "Duolingo",
            year: "2021",
            situation:
              "Duolingo's daily active users had been growing slowly for a long stretch, and the growth team had run out of obvious acquisition levers.",
            what: "Jorge Mazal's account of the period describes the team shifting almost entirely onto retention and the streak mechanic: making the streak more visible, adding a streak freeze and repair, and reworking notifications around it. The published account is candid about the failures alongside the wins, and about the fact that the biggest effects came from a small number of changes to one existing mechanic rather than from new features.",
            lesson:
              "Retention work is unglamorous, mostly consists of improving something that already exists, and moves the business more than a new feature does. It also compounds, because every point of retention makes every acquisition channel cheaper.",
            sources: [
              {
                label: "Jorge Mazal, How Duolingo reignited user growth",
                url: "https://www.lennysnewsletter.com/p/how-duolingo-reignited-user-growth",
              },
            ],
          },
          ai: {
            move: "Give the model the first week behaviour of retained and churned cohorts as a table and ask which actions separate them, with the size of the gap and the sample count for each.",
            trap: "It reports the biggest gap as the answer and describes it causally, in confident language, with no mention of sample size. It will also present an action performed by 30 people as a finding. Require a count column next to every claim, and require it to state, for each candidate, the story by which the action could be a symptom rather than a cause.",
            prompt:
              "Here is first week behaviour for two cohorts, retained and churned. For each action, report the rate in each cohort, the absolute gap and the number of users behind it. Do not use causal language. For your top three candidates, give me the most plausible story in which the action is a symptom of retention rather than a cause of it.",
          },
          build: {
            artefact:
              "A defined activation metric, a cohort retention curve, and one intervention shipped to test whether the metric is causal.",
            steps: [
              { do: "Build the cohort retention table from your own product or the Sona dataset. Plot the curve and find the flattening point, or note that there is not one." },
              {
                do: "Split first week behaviour by retained and churned. Find the three actions with the largest gaps.",
              },
              {
                do: "Write the activation metric as an action, a count and a window. Make it precise enough that two analysts would compute it identically.",
              },
              {
                do: "Design the smallest intervention that pushes new users towards that action, and ship it to a fraction of new users.",
                hint: "The intervention is the test. If retention does not move, your activation metric is a symptom and you have learned something worth more than the feature.",
              },
              { do: "Write what you expect to see and by when, before you ship it." },
            ],
            tools: ["Google Sheets", "Your analytics tool"],
          },
          solution: {
            summary:
              "The activation metric is two connected accounts in seven days, and the intervention shows it is partly causal and partly a symptom.",
            walkthrough: [
              "The curve flattens at about 19 percent for the overall base, which is low but not zero, so there is something to grow.",
              "Three actions separate the cohorts: connecting a second account, categorising transactions manually, and setting a budget. Second account has the biggest gap and 2,400 users behind it.",
              "Define it: at least two accounts connected within seven days of signup. Precise, computable, and hard to fake.",
              "The intervention is one screen after the first successful connection, prompting the second, shipped to half of new users.",
              "Result: second account rate rises a lot, retention rises a little. So it is partly causal. The honest write up says both numbers, and notes that people who were going to connect two accounts anyway are most of the movement.",
            ],
          },
          check: [
            "Does your retention curve flatten, and at what percentage?",
            "Is your activation metric an action with a count and a window, or is it a stage in your onboarding?",
            "Did the intervention move retention, and what did you conclude if it did not?",
          ],
        },

        {
          slug: "pricing-packaging",
          title: "Pricing and packaging are product decisions",
          kind: "Build",
          minutes: 60,
          legacy: "Module 19.3, Pricing",
          hook: "Finance wants a price for the assistant. Every answer you can think of is either too cheap to cover the model calls or too expensive for the 900 people who already pay you.",
          explain: {
            title: "Packaging decides who pays. Price decides how much.",
            body: [
              "Packaging is the product decision and it comes first. Which capabilities sit in which tier, what the free tier is for, and what the boundary between tiers is. Get this wrong and no price is correct, because you are charging the wrong people for the wrong thing.",
              "The unit you charge by is the part that quietly determines everything else. Per seat, per usage, per outcome, flat. The unit shapes behaviour: charge per message and people ration their questions, which is the opposite of what an assistant needs. Charge flat and your heaviest users burn the margin of everyone else. In an AI product the unit has to survive the cost curve, because the marginal cost is real and it is not zero.",
              "Then there is the rule that costs companies the most: never change the unit on existing customers without an enormous amount of warning and a way out. A price rise is a negotiation. A change to how you count is a betrayal, because it invalidates the arithmetic people built their own business on.",
            ],
            diagram: "cost-curve",
            caption:
              "Packaging in an AI product is partly a routing decision. The free tier gets the cheap model, and the boundary is where the quality gap starts to matter.",
            points: [
              {
                term: "Packaging",
                def: "What is in which tier. The product decision, made before any number.",
              },
              {
                term: "Unit",
                def: "What you count. Seats, usage, outcomes, or nothing. Changes user behaviour immediately.",
              },
              {
                term: "Value metric",
                def: "The thing that grows as the customer gets more value. Ideally the unit and the value metric are the same.",
              },
            ],
          },
          case: {
            brand: "Unity",
            year: "2023",
            situation:
              "Unity's game engine was licensed per seat, and the company announced a new Runtime Fee charged per game install, applying to games already built and shipped on the engine.",
            what: "The reaction from developers was immediate and severe, because the change was not to the price but to the unit: studios had modelled their businesses on a per seat cost and a per install cost is unbounded and unpredictable, particularly for free to play and charity bundles. Within about a week Unity published an apology and substantially revised the policy, capping the fee, exempting smaller revenue tiers and making it apply only to future versions of the engine. The reputational damage outlasted the revision.",
            lesson:
              "Changing the unit is a far bigger product decision than changing the number. Customers can absorb a price increase they can predict. They cannot absorb a pricing model that makes their own planning impossible.",
            sources: [
              {
                label: "Unity apologises and revises the Runtime Fee, Game Developer",
                url: "https://www.gamedeveloper.com/business/unity-apologizes-to-devs-reveals-updated-runtime-fee-policy",
              },
            ],
          },
          ai: {
            move: "Have the model lay out four packaging options for your feature, each with the unit, the tier boundary and the behaviour it will encourage. Then have it argue against the one you prefer.",
            trap: "It anchors on whatever prices appear most in its training data and produces a tidy three tier table with 9, 19 and 49 in it, regardless of your costs or your market. It also silently assumes a US buyer with US willingness to pay. Give it your actual cost per interaction from Level 05 and your actual ARPU, and make it show that the bottom tier does not lose money at the 90th percentile of usage.",
          },
          build: {
            artefact:
              "A packaging proposal with the unit named, the tier boundary justified, and a margin model at the 50th and 90th percentile of usage.",
            steps: [
              {
                do: "Pull your real cost per interaction from Level 05 and your real usage distribution. You need the 90th percentile, not the mean.",
              },
              {
                do: "Write three packaging options. For each, name the unit and predict the behaviour it will produce.",
              },
              {
                do: "Model margin for each at median usage and at the 90th percentile. An option that only works at the median does not work.",
                hint: "Heavy users are not an edge case in AI products. They are the case that determines whether the tier is viable.",
              },
              {
                do: "Pick one, and write the boundary in a sentence a customer would understand without a table.",
              },
              {
                do: "Write the migration plan for existing customers, including what they keep for free and how much notice they get.",
              },
            ],
            tools: ["Google Sheets"],
          },
          solution: {
            summary:
              "The workable answer bundles a generous allowance into the existing paid tier rather than creating a new one, and the 90th percentile is what decides it.",
            walkthrough: [
              "Cost per interaction is about 1.9 rupees at the routed setting from Level 05. Median user asks 6 questions a month, the 90th percentile asks 40.",
              "Option A, a separate add on. Clean margin, but it splits the paying base and adds a second purchase decision to a product with 900 payers. Too much friction for too small a base.",
              "Option B, per message credits. Margin is safe and the behaviour is wrong: people ration questions, usage collapses, and the eval work from Level 05 never gets exercised.",
              "Option C, bundled into the existing tier with a fair use ceiling well above the 90th percentile. At 40 questions the cost is about 76 rupees against a 199 rupee subscription, which holds. This is the answer.",
              "Migration: existing subscribers get it at no extra cost, which is the cheapest retention lever available and turns a pricing decision into a reason to stay.",
            ],
          },
          check: [
            "What unit are you charging by, and what behaviour will it produce?",
            "Does your bottom paid tier still make money at the 90th percentile of usage?",
            "What happens to existing customers, and how much notice do they get?",
          ],
        },

        {
          slug: "post-launch-review",
          title: "The review nobody schedules",
          kind: "Workshop",
          minutes: 50,
          legacy: "Module 20.6, Ship, Iterate or Kill",
          hook: "It has been four weeks. The launch went fine, mostly. Everyone has moved on to the next thing and nobody has written down what happened, which means the same three mistakes are already in the next plan.",
          explain: {
            title: "Run it on the launch that went well, not just the one that broke",
            body: [
              "Most teams review incidents and never review launches. That is backwards, because a launch that went fine contains just as much information and nobody is defensive about it. The review that produces the most learning is the one held after a good outcome, when people can afford to be honest about the parts that were luck.",
              "Blameless is a working practice, not a nicety. The question is never who let this through, it is what made this the reasonable thing to do at the time. People acting sensibly on the information they had is the normal cause of bad outcomes, and any format that lets someone be blamed will produce a review where nobody says anything useful.",
              "Compare against what you wrote down beforehand. The kill criteria, the predicted numbers, the pre registration. A review without a prediction to check is a group memory exercise, and group memory reliably reconstructs the past as though everyone knew.",
              "End with at most three changes, each with an owner and a date, and one of them should be to a document rather than to the product. Checklists and defaults outlive the person who learned the lesson.",
            ],
          },
          case: {
            brand: "Etsy",
            year: "2012",
            situation:
              "Etsy was deploying to production dozens of times a day, which meant a steady supply of incidents caused by people who were doing their jobs correctly.",
            what: "John Allspaw wrote up Etsy's practice of blameless postmortems: the engineer involved gives a detailed account of what they saw and expected, without any punitive consequence, precisely so that the organisation can learn what the system looked like from the inside at the moment of the decision. Allspaw's argument is that punishment does not remove the mistake, it removes the information about the mistake.",
            lesson:
              "You get one of two things from a review: an accurate account, or someone to blame. Choosing the second is what makes the first unavailable next time.",
            sources: [
              {
                label: "Etsy Code as Craft, Blameless PostMortems and a Just Culture",
                url: "https://www.etsy.com/codeascraft/blameless-postmortems",
              },
            ],
          },
          ai: {
            move: "Feed the model your pre launch documents and your actual results and ask it to list every prediction you made and whether it came true. It is good at this because it does not remember the launch the way you do.",
            trap: "Ask it to write the review and it produces a narrative in which everything followed logically from everything else, because coherent stories are what it generates. Real launches are messier and the mess is the content. Make it produce a table of prediction against outcome rather than prose, and write the narrative yourself.",
          },
          build: {
            artefact:
              "A written post launch review with a prediction table, three changes with owners and dates, and one document updated.",
            steps: [
              { do: "Schedule it before you launch. Put it in the calendar at launch plus four weeks, with the people, or it will not happen." },
              {
                do: "Build the prediction table: what you predicted, what happened, and what you would need to have known to predict it correctly.",
              },
              {
                do: "Run the meeting with one rule stated at the start: we are describing systems, not people. Enforce it the first time it is broken, because it will be broken in the first ten minutes.",
              },
              {
                do: "Agree at most three changes. Each has a name and a date. One must be a change to a checklist, template or default.",
                hint: "Ten actions is the same as zero actions. Three that happen beat ten that get archived.",
              },
              { do: "Publish it where the next person launching will find it, not in a private folder." },
            ],
          },
          check: [
            "Which of your pre launch predictions was wrong, and what would you have needed to know?",
            "Which of your three changes is a change to a document rather than to the product?",
            "Did anyone get blamed, and did you stop it?",
          ],
        },
      ],
    },

    /* ================================================================ 6 */
    {
      slug: "judgement",
      n: "6",
      title: "Ethics and judgement",
      summary:
        "The decisions where the metric and the right answer point in different directions, and how to refuse in a way that survives.",
      lessons: [
        {
          slug: "ethics",
          title: "The decision you will be asked to make quietly",
          kind: "Simulation",
          minutes: 60,
          legacy: "Module 22, Legal & Ethical Concerns",
          hook: "Growth proposes defaulting the data sharing toggle to on, with a link to settings in grey 11px text under the button. It is legal, it will work, and nobody in the room thinks it is a good idea. Nobody says so either, and the meeting is 40 minutes long.",
          explain: {
            title: "Not everything called a dark pattern is one, and some of them are illegal",
            body: [
              "Start with the distinction, because the word gets used for everything and that makes it useless. A default that helps most users and is easy to change is a design decision. A default that benefits you, harms the user, and is buried is a dark pattern. The test is not whether there is a default, it is whether a reasonable person, told plainly what the default does, would keep it.",
              "This is now enforced rather than debated. The Federal Trade Commission's 2022 staff report set out the categories: design that induces false beliefs, that hides material information, that leads to unauthorised charges, and that obscures privacy choices. Companies have paid for all four. It is worth reading the report rather than the commentary, because the categories are more specific than the discourse and they give you language that survives a meeting.",
              "You will not always win. What you can control is that the decision is made knowingly. Put the objection in writing, once, without moralising, with the specific harm and the specific alternative. A decision made in writing with a dissent attached behaves differently six months later than one made by nobody in particular in a meeting nobody minuted.",
              "And bring an alternative that hits the same number. An objection with no alternative gets read as an obstruction and loses. An objection with a design that moves the metric honestly is a product proposal, and product proposals get discussed.",
            ],
          },
          case: {
            brand: "Epic Games",
            year: "2022",
            situation:
              "Fortnite's in game store used a purchase flow the Federal Trade Commission described as counterintuitive and inconsistent, with a single button press able to buy an item, and with players losing access to accounts after disputing charges.",
            what: "The FTC brought two actions. One concerned children's privacy. The other, settled for 245 million dollars in refunds, concerned dark patterns and unauthorised charges: the layout put buy actions next to unrelated ones, purchases could be triggered while a game was loading or from a preview screen, and cancellation was made difficult. Epic agreed to change the flows and to stop locking accounts over disputed charges.",
            lesson:
              "These were not evil decisions taken by evil people. They were ordinary conversion optimisations, each individually defensible, that added up to a flow which reliably took money from people who had not decided to spend it. That is how dark patterns get built: one reasonable meeting at a time.",
            sources: [
              {
                label: "FTC, Epic Games to pay more than half a billion dollars",
                url: "https://www.ftc.gov/news-events/news/press-releases/2022/12/fortnite-video-game-maker-epic-games-pay-more-half-billion-dollars-over-ftc-allegations",
              },
              {
                label: "FTC staff report, Bringing Dark Patterns to Light",
                url: "https://www.ftc.gov/reports/bringing-dark-patterns-light",
              },
            ],
          },
          ai: {
            move: "Rehearse the objection against a simulated growth lead who has a real target, a good faith belief that users do not care, and a deadline.",
            trap: "The model makes the growth lead a cartoon. You will get someone who says “I do not care about users, I care about numbers”, which nobody has ever said out loud, and beating them teaches you nothing. Specify the person: thoughtful, under pressure, holds a number, genuinely believes the toggle is a non issue, and has been burned before by product people slowing things down for reasons they could not articulate.",
            prompt:
              "You are a growth lead at a 40 person fintech. You have a signup to activation target you are behind on. You believe, in good faith, that almost no user reads this toggle and that the ones who care will find the setting. You have been burned by vague ethical objections that came with no alternative. Argue for the default being on, and do not concede unless I give you a design that moves your number.",
          },
          build: {
            artefact:
              "A written objection to a real pattern in a real product, with an alternative that moves the same metric honestly.",
            steps: [
              {
                do: "Find a real pattern in a product you use. Screenshot it and write down, precisely, what it makes happen that the user did not choose.",
              },
              {
                do: "Classify it against the FTC categories. Some of what you find will not qualify, and saying so is part of the exercise.",
              },
              {
                do: "Work out the metric it serves and estimate what removing it costs, in the company's terms rather than yours.",
              },
              {
                do: "Design the alternative. It must move the same metric. A design that just removes the pattern is a preference, not a proposal.",
                hint: "Honest versions of most patterns exist. Timed urgency that is real, defaults that are genuinely better for the user, a cancellation flow that offers a pause. They usually convert slightly worse and churn much less.",
              },
              {
                do: "Write the objection as you would actually send it. One paragraph, the specific harm, the alternative, and no moralising.",
              },
            ],
          },
          solution: {
            summary:
              "The objection that works is short, names a specific downside in the company's own currency, and arrives with a design attached.",
            walkthrough: [
              "Name the harm concretely rather than generally: users who did not choose to share transaction data with a third party will find out later, and in a money product that is the kind of discovery that ends the relationship and gets screenshotted.",
              "Price it in their currency: a support and trust cost, a regulatory exposure under consent rules, and the fact that shared data from users who did not mean to share is low quality anyway.",
              "The alternative: ask at the moment the sharing produces value, with the benefit stated in one line, rather than as a pre ticked box at signup. Contextual consent converts lower at signup and higher over the first month.",
              "Offer to test it. A pre registered comparison of the two consent designs turns a values argument into an experiment, which is the only reliable way to win this in a growth meeting.",
              "Send it once. If the decision goes the other way, the note exists and the decision was made knowingly, which is sometimes all you can change.",
            ],
            example: {
              label: "The objection, as sent",
              body: "I do not think we should default data sharing to on. The specific risk is that users discover it later in a product that holds their bank data, and that discovery is a churn and press event rather than a support ticket. I have an alternative: ask at the point the sharing gives them something, with one line saying what. I expect it to convert worse at signup and better by day 30. I am happy to run it as a pre registered test and to be wrong.",
            },
          },
          check: [
            "Does your alternative actually move the same metric, or did you just delete the pattern?",
            "Which FTC category does your example fall into, and did you find something that turned out not to qualify?",
            "Would you send your objection exactly as written, to the actual person?",
          ],
          references: [
            {
              label: "FINRA settlement with Robinhood, June 2021, on misleading communications and supervision",
              url: "https://www.finra.org/sites/default/files/2021-06/robinhood-financial-awc-063021.pdf",
            },
          ],
        },

        {
          slug: "accessibility",
          title: "Accessibility is a floor, not a feature",
          kind: "Build",
          minutes: 50,
          hook: "A user writes in to say they cannot use the assistant with a screen reader. Tom says it is a design system issue, Dev says it is a component library issue, and the ticket has been open for five weeks because it is nobody's.",
          explain: {
            title: "It is a requirement, it is testable in an hour, and it is legally enforced in several of your markets",
            body: [
              "Accessibility is not a segment and it is not an enhancement. It is whether the product functions for people who navigate by keyboard, who use a screen reader, who cannot distinguish certain colours, who need larger text, or who are using one hand on a train. That last group is everyone, occasionally, which is why accessibility work tends to improve the product for people who never needed it.",
              "The standard is WCAG, it is public, and the parts that catch most product bugs are boring: every interactive element reachable and operable by keyboard, a visible focus state, text alternatives for images, contrast ratios that hold, form fields with real labels, and no meaning carried by colour alone. You can check most of that yourself in an hour without any specialist tooling, and you should, because a specialist audit you cannot afford yet is not a reason to ship something unusable.",
              "It is also law in a growing number of places. Courts in the United States have applied the Americans with Disabilities Act to websites and apps that connect to a physical business, and the European Accessibility Act brings requirements to a wide range of consumer digital services. Legal exposure is not why you should do it, but it is why the argument usually ends quickly once you put it in writing.",
              "Make it a definition of done rather than a project. A checklist on the pull request template does more over a year than an accessibility sprint does once.",
            ],
            diagram: "states-matrix",
            caption:
              "Every one of these states has to be reachable by keyboard and readable aloud. Most specs draw the success state, sighted, with a mouse.",
            points: [
              {
                term: "Keyboard path",
                def: "Every action reachable with tab and enter, in a sensible order, with a visible focus ring.",
              },
              {
                term: "Announced state",
                def: "Loading, error and success have to be announced, not just shown. A spinner is silent to a screen reader.",
              },
              {
                term: "Contrast",
                def: "Text against its background at the WCAG ratio. The most common failure is grey placeholder text.",
              },
            ],
          },
          case: {
            brand: "Domino's Pizza",
            year: "2019",
            situation:
              "Guillermo Robles, who is blind, was unable to order from Domino's website and app using screen reader software, and sued under the Americans with Disabilities Act.",
            what: "The Ninth Circuit held that the ADA applied to the website and app because of their connection to Domino's physical restaurants, and in October 2019 the Supreme Court declined to hear the company's appeal, leaving that ruling in place. The case is now the reference point for web accessibility litigation in the United States, and it turned on ordinary things: unlabelled controls and an ordering flow that could not be completed without sight.",
            lesson:
              "The cost of fixing this at build time is a few days of component work. The cost of fixing it after a lawsuit is the same work plus several years of legal fees and the public record.",
            sources: [
              {
                label: "CNBC, Supreme Court hands victory to blind man who sued Domino's",
                url: "https://www.cnbc.com/2019/10/07/dominos-supreme-court.html",
              },
              {
                label: "W3C, Web Content Accessibility Guidelines",
                url: "https://www.w3.org/WAI/standards-guidelines/wcag/",
              },
            ],
          },
          ai: {
            move: "Paste your component markup in and ask for the specific WCAG success criteria it violates, with the criterion number, and the smallest change that fixes each.",
            trap: "It audits the markup and declares the component compliant while the actual product is unusable, because the failure is in the flow rather than in any single component. A modal that traps focus, a toast that disappears before a screen reader reaches it, a multi step form that resets on error: none of those show up in one file. Do the keyboard run through yourself, end to end, before you trust any audit.",
          },
          build: {
            artefact:
              "An accessibility pass on one real flow of your Level 04 product, with the fixes shipped and the checklist added to your definition of done.",
            steps: [
              {
                do: "Unplug the mouse. Complete your main flow using only the keyboard. Write down every point where you get stuck or cannot see where you are.",
              },
              {
                do: "Turn on the screen reader your operating system already has and do it again with the screen off for at least one step.",
                hint: "VoiceOver on macOS and iOS, Narrator on Windows, TalkBack on Android. Ten minutes here finds more than any automated tool.",
              },
              {
                do: "Run an automated checker for contrast and labels, and treat its output as the floor rather than the list.",
              },
              { do: "Fix the blocking issues. Ship them. A blocking issue is one where the task cannot be completed at all." },
              {
                do: "Add the six checks to your pull request template so the next feature does not reintroduce them.",
              },
            ],
            tools: ["Your OS screen reader", "axe DevTools or Lighthouse"],
          },
          check: [
            "Can you complete your main flow with the keyboard alone, and can you always see where focus is?",
            "What does the screen reader say when an error occurs, and is it enough to act on?",
            "Which six checks did you add to the pull request template?",
          ],
        },

        {
          slug: "data-you-hold",
          title: "What you owe a user whose data you hold",
          kind: "Concept",
          minutes: 55,
          hook: "Someone in growth suggests a public leaderboard of savings rates, anonymised, opt out. Sona holds every transaction of 60,000 people, and anonymised is doing a great deal of work in that sentence.",
          explain: {
            title: "Aggregate is not anonymous, and consent is not a checkbox",
            body: [
              "The first rule is that aggregation is a weaker protection than it feels. Combine a few coarse attributes and you have re identified a person: a postcode, a birth year and a job title is enough in many datasets. An anonymised feature becomes a personal data feature the moment somebody can point at a row and say that is my neighbour.",
              "The second rule is that consent has to be specific and current. Consent buried at signup for a use invented eighteen months later is not consent, whatever the terms say, and under most modern regimes it is not lawful either. The product question is simpler than the legal one: would this user be surprised. Surprise is the reliable early warning, and it costs nothing to check.",
              "The third rule is retention. Most products keep everything forever because deletion is work and storage is cheap. Every extra month of data you hold is a month of breach exposure for a benefit nobody has articulated. Ask what the retention period is for each data type and who decided it. Usually nobody did.",
              "Under GDPR and India's DPDP Act you owe specific things: a lawful basis, purpose limitation, the ability to get data out, and the ability to have it deleted. Those are the floor. The standard is that a user who read a plain description of everything you do with their data would keep using the product.",
            ],
          },
          case: {
            brand: "Strava",
            year: "2018",
            situation:
              "Strava published a global heatmap aggregating around a billion activities from its users, presented as anonymised and aggregated data with no individual identities attached.",
            what: "Analysts noticed that in sparsely populated areas the aggregate was effectively individual: routes traced the perimeters of military bases and forward operating sites, including facilities whose locations were not public, because the only people running there were personnel. The data was aggregated exactly as described. The inference it enabled had not been considered. Strava responded by simplifying its privacy settings and reviewing which features were on by default.",
            lesson:
              "The question is never only what the data says. It is what the data allows someone to infer in a context you did not model, and the answer changes with the density of the population you aggregated over.",
            sources: [
              {
                label: "ABC News, Strava heat map shows military bases and supply routes",
                url: "https://www.abc.net.au/news/science/2018-01-29/strava-heat-map-shows-military-bases-and-supply-routes/9369490",
              },
              {
                label: "TechCrunch, Strava to simplify privacy settings after exposing military bases",
                url: "https://techcrunch.com/2018/01/29/strava-simplify-privacy-options-review-features/",
              },
            ],
          },
          ai: {
            move: "Describe the proposed feature and the exact fields it exposes, then ask what could be inferred by combining them with data that is already public. It is good at generating inference chains, which is the part humans skip.",
            trap: "It reasons about the data you described and not about the data that is actually in your database. It will also default to a US legal framing and quote GDPR at you as though it were the only regime that exists. Give it your real schema, your real user geography and the actual population density of the smallest cohort you would publish.",
          },
          build: {
            artefact:
              "A data decision memo for one real feature: fields exposed, inferences possible, smallest safe cohort, retention period, and the recommendation.",
            steps: [
              { do: "List every field the feature exposes, including derived ones. Derived fields are where re identification usually enters." },
              {
                do: "Write three inference chains: what could someone work out by combining these fields with something public?",
              },
              {
                do: "Find the smallest cohort the feature would publish. If any cell in the output can be traced to fewer than a few dozen people, it is not aggregate.",
                hint: "Set a minimum cohort size and enforce it in the query, not in the design review. Design reviews are not present at 2am when someone adds a filter.",
              },
              { do: "Write the retention period for each data type and who agreed to it." },
              {
                do: "Write the recommendation, including the version of the feature you would be comfortable defending publicly.",
              },
            ],
          },
          check: [
            "What is the smallest cohort your feature would publish, and is that enforced in code?",
            "Which inference surprised you when you wrote it down?",
            "What is your retention period for the most sensitive field, and who decided it?",
          ],
        },
      ],
    },

    /* ================================================================ 7 */
    {
      slug: "career",
      n: "7",
      title: "Turning it into a career",
      summary:
        "Six levels of artefacts, a live product, and a hiring manager with ninety seconds. This chapter is the conversion step.",
      lessons: [
        {
          slug: "portfolio",
          title: "The portfolio that gets the call",
          kind: "Build",
          minutes: 70,
          legacy: "Module 11, Professional Persona, Module 24, Your PM Career",
          hook: "You have six capstones, a live product with real users, an eval suite and a launch readout. A hiring manager will give the whole thing ninety seconds, on a phone, between two meetings. Right now none of it is visible.",
          scene: {
            image: "/scenes/desk-day-one.webp",
            alt: "A desk with a laptop showing a portfolio page, a notebook of six project names, and a phone.",
            caption: "Everything you made in six levels, and a page that does not exist yet.",
            notes: [
              {
                from: "Maya, founder",
                text: "I read about forty applications last month. I opened three links. Two of them were dead and one was a PDF that would not load on my phone.",
              },
              {
                from: "Tom, design",
                text: "Do not build a fancy site. Build a fast one. I have never once been impressed by a portfolio animation and I have closed several because they were slow.",
              },
            ],
          },
          explain: {
            title: "Lead with the artefact, because that is the only thing that cannot be inherited",
            body: [
              "A CV describes what you were near. “Owned the roadmap for a platform team” could mean you set the strategy or that you kept the ticket board tidy, and the reader cannot tell. A working link is different in kind: it is the only claim on the page that could not have been produced by a team you happened to be standing next to.",
              "So the page is ordered by evidence. Live product first, with a link that opens. One case study second. Everything else third. Credentials last or not at all. Nobody reads to the bottom, so the bottom is where you put the things that do not matter.",
              "Speed and reachability beat design. A page that loads in a second on a phone and has a working link beats a beautiful one that does not, by a distance. Test it on a phone, on a bad connection, logged out, in an incognito window, because that is the exact condition under which it will be read.",
              "Numbers beat adjectives, and admitted mistakes beat both. A portfolio with one honest “this did not work and here is what I learned” is more credible than one where everything succeeded, because the reader has done this job and knows that everything succeeding is not what it looks like.",
            ],
          },
          ai: {
            move: "Give the model your six capstones and ask it to order them by what a hiring manager for a specific role would want to see first, then to write the one line description of each in that reader's language.",
            trap: "It writes portfolio prose. You will get “spearheaded a comprehensive discovery initiative that surfaced critical user insights”, which contains no information and reads as filler to anyone who has hired before. Ban a list of words up front, require every line to contain a number or a specific noun, and delete anything that could be said about any project.",
            prompt:
              "Here are six projects. For each, write one line of at most 20 words for a hiring manager. Every line must contain either a number or a specific artefact name. Do not use the words spearheaded, leveraged, comprehensive, robust, seamless, drove, or insights. If a project has no number, say so instead of filling the gap.",
          },
          build: {
            artefact:
              "A public portfolio page linking a working artefact from each of the six levels, loading fast on a phone.",
            steps: [
              { do: "Deploy the page. You learned how in Level 04, so use the shortest path you know and spend the time on content." },
              {
                do: "Put the live product at the top with a link that opens in one click and does not require a login.",
                hint: "If it needs an account, make a demo account and put the credentials on the page. A hiring manager will not sign up.",
              },
              { do: "Link one artefact from every level. Check every link in an incognito window on a phone." },
              { do: "Write one line per project. Numbers or specific nouns only." },
              {
                do: "Cut the page by a third. Then rewrite your CV and profile around shipped work rather than responsibilities.",
              },
            ],
            tools: ["Next.js and Vercel, or Framer", "Your own domain if you have one"],
          },
          check: [
            "Can a hiring manager reach a working artefact in one click, from a phone, logged out?",
            "How fast does the page load on a mobile connection?",
            "Is there a number on the page, and is it yours?",
          ],
        },

        {
          slug: "case-study",
          title: "The case study format that gets read",
          kind: "Build",
          minutes: 60,
          hook: "Your build log for the assistant is 40 pages of decisions, dead ends and Slack threads. The case study has to be one page, and the interesting parts are all in the dead ends.",
          explain: {
            title: "Problem, evidence, decision, outcome, and the one you got wrong",
            body: [
              "The structure is fixed because the reader is skimming and needs to know where they are. What was the problem, and for whom. What evidence did you have, with a number or a quote. What did you decide, and what did you decide against. What happened, including the number afterwards. And what you would do differently, specifically.",
              "The trade off section is what separates a case study from a project description. Anybody can list what they built. Naming what you chose not to build, and why, is the part that shows judgement, because it proves there was a decision rather than a task list.",
              "Numbers everywhere, adjectives nowhere. “Retention went from 18 to 24 percent over six weeks, measured on the day 14 cohort” is a sentence a hiring manager can interrogate, which is exactly why it is worth ten of “dramatically improved retention”. If you have no number, say what you would have measured and why you could not, which is itself an answer.",
              "Include one thing you got wrong, with what it cost. This is not humility as a performance. It is the single fastest way to establish that the rest of the document is honest, and interviewers ask about it more than anything else on the page.",
            ],
            diagram: "signal-to-claim",
            caption:
              "The same move as Level 01, run over your own build log. Forty pages, four decisions, one claim.",
            points: [
              {
                term: "The log",
                def: "Everything that happened. Unstructured, mostly noise, and the only honest source you have.",
              },
              {
                term: "The decisions",
                def: "Three or four real forks with a reason attached. Everything else was execution.",
              },
              {
                term: "The claim",
                def: "One sentence about what you are good at, that the rest of the page proves.",
              },
            ],
          },
          ai: {
            move: "Paste the raw build log, the commit history and the launch readout, and ask the model to extract every decision point where a real alternative existed, with the option not taken.",
            trap: "Ask it to write the case study and it produces impact adjectives with no numbers, and it invents smooth causation: “this insight led directly to a 40 percent lift”. Real work does not have that shape and hiring managers know it. Make it produce the decision table first, with a blank cell wherever there is no number, and write the prose yourself. Blank cells are information.",
            prompt:
              "Here is a raw build log. Extract every point where a real alternative existed. Return a table: decision, option taken, option rejected, reason, outcome, number if one exists. Leave the number cell empty if there is no measurement in the log. Do not write any prose and do not summarise.",
          },
          build: {
            artefact:
              "One case study of about 600 words, in the five part format, with real numbers and one admitted mistake.",
            steps: [
              { do: "Extract the decision table from your build log. Expect three or four real decisions out of forty pages." },
              { do: "Write the problem in two sentences, with who it hurt and how many." },
              { do: "Write the evidence with one number and one verbatim quote." },
              {
                do: "Write the decision and the rejected alternative. The rejected one gets equal space.",
                hint: "If you cannot name a rejected alternative, you have described a task rather than a decision. Go back to the log.",
              },
              { do: "Write the outcome with the real number, including if it was flat or negative." },
              { do: "Write the mistake, what it cost, and what you changed as a result." },
            ],
          },
          solution: {
            summary:
              "Forty pages of log yield four decisions, and the strongest paragraph in the finished piece is the one about the decision that failed.",
            walkthrough: [
              "Scan the log for forks: places where two people disagreed, where you changed direction, or where something was cut. Those are the decisions. Everything between them is execution.",
              "For the assistant, the four are: what the assistant is allowed to answer, retrieval design, the confidence threshold for showing an answer at all, and staged rollout gating.",
              "Pick the one with the clearest number attached. The confidence threshold has eval scores on both sides of it, so it carries the case study.",
              "The rejected alternative was answering everything and adding a disclaimer, which the eval suite said would produce a wrong answer about a real balance roughly one time in twelve.",
              "The mistake goes last and it is real: you shipped without a support macro for wrong answers and Priya absorbed 60 tickets in a week. What changed is that the internal launch pack is now on the checklist.",
            ],
            example: {
              label: "The outcome paragraph of a case study that got a reply",
              body: "Account connection moved from 38 to 47 percent over five weeks, measured on the day 7 cohort. The assistant itself did not move retention for existing users at all, which I did not expect and which the write up says plainly. I was wrong about who this was for: it turned out to be an onboarding feature, and we moved it there in the following cycle.",
            },
          },
          check: [
            "Does every claim in your case study have a number or a quote behind it?",
            "What alternative did you reject, and does it get real space on the page?",
            "What did you get wrong, and what did it cost?",
          ],
        },

        {
          slug: "interview-loop",
          title: "The loop: product sense, execution, analytics, take home",
          kind: "Simulation",
          minutes: 70,
          legacy: "Module 24, Your PM Career",
          hook: "Four interviews in one day, each testing something different, each with an interviewer who has done this hundreds of times and will know within four minutes whether you have actually shipped anything.",
          explain: {
            title: "Four rounds, four different things being measured",
            body: [
              "Product sense asks whether you can go from a vague prompt to a defensible recommendation. They are not testing your idea, they are testing whether you pick a user, state a goal, generate options, choose one with a reason, and name how you would know. Say the structure out loud as you use it. The interviewer is taking notes against a rubric and you want them to be able to find things.",
              "Execution asks what you do when it is going wrong. Scope cuts, dependencies, a launch that slips, an engineer who disagrees. The answer they want is a sequence of concrete moves with trade offs named, not a philosophy of leadership.",
              "Analytics asks whether you can be trusted with a number. Expect a metric to move and a why. The strong answer starts by asking what changed in the population and the instrumentation before it reaches for a product explanation, which is exactly the drill you ran in chapter 3.",
              "The take home is judged on judgement, not on volume. Most candidates submit too much. A tight three pages with a stated assumption, a clear recommendation and an explicit list of what you did not have time to do beats twelve pages of framework. And in every round, the strongest single move available to you is to use your own shipped work as the example, because it is the one thing the other candidates do not have.",
            ],
          },
          case: {
            brand: "Google and structured interviewing",
            situation:
              "Google, having hired at very large scale, published what it learned about interviewing through its re:Work programme.",
            what: "The material makes an unglamorous point: unstructured interviews predict job performance poorly, and the fix is a structured process where every candidate gets the same questions, scored against a written rubric on defined attributes. Interviewers are trained on the rubric. The intuition of an experienced interviewer, on its own, is a weak signal.",
            lesson:
              "You are usually being scored against a rubric rather than judged on rapport. That is good news: it means the structure of your answer is visible and rewarded, and that saying your structure out loud helps the person scoring you.",
            sources: [
              {
                label: "Google re:Work, use structured interviewing",
                url: "https://rework.withgoogle.com/intl/en/guides/hiring-use-structured-interviewing",
              },
            ],
          },
          ai: {
            move: "Run mock interviews. Give the model the role, the company stage, the round type and a rubric, and have it interview you, interrupt you, and then score you against the rubric with the specific sentence that lost each point.",
            trap: "It is far too easy on you. Left alone it praises your structure, accepts vague answers, and awards a strong hire on an answer that would have ended a real loop. It also never interrupts, and real interviewers interrupt constantly. Instruct it to challenge every unsupported claim, to demand a number whenever you say “significantly” or “a lot”, and to score strictly with a written justification for every point deducted. If you get a strong hire on the first attempt, the simulation is broken rather than you being ready.",
            prompt:
              "You are interviewing me for a senior PM role at a Series B fintech. This is the product sense round. Interrupt me within 30 seconds if I have not named a user and a goal. Demand a specific number every time I use a vague quantifier. Do not encourage me. At the end, score me on structure, user insight, prioritisation and communication out of 4 each, and quote the exact sentence that lost each point. Assume a strict bar: most candidates do not pass.",
          },
          build: {
            artefact:
              "Four recorded mock rounds with written scores, and a revised answer for the weakest one.",
            steps: [
              { do: "Write your two minute background answer. It ends with the artefact, not with the chronology." },
              {
                do: "Run one mock of each round type. Record all four. Recording is the point, because you will not remember what you actually said.",
              },
              {
                do: "For the analytics round, use a real metric movement from your own launch. You have one, and using it changes the conversation.",
              },
              {
                do: "Do the take home in the stated time, and write the “what I did not do and why” section first.",
                hint: "The constraints section is where judgement is visible. Candidates who blow past the time limit are demonstrating the opposite of the thing being tested.",
              },
              { do: "Rerun your weakest round after rewriting the answer. Compare the two recordings." },
            ],
            tools: ["Claude or ChatGPT", "Loom or QuickTime"],
          },
          check: [
            "Which round scored lowest, and what exact sentence lost the point?",
            "Did you use your own shipped work as the example in at least two rounds?",
            "Did the mock interviewer ever interrupt you, and if not, did you fix the prompt?",
          ],
        },

        {
          slug: "the-offer",
          title: "Negotiating without bluffing",
          kind: "Simulation",
          minutes: 45,
          hook: "The offer arrives. It is 15 percent below what you expected, the recruiter is friendly, and there is a sentence about how they stretched to get it approved. You have eight days and no other offer.",
          explain: {
            title: "Ask, justify, and never invent a competing offer",
            body: [
              "Almost every offer has room, and the room is not usually in base salary. Equity, sign on, start date, title, level, and review timing are all separately negotiable and several of them cost the company less than base does. Asking for the wrong lever is the most common way people leave money on the table while feeling that they tried.",
              "Justify with market data and with what you bring, in that order. Public compensation data exists, and levelling frameworks are published by a surprising number of companies. A request anchored to a published range and to a specific thing you can do reads as professional. A request anchored to what you need reads as a personal problem, which nobody can approve.",
              "Never invent a competing offer. It is the only unrecoverable move in this conversation, recruiters talk to each other, and the industry is smaller than it looks. “I am interviewing elsewhere and this is my range” is true, sufficient and safe. Bluffing gains you a few percent at the risk of everything.",
              "And get the level right before you get the number right. Level determines your band, your scope, your next promotion and your salary for the next three years. A candidate who negotiates 8 percent onto the wrong level has negotiated badly.",
            ],
          },
          case: {
            brand: "Buffer",
            situation:
              "Most compensation conversations happen with a large information asymmetry: the company knows the range and the candidate is guessing.",
            what: "Buffer publishes its salary formula and its individual salaries openly, and has done for over a decade. The formula makes the inputs explicit, so the conversation moves from what someone can extract to what role and level the person is at, which is a question with an answer. Buffer's own published reflections note that it also removed a category of negotiation entirely, which advantaged people who negotiate less aggressively.",
            lesson:
              "The asymmetry, not your nerve, is what usually determines the number. Anything that reduces the asymmetry, published bands, levelling frameworks, public salary data, is worth more than any negotiation tactic.",
            sources: [
              {
                label: "Buffer, transparent salaries",
                url: "https://buffer.com/salaries",
              },
              {
                label: "Buffer, the salary formula",
                url: "https://buffer.com/resources/salary-formula/",
              },
            ],
          },
          ai: {
            move: "Rehearse the call against a recruiter who is warm, professional, and holds a real budget ceiling. Practise the pause after you state a number, because that pause is the whole negotiation and it is uncomfortable enough that most people fill it.",
            trap: "The simulated recruiter caves immediately and gives you everything, which teaches you nothing except that you are good at this. Give it an explicit budget ceiling and instruct it to use the standard moves: appeals to internal equity, the exploding deadline, and “this is the best we can do” said early and untruthfully. If it agrees to your first number, restart with a lower ceiling.",
            prompt:
              "You are a recruiter at a Series B company. Your ceiling is 12 percent above the offer on the table and you are instructed not to reveal it. Use internal equity, budget approval and a deadline as pressure. Be warm and professional throughout. Do not accept my first number, and do not concede more than 4 percent without a justification tied to level or market data.",
          },
          build: {
            artefact:
              "A written negotiation plan: your number, your justification, your three non salary asks, and your walk away point.",
            steps: [
              { do: "Research the range for the level and location. Write down the source for each figure." },
              {
                do: "Decide the level question first. If you think the level is wrong, raise it before any number is discussed.",
              },
              {
                do: "Write your number and the two sentences of justification. Then write the three non salary asks in priority order.",
                hint: "Sign on bonuses are the easiest yes in most companies, because they do not affect the band or anyone else's equity.",
              },
              { do: "Write your walk away point and the sentence you will use if you reach it." },
              {
                do: "Run the call three times. Count how long you leave the silence after stating your number.",
              },
            ],
          },
          check: [
            "What is your number, and can you cite where the range came from?",
            "Which three non salary levers did you ask for, and in what order?",
            "Did you leave the silence, or did you negotiate against yourself?",
          ],
        },

        {
          slug: "first-ninety-days",
          title: "The first ninety days",
          kind: "Build",
          minutes: 55,
          hook: "Day one at the new company. You have credibility you did not earn and it expires in about six weeks. What you do with it determines the next two years.",
          explain: {
            title: "Learn, then ship something small, then change something that matters",
            body: [
              "The first thirty days are for learning, and the specific thing to learn is not the product. It is the decision making: who actually decides, what the last three big calls were and why, which numbers people trust, and which parts of the roadmap are load bearing promises to a customer. Read the last six months of decision documents before you read the codebase.",
              "The second thirty days are for shipping something small and real. Not a strategy document. A fix, a cut, a clarified metric definition, something that visibly improves someone's week. It buys you the right to be listened to on the larger thing, and it tells you how the machine actually works, which no amount of asking will.",
              "The third thirty days are for one change that matters, chosen because of what you learned in the first sixty rather than what you believed on day one. Write it down, with the evidence, and put your name on it.",
              "Two traps. The first is arriving with the answer from your last company and applying it to a context you have not understood yet. The second is the opposite: waiting so long to have an opinion that people conclude you do not have any. Ninety days is roughly the width of the window between those two failures.",
            ],
          },
          case: {
            brand: "Microsoft",
            year: "2014",
            situation:
              "Satya Nadella took over as chief executive of a company with an entrenched strategy, a famously combative internal culture, and a widely held view that its best years were behind it.",
            what: "His first message to employees did not announce a reorganisation or a strategy. It set out how he intended to work and what he believed the company was for, and he spent his early period listening across the organisation before the large strategic moves became public. The structural changes came later and were built on that period.",
            lesson:
              "Even with maximum authority, the first move was to establish a way of working and to learn. If that is the right sequence when you can order anyone to do anything, it is certainly the right sequence when you cannot.",
            sources: [
              {
                label: "Satya Nadella's email to employees on his first day as CEO",
                url: "https://news.microsoft.com/source/2014/02/04/satya-nadella-email-to-employees-on-first-day-as-ceo/",
              },
            ],
          },
          ai: {
            move: "Have the model generate your listening tour question set from the company's public materials and the job description, then group the answers you collect and look for the places where two people describe the same decision differently.",
            trap: "It generates questions that make you sound like a consultant: “what does success look like in this role”, asked of eleven people who will all give you the same non answer. Ask it instead for questions about specific past events, which is the same discipline as user interviews from Level 01. What was the last thing this team cancelled, and who decided.",
          },
          build: {
            artefact:
              "A ninety day plan with named people, a shipped small thing by day 60, and one written proposal by day 90.",
            steps: [
              { do: "List the twelve people to talk to in the first three weeks, including two outside product and one who left recently if you can reach them." },
              {
                do: "Write the past focused question set. Ten questions, all about specific things that already happened.",
              },
              {
                do: "Pick the small shippable thing by the end of week four, with the criterion that somebody would notice if it disappeared.",
              },
              {
                do: "Keep a disagreement log from day one: every time your instinct differs from what the company does, write both down.",
                hint: "Review it at day 60. Half of your day one instincts will look naive and half will be the reason they hired you. You cannot tell which is which on day one, and you can at day 60.",
              },
              { do: "Write the day 90 proposal from the log and the evidence, not from your first impressions." },
            ],
          },
          check: [
            "Who are the twelve people, and how many are outside product?",
            "What did you ship by day 60, and would anyone notice if it vanished?",
            "Which day one instinct did your disagreement log prove wrong?",
          ],
        },

        {
          slug: "senior-pm",
          title: "What changes between a PM and a senior one",
          kind: "Concept",
          minutes: 45,
          hook: "You are doing the job well and the promotion has not come. Nobody can tell you exactly what is missing, which usually means it is not a skill, it is a scope.",
          explain: {
            title: "Same craft, different unit of work",
            body: [
              "A product manager is handed a problem and produces a good decision. A senior product manager is handed an ambiguous area and produces the problem, then the decision, then the argument that convinces other teams to change what they are doing. The craft is identical. The unit of work is larger and, crucially, less defined at the start.",
              "The three things that actually separate them, in most published frameworks and in most promotion conversations: ambiguity, blast radius, and whether other people get better. Can you operate where nobody has framed the question. Does your work affect teams you do not sit in. Do the people around you produce better work because of how you operate, in a way that persists when you leave.",
              "Which means the promotion is usually not earned by doing more. It is earned by taking on something nobody had scoped, and by making a decision that other teams have to live with and can defend. Both of those are available to you before the title, and taking them is the normal route to it.",
              "Read the public frameworks rather than guessing. A number of companies publish their progression frameworks in full, and the language in them is remarkably consistent. It is also the language your manager will use in the calibration meeting you are not in, which makes it worth borrowing when you write your own case.",
            ],
          },
          case: {
            brand: "Public progression frameworks",
            situation:
              "Career ladders were historically internal documents, which meant most people were being measured against criteria they had never read.",
            what: "A number of companies now publish their progression frameworks in full, and progression.fyi collects them in one place. Reading several side by side shows how consistent the senior transition is across very different companies: the shift is from executing well inside a defined problem to defining the problem, and from individual output to multiplying the output of others.",
            lesson:
              "The criteria you are judged against are usually written down somewhere, and often published by a company very like yours. Read three of them before your next review and write your own case in their language.",
            sources: [
              {
                label: "progression.fyi, public career frameworks",
                url: "https://progression.fyi/",
              },
            ],
          },
          ai: {
            move: "Paste three published frameworks and your last six months of work, and ask which specific criteria your evidence supports, which it does not, and what the smallest piece of work would be that closes the largest gap.",
            trap: "It grades you generously and describes gaps in soft language, so you finish the exercise feeling ready and having learned nothing. Ask it to argue the case against your promotion, using only the evidence you provided, as a sceptical calibration committee member would. That version is the one worth reading.",
          },
          build: {
            artefact:
              "A written promotion case against three published frameworks, with the gap named and the next piece of work chosen to close it.",
            steps: [
              { do: "Read three published progression frameworks. Note where they agree, because that is the real definition." },
              {
                do: "Map your last six months of work onto the criteria. Use artefacts as evidence, not descriptions.",
              },
              {
                do: "Find the largest gap. It is usually ambiguity or blast radius rather than execution.",
              },
              {
                do: "Choose one piece of work that would close it, and get it agreed with your manager before you start.",
                hint: "An unscoped area nobody owns is the cheapest available source of both ambiguity and blast radius, and there is one at every company.",
              },
              { do: "Write the case in the framework's own language and give it to your manager before the review cycle, not during it." },
            ],
          },
          check: [
            "Which criterion does your evidence not support?",
            "What is the ambiguous area you have taken on, and who else knows you have?",
            "Whose work is better because of how you operate, and could they say why?",
          ],
        },
      ],
    },
  ],
};
