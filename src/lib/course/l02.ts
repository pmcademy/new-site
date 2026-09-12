import type { Level } from "./types";

/**
 * LEVEL 02. Practitioner
 *
 * Rebuilt from the original modules 4 (Product Market Fit), 7 (Product
 * Discovery) and 10 (Product Validation). The old version taught research
 * methods. This one makes you run them at a volume that used to need a team,
 * and makes you catch the model every time it smooths the evidence away.
 */
export const l02: Level = {
  slug: "02",
  n: "02",
  rank: "Practitioner",
  badge: "Signal Hunter",
  title: "Discovery & Product-Market Fit",
  promise:
    "Find problems worth solving in a product that already has users, and prove one of them before anyone writes code.",
  arc: "Sona has 40,000 users, a roadmap that is a wishlist, and a board meeting in eight weeks. Maya wants to know whether the product actually fits anyone. Your job this level is to replace opinion with evidence, at a volume nobody could process by hand two years ago, and then to bet on one thing in writing.",
  scene: {
    image: "/img/scenes/domain-fintech.webp",
    alt: "A wall of screens showing Sona's support queue, app store reviews and a cohort table nobody has read.",
    caption:
      "Everything you need is already in the building. None of it has been read.",
  },
  who: "You can write a decent brief, but your evidence is thin and you know it.",
  outcomes: [
    "Recruit and interview strangers about their past behaviour, without leading them",
    "Build a reusable extraction pipeline that turns thousands of tickets, calls and reviews into rows you can count",
    "Tell the difference between what users say and what they do, and know which one to build for",
    "Measure product-market fit honestly, by segment, and say out loud when you do not have it",
    "Run one experiment that could have failed, and write down what would change your mind before you run it",
  ],
  capstone: {
    title: "The discovery pack",
    body: "One pack that someone else could act on without you in the room: the evidence log, the problems ranked with counts, the single problem you would bet the quarter on, the cheapest test that could kill it, and the list of what you decided not to build with the criteria that would revive each item.",
    ship: [
      "An evidence log of 200 or more coded rows, every one carrying its verbatim quote",
      "Three recorded interviews and five watched sessions, with a synthesis",
      "An opportunity solution tree with evidence counts on every node",
      "A pre-registered test of your top bet, and a kill list with revival criteria",
    ],
  },

  chapters: [
    /* ================================================================ 1 */
    {
      slug: "finding-people",
      n: "1",
      title: "Finding people worth talking to",
      summary:
        "Most bad research is a sampling problem wearing a methodology costume. Who you talk to decides what you find.",
      lessons: [
        {
          slug: "who-to-talk-to",
          title: "Who you actually need to talk to",
          kind: "Concept",
          minutes: 45,
          hook: "Maya says go talk to users, and forwards you a list of the ten friendliest customers Sona has. Every one of them loves the product. It is Tuesday and you have already noticed the problem with that list.",
          scene: {
            image: "/img/scenes/office-wide.webp",
            alt: "The Sona office, mid morning, with a whiteboard listing customer names and a sales dashboard on the far screen.",
            caption: "The names on the whiteboard are the ones who reply.",
            notes: [
              {
                from: "Maya, founder",
                text: "Sent you our ten best customers. They will all take a call. Please do not email anyone on the churn list, it looks desperate.",
              },
              {
                from: "Priya, support",
                text: "The people you want are the ones who wrote in twice and then went quiet. I can pull those.",
              },
              {
                from: "Ana, data",
                text: "Heads up, 61 percent of accounts have never connected a bank. Your ten favourites all have three.",
              },
            ],
          },
          explain: {
            title: "Your sample is your answer",
            body: [
              "The people easiest to reach are the people least like the ones you are losing. Happy, engaged, responsive customers are a sample of survivors. They can tell you why the product works. They cannot tell you why it does not.",
              "Three groups carry almost all of the information. People who just started using it, because the friction is still fresh and they can still remember being confused. People who tried it and stopped, because they have already made a judgement and will tell you. And people who are in the middle of the problem right now and are solving it some other way, because they are the ones who show you the real competition.",
              "Non-users are the hardest group to reach and usually the most valuable. Everyone who already uses your product has, by definition, already accepted its worst compromise. The person who refused is the one who can name it.",
            ],
          },
          case: {
            brand: "Stripe",
            year: "2010",
            situation:
              "Two founders with a payments API and no customers, in a market where the incumbent onboarding process took weeks.",
            what: "Rather than ask people whether they would try it, the Collison brothers asked for the laptop. When someone said they might sign up later, they offered to set it up there and then and did it on the spot. Paul Graham later named the practice the Collison installation. Every one of those sessions was also an unstructured usability test with the founders watching.",
            lesson:
              "The recruiting problem and the research problem are the same problem. Go where the person already is, remove every step between interest and doing, and watch what happens in the gap.",
            sources: [
              {
                label: "Paul Graham, Do Things that Don't Scale",
                url: "http://paulgraham.com/ds.html",
              },
            ],
          },
          ai: {
            move: "Give a model your fuzzy target, something like users who struggle to keep track of spending, and ask it to convert that into screening criteria that can be checked against data you actually hold.",
            trap: "It hands back attitudinal criteria: users who value financial control, users who feel anxious about money. Nobody can be screened on those, so your screener admits everyone and your sample is whoever answered. Force it: every criterion must be a fact about the last 30 days that the person can state or your database can confirm.",
            prompt:
              "Turn this target group into 6 screening criteria. Each criterion must be an observable fact about behaviour in the last 30 days, checkable either from a database field or from a single factual question. Reject any criterion about attitudes, values or feelings, and say why you rejected it.",
          },
          build: {
            artefact:
              "A sampling frame: three named groups, an estimated count for each, and the route to reach them.",
            steps: [
              {
                do: "Write the question you are trying to answer in one sentence, before you name a single group.",
              },
              {
                do: "Define three groups: recent starters, people who stopped, and non-users solving the problem another way.",
              },
              {
                do: "For each group, write the observable criterion that gets someone in, and the count you expect to find.",
                hint: "If you cannot say roughly how many people are in the group, you do not have a criterion yet, you have a mood.",
              },
              {
                do: "Write the route to each group: which export, which channel, which person inside the company owns the list.",
              },
              {
                do: "Name the group you will not reach, and write one line on how that biases anything you conclude.",
              },
            ],
          },
          solution: {
            summary:
              "The ten friendly customers are one group out of three, and the smallest one. The frame that produces new information is built around the accounts that went quiet.",
            walkthrough: [
              "Start from the question. If it is why do people not connect a bank account, then every person on Maya's list is disqualified, because all of them did.",
              "Group one: signed up in the last 14 days and has not connected an account. Reachable by email, high volume, freshest memory.",
              "Group two: connected an account, then no session for 30 days. Reachable, will be blunt, and is where the churn reason lives.",
              "Group three: people using a spreadsheet or a bank app instead. Not in your database at all. Reachable only in the places they already gather, which is a subreddit or a WhatsApp group, not your mailing list.",
              "Write the bias line honestly: you will not reach the people who deleted the app in week one and never opened another email. Anything you conclude about first-week failure is missing them.",
            ],
            example: {
              label: "One row of a usable sampling frame",
              body: "Group: stalled starters. Criterion: signed up 7 to 21 days ago, zero bank connections, opened the app at least twice. Estimated count: 1,900. Route: Priya's onboarding email list, segment by connection status. Risk: over-represents people who still read email from us.",
            },
          },
          check: [
            "For each of your three groups, what observable fact gets someone in?",
            "Which group can you not reach, and what does that break in your conclusions?",
          ],
        },

        {
          slug: "recruiting-without-a-panel",
          title: "Getting strangers to talk to you",
          kind: "Build",
          minutes: 50,
          hook: "You need six conversations by Friday. You have no research panel, no budget for incentives, and a founder who is nervous about you emailing customers directly.",
          explain: {
            title: "Recruiting is a funnel, so treat it like one",
            body: [
              "Reached, replied, screened in, booked, showed up. Every stage loses people, and the loss compounds the same way any other funnel does. Which means you do not send six invitations to get six interviews, and the fastest way to be short on Friday is to have discovered that on Thursday.",
              "The screener is the part everyone gets wrong. Its job is to filter for people who had the problem recently, without telling them which answer gets them the slot. The moment a candidate can see what you want, your incentive has taught them to lie, politely.",
              "And the best incentive is usually not money. Offering to share what you learn attracts people who care about the problem and repels people who are farming gift cards. Money is a fine backup, and it changes who says yes.",
            ],
            diagram: "funnel",
            caption:
              "Every stage has a rate. The one that kills most research weeks is the last one.",
            points: [
              {
                term: "Reached",
                def: "How many people saw the ask at all. Channel choice lives here, not persuasion.",
              },
              {
                term: "Screened in",
                def: "How many actually had the problem recently. A screener that passes everyone has no rate.",
              },
              {
                term: "Showed up",
                def: "The stage nobody plans for. Confirm the day before and overbook on purpose.",
              },
            ],
          },
          case: {
            brand: "GitLab",
            situation:
              "GitLab runs almost entirely in public, including how it recruits research participants and what its researchers are allowed to ask.",
            what: "The public handbook documents the participant panel, the incentive policy, the screener templates, and the rule that research is scheduled continuously rather than commissioned per project. Anyone can read the process, which also means anyone inside the company can run it without asking permission first.",
            lesson:
              "Recruiting becomes cheap when it is infrastructure rather than a favour. A standing panel and a written screener template turn a two week scramble into a two day task.",
            sources: [
              {
                label: "GitLab handbook, UX research",
                url: "https://handbook.gitlab.com/handbook/product/ux/ux-research/",
              },
            ],
          },
          ai: {
            move: "Have a model draft five variants of your outreach message for five different channels, and a first draft of the screener.",
            trap: "The screeners it writes telegraph the answer. Do you struggle to keep track of your spending gets a yes from everyone who wants the slot. And its outreach reads like marketing copy, product name in the subject line, benefit statement in line one, which is exactly the pattern people have learned to delete. Rewrite the subject line as a human would type it, and make every screener question factual.",
            prompt:
              "Rewrite each screener question so it asks about a specific event in the last 30 days and cannot be answered correctly by guessing what I want to hear. Then list which of my original questions revealed the answer I was hoping for.",
          },
          build: {
            artefact:
              "A screener, an outreach message per channel, and at least four booked slots in a calendar.",
            steps: [
              { do: "Write a five question screener. Every question is about a specific event in the last 30 days." },
              {
                do: "Run the leading-question audit and rewrite every question that reveals the answer you want.",
              },
              {
                do: "Write outreach for three channels where your group already is, not three channels you already own.",
                hint: "A subreddit, a Discord, a niche newsletter, the comment section under a competitor's changelog. Ask the moderators first.",
              },
              {
                do: "Book more slots than you need and confirm each one the day before with a one line message.",
              },
              {
                do: "Track the funnel: reached, replied, screened in, booked, showed. Write the rate at each stage.",
              },
            ],
            tools: ["Calendly or Cal.com", "Google Forms or Tally"],
          },
          solution: {
            summary:
              "Six interviews needs roughly a hundred people reached, and the screener does most of the work by rejecting people rather than by finding them.",
            walkthrough: [
              "Work backwards from the number you need. If you want six conversations, book nine, because confirmed slots still evaporate.",
              "To book nine you need roughly fifteen people who screen in, because scheduling is where enthusiasm dies.",
              "Your screen-in rate is the number to watch. If it is above 80 percent your screener is not filtering anything, and you are about to interview a random sample of people who like answering surveys.",
              "Post where the problem is discussed rather than where your product is discussed. The two are almost never the same place, and the second one only contains users.",
              "Confirm the day before. This single message is worth more than any incentive you can afford.",
            ],
            example: {
              label: "A screener question that filters, and its broken twin",
              body: "Broken: do you find it hard to track spending across multiple accounts? Working: think about the last time you checked how much you had spent this month. When was that, and what did you open to find out?",
            },
          },
          check: [
            "What was your screen-in rate, and is it low enough that the screener is doing work?",
            "Which channel produced the people who actually had the problem, and which produced volume?",
          ],
        },

        {
          slug: "research-cadence",
          title: "A habit, not a project",
          kind: "Workshop",
          minutes: 45,
          hook: "The research you did in March is already stale, and the team has started saying users want as if it were a fact rather than a memory of six conversations.",
          explain: {
            title: "One hour a week beats one project a quarter",
            body: [
              "Discovery done as a project produces a document that decays. Discovery done as a rhythm produces a team that has heard a user complain this week, which changes arguments in a way no document does.",
              "The unit is one hour a week: one or two conversations, booked in advance, with at least one engineer or designer watching live rather than reading notes. Watching live is the entire point. Nobody has ever changed their mind because of a bullet in a research summary.",
              "Protect it by booking the slots before you have the participants. An empty recurring slot gets filled. A slot you create only when research is ready never happens, because research is never ready.",
            ],
          },
          case: {
            brand: "UK Government Digital Service",
            situation:
              "GDS had to make hundreds of separate teams, across departments with no shared research function, do user research on services used by everyone in the country.",
            what: "The Service Standard makes ongoing user research a condition of a service being allowed to launch and to continue, rather than a phase at the start. The service manual specifies that research runs throughout, that the whole team observes sessions, and that teams include people who struggle with digital services at all.",
            lesson:
              "Making research continuous and observable by the team is a structural choice, not a discipline one. The teams that keep doing it are the ones where the slot exists whether or not anyone feels like it.",
            sources: [
              {
                label: "GOV.UK Service Manual, user research",
                url: "https://www.gov.uk/service-manual/user-research",
              },
              {
                label: "GDS user research blog",
                url: "https://userresearch.blog.gov.uk/",
              },
            ],
          },
          ai: {
            move: "Use a transcription model plus an extraction prompt to turn every session into rows in the same evidence log within an hour of the call ending, so the backlog never forms.",
            trap: "Automated notes quietly become the only artefact anyone reads, and attendance drops to you. Worse, diarisation is unreliable: the model attributes the interviewer's leading question to the participant, so your own hypothesis comes back to you a week later looking like a user quote. Spot check speaker labels on every session before the rows go in the log.",
          },
          build: {
            artefact:
              "A written research cadence, plus one week actually run against it.",
            steps: [
              { do: "Book a recurring weekly slot for the next six weeks before you have a single participant." },
              { do: "Name the standing recruitment source that fills it, and who owns filling it." },
              {
                do: "Write the two rules: who attends, and what gets logged within an hour of the call.",
                hint: "One engineer or designer per session, rotating. Attendance is the deliverable, not the notes.",
              },
              { do: "Run week one. Log the rows. Spot check the speaker labels." },
              { do: "Write the weekly snapshot in five lines and send it to the team." },
            ],
            tools: ["Zoom or Google Meet", "Otter or Whisper", "Google Sheets"],
          },
          check: [
            "Who outside the product team watched a session live this week?",
            "Did you find a misattributed speaker label, and what would it have done to your log?",
          ],
        },
      ],
    },

    /* ================================================================ 2 */
    {
      slug: "interviewing",
      n: "2",
      title: "Interviewing without leading",
      summary:
        "The skill is not asking questions. It is asking questions that do not tell people what you want to hear.",
      lessons: [
        {
          slug: "the-interview",
          title: "Ten conversations you do not have yet",
          kind: "Workshop",
          minutes: 70,
          legacy: "Module 3.5 Finding Users, Module 4.4 Interviewing Users",
          hook: "First call is at 11. You have a page of questions, a recorder you have not tested, and a strong opinion about what they are going to say.",
          scene: {
            image: "/img/scenes/desk-day-one.webp",
            alt: "A desk set up for a call: headphones, a notebook open to a list of questions, a laptop showing a waiting room.",
            caption: "Eleven o'clock. The waiting room is empty for another minute.",
            notes: [
              {
                from: "Tom, design",
                text: "Can I sit in on this one silently? I have never heard someone describe our onboarding out loud.",
              },
              {
                from: "Maya, founder",
                text: "Ask them if they would pay for the premium tier. That is the thing I actually need to know.",
              },
            ],
          },
          explain: {
            title: "Past behaviour over future intent",
            body: [
              "People are unreliable narrators of their future selves and reliable reporters of last Tuesday. So anchor every question in a specific recent event. Tell me about the last time this happened. What did you do. What happened next.",
              "Then ask about cost, in time, money, or a workaround they built. A workaround is the strongest signal in interviewing, because building one is expensive and nobody does it for a problem they do not have. If the answer to what did that cost you is nothing really, you have found a problem nobody will pay to solve, and that is a useful hour.",
              "Maya's question, would you pay for the premium tier, is unanswerable by anyone. The version that works is what did you pay for last, in this category, and what made you stop paying. The most valuable sentence in most interviews comes three seconds after you would normally start talking again. Count to five.",
            ],
            points: [
              {
                term: "The event",
                def: "A specific, dated thing that happened. Not a habit, not a general tendency.",
              },
              {
                term: "The workaround",
                def: "What they built or hacked to cope. Expensive to make, so it proves the problem is real.",
              },
              {
                term: "The cost",
                def: "Time, money, or embarrassment. If none of them, the problem is not one.",
              },
            ],
          },
          case: {
            brand: "Intercom",
            situation:
              "Intercom wanted to know why people bought their product, and the usual answers, feature comparisons and satisfaction scores, told them nothing they could build from.",
            what: "They switched to interviewing customers about the switch itself: what was happening the day you decided to look for something, what did you type into the search box, what were you using before, who else was in the room. The result was a timeline of a purchase rather than a list of preferences, and it changed both the product and the marketing copy, because they now had the customer's own words for the moment of the switch.",
            lesson:
              "Interview the event, not the person. A dated story about a decision is checkable. An opinion about a category is not.",
            sources: [
              {
                label: "Intercom on Jobs-to-be-Done",
                url: "https://www.intercom.com/resources/books/intercom-jobs-to-be-done",
              },
            ],
          },
          ai: {
            move: "Draft your guide, then have a model audit every question for leading bias and for asking about the future rather than the past.",
            trap: "It passes questions that are subtly leading because they are grammatically neutral. How important is speed to you presupposes that speed is a dimension the person thinks about. Ask specifically which of these questions presuppose that the problem exists, and it will find three you were proud of.",
            prompt:
              "Audit each interview question below. For each: is it about past behaviour or future intent, does it presuppose the problem exists, and does it invite a polite yes? Rewrite every failure as a question about a specific dated event.",
          },
          build: {
            artefact:
              "An interview guide and three recorded, transcribed conversations.",
            steps: [
              { do: "Write eight questions. Run the bias audit and rewrite the failures." },
              {
                do: "Write the first question you will actually ask, word for word, and make it about the last time.",
                hint: "The opening question sets the mode for the whole call. If it is abstract, the rest of the call is abstract.",
              },
              { do: "Run all three calls. Record them. Do not defend the product, even once." },
              {
                do: "After each call, write the single most surprising sentence you heard, verbatim, before you do anything else.",
              },
              { do: "Write one page: what surprised you, and which of your assumptions died." },
            ],
            tools: ["Zoom or Google Meet", "Otter or Whisper"],
          },
          solution: {
            summary:
              "A good interview is mostly the participant talking about one week of their life. If you spoke more than a quarter of the time, you ran a demo.",
            walkthrough: [
              "Open with the event. When was the last time you tried to work out where your money went this month. Now they are in a specific week rather than in general.",
              "Follow the sequence. What did you open first, what happened, what did you do then. You are reconstructing a timeline, and timelines contain the friction.",
              "When they mention a workaround, stop and mine it. A spreadsheet they maintain by hand is worth more than twenty minutes of opinions.",
              "Ask about cost once, plainly, and let the silence sit. People underclaim cost, then correct themselves upward if you wait.",
              "Never ask what would you like us to build. If they volunteer a feature, ask what they would do with it, and write down the underlying job rather than the feature.",
            ],
            example: {
              label: "Two openings",
              body: "Weak: how do you currently manage your budgeting? Strong: when was the last time you checked whether you had overspent, and what did you open to find out?",
            },
          },
          check: [
            "What fraction of the call was you talking? Check the transcript, do not estimate.",
            "Which assumption of yours died in these three conversations?",
          ],
          references: [
            { label: "The Mom Test", url: "https://www.momtestbook.com/" },
          ],
        },

        {
          slug: "leading-the-witness",
          title: "The questions that answer themselves",
          kind: "Drill",
          minutes: 40,
          hook: "Your guide has eight questions. Four of them will get a yes from any polite adult, regardless of whether the problem exists.",
          explain: {
            title: "Four ways a question answers itself",
            body: [
              "The hypothetical: would you use a feature that did X. Everyone says yes, because saying yes is free and imagining is pleasant. The compound: was it slow and confusing. They agree with the half that is true and you record both. The opinion: what do you think of our onboarding. They will be kind, because you are in the room. And the presupposing question: how important is speed to you, which has already decided that speed is a thing they think about.",
              "Each one has the same repair. Replace the hypothetical with a dated event. Split the compound. Replace the opinion with a behaviour. And test a presupposition by asking the open version first: what, if anything, slows you down here.",
              "The reason to drill this rather than read it is that you will not hear yourself doing it. Leading questions feel like efficiency in the moment. You already know the answer, so you shorten the path to it, and then you record your own hypothesis in the participant's voice.",
            ],
          },
          ai: {
            move: "Simulate a maximally agreeable participant. Give a model a persona whose instruction is to be polite and helpful, then run your guide at it and watch how many yeses you can collect for a product that does not exist.",
            trap: "The simulated participant invents specifics. It will name a competitor tool, quote a number of hours per week, describe a workflow in convincing detail, and none of it is data. People do quote these back in synthesis a week later. Mark every line from a simulation in a different colour and never let it into the evidence log.",
            prompt:
              "You are a polite person who has agreed to a 20 minute call and wants to be helpful. Answer my questions the way an agreeable participant would. Afterwards, list which of my questions you could have answered yes to without having the problem at all.",
          },
          build: {
            artefact:
              "A rewritten interview guide, plus the transcript of the agreeable simulation showing which questions were free yeses.",
            steps: [
              { do: "Classify each of your questions as hypothetical, compound, opinion, presupposing, or clean." },
              { do: "Run the agreeable simulation against the original guide. Count the yeses." },
              { do: "Rewrite every failure. Each rewrite must name a time window." },
              {
                do: "Run the simulation again against the rewritten guide.",
                hint: "A good guide makes the agreeable persona say I have not actually done that recently. That sentence is the whole point of a screener and a guide.",
              },
            ],
            tools: ["Claude or ChatGPT"],
          },
          solution: {
            summary:
              "The rewrite is mechanical once you can classify. The hard part is that the questions you like best are usually the presupposing ones.",
            walkthrough: [
              "Hypothetical: would you use automatic categorisation? Becomes: how are your transactions categorised today, and what did you do the last time one was wrong?",
              "Compound: was the setup slow and confusing? Becomes two questions. How long did setup take you, and where did you stop to work something out?",
              "Opinion: what do you think of the dashboard? Becomes: the last time you opened the app, what were you looking for, and did you find it?",
              "Presupposing: how important is accuracy? Becomes: tell me about the last time the number in the app did not match your bank.",
            ],
          },
          check: [
            "How many free yeses did your original guide collect from a persona with no problem?",
            "Which question did you keep even though it presupposes something, and why is that defensible?",
          ],
        },

        {
          slug: "the-transcript",
          title: "Reading a transcript for what is actually there",
          kind: "Build",
          minutes: 55,
          hook: "Three transcripts, roughly 12,000 words. The temptation is to ask for a summary. Do that and the finding disappears in the first paragraph.",
          explain: {
            title: "Code it, do not condense it",
            body: [
              "Coding a transcript means walking it line by line and pulling out rows: the verbatim sentence, what kind of thing it is, and your interpretation in a separate column that is clearly marked as yours. The separation matters more than the taxonomy. Six months later you will need to know which words were the user's.",
              "Four kinds of line are worth pulling. Facts, meaning something that happened with a time attached. Workarounds, meaning something they built or hacked. Costs, in hours or money or a relationship. And exact phrasings, meaning the words they use for the thing, which are almost never the words in your product.",
              "The last one is why paraphrase is expensive. A user saying it never remembers which card is which is a bug report, a naming problem and a piece of marketing copy at once. A model rewriting that as the user experienced difficulty distinguishing between payment methods has deleted all three.",
            ],
            diagram: "signal-to-claim",
            caption:
              "The quote column is the only column you cannot regenerate later.",
            points: [
              {
                term: "Verbatim",
                def: "Their exact sentence, copied. Never cleaned up, never shortened.",
              },
              {
                term: "Code",
                def: "Fact, workaround, cost or phrasing. Four buckets, applied consistently.",
              },
              {
                term: "Interpretation",
                def: "Your reading. In its own column, so a reader can disagree with you and still use the row.",
              },
            ],
          },
          ai: {
            move: "Transcribe with Whisper, then run an extraction prompt that returns one row per codable line with the sentence copied exactly.",
            trap: "This is the failure that costs the most and shows the least. Models smooth quotes into paraphrase by default, because fluent prose is what they are for. You get rows that read well, and the specific words, the ones with the product name wrong, the ones with the swearing, the ones with the odd metaphor, are gone. Diff ten of your rows against the transcript by hand. If any quote is not character for character present in the source, your prompt is broken and the whole run has to go again.",
            prompt:
              "Return one JSON object per codable line: {verbatim, code (FACT | WORKAROUND | COST | PHRASING), timestamp}. The verbatim field must be an exact substring of the transcript, including any grammatical errors, filler words and profanity. Do not clean, shorten or rephrase. If a line is worth coding but you cannot copy it exactly, skip it.",
          },
          build: {
            artefact:
              "A coded evidence log from three transcripts, at least 40 rows, every quote verifiable against the source.",
            steps: [
              { do: "Transcribe all three interviews with timestamps." },
              { do: "Run the extraction. Load the rows into a sheet with a source and timestamp column." },
              {
                do: "Verify ten random quotes against the transcript, character for character. Log how many failed.",
                hint: "Use a find on the transcript file. If the string is not there, the model wrote it, not the user.",
              },
              { do: "Add your interpretation column. Keep it in your own voice and clearly separate." },
              { do: "Pull out the five phrasings that differ most from your product's own vocabulary." },
            ],
            tools: ["Whisper or Otter", "Claude or ChatGPT", "Google Sheets"],
          },
          solution: {
            summary:
              "The vocabulary gap is usually the first real finding, and it is invisible in any summary.",
            walkthrough: [
              "Code first, interpret second. If you interpret while coding you will only pull the lines that support what you already think.",
              "Run the verbatim check before you do anything else with the rows. A broken run is cheap to redo and expensive to build on.",
              "Sort by code and read all the workarounds together. Three people maintaining the same spreadsheet is a product.",
              "Compare the phrasing rows against your interface copy. Sona calls it a linked account, all three participants called it my bank. That is a one line fix with a measurable effect on a funnel step.",
            ],
            example: {
              label: "Two rows from a working log",
              body: "FACT | 00:14:22 | \"I checked on Sunday night because I got a text saying I was near my overdraft.\" | Interpretation: the trigger is external, not the app. | PHRASING | 00:19:05 | \"it never remembers which card is which\" | Interpretation: card labels reset after re-auth. Also better copy than ours.",
            },
          },
          check: [
            "How many of your ten sampled quotes failed the character for character check?",
            "Which word do your users use that your product does not?",
          ],
        },
      ],
    },

    /* ================================================================ 3 */
    {
      slug: "evidence-you-have",
      n: "3",
      title: "The evidence you already have",
      summary:
        "Thousands of artefacts nobody has read, sitting in three tools. This is the cheapest research in the building.",
      lessons: [
        {
          slug: "extraction-pipeline",
          title: "You already have the data",
          kind: "Build",
          minutes: 70,
          legacy: "Module 7.7 Additional Research Methods",
          hook: "Sona has 4,000 support tickets, 800 app store reviews and 60 recorded sales calls sitting in three different tools. None of it has ever been read systematically, and Priya has been saying it is all the same three things for a year.",
          scene: {
            image: "/img/scenes/domain-fintech.webp",
            alt: "Three screens: a support queue, an app store review list, and a call recording tool, none of them talking to each other.",
            caption: "Nobody owns this. Which is why nobody has read it.",
            notes: [
              {
                from: "Priya, support",
                text: "Exported everything since January. 4,000 rows. I labelled about 200 of them by hand before I gave up.",
              },
              {
                from: "Ana, data",
                text: "The ticket categories are useless. Everything is Other or Account. The agents pick whatever is top of the dropdown.",
              },
            ],
          },
          explain: {
            title: "Extraction beats summarisation",
            body: [
              "Ask a model to summarise 4,000 tickets and you get three paragraphs you cannot sort, count, filter or argue with. The evidence is gone and what is left is unfalsifiable. Ask for a structured extraction and you get 4,000 rows, each carrying its original quote, and now every claim you make can be traced back to the person who said it.",
              "Decide the columns before you run anything. Source, date, verbatim quote, problem label from a fixed list, severity, segment. A pipeline without a fixed schema produces rows you cannot group, and regrouping after the fact costs more than the run did.",
              "The output is not really the point. The pipeline is the point. Built once, it runs monthly for the price of a coffee, and it turns discovery from a quarterly project into a standing capability that someone else can also run.",
            ],
            diagram: "signal-to-claim",
            caption:
              "Signal is cheap. Claims are expensive. The middle column is where the work is.",
          },
          case: {
            brand: "Microsoft",
            year: "2009",
            situation:
              "Windows Error Reporting collected crash data from a vast number of machines. The raw material was millions of unstructured failure artefacts with no obvious way to act on any single one.",
            what: "Rather than summarise, Microsoft bucketed. Crashes were grouped into buckets by their signature, and the buckets were counted and ranked. The team's published account of ten years of running it reports that the distribution is heavily skewed, so a small number of buckets accounts for a large share of all crashes, and fixing those first is disproportionately effective. The engineering value came from the counting, not from reading any individual report.",
            lesson:
              "Volume becomes usable the moment every artefact carries a label you can count. That is all an extraction pipeline is, applied to complaints instead of stack traces.",
            sources: [
              {
                label: "Debugging in the (Very) Large: Ten Years of Implementation and Experience",
                url: "https://www.microsoft.com/en-us/research/publication/debugging-in-the-very-large-ten-years-of-implementation-and-experience/",
              },
            ],
          },
          ai: {
            move: "Write one extraction prompt with a strict JSON schema and run it in batches over the whole corpus. Load into a sheet and pivot.",
            trap: "Over a long run, models drift. Around row 300 they start inventing label values that were not in your enumerated list, because a new one fits better and helpfulness wins over instruction following. Add labels must be exactly one of this list, and if nothing fits use OTHER. Then audit every OTHER by hand, because the OTHER pile is where the finding you did not anticipate is hiding.",
            prompt:
              "Return one JSON object per item: {source_id, verbatim_quote (copied exactly, never paraphrased), problem_label (exactly one of BILLING, ONBOARDING, SYNC, ACCURACY, PERFORMANCE, TRUST, OTHER), severity_1_to_5, segment_guess}. Never invent a label outside the list. If nothing fits, use OTHER and put the reason in a note field.",
          },
          build: {
            artefact:
              "A working extraction pipeline and a coded signal log of 200 or more rows.",
            steps: [
              { do: "Define the schema: exact columns, exact allowed label values." },
              { do: "Write the prompt and test on 20 items. Fix the schema before you scale, never after." },
              { do: "Run the full corpus in batches. Load into a sheet." },
              {
                do: "Audit every OTHER row. Split any label holding more than 25 percent of rows.",
                hint: "A label with a quarter of everything is a bucket, not a finding. Split until each label is actionable by exactly one team.",
              },
              { do: "Check for drift: list the distinct label values that actually came back and compare to your list." },
              { do: "Pivot label against segment. Write the top three findings with counts and one quote each." },
            ],
            tools: ["Claude or ChatGPT", "Google Sheets", "A notebook for batching if the corpus is large"],
          },
          solution: {
            summary:
              "The run produces about eight labels, one of them far too big, and an OTHER pile with the actual news in it.",
            walkthrough: [
              "Test on 20 first. You will find your severity scale is being used as a 4 or 5 for everything, which means it carries no information, and you will fix the anchor text before you spend the full run.",
              "After the full run, count distinct label values. If there are eleven and you allowed seven, you have drift, and the extra four are usually near duplicates of an existing label.",
              "Your biggest label will be something like SYNC at around 30 percent. Read fifty of those quotes. They split into a connection that fails at setup and a connection that silently stops refreshing weeks later. Different owner, different fix, different urgency.",
              "Read every OTHER. In the Sona corpus the OTHER pile is mostly people asking whether their data is sold, which is not a support problem at all and does not appear in any category anyone had thought to create.",
              "Write the three findings with counts, and put the count next to every single one. A finding without a number is an anecdote with ambition.",
            ],
          },
          check: [
            "Can you trace any finding back to a verbatim quote in one click?",
            "How many label values came back that were not on your list?",
            "What was in the OTHER pile?",
          ],
        },

        {
          slug: "clusters-that-are-real",
          title: "Clusters that are real",
          kind: "Drill",
          minutes: 50,
          hook: "The model returned five clean clusters. You asked for five. It would have returned nine if you had asked for nine, and it would have looked just as convincing.",
          explain: {
            title: "A cluster is a claim about what happens next",
            body: [
              "A real cluster has a test: hand thirty unseen rows to a second person with only the cluster names and definitions, and see whether they sort them the way you did. If they cannot, your clusters describe your own reading rather than the data, and every count you produce from them is decoration.",
              "Two failures show up over and over. Merged clusters, where two different causes share vocabulary, like cannot log in and gets logged out. And vanity clusters, where a theme exists because it is interesting rather than because it is frequent, and it survives on the strength of one quote everybody likes to repeat.",
              "Write the definition of each cluster as an inclusion rule and an exclusion rule. Belongs here if the failure happens before first successful use. Does not belong here if the account was working and then stopped. The exclusion rule is what makes a second person able to agree with you.",
            ],
          },
          ai: {
            move: "Ask a model to propose clusters from a sample of your rows without telling it how many, then to write an inclusion and exclusion rule for each.",
            trap: "Ask for a number of clusters and you will get exactly that number, invented if necessary, evenly sized because even sizes look right. Real complaint distributions are lopsided and have a long ugly tail. Never specify a count, and treat any cluster set where the largest is less than three times the smallest as suspicious.",
            prompt:
              "Propose problem clusters from these rows. Do not aim for any particular number of clusters. For each, give an inclusion rule, an exclusion rule, the row count, and the two rows you were least confident about assigning.",
          },
          build: {
            artefact:
              "A cluster definition sheet with inclusion and exclusion rules, and a measured agreement rate on held out rows.",
            steps: [
              { do: "Hold out 30 random rows before you cluster anything. Do not look at them." },
              { do: "Cluster the rest. Write inclusion and exclusion rules for each cluster." },
              {
                do: "Sort the 30 held out rows yourself using only the rules, then have someone else do the same.",
                hint: "If you do not have a second person, run the model on the rules with the rows shuffled and no other context. Weaker, but it still catches vague rules.",
              },
              { do: "Count the disagreements. Rewrite the rules for every cluster where you disagreed more than once." },
              { do: "Kill or merge any cluster with fewer than five rows unless you can say why it matters anyway." },
            ],
            tools: ["Google Sheets", "Claude or ChatGPT"],
          },
          solution: {
            summary:
              "Agreement above roughly 80 percent on held out rows means the rules carry the meaning. Below that, you are the only person who can use your own taxonomy.",
            walkthrough: [
              "Disagreements cluster around one or two boundaries, not everywhere. Find the boundary and fix that pair of definitions rather than rewriting the whole scheme.",
              "The most common fix is a time qualifier. Before first successful connection versus after. Adding it usually resolves half the disagreements on its own.",
              "When you kill a small cluster, do not delete the rows. Move them to OTHER and keep the note. A three row cluster in March is sometimes a forty row cluster in June, and only the note will tell you.",
              "Keep one deliberately awkward cluster, the one that does not fit the story. Its existence is what makes the rest of the sheet credible to a skeptical reader.",
            ],
          },
          check: [
            "What was your agreement rate on the held out rows?",
            "Which cluster boundary caused the disagreements, and how did you redefine it?",
          ],
        },

        {
          slug: "lost-deals-and-cancellations",
          title: "Sales calls, churn notes and cancellations",
          kind: "Build",
          minutes: 55,
          hook: "Sixty recorded sales calls, and a cancellation flow whose top reason is Other, at 44 percent. Ana says the dropdown has not been changed since 2022.",
          explain: {
            title: "The exit interview you already ran and never read",
            body: [
              "Cancellation reason dropdowns tell you about your dropdown. If the options were written by the person who built the flow, the distribution reflects their assumptions, and the Other bucket is where everything you did not anticipate has been quietly filed. The free text next to it is the actual data.",
              "Sales calls are richer and almost never mined. The objection a prospect raises at minute forty is a product requirement stated by someone with money in their hand. Losses are more informative than wins, because a win can be closed for reasons unrelated to the product, and a loss usually names one specific blocker.",
              "The framing that keeps this honest is to record what happened rather than why. Objection raised, stage of the call, who raised it, what the rep said, what happened next. Why is an interpretation and belongs in a separate column, because two people will read the same call differently and both readings are useful.",
            ],
          },
          case: {
            brand: "Gong",
            situation:
              "Sales conversations were the largest body of unstructured customer evidence inside most companies, and almost none of it was analysed, because listening to calls does not scale.",
            what: "Gong built a business on recording, transcribing and labelling sales calls at scale, then publishing aggregate findings about what actually happens in them: which objections appear at which point, how talk ratio relates to outcomes, what language shows up in deals that close. The unit of analysis is the moment inside the call, not a summary of it.",
            lesson:
              "The same move as your ticket pipeline, pointed at recordings. Label the moment, count the labels, and the pattern appears in a corpus nobody could listen to by hand.",
            sources: [
              { label: "Gong research and blog", url: "https://www.gong.io/blog/" },
            ],
          },
          ai: {
            move: "Extract one row per objection from each call transcript: objection, call stage, speaker role, and the verbatim sentence.",
            trap: "This is where the model agrees with you because you wrote your hypothesis into the prompt. Ask it to find evidence that price is the blocker and it will find price everywhere, including in calls where price was never mentioned, by reading budget concern into any hesitation. Run the extraction with a neutral schema first and only then look for your hypothesis in the counts. If your hypothesis appears only in the primed run, it is your finding, not theirs.",
            prompt:
              "For each transcript, return every moment where the prospect raises a concern: {verbatim, stage (DISCOVERY | DEMO | PRICING | CLOSE | POST), who_raised, was_resolved}. Do not categorise the concern type. Do not infer anything not said aloud.",
          },
          build: {
            artefact:
              "An objection table from the call corpus and the free text cancellation reasons, with counts and one quote each.",
            steps: [
              { do: "Extract objections from the call transcripts with the neutral schema. No hypothesis in the prompt." },
              { do: "Extract the free text from every cancellation that chose Other." },
              {
                do: "Now run a second pass with your hypothesis stated, and compare the counts to the neutral run.",
                hint: "The gap between the two runs is a measurement of your own bias. Write the number down.",
              },
              { do: "Rank objections by frequency times how late in the call they appear. Late objections cost more." },
              { do: "Rewrite the cancellation dropdown options using the actual free text language, and say what you expect Other to fall to." },
            ],
            tools: ["Whisper", "Claude or ChatGPT", "Google Sheets"],
          },
          solution: {
            summary:
              "The neutral run and the primed run disagree by a lot, and the top real objection is usually something nobody in the company says out loud.",
            walkthrough: [
              "Run neutral first, always. Once you have seen the primed output you cannot unsee it, and your neutral coding will drift towards it.",
              "In the Sona corpus the primed run reports pricing in 38 of 60 calls. The neutral run finds price mentioned in 11, and the most frequent real objection is whether Sona can be trusted with read access to a bank account.",
              "Weight by stage. An objection at discovery is a qualification issue. The same objection at close is a product gap, because they got all the way there and it still stopped them.",
              "Rewrite the dropdown from the free text, not from a brainstorm. If 40 people wrote a version of I did not trust it with my bank login, that is an option, and Other should drop accordingly. State the number you expect so the change is falsifiable.",
            ],
          },
          check: [
            "How far apart were the neutral run and the primed run, in counts?",
            "What is the most frequent objection, and does anyone inside the company currently say it out loud?",
          ],
        },
      ],
    },

    /* ================================================================ 4 */
    {
      slug: "watching",
      n: "4",
      title: "Watching instead of asking",
      summary:
        "What people say and what they do are two different datasets. Both are true. Only one of them predicts.",
      lessons: [
        {
          slug: "say-vs-do",
          title: "Watch what they do instead",
          kind: "Case study",
          minutes: 50,
          legacy: "Module 7.1 User Experience, Module 10.1 Usability Tests",
          hook: "Users told you in interviews that the export feature is critical. Ana pulls the numbers. 1.2 percent of accounts have ever opened it.",
          scene: {
            image: "/img/scenes/domain-commerce.webp",
            alt: "A screen split between a heatmap of an interface and an interview transcript, showing different stories.",
            caption: "Two datasets about the same people, disagreeing.",
            notes: [
              {
                from: "Ana, data",
                text: "Export: 1.2 percent ever. Of those, 71 percent did it once and never again. I can slice it further if you tell me what you are looking for.",
              },
              {
                from: "Tom, design",
                text: "Three of my five participants asked for it unprompted. I do not think they are lying, I think they mean something else by it.",
              },
            ],
          },
          explain: {
            title: "Both signals are real, for different questions",
            body: [
              "Interviews tell you why, and give you the words people use. Behaviour tells you what, and how much. Using interviews to size a problem is the classic mistake in one direction, and using analytics to explain one is the classic mistake in the other.",
              "When they contradict each other, the contradiction is the finding rather than a problem to resolve. People who ask for export usually do not want a CSV. They want the reassurance that their data is not trapped, or they want one specific number that the product does not show them. Building the CSV satisfies neither and gets used 1.2 percent of the time.",
              "So the rule is: build for revealed preference, and listen to stated preference for language and for motive. What someone says they want is a description of a feeling. What they did last Tuesday is a fact.",
            ],
          },
          case: {
            brand: "Microsoft Office",
            year: "2006",
            situation:
              "Microsoft collected feature requests for Office in enormous volume and also collected anonymous usage telemetry through its customer experience programme.",
            what: "The two datasets disagreed. As the Office user interface team documented publicly while designing the Ribbon, a large share of the most requested features already existed in the product. People were not missing capability, they were missing the ability to find it. The response was not to build the requested features again, it was to rebuild the interface around what the telemetry showed people actually used.",
            lesson:
              "A feature request is a report of a failed search as often as it is a report of a missing capability. Telemetry tells you which one you are looking at.",
            sources: [
              {
                label: "Jensen Harris, An Office User Interface Blog (archive)",
                url: "https://learn.microsoft.com/en-us/archive/blogs/jensenh/",
              },
            ],
          },
          ai: {
            move: "Give a model both datasets, the interview claims and the usage numbers, and ask it to list every place they contradict each other.",
            trap: "It reconciles rather than reports. Asked to make sense of both, it will manufacture a story in which everyone is right: users value export as a safety net even if they rarely use it. That sentence is plausible, unfalsifiable, and lets you avoid the decision. Instruct it to output contradictions only, with the number from each side, and to propose no explanation at all.",
            prompt:
              "Here are claims from interviews and here are usage numbers. Output only a table of contradictions: claim, supporting quote, contradicting metric, size of the gap. Do not explain, reconcile or hypothesise. If a claim is not contradicted, leave it out.",
          },
          build: {
            artefact:
              "Three contradictions between what people said and what they do, each with a number on both sides.",
            steps: [
              { do: "List every capability claim from your interviews, with the quote." },
              { do: "Pull the usage number for each one. Ever used, and used more than once." },
              { do: "Write the three biggest gaps as a table with both numbers." },
              {
                do: "For the biggest gap, write two competing explanations and the cheapest way to tell them apart.",
                hint: "Wanting reassurance and wanting a missing number look identical in the request and completely different in a five minute session.",
              },
              { do: "Write down which stated preference you are now going to stop acting on." },
            ],
            tools: ["Your product analytics", "Google Sheets"],
          },
          solution: {
            summary:
              "The export request is a proxy. The cheap test is to ask the next three people who ask for it what they would do with the file.",
            walkthrough: [
              "Table it plainly. Claim: export is critical, three of five participants. Behaviour: 1.2 percent ever, 71 percent of those once only. The gap is the finding.",
              "Two explanations. One, people want an escape hatch and never use it, which means the fix is a sentence on the pricing page, not a feature. Two, people want one number the product does not show, and export is how they imagine getting it.",
              "The test costs an hour. Ask three people who requested it what the first thing they would do with the file is. If two of them describe the same calculation, build the calculation.",
              "Then write down the preference you are dropping. Being explicit about it is what stops it returning next quarter with the same three quotes attached.",
            ],
          },
          check: [
            "What are your three gaps, with a number on both sides?",
            "Which explanation did your cheap test rule out?",
          ],
        },

        {
          slug: "five-people-failing",
          title: "Watch five people fail",
          kind: "Workshop",
          minutes: 55,
          hook: "You have a prototype and a theory about why people stall at bank connection. Five people, one task each, forty minutes total. You are not allowed to help.",
          explain: {
            title: "Give a task, then stop talking",
            body: [
              "A usability session is not a demo and not an interview. You give a task with a goal and no instructions, then you shut up and write down what happens. Connect an account so you can see last month's spending. Not click connect account, which tells them where to click and tests nothing.",
              "The hard part is not rescuing them. The instinct to help is overwhelming and it destroys the data, because the forty seconds of hunting you interrupted is the entire finding. When they ask what should I do, the answer is what would you do if I were not here.",
              "Count two things. Time to first doubt, meaning the first moment they hesitate or backtrack, which is usually far earlier than the failure. And whether they recovered without help. Five people per round finds most of what one round can find, and the second round after you fix things finds the next layer.",
            ],
          },
          case: {
            brand: "Nielsen Norman Group",
            situation:
              "Teams routinely delayed usability testing because a statistically respectable sample felt out of reach, so they tested with nobody.",
            what: "Jakob Nielsen's published analysis argues that testing with five users uncovers around 85 percent of the usability problems in a design, because the same problems recur quickly across participants, and that running several small rounds beats one large study. The recommendation is explicitly about iteration: test five, fix, test five again.",
            lesson:
              "Usability testing is not a survey and does not need survey mathematics. Small and repeated beats large and once.",
            sources: [
              {
                label: "Why You Only Need to Test with 5 Users",
                url: "https://www.nngroup.com/articles/why-you-only-need-to-test-with-5-users/",
              },
            ],
          },
          ai: {
            move: "Have a model turn your prototype spec into five task prompts phrased as goals rather than instructions, and generate the observation sheet you will fill in live.",
            trap: "Do not hand the session recordings to a model and read the summary. A transcript has no pauses, no cursor thrash, no scroll-and-return, no face. The model sees a participant who completed the task where you would have seen forty seconds of hunting and one quiet swear word. Watch all five yourself, then use the model only to cross-tabulate your own notes.",
          },
          build: {
            artefact:
              "Five completed sessions with timestamped observations and a ranked problem list.",
            steps: [
              { do: "Write one task as a goal. Read it aloud to check it contains no instruction." },
              { do: "Write the observation sheet: time to first doubt, points of hesitation, recovery, verbatim mutterings." },
              {
                do: "Run five sessions. Do not help. Count to ten before you say anything.",
                hint: "Keep a hand on the desk. Physically committing to not intervening works better than intending to.",
              },
              { do: "Rank the problems by how many of the five hit them and whether they recovered." },
              { do: "Fix the top one, then run five more. The second round is where the method earns its keep." },
            ],
            tools: ["Any prototype", "A recording tool", "A stopwatch"],
          },
          solution: {
            summary:
              "By participant three you will already know the top problem. Run four and five anyway, because they tell you whether it is universal or segment specific.",
            walkthrough: [
              "Write the task as an outcome the person would actually want. Find out whether you overspent last month beats test the connection flow.",
              "Log time to first doubt for all five. The mean is less useful than the spread. If four hesitate at the same second and one does not, ask what is different about the one.",
              "Separate problems where people recovered from problems where they did not. Recovered problems cost trust. Unrecovered problems cost the user.",
              "Rank by hit rate first, severity second. A problem four of five hit and recovered from beats a catastrophic one that only one person found, unless that one person is your core segment.",
            ],
          },
          check: [
            "What was the median time to first doubt, and where was it?",
            "How many of the five recovered without help?",
            "What did you see that a transcript of the same session would not contain?",
          ],
        },

        {
          slug: "locating-the-moment",
          title: "Locating the moment in the data",
          kind: "Drill",
          minutes: 50,
          hook: "You know what goes wrong and roughly where. Now you need it as a number, split by segment, before Thursday, and the data team's queue is eleven days long.",
          explain: {
            title: "Every claim has an event that would prove it",
            body: [
              "A qualitative finding becomes a decision when you can attach a count to it. The bridge is the event: for the claim people give up at bank connection, the event is connection_started without a matching connection_succeeded within the session.",
              "So write the claim first, then the query that would confirm or kill it, then run it. Doing it in the other order, exploring the data and looking for something interesting, produces a story that fits whatever you found, which is the same as producing nothing.",
              "Segment before you conclude. A 40 percent completion rate that is 65 percent for one bank and 12 percent for another is not a design problem, it is an integration problem, and the aggregate number would have sent you to redesign a screen that works fine.",
            ],
            diagram: "user-flow",
            caption:
              "The dashed states are where the people go. Each arrow needs an event name or you cannot count it.",
          },
          ai: {
            move: "Give a model your event schema and your claim, and have it write the query, plus the sanity check query that should return a number you already know.",
            trap: "It invents column names that look exactly right. connected_at, is_verified, user_segment, none of which exist in your warehouse, and the query either fails loudly or, worse, joins on the wrong id and returns plausible numbers. Always run the sanity check first: a query whose answer you already know from a dashboard. If that number is wrong, every other number from the same query is wrong too.",
            prompt:
              "Here is the exact event schema, copied from the table definitions. Write the query for this claim, using only columns present in the schema. Then write a second query whose result I can verify against a known dashboard number, and tell me what that number should be.",
          },
          build: {
            artefact:
              "The claim, the query, the number, and the segment split that changes the interpretation.",
            steps: [
              { do: "Write the claim as one sentence that a number could contradict." },
              { do: "Name the events that would confirm or kill it. If an event does not exist, write the spec for it." },
              { do: "Run the sanity check query first and verify the number against something you already trust." },
              {
                do: "Run the real query. Then split it by at least two segments.",
                hint: "Split by acquisition source, by device, and by whichever third party integration is involved. One of those three usually explains it.",
              },
              { do: "Write one line: the claim, the number, and whether the segment split changes what you would do." },
            ],
            tools: ["Your analytics tool", "SQL if you have access", "Google Sheets"],
          },
          solution: {
            summary:
              "The aggregate says redesign the screen. The split says fix one integration and leave the screen alone.",
            walkthrough: [
              "Claim: people who start bank connection do not finish it. Events: connection_started, connection_succeeded, connection_failed with a reason field.",
              "Sanity check: total accounts created last month. You know that number from the weekly email. If your query disagrees, your join is wrong and you have just saved yourself a very embarrassing meeting.",
              "The aggregate completion rate is 41 percent. Splitting by provider gives 68, 64, 61 and 12 percent. One provider is the whole story.",
              "Splitting by device changes nothing, which is also a finding, because it kills the responsive layout theory somebody has been pushing since March.",
              "The decision line: the problem is one integration and it affects 22 percent of attempts. That is an engineering ticket, not a design project.",
            ],
          },
          check: [
            "Did your sanity check query return the number you expected?",
            "Which segment split changed the interpretation, and which one changed nothing?",
          ],
        },
      ],
    },

    /* ================================================================ 5 */
    {
      slug: "framing",
      n: "5",
      title: "Framing and sizing the problem",
      summary:
        "A pile of findings is not a problem statement, and a problem statement with a solution buried in it is not a problem statement either.",
      lessons: [
        {
          slug: "problem-statement",
          title: "A problem worth solving, written down",
          kind: "Concept",
          minutes: 45,
          hook: "You write we need a better onboarding flow on the whiteboard. Dev asks what better means. You do not have an answer that survives the question.",
          explain: {
            title: "Five parts, and the solution is not one of them",
            body: [
              "Who, in what situation, currently does what, at what cost, and how do you know. Five parts. If your statement is missing the cost you cannot prioritise it, and if it is missing the evidence you cannot defend it.",
              "The test for a solution hiding inside a problem statement is simple: could two competent teams read this and build genuinely different things? We need a better onboarding flow fails, because it has already decided the answer is a flow. New users who bank with more than one provider abandon setup after the first connection, and 61 percent never connect a second one, passes, because you could solve that with copy, with a queue, with an email, or with a redesign.",
              "Write the statement so a person who disagrees with you can still use it. Their disagreement will be about the fix, which is a productive argument, rather than about what is happening, which is not.",
            ],
            diagram: "jobs-to-be-done",
            points: [
              { term: "Situation", def: "The trigger, in the real world, with a time attached." },
              { term: "Current behaviour", def: "What they do today instead. This is your real competition." },
              { term: "Cost", def: "Hours, money, or a risk they carry. No cost, no problem." },
            ],
          },
          case: {
            brand: "Quibi",
            year: "2020",
            situation:
              "Quibi raised roughly 1.75 billion dollars to build a mobile-first streaming service of short premium episodes, built on the framing that people wanted high production value content in the in-between moments of the day, particularly the commute.",
            what: "The service launched in April 2020 and shut down about six months later. The founders' own closing note said the idea was either not strong enough to justify a standalone service or was launched at the wrong time. The problem statement had a specific situation embedded in it, the commute, and it had never been tested as a claim about behaviour, only assumed as a claim about demand.",
            lesson:
              "The riskiest part of a problem statement is usually the situation clause, because it is the part that sounds like context rather than like an assumption. Write it as a claim that could be false.",
            sources: [
              {
                label: "A Note from Quibi",
                url: "https://medium.com/@quibi/a-note-from-quibi-88af90c1a48a",
              },
              {
                label: "The Verge, Quibi is shutting down",
                url: "https://www.theverge.com/2020/10/21/21526702/quibi-shut-down-closing-mobile-app-streaming-jeffrey-katzenberg-meg-whitman",
              },
            ],
          },
          ai: {
            move: "Have a model rewrite your statement five ways and flag every embedded solution and every unsupported quantifier.",
            trap: "It upgrades your prose and smuggles in certainty while doing it. Some users mentioned becomes users need. A count of eleven becomes many. The writing gets better and the claim gets weaker, and you will not notice because it now sounds like something a confident person wrote. Diff the quantifiers, word by word, against your original.",
            prompt:
              "Rewrite this problem statement. Then list every quantifier in your version and, for each, the exact quantifier in my original that it replaced. Flag any place you increased certainty, and any place a solution is embedded in the statement of the problem.",
          },
          build: {
            artefact:
              "Three problem statements, each with all five parts and an evidence count.",
            steps: [
              { do: "Take your top three clusters. Write the five part statement for each." },
              {
                do: "Run the two-teams test on each. Rewrite any statement that only permits one solution.",
                hint: "Read it to someone and ask what they would build. If they name the thing you were already planning, the solution is in the statement.",
              },
              { do: "Attach the evidence count and one verbatim quote to each." },
              { do: "Underline the situation clause and write one line on how you would find out if it is false." },
            ],
          },
          solution: {
            summary:
              "The five parts are easy. The discipline is refusing to write the fix, and being honest about the quantifier.",
            walkthrough: [
              "Start from a quote, not from a summary. The statement should be a generalisation of something someone actually said.",
              "Write the cost in the units the business uses. 61 percent of multi-bank users never complete setup is a cost. Users are frustrated is not.",
              "Check the quantifier against the sheet. If your log says 34 rows out of 412, write 34 rows out of 412, not commonly.",
              "Underline the situation clause and be suspicious of it. Quibi's was the commute. Yours might be at the end of the month, and if people actually check spending when a bank text arrives, everything downstream of the statement is aimed at the wrong moment.",
            ],
            example: {
              label: "A statement that passes the two-teams test",
              body: "New users who hold accounts at more than one bank (34 of 412 coded rows, 61 percent of that segment in the funnel) stop after connecting the first account, because nothing tells them the product expects more than one. Cost: they see a partial picture, judge the numbers wrong, and 71 percent do not return in week two.",
            },
          },
          check: [
            "Could two teams read your statement and build different things?",
            "What is your situation clause, and how would you find out it is false?",
          ],
        },

        {
          slug: "sizing-the-problem",
          title: "How big is this, actually",
          kind: "Drill",
          minutes: 45,
          hook: "Maya asks how big it is. You have 34 coded rows. Thirty four is not an answer, and neither is a lot.",
          explain: {
            title: "Your evidence pile is not a random sample",
            body: [
              "Support tickets over-represent people angry enough to write in. Reviews over-represent the delighted and the furious, with nobody in the middle. Interviews over-represent people who answer emails. Every source you have is biased in a direction you can name, which means you can correct for it roughly, and roughly is enough.",
              "So size in two steps. First, what share of the evidence does this problem hold. Second, what share of the population does the evidence source represent, and in which direction is it skewed. Thirty four rows out of 412 tickets is 8 percent of people who complained, and people who complain are perhaps one in twenty of the affected, which gives you a range rather than a number.",
              "Then multiply reach by frequency by cost, state every assumption in a line each, and produce a low, mid and high case. The value is not precision. It is that every assumption is visible, so the argument in the room is about the assumption rather than about the answer.",
            ],
            diagram: "rice",
            caption:
              "Confidence is the honest column. It is where you record how much of this you actually know.",
          },
          ai: {
            move: "Have a model lay out the estimate as a chain of named assumptions, then check its priors against anything you can verify internally.",
            trap: "Its priors are the average of the internet. It will assume US pricing, US conversion benchmarks and a support contact rate from a SaaS blog post, and present all of it in the same confident tone as the numbers you gave it. Mark every number in the chain as yours, verified, or its guess. Then attack the its-guess ones first.",
          },
          build: {
            artefact:
              "Your top three problems sized, with a low, mid and high case and a named sensitivity.",
            steps: [
              { do: "For each problem, write the share of coded evidence it holds, with the raw counts." },
              { do: "Write the bias of each evidence source in one line, and the direction it skews." },
              { do: "Build the estimate chain: reach times frequency times cost. Five assumptions maximum." },
              {
                do: "Compute low, mid and high. Mark every number as measured, estimated, or model-guessed.",
                hint: "If more than two of your five assumptions are model-guessed, you have not sized anything yet, you have prompted.",
              },
              { do: "Name the one assumption the answer is most sensitive to, and the cheapest way to check it." },
            ],
            tools: ["Google Sheets"],
          },
          solution: {
            summary:
              "The sizing usually reorders the list. The biggest evidence pile is often not the biggest problem, because the loudest source is the most biased one.",
            walkthrough: [
              "Count first. Problem A holds 34 of 412 rows, problem B holds 96. B looks four times bigger.",
              "Then check the source mix. B is 90 percent app store reviews, which come overwhelmingly from people prompted after a crash. A is spread across tickets, calls and interviews, which is three independent sources agreeing.",
              "Reach matters more than volume of complaint. A affects the multi-bank segment, which Ana can count exactly: 8,400 accounts. B affects everyone but costs each of them thirty seconds.",
              "Multiply through. A costs 8,400 people a wrong monthly number. B costs 40,000 people half a minute. Now the ranking is defensible in either direction, and the argument is about which cost the company cares about, which is the right argument to be having.",
              "Sensitivity: the whole estimate for A hinges on the assumption that a wrong monthly number causes the week two drop. That is one query. Run it.",
            ],
          },
          check: [
            "Which evidence source is most biased, and in which direction?",
            "Which single assumption is your estimate most sensitive to?",
          ],
        },

        {
          slug: "opportunity-tree",
          title: "From 200 quotes to five problems",
          kind: "Build",
          minutes: 70,
          legacy: "Module 7.2 Design Thinking, Module 7.4 Information Architecture",
          hook: "You have 200 coded quotes, three interview transcripts, five watched sessions and a PMF score. Maya wants to know what you are doing next quarter, and she wants it on one picture.",
          explain: {
            title: "Outcome, opportunity, solution, experiment",
            body: [
              "Four levels, strictly. One measurable outcome at the root. Beneath it, opportunities, which are user problems in the user's language. Beneath each opportunity, solutions. Beneath each solution, the experiment that would tell you whether it works. If a node cannot be placed at exactly one level it is usually a solution wearing a problem's clothes.",
              "Every opportunity node carries a count and a link to one quote. Nodes with nothing attached are hypotheses, and should be visibly marked as such rather than quietly promoted. Half the value of drawing the tree is discovering how many of your confident beliefs have no rows behind them.",
              "The other half is that it forces comparison within an opportunity rather than across. Choosing between three ways to solve one real problem is a product decision. Choosing between three unrelated problems by scoring them against each other is prioritisation theatre, and the tree makes the difference visible.",
            ],
            diagram: "opportunity-tree",
            caption:
              "A real tree is lopsided. One branch holds most of the evidence and most of the branches have none.",
            points: [
              { term: "Outcome", def: "One measurable business result. Not a feature, not a theme." },
              { term: "Opportunity", def: "A user problem, in their words, with a count attached." },
              { term: "Experiment", def: "The cheapest thing that separates two solutions under the same opportunity." },
            ],
          },
          case: {
            brand: "Product Talk",
            situation:
              "Teams routinely jump from we heard a problem to here is the feature, skipping the step where alternatives are considered at all, and then defend the feature because it is the only one on the table.",
            what: "Teresa Torres's opportunity solution tree makes the structure explicit: a desired outcome at the root, the opportunity space mapped beneath it, solutions under each opportunity, and experiments under each solution. Teams that draw it commonly discover they had three solutions to the same opportunity and no evidence separating them, or one opportunity holding every quote and four holding none.",
            lesson:
              "The value is not the diagram. It is that you cannot draw it without noticing which nodes have nothing underneath them.",
            sources: [
              {
                label: "Teresa Torres, Opportunity Solution Trees",
                url: "https://www.producttalk.org/2016/08/opportunity-solution-tree/",
              },
            ],
          },
          ai: {
            move: "Feed a model your coded log and ask it to propose only the opportunity layer, as user problems in user language, then attach the real counts yourself from the sheet.",
            trap: "It produces a beautifully balanced tree where every branch has three children, because symmetry reads as complete. Reality is lopsided, and one opportunity usually holds more than half the evidence. Delete the symmetry. Also check that its opportunities are not solutions: needs a bulk edit mode is a solution, spends twenty minutes fixing categories one at a time is an opportunity.",
            prompt:
              "From these coded rows, propose opportunity nodes only. Each must be phrased as a user problem in the user's own vocabulary, must not name any feature or interface element, and must cite the row ids that support it. Do not balance the tree. If one opportunity holds most of the rows, say so.",
          },
          build: {
            artefact:
              "An opportunity solution tree with evidence counts on every node.",
            steps: [
              { do: "Write the outcome at the root. One measurable business result, with the current number." },
              { do: "Generate candidate opportunities from the log, then attach real counts from the sheet yourself." },
              {
                do: "Mark every opportunity with fewer than five supporting rows as a hypothesis, in a different colour. Do not delete them.",
                hint: "Hypotheses are fine on the tree. Hypotheses pretending to be findings are not.",
              },
              { do: "Add two or three solutions under your top opportunity only. Leave the other branches bare." },
              { do: "Under each solution, add the cheapest experiment that could separate it from its siblings." },
            ],
            tools: ["FigJam, Miro or Excalidraw"],
          },
          solution: {
            summary:
              "A finished tree has one heavy branch, several marked hypotheses, and exactly one branch developed down to experiments.",
            walkthrough: [
              "Root: increase week four retention from 19 percent to 30 percent. A number and a target, so every node beneath can be argued against it.",
              "Opportunities in user language. I cannot tell if the number is right beats data accuracy issues, because the first one is checkable against quotes and the second is a category name.",
              "Attach counts by hand from the sheet, never from the model. This is the step people skip and it is the step that makes the tree evidence rather than art.",
              "Develop one branch only. A tree with three fully developed branches means you have not chosen, and choosing is the deliverable.",
              "Under the top opportunity, two solutions that are genuinely different in kind, for example a copy change and a queued background job, plus one experiment each that costs under a day.",
            ],
          },
          check: [
            "Which opportunity holds the most evidence, and by how much?",
            "How many of your nodes are marked as hypotheses rather than findings?",
            "Is your tree lopsided? It should be.",
          ],
        },
      ],
    },

    /* ================================================================ 6 */
    {
      slug: "pmf",
      n: "6",
      title: "Product-market fit, honestly",
      summary:
        "The most overused phrase in product, and one with a measurable definition if you are willing to use it and report what it says.",
      lessons: [
        {
          slug: "measuring-pmf",
          title: "Measuring the thing everyone talks about",
          kind: "Build",
          minutes: 60,
          legacy: "Module 4.1 What is PMF",
          hook: "Maya tells investors Sona has product-market fit. You have read the retention curve. You are not sure that is true, and you have to decide whether to say so before the board deck goes out on Friday.",
          scene: {
            image: "/img/scenes/domain-b2b.webp",
            alt: "A board deck slide reading strong product-market fit, next to a laptop showing a retention curve that has not flattened.",
            caption: "Two documents about the same company.",
            notes: [
              {
                from: "Maya, founder",
                text: "Slide 4 says we have found PMF. Is that fair? Tell me now rather than in the meeting.",
              },
              {
                from: "Ana, data",
                text: "Week 12 retention is 11 percent and still declining. It has never flattened for any cohort.",
              },
            ],
          },
          explain: {
            title: "One survey question and one curve",
            body: [
              "The survey question is Sean Ellis's: how would you feel if you could no longer use this product. Very disappointed, somewhat disappointed, not disappointed. Forty percent answering very disappointed is the working threshold. Ask only people who have used it properly and recently, or the number measures nothing, and report the absolute count alongside the percentage.",
              "The curve is cohort retention. Does it flatten, or does it go to zero. A curve that flattens at 25 percent means a quarter of users found lasting value and you have a base to grow from. A curve that keeps falling means a leaky bucket that no amount of growth spend will fill, and every marketing pound you spend on it is a pound spent renting users.",
              "The two follow-up questions are where the roadmap comes from. Ask the very disappointed group what the main benefit is, and you learn what to protect. Ask the somewhat disappointed group what one thing would have to improve, and you learn what to build, because they are the people closest to the line.",
            ],
            diagram: "retention-curve",
            caption:
              "Same signup numbers. Only one of these is a business.",
            points: [
              { term: "Very disappointed", def: "The share that matters. 40 percent is the threshold, the count is the sanity check." },
              { term: "Flattening", def: "The curve reaching an asymptote above zero. Without it, no fit, whatever the survey says." },
              { term: "The somewhat group", def: "Closest to the line. Their single blocker is the roadmap." },
            ],
          },
          case: {
            brand: "Sean Ellis",
            situation:
              "Growth teams were being asked to scale products that were not ready, and there was no shared way to tell whether a product was ready other than argument.",
            what: "Ellis, who ran early growth at a series of startups, proposed a single survey question and a threshold derived from comparing products that went on to grow with products that stalled. His writing on the startup pyramid puts the bar at around 40 percent answering very disappointed, and argues that below it, spending on growth is premature and usually wasted.",
            lesson:
              "The number is not magic and the threshold is a rule of thumb. What it does is convert an argument about vibes into a measurement anyone can repeat next quarter.",
            sources: [
              {
                label: "Sean Ellis, The Startup Pyramid",
                url: "https://www.startup-marketing.com/the-startup-pyramid/",
              },
            ],
          },
          ai: {
            move: "Run the free text follow-ups through your extraction pipeline and cluster the blockers named by the somewhat disappointed group.",
            trap: "Small n. With 40 responses the model will present a dominant theme that is four people, in the same confident register it would use for four hundred. Put the count next to every theme, refuse to report a percentage on fewer than 100 responses, and write the raw n at the top of the readout where nobody can lose it.",
          },
          build: {
            artefact:
              "A PMF readout: the score with its absolute count, the retention curve, and the ranked blocker list from the somewhat disappointed segment.",
            steps: [
              { do: "Write the survey: the Ellis question plus the two free text follow-ups. Nothing else." },
              {
                do: "Send it only to people who used the product at least twice in the last two weeks.",
                hint: "Sending it to your whole list is the most common way to get a number that means nothing. Recency is the qualification.",
              },
              { do: "Plot the cohort retention curve alongside it. Note where it flattens, or that it does not." },
              { do: "Cluster the somewhat disappointed blockers, with counts next to each." },
              { do: "Write the honest one liner: do we have fit, and for whom specifically." },
            ],
            tools: ["Google Forms or Tally", "Google Sheets"],
          },
          solution: {
            summary:
              "The honest answer is almost always segmented, and a segmented yes is more useful to a founder than an unsegmented no.",
            walkthrough: [
              "Run the survey on qualified users only. If 300 people are eligible and 62 respond, say 62 at the top of the readout.",
              "Compute the score. If it is 24 percent, that is not a failure to report, it is a starting position. Superhuman famously started below the bar and moved it, and the way you move it is by segmenting.",
              "Cut by one behavioural attribute at a time. In the Sona data, users who connected a bank account in their first week score far above users who did not.",
              "Check the cut against the curve. If the same segment's retention curve flattens and the overall one does not, you have found where fit exists.",
              "Write the line. Not overall, but 61 percent among users who connected an account in week one, and that segment's curve flattens at 34 percent. That sentence is a strategy, and Maya can take it to the board without lying.",
            ],
            example: {
              label: "The first two lines of an honest readout",
              body: "Score: 24 percent very disappointed (n=62 of 300 eligible, surveyed 4 to 11 March). Segmented: 61 percent among the 18 respondents who connected a bank account in week one, 9 percent among the rest. Week 12 retention overall 11 percent and still falling; for the week-one-connected segment it flattens at 34 percent.",
            },
          },
          check: [
            "What is your score, and how many people is that in absolute numbers?",
            "Does your curve flatten, and at what percentage?",
            "Which segment carries the fit, and how large is it?",
          ],
        },

        {
          slug: "reading-cohorts",
          title: "Reading a cohort table without fooling yourself",
          kind: "Drill",
          minutes: 50,
          hook: "Ana sends you a cohort table with twenty rows and twelve columns. The bottom right corner looks fantastic. It is fantastic because it is empty.",
          explain: {
            title: "Down a column, across a row",
            body: [
              "Rows are cohorts, grouped by when people arrived. Columns are periods since they arrived. Reading across a row tells you what happens to one group over its life. Reading down a column compares different groups at the same age, which is how you see whether a product change worked.",
              "Three things to look for. Whether any row reaches an asymptote above zero, which is the fit question. Whether the columns improve as you go down, which is the did-we-get-better question. And whether one row is strange, which usually means an acquisition channel changed rather than the product.",
              "The most common self-deception is the incomplete cohort. The most recent rows have only had a week to decay, so they look healthy, and the eye is drawn to them because they are the newest data. Grey out any cell where the cohort has not aged enough to fill it, and do it before anyone else looks at the table.",
            ],
          },
          case: {
            brand: "Duolingo",
            situation:
              "Duolingo's business depends on daily habit rather than one-off usage, which makes retention the metric that determines whether anything else is worth doing.",
            what: "The company has been unusually public about treating retention as the primary growth lever rather than acquisition, building product mechanics like streaks and notifications specifically around bringing people back, and reporting daily active user growth as the headline number in its public filings and shareholder letters rather than downloads or registrations.",
            lesson:
              "A company that reports daily actives instead of signups is telling you which number it believes. Downloads can be bought. A curve that flattens cannot.",
            sources: [
              { label: "Duolingo blog", url: "https://blog.duolingo.com/" },
              { label: "Duolingo investor relations", url: "https://investors.duolingo.com/" },
            ],
          },
          ai: {
            move: "Paste the cohort table and ask the model to identify where each row flattens, and to compare like-aged cells down each column.",
            trap: "It reads the incomplete cohorts as real and reports that retention is improving, because the newest rows have the highest surviving values. It will also fit a flattening to a row where the remaining population is nine people. Tell it which cells are incomplete before you ask anything, and require the absolute count next to every rate.",
            prompt:
              "This cohort table has incomplete cells for cohorts younger than 12 weeks; I have marked them. Ignore them entirely. For each complete row, report the week where the decline falls below 2 points per week, the value there, and the absolute number of users that represents.",
          },
          build: {
            artefact:
              "A cohort table with incomplete cells greyed out, an asymptote per cohort, and one segment split.",
            steps: [
              { do: "Build the table from the lesson dataset: signups by week, active by week n." },
              { do: "Grey out every incomplete cell before you interpret anything." },
              { do: "For each complete cohort, find where the weekly decline drops below two points and note the absolute count." },
              {
                do: "Read down three columns. Say whether later cohorts are better, worse or the same at the same age.",
                hint: "If cohorts improved in a specific week, find out what shipped that week. Half the time it was a marketing change, not a product one.",
              },
              { do: "Split by one segment and rebuild. Note whether any segment flattens where the whole does not." },
            ],
            tools: ["Google Sheets"],
          },
          solution: {
            summary:
              "The aggregate curve does not flatten. One segment's does, and it is small enough that it disappears in the average.",
            walkthrough: [
              "Grey out first. In the Sona table the last three cohorts are incomplete and they are the ones everyone points at in meetings.",
              "Take the oldest complete cohort and read across. It falls to 11 percent by week 12 and keeps sliding, which is a leaky bucket, not a base.",
              "Read down week 4 for every cohort. Flat at about 19 percent for eight months. Nothing the team shipped in that period moved it, which is worth saying out loud.",
              "Split by whether a bank account was connected in week one. That segment reaches 34 percent by week 6 and stops falling. It is 21 percent of signups, so it is invisible in the aggregate.",
              "The conclusion is not we have retention. It is we have retention in a fifth of our users and the job is to move people into that fifth, which is a different roadmap entirely.",
            ],
          },
          check: [
            "How many of your cells did you grey out, and would anyone have quoted them?",
            "Does any cohort flatten, and at what absolute number of users?",
            "Which segment behaves differently from the aggregate?",
          ],
        },

        {
          slug: "fit-is-a-segment",
          title: "Fit is a property of a segment",
          kind: "Case study",
          minutes: 45,
          hook: "Your overall score is 24 percent. Your score among one group is 61 percent. Which of those is the true number, and which one goes in the deck?",
          explain: {
            title: "Narrow until the number is true",
            body: [
              "Product-market fit is not a property of a product. It is a property of a product and a group of people, together. An average across everyone is a statement about your marketing, because the mix of who you acquired determines it as much as the product does.",
              "So the useful move is to narrow until the number is true, then ask how big that group is and whether it can be grown. A product that is unmissable to 8,000 people is a real business. A product that is mildly liked by 40,000 is not, and the second one usually has better headline metrics.",
              "The discipline is picking the cuts before you look. If you slice twelve ways after seeing the data, one slice will clear 40 percent by chance, and you will believe it because it will also have a story attached. Write down the three or four segments you consider meaningful, cut on those, and treat anything else you find as a hypothesis for next time.",
            ],
          },
          case: {
            brand: "Shopify",
            year: "2006",
            situation:
              "Tobias Lütke and his co-founders set out to sell snowboards online and found the available ecommerce software unusable, so they built their own store software to run one shop.",
            what: "The snowboard shop was the narrow market where the software was clearly better than the alternatives. Rather than broaden the store, they turned the software into the product and sold it to other small merchants with the same problem. The company still describes this origin publicly, and the pattern is that fit was found in a group defined by a shared constraint rather than by a demographic.",
            lesson:
              "The first group where you are the obvious choice is more valuable than a larger group where you are one of five options. Find it, name it, then ask what is adjacent to it.",
            sources: [
              { label: "Shopify, about the company", url: "https://www.shopify.com/about" },
            ],
          },
          ai: {
            move: "Cut your survey and retention data by each pre-registered segment and produce the score, the count, and the curve for each.",
            trap: "Multiple comparisons. Ask it to find the segments with the best scores and it will search every combination and hand you the winners, with no note that it looked at forty cuts to find them. With twelve segments and a bit of noise, something will always clear the bar. Give it your pre-registered list and tell it to report those and only those, including the ones that look bad.",
            prompt:
              "Here are the four segments I registered in advance. Report the score, the absolute count and the week-8 retention for each of the four, including the ones that perform badly. Do not search for other segments and do not suggest better cuts.",
          },
          build: {
            artefact:
              "A segmented fit readout with pre-registered cuts, including the segments that failed.",
            steps: [
              { do: "Write down three or four candidate segments, and why each is meaningful, before you look at any scores." },
              { do: "Compute score, count and week eight retention for each." },
              { do: "Report all of them, including the bad ones. The bad ones are what make the good one believable." },
              {
                do: "For your best segment, size it: how many people, and what is the route to more of them.",
                hint: "A segment you cannot buy, reach or convert into is a curiosity, not a strategy.",
              },
              { do: "Write the one sentence version of who this product is currently for." },
            ],
          },
          solution: {
            summary:
              "Pre-registering the cuts costs you one interesting finding and buys you a number you can defend in a board meeting.",
            walkthrough: [
              "Register the cuts on evidence, not on hope. Connected a bank in week one, multi-bank, referred by an existing user, and acquired through paid search.",
              "Compute all four. Two will be indistinguishable from the average, which is useful information about your acquisition mix.",
              "The winner needs a size and a route. 8,400 accounts, and the route is that the onboarding change from chapter 5 should move more people into it.",
              "If you find a fifth segment while looking, write it down as a hypothesis for the next survey rather than adding it to this readout. That single habit is the difference between a measurement and a search for good news.",
            ],
          },
          check: [
            "Did you write your segments down before you looked at the numbers?",
            "Which registered segment failed, and did you report it anyway?",
            "How large is your best segment, and how do you get more of them?",
          ],
        },
      ],
    },

    /* ================================================================ 7 */
    {
      slug: "betting",
      n: "7",
      title: "The bet, the test and the pack",
      summary:
        "Everything so far was evidence. This chapter is where you commit to one thing, try to kill it, and hand the result to someone else.",
      lessons: [
        {
          slug: "mvp",
          title: "The MVP that is not a worse version of your product",
          kind: "Build",
          minutes: 65,
          legacy: "Module 4.3 MVP, Module 4.2 Lean Customer Development",
          hook: "The team wants six weeks to build a minimum version. You suspect the same question can be answered in three days, and you have to make that case without sounding like you are cutting corners.",
          explain: {
            title: "Name the riskiest assumption, then test only that",
            body: [
              "Every idea rests on one assumption that, if false, kills it. Usually it is people want this, occasionally it is we can build this, and very occasionally it is they will pay for this. Your minimum version tests that one assumption. It is not a small version of the product, it is an instrument aimed at a single question.",
              "Which is why the format follows the question rather than the roadmap. A landing page tests whether the promise is compelling. A concierge, where you do the work by hand for ten users, tests whether the output is valuable and teaches you what the algorithm would need to do. A clickable prototype tests whether people can follow the flow. None of these is a lesser product, and none of them is code you keep.",
              "If you feel protective of what you built, you built the wrong thing. A good minimum version is slightly embarrassing, answers its question in days, and is thrown away without a meeting.",
            ],
          },
          case: {
            brand: "Buffer",
            year: "2010",
            situation:
              "Joel Gascoigne had an idea for scheduling social posts and no evidence anyone would pay for it, and no interest in building for months to find out.",
            what: "He put up a two page site. The first page described the product and had a plans and pricing button. Clicking it led to a page saying the product was not quite ready, with an email field. When people gave their email he knew there was interest; when he added actual prices to the middle page and people still clicked through, he knew there was willingness to pay. He has written up the sequence from idea to paying customers over the following weeks.",
            lesson:
              "Two different questions, two different pages, tested in order, before any product existed. The lesson is the sequencing as much as the fake door.",
            sources: [
              {
                label: "Buffer, idea to paying customers in 7 weeks",
                url: "https://buffer.com/resources/idea-to-paying-customers-in-7-weeks-how-we-did-it/",
              },
            ],
          },
          ai: {
            move: "Use an AI app builder to stand up the landing page or clickable prototype in an afternoon, then drive real traffic to it.",
            trap: "The builders are now good enough that building the real thing is easier than building the instrument, and you will drift into it. Four hours in you have a working product and no answer, because you never put the question anywhere it could fail. Write the riskiest assumption at the top of the file before you open the tool, and check the finished thing against it before you ship it.",
          },
          build: {
            artefact:
              "A live minimum version testing one named assumption, with real traffic on it and a written result.",
            steps: [
              { do: "Write the riskiest assumption as a falsifiable sentence with a number in it." },
              {
                do: "Choose the cheapest format that could falsify it: fake door, video, concierge, or clickable prototype.",
                hint: "If the assumption is about value rather than comprehension, concierge beats a prototype every time. Do the work by hand for ten people.",
              },
              { do: "Build and deploy in under a day." },
              { do: "Get at least 50 real people to it, from where your users already are." },
              { do: "Write the result against the sentence: confirmed, killed, or inconclusive, and why." },
            ],
            tools: ["v0, Lovable or Bolt", "Vercel or Netlify", "Plausible or GA4"],
          },
          solution: {
            summary:
              "Most first attempts test comprehension when the risk was value. Naming the assumption in a sentence with a number is what prevents that.",
            walkthrough: [
              "Write the sentence. At least 15 percent of people who see the offer will give us an email address for it. Now the result can disagree with you.",
              "Pick the format from the assumption, not from what is fun to build. If the risk is whether the output is useful, a beautiful landing page tells you nothing about it.",
              "Concierge is underrated. Categorise ten users' transactions by hand for a month and you will learn what the model needs, what the edge cases are, and whether anyone notices when it is right.",
              "Set the sample size before you start. Fifty visitors is enough to distinguish 15 percent from 2 percent and nowhere near enough to distinguish 15 from 20.",
              "Write inconclusive when it is inconclusive. The main failure of this exercise is a result stretched to fit the hope.",
            ],
          },
          check: [
            "What was your riskiest assumption, written as a number?",
            "Did the result move your belief, or did you build something that could not fail?",
          ],
        },

        {
          slug: "experiment-that-can-fail",
          title: "An experiment that can fail",
          kind: "Build",
          minutes: 60,
          hook: "Dev will give you one week of one engineer. You get one test. If you write the success criteria after you see the numbers, you will pass it, and you will have learned nothing.",
          explain: {
            title: "Pre-register, then run",
            body: [
              "Before anything runs, write down five things: the metric, the size of the change that would count, how long it runs, how many people it needs, and the decision you will take for each outcome. That document is the experiment. Everything after it is administration.",
              "Pre-registration is not bureaucracy, it is the only defence against the thing your brain does automatically when it sees a result it wanted. Without it you will find a segment where it worked, or extend the run by a week, or notice that the metric you should really have used is the one that moved.",
              "And write the null result into the plan. What do we do if nothing happens is the question that separates an experiment from a launch with a dashboard. If the answer is we ship it anyway, do not run the test, just ship it and save the week.",
            ],
            diagram: "ab-test",
            caption:
              "The decision rule is written before the data exists. That is the whole mechanism.",
            points: [
              { term: "Minimum detectable effect", def: "The smallest change worth acting on. It sets the sample size, not the other way around." },
              { term: "Decision rule", def: "What you do at each outcome, written in advance and signed by whoever will be in the room." },
              { term: "Null result", def: "Nothing happened. A real outcome with a real action, usually stop." },
            ],
          },
          case: {
            brand: "Microsoft Bing",
            situation:
              "Bing ran online controlled experiments at very large scale, on a stream of ideas generated by people who were confident about them.",
            what: "Ronny Kohavi's published account with Stefan Thomke reports that only about a third of ideas tested at Microsoft improved the metrics they were designed to improve. The same account describes an engineer's proposal to change how ad headlines were displayed, which sat neglected for months because it looked trivial, and which turned out to increase revenue by roughly 100 million dollars a year when it was finally tested.",
            lesson:
              "Two conclusions from one dataset. Most confident ideas are wrong, and the value of the ones that are right is not visible in advance. Both are arguments for testing cheaply and often rather than arguing better.",
            sources: [
              {
                label: "Kohavi and Thomke, The Surprising Power of Online Experiments, HBR 2017",
                url: "https://hbr.org/2017/09/the-surprising-power-of-online-experiments",
              },
            ],
          },
          ai: {
            move: "Have a model compute the sample size for your minimum detectable effect and draft the pre-registration document from your hypothesis.",
            trap: "After the run, do not ask it whether the result is good. Given numbers and no rule, it narrativises noise into a finding, and it will agree with whichever direction your question implies. Give it the pre-registered rule and the numbers and ask only which branch of the rule applies. Anything beyond that is it writing you a story.",
            prompt:
              "Here is the decision rule I wrote before the run, and here are the final numbers. State which branch of the rule applies and nothing else. Do not interpret, do not suggest additional analyses, do not comment on segments.",
          },
          build: {
            artefact:
              "A pre-registration document, a run, and a readout that follows the rule even when the rule disappoints you.",
            steps: [
              { do: "Write the hypothesis as a directional claim about one metric." },
              { do: "Set the minimum detectable effect, then compute the sample size and the run length it implies." },
              {
                do: "Write the decision rule with three branches: better, worse, and nothing happened.",
                hint: "Get one other person to sign the rule before the run starts. A signature makes moving the goalposts a social act rather than a private one.",
              },
              { do: "Run it. Do not look at the results daily, and do not stop early because it looks good." },
              { do: "Write the readout against the rule, then note separately anything you noticed that is a hypothesis for next time." },
            ],
            tools: ["Your experiment tool or a feature flag", "A sample size calculator"],
          },
          solution: {
            summary:
              "Most first attempts are underpowered, which means the result will be inconclusive no matter what happens. Discover that before the run, not after.",
            walkthrough: [
              "Start from the minimum detectable effect. If a two point lift is not worth shipping, do not design a test that could detect one.",
              "Compute the sample. At Sona's volume, detecting a five point change on a 41 percent baseline needs roughly a couple of thousand users per arm, which is about two weeks. If you only have one week, say so now and change the design or the ambition.",
              "Write all three branches. Better: ship and monitor the counter metric for a month. Worse: revert and write down what it suggests about the mechanism. Nothing: stop, and do not run a variant of the same idea without new evidence.",
              "During the run, look once at the halfway point, and only to check that nothing is broken.",
              "At the end, apply the rule first and only then look at segments. Anything interesting there is a hypothesis for the next test and must be labelled as one in the readout.",
            ],
            example: {
              label: "A decision rule you can sign",
              body: "Metric: share of new users who connect a bank account within 24 hours. Baseline 41 percent. MDE 5 points. Sample 2,100 per arm, roughly 14 days. If the variant is 5 points or more above control, ship and watch support volume for 30 days. If it is 3 or more points below, revert. Anything in between counts as no effect, and we stop working on this idea.",
            },
          },
          check: [
            "Was your test powered to detect the effect you cared about?",
            "Which branch of your rule did the result land in, and did you follow it?",
          ],
        },

        {
          slug: "kill-your-favourite",
          title: "Kill your favourite",
          kind: "Simulation",
          minutes: 50,
          legacy: "Module 5.5 Strategy",
          hook: "The idea you are most excited about has the thinnest evidence on the tree. You have known this for a week. You have not said it out loud.",
          explain: {
            title: "Pre-register what would change your mind",
            body: [
              "Before you argue about an idea, write down the specific evidence that would revive it. Doing that converts an emotional fight into a testable condition, and it moves the conversation from whether you are right to what we would need to see.",
              "The kill list is the most reused document you will write. It records what was decided against, when, on what evidence, and what would reopen it. Without it the same idea returns every quarter with no new information, and each time it costs the team a week of arguing.",
              "Killing things is normal and correct. Killing them without writing down why is what destroys credibility, because from the outside an unexplained no is indistinguishable from a whim, and people stop bringing you ideas.",
            ],
          },
          case: {
            brand: "Google Reader",
            year: "2013",
            situation:
              "Google Reader had a small, intensely loyal user base and, by Google's account, declining usage against a company-wide push to concentrate effort on fewer products.",
            what: "Google announced the shutdown in a post about focusing resources, giving users about three months and a data export path. The decision was defensible on the numbers and remains a reference point for reputational damage, largely because the reasoning was a single sentence about declining usage with no criteria attached, so to the affected users it read as arbitrary.",
            lesson:
              "The kill was probably right. The communication is what people remember. Write the reasoning and the criteria down, and publish them to whoever is affected.",
            sources: [
              {
                label: "Official Google Blog, A second spring of cleaning",
                url: "https://googleblog.blogspot.com/2013/03/a-second-spring-of-cleaning.html",
              },
            ],
          },
          ai: {
            move: "Ask a model to steelman the case against your favourite idea, using only the evidence you collected, and to role play the stakeholder who championed it.",
            trap: "It raises objections you have already handled, because it does not know what is in your document, and it concedes far too quickly once you push back. Paste the actual document and instruct it to raise only objections the document does not answer, and to refuse to concede unless the counter-argument cites a specific row in the evidence log.",
            prompt:
              "Here is my brief and my evidence log. Raise only objections my brief does not already answer. Do not concede any objection unless my reply cites a specific row id from the log. Push back at least three times on each.",
          },
          build: {
            artefact:
              "A written kill decision with revival criteria, and the start of a kill list you will keep.",
            steps: [
              { do: "Pick the idea you most want to build and have the least evidence for." },
              { do: "Run the adversarial review. Keep only the objections you cannot answer with a row from the log." },
              {
                do: "Write the kill decision: what, why, and the specific evidence that would revive it.",
                hint: "Revival criteria must be observable. Ten enterprise prospects asking for it unprompted is a criterion. If the market matures is not.",
              },
              { do: "Send it to the person who most wanted the idea, before anyone else hears about it." },
              { do: "Start the kill list document. Date, idea, reason, revival criterion, one row per decision." },
            ],
          },
          solution: {
            summary:
              "A kill written well reads as a deferral with conditions, which is usually what it honestly is.",
            walkthrough: [
              "Say what is being killed in the first line, plainly. Softening the opening makes people read the whole thing looking for the catch.",
              "Give the reason as evidence, not as judgement. Four rows out of 412, none from paying accounts, is a reason. Not a priority is a verdict.",
              "Write two or three revival criteria, each observable and each with a number. This is the part that keeps the relationship intact.",
              "Tell the champion first and in person if you can. The document is for the record, the conversation is for the person.",
              "Add it to the list the same day, or it will not happen and the whole exercise evaporates in a fortnight.",
            ],
            example: {
              label: "One row of a kill list",
              body: "2026-03-14. Shared household budgets. Killed. Evidence: 4 of 412 coded rows, all from free accounts, none in 60 sales calls. Revives if: 10 or more paying accounts request it unprompted in a quarter, or it appears in 3 or more lost-deal reports as the named blocker.",
            },
          },
          check: [
            "What exact, observable evidence would revive the idea you killed?",
            "Could a new hire read your kill list and know not to re-propose it, and why?",
          ],
        },

        {
          slug: "the-discovery-pack",
          title: "A pack someone else can act on",
          kind: "Workshop",
          minutes: 60,
          hook: "You leave for a week. Everything you learned this level has to keep working while you are gone, in the hands of people who were not in any of the interviews.",
          explain: {
            title: "The handoff test",
            body: [
              "The test for a discovery pack is not whether it is thorough. It is whether someone who was not there can act on it without asking you a question. That means the bet is on the first page, the evidence is traceable, and the thing that would prove you wrong is written down by you rather than discovered by them.",
              "Five parts. The bet, in one sentence, with the number it is supposed to move. The evidence, as a log rather than a narrative. The problems, ranked, with counts. The one you would spend the quarter on, and why it beats the second one specifically. And the disconfirming test: the cheapest thing that could show this is wrong, with the date you will run it.",
              "The last part is what separates a pack from a pitch. A pitch presents a conclusion and defends it. A pack presents evidence, states a bet, and names the conditions under which the bet is off, which is the only form of confidence a reader can check.",
            ],
            diagram: "prd-anatomy",
            caption:
              "Five parts fit in a pack someone reads. The rest is an appendix nobody opens, which is fine.",
          },
          case: {
            brand: "Basecamp",
            situation:
              "Basecamp needed a way to hand a piece of work to a team without either writing a specification that removed all judgement or handing over a one line idea that would expand forever.",
            what: "Shape Up defines a pitch with a fixed shape: the problem with its evidence, the appetite meaning how much time the problem is worth, the rough solution, the rabbit holes that could sink it, and the no-gos, meaning what is explicitly excluded. The no-gos and the appetite do most of the work, because they are the parts that let a team make their own decisions without the scope growing.",
            lesson:
              "A good handoff document constrains the problem and frees the solution. Most bad ones do the exact opposite.",
            sources: [
              { label: "Shape Up, Basecamp", url: "https://basecamp.com/shapeup" },
            ],
          },
          ai: {
            move: "Simulate a skeptical stakeholder who has read only the pack. Give the model the evidence log and the problem statements, and ask it what it concludes, without telling it your conclusion.",
            trap: "This is the last and worst version of the trap that has run through the whole level. If you paste your conclusion into the prompt, the model will agree with it and generate a defence, and you will read that as validation. Give it the evidence and nothing else. If it does not reach your bet on its own, your pack does not carry the argument, and no amount of rewriting the conclusion will fix that.",
            prompt:
              "Here is an evidence log and five problem statements with counts. You have not seen my recommendation. Which problem would you spend a quarter on, what is the strongest argument against your choice, and what is missing from this evidence that you would want before deciding?",
          },
          build: {
            artefact:
              "The discovery pack: bet, evidence log, ranked problems, the chosen one, and the disconfirming test.",
            steps: [
              { do: "Write the bet in one sentence with the metric and the current number in it." },
              { do: "Assemble the evidence log from chapters 2, 3 and 4. Every row keeps its verbatim quote and source." },
              { do: "Rank the problems with counts and the sizing from chapter 5." },
              {
                do: "Argue for the one you chose against the runner up specifically, in a paragraph.",
                hint: "Beating the second best option is the only comparison that matters. Beating nothing is not an argument.",
              },
              { do: "Write the disconfirming test with a date, and the pre-registered rule from this chapter." },
              { do: "Run the blind stakeholder simulation. Fix whatever it could not reach, then run it again." },
            ],
          },
          solution: {
            summary:
              "A pack that passes the handoff test is about four pages, and the first page is enough for a decision.",
            walkthrough: [
              "Page one: the bet, the number, the top three problems with counts, and the test with its date. If someone reads only this, they can still act.",
              "Page two: the chosen problem in full, the five part statement, the sizing with its assumptions, and the argument against the runner up.",
              "Page three: the tree, marked to show which nodes are hypotheses.",
              "Page four: the kill list, with revival criteria. This is the page people come back to.",
              "The evidence log is a linked sheet, not a page. Nobody reads it and everybody needs it to exist, because its existence is what makes the counts believable.",
              "Run the blind simulation last. If a reader with only your evidence picks a different problem, either they are wrong and your pack does not say why, or they are right. Both mean more work.",
            ],
            example: {
              label: "The first three lines of a pack that works",
              body: "Bet: moving multi-bank users through second-account connection lifts week four retention from 19 percent to 26 percent by end of Q3. Evidence: 34 of 412 coded rows, 3 of 3 interviews, 4 of 5 watched sessions stalled at the same screen. Disconfirming test: a one week copy change on the connection success screen, pre-registered, running 4 to 11 April. If it moves second connections by fewer than 5 points, the mechanism is wrong and the bet is off.",
            },
          },
          check: [
            "Did the blind simulation reach your bet from the evidence alone?",
            "Can a reader trace any number in the pack to a verbatim quote?",
            "What would prove you wrong, and on what date will you know?",
          ],
        },
      ],
    },
  ],
};
