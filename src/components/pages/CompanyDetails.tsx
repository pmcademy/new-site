import { company } from "@/lib/company";
export default function CompanyDetails() {
  return <aside className="company-details"><span className="eyebrow">The team behind PMcademy</span><p>Run by the team at <a href="https://theopenbootcamp.com" target="_blank" rel="noreferrer">{company.team}</a>.</p><dl><div><dt>Registered company</dt><dd>{company.legalName}</dd></div><div><dt>CIN</dt><dd>{company.cin}</dd></div><div><dt>Location</dt><dd>{company.location}</dd></div><div><dt>Primary contact</dt><dd><a href={`mailto:${company.email}`}>{company.email}</a></dd></div></dl></aside>;
}
