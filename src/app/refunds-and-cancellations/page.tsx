import type { Metadata } from "next";
import PolicyPage from "@/components/pages/PolicyPage";
import { refundSections } from "@/lib/policies";
export const metadata: Metadata = { title: 'Refunds & cancellations', description: 'Please understand the enrolment policy before purchasing a paid service.' };
export default function Page() { return <PolicyPage title={'Refunds & cancellations'} description={'Please understand the enrolment policy before purchasing a paid service.'} sections={refundSections}/>; }
