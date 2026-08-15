"use client";

import { useState } from "react";

const steps = ["Business brief", "Target audience", "Campaign strategy", "Campaign assets", "Launch & learn", "Optimise"];
const channels = [
  ["✉", "Email", "3-email sequence", "Included"],
  ["in", "LinkedIn", "5 sponsored posts", "Included"],
  ["◎", "Paid social", "5 visual concepts", "Later"],
  ["□", "Outdoor", "3 billboard ideas", "Later"],
];

function Next({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return <button className="primary" onClick={onClick}>{children} <span>→</span></button>;
}

export default function Home() {
  const [active, setActive] = useState(1);
  const [notice, setNotice] = useState("Draft workspace · mock data only");
  const open = (index: number) => { setActive(index); setNotice(`${steps[index]} opened · demo state updated locally`); };
  const next = () => open(Math.min(active + 1, steps.length - 1));

  return <main className="shell">
    <aside className="side">
      <div className="brand"><i>G</i>go-to-market<b>.</b></div>
      <button className="create" onClick={() => { open(0); setNotice("New campaign workspace created · mock data only"); }}>+ &nbsp;Create campaign</button>
      <nav><small>Campaign journey</small>{steps.map((step, index) => <button key={step} onClick={() => open(index)} className={active === index ? "active" : index < active ? "done" : ""}><em>{index < active ? "✓" : `0${index + 1}`}</em>{step}</button>)}</nav>
      <div className="team"><i>M</i><span><b>Marketing team</b><small>Demo workspace</small></span><strong>•••</strong></div>
    </aside>
    <section className="work">
      <header><div><p>Campaigns <span>/</span> AI-assisted development setup</p><small><i />{notice}</small></div><div className="profile"><i>RM</i> R. Moran</div></header>
      <div className="content">
        <section className="intro"><div><small>Campaign workspace</small><h1>Build one campaign,<br/><em>then make it smarter.</em></h1><p>Move from company context to a measurable email campaign. Each stage is a clickable UI mockup, ready for real integrations later.</p></div><div><label><i />Human review required</label><Next onClick={next}>Continue</Next></div></section>
        <div className="rail">{steps.map((step, index) => <button onClick={() => open(index)} key={step} className={active === index ? "current" : index < active ? "passed" : ""}><small>{index < active ? "✓" : `0${index + 1}`}</small><b>{step}</b></button>)}</div>
        {active === 0 && <Brief next={next} />}
        {active === 1 && <Audience next={next} />}
        {active === 2 && <Strategy next={next} />}
        {active === 3 && <Assets next={next} />}
        {active === 4 && <Launch next={next} />}
        {active === 5 && <Optimise />}
      </div>
    </section>
  </main>;
}

function Heading({ number, title, text }: { number: string; title: string; text: string }) { return <div className="heading"><small>{number}</small><h2>{title}</h2><p>{text}</p></div>; }
function Foot({ next, children }: { next: () => void; children: React.ReactNode }) { return <div className="foot"><p>{children}</p><Next onClick={next}>Continue</Next></div>; }

function Brief({ next }: { next: () => void }) { return <section className="panel split"><div><Heading number="01 · BUSINESS CONTEXT" title="Start with what the business knows." text="This becomes the campaign source of truth. Fields are sample content, not connected data."/><article className="upload"><i>↥</i><span><b>AI development setup — company brief</b><small>Mock upload · PDF · 2.4 MB</small></span><strong>✓</strong></article><div className="facts">{[["Objective","Book discovery calls"],["Offer","AI tooling rollout support"],["Primary market","Ireland"],["Campaign window","6 weeks"]].map(([a,b]) => <div key={a}><small>{a}</small><b>{b}</b></div>)}</div><Next onClick={next}>Define audience</Next></div><aside className="insight"><i>✦</i><p>AI will connect every future asset to the same objective, audience, proof, and CTA.</p><small>Evidence status</small><b>8 verified inputs</b></aside></section>; }

function Audience({ next }: { next: () => void }) { return <section className="panel"><Heading number="02 · TARGET AUDIENCE" title="Who should this campaign move?" text="Shape the audience before choosing the message. These are mock profiles based on the current ICP draft."/><div className="cards"><article className="persona selected"><div><i>CT</i><b>Recommended</b></div><h3>Engineering decision-makers</h3><p>CTO, Head of Engineering, and Engineering Manager at Ireland-based companies with local tooling authority.</p><span>Ireland</span><span>20+ employees</span><span>In-house engineering</span></article><article className="persona"><div><i>VP</i><b>Secondary</b></div><h3>Operational sponsor</h3><p>COO or senior operator looking for an accountable route to adopt AI development tools.</p><span>ROI-aware</span><span>Change-ready</span></article><article className="signal"><small>BUYING TRIGGER</small><h3>Hiring or public questions about AI-assisted development</h3><p>Sample trigger: roles or posts mentioning Copilot, Cursor, developer productivity, or AI tooling rollout.</p><b>Hypothesis · validate in outreach</b></article></div><Foot next={next}><b>3 audience signals selected</b> · location, job role, company fit, and buying trigger will be passed to planning.</Foot></section>; }

function Strategy({ next }: { next: () => void }) { return <section className="panel"><Heading number="03 · AI CAMPAIGN STRATEGY" title="Turn an audience into a focused plan." text="Mock recommendations show how strategy can connect targeting, message, channel, and evidence."/><div className="cards strategy"><article><small>CAMPAIGN SOURCE OF TRUTH</small><h3>Practical AI rollout, without guesswork.</h3><p>A concise record every future asset can trace back to.</p><dl><dt>Problem</dt><dd>Teams need help adopting AI development tools with confidence.</dd><dt>CTA</dt><dd>Book an AI rollout discovery call.</dd><dt>Claim control</dt><dd className="green">Verified · founder-provided brief</dd></dl></article><article className="dark"><small>RECOMMENDED CREATIVE TERRITORY</small><h3>Make AI development work for your team.</h3><p>Outcome-led, practical, and designed for engineering leaders who own the tooling decision.</p><b>◎ Channel flexible<br/>✦ Evidence-aware<br/>↗ Email-first</b></article><article className="mix"><small>SUGGESTED CAMPAIGN MIX</small>{channels.map(([icon,name,detail,status]) => <div key={name} className={status === "Included" ? "include" : ""}><i>{icon}</i><span><b>{name}</b><small>{detail}</small></span><em>{status}</em></div>)}</article></div><Foot next={next}><b>Recommendation:</b> start with email and LinkedIn, then expand once the message earns engagement.</Foot></section>; }

function Assets({ next }: { next: () => void }) { return <section className="panel"><Heading number="04 · CAMPAIGN ASSETS" title="Create channel-native work, ready for review." text="These asset cards are mock examples. Nothing can be published until a person approves it."/><div className="assets"><article className="email"><header>● ● ● &nbsp;&nbsp; EMAIL 01 · DRAFT</header><div><small>To: Ireland-based engineering leaders</small><h3>Is your AI tooling rollout actually helping your team?</h3><p>Give your engineering team a practical path from AI-tool curiosity to a workflow they can trust.</p><button>Explore your rollout plan</button><small>Mock copy · requires review</small></div></article><div className="assetlist">{[["01","Email sequence","3 emails · subject line variants · send-time test","Draft"],["02","LinkedIn posts","5 post concepts · 2 creative directions","In review"],["03","Visual direction","Supporting image prompts · no image generation yet","Draft"]].map(([num,name,desc,state]) => <article key={num}><i>{num}</i><span><b>{name}</b><small>{desc}</small></span><em>{state}</em></article>)}</div></div><Foot next={next}><b>Human approval gate:</b> approve, amend, or reject individual assets without regenerating the whole campaign.</Foot></section>; }

function Launch({ next }: { next: () => void }) { return <section className="panel"><Heading number="05 · LAUNCH & LEARN" title="Launch deliberately. Watch the right signals." text="Mock performance data gives the product a testable dashboard before an email provider is connected."/><div className="metrics"><article className="nextsend"><small>NEXT SEND</small><h3>Tuesday, 10:00</h3><p>Email 01 of 03 · 248 mock recipients</p><span><i /></span><small>Audience and assets approved in demo state</small></article>{[["Open rate","31.8%","+4.6% vs. baseline"],["Replies","12","4 discovery calls requested"],["Conversion","4.8%","Mock benchmark only"]].map(([name,value,detail]) => <article key={name}><small>{name}</small><h3>{value}</h3><b>{detail}</b><div className="chart">▁▃▂▅▄▇█</div></article>)}</div><Foot next={next}><b>Optimisation period:</b> 7 days after launch. The platform compares performance before making a recommendation.</Foot></section>; }

function Optimise() { return <section className="panel"><Heading number="06 · OPTIMISE" title="Keep what works. Test what doesn’t." text="A continuous loop helps the team decide what to scale, refine, or retire."/><div className="optimise"><article className="compare"><div><small>CAMPAIGN 01</small><h3>31.8% <em>open rate</em></h3><p>Baseline audience · original subject line</p></div><strong>→</strong><div className="up"><small>CAMPAIGN 02</small><h3>38.6% <em>open rate</em></h3><p>Refined segment · new send time</p></div></article><article className="decision"><i>↗</i><div><small>MOCK RECOMMENDATION</small><h3>Open rate increased.</h3><p>Scale the engineering-leader segment and test two new subject lines next.</p></div><b>Scale</b></article></div><div className="todo"><p><b>01 Keep</b> · Ireland-based engineering-leader segment</p><p><b>02 Test</b> · subject line and early-morning send time</p><p><b>03 Review</b> · reply quality and discovery-call conversion</p></div><div className="foot"><p><b>Next cycle:</b> results should inform audience, message, and timing — never silently overwrite approved strategy.</p><button className="primary" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Start next cycle →</button></div></section>; }
