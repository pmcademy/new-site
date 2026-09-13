import type { Metadata } from "next";
import Link from "next/link";
import PageIntro from "@/components/pages/PageIntro";
import CompanyDetails from "@/components/pages/CompanyDetails";
import ContactComposer from "@/components/pages/ContactComposer";
export const metadata: Metadata = { title: "Contact PMcademy", description: "Contact the OpenBootcamp team at hello@pmcademy.com about learning, enrolment, support, or privacy." };
export default function ContactPage(){return <div className="shell page-wrap"><PageIntro eyebrow="A real conversation" title="Hello, curious mind." description="A course question, a problem with a page, or something you want to share? Write to hello@pmcademy.com. The OpenBootcamp team is behind PMcademy." art="community"/><div className="contact-layout"><ContactComposer/><div><CompanyDetails/><section className="contact-help"><h2>A useful first stop</h2><Link href="/roadmap">Find your next lesson ↗</Link><Link href="/community">Understand the paid offer ↗</Link><Link href="/refunds-and-cancellations">Read the enrolment policy ↗</Link><Link href="/privacy">Your information and choices ↗</Link><p>For a payment concern, include your order reference and enrolment email. For a conduct report, describe what happened and the relevant community channel.</p></section></div></div></div>;}
