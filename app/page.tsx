"use client";
import { useMemo, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, ChevronRight, Clock3, Copy, ExternalLink, Fingerprint, Globe2, Link2, LoaderCircle, ShieldCheck, Sparkles, Waypoints, XCircle } from "lucide-react";

type Hop = { url: string; status: number | null; host: string };
type Report = { inputUrl: string; finalUrl: string; provider: {name:string;category:string;support:string}; redirects:Hop[]; redirectCount:number; elapsedMs:number; status:number|null };

export default function Home() {
  const [url,setUrl] = useState("");
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState("");
  const [report,setReport] = useState<Report|null>(null);
  const [history,setHistory] = useState<Report[]>([]);
  const [copied,setCopied] = useState(false);
  const valid = useMemo(()=>{try{const u=new URL(url.trim());return ["http:","https:"].includes(u.protocol)}catch{return false}},[url]);
  async function analyze(value=url) {
    setBusy(true); setError(""); setReport(null);
    try {
      const res=await fetch("/api/analyze",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url:value.trim()})});
      const data=await res.json(); if(!res.ok) throw new Error(data.error||"Could not inspect URL.");
      setReport(data); setHistory(old=>[data,...old.filter(x=>x.inputUrl!==data.inputUrl)].slice(0,5));
    } catch(e) {setError(e instanceof Error?e.message:"Something went wrong.");} finally {setBusy(false);}
  }
  async function copy(){if(!report)return;await navigator.clipboard.writeText(report.finalUrl);setCopied(true);setTimeout(()=>setCopied(false),1500);}
  return <main className="shell">
    <nav className="nav"><a className="brand" href="#"><span className="brand-mark"><Link2 size={19}/></span><span>linkpilot<span className="brand-dot">.</span></span></a><div className="nav-right"><span className="status-dot"/> INSPECTOR ONLINE <a className="github-link" href="https://github.com/surbhimeena19992001/LinkPilot" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13}/></a></div></nav>
    <section className="hero"><div className="eyebrow"><Sparkles size={13}/> THE SMART LINK WORKSPACE</div><h1>Every link has<br/><span>a destination.</span></h1><p className="hero-copy">Inspect redirects. Identify providers. Understand where a URL leads — with clarity and control.</p>
      <div className="analyzer-card"><div className="input-label"><span>PASTE A PUBLIC URL</span><span className="secure-label"><ShieldCheck size={13}/> SAFE INSPECTION</span></div><div className="input-row"><Globe2 size={18}/><input value={url} onChange={e=>setUrl(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!busy&&analyze()} placeholder="https://paste-your-link-here.com/..." aria-label="URL to inspect"/>{url&&<button className="clear-btn" onClick={()=>{setUrl("");setReport(null);setError("");}}><XCircle size={17}/></button>}<button className="analyze-btn" disabled={!valid||busy} onClick={()=>analyze()}>{busy?<><LoaderCircle className="spin" size={16}/> Inspecting</>:<>Analyze link <ChevronRight size={16}/></>}</button></div><div className="input-foot"><span>HTTP and HTTPS links only</span><span>Try <button onClick={()=>setUrl("https://bit.ly")}>bit.ly</button> or <button onClick={()=>setUrl("https://example.com")}>example.com</button></span></div>{error&&<div className="error-box"><XCircle size={16}/>{error}</div>}</div>
    </section>
    {busy&&<div className="loading-panel"><LoaderCircle className="spin" size={20}/> Following the public redirect trail…</div>}
    {report&&<section className="result-panel"><div className="result-heading"><div><div className="section-kicker">INSPECTION COMPLETE</div><h2>Link report</h2></div><span className="success-pill"><Check size={13}/> Checked</span></div>
      <div className="metrics"><div className="metric"><span>REDIRECTS</span><strong>{report.redirectCount}</strong><small>Public hops found</small></div><div className="metric"><span>RESPONSE</span><strong>{report.status??"—"}</strong><small>Last HTTP status</small></div><div className="metric"><span>ELAPSED</span><strong>{report.elapsedMs}<em>ms</em></strong><small>Inspection time</small></div></div>
      <div className="destination-card"><div className="destination-top"><span><Fingerprint size={15}/> FINAL DESTINATION</span><span>{new URL(report.finalUrl).hostname}</span></div><div className="destination-url">{report.finalUrl}</div><div className="destination-actions"><button onClick={copy}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?"Copied":"Copy URL"}</button><a href={report.finalUrl} target="_blank" rel="noreferrer">Open destination <ExternalLink size={13}/></a></div></div>
      <div className="report-grid"><div className="provider-card"><div className="card-kicker">PROVIDER DETECTION</div><div className="provider-name">{report.provider.name}</div><p>{report.provider.category}</p><span className="support-tag">{report.provider.support}</span></div><div className="trail-card"><div className="card-kicker">REDIRECT TRAIL</div><div className="trail-list">{report.redirects.map((hop,i)=><div className="trail-item" key={hop.url+i}><span className="trail-index">{i+1}</span><div className="trail-host">{hop.host}<small>{hop.status?"HTTP "+hop.status:"Destination"}</small></div>{i<report.redirects.length-1&&<ArrowDown size={13}/>}</div>)}</div></div></div><p className="report-note"><ShieldCheck size={14}/> Inspection only. LinkPilot does not unlock paid content or defeat access controls.</p>
    </section>}
    <section className="features"><div className="feature"><span className="feature-icon"><Waypoints size={18}/></span><h3>Redirect clarity</h3><p>See the public redirect path instead of guessing where a link goes.</p></div><div className="feature"><span className="feature-icon"><Fingerprint size={18}/></span><h3>Provider intelligence</h3><p>Recognize supported services through a modular provider registry.</p></div><div className="feature"><span className="feature-icon"><ShieldCheck size={18}/></span><h3>Safety first</h3><p>Private-network protections and bounded requests help keep inspection safe.</p></div></section>
    {history.length>0&&<section className="history"><div className="history-title"><Clock3 size={15}/> RECENT INSPECTIONS <span>THIS SESSION</span></div>{history.map((item,i)=><button className="history-item" key={item.inputUrl+i} onClick={()=>{setUrl(item.inputUrl);setReport(item);}}><span>{new URL(item.inputUrl).hostname}</span><small>{item.redirectCount} redirects</small><ChevronRight size={15}/></button>)}</section>}
    <footer><a className="brand footer-brand" href="#"><span className="brand-mark"><Link2 size={16}/></span><span>linkpilot<span className="brand-dot">.</span></span></a><span>LINKS, WITH A CLEARER VIEW.</span><span>© {new Date().getFullYear()} LINKPILOT</span></footer>
  </main>;
}