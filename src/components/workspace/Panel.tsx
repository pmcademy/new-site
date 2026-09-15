"use client";
import {useEffect,useId,useRef} from 'react';
export default function Panel({open,title,subtitle,onClose,children,wide}:{open:boolean;title:string;subtitle?:string;onClose:()=>void;children:React.ReactNode;wide?:boolean}) {
 const ref=useRef<HTMLDialogElement>(null),label=useId();
 useEffect(()=>{
  const dialog=ref.current;if(!dialog)return;
  if(open){const previous=document.activeElement as HTMLElement|null;dialog.showModal();const overflow=document.body.style.overflow;document.body.style.overflow='hidden';return()=>{dialog.close();document.body.style.overflow=overflow;previous?.focus();};}
 },[open]);
 return <dialog ref={ref} className={`ws-dialog${wide?' ws-dialog-wide':''}`} aria-labelledby={label} onCancel={onClose} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><div className="ws-dialog-content"><header className="ws-panel-head"><div><h2 id={label}>{title}</h2>{subtitle&&<p>{subtitle}</p>}</div><button onClick={onClose} className="icobtn" aria-label="Close dialog">×</button></header><div className="ws-panel-body">{open&&children}</div></div></dialog>;
}
