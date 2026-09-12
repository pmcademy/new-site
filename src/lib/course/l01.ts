import type { Level } from "./types";

/**
 * LEVEL 01. Apprentice
 *
 * Rebuilt from the original modules 1 (Orientation), 2 (Way of the PM),
 * 3 (Modern Business Basics) and 5 (Breaking Down Products).
 *
 * The learner picks a domain before starting, and every scene, dataset and
 * build is set inside that product. Sona is the default: an AI personal
 * finance app, Series A, 40 people.
 */
export const l01: Level = {
  slug: "01",
  n: "01",
  rank: "Apprentice",
  badge: "Apprentice",
  title: "Product Foundations",
  promise:
    "Walk into a company with no product process and produce something useful in your first week.",
  arc: "You are the first product hire. Nobody hands you a brief. There are app store reviews, a support inbox, an engineer who is busy, and a founder who wants an answer on Friday. Everything in this level happens inside that building.",
  scene: {
    image: "/img/scenes/office-wide.webp",
    alt: "The Sona office: an open-plan room with a whiteboard covered in sticky notes and a bank of monitors.",
    caption:
      "Placeholder. Swap for the real Sona office renders in /public/img/scenes.",
  },
  who: "You have never held a product title, or you have one and nobody ever taught you the job.",
  outcomes: [
    "Turn a pile of unstructured feedback into a claim you can defend in a room",
    "Read any interface and name the business decision behind it",
    "Pick a metric that cannot be gamed, and the counter-metric that keeps it honest",
    "Write one page that a busy founder actually finishes, and survive the questions",
  ],
  capstone: {
    title: "The Friday memo",
    body: "One page to the founder: what is actually broken, who it hurts, what you would do first, and how you would know it worked. Judged the way a real first memo is judged, which is whether anything changes because of it.",
    ship: [
      "A one-page memo, published to your portfolio",
      "The evidence log behind every claim in it",
      "A five minute walkthrough you record yourself giving",
    ],
  },

  chapters: [
    /* ================================================================ 1 */
    {
      slug: "the-job",
      n: "1",
      title: "What the job actually is",
      summary:
        "Not the job description. The job: deciding what gets built, on incomplete information, with authority over nobody.",
      lessons: [
        {
          slug: "your-first-monday",
          title: "Your first Monday",
          kind: "Case study",
          minutes: 55,
          legacy: "Module 2.1, Product Management 101",
          hook: "The founder forwards you 200 app store reviews with the message “what should we fix?” and nothing else. No brief, no context, no meeting. It is 9:40am on your first day.",
          scene: {
            image: "/img/scenes/desk-day-one.webp",
            alt: "A desk on the first day: a laptop, a lanyard, an unopened notebook and a cold coffee.",
            caption: "Your desk, 9:40am.",
            notes: [
              {
                from: "Maya, founder",
                text: "Forwarded you the reviews. What should we fix? Need a view by Friday, I present to the board Monday.",
              },
              {
                from: "Dev, engineering lead",
                text: "Heads up, we are mid-sprint until Thursday. Happy to talk after, but please do not add anything before then.",
              },
              {
                from: "Priya, support",
                text: "I have opinions. 400 tickets this month and I think it is all the same three things. Coffee?",
              },
            ],
          },
          explain: {
            title: "What a product manager actually does",
            body: [
              "A product manager decides what gets built and why. You own the problem and the priority. You do not own the design, the code, or the people writing it.",
              "Which means everything you get done, you get done by being the person with the clearest picture of reality in the room. Not by instructing anyone. That is the whole job, and it is why the first move is always to go and look.",
              "The trap on day one is to have ideas. You have not earned an idea yet. What you have is a pile of raw signal, and the skill is collapsing it into a small number of claims you can point at evidence to defend.",
            ],
            diagram: "signal-to-claim",
            caption:
              "The move you will make in every discovery task for the rest of your career.",
            points: [
              {
                term: "Signal",
                def: "Raw, unstructured, mostly noise. Reviews, tickets, calls, session recordings.",
              },
              {
                term: "Cluster",
                def: "The same complaint said forty different ways. Grouping is where judgement enters.",
              },
              {
                term: "Claim",
                def: "One sentence you would defend in front of the founder, with a quote behind it.",
              },
            ],
          },
          case: {
            brand: "Slack",
            logo: "/img/brands/slack.svg",
            year: "2013",
            situation:
              "Slack began as Glitch, a multiplayer game that failed. The team had built an internal chat tool to coordinate their own work and noticed they could not stop using it.",
            what: "Stewart Butterfield killed the game and shipped the internal tool. Before launch they did not run a survey. They got a handful of friendly companies to use it and watched, obsessively, for the moment a team stopped being able to work without it. That threshold became their activation metric: 2,000 messages sent.",
            lesson:
              "Nobody handed Slack a brief either. The signal was already inside the company and someone had to notice it, then be willing to throw away a year of work. Your first job is not to have ideas. It is to see what is already there.",
            sources: [
              {
                label: "Slack's first press release, 2013",
                url: "https://slack.com/blog/news/btf-slack-is-launching",
              },
            ],
          },
          ai: {
            move: "Paste all 200 reviews into a model and ask for a structured extraction: one row per review with a problem label, a severity guess, and the exact quote preserved. Then sort by label and count.",
            trap: "The model merges complaints that share vocabulary but not cause. “Cannot log in” and “app logs me out constantly” become one cluster, but one is an onboarding failure and the other a session bug, and they go to different teams. Hand read 20 rows and find the merged cluster. There is always at least one.",
            prompt:
              "For each review below, return JSON: {quote, problem_label, severity_1_to_5, user_type_guess}. Do not summarise or paraphrase the quote, copy it exactly. Use at most 8 distinct problem_labels.",
          },
          build: {
            artefact:
              "A ranked one page memo: what is broken, for whom, and what you would do first.",
            steps: [
              {
                do: "Open the 200 review dataset from the lesson files and run the extraction prompt over all of them.",
              },
              {
                do: "Hand read 20 rows at random. Find at least one cluster the model merged that should not be, and split it.",
                hint: "Sort by label, then read the quotes inside the biggest cluster. Merged clusters have quotes that do not sound like each other.",
              },
              {
                do: "Rank the clusters by how many people times how badly it hurts. Write the number next to each.",
              },
              {
                do: "Write the memo. One page maximum: the problem, who has it, the evidence, what you would do first, and how you would know it worked.",
              },
              {
                do: "Delete every sentence that would not change what someone does. Aim to cut 30 percent.",
              },
            ],
            tools: ["Claude or ChatGPT", "Google Sheets"],
          },
          solution: {
            summary:
              "The 200 reviews collapse into four real problems. One of them is roughly half the volume, and it is not the one the founder expects.",
            walkthrough: [
              "Run the extraction. You will get eight or nine labels, and the biggest will be something like AUTH or LOGIN with about 90 rows.",
              "Read those 90. Roughly two thirds are people whose verification code expired before they used it. The rest are being logged out mid session, days later. Those are two different bugs owned by two different people.",
              "Split them. Now your biggest single cluster is verification expiry at about 60 rows, which maps exactly to the drop in the signup funnel.",
              "Rank by reach times severity. Verification expiry wins on both: it hits every new user, and the ones it hits never become users at all.",
              "The memo leads with that, and names the counter argument: fixing it will not help the people already logged out, which is a separate and smaller problem.",
            ],
            example: {
              label: "The first three lines of a memo that works",
              body: "We are losing roughly 6 in 10 new signups at email verification, because the code expires in 10 minutes and the median user takes 14. This is 88 of 200 reviews and matches the funnel drop from 41% to 19%. I would extend expiry to 24 hours and add a resend button, which is a two day change.",
            },
          },
          check: [
            "Can you point at a specific quote behind every claim in your memo?",
            "Which cluster did the model merge incorrectly, and how did you spot it?",
            "If the founder says “do the second one instead”, what do you say?",
          ],
          references: [
            {
              label: "Marty Cagan, Inspired: the product manager's real job",
              url: "https://www.svpg.com/behind-every-great-product/",
            },
          ],
        },

        {
          slug: "three-chairs",
          title: "Who owns what, and what you cannot order anyone to do",
          kind: "Concept",
          minutes: 45,
          legacy: "Module 2.2, Role of Product",
          hook: "You have picked a problem. The designer says the fix needs a full flow redesign, the engineer says the flow is fine and it is a data bug, and support says both are missing the point. You have authority over none of them.",
          explain: {
            title: "The three chairs",
            body: [
              "Every product decision has to answer three questions, and each one belongs to a different discipline. Is this worth doing? Can we build it, and at what cost? Is it usable?",
              "A product manager does not sit in one of those chairs. You sit in the middle, and your job is to make sure all three questions get honestly answered before anyone commits. When three smart people disagree it is almost always because they are optimising different things and nobody has said so out loud.",
            ],
            diagram: "three-chairs",
            points: [
              {
                term: "Product Owner",
                def: "Grooms the backlog for one team. A subset of the PM role, not a synonym.",
              },
              {
                term: "Product Marketing",
                def: "Owns how it is positioned and sold. Different question, adjacent seat.",
              },
              {
                term: "Engineering Manager",
                def: "Owns the people and the delivery. You never direct their team.",
              },
            ],
          },
          case: {
            brand: "Spotify",
            logo: "/img/brands/spotify.svg",
            situation:
              "Spotify's much copied squads and tribes structure gave every squad a PM, a designer and engineers, with no manager who could order the squad what to build.",
            what: "It worked at Spotify and failed at most companies that copied it, because the copies took the org chart and skipped the part that made it work: squads owned a metric. Without an owned outcome, autonomy just means nobody agrees and nothing ships. Spotify's own engineers later published that the model was aspirational and never fully implemented even internally.",
            lesson:
              "Influence comes from owning an outcome and having the best picture of it. Not from a title, and not from a process diagram.",
            sources: [
              {
                label: "Failed Squad Goals, Jeremiah Lee",
                url: "https://www.jeremiahlee.com/posts/failed-squad-goals/",
              },
            ],
          },
          ai: {
            move: "Run the argument as a simulation. Give a model three system prompts, a designer protecting coherence, an engineer protecting the sprint, a support lead protecting ticket volume, and argue your case until you find a framing all three accept.",
            trap: "The model is too agreeable. If it concedes in under three exchanges it is role playing politeness, not the person. Add “do not concede unless the argument addresses your specific concern, and push back at least three times”.",
            prompt:
              "You are a senior designer at a 40 person fintech. You care about flow coherence and you have been burned by point fixes that made the product incoherent. Do not concede unless my argument addresses that specific concern. Push back at least three times. My proposal is:",
          },
          build: {
            artefact:
              "A one paragraph decision note that states the disagreement plainly and the call you are making anyway.",
            steps: [
              {
                do: "Write down, in one line each, what the designer, the engineer and support are each protecting.",
              },
              { do: "Run the three way simulation until you have an argument that survives all three." },
              {
                do: "Write the decision note: what we are doing, what we are explicitly not doing, and what would change our mind.",
                hint: "The last part separates a decision from an opinion. If nothing would change your mind, you picked a favourite.",
              },
            ],
            tools: ["Claude or ChatGPT"],
          },
          solution: {
            summary:
              "The disagreement is not about the fix. It is that each person is protecting a different cost, and none of them has said which.",
            walkthrough: [
              "The designer is protecting coherence, which is a cost paid later by everyone who touches the flow.",
              "The engineer is protecting the sprint, which is a cost paid this week by their team.",
              "Support is protecting ticket volume, which is a cost they pay every single day and nobody else feels.",
              "The framing that lands is time bounded: ship the point fix now because support is bleeding daily, and put the flow redesign on the roadmap with a date, so coherence is deferred rather than abandoned.",
            ],
          },
          check: [
            "What was each person actually protecting, in their words rather than yours?",
            "What specific evidence would make you reverse the decision?",
          ],
        },

        {
          slug: "the-decision-meeting",
          title: "Running the meeting where it gets decided",
          kind: "Workshop",
          minutes: 50,
          legacy: "Modules 2.3 and 9.4",
          hook: "Thirty minutes, six people, and a decision that has been drifting for two weeks. Two of them will not have read the document.",
          explain: {
            title: "A meeting is a product, and most are badly designed",
            body: [
              "If people arrive unprepared, that is a flaw in your process rather than a character flaw in them. So fix it with structure.",
              "Three rules carry almost all of it. State the decision in the invite as a sentence with a date in it. Give the first ten minutes to silent reading, which feels wasteful and saves the other twenty. End with a named owner and a date, or the meeting has not ended, it has been postponed while everyone pretends otherwise.",
            ],
          },
          case: {
            brand: "Amazon",
            logo: "/img/brands/amazon.svg",
            situation:
              "Amazon banned slide decks in decision meetings. The person proposing writes a six page narrative memo instead, and the first twenty minutes of the meeting are spent in silence, reading it.",
            what: "Bezos's reasoning was that bullet points let you hide a weak argument behind a confident delivery, while prose forces you to connect your claims. The silent reading exists because “everyone read the doc” is never true, so the meeting stopped pretending.",
            lesson:
              "Meeting design is product design. The format you choose determines the quality of the decision you get out of it.",
            sources: [
              {
                label: "Amazon shareholder letter, 2017",
                url: "https://www.aboutamazon.com/news/company-news/2016-letter-to-shareholders",
              },
            ],
          },
          ai: {
            move: "Draft the agenda and the decision statement, then ask the model for the three hardest questions someone could ask, and answer them in advance.",
            trap: "It produces generic objections about timeline and cost. Push it: “only ask questions that a person who has read the memo and disagrees with it would ask”. The generic ones cost you nothing, the specific ones are the meeting.",
          },
          build: {
            artefact:
              "A run of show for a real thirty minute decision meeting, plus three hard questions and your answers.",
            steps: [
              { do: "Write the decision as one sentence with a date in it." },
              { do: "Build the run of show: 10 minutes silent read, 15 discussion, 5 decision plus owner plus date." },
              { do: "Generate and answer the three hardest questions." },
              {
                do: "Run it for real, with real people, even if it is a study group.",
                hint: "Record it. Watching yourself run a meeting is the fastest feedback loop in this chapter.",
              },
            ],
          },
          solution: {
            summary:
              "A good decision statement is falsifiable and dated. Most are neither.",
            walkthrough: [
              "Bad: “discuss onboarding improvements”. Nothing can be decided, so nothing will be.",
              "Better: “decide whether to cut email verification from signup”. Now there is a yes and a no.",
              "Good: “decide whether to cut email verification from signup before the 12th, given it costs us 6 in 10 signups and creates a fraud risk finance has not sized”. Now the room knows what to bring.",
            ],
          },
          check: [
            "Is your decision statement a sentence with a date in it?",
            "Did the meeting end with a named owner, or with “let us sync again”?",
          ],
        },
      ],
    },

    /* ================================================================ 2 */
    {
      slug: "reading-products",
      n: "2",
      title: "Reading a product",
      summary:
        "Every screen you use is the fossil of an argument someone won. Learn to read the argument off the interface.",
      lessons: [
        {
          slug: "reading-an-interface",
          title: "Reading intent off an interface",
          kind: "Teardown",
          minutes: 50,
          legacy: "Modules 5.1 and 8.1",
          hook: "Open any app you use daily and look at the single most prominent button on the home screen. Somebody fought for that. Somebody else lost.",
          explain: {
            title: "Prominence, friction and default",
            body: [
              "Three levers explain most of what you see. What is big and central is what they want you to do. What takes extra taps is what they tolerate. What is pre-selected is what most people will end up doing, because almost nobody changes a default.",
              "Every screen trades something away. Simplicity costs power users, density costs beginners, and there is no layout that wins on both. So the question is never “is this good”, it is “who did they decide to lose”.",
            ],
            diagram: "hierarchy",
            caption:
              "Hierarchy is an argument about what matters, made visible.",
          },
          case: {
            brand: "Instagram",
            logo: "/img/brands/instagram.svg",
            situation:
              "The 2012 home screen had one job: show photos from people you follow, in order.",
            what: "The camera button moved to the centre, then to a swipe. Chronological went away. Stories took the top strip, then Reels took the bottom centre slot that used to be post. Each move traded a little creator intent for a lot of consumption time, which is the metric Meta monetises. You can read the business strategy off the tab bar.",
            lesson:
              "Prominence is a statement of priority, and priority is usually a statement about money.",
          },
          ai: {
            move: "Screenshot the interface, give it to a vision model, and ask what the screen is optimising for and what it makes harder. Then argue with it and write down every point where you disagree.",
            trap: "Vision models describe what is visually salient, not what is strategically important. They will tell you the hero image is the focus and miss that the real decision is a pre-ticked checkbox in 11px grey. Salience and intent are different things.",
          },
          build: {
            artefact:
              "A one screen teardown: what it optimises for, what it trades away, and who lost the argument.",
            steps: [
              { do: "Pick one screen from a product you use daily. Screenshot it." },
              { do: "Annotate directly on the image: mark prominence, friction and defaults." },
              {
                do: "Find one thing that used to be there and is not.",
                hint: "Search the product's subreddit for “bring back”. Fastest archaeology tool in product.",
              },
              { do: "Write the teardown: the decision, the trade, and the metric you think drove it." },
            ],
            tools: ["Figma or Excalidraw", "A vision model"],
          },
          solution: {
            summary:
              "A good teardown names a metric. A weak one describes the layout.",
            walkthrough: [
              "Weak: “the home screen is clean and puts content first”. True of almost every app, so it says nothing.",
              "Strong: “the compose button moved from a fixed tab to a swipe gesture. That reduces posting by casual users and increases time in feed. They decided creators would find it anyway and viewers were worth more.”",
              "The test is whether someone could disagree with your reading. If not, you described rather than analysed.",
            ],
          },
          check: [
            "What does this screen make harder, and for whom?",
            "What was removed, and what does that tell you?",
          ],
        },

        {
          slug: "drawing-the-flow",
          title: "Drawing the flow",
          kind: "Build",
          minutes: 55,
          legacy: "Modules 5.1 and 8.2",
          hook: "Signup is “four simple steps”. Most people who start it never finish. Nobody can tell you which step loses them, because nobody has drawn it.",
          explain: {
            title: "A flow is states, not screens",
            body: [
              "Screens are what design draws. States are what actually happens: logged out, verified, partially complete, expired, errored. Most drop off lives in a state nobody drew.",
              "The rule of thumb is that each additional required step costs you roughly 10 to 20 percent of the people still in the funnel. Compounding across four steps is how “four simple steps” becomes a 38 percent completion rate.",
              "For every arrow in your flow, write the analytics event that would prove someone travelled it. If you cannot name the event, you will not be able to answer “where do we lose them” after launch either.",
            ],
            diagram: "user-flow",
            caption:
              "The dashed states are where the people go. They are almost never in the original spec.",
          },
          case: {
            brand: "Amazon",
            logo: "/img/brands/amazon.svg",
            year: "1999",
            situation:
              "Standard ecommerce checkout in the late nineties was five to seven steps, and every step lost customers.",
            what: "Amazon patented removing all of them. The insight was not clever design, it was that they already had your address and card, so every step after buy existed only because the flow had been designed around the company's data model instead of the customer's intent.",
            lesson:
              "Most flows are long because of how the company is organised, not because the user needs the steps. Drawing the flow is how you find those.",
          },
          ai: {
            move: "Describe the flow in prose, have a model turn it into Mermaid diagram code, render it, then hunt specifically for the edge states it invented and the real ones it dropped.",
            trap: "Models produce clean happy paths. They silently omit “user closes the app and comes back tomorrow”, “code expires”, and “email already registered”, which is exactly where your drop off is.",
            prompt:
              "Convert this flow into a Mermaid stateDiagram-v2. Then list every state you did NOT include but that could occur in reality: expired sessions, partial completion, duplicate accounts, network failure, permission denial.",
          },
          build: {
            artefact:
              "A rendered flow diagram with every edge state, and the event name for every arrow.",
            steps: [
              { do: "Write the happy path in prose, step by step." },
              { do: "Generate the Mermaid diagram and render it." },
              {
                do: "Add every state the model missed. Aim for at least six that are not the happy path.",
                hint: "Empty, loading, partial, expired, permission denied, offline, already exists, rate limited.",
              },
              { do: "Name the analytics event for every arrow." },
              { do: "Mark where you think the drop off is, and say why." },
            ],
            tools: ["Mermaid Live Editor", "Figma or Excalidraw"],
          },
          check: [
            "How many non happy path states did you find?",
            "Can you name the event that would prove your drop off theory?",
          ],
          references: [
            { label: "Mermaid state diagram syntax", url: "https://mermaid.js.org/syntax/stateDiagram.html" },
          ],
        },

        {
          slug: "finding-the-drop",
          title: "Finding the drop",
          kind: "Drill",
          minutes: 50,
          hook: "You have the flow. Now you need the numbers, and the data team's queue is eleven days long.",
          explain: {
            title: "A funnel is a multiplication, which is why it is brutal",
            body: [
              "Funnel steps multiply rather than add. Four steps that each keep 80 percent of people keep 41 percent overall. Four steps that each keep 40 percent keep 2.5 percent.",
              "Which means the step to fix is almost never the one with the smallest absolute number. It is the one with the worst rate, because that is the one leaking a proportion of everyone who reaches it.",
            ],
            diagram: "funnel",
            caption: "Same funnel, read two ways. The rate column is the one that matters.",
          },
          ai: {
            move: "Give a model your step counts and ask it to compute step to step rates, then identify which single step improvement would produce the largest absolute gain at the end of the funnel.",
            trap: "Models are unreliable at multi step arithmetic in prose and will confidently produce a wrong total. Make it write the formula, then compute it yourself in a sheet. Never let a chat window be your calculator.",
          },
          build: {
            artefact: "A funnel analysis with step rates and a ranked fix list.",
            steps: [
              { do: "Take the funnel counts from the lesson dataset into a sheet." },
              { do: "Compute the step to step rate for every step, not just the totals." },
              { do: "Model what happens to the final number if you improve each step by 10 points, one at a time." },
              { do: "Rank the steps by the size of that final gain, and write one line on why the top one wins." },
            ],
            tools: ["Google Sheets"],
          },
          solution: {
            summary:
              "The step with the worst rate is verification, and improving it by 10 points moves the end of the funnel more than improving any other step by 20.",
            walkthrough: [
              "Compute rates: 41, 46, 41, 40 percent across the four steps.",
              "Verification looks middling at 46 percent until you notice it sits early, so everything downstream is multiplied by it.",
              "Improving an early step compounds through every later step. Improving the last step only affects the people who already survived everything else.",
              "That is the general rule: fix early steps first, unless a later step is catastrophically worse.",
            ],
          },
          check: [
            "Which step has the worst rate, and is it the one with the biggest absolute loss?",
            "Why does improving an early step beat improving a late one?",
          ],
        },
      ],
    },

    /* ================================================================ 3 */
    {
      slug: "users-and-jobs",
      n: "3",
      title: "Users and their jobs",
      summary:
        "Who this is for, what they are actually trying to do, and how to find out without a research team.",
      lessons: [
        {
          slug: "jobs-not-demographics",
          title: "Jobs, not demographics",
          kind: "Concept",
          minutes: 45,
          legacy: "Module 4.5, Uncovering Personas and Segments",
          hook: "Marketing hands you a persona: “Ananya, 29, urban professional, loves brunch and fintech”. You have to build something on Monday and this tells you nothing.",
          explain: {
            title: "People hire products to do a job",
            body: [
              "A demographic describes who someone is. A job describes what they are trying to get done, in what situation, and what they will consider progress. Only the second one tells you what to build.",
              "The format that keeps you honest is: when [situation], I want to [motivation], so that [expected outcome]. The third clause is where the value is, and it is the one people skip.",
            ],
            diagram: "jobs-to-be-done",
            points: [
              { term: "Situation", def: "The trigger. When it happens, in the real world." },
              { term: "Motivation", def: "What they are trying to do right then." },
              { term: "Outcome", def: "How they will know it worked. This is what you actually build for." },
            ],
          },
          case: {
            brand: "McDonald's",
            logo: "/img/brands/mcdonalds.svg",
            situation:
              "McDonald's wanted to sell more milkshakes and had tried improving flavour and thickness based on customer surveys, with no effect.",
            what: "Clayton Christensen's team watched who bought them and found nearly half were sold before 8am, to solo commuters. The job was not dessert, it was a one handed breakfast that lasts a long commute and does not leave crumbs. The competition was bananas and bagels, not other milkshakes.",
            lesson:
              "Segment by job and your competitive set changes completely. Segment by demographic and you improve the flavour of something nobody was buying for its flavour.",
            sources: [
              {
                label: "Christensen on Jobs to be Done",
                url: "https://www.hbs.edu/faculty/Pages/item.aspx?num=50941",
              },
            ],
          },
          ai: {
            move: "Feed a model your support transcripts and ask it to extract jobs in the when/want/so-that format, one per transcript, quoting the line that supports each.",
            trap: "It will generate elegant jobs that no quote supports, because the format is easy to write and hard to falsify. Delete every job you cannot attach a real sentence to. Usually half.",
          },
          build: {
            artefact: "Three evidenced jobs, and a written argument for the one to build for.",
            steps: [
              { do: "Extract candidate jobs from the transcripts in the lesson dataset." },
              { do: "Delete every job with no supporting quote." },
              { do: "For the survivors, write what the user does today instead. That is your real competition." },
              { do: "Pick one, and write why it and not the other two." },
            ],
          },
          check: [
            "For each job, what does the user do today instead of using your product?",
            "How many of your candidate jobs died for lack of a quote?",
          ],
        },

        {
          slug: "talking-to-users",
          title: "Ten conversations you do not have yet",
          kind: "Workshop",
          minutes: 70,
          legacy: "Modules 3.5 and 4.4",
          hook: "You need to talk to real users. You have no research panel, no budget, and a founder who is nervous about you emailing customers.",
          explain: {
            title: "Ask about the past, never about the future",
            body: [
              "People are unreliable narrators of their future selves and reliable reporters of last Tuesday. So anchor every question in a specific recent event: tell me about the last time this happened, what did you do, what did it cost you.",
              "“Would you use this?” gets a polite yes from everyone, including your mother. It is worthless. Ask about cost instead: what did that cost you in time, money, or a workaround you built? If the answer is “nothing really”, you have found a problem nobody will pay to solve.",
              "The most valuable sentence in most interviews comes three seconds after you would normally start talking again. Count to five.",
            ],
          },
          case: {
            brand: "The Mom Test",
            situation:
              "Rob Fitzpatrick's book opens with a founder asking his mother whether she would use his app. She says yes. She is lying, kindly.",
            what: "The fix is to never ask about the future or about opinions, only about specific past behaviour. Facts about the past are hard to fake, predictions about the future are worthless from everyone, including you.",
            lesson:
              "You cannot ask people to design your product. You can ask them what they did, and design from that.",
            sources: [{ label: "The Mom Test", url: "https://www.momtestbook.com/" }],
          },
          ai: {
            move: "Draft your guide, then have a model audit every question for leading bias and for asking about the future rather than the past.",
            trap: "It passes questions that are subtly leading because they are grammatically neutral. “How important is speed to you?” presupposes speed matters. Ask specifically: which of these questions presuppose that the problem exists?",
            prompt:
              "Audit each interview question below. For each: is it about past behaviour or future intent? Does it presuppose the problem exists? Does it invite a polite yes? Rewrite the failures.",
          },
          build: {
            artefact: "A screener, an interview guide, and three recorded conversations.",
            steps: [
              { do: "Write a five question screener that filters for people who had the problem recently." },
              { do: "Write eight interview questions. Run the bias audit. Rewrite the failures." },
              {
                do: "Recruit three people. Reddit, Discord, LinkedIn, your own network.",
                hint: "Offer to share what you learn. Converts far better than a gift card and attracts people who care about the problem.",
              },
              { do: "Run and record all three. Transcribe them." },
              { do: "Write one page: what surprised you, and which of your assumptions died." },
            ],
            tools: ["Zoom or Google Meet", "Otter or Whisper"],
          },
          check: [
            "How many of your questions were about a specific past event?",
            "Which of your assumptions died in these three conversations?",
          ],
        },

        {
          slug: "segments-with-evidence",
          title: "Segments you can defend",
          kind: "Build",
          minutes: 55,
          hook: "Support says users are confused. Which users? The founder thinks students, sales thinks freelancers. Both are guessing, and the roadmap depends on the answer.",
          explain: {
            title: "A segment is only real if it behaves differently",
            body: [
              "The test for a segment is not that you can describe it. It is that it behaves measurably differently from the rest, and that the difference matters for what you would build.",
              "If two groups convert at the same rate, retain the same, and complain about the same things, they are one group with two labels on it.",
            ],
          },
          ai: {
            move: "Cross tabulate your coded signal log by user attribute and problem label, and ask a model to find which attribute best separates the complaint pattern.",
            trap: "With small samples it will confidently present a dominant theme that is four people. Always show the count next to the theme, and never report a percentage on fewer than 100 rows.",
          },
          build: {
            artefact: "Three evidenced segments with a behavioural difference named for each.",
            steps: [
              { do: "Take your coded signal log and add whatever user attributes you have." },
              { do: "Pivot by attribute against problem label." },
              { do: "For each candidate segment, name one behaviour that differs and cite the number." },
              { do: "Kill any segment where you cannot name a behavioural difference." },
            ],
            tools: ["Google Sheets"],
          },
          check: [
            "For each segment, what do they do differently, in numbers?",
            "Which candidate segment did you kill, and why?",
          ],
        },
      ],
    },

    /* ================================================================ 4 */
    {
      slug: "the-business",
      n: "4",
      title: "How the business works",
      summary:
        "Where the money comes from, and why the answer to “should we build this” is usually financial.",
      lessons: [
        {
          slug: "where-money-comes-from",
          title: "Where the money actually comes from",
          kind: "Teardown",
          minutes: 55,
          legacy: "Module 3.2, Business Models",
          hook: "The founder wants a premium tier. You have no idea whether that is a good idea, because you have never looked at how the company actually makes money.",
          explain: {
            title: "Five models cover almost everything",
            body: [
              "Subscription, transaction or marketplace, advertising, licensing or enterprise, and freemium. Most real companies run two of them at once.",
              "The number that reshapes your roadmap is marginal cost: what does one more active user cost to serve? If it is free you optimise for growth. If it is forty rupees a month you optimise for the users who will pay four hundred.",
              "And in enterprise, the buyer is not the user. Which is why enterprise software is often bad at being used and excellent at being bought. Know which one your feature serves.",
            ],
          },
          case: {
            brand: "Netflix and Spotify",
            situation:
              "Both are subscriptions, both stream media, and their product decisions look nothing like each other.",
            what: "Netflix owns most of what it shows, so an extra hour watched costs it roughly nothing and its product goal is engagement. Spotify pays rights holders per stream, so an extra hour costs real money and its goal is retention at the lowest cost to serve. That is why it pushed so hard into podcasts, where it owns the content.",
            lesson:
              "Two identical looking companies will make opposite calls, and both will be right, because their marginal costs are different.",
          },
          ai: {
            move: "Pick a product you use daily. Ask a model to lay out its revenue lines, then to name the product decisions that only make sense given those lines. Verify two claims against a primary source.",
            trap: "Models confidently invent revenue splits. They will give you a precise sounding “roughly 60 percent of revenue” with no source. Treat every number as a hypothesis until you find it in a filing, an earnings call, or a first party post.",
          },
          build: {
            artefact: "A one page business model teardown with two claims verified against primary sources.",
            steps: [
              { do: "Pick a product you use every day and can research publicly." },
              { do: "Map its revenue lines and estimate the marginal cost of one more active user." },
              {
                do: "Find two product decisions that only make sense given those economics.",
                hint: "Look at what is free, what is gated, and what got quietly removed. Pricing pages and changelogs are where economics become visible.",
              },
              { do: "Verify two numbers against a primary source and cite them." },
            ],
          },
          check: [
            "What does one more active user cost this company?",
            "Which two claims did you verify, and where?",
          ],
        },

        {
          slug: "unit-economics",
          title: "Does this feature make money?",
          kind: "Build",
          minutes: 60,
          legacy: "Module 19.2, Profit and Loss",
          hook: "The AI assistant costs about nine rupees per user per month in model calls. The subscription is one hundred and ninety nine. Finance wants a number, not an opinion.",
          explain: {
            title: "Four numbers, and everything else is decoration",
            body: [
              "CAC is what it costs to get a customer. ARPU is what they pay you. COGS is what serving them costs. Churn is how long they stay. Lifetime value is roughly ARPU minus COGS, divided by churn.",
              "The one executives ask about first is payback period: how many months until a customer has repaid what you spent acquiring them. Under twelve is healthy for most subscription businesses.",
              "AI features break the old assumption. Classic software had near zero marginal cost. A feature that delights users and loses forty rupees a month per user kills the company slowly.",
            ],
          },
          case: {
            brand: "Dropbox",
            logo: "/img/brands/dropbox.svg",
            situation:
              "Dropbox was paying roughly two to three hundred dollars per customer through paid search, for a product that cost ninety nine dollars a year.",
            what: "They replaced most of that spend with a referral programme that gave both sides free storage, a cost measured in cents of marginal infrastructure rather than dollars of ad spend. Signups rose 60 percent permanently.",
            lesson:
              "The insight was not that referrals are good. It was that their marginal cost of delivery was near zero, so paying in product was almost free while paying in cash was ruinous. The same tactic is brilliant at one company and fatal at another.",
          },
          ai: {
            move: "Build the model in a spreadsheet, then have a model stress test it: which assumption here, if wrong by 20 percent, changes the conclusion?",
            trap: "Never let a chat window do the arithmetic. Make it write the formulas and compute them yourself in the sheet.",
          },
          build: {
            artefact: "A unit economics sheet with a go or no go recommendation.",
            steps: [
              { do: "Build a sheet with CAC, ARPU, COGS per user including model cost, and monthly churn." },
              { do: "Compute lifetime value and payback period. Show the formulas." },
              {
                do: "Run three scenarios: model costs halve, usage doubles, churn worsens by two points.",
                hint: "Model costs falling is the most reliable trend in AI products. Build the 50 percent cheaper case, it turns a lot of no gos into gos.",
              },
              { do: "Write a three line recommendation with the number that drove it." },
            ],
            tools: ["Google Sheets"],
          },
          check: [
            "What is the payback period, and is it under twelve months?",
            "Which single assumption, if wrong, flips your recommendation?",
          ],
        },

        {
          slug: "what-your-company-optimises",
          title: "What your company is actually optimising for",
          kind: "Case study",
          minutes: 45,
          legacy: "Module 3.4, OKRs",
          hook: "Two teams are both certain they are doing the right thing, and their work directly cancels out. Nobody is wrong. Nobody has read the same goal.",
          explain: {
            title: "North star, OKR and health metric are three different things",
            body: [
              "The north star is the one number that means the product is working. OKRs are what you will move this quarter. Health metrics are the ones you never want to move at all.",
              "Confusing them is the most common metrics mistake in product, and it is what produces two teams whose work cancels out.",
            ],
          },
          ai: {
            move: "Give a model your company's stated goals and ask where two of them would conflict in practice, with a concrete example of a decision that would satisfy one and damage the other.",
            trap: "It will find polite theoretical tensions. Push for a specific decision on a specific screen, otherwise it is a management platitude rather than a finding.",
          },
          build: {
            artefact: "A one page map of your company's real goal hierarchy, with one conflict named.",
            steps: [
              { do: "Write down the stated north star, this quarter's OKRs, and any health metrics." },
              { do: "Find one decision where two of them conflict." },
              { do: "Write which one you would follow and why." },
            ],
          },
          check: ["Which two goals conflict, and on what specific decision?"],
        },
      ],
    },

    /* ================================================================ 5 */
    {
      slug: "metrics",
      n: "5",
      title: "Metrics that hold",
      summary:
        "Choosing a number you can be measured against without the product getting worse.",
      lessons: [
        {
          slug: "metric-and-counter",
          title: "A metric that cannot be gamed",
          kind: "Drill",
          minutes: 50,
          legacy: "Module 3.3, Metrics",
          hook: "You propose increasing weekly active users by 20 percent. Your engineer says, deadpan, “I can do that by Thursday with a push notification saying your account has a problem”. He is not wrong.",
          explain: {
            title: "Every metric has an exploit. Find yours before someone else does.",
            body: [
              "Before you commit to a number, spend five minutes actively trying to cheat it. If you can think of a way, so can a team under quarterly pressure, and they will, without meaning to.",
              "Then pair it with a counter metric. Speed with error rate. Engagement with unsubscribes. Conversion with refunds. The counter metric is what stops the primary metric from eating the product.",
              "And define it precisely enough that two analysts would compute it identically. “Active user” is not a definition. “A user who completed at least one transaction categorisation in the last seven days” is.",
            ],
          },
          case: {
            brand: "Facebook",
            logo: "/img/brands/facebook.svg",
            situation:
              "Facebook's growth team needed one number that predicted whether a new user would stay.",
            what: "They found that users who connected with seven friends within ten days retained dramatically better, and made that the growth team's single target. It worked because it was a leading indicator of real value rather than a proxy for it. You cannot fake having seven friends who post things you care about.",
            lesson:
              "The best metrics measure the moment a user gets value, not the moment they touch your product. Sessions can be inflated. Value delivered usually cannot.",
          },
          ai: {
            move: "Ask a model for ten candidate metrics, then for each one, how a cynical team would hit the target without helping a single user.",
            trap: "It is bad at knowing which exploit is likely at your company. It will rank a theoretical abuse above the boring one that actually happens, like the team quietly redefining what counts as active.",
            prompt:
              "Here are ten candidate metrics. For each, describe the cheapest way a team under pressure could hit it without delivering any user value. Then rank by how likely that is at a 40 person startup.",
          },
          build: {
            artefact: "One primary metric, one counter metric, and a written exploit analysis for both.",
            steps: [
              { do: "Write ten candidate metrics for the problem you picked in chapter 1." },
              { do: "Run the exploit analysis on all ten. Cross out every metric with a cheap exploit." },
              { do: "Pick one primary and one counter metric from what survives." },
              { do: "Write the definition precisely enough that two people would compute it identically." },
            ],
          },
          solution: {
            summary:
              "For the verification problem, signup completion rate is the obvious primary and it is gameable. The counter metric fixes it.",
            walkthrough: [
              "Primary: percentage of people who start signup and reach a connected account within 24 hours.",
              "The exploit: remove verification entirely. Completion jumps, fraud jumps with it.",
              "Counter metric: fraudulent account rate at 30 days. Now you cannot win by removing the safeguard.",
              "Definition: started means the email field received a valid entry. Completed means at least one bank connection returned success. Both timestamped in the same timezone, which sounds pedantic until two dashboards disagree.",
            ],
          },
          check: [
            "What is the cheapest way to fake your primary metric?",
            "Would two analysts compute it the same way from your definition alone?",
          ],
        },

        {
          slug: "retention-is-the-number",
          title: "Retention is the only number",
          kind: "Concept",
          minutes: 50,
          hook: "Signups are up 40 percent this month and the founder is delighted. Week two retention is 9 percent and nobody has looked at it.",
          explain: {
            title: "Read the shape, not the level",
            body: [
              "A cohort retention curve either flattens or it goes to zero. A curve that flattens at 25 percent means a quarter of users found lasting value, and you have something to grow. A curve that keeps falling means you have a leaky bucket that no amount of growth spend will fill.",
              "Which is why retention is the first chart to look at and the last one to fake. Everything else, signups, downloads, page views, can be bought.",
            ],
            diagram: "retention-curve",
            caption:
              "Two products with identical signup numbers. Only one of them is a business.",
          },
          ai: {
            move: "Cluster your churned users by behaviour in their first session and find the one action that separates the ones who stayed from the ones who did not.",
            trap: "Correlation will be presented as cause. The action that predicts retention is often a symptom of already being the kind of user who retains, not the thing that caused it. State that explicitly in your write up.",
          },
          build: {
            artefact: "A cohort retention curve and one testable hypothesis about the drop off.",
            steps: [
              { do: "Build the cohort table from the lesson dataset: signups by week, active by week n." },
              { do: "Plot the curve. Note where it flattens, or that it does not." },
              { do: "Split by one segment and plot again. Note if any segment flattens higher." },
              { do: "Write one hypothesis about the drop off, and the experiment that would test it." },
            ],
            tools: ["Google Sheets"],
          },
          check: [
            "Does your curve flatten? At what percentage?",
            "Which segment retains best, and is that a cause or a symptom?",
          ],
        },

        {
          slug: "instrumenting-a-question",
          title: "Instrument for questions, not for completeness",
          kind: "Build",
          minutes: 50,
          legacy: "Module 20.3, Google Analytics",
          hook: "Launch day is the worst possible time to discover you cannot answer “did anyone use it”.",
          explain: {
            title: "Write the question first, then the event",
            body: [
              "For every event you plan to track, name the question it answers. If you cannot name one, delete the event. Over instrumented products are as unanalysable as under instrumented ones, and they cost more to store.",
              "The five questions you will be asked in week one are almost always the same: did anyone use it, who, did they come back, did it break, and did it move the number we said it would.",
            ],
          },
          ai: {
            move: "Generate the event schema from your spec, then delete every event you cannot attach a question to.",
            trap: "It produces an exhaustive taxonomy, every click and hover. That is noise you pay to store and never query.",
          },
          build: {
            artefact: "A tracking plan where every event is tied to a written question.",
            steps: [
              { do: "Write the five questions you know you will be asked in week one." },
              { do: "Design the minimum event set that answers exactly those." },
              { do: "For each event, define its properties and who fires it." },
              { do: "Delete anything left over." },
            ],
            tools: ["Plausible, PostHog or GA4"],
          },
          check: ["Can every event be tied to a written question?"],
        },
      ],
    },

    /* ================================================================ 6 */
    {
      slug: "signal-to-claim",
      n: "6",
      title: "Turning signal into a claim",
      summary:
        "You have evidence. A pile of evidence is not a decision. This is where most product work quietly dies.",
      lessons: [
        {
          slug: "extraction-not-summary",
          title: "Extraction beats summarisation",
          kind: "Build",
          minutes: 70,
          hook: "Four thousand support tickets, eight hundred reviews and sixty sales calls, sitting in three different tools. None of it has ever been read systematically.",
          explain: {
            title: "A summary is lossy and unfalsifiable",
            body: [
              "Ask a model to summarise a thousand tickets and you get three paragraphs you cannot check, sort, count or argue with. The evidence is gone.",
              "Ask for a structured extraction and you get a thousand rows, each carrying its original quote. Now you can pivot, count, and trace any finding back to the person who said it. That is the difference between a finding and an opinion.",
              "Decide your columns before you run anything: source, date, verbatim quote, problem label, severity, segment. A pipeline without a fixed schema produces rows you cannot group.",
            ],
            diagram: "signal-to-claim",
          },
          case: {
            brand: "Airbnb",
            logo: "/img/brands/airbnb.svg",
            year: "2009",
            situation:
              "Airbnb was flat in New York. The data showed listings were not converting and nobody knew why.",
            what: "Gebbia and Chesky flew to New York, sat with hosts, and noticed the listing photos were terrible phone snaps. They rented a camera and shot the listings themselves. Revenue in New York doubled within a month.",
            lesson:
              "The insight was invisible in the aggregate and obvious in the raw artefact. Which is exactly why your pipeline has to preserve the artefact rather than summarise it away.",
          },
          ai: {
            move: "Write one extraction prompt with a strict JSON schema and run it in batches over the whole corpus. Load into a sheet and pivot.",
            trap: "Over a long batch, models drift. They start inventing new label values around row 300 despite your enumerated list. Add “labels must be exactly one of [list]; if nothing fits, use OTHER” and audit every OTHER by hand. The OTHERs are usually where the new finding is.",
            prompt:
              "Return one JSON object per item with keys: source_id, verbatim_quote (copied exactly, never paraphrased), problem_label (exactly one of: BILLING, ONBOARDING, SYNC, ACCURACY, PERFORMANCE, TRUST, OTHER), severity_1_to_5, segment_guess. Never invent a label outside the list.",
          },
          build: {
            artefact: "A working extraction pipeline and a coded signal log of 200 or more rows.",
            steps: [
              { do: "Define your schema: exact columns and exact allowed label values." },
              { do: "Write the extraction prompt and test on 20 items. Fix the schema before scaling." },
              { do: "Run the full corpus in batches. Load into Sheets." },
              {
                do: "Audit every OTHER row by hand. Split any label holding more than 25 percent of rows.",
                hint: "A label with a quarter of everything is a bucket, not a finding. Split until each label is actionable by one team.",
              },
              { do: "Pivot by label against segment. Write the top three findings with counts and a quote each." },
            ],
            tools: ["Claude or ChatGPT", "Google Sheets"],
          },
          check: [
            "Can you trace any finding back to a verbatim quote in one click?",
            "What did you find in the OTHER pile?",
          ],
        },

        {
          slug: "sizing-without-a-data-team",
          title: "Numbers without a data team",
          kind: "Drill",
          minutes: 45,
          hook: "“How big is this?” Nobody will run a query for you this quarter.",
          explain: {
            title: "Estimate out loud, so people argue with the assumption",
            body: [
              "A Fermi estimate breaks a number you cannot know into numbers you can guess, then multiplies. Its value is not precision, it is that every assumption is visible and therefore attackable.",
              "Which is the point. A sized opportunity with three stated assumptions produces a useful argument. A confident number with no workings produces either blind agreement or blind refusal.",
            ],
          },
          ai: {
            move: "Have a model build the Fermi estimate structure, then check its arithmetic and, more importantly, its priors.",
            trap: "Its priors come from the average of the internet, not from your market. It will assume US pricing, US conversion rates and US salaries unless you tell it otherwise.",
          },
          build: {
            artefact: "A sized opportunity with every assumption written down and attackable.",
            steps: [
              { do: "Break the number into no more than five multiplied assumptions." },
              { do: "Source or justify each one in a sentence." },
              { do: "Compute a low, mid and high case." },
              { do: "Name the single assumption the answer is most sensitive to." },
            ],
          },
          check: ["Which assumption is the answer most sensitive to?"],
        },

        {
          slug: "prioritising-honestly",
          title: "Which one is worth a quarter?",
          kind: "Drill",
          minutes: 55,
          legacy: "Module 9.2, Prioritization",
          hook: "Five real problems, one team, twelve weeks. The founder wants all five and has said so in front of the team.",
          explain: {
            title: "Confidence is the honest column",
            body: [
              "RICE is Reach times Impact times Confidence, divided by Effort. Reach and impact are estimates dressed as numbers. Confidence is where you record how much you actually know.",
              "Which is why teams that adopt RICE and get nothing from it are the ones who set every confidence to 100 percent. The framework does not make the decision. It makes your assumptions visible so the argument is about the right thing.",
            ],
            diagram: "rice",
            caption:
              "The AI assistant has the biggest reach and loses, because nobody knows whether it works.",
          },
          ai: {
            move: "Build the scoring sheet, then ask which of these scores is not supported by the evidence I have described.",
            trap: "It will accept your numbers as given and do arithmetic on them, which flatters you. Make it attack the inputs rather than compute the output.",
          },
          build: {
            artefact: "A scored shortlist where the confidence column is the honest one.",
            steps: [
              { do: "Score five real opportunities from your own signal log." },
              { do: "Justify every confidence score with a specific piece of evidence, or lower it." },
              { do: "Recompute. Note which items moved." },
              { do: "Write the not doing list with a one line reason each." },
            ],
          },
          check: [
            "Which confidence score dropped when you looked for the evidence?",
            "Did the ranking change after you were honest?",
          ],
        },
      ],
    },

    /* ================================================================ 7 */
    {
      slug: "writing-it-down",
      n: "7",
      title: "Writing it down",
      summary:
        "The work is worthless if it does not change what someone does. This chapter is the last mile.",
      lessons: [
        {
          slug: "the-one-pager",
          title: "The one page a busy founder finishes",
          kind: "Build",
          minutes: 55,
          legacy: "Module 2.4, Crafting a Presentation",
          hook: "Your lead has ninety seconds. Everything you have learned in six chapters has to survive that.",
          explain: {
            title: "Lead with the decision you want",
            body: [
              "Not background. Not methodology. The first sentence is what you want the reader to do, and everything after it is evidence for that ask.",
              "One page holds roughly one problem, one recommendation, one metric and three pieces of evidence. If your thinking does not fit, that usually means the thinking is not finished, not that you need more pages.",
              "And name what you are not doing. The scope cuts are the most credible part of any document, because they prove you made choices rather than listed wishes.",
            ],
            diagram: "prd-anatomy",
            caption: "Four sections fit on a page. The other three are why nobody read your last one.",
          },
          case: {
            brand: "Amazon",
            logo: "/img/brands/amazon.svg",
            situation:
              "Amazon requires teams to write the press release for a product before building it, plus the FAQ customers and press would ask.",
            what: "Working backwards from the announcement kills a large fraction of ideas at zero engineering cost, because a feature that produces a boring press release is usually a boring feature. Kindle, AWS and Prime all started as PR FAQs before a line of code existed.",
            lesson:
              "Writing is not how you report the work. It is how you find out whether the work is any good.",
          },
          ai: {
            move: "Draft with a model, delete 60 percent, then ask which sentences here could be deleted without changing what a reader would do, and delete those too.",
            trap: "AI written product docs have a signature: they hedge, they restate the question before answering it, and they end sections with a summary nobody needs. That padding reads as thorough and is the opposite. Learn your model's tells.",
            prompt:
              "Here is my one pager. List every sentence that could be deleted without changing what a reader would do. Do not rewrite anything, just list the deletions.",
          },
          build: {
            artefact: "The one pager: problem, evidence, recommendation, metric, scope cuts.",
            steps: [
              { do: "Write the recommendation first, as one sentence, before anything else." },
              { do: "Add the three strongest pieces of evidence from chapters 1 to 6." },
              { do: "Add the metric and counter metric from chapter 5." },
              { do: "Add a what we are not doing section with at least three cuts." },
              {
                do: "Run the deletion pass. Cut 30 percent minimum.",
                hint: "Read it aloud. Every sentence you stumble over is a sentence doing two jobs.",
              },
            ],
          },
          solution: {
            summary: "A working one pager is roughly 250 words and has five parts.",
            walkthrough: [
              "Line 1, the ask: what you want decided, with a date.",
              "Lines 2 to 4, the problem: who hurts, how many, what it costs, with one quote.",
              "Line 5, the metric and its counter metric.",
              "Lines 6 to 8, the recommendation and the rough size of it.",
              "Last block, what you are not doing, and what would change your mind.",
            ],
          },
          check: [
            "Is your first sentence the ask?",
            "Did you cut 30 percent, and did anything important actually disappear?",
          ],
        },

        {
          slug: "scope-cuts",
          title: "Saying no in writing",
          kind: "Drill",
          minutes: 45,
          hook: "Engineering says two months. You have three weeks and you do not know enough to argue.",
          explain: {
            title: "Decide the appetite, then design to fit",
            body: [
              "The usual process asks how long something takes and then negotiates. The better one decides how much the problem is worth, states that as the appetite, and designs to fit inside it.",
              "The most valuable part of any scope document is the section that says what it explicitly does not include. That is what stops the thing growing back.",
            ],
          },
          ai: {
            move: "Simulate the engineering lead. Argue until you find the cut that gets it inside your appetite without making it pointless.",
            trap: "The simulated engineer will agree too fast. Instruct it to hold its estimate unless you remove actual scope.",
          },
          build: {
            artefact: "A scoped version one with three explicit cuts and the reasoning for each.",
            steps: [
              { do: "State the appetite: how much this is worth in days." },
              { do: "List everything in the current scope." },
              { do: "Cut until it fits. Write why each cut is survivable." },
              { do: "Write the no go list: what this explicitly does not include." },
            ],
          },
          check: ["Does your document say what it does not include?"],
        },

        {
          slug: "the-states-you-forgot",
          title: "Every empty, error and edge",
          kind: "Drill",
          minutes: 50,
          legacy: "Module 8.6, Forms",
          hook: "The happy path is four screens. The unhappy paths are nineteen, and QA will find them for you in front of the CTO.",
          explain: {
            title: "The unhappy path is most of the product",
            body: [
              "Every screen has around eight states, and most specs draw one. The states you do not draw get invented by an engineer under time pressure at 6pm on a Friday.",
              "This is the cheapest quality win available to a product manager. It costs an hour and it removes a category of bug.",
            ],
            diagram: "states-matrix",
          },
          ai: {
            move: "Enumerate failure states with a model, then find the four it missed because they are specific to your product.",
            trap: "It gives you the generic eight. Your product has domain specific ones, like a bank connection that succeeds but returns no transactions, which no generic list contains.",
          },
          build: {
            artefact: "A complete states matrix for one screen of your product.",
            steps: [
              { do: "Take one screen from your flow in chapter 2." },
              { do: "Fill in all eight generic states with the actual copy each would show." },
              { do: "Add at least three states specific to your product." },
              { do: "Mark which ones currently do not exist in the product." },
            ],
          },
          check: ["How many domain specific states did you find beyond the generic eight?"],
        },
      ],
    },

    /* ================================================================ 8 */
    {
      slug: "defending-it",
      n: "8",
      title: "Defending it",
      summary:
        "The room where it gets decided, and how not to lose it by bluffing.",
      lessons: [
        {
          slug: "the-hard-questions",
          title: "The three questions you will always be asked",
          kind: "Simulation",
          minutes: 50,
          legacy: "Module 2.5, Presenting Your Research",
          hook: "Eight minutes and one page. The founder has read half of it and has already decided they disagree.",
          explain: {
            title: "How do you know, what does it cost, what if you are wrong",
            body: [
              "Almost every pushback is a version of those three. Have them answered before you walk in.",
              "“I do not know” is a complete answer, followed by “here is how I would find out, and by when”. Bluffing is the only unrecoverable mistake. Once you are caught inventing one number, every number you have ever given becomes retroactively suspect.",
            ],
          },
          case: {
            brand: "Superhuman",
            situation:
              "Rahul Vohra needed to prove to his own team, and to investors, that Superhuman had product market fit. A claim usually made on vibes.",
            what: "He ran Sean Ellis's question, how would you feel if you could no longer use this product, and made the 40 percent very disappointed threshold the entire argument. Then he segmented the somewhat disappointed group and built the roadmap from what would move them up.",
            lesson:
              "The most defensible arguments compress to one number and one sentence. If you need five slides to make the point, the point is not sharp yet.",
            sources: [
              {
                label: "How Superhuman Built an Engine to Find Product Market Fit",
                url: "https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/",
              },
            ],
          },
          ai: {
            move: "Have a model role play the specific person you are presenting to, their priorities and known objections, and run the eight minutes three times.",
            trap: "It will invent a much nicer executive than you will face. Tell it to interrupt within the first thirty seconds and to reject any answer that does not include a number.",
          },
          build: {
            artefact: "Written answers to the three hardest questions, and a memo revised where they exposed a hole.",
            steps: [
              { do: "Run three simulated defences. Note every question you could not answer." },
              { do: "Go back and fix the memo where those questions exposed a hole." },
              { do: "Write your answers to the three hardest questions and attach them." },
            ],
          },
          check: ["Which question could you not answer on the first run, and what did you change?"],
        },

        {
          slug: "disagree-and-commit",
          title: "When the decision goes against you",
          kind: "Simulation",
          minutes: 45,
          hook: "You made the case. It was a good case. They are doing the other thing.",
          explain: {
            title: "Say it plainly, then back it fully",
            body: [
              "If the decision goes against you, say so plainly, in writing, once. Then back it completely.",
              "Quietly resenting a decision while executing it badly is the most common way product managers lose credibility, and it is invisible to the person doing it.",
            ],
          },
          ai: {
            move: "Draft the disagree and commit note, then have a model flag every sentence that reads as passive aggressive or as building an alibi.",
            trap: "You will not spot your own hedging. It is the whole reason to run this pass.",
          },
          build: {
            artefact: "A disagree and commit note you would actually send.",
            steps: [
              { do: "State the decision as made, not as imposed." },
              { do: "State your disagreement in one sentence, with the evidence." },
              { do: "State what you will now do to make it succeed." },
              { do: "State what you will watch, and when you would raise it again." },
            ],
          },
          check: ["Does your note contain any sentence whose purpose is to protect you later?"],
        },

        {
          slug: "deliver-the-memo",
          title: "Deliver it",
          kind: "Workshop",
          minutes: 60,
          legacy: "Module 2.6, Delivering a Presentation",
          hook: "Friday. The founder is in the room. You have one page and eight minutes.",
          explain: {
            title: "Delivery is the last mile, and most of it is rehearsal",
            body: [
              "You are not performing. You are trying to get a decision made with the least friction possible, which means saying the ask first and then shutting up.",
              "Record yourself once. It is uncomfortable and it is the highest return five minutes in this level.",
            ],
          },
          ai: {
            move: "Adversarial review: have a model attack your memo as a skeptical founder would, then fix what actually lands.",
            trap: "Discard the objections your document already answers. Only the new ones are the meeting.",
          },
          build: {
            artefact: "A recorded five minute walkthrough of your memo.",
            steps: [
              { do: "Rehearse against the simulation until nothing surprises you." },
              { do: "Record yourself delivering it in five minutes." },
              { do: "Watch it back once. Note every place you hedged." },
              { do: "Re-record. Ship the second take." },
            ],
          },
          check: [
            "Did you record it, or did you skip that step because it is uncomfortable?",
            "Where did you hedge?",
          ],
        },
      ],
    },
  ],
};
