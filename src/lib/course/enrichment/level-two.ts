import type {LessonEnrichment} from "./level-one";
export const levelTwoEnrichment:Record<string,LessonEnrichment>={
  "who-to-talk-to": {
    "intro": "Sample experiences, not fans. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Begin with the decision your research must inform. For a reporting tool, “why do people abandon setup?” needs people who abandoned, not just customers who completed onboarding. Define a recent event that makes someone eligible and write down which experiences your current recruitment channel cannot reach."
      },
      {
        "title": "Do the work carefully",
        "body": "Build a sampling matrix with rows for successful completion, abandonment, and an alternative workaround. Add context such as team size or task frequency only when it could change the explanation. Interview quotas deliberately create contrast; they do not make twelve interviews a representative population survey."
      },
      {
        "title": "Turn it into a decision",
        "body": "After each round, ask whether another conversation is likely to change the decision. Repeated phrases alone are not a stopping rule. A missing high-risk group can matter more than another interview with a familiar group. Keep a recruitment log so a reviewer can see whose experience is absent."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "Twelve happy customers describe fast setup, but support has six recent abandonment reports. Recruit from those reports with permission and compare the actual steps. Do not conclude that the happy customers are wrong or that abandonment is universal."
    },
    "prompt": "Design an interview sampling matrix for [decision] using [available channels]. Include contrasting recent experiences, exclusion criteria, and missing groups. Do not call this sample representative. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. Twelve happy customers describe fast setup, but support has six recent abandonment reports. Recruit from those reports with permission and compare the actual steps. Do not conclude that the happy customers are wrong or that abandonment is universal.",
    "practice": "Create a one-page artifact for this method: sample experiences, not fans. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "matrix",
      "title": "Sample experiences, not fans",
      "nodes": [
        {
          "label": "Population",
          "detail": "Define the unit"
        },
        {
          "label": "Eligible event",
          "detail": "Keep source links"
        },
        {
          "label": "Contrasting groups",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Missing voices",
          "detail": "Choose a next check"
        }
      ],
      "caption": "Twelve happy customers describe fast setup, but support has six recent abandonment reports. Recruit from those reports with permission and compare the actual steps. Do not conclude that the happy customers are wrong or that abandonment is universal."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ],
    "researchLab": "sampling"
  },
  "recruiting-without-a-panel": {
    "intro": "Make an invitation easy to evaluate. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "An invitation should explain who you are, why this person is relevant, what the session involves, its length, and any incentive. State whether recording is optional and how notes will be used. Never disguise sales outreach as research or imply participation affects access to support."
      },
      {
        "title": "Do the work carefully",
        "body": "Use a short screener to establish actual experience before scheduling. Ask when the person last attempted the task and what happened. Avoid revealing the desired answer in the question. Separate contact details from research notes, and retain only the information you need for the session."
      },
      {
        "title": "Turn it into a decision",
        "body": "Track invitations, replies, eligible people, bookings, and attendance separately. A low attendance rate suggests a different intervention from low eligibility. Change one part of the funnel, such as offering two time windows, then inspect whether it improved attendance without excluding a relevant group."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "From 100 invitations, 20 people reply, 12 qualify, eight book, and four attend. Calling this a four percent response rate confuses the stages. The response rate is 20 percent; attendance among bookings is 50 percent."
    },
    "prompt": "Critique [invitation and screener] for clarity, leading eligibility questions, unnecessary personal data and hidden sales language. Propose two shorter invitations without inventing incentives or consent. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. From 100 invitations, 20 people reply, 12 qualify, eight book, and four attend. Calling this a four percent response rate confuses the stages. The response rate is 20 percent; attendance among bookings is 50 percent.",
    "practice": "Create a one-page artifact for this method: make an invitation easy to evaluate. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "pipeline",
      "title": "Make an invitation easy to evaluate",
      "nodes": [
        {
          "label": "Invited",
          "detail": "Define the unit"
        },
        {
          "label": "Eligible",
          "detail": "Keep source links"
        },
        {
          "label": "Booked",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Attended",
          "detail": "Choose a next check"
        }
      ],
      "caption": "From 100 invitations, 20 people reply, 12 qualify, eight book, and four attend. Calling this a four percent response rate confuses the stages. The response rate is 20 percent; attendance among bookings is 50 percent."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ],
    "researchLab": "recruitment"
  },
  "research-cadence": {
    "intro": "Turn research into a recurring decision. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "A research cadence is a repeated connection between evidence and decisions. Start each week by naming one unresolved decision, the strongest uncertainty, and what observation could reduce it. A calendar full of interviews is not useful if no product decision can change as a result."
      },
      {
        "title": "Do the work carefully",
        "body": "Keep three lightweight records: the question backlog, the source evidence log, and the decision log. Each decision should point back to evidence and name a next review date. Separate observations from assumptions so new colleagues can understand why a choice seemed reasonable at the time."
      },
      {
        "title": "Turn it into a decision",
        "body": "Close the loop with the team. A weekly snapshot can state what changed, what did not, the strongest counterexample, and what you will check next. Do not erase an inconvenient observation to make a clean narrative. If nothing changes, explain whether confidence increased or the method failed to reach the right people."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "A team runs interviews every Friday but never revisits its roadmap. Add a Tuesday decision review: one question, two source links, one counterexample, and a named owner. The ritual becomes useful when evidence can stop a planned feature."
    },
    "prompt": "Turn [research notes] into a weekly decision update. Separate new observations, changed beliefs, unresolved questions and next checks. Cite source IDs for each observation and flag decisions the evidence cannot support. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. A team runs interviews every Friday but never revisits its roadmap. Add a Tuesday decision review: one question, two source links, one counterexample, and a named owner. The ritual becomes useful when evidence can stop a planned feature.",
    "practice": "Create a one-page artifact for this method: turn research into a recurring decision. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "cycle",
      "title": "Turn research into a recurring decision",
      "nodes": [
        {
          "label": "Question",
          "detail": "Define the unit"
        },
        {
          "label": "Session",
          "detail": "Keep source links"
        },
        {
          "label": "Evidence",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Decision",
          "detail": "Choose a next check"
        }
      ],
      "caption": "A team runs interviews every Friday but never revisits its roadmap. Add a Tuesday decision review: one question, two source links, one counterexample, and a named owner. The ritual becomes useful when evidence can stop a planned feature."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ]
  },
  "the-interview": {
    "intro": "Reconstruct an event before discussing solutions. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Choose a recent event and ask the participant to walk through it from the trigger to the outcome. Ask what they opened, what information they needed, where they paused, and what they did next. A concrete timeline gives you more to inspect than a general preference about a proposed feature."
      },
      {
        "title": "Do the work carefully",
        "body": "Your job is to understand the participant’s account, not to demonstrate expertise. Leave silence, ask for an example, and ask permission before viewing an artifact. If you must clarify your product, label that part of the session so you do not confuse an unprompted reaction with a response to your explanation."
      },
      {
        "title": "Turn it into a decision",
        "body": "After the session, write a short factual timeline before interpreting causes. Preserve the participant’s own language and mark uncertainty. Record whether a statement describes an observed action, a remembered action, or a future intention. Those forms of evidence answer different questions."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "“Would AI save time?” produces agreement. “Show me the last report you prepared” reveals that most time went into waiting for a manager’s approval. Automated drafting might leave the dominant delay untouched."
    },
    "prompt": "Rewrite [interview guide] as neutral prompts about a recent event. For each question, state what decision it informs. Remove suggestions of a solution and include follow-up probes for actions and artifacts. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. “Would AI save time?” produces agreement. “Show me the last report you prepared” reveals that most time went into waiting for a manager’s approval. Automated drafting might leave the dominant delay untouched.",
    "practice": "Create a one-page artifact for this method: reconstruct an event before discussing solutions. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "conversation",
      "title": "Reconstruct an event before discussing solutions",
      "nodes": [
        {
          "label": "Trigger",
          "detail": "Define the unit"
        },
        {
          "label": "Actual steps",
          "detail": "Keep source links"
        },
        {
          "label": "Workaround",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Outcome",
          "detail": "Choose a next check"
        }
      ],
      "caption": "“Would AI save time?” produces agreement. “Show me the last report you prepared” reveals that most time went into waiting for a manager’s approval. Automated drafting might leave the dominant delay untouched."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: in-depth interviews",
        "url": "https://www.gov.uk/service-manual/user-research/using-in-depth-interviews"
      }
    ],
    "researchLab": "questions"
  },
  "leading-the-witness": {
    "intro": "Remove the answer from the question. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Leading questions can introduce a preferred feature, an emotional judgement, or an expected answer. “How frustrating is the export?” presumes frustration. “What happened when you exported?” permits a success, a failure, or a problem you had not considered."
      },
      {
        "title": "Do the work carefully",
        "body": "Inspect your follow-ups too. Nodding enthusiastically only when someone confirms your idea can change the conversation. Use consistent prompts and write down places where you explained or defended the product. This does not make the interview worthless; it makes the influence visible."
      },
      {
        "title": "Turn it into a decision",
        "body": "Compare two versions of the same question and list the evidence each could produce. Do not treat an AI rewrite as automatically neutral. A model may replace one leading adjective while retaining the assumption that the proposed feature is needed. Read every question aloud before the session."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "“Would you prefer a faster dashboard?” asks for an obvious preference. “When did you last need a number that was not available?” can reveal a missing definition, a permission problem, or no meaningful issue."
    },
    "prompt": "Audit [questions]. Identify the presupposition in each, explain how it could steer an answer, and rewrite it around a specific past event. Do not add product benefits or imagined user pain. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. “Would you prefer a faster dashboard?” asks for an obvious preference. “When did you last need a number that was not available?” can reveal a missing definition, a permission problem, or no meaningful issue.",
    "practice": "Create a one-page artifact for this method: remove the answer from the question. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "comparison",
      "title": "Remove the answer from the question",
      "nodes": [
        {
          "label": "Assumption",
          "detail": "Define the unit"
        },
        {
          "label": "Leading wording",
          "detail": "Keep source links"
        },
        {
          "label": "Neutral probe",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Evidence",
          "detail": "Choose a next check"
        }
      ],
      "caption": "“Would you prefer a faster dashboard?” asks for an obvious preference. “When did you last need a number that was not available?” can reveal a missing definition, a permission problem, or no meaningful issue."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: in-depth interviews",
        "url": "https://www.gov.uk/service-manual/user-research/using-in-depth-interviews"
      }
    ],
    "researchLab": "questions"
  },
  "the-transcript": {
    "intro": "Keep the evidence auditable. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Obtain informed permission before recording. A transcript is a useful index into a conversation, not a perfect record of it. Speech recognition may change names, numbers, negation, or domain vocabulary. Verify important excerpts against the recording where permission and access allow."
      },
      {
        "title": "Do the work carefully",
        "body": "Assign source IDs and timestamps. Keep an exact quote field separate from a short interpretation. If you paraphrase, label it as a paraphrase. Remove personal or confidential details before sharing material with AI, and never publish recordings or identifiable quotations without appropriate permission."
      },
      {
        "title": "Turn it into a decision",
        "body": "Publish your first research reflection using a small, safe artifact. Explain what you expected, what changed, and what you still cannot conclude. A thoughtful article can describe uncertainty rather than claiming a successful product outcome. Link the course as context, not as an endorsement of your findings."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "The transcript says “I always trust transfers,” while the recording says “I don’t always trust transfers.” That missing negation reverses the insight. Flag and correct it before clustering the quote."
    },
    "prompt": "Using only [anonymised transcript], produce source ID, timestamp, exact quote, context and tentative interpretation. Preserve negation and uncertainty. Mark unclear passages rather than repairing them with invented words. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. The transcript says “I always trust transfers,” while the recording says “I don’t always trust transfers.” That missing negation reverses the insight. Flag and correct it before clustering the quote.",
    "practice": "Create a one-page artifact for this method: keep the evidence auditable. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "document",
      "title": "Keep the evidence auditable",
      "nodes": [
        {
          "label": "Permission",
          "detail": "Define the unit"
        },
        {
          "label": "Transcript",
          "detail": "Keep source links"
        },
        {
          "label": "Verified quote",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Interpretation",
          "detail": "Choose a next check"
        }
      ],
      "caption": "The transcript says “I always trust transfers,” while the recording says “I don’t always trust transfers.” That missing negation reverses the insight. Flag and correct it before clustering the quote."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: in-depth interviews",
        "url": "https://www.gov.uk/service-manual/user-research/using-in-depth-interviews"
      }
    ],
    "researchLab": "coding",
    "article": {
      "number": 1,
      "title": "What my interviews changed",
      "brief": "Publish a research reflection on Medium, Substack, or Reddit. Explain your starting belief, two evidence-backed changes, one uncertainty, and how you checked AI output. Link pmcademy.com as the course context. Remove private details and respect the publishing community’s rules.",
      "artifact": "An anonymised quote-to-interpretation table"
    }
  },
  "extraction-pipeline": {
    "intro": "Design a schema before scaling extraction. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Write the output schema before asking AI to process a large set of material. Include source ID, exact excerpt, reported event, context, interpretation, and missing information. Define what one row represents: an incident, a person, or a claim. Mixing these units creates misleading frequency counts."
      },
      {
        "title": "Do the work carefully",
        "body": "Begin with a small batch and manually review every row. Use an untouched evaluation set to check whether changes to the prompt generalise. Record omissions as well as hallucinations; an extractor that only returns easy passages can hide the very situations you need to understand."
      },
      {
        "title": "Turn it into a decision",
        "body": "Scale only after the error pattern is tolerable for the decision. Preserve original sources and prompt versions. Review a random sample plus ambiguous or high-stakes outputs. An impressive number of rows is not an achievement if another person cannot trace them back to evidence."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "A model converts one participant’s repeated complaint into five incidents. Add an incident identifier and a deduplication review. Keep the repeated mentions as context, but count affected people separately."
    },
    "prompt": "Extract [material] into [schema]. One row must represent one reported incident. Include source IDs and exact excerpts. Return unknown for missing values and a separate list of ambiguous or omitted passages. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. A model converts one participant’s repeated complaint into five incidents. Add an incident identifier and a deduplication review. Keep the repeated mentions as context, but count affected people separately.",
    "practice": "Create a one-page artifact for this method: design a schema before scaling extraction. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "pipeline",
      "title": "Design a schema before scaling extraction",
      "nodes": [
        {
          "label": "Schema",
          "detail": "Define the unit"
        },
        {
          "label": "Small batch",
          "detail": "Keep source links"
        },
        {
          "label": "Error audit",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Scale",
          "detail": "Choose a next check"
        }
      ],
      "caption": "A model converts one participant’s repeated complaint into five incidents. Add an incident identifier and a deduplication review. Keep the repeated mentions as context, but count affected people separately."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ],
    "researchLab": "coding"
  },
  "clusters-that-are-real": {
    "intro": "A neat label can hide different causes. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Do not request a fixed number of clusters unless there is a reason tied to the decision. Start with tentative codes and examples. Define inclusion and exclusion criteria for each code. A shared word such as “login” can refer to account verification, expired sessions, or missing permissions."
      },
      {
        "title": "Do the work carefully",
        "body": "Ask a second reviewer to independently code a sample. Examine disagreements before calculating an agreement score. High agreement can still reflect shared misunderstanding. Clarify boundaries and test the revised rules on material that did not shape them."
      },
      {
        "title": "Turn it into a decision",
        "body": "Preserve rare but severe issues instead of deleting small clusters. A complaint about inaccessible controls may require attention even if it appears once. Frequency, severity, confidence, and affected context belong in separate columns. The final cluster map should make counterexamples visible."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "Six quotes mention “slow.” Three describe loading time, two describe approval delays, and one describes learning the workflow. A single speed cluster would encourage one technical fix for three different problems."
    },
    "prompt": "Propose tentative codes for [evidence]. For each, give inclusion/exclusion rules, source examples and counterexamples. Allow unassigned material. Do not infer a common cause from similar vocabulary. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. Six quotes mention “slow.” Three describe loading time, two describe approval delays, and one describes learning the workflow. A single speed cluster would encourage one technical fix for three different problems.",
    "practice": "Create a one-page artifact for this method: a neat label can hide different causes. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "tree",
      "title": "A neat label can hide different causes",
      "nodes": [
        {
          "label": "Quotes",
          "detail": "Define the unit"
        },
        {
          "label": "Tentative codes",
          "detail": "Keep source links"
        },
        {
          "label": "Disagreements",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Revised map",
          "detail": "Choose a next check"
        }
      ],
      "caption": "Six quotes mention “slow.” Three describe loading time, two describe approval delays, and one describes learning the workflow. A single speed cluster would encourage one technical fix for three different problems."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ],
    "researchLab": "agreement"
  },
  "lost-deals-and-cancellations": {
    "intro": "Ask what changed at the moment of exit. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "A lost deal and a cancellation happen at different points in the relationship. Keep them separate. Ask about the triggering event, alternatives considered, decision makers, and what happened after leaving. A sales note or cancellation dropdown is a useful lead, not a complete explanation."
      },
      {
        "title": "Do the work carefully",
        "body": "Compare stated reasons with the available sequence of events. A customer may name price after weeks of unresolved reliability problems. That does not prove the reliability issue caused cancellation. It tells you which competing explanation to investigate and which evidence would distinguish them."
      },
      {
        "title": "Turn it into a decision",
        "body": "Rewrite reason categories from actual language, then retain an open-text option. Track how categories change over time and avoid comparing periods whose definitions differ. Share findings with support and sales without turning research interviews into attempts to win the participant back."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "Four people select “too expensive.” Two never activated, one lost budget, and one moved to a competitor with better reporting. A blanket discount treats these as the same situation and may solve none of them."
    },
    "prompt": "Build an exit-event timeline from [notes]. Separate stated reasons, observed events and causal hypotheses. Suggest neutral follow-ups and identify data that could distinguish the explanations. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. Four people select “too expensive.” Two never activated, one lost budget, and one moved to a competitor with better reporting. A blanket discount treats these as the same situation and may solve none of them.",
    "practice": "Create a one-page artifact for this method: ask what changed at the moment of exit. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "timeline",
      "title": "Ask what changed at the moment of exit",
      "nodes": [
        {
          "label": "Trigger",
          "detail": "Define the unit"
        },
        {
          "label": "Alternatives",
          "detail": "Keep source links"
        },
        {
          "label": "Decision",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "After exit",
          "detail": "Choose a next check"
        }
      ],
      "caption": "Four people select “too expensive.” Two never activated, one lost budget, and one moved to a competitor with better reporting. A blanket discount treats these as the same situation and may solve none of them."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ]
  },
  "say-vs-do": {
    "intro": "Treat the discrepancy as a question. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "People can sincerely value a capability they rarely use. The action may be seasonal, delegated, or important as reassurance. When stated importance and usage diverge, first check whether both sources describe the same population, task, and time window."
      },
      {
        "title": "Do the work carefully",
        "body": "Inspect the event definition before challenging the participant. A click event may miss a keyboard shortcut or a downloaded file opened elsewhere. Low recorded activity may represent instrumentation failure, low need, or a difficult route. Each explanation suggests a different next check."
      },
      {
        "title": "Turn it into a decision",
        "body": "Present the discrepancy without accusing people of lying. Quote what they said, define what the event captures, and list plausible explanations. Select a follow-up that can eliminate one explanation, such as watching a real task or validating the tracking implementation."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "Interviewees call export essential, but few click Export. One analyst downloads data through a scheduled integration and another needs the button only for quarterly audits. Low weekly clicks alone do not establish low value."
    },
    "prompt": "Compare [interview claims] with [event definitions and counts]. List mismatched populations, windows and measurement gaps. Propose a small check for each discrepancy without asserting that either source is false. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. Interviewees call export essential, but few click Export. One analyst downloads data through a scheduled integration and another needs the button only for quarterly audits. Low weekly clicks alone do not establish low value.",
    "practice": "Create a one-page artifact for this method: treat the discrepancy as a question. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "comparison",
      "title": "Treat the discrepancy as a question",
      "nodes": [
        {
          "label": "Claim",
          "detail": "Define the unit"
        },
        {
          "label": "Measurement",
          "detail": "Keep source links"
        },
        {
          "label": "Mismatch",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Next check",
          "detail": "Choose a next check"
        }
      ],
      "caption": "Interviewees call export essential, but few click Export. One analyst downloads data through a scheduled integration and another needs the button only for quarterly audits. Low weekly clicks alone do not establish low value."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ]
  },
  "five-people-failing": {
    "intro": "Watch the task, and record assistance. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Write realistic tasks as goals, not interface instructions. “Find last month’s net income” is more useful than “click Reports and choose Income.” Check that participants have the relevant context and that the prototype supports the intended task before interpreting failure."
      },
      {
        "title": "Do the work carefully",
        "body": "Record independent completion, assisted completion, noncompletion, and recovery. Help or stop when needed, then label assistance honestly. Five sessions can expose actionable problems but cannot establish a precise population success rate or guarantee that all important issues have been found."
      },
      {
        "title": "Turn it into a decision",
        "body": "Prioritise problems using consequence as well as frequency. A rare financial error may matter more than a common cosmetic hesitation. Describe the moment of failure, the participant’s expectation, and what the interface communicated. Test the change in another round rather than assuming the first fix worked."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "Four of five people eventually finish, but two needed the moderator to point at a control. Report two unassisted, two assisted, and one incomplete outcome. “80 percent success” hides the design problem."
    },
    "prompt": "Turn [task and prototype description] into neutral usability tasks and an observation sheet. Include independent/assisted outcomes, errors, recovery, accessibility barriers and stopping conditions. Do not fabricate participant behaviour. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. Four of five people eventually finish, but two needed the moderator to point at a control. Report two unassisted, two assisted, and one incomplete outcome. “80 percent success” hides the design problem.",
    "practice": "Create a one-page artifact for this method: watch the task, and record assistance. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "pipeline",
      "title": "Watch the task, and record assistance",
      "nodes": [
        {
          "label": "Goal",
          "detail": "Define the unit"
        },
        {
          "label": "Attempt",
          "detail": "Keep source links"
        },
        {
          "label": "Assistance",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Recovery",
          "detail": "Choose a next check"
        }
      ],
      "caption": "Four of five people eventually finish, but two needed the moderator to point at a control. Report two unassisted, two assisted, and one incomplete outcome. “80 percent success” hides the design problem."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: moderated usability testing",
        "url": "https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing"
      }
    ],
    "researchLab": "usability"
  },
  "locating-the-moment": {
    "intro": "Find the first divergence in the journey. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Map the task as a sequence of states. For each state, record what the person expects, what the interface shows, and what action is possible. The first observable divergence is often more actionable than a broad complaint about the whole experience."
      },
      {
        "title": "Do the work carefully",
        "body": "Combine observation with event timestamps carefully. Screen recordings can show hesitation that analytics cannot; analytics can show how often a route occurs beyond your small sample. Neither source automatically explains motivation. Check clocks, event naming, and missing states before aligning them."
      },
      {
        "title": "Turn it into a decision",
        "body": "Write a narrowly scoped problem at the moment of failure. Include entry conditions and recovery behaviour. Ask which small intervention would distinguish a misleading label from a missing capability. You are locating a useful experiment, not proving the entire causal chain."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "A participant says the report is confusing. The first divergence happens earlier: a date selector keeps last year’s range after navigation. Test whether making the active range visible changes the task outcome."
    },
    "prompt": "Map [observed task] into state, expectation, visible feedback, action and uncertainty. Identify the first supported divergence and propose alternative explanations. Keep unobserved states explicitly unknown. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. A participant says the report is confusing. The first divergence happens earlier: a date selector keeps last year’s range after navigation. Test whether making the active range visible changes the task outcome.",
    "practice": "Create a one-page artifact for this method: find the first divergence in the journey. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "timeline",
      "title": "Find the first divergence in the journey",
      "nodes": [
        {
          "label": "Expectation",
          "detail": "Define the unit"
        },
        {
          "label": "Feedback",
          "detail": "Keep source links"
        },
        {
          "label": "Divergence",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Recovery",
          "detail": "Choose a next check"
        }
      ],
      "caption": "A participant says the report is confusing. The first divergence happens earlier: a date selector keeps last year’s range after navigation. Test whether making the active range visible changes the task outcome."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: moderated usability testing",
        "url": "https://www.gov.uk/service-manual/user-research/using-moderated-usability-testing"
      }
    ]
  },
  "problem-statement": {
    "intro": "Make the claim narrow enough to challenge. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "A useful problem statement names a person in a situation, the blocked outcome, and the consequence. It should not contain the solution disguised as a need. “Needs an AI dashboard” skips the work of explaining what decision the person cannot make today."
      },
      {
        "title": "Do the work carefully",
        "body": "Attach evidence and boundaries. State which sources support the claim, which segment it applies to, and what remains unmeasured. A problem can be worth investigating without a confident prevalence estimate. Avoid writing “all users” when the evidence comes from a small purposeful sample."
      },
      {
        "title": "Turn it into a decision",
        "body": "Ask what would make the statement false. This turns a persuasive sentence into a testable claim. Invite a colleague to propose a competing explanation, then choose the cheapest observation that would separate them. Revisit the wording after the check."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "“Freelancers need forecasting” becomes “freelancers with irregular invoices cannot identify which bills they can pay before overdue invoices arrive.” The second statement leaves room for several solutions and a clear research task."
    },
    "prompt": "Critique [problem statement] for hidden solutions, unsupported population claims and unclear consequences. Produce a narrower version, supporting source IDs, competing explanations and a falsification check. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. “Freelancers need forecasting” becomes “freelancers with irregular invoices cannot identify which bills they can pay before overdue invoices arrive.” The second statement leaves room for several solutions and a clear research task.",
    "practice": "Create a one-page artifact for this method: make the claim narrow enough to challenge. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "document",
      "title": "Make the claim narrow enough to challenge",
      "nodes": [
        {
          "label": "Person",
          "detail": "Define the unit"
        },
        {
          "label": "Situation",
          "detail": "Keep source links"
        },
        {
          "label": "Blocked outcome",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Consequence",
          "detail": "Choose a next check"
        }
      ],
      "caption": "“Freelancers need forecasting” becomes “freelancers with irregular invoices cannot identify which bills they can pay before overdue invoices arrive.” The second statement leaves room for several solutions and a clear research task."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ]
  },
  "sizing-the-problem": {
    "intro": "Use a range that reveals the assumption. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Start with a unit equation. Affected people multiplied by incidents per period and loss per incident estimates burden. Define each input, period, and source. Do not silently convert time into revenue or treat all burden as recoverable by your product."
      },
      {
        "title": "Do the work carefully",
        "body": "Use a plausible low, central, and high value where evidence is weak. Change one assumption at a time to see which drives the result. This sensitivity check tells you where another measurement may matter more than a more precise spreadsheet."
      },
      {
        "title": "Turn it into a decision",
        "body": "Separate the total problem from the reachable opportunity. Some people may be outside your market, unwilling to change, or blocked by constraints your product cannot address. Show those exclusions explicitly so a large headline number does not become an unrealistic delivery promise."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "Assume 300 people lose five to ten minutes twice a month. The range is 3,000–6,000 minutes per month. It is a workload estimate, not proven savings, willingness to pay, or revenue."
    },
    "prompt": "Build a sizing model for [problem] using only [inputs]. Label units, time periods, assumptions and sources. Show low/base/high scenarios and identify which uncertain input most changes the decision. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. Assume 300 people lose five to ten minutes twice a month. The range is 3,000–6,000 minutes per month. It is a workload estimate, not proven savings, willingness to pay, or revenue.",
    "practice": "Create a one-page artifact for this method: use a range that reveals the assumption. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "pipeline",
      "title": "Use a range that reveals the assumption",
      "nodes": [
        {
          "label": "People",
          "detail": "Define the unit"
        },
        {
          "label": "Frequency",
          "detail": "Keep source links"
        },
        {
          "label": "Loss per event",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Range",
          "detail": "Choose a next check"
        }
      ],
      "caption": "Assume 300 people lose five to ten minutes twice a month. The range is 3,000–6,000 minutes per month. It is a workload estimate, not proven savings, willingness to pay, or revenue."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ],
    "researchLab": "sizing"
  },
  "opportunity-tree": {
    "intro": "Branch from outcomes through evidence. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Put the desired outcome at the top, customer opportunities beneath it, and solution options below those. Keep opportunities phrased as situations or unmet needs. If every branch is a feature name, the tree is a roadmap drawing rather than a discovery tool."
      },
      {
        "title": "Do the work carefully",
        "body": "Attach source links to opportunity nodes and assumptions to solution nodes. Include more than one solution for the strongest opportunity, including a process or communication change when appropriate. Mark branches with weak evidence instead of giving every node equal visual weight."
      },
      {
        "title": "Turn it into a decision",
        "body": "Publish your second project article around one branch. Show the evidence that created it, the alternatives you considered, and the assumption you will test next. Use an anonymised diagram and distinguish project proposals from measured results. Link PMcademy as the learning context."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "For a reporting product, “share safely with a client” is an opportunity. A permission preset, an expiring link, and an export checklist are competing solutions. Test the riskiest assumption before choosing a build."
    },
    "prompt": "Inspect [opportunity tree]. Flag solutions mislabelled as needs, unsupported branches and duplicate opportunities. Suggest alternative mechanisms and the assumption that could invalidate each. Preserve source IDs. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. For a reporting product, “share safely with a client” is an opportunity. A permission preset, an expiring link, and an export checklist are competing solutions. Test the riskiest assumption before choosing a build.",
    "practice": "Create a one-page artifact for this method: branch from outcomes through evidence. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "tree",
      "title": "Branch from outcomes through evidence",
      "nodes": [
        {
          "label": "Outcome",
          "detail": "Define the unit"
        },
        {
          "label": "Opportunity",
          "detail": "Keep source links"
        },
        {
          "label": "Alternatives",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Assumption test",
          "detail": "Choose a next check"
        }
      ],
      "caption": "For a reporting product, “share safely with a client” is an opportunity. A permission preset, an expiring link, and an export checklist are competing solutions. Test the riskiest assumption before choosing a build."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "Product Talk: opportunity solution trees",
        "url": "https://www.producttalk.org/opportunity-solution-trees/"
      }
    ],
    "article": {
      "number": 2,
      "title": "From evidence to a product bet",
      "brief": "Publish a project article showing one opportunity branch, its evidence, two alternative solutions, and the assumption you will test. Explain what AI suggested and what you rejected. Link pmcademy.com as the course context. Remove private details and respect the publishing community’s rules.",
      "artifact": "An annotated opportunity tree with source IDs"
    }
  },
  "measuring-pmf": {
    "intro": "Read the denominator beside the percentage. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "A product-market fit survey can help identify a promising group, but a threshold is not a universal certificate. Define who receives the survey, how much product experience they need, and which question you are using. The selection rule strongly affects interpretation."
      },
      {
        "title": "Do the work carefully",
        "body": "Report numerator and denominator together. Eight strong supporters out of twenty and forty out of one hundred can share a percentage while offering different evidence. Inspect nonresponse, tenure, and acquisition channel. Do not treat a convenience sample as a precise estimate of the whole market."
      },
      {
        "title": "Turn it into a decision",
        "body": "Use follow-up language to understand the benefit people would miss and the alternatives they would use. Combine this with observed return behaviour and real constraints. A survey can sharpen the next research question without proving that the business has durable demand."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "A fictional survey receives eight strong-support responses from twenty active users. Report 8/20, the eligibility rule, and the missing inactive group. Ask what those eight rely on instead of presenting 40 percent as a launch guarantee."
    },
    "prompt": "Analyse [survey rows] by eligibility, response counts and stated benefits. Keep denominators beside every percentage. Flag small groups, missing responses and exploratory cuts; do not certify product-market fit. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. A fictional survey receives eight strong-support responses from twenty active users. Report 8/20, the eligibility rule, and the missing inactive group. Ask what those eight rely on instead of presenting 40 percent as a launch guarantee.",
    "practice": "Create a one-page artifact for this method: read the denominator beside the percentage. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "pipeline",
      "title": "Read the denominator beside the percentage",
      "nodes": [
        {
          "label": "Eligibility",
          "detail": "Define the unit"
        },
        {
          "label": "Responses",
          "detail": "Keep source links"
        },
        {
          "label": "Benefits",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Next question",
          "detail": "Choose a next check"
        }
      ],
      "caption": "A fictional survey receives eight strong-support responses from twenty active users. Report 8/20, the eligibility rule, and the missing inactive group. Ask what those eight rely on instead of presenting 40 percent as a launch guarantee."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "Superhuman: building a product-market fit engine",
        "url": "https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/"
      }
    ],
    "researchLab": "pmf"
  },
  "reading-cohorts": {
    "intro": "Compare people at the same age. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Define the entry event, return event, and observation window before drawing the table. Registration and first meaningful use create different cohorts. A return should represent value for this product, not merely an accidental page load."
      },
      {
        "title": "Do the work carefully",
        "body": "Compare cohorts at the same elapsed age. A new cohort that has not reached week four has an unobserved cell, not zero retention. Keep cohort sizes visible and note changes in acquisition mix, tracking, and product eligibility that affect comparability."
      },
      {
        "title": "Turn it into a decision",
        "body": "Inspect curves before inventing a story. A better recent cohort could reflect a different audience rather than a product improvement. Segment on a plausible mechanism and look for corroborating evidence. Avoid repeatedly slicing a small dataset until one group looks exceptional."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "January and February have week-four data, but March is only two weeks old. Filling March’s week-four cell with zero creates a fake collapse. Leave the cell blank and explain why."
    },
    "prompt": "Check [cohort table and definitions] for unequal ages, missing observation windows, changed event definitions and small denominators. Distinguish unobserved cells from observed zero returns. Suggest one justified comparison. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. January and February have week-four data, but March is only two weeks old. Filling March’s week-four cell with zero creates a fake collapse. Leave the cell blank and explain why.",
    "practice": "Create a one-page artifact for this method: compare people at the same age. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "timeline",
      "title": "Compare people at the same age",
      "nodes": [
        {
          "label": "Entry event",
          "detail": "Define the unit"
        },
        {
          "label": "Cohort size",
          "detail": "Keep source links"
        },
        {
          "label": "Equal age",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Return event",
          "detail": "Choose a next check"
        }
      ],
      "caption": "January and February have week-four data, but March is only two weeks old. Filling March’s week-four cell with zero creates a fake collapse. Leave the cell blank and explain why."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ],
    "researchLab": "cohorts"
  },
  "fit-is-a-segment": {
    "intro": "Find a mechanism behind the segment. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "A useful segment is more than a demographic label. Look for a common situation, frequency of need, constraint, or benefit that explains why the product fits. “Power users” merely redescribes behaviour unless you explain what makes the product valuable for them."
      },
      {
        "title": "Do the work carefully",
        "body": "Distinguish exploratory discovery from confirmation. A segment selected because it performed well in the data needs a later check on fresh evidence. Keep the original search visible and avoid presenting the best of many cuts as a preplanned hypothesis."
      },
      {
        "title": "Turn it into a decision",
        "body": "Write the implications of focusing on the segment. What changes in onboarding, messaging, support, and feature priority? Also name who may be underserved and what evidence would justify expanding later. Focus is a resource decision with costs, not a statement that other users are unimportant."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "Daily coordinators return because they must hand work to several colleagues every afternoon. Their situation is more actionable than “users with high engagement,” because it suggests a specific workflow to investigate."
    },
    "prompt": "Evaluate [candidate segments] for a plausible need-based mechanism. Separate exploratory patterns from confirmed evidence. Propose a fresh-sample check and the product trade-offs of focusing on each group. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. Daily coordinators return because they must hand work to several colleagues every afternoon. Their situation is more actionable than “users with high engagement,” because it suggests a specific workflow to investigate.",
    "practice": "Create a one-page artifact for this method: find a mechanism behind the segment. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "matrix",
      "title": "Find a mechanism behind the segment",
      "nodes": [
        {
          "label": "Situation",
          "detail": "Define the unit"
        },
        {
          "label": "Repeated need",
          "detail": "Keep source links"
        },
        {
          "label": "Benefit",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Focus trade-off",
          "detail": "Choose a next check"
        }
      ],
      "caption": "Daily coordinators return because they must hand work to several colleagues every afternoon. Their situation is more actionable than “users with high engagement,” because it suggests a specific workflow to investigate."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "Superhuman: building a product-market fit engine",
        "url": "https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/"
      }
    ]
  },
  "mvp": {
    "intro": "Minimise the test, not the thinking. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Name the uncertainty before choosing the minimum version. A manual service can test whether an outcome matters, while a prototype can test whether a workflow is understandable. Neither automatically tests scalable delivery or willingness to pay."
      },
      {
        "title": "Do the work carefully",
        "body": "Define what the participant will actually experience and disclose manual work where it affects expectations or consent. Keep safety, privacy, and truthful communication intact. Removing essential safeguards is not a valid way to make a product smaller."
      },
      {
        "title": "Turn it into a decision",
        "body": "Choose the observation that would change your next investment. Specify a success signal, a failure signal, a time window, and what the test cannot establish. If every possible result leads to building the full feature, you have not designed a useful learning test."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "Before building automatic reporting, manually prepare two reports from consented sample data and ask participants to use them in a real decision. This tests usefulness, but not automated accuracy, scale, or production reliability."
    },
    "prompt": "For [riskiest assumption], compare a manual service, prototype and limited release. State what each can and cannot test, participant disclosure, observable outcomes and a stopping rule. Do not equate interest with payment. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. Before building automatic reporting, manually prepare two reports from consented sample data and ask participants to use them in a real decision. This tests usefulness, but not automated accuracy, scale, or production reliability.",
    "practice": "Create a one-page artifact for this method: minimise the test, not the thinking. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "branch",
      "title": "Minimise the test, not the thinking",
      "nodes": [
        {
          "label": "Assumption",
          "detail": "Define the unit"
        },
        {
          "label": "Smallest test",
          "detail": "Keep source links"
        },
        {
          "label": "Observation",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Next investment",
          "detail": "Choose a next check"
        }
      ],
      "caption": "Before building automatic reporting, manually prepare two reports from consented sample data and ask participants to use them in a real decision. This tests usefulness, but not automated accuracy, scale, or production reliability."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ]
  },
  "experiment-that-can-fail": {
    "intro": "Write the decision rule before the result. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "An experiment begins with a hypothesis and a decision it can change. Define the eligible population, assignment method, primary metric, observation window, and guardrails. Record these choices before inspecting outcomes so the interpretation does not shift to whichever number improved."
      },
      {
        "title": "Do the work carefully",
        "body": "Check the path from assignment to measurement. Unequal exposure, missing events, or contamination between groups can break the comparison. Use a sample-size and duration plan suited to the design; a small classroom demonstration is not a statistically powered production experiment."
      },
      {
        "title": "Turn it into a decision",
        "body": "Write what would make you stop, revise, or continue. A higher conversion rate can coexist with more errors or worse downstream outcomes. Guardrails are useful only if they can affect the decision. Preserve null or disappointing results in the project record."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "A fictional change raises report opens from 50 to 65 percent but increases wrong-date exports from 4 to 14 percent. If the prewritten guardrail is 8 percent, investigate before rollout despite the attractive primary metric."
    },
    "prompt": "Critique [experiment brief] for ambiguous outcomes, post-hoc choices, measurement gaps and missing guardrails. Write stop/revise/continue rules. Do not invent sample sizes, significance or results. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. A fictional change raises report opens from 50 to 65 percent but increases wrong-date exports from 4 to 14 percent. If the prewritten guardrail is 8 percent, investigate before rollout despite the attractive primary metric.",
    "practice": "Create a one-page artifact for this method: write the decision rule before the result. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "balance",
      "title": "Write the decision rule before the result",
      "nodes": [
        {
          "label": "Hypothesis",
          "detail": "Define the unit"
        },
        {
          "label": "Assignment",
          "detail": "Keep source links"
        },
        {
          "label": "Measurement",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Decision rule",
          "detail": "Choose a next check"
        }
      ],
      "caption": "A fictional change raises report opens from 50 to 65 percent but increases wrong-date exports from 4 to 14 percent. If the prewritten guardrail is 8 percent, investigate before rollout despite the attractive primary metric."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ],
    "researchLab": "experiment"
  },
  "kill-your-favourite": {
    "intro": "Make a stopping decision visible. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "Write down why you prefer the idea before reviewing evidence. It may be technically interesting, easy to explain, or personally satisfying. Naming that attachment helps separate it from the user problem and prevents every negative result from becoming an excuse to add another feature."
      },
      {
        "title": "Do the work carefully",
        "body": "Compare the result with the prewritten decision rule. A failed assumption can justify stopping, narrowing the audience, or changing the mechanism. Do not rewrite the original hypothesis after seeing the result and then claim the experiment succeeded."
      },
      {
        "title": "Turn it into a decision",
        "body": "Record the learning and the released capacity. State what evidence could reopen the idea later. Share the decision respectfully with people who invested in it; stopping a weak bet should not imply that their work was wasted or that they were wrong to explore it."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "A prototype is usable, but participants still choose their existing spreadsheet for the real task. Keep the usability finding, reject the claim that usability was the main adoption barrier, and investigate switching costs before more interface work."
    },
    "prompt": "Challenge [preferred idea] using [evidence and prewritten rule]. List the strongest disconfirming observation, alternative interpretations, and a stop/narrow/retest recommendation. State what future evidence could reopen the bet. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. A prototype is usable, but participants still choose their existing spreadsheet for the real task. Keep the usability finding, reject the claim that usability was the main adoption barrier, and investigate switching costs before more interface work.",
    "practice": "Create a one-page artifact for this method: make a stopping decision visible. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "balance",
      "title": "Make a stopping decision visible",
      "nodes": [
        {
          "label": "Favourite bet",
          "detail": "Define the unit"
        },
        {
          "label": "Disconfirming evidence",
          "detail": "Keep source links"
        },
        {
          "label": "Decision",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Released capacity",
          "detail": "Choose a next check"
        }
      ],
      "caption": "A prototype is usable, but participants still choose their existing spreadsheet for the real task. Keep the usability finding, reject the claim that usability was the main adoption barrier, and investigate switching costs before more interface work."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ]
  },
  "the-discovery-pack": {
    "intro": "Build a chain another person can inspect. Use this method on your chosen course project, then keep the evidence beside the decision.",
    "teaching": [
      {
        "title": "Define the evidence you need",
        "body": "The discovery pack should connect a decision to its evidence, not merely collect polished research artifacts. Lead with the recommendation, then link the problem statement, source log, contrasting experiences, opportunity tree, and experiment result that support it."
      },
      {
        "title": "Do the work carefully",
        "body": "Include counterevidence and operational constraints. A reviewer should be able to find the weakest assumption quickly. Label real research, fictional practice material, AI-generated drafts, and your own judgement separately. An attractive diagram cannot compensate for unverifiable claims."
      },
      {
        "title": "Turn it into a decision",
        "body": "Publish your final project article as a decision narrative. Explain the bet, method, result or current limitation, and what you stopped or changed. Link your safe public artifact and PMcademy. Add all three article URLs to the capstone pack; saving them locally is not itself a review submission."
      }
    ],
    "example": {
      "title": "Worked example: inspect the claim",
      "body": "A concise pack recommends delaying a forecasting feature because observed workarounds point to unreliable categorisation. It links source IDs, explains a conflicting interview, and proposes a small check with an owner and date."
    },
    "prompt": "Review [discovery pack] as a sceptical PM. Trace every major claim to a source, identify missing counterevidence and unsupported certainty, and assess whether the recommendation follows. Do not fill evidence gaps with invented research. Ask for missing inputs before starting. Clearly label any hypothetical example.",
    "verify": [
      "Open the source behind each important claim and compare the wording.",
      "Check the population, time window and unit of analysis before accepting a count.",
      "Record one AI suggestion you rejected and the evidence that changed your mind."
    ],
    "hint": "Start with one concrete event from your project. A concise pack recommends delaying a forecasting feature because observed workarounds point to unreliable categorisation. It links source IDs, explains a conflicting interview, and proposes a small check with an owner and date.",
    "practice": "Create a one-page artifact for this method: build a chain another person can inspect. Include your evidence, the most important uncertainty, and a next check that could change the decision.",
    "visual": {
      "kind": "document",
      "title": "Build a chain another person can inspect",
      "nodes": [
        {
          "label": "Recommendation",
          "detail": "Define the unit"
        },
        {
          "label": "Evidence",
          "detail": "Keep source links"
        },
        {
          "label": "Counterevidence",
          "detail": "Inspect uncertainty"
        },
        {
          "label": "Next decision",
          "detail": "Choose a next check"
        }
      ],
      "caption": "A concise pack recommends delaying a forecasting feature because observed workarounds point to unreliable categorisation. It links source IDs, explains a conflicting interview, and proposes a small check with an owner and date."
    },
    "reading": [
      {
        "label": "GOV.UK: planning user research",
        "url": "https://www.gov.uk/service-manual/user-research/plan-user-research-for-your-service"
      },
      {
        "label": "GOV.UK: analysing a research session",
        "url": "https://www.gov.uk/service-manual/user-research/analyse-a-research-session"
      }
    ],
    "article": {
      "number": 3,
      "title": "The bet I tested, and what I stopped building",
      "brief": "Publish the final discovery story: context, method, evidence, decision, limitations and next step. Label simulated material honestly and include a link to pmcademy.com. Link pmcademy.com as the course context. Remove private details and respect the publishing community’s rules.",
      "artifact": "Your public discovery summary and all three article URLs"
    }
  }
};
