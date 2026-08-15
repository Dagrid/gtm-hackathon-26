---
name: workforce-x-prospecting
description: Identify and list qualified prospect accounts for Workforce X's regulated UK & Ireland outbound campaign - banking, financial services, insurance, and similarly regulated organisations with 100+ employees. Use whenever the user wants to build, expand, or qualify a Workforce X target account list, asks to "find prospects", "build a list", "qualify accounts" for Workforce X, or references the Workforce X ICP, Company Profile, or Outreach Brief. Produces a qualified account list only, not outreach copy - drafting messages is a separate step.
---

# Workforce X Prospecting

Identify and list qualified prospect accounts for Workforce X's regulated UK & Ireland outbound push. This produces a LIST, not messaging. Drafting outreach copy is a separate step, the Outreach Brief's tone, messaging themes, and CTA guidance apply there, not here. Mixing the two produces a list quietly padded toward "sounds right for the pitch" instead of "actually qualifies."

## Sources this skill is built from
- The Workforce X Company Profile: company-level ICP (sectors, size, buyer roles, core pain point).
- The Outreach Brief: campaign-level detail for this specific push (tightened account and buyer priorities, personalisation signals).

Where the two disagree, this skill treats the Outreach Brief as the operative target for THIS campaign, it's the newer, campaign-specific document, and records the broader Company Profile version alongside it rather than silently overwriting it. See Known ambiguities.

## Qualification criteria — an account qualifies only if ALL hold

1. **Local:** headquartered or clearly operating in the UK or Ireland.
2. **Regulated sector:** banking, financial services, insurance, or a similarly regulated sector. "Similarly regulated" needs a real anchor, not a vibe, look for an actual regulator or licensing regime the company sits under (FCA/PRA in the UK, Central Bank of Ireland, or an equivalent sector regulator), not just "feels compliance-heavy." A candidate that's regulated but doesn't fit banking/financial services/insurance cleanly (healthcare, energy, legal, public sector) gets flagged for the owner rather than decided silently, this is exactly the kind of boundary call a rule shouldn't make alone.
3. **Size:** 100+ employees. Neither source document gives an upper ceiling, treat the band as open-ended unless the owner sets one, and say so in the output rather than silently capping it.
4. **Operational complexity (confirming signal, not a separate hard filter):** multiple business units, back-office/compliance/claims/onboarding/reporting functions, regional or multi-site operations. Use this to break ties on a borderline size or sector call, not to disqualify an account that already clears 1-3.

## Exclusions (any one disqualifies)
- Not headquartered or operating in the UK or Ireland.
- Fewer than 100 employees.
- No credible regulatory anchor for a "similarly regulated" claim.
- Unverifiable company identity, can't confirm who actually operates under this name.

## Known ambiguities — flag in output, don't resolve silently

- **Professional services:** named explicitly in the Company Profile's sector list, absent from the Outreach Brief's list (which only says "similarly regulated sectors"). Treat a professional-services candidate as a manual-check case, not an automatic qualify or disqualify, until the owner confirms which document governs this campaign.
- **Buyer list:** the Outreach Brief's priority list (COO, CFO, CIO, CTO, Chief Digital Officer, Chief Transformation Officer, Heads of Transformation/Innovation/Operations) is narrower than the Company Profile's (which also includes CEO/MD and business-unit leaders). Record any decision-maker found regardless, but mark whether they sit on the Outreach Brief's priority list or only the broader Company Profile list, the campaign should prioritise the narrower list since it's the more recent, campaign-specific document.

## Sourcing

Primary: company search filtered by industry (banking/financial services/insurance and adjacent regulated categories), location (UK/Ireland), and employee count (100+). A database search surfaces candidates, it doesn't establish regulatory status on its own.

Cross-check regulatory status against the real anchor: the relevant regulator's public register (FCA in the UK, Central Bank of Ireland for Irish-regulated entities, or the applicable sector regulator for adjacent regulated categories). This is what makes the regulated-sector criterion verifiable rather than a guess from an industry code.

Supplement with industry-body membership lists where useful (banking and insurance trade associations in each market) for accounts that don't surface cleanly in a database search.

## Fields per account (CSV schema)

`account_id, company, sector, sector_basis, country, employee_count, employee_count_source, decision_maker, dm_role, dm_priority, dm_linkedin, personalisation_signal, personalisation_notes, source_url, qualification_flag, notes`

- **sector_basis:** the regulatory anchor supporting the sector claim (register name, licence type), not just a category label.
- **decision_maker / dm_role / dm_linkedin:** best-identified person, blank when none found. Blank is data, not failure, don't hold up the list for one missing contact.
- **dm_priority:** `outreach-brief` or `company-profile-only`, see Known ambiguities.
- **personalisation_signal:** which of the Outreach Brief's signals apply, pick from: transformation/digital-change-initiative, ai-automation-hiring, cost-efficiency-messaging-from-leadership, operational-scaling-pressure, governance-heavy-environment, back-office-process-complexity. A fixed set, not free text, so it stays usable for message personalisation later rather than just summarising the account. `personalisation_notes` carries the one-line evidence.
- **source_url:** where the qualifying facts (sector, employee count, decision-maker) were verified. Unverifiable stays blank, never guessed, a wrong claim in a list compounds into a wrong claim in an email.
- **qualification_flag:** `qualified`, `manual-check`, or `excluded`. Manual-check accounts (identity or sector unverifiable by the sourcing tools) go in a separate section of the same output, never silently dropped, never silently promoted to qualified.

## Process

1. Confirm the target count and deadline for this push however the owner specifies it, a brief, a direct instruction, or ask if genuinely not given. Don't invent a number.
2. If a CRM, contact list, or prior-outreach record for Workforce X is available, check it first: an account with prior contact still qualifies and still counts toward the target, prior contact is a data field, not a disqualifier, and checking first avoids listing an account as new when it's already known. If nothing like that is connected, proceed without it rather than blocking on infrastructure that may not exist for this account.
3. Search by sector, banking and financial services and insurance first, then flagged "similarly regulated" candidates, filtered by UK/Ireland and 100+ employees.
4. For each candidate: verify the sector via a regulatory anchor, verify employee count, identify the best-available decision-maker, capture personalisation signals, record sources. Add to the qualified list or the manual-check section, nothing gets dropped silently.
5. When the target is reached, or the qualifying pool is exhausted, report the count, note anything sitting in manual-check, and surface both known ambiguities above so the owner can resolve them if they'd change the count materially.
6. Stop here. Do not draft outreach messages from this list, that's the Outreach Brief's job, run as a separate step once the list is approved.

## Style and integrity

- Every qualifying claim (sector, size, regulatory status) needs a source. Unverifiable stays blank or goes to manual-check, never guessed.
- Observed facts and inferred or estimated ones (like an aggregator's employee count) stay labeled as such.
- Conflicting information about an account, two different employee counts, two possible decision-makers, gets recorded and flagged, not silently resolved by picking one.

## Example

A qualifying account: an Irish-headquartered insurance provider, 340 employees per its LinkedIn company page, regulated under the Central Bank of Ireland, with a recent LinkedIn post from its COO about a claims-processing modernisation programme. That post is the personalisation signal (operational-scaling-pressure plus a transformation/digital-change-initiative), the Central Bank register entry is the sector_basis, the LinkedIn page is the employee_count_source. Everything in that sentence traces to a source. That's the bar.
