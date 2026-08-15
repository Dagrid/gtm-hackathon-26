# Agent Working Agreement

## Purpose

This is the canonical collaboration policy for every automated agent working in
this repository, regardless of model, provider, or tool. Read it before starting
work.

This project is a short GTM hackathon. Optimize for speed, clarity, traceability,
and preservation of work. Do not add `AGENTS.override.md`, nested instruction
files, or custom agent configurations unless a human explicitly requests them.

## Authority and roles

- The task given directly by a human defines the agent's role, scope,
  deliverable, and deadline.
- System safety, security, and permission requirements always apply.
- Do not self-assign adjacent work, expand the task, or coordinate other agents
  unless the human asks.
- An agent is the **Coordinator** only when a human explicitly assigns that role.
  Every other agent is a **Contributor**.
- If the human's task conflicts with this collaboration policy, surface the
  conflict instead of silently choosing an interpretation.

## Contributor rules

- Work only on the assigned deliverable or document section.
- Read the relevant repository material before drafting or changing content.
- Treat source inputs as read-only unless the task explicitly asks for changes.
- If no target file is specified, create a clearly named, task-specific file
  instead of rewriting a shared or final synthesis document.
- Do not delete, rename, move, or substantially rewrite another contributor's
  work unless the task explicitly requires it.
- If another agent appears to be working on the same file or scope, stop and
  notify the human or Coordinator before continuing.
- Shared summaries and final synthesis documents are owned by the Coordinator
  unless a human explicitly assigns them to someone else.
- Complete the handoff checklist before declaring the task finished.

## Coordinator rules

The Coordinator protects the integrity of the overall project. The Coordinator
must:

- Use the assignment list provided by the human as the source of truth; do not
  invent or redistribute assignments without permission.
- Synchronize regularly and inspect new commits and files as they arrive.
- Account for every assigned deliverable and flag anything missing, duplicated,
  contradictory, or blocked.
- Resolve overlaps and integrate temporary handoff branches when necessary.
- Consolidate work into shared or final documents without silently discarding a
  contributor's unique findings, sources, assumptions, or open questions.
- Reconcile terminology, audience definitions, positioning, metrics, timelines,
  and recommendations across deliverables.
- Perform a final repository-wide check before reporting completion.

## Git workflow

All agents may commit and push directly to `main`. Permanent task branches and
pull requests are not required.

Before starting work:

1. Confirm the working tree does not contain unrelated local changes.
2. Synchronize with `origin/main` using a fast-forward-only pull.
3. Inspect the latest files and commit history for relevant changes.

When finishing work:

1. Review only the files within the assigned scope.
2. Create one clear commit for the completed deliverable.
3. Rebase on the latest `origin/main`.
4. Push to `origin/main`.
5. Report the pushed commit hash in the handoff.

Additional Git rules:

- Never force-push, rewrite published history, or discard another agent's work.
- Never use destructive cleanup or reset commands to solve a synchronization
  problem.
- A rejected push is a synchronization signal, not permission to overwrite the
  remote branch.
- If the rebase is clean, finish it and push normally.
- If a conflict touches another agent's content, abort the rebase, preserve the
  completed commit on a uniquely named `handoff/<task>` branch, push that branch,
  and notify the Coordinator. The Coordinator owns integration of that branch.
- Never commit credentials, tokens, private keys, `.env` files, or sensitive
  customer information.

## GTM content quality

- Ground the deliverable in the existing brief, repository sources, and the
  human's task.
- Clearly distinguish verified facts, assumptions, and recommendations.
- Never invent metrics, research findings, customer evidence, quotations,
  competitors, URLs, citations, or outcomes.
- Link to sources for externally verified claims. Prefer current, authoritative
  sources for time-sensitive information.
- State uncertainty, missing evidence, and important dependencies explicitly.
- Keep product names, target segments, personas, positioning, pricing, funnel
  stages, success metrics, and dates consistent with established project usage.
- Marketing copy may be creative, but it must not present invented evidence as
  fact.
- Prefer concise, decision-ready, actionable writing over generic background or
  filler.

## Approvals and external actions

- Installing dependencies already declared in a committed manifest or lockfile
  is allowed.
- Adding, removing, or upgrading a dependency requires human approval.
- Publishing content, sending messages or email, contacting prospects, changing
  external systems, connecting accounts, deploying, purchasing, or spending
  money requires explicit human approval.
- Deleting material files or making other difficult-to-reverse changes requires
  explicit human approval.

## Required handoff

Every agent must report:

- The assigned task and what was completed.
- Files created or changed.
- Important sources used.
- Assumptions, unresolved questions, and risks.
- The commit hash and whether it was successfully pushed.

Do not create separate worklogs or coordination files unless a human or the
Coordinator explicitly requests them.
