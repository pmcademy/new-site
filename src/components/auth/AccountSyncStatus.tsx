'use client';
import {useState} from 'react';
import {retrySync,useStore} from '@/lib/progress';
export default function AccountSyncStatus(){const {syncError}=useStore();const [busy,setBusy]=useState(false);if(!syncError)return null;return <aside className="sync-status" role="status"><span>{syncError}</span><button disabled={busy} onClick={async()=>{setBusy(true);try{await retrySync();}finally{setBusy(false);}}}>{busy?'Retrying…':'Retry sync'}</button></aside>;}
