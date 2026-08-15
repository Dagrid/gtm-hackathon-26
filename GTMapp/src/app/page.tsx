"use client";

import { FormEvent, useMemo, useState } from "react";

const defaultIcp = `Ireland-based businesses with 20+ employees and an in-house or hybrid engineering team.

Primary audience: Heads of Engineering, Engineering Managers, and CTOs with local authority over engineering tooling.

Primary trigger: a public need for AI-assisted development expertise, such as Copilot/Cursor rollout, AI coding workflow design, developer productivity, or AI tooling leadership.

Do not target: companies without an engineering team, companies under 20 people, teams governed by a central AI-adoption programme, or development teams mostly outsourced to agencies.`;

const defaultBrief = `Campaign objective: Start qualified conversations with engineering leaders who are assessing how to introduce AI-assisted development.

Offer: A focused engagement to help an engineering team choose, introduce, and embed AI-assisted development practices.

Desired action: Book a discovery conversation.

Known proof: The brief does not include validated customer outcomes, statistics, testimonials, or comparative claims.

Tone: Clear, candid, expert, and useful. Avoid hype.`;

type Handoff = {
  objective: string;
  gaps: string[];
  prompt: string;
  sourceOfTruth: string;
};

function createHandoff(icp: string, brief: string): Handoff {
  const lowerBrief = brief.toLowerCase();
  const hasProof = /case study|testimonial|customer|proof|result|statistic|%|percent/.test(lowerBrief) &&
    !/does not include|no validated|no proof/.test(lowerBrief);
  const hasCta = /book|demo|call|conversation|contact|sign up|register/.test(lowerBrief);
  const hasChannel = /email|linkedin|social|paid|search|event|webinar|landing page/.test(lowerBrief);
  const gaps = [
    !hasProof ? "No verified proof point is supplied. Do not create performance, savings, adoption, or customer-result claims." : null,
    !hasCta ? "The desired next action is not explicit. Confirm the CTA before producing final content." : null,
    !hasChannel ? "No channel mix is specified. The content agent should recommend formats before drafting channel-specific assets." : null,
  ].filter(Boolean) as string[];

  const objective = brief.match(/(?:campaign objective|objective)\s*:\s*([^\n.]+)/i)?.[1]?.trim() ||
    "Turn the approved GTM context into a focused campaign that earns a qualified next step.";
  const sourceOfTruth = `CAMPAIGN CONTENT HANDOFF

STATUS: Draft - human review required

1. CAMPAIGN OBJECTIVE
${objective}

2. ICP & QUALIFICATION
${icp.trim()}

3. CAMPAIGN BRIEF
${brief.trim()}

4. CLAIMS & EVIDENCE RULES
- Treat only statements explicitly supported in the ICP or campaign brief as supported.
- Do not invent customer results, statistics, testimonials, product capabilities, competitor comparisons, or guarantees.
- Label any new substantive claim as UNVERIFIED and present it as a question for review, not a factual assertion.
- Do not target stated disqualifiers.

5. REQUIRED CONTENT-AGENT OUTPUT
A. One-sentence master message tied to the ICP, problem, and desired action.
B. Three distinct messaging angles (problem-led, outcome-led, and practical/expert-led).
C. A channel-aware asset plan, including audience, objective, message, CTA, and proof requirement for every asset.
D. Draft copy only after the user selects an angle and channel mix.
E. A QA table: strategic alignment, evidence status, clarity, CTA, and risks.

6. OPEN QUESTIONS / HUMAN REVIEW
${gaps.length ? gaps.map((gap, index) => `${index + 1}. ${gap}`).join("\n") : "No automatic gaps detected. Confirm all claims and approval criteria before production."}

7. APPROVAL STATE
All proposed content is DRAFT. A human must approve the campaign direction and individual assets before anything is production-ready.`;
  const prompt = `You are the GiveAGO Campaign Content Agent. Use the Campaign Content Handoff below as your single source of truth.

Start by confirming the ICP, objective, constraints, and evidence rules. Identify any material gaps. Then propose exactly three differentiated messaging angles, recommend one, and wait for human selection before generating content. For any approved direction, create channel-native drafts - never mechanically resize one asset into another. Preserve approved content unless a revision request explicitly changes it.

Every substantive claim must be supported by the handoff. If it is not, omit it, qualify it, or label it UNVERIFIED for review. Never self-approve campaign work.

${sourceOfTruth}`;
  return { objective, gaps, prompt, sourceOfTruth };
}

