export class WorkspaceInputError extends Error {}
export function textValue(value: unknown, max: number, required = false): string {
 if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new WorkspaceInputError('Please check the text and try again.');
 return value.trim();
}
export function safeUrl(value: unknown): string {
 const raw = textValue(value, 2048, true);
 try { const url = new URL(raw); if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) throw new Error(); return url.href; }
 catch { throw new WorkspaceInputError('Use a complete http or https link.'); }
}
export function validTimezone(value: unknown): string {
 const zone = textValue(value, 80, true);
 try { new Intl.DateTimeFormat('en', {timeZone:zone}).format(); return zone; }
 catch { throw new WorkspaceInputError('Choose a valid timezone.'); }
}
export function zonedDay(date: Date, timezone = 'UTC') {
 const parts = new Intl.DateTimeFormat('en-US',{timeZone:timezone,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
 const get = (type: string) => parts.find(p=>p.type===type)?.value;
 return `${get('year')}-${get('month')}-${get('day')}`;
}
