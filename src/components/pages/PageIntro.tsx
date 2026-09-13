import FieldArt, { type FieldKind } from "@/components/art/FieldArt";
export default function PageIntro({ eyebrow, title, description, art = "library" }: { eyebrow: string; title: string; description: string; art?: FieldKind }) {
  return <header className="page-intro"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{description}</p></div><FieldArt kind={art}/></header>;
}
