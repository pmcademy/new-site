import Link from "next/link";
import PageIntro from "./PageIntro";
import CompanyDetails from "./CompanyDetails";
import { company } from "@/lib/company";
export type PolicySection = { id: string; title: string; paragraphs: string[]; items?: string[] };
export default function PolicyPage({ title, description, sections }: { title: string; description: string; sections: PolicySection[] }) {
  return <div className="shell page-wrap"><PageIntro eyebrow="Our commitments" title={title} description={description} art="craft"/><p className="policy-date">Last updated {company.policyDate}</p><div className="policy-layout"><nav aria-label="On this page" className="policy-index"><span className="eyebrow">On this page</span>{sections.map((s,i)=><a key={s.id} href={`#${s.id}`}><span>{String(i+1).padStart(2,'0')}</span>{s.title}</a>)}</nav><article className="policy-copy">{sections.map((s,i)=><section key={s.id} id={s.id}><span className="eyebrow">{String(i+1).padStart(2,'0')}</span><h2>{s.title}</h2>{s.paragraphs.map(p=><p key={p}>{p}</p>)}{s.items && <ul>{s.items.map(item=><li key={item}>{item}</li>)}</ul>}</section>)}<CompanyDetails/><nav className="policy-related" aria-label="Related policies"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/refunds-and-cancellations">Refunds & cancellations</Link><Link href="/contact">Contact</Link></nav></article></div></div>;
}
