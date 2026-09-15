import type { WorkspaceRecord } from './types';
export function toUsername(input: string) {
 return input.toLowerCase().replace(/@.*$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 24) || 'learner';
}
export function emptyRecord(name = 'Learner', username = 'learner'): WorkspaceRecord {
 return {version:1,profile:{displayName:name,username,visibility:'private',hidden:[],timeOverride:null,timezone:'UTC'},activity:[],caseStudies:[],projects:[],published:[],badges:[],referrals:[],manualUnlocks:[],notes:''};
}
