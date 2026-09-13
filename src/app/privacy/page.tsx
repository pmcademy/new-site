import type { Metadata } from "next";
import PolicyPage from "@/components/pages/PolicyPage";
import { privacySections } from "@/lib/policies";
export const metadata: Metadata = { title: 'Privacy', description: 'How your information supports your learning, and the choices you have.' };
export default function Page() { return <PolicyPage title={'Privacy'} description={'How your information supports your learning, and the choices you have.'} sections={privacySections}/>; }