export default function Home() {
  const [icp, setIcp] = useState(defaultIcp);
  const [brief, setBrief] = useState(defaultBrief);
  const [handoff, setHandoff] = useState<Handoff | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [copied, setCopied] = useState<"handoff" | "prompt" | null>(null);

  const readiness = useMemo(() => {
    const score = [icp.length > 120, brief.length > 120, /objective/i.test(brief), /offer|solution/i.test(brief)].filter(Boolean).length;
    return Math.round((score / 4) * 100);
  }, [icp, brief]);

  function generate(event: FormEvent) {
    event.preventDefault();
    setIsBuilding(true);
    window.setTimeout(() => {
      setHandoff(createHandoff(icp, brief));
      setIsBuilding(false);
    }, 520);
  }

  async function copy(value: string, type: "handoff" | "prompt") {
    await navigator.clipboard.writeText(value);
    setCopied(type);
    window.setTimeout(() => setCopied(null), 1800);
  }

  return (
    <main className="shell">
      <nav className="topbar" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="GiveAGO home"><span className="brand-mark">g</span><span>giveago</span></a>
        <div className="nav-meta"><span className="live-dot" /> Campaign intelligence <span className="divider" /> v0.1</div>
      </nav>

      <section className="hero" id="top">
        <div>
          <p className="eyebrow">Campaign foundation agent</p>
          <h1>Turn strategy into a brief<br /><em>content can trust.</em></h1>
          <p className="hero-copy">GiveAGO takes your ICP and campaign brief, finds the strategic guardrails, and hands a content agent one coherent source of truth.</p>
        </div>
        <div className="hero-proof">
          <div className="proof-icon">↗</div>
          <p><strong>Strategy first.</strong><br />Content comes after a human-approved direction.</p>
        </div>
      </section>

      <section className="workflow-bar" aria-label="Workflow">
        <span className="active-step"><b>01</b> Input</span><i />
        <span><b>02</b> Campaign source of truth</span><i />
        <span><b>03</b> Content-agent handoff</span>
      </section>

      <form className="workspace" onSubmit={generate}>
        <section className="intake-panel">
          <div className="section-heading">
            <div><p className="eyebrow">Your inputs</p><h2>Set the foundation</h2></div>
            <div className="readiness"><span>{readiness}%</span> ready</div>
          </div>
          <label htmlFor="icp">Ideal customer profile <span>Required</span></label>
          <p className="field-help">Who is in scope, who is not, and what makes the timing relevant?</p>
          <textarea id="icp" value={icp} onChange={(event) => setIcp(event.target.value)} rows={11} />
          <label htmlFor="brief">Campaign brief <span>Required</span></label>
          <p className="field-help">Objective, offer, desired action, proof, tone, constraints, and intended channels.</p>
          <textarea id="brief" value={brief} onChange={(event) => setBrief(event.target.value)} rows={11} />
          <div className="intake-footer">
            <p><span className="shield">✓</span> Unsupported claims will be flagged for review.</p>
            <button className="primary-button" type="submit" disabled={isBuilding || !icp.trim() || !brief.trim()}>{isBuilding ? "Building handoff…" : "Build campaign handoff"} <span>→</span></button>
          </div>
        </section>

        <aside className="output-panel" aria-live="polite">
          {!handoff ? (
            <div className="empty-state">
              <div className="empty-orbit"><span>✦</span></div>
              <p className="eyebrow">Waiting for context</p>
              <h2>Your campaign intelligence will live here.</h2>
              <p>We’ll turn your inputs into a source of truth that another agent can use without losing the strategy behind it.</p>
              <div className="mini-list"><span>✓ ICP & exclusions</span><span>✓ Claim controls</span><span>✓ Message architecture</span><span>✓ Production prompt</span></div>
            </div>
          ) : (
            <div className="result-state">
              <div className="result-topline"><span className="status-pill"><i /> Draft · Review required</span><span className="generated">Generated now</span></div>
              <p className="eyebrow">Campaign source of truth</p>
              <h2>{handoff.objective}</h2>
              <div className="result-card">
                <p className="card-label">What the content agent receives</p>
                <ul><li>ICP, qualification signals, and exclusions</li><li>Campaign objective and source brief</li><li>Mandatory evidence and claim controls</li><li>Required angle, asset-plan, and QA workflow</li></ul>
              </div>
              <div className="risk-card">
                <p className="card-label">Human review needed</p>
                {handoff.gaps.length ? <ul>{handoff.gaps.map((gap) => <li key={gap}>{gap}</li>)}</ul> : <p>Confirm all final claims and approvals before any production work.</p>}
              </div>
              <div className="result-actions">
                <button type="button" className="secondary-button" onClick={() => copy(handoff.sourceOfTruth, "handoff")}>{copied === "handoff" ? "Copied" : "Copy handoff"}</button>
                <button type="button" className="primary-button compact" onClick={() => copy(handoff.prompt, "prompt")}>{copied === "prompt" ? "Copied" : "Copy agent prompt"} <span>↗</span></button>
              </div>
              <details><summary>Preview the handoff</summary><pre>{handoff.sourceOfTruth}</pre></details>
            </div>
          )}
        </aside>
      </form>

      <footer><span>GiveAGO / Campaign intelligence</span><span>Human judgement stays in the loop.</span></footer>
    </main>
  );
}
