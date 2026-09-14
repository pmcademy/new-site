import ResearchLab from "./ResearchLab";
import type { LessonEnrichment } from "@/lib/course/enrichment/level-one";
import LessonIllustration from "./LessonIllustration";
import ConceptLab from "./ConceptLab";
import { CopyPrompt } from "./LessonParts";

export function LessonDeepDive({ content }: { content: LessonEnrichment }) {
  return <div className="lesson-deep-dive"><span className="eyebrow">Work through it</span><p className="deep-intro">{content.intro}</p>
    <p className="deep-context">Use your chosen course project throughout. The additional examples below are fictional practice cases; transfer the method to your own evidence.</p>
    {content.teaching.map((part,i)=><div className="deep-step" key={part.title}><span className="deep-number" aria-hidden="true">0{i+1}</span><div><h3>{part.title}</h3><p>{part.body}</p></div></div>)}
    <LessonIllustration visual={content.visual}/>
    <aside className="deep-example"><span className="eyebrow">Worked example</span><h3>{content.example.title}</h3><p>{content.example.body}</p></aside>
    {content.researchLab && <ResearchLab kind={content.researchLab}/>}
    {content.lab && <ConceptLab key={content.lab} kind={content.lab}/>}
  </div>;
}
export function LessonAILab({ content }: { content: LessonEnrichment }) {
  return <div className="lesson-ai-lab"><h3>Your AI workbench</h3><p>Start with your own notes or clearly labelled practice data. Remove private details before sharing. Replace the placeholders, run the prompt in your chosen AI tool, and keep the output beside its source.</p><CopyPrompt text={content.prompt}/>
    <h4>Before you use the output</h4><ul>{content.verify.map(v=><li key={v}>{v}</li>)}</ul>
    <details><summary>Stuck? Try this next</summary><p>{content.hint}</p></details>
    <p className="deep-context">Keep a brief AI log: input used, useful output, what you checked, and what you rejected. The decision remains yours.</p>
  </div>;
}
