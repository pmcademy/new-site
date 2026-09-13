import type { Metadata } from "next";
import PolicyPage from "@/components/pages/PolicyPage";
import { termsSections } from "@/lib/policies";
export const metadata: Metadata = { title: 'Terms of use', description: 'Clear expectations for learning, enrolment, and a respectful community.' };
export default function Page() { return <PolicyPage title={'Terms of use'} description={'Clear expectations for learning, enrolment, and a respectful community.'} sections={termsSections}/>; }
