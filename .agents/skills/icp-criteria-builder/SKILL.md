---
name: icp-criteria-builder
description: Build Ideal Customer Profile (ICP) criteria for a business - firmographic profile with an explicit floor and ceiling, disqualifiers, buying triggers split into one primary qualifying signal versus supporting context, likely buyer or decision-making unit, and an honestly stated confidence level. Use whenever the user wants to define, sharpen, or validate a target-customer profile, ICP, ECP, beachhead segment, or "who should we sell to" criteria, and especially when two or more sources need reconciling into one - a founder's hypothesis, a company's own stated target audience, a second stakeholder's version, or new market evidence.
---

# ICP Criteria Builder

An ICP is a filter, not a description. Its job is to make "yes, target this account" or "no, skip it" a fast, consistent call for whoever runs outbound. A profile that only describes an admired customer in prose fails that job. This skill produces one built to actually filter.

## Process

### 1. Gather what's already known
The offer, any existing hypothesis the user states directly, and any existing evidence: interviews, a company's own stated target audience, prior campaign results. Find facts yourself wherever they're findable (a company's site, a prior brief, existing project files) rather than asking the user to restate something you could look up.

### 2. Surface the open decisions before guessing at them
Don't fill gaps with invented specifics. Where a dimension below is genuinely undecided, put the open decisions to the user as a batch, each with a recommended answer, and wait for a real answer before treating it as settled. A guessed ICP dimension is worse than an explicitly flagged gap, it looks decided when it isn't.

### 3. Firmographic profile
Industry or category if relevant, geography, and whatever operational or technical signals actually predict fit for this specific offer (team structure, tech stack, decision-making authority, existing tooling, whatever is causally connected to needing what's being sold). For size and any other numeric band, state both a floor and a ceiling explicitly, or note that one end is intentionally open and say why. An unbounded top end quietly admits enterprise accounts into a beachhead built for smaller, faster-moving buyers. That's usually not a deliberate choice, it's a default nobody examined.

### 4. Disqualifiers
State who's explicitly out, and why, not just who's in. A profile that only says who qualifies leaves everyone else in a grey zone; a disqualifier list turns that grey zone into a fast no.

### 5. Buying triggers, split by strength
Name one primary, qualifying trigger: the single most specific, most directly detectable signal that this account is in-market right now. Then list supporting triggers separately: real signals, useful for messaging and for a qualification call, but not strong or specific enough to add an account to a target list on their own. Collapsing these into one flat list is the most common way an ICP quietly gets diluted, a broad "any of these eight things" bar admits almost everyone eventually.

### 6. Likely buyer / decision-making unit
At minimum: the champion (who wants this and will advocate internally) and the budget owner (who signs off). For a complex sale, add influencer, end user, and blocker roles. Mark this hypothesis or confirmed, same as everything else, don't let it read as more certain than it is.

### 7. Confidence level, stated honestly
LOW: no interviews or market signals, built from a hypothesis alone. MEDIUM: some real evidence, not yet consistent. HIGH: validated across enough real conversations that the pattern holds. State which one this is, and what it's based on. Never let a hypothesis read as validated just because it's written down cleanly.

### 8. Reconcile multiple sources by intersection, not averaging
When two sources disagree on a dimension, a founder's hypothesis against a company's own stated target audience, two stakeholders' versions, take the intersection: the more restrictive bound on each dimension, unless the user says otherwise. A higher floor beats a lower one. An explicit ceiling beats no ceiling. A narrower geography beats a broader one. A specific qualifying trigger beats a broad, loosely related list. A narrower buyer list beats a broader one.

Intersection is a default, not a law. It trades reach for precision, which is usually the safer starting point for a first list, but it is a real trade the user should see, not one buried in the merge. Always show it: a small table, dimension, source A, source B, resolved value, and the one-line reason each resolution went the way it did. If a resolution creates a real tension, for instance the intersection excludes a segment one of the sources actually treats as its best-fit customer, say so explicitly rather than letting the clean merge hide it.

### 9. Compile

```
# ICP: [name]

## Confidence
[LOW/MEDIUM/HIGH] - [what it's based on]

## Firmographic Profile
- Category/industry:
- Size: [floor]-[ceiling], or explicitly unbounded and why
- Geography:
- Other qualifying signals:

## Disqualifiers
- ...

## Buying Triggers
Primary (qualifying): ...
Supporting (context only, not sufficient alone): ...

## Likely Buyer / DMU
Champion:
Budget owner:
[other roles if complex sale]

## Anti-Persona Signals
- ...

## Reconciliation (only if built from 2+ sources)
| Dimension | Source A | Source B | Resolved | Reason |
|---|---|---|---|---|

## Known tensions
[Anything the resolution rule papered over that's worth a real decision later]
```

## Example

Reconciling a founder's own hypothesis (20+ employees, no size ceiling) against a company's stated target audience (50-1,000 employees) resolved to 50-1,000: the higher floor and the explicit ceiling were each individually more restrictive, so both carried over even though they came from different sources. Where the two sources disagreed on whether low-capacity, mostly-outsourced companies belonged in scope, the more restrictive answer (exclude them) won by the rule, but was flagged as a known tension since it was arguably cutting out the stronger-fit segment for one of the two businesses involved. That's the standard: apply the rule consistently, but never let it hide a real business tradeoff.