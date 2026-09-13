import type { CaseStudy } from "./types";

/**
 * Product teardowns, read one beat at a time.
 *
 * Public commentary on public behaviour. Everything described here is either
 * documented by the company itself or observable by anyone who uses the
 * product. Nothing internal is claimed, no partnership is implied, and the
 * screens are drawings rather than screenshots.
 */
export const cases: CaseStudy[] = [
  /* ======================================================================== */
  {
    slug: "duolingo-streak",
    brand: "Duolingo",
    title: "One lesson. A reason to return.",
    blurb:
      "Explore Duolingo's published streak redesign, the trade-off behind the reported retention lift, and an experiment for your own product.",
    sector: "Consumer, education",
    year: "2013 to now",
    readIn: 9,
    featured: true,
    setup: [
      "Language learning has a brutal shape. Almost everyone quits, and they quit early. The product is not competing with other language apps, it is competing with not bothering tonight.",
      "Duolingo's answer was not a better lesson. It was a counter. Practise today and the number goes up by one. Miss a day and it goes to zero.",
      "That is the entire mechanic, and the company has said publicly that streaks are central to how it grows. What makes it worth taking apart is not the counter. It is everything built around the moment the counter is about to break.",
    ],
    steps: [
      {
        label: "The loss",
        title: "The number is not a reward, it is something you can lose",
        screen: "streak-lost",
        body: [
          "A points total only ever goes up, so it stops mattering. A streak is different: it is a thing you already own, and it can be taken away.",
          "That difference is the whole design. People work harder to keep something than to get the same thing in the first place. Kahneman and Tversky put a number on it in 1979, and it has held up in the forty years since.",
          "So the screen that matters most is not the one where you earn the streak. It is this one, where you are shown what you had.",
        ],
        pins: [
          { x: 50, y: 44, text: "The flame goes grey. The loss is drawn, not described." },
          { x: 50, y: 60, text: "It names the number you lost, not the number you have." },
        ],
        principle: {
          name: "Loss aversion",
          def: "Losing something feels roughly twice as bad as gaining the same thing feels good. A streak converts a reward into a possession.",
        },
        takeaway:
          "If your metric only counts up, nobody protects it. Find the version of it that a user can own and therefore lose.",
      },
      {
        label: "The out",
        title: "Give people a way not to break it",
        screen: "streak-freeze",
        body: [
          "A mechanic built purely on loss burns people out. You miss one Tuesday because of a delayed flight, the number goes to zero, and the honest reaction is to delete the app.",
          "The streak freeze is the release valve. You spend in-game currency ahead of time and it covers a day you miss. Duolingo sells it in its own shop, and it is the most obvious item there.",
          "Read what it actually does. It converts a catastrophic loss into a small planned cost, and it makes the user do the planning, which means they are now invested in the streak twice.",
        ],
        pins: [
          { x: 50, y: 25, text: "Bought before it is needed, which is the point." },
          { x: 30, y: 32, text: "Priced in earned currency, so it costs effort not money." },
        ],
        principle: {
          name: "The pressure release",
          def: "Any mechanic that punishes has to ship with a way out, or it selects for the people who were never going to quit anyway.",
        },
        takeaway:
          "Ship the escape hatch at the same time as the pressure. Not in the next quarter.",
      },
      {
        label: "The repair",
        title: "Make coming back cheaper than starting again",
        screen: "streak-repair",
        body: [
          "Some people miss the day anyway. The naive product sets them to zero and hopes. The better one offers a repair: do one session now and your streak comes back.",
          "This looks generous. It is, and it is also the highest leverage screen in the app, because a lapsed user with 47 days behind them is worth far more than a new install.",
          "The offer is timed for the moment the loss is most vivid, which is the first time they open the app after breaking it.",
        ],
        pins: [
          { x: 45, y: 25, text: "The old number, shown intact. You are recovering, not restarting." },
          { x: 50, y: 48, text: "One action to repair. The ask is deliberately small." },
        ],
        principle: {
          name: "Sunk cost, used kindly",
          def: "The same instinct that makes people finish a bad film makes them repair a streak. Point it at something the user actually wants.",
        },
        takeaway:
          "Your win-back flow should reference what the person already built, not what they could build.",
      },
    ],
    lessons: [
      {
        do: "Turn a counter into a possession. Ownership is what creates the effort.",
        dont: "Do not ship the punishment without shipping the way out in the same release.",
      },
      {
        do: "Aim the recovery flow at the moment the loss is freshest, and make the ask tiny.",
        dont: "Do not let the mechanic become the product. A streak on top of a bad lesson just measures stubbornness.",
      },
      {
        do: "Watch the people who break the streak and never come back. That cohort tells you whether the pressure is tuned right.",
        dont: "Do not use loss aversion where the user has nothing to gain. That is where a mechanic turns into a dark pattern.",
      },
    ],
    sources: [
      {
        label: "Duolingo on how streaks drive learner retention",
        url: "https://blog.duolingo.com/how-duolingo-streak-builds-habit/",
      },
      {
        label: "Kahneman and Tversky, Prospect Theory (1979)",
        url: "https://www.jstor.org/stable/1914185",
      },
    ],
  },

  /* ======================================================================== */
  {
    slug: "govuk-one-thing-per-page",
    brand: "GOV.UK",
    title: "One thing per page",
    blurb:
      "The least fashionable design decision in government, and why it beats every clever form you have ever seen.",
    sector: "Public sector, forms",
    year: "2015 to now",
    readIn: 8,
    featured: true,
    setup: [
      "The UK government runs services people cannot opt out of. You do not get to choose a competitor for renewing a passport, and the people using it include everyone: on old phones, on bad connections, in a second language, in a hurry, and sometimes in distress.",
      "The Government Digital Service published a design pattern that sounds almost too simple to be a decision. Ask one question per page.",
      "It is the clearest example in public of a design principle that costs something obvious, more page loads, to buy something less obvious and far more valuable.",
    ],
    steps: [
      {
        label: "The wall",
        title: "The form that looks efficient",
        screen: "form-many",
        body: [
          "Every field on one page looks like the considerate option. Fewer clicks, everything visible, one submit button. This is what most teams ship, and what most stakeholders ask for.",
          "What it actually does is force the user to hold eleven unrelated decisions in their head at once, then punish them at the end with a page of red text.",
          "It is also the version that breaks hardest. One validation error and the user is scanning a wall for the thing they got wrong.",
        ],
        pins: [
          { x: 50, y: 30, text: "Eleven fields, four different kinds of question." },
          { x: 18, y: 88, text: "All the failure arrives at once, at the end." },
        ],
        principle: {
          name: "Cognitive load",
          def: "Working memory holds very little. A form that asks for many unrelated things at once spends all of it on navigation rather than on answering.",
        },
      },
      {
        label: "The split",
        title: "One question, one page, one decision",
        screen: "form-one",
        body: [
          "Split the same form into nine pages and something counterintuitive happens: completion goes up, not down. The user is never deciding what to do next, only what to answer.",
          "It also makes the form honest. Branching becomes simple, because the next page can depend on the last answer. Progress becomes real rather than a bar you invented.",
          "And every page is now small enough to read aloud, which is exactly what a screen reader does.",
        ],
        pins: [
          { x: 50, y: 17, text: "Real progress, because the route is known." },
          { x: 40, y: 28, text: "One question, in plain language, with an example." },
        ],
        principle: {
          name: "One thing per page",
          def: "Each page asks a single question or makes a single decision. The cost is page loads. The gain is that nobody has to hold anything in their head.",
        },
        takeaway:
          "The clever multi-column form is usually a designer optimising for the screenshot rather than the person filling it in.",
      },
      {
        label: "The error",
        title: "Errors that say what to do next",
        screen: "form-error",
        body: [
          "When one page holds one question, an error can be specific. A summary at the top, the same message next to the field, and an example of a correct answer.",
          "Notice what is missing: no red field with a generic message, no scroll hunt, no lost answers. The user is told the problem in words they can act on.",
          "This is accessibility and usability being the same thing, which is usually the case.",
        ],
        pins: [
          { x: 45, y: 20, text: "Summary first, linked to the field." },
          { x: 25, y: 45, text: "Tells you what good looks like, rather than that you are wrong." },
        ],
        principle: {
          name: "Error recovery",
          def: "An error message has one job: make the next action obvious. Naming the rule is not the same as naming the fix.",
        },
        takeaway:
          "Write the error message before you write the validation. If you cannot write a helpful one, the question is wrong.",
      },
    ],
    lessons: [
      {
        do: "Split by decision, not by section. If a page holds two unrelated questions, it holds two pages.",
        dont: "Do not measure a form by the number of screens. Measure it by completion and by who drops out.",
      },
      {
        do: "Write the question in the words a person would use out loud, and give an example.",
        dont: "Do not save errors for the end. Validate where the answer was given.",
      },
      {
        do: "Test it on the oldest phone and the worst connection you can find.",
        dont: "Do not treat accessibility as a separate pass. The plain version is usually the better version for everyone.",
      },
    ],
    sources: [
      {
        label: "GOV.UK Design System, question pages",
        url: "https://design-system.service.gov.uk/patterns/question-pages/",
      },
      {
        label: "GDS on the one thing per page principle",
        url: "https://designnotes.blog.gov.uk/2015/07/03/one-thing-per-page/",
      },
      {
        label: "GOV.UK Design System, error messages",
        url: "https://design-system.service.gov.uk/components/error-message/",
      },
    ],
  },

  /* ======================================================================== */
  {
    slug: "ikea-place-doubt",
    brand: "IKEA",
    title: "Selling the thing you cannot imagine",
    blurb:
      "IKEA Place did not make furniture easier to browse. It removed the one doubt that stops people buying furniture online.",
    sector: "Commerce, AR",
    year: "2017 to now",
    readIn: 8,
    setup: [
      "Furniture is one of the hardest categories to sell online, and the reason is not price or delivery. It is doubt. Will it fit, and will it look wrong in my room?",
      "Photography cannot answer either question, because the answer depends on a room the retailer has never seen.",
      "IKEA Place, launched in 2017 on Apple's ARKit, put the sofa in your living room at true scale. It is a useful teardown because the feature is not the technology, it is the doubt it removes.",
    ],
    steps: [
      {
        label: "The doubt",
        title: "The two questions a product page cannot answer",
        screen: "ar-browse",
        body: [
          "A grid of sofas answers what they cost and what they look like against a white background. Neither is the thing stopping the purchase.",
          "The real objection is specific and personal: my room, my wall, my light, my other furniture. Until it is answered the tab stays open and nothing happens.",
          "Most teams respond to this by adding more photos. That is optimising the part that was already fine.",
        ],
        pins: [
          { x: 50, y: 25, text: "More angles do not answer will it fit." },
          { x: 50, y: 50, text: "The whole purchase hangs on a question the page cannot reach." },
        ],
        principle: {
          name: "Find the real objection",
          def: "The step people abandon is rarely the step that failed. Look one question upstream from the drop.",
        },
      },
      {
        label: "The answer",
        title: "Put it in the room, at true scale",
        screen: "ar-place",
        body: [
          "The camera becomes the product page. The sofa sits on your floor, at the size it actually is, and you walk around it.",
          "The detail that matters is scale accuracy. IKEA said at launch it was rendering products at around 98 percent accurate scale, because a sofa that is nearly the right size answers nothing.",
          "Everything else in the interface gets out of the way. Two controls, one price, one action.",
        ],
        pins: [
          { x: 50, y: 55, text: "True scale. A near enough sofa answers nothing." },
          { x: 50, y: 76, text: "Price and action stay on screen, because this is still commerce." },
        ],
        principle: {
          name: "Answer the objection in place",
          def: "Do not describe the answer on another page. Resolve the doubt inside the moment it occurs.",
        },
        takeaway:
          "Technology is the delivery mechanism. The product decision was choosing which single doubt to kill.",
      },
      {
        label: "The close",
        title: "Carry the certainty into the purchase",
        screen: "ar-buy",
        body: [
          "The last move is the easy one to skip. Having answered the doubt, say so where the money is.",
          "A line that reminds the buyer they measured it themselves is worth more than another review. They are not trusting the retailer, they are trusting their own eyes.",
          "It also sets up the part nobody sees on the product page: fewer returns, because fewer people are guessing.",
        ],
        pins: [
          { x: 50, y: 53, text: "The proof, restated at the point of payment." },
          { x: 50, y: 64, text: "Returns are a design outcome, not a logistics problem." },
        ],
        principle: {
          name: "Close the loop",
          def: "Evidence gathered earlier in a flow should appear again at the moment of commitment.",
        },
      },
    ],
    lessons: [
      {
        do: "Name the single doubt that stops the purchase, then design against that one thing.",
        dont: "Do not start from the technology. AR here is an answer, and it is only the answer for categories where placement is the doubt.",
      },
      {
        do: "Get the boring detail right. Scale accuracy is the whole feature.",
        dont: "Do not leave the certainty behind in the tool. Carry it into the checkout.",
      },
      {
        do: "Measure it on returns and on conversion together, since one can hide the other.",
        dont: "Do not judge it on installs. A tool used once per purchase is not a daily active product.",
      },
    ],
    sources: [
      {
        label: "IKEA Place launch announcement, 2017",
        url: "https://www.ikea.com/global/en/newsroom/innovation/ikea-launches-ikea-place-a-new-app-that-allows-people-to-virtually-place-furniture-in-their-home-170912/",
      },
      {
        label: "Apple on ARKit",
        url: "https://developer.apple.com/augmented-reality/arkit/",
      },
    ],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
