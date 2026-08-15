# Campaign Asset Builder - MVP Continuation Spec

## Status

Working product specification, distilled from the user-provided continuation of the GiveAGO conversation on 15 August 2026. It extends the current campaign-foundation flow in `GTMapp`; it does not replace the existing ICP, GTM strategy, or approved campaign inputs.

## Product decision

Build the **Campaign Asset Builder** as an application capability, not as a separate agent a colleague must install or operate directly.

It receives an approved campaign handoff and turns it into a coherent, reviewable multi-channel asset pack. A user interacts with the application; the application owns the prompt, structured contract, QA, and approval state.

```text
GTM brief + GTM strategy + campaign input pack
                    |
                    v
           Campaign Asset Builder
                    |
                    v
        AI QA -> Human review -> Ready to publish
```

Publishing is deliberately out of scope for the first demo. It may later receive only assets explicitly approved for publishing.

## Relationship to the current application

The current app produces a Campaign Source of Truth / content-agent handoff from ICP and campaign brief inputs. The Campaign Asset Builder is the next stage:

```text
Company -> ICP -> GTM brief -> GTM strategy
  -> Campaign foundation handoff -> Campaign Asset Builder
  -> Campaign concept -> Multi-channel assets -> AI QA
  -> Human approval -> Ready to publish -> Performance / optimisation
```

The builder must use the approved handoff as its source of truth. It must not independently re-decide the ICP, fabricate strategy, or use claims unsupported by the supplied inputs.

## Demo fixture

Use [Forge Labs](Forge%20Labs) as the known-good demo input pack. It supplies the campaign, brand, messaging, visual direction, and approved-fact sections required for a controlled prototype.

The first demo should create 8-12 assets, rather than attempt a full agency workflow:

| Channel / format | Initial count |
| --- | ---: |
| Billboard | 1 concept |
| Digital billboard | 2 variants |
| LinkedIn | 2 ads or posts |
| Display | 2 variants |
| Podcast | 1 x 30-second script |
| Email | 1 email |
| Social visual | 1-2 concepts |

The exact mix must be configurable from the campaign input; this is the Forge Labs demo default, not a universal requirement.

## Builder contract

Conceptual application call:

```ts
generateCampaignAssets({
  gtmBrief,
  gtmStrategy,
  campaignHandoff,
  campaignInput,
  requestedChannels,
})
```

Required inputs:

- GTM brief and GTM strategy
- Campaign Source of Truth / approved handoff
- Company, offer, audience, objective, CTA, required channels, and constraints
- Brand guidelines and supplied logos or assets, when available
- Approved proof points and prohibited or unverified claims

Optional inputs:

- Existing campaign assets, competitor examples, geography, budget, dates, visual references, compliance requirements, and performance context

If a required input is absent or ambiguous, the builder must flag the gap. It may recommend a safe next step but must not invent the missing information.

### Structured output

The application must request and retain structured data internally rather than parse a prose response. This is the minimum logical shape (the implementation may refine field names):

```json
{
  "campaign": {
    "name": "Build What's Next",
    "concept": "Stop hiring for AI.",
    "creative_direction": "Premium, technical, confident."
  },
  "assets": [
    {
      "id": "asset_001",
      "channel": "out_of_home",
      "format": "digital_billboard",
      "headline": "STOP HIRING FOR AI.",
      "body": "",
      "cta": "Book a discovery call",
      "visual_brief": "",
      "claims": [],
      "qa": [],
      "qa_status": "PASS",
      "approval_status": "PENDING_HUMAN_REVIEW"
    }
  ]
}
```

Each asset must remain traceable to its audience, message, evidence/proof, campaign concept, channel, and approval decision.

## Builder workflow

1. Validate the supplied source of truth, brand constraints, claims, selected channels, and any missing information.
2. Produce a campaign concept and a concise creative direction. Show the concept before producing the full asset pack when the user has not selected one.
3. Plan the requested assets by channel, format, audience, message, CTA, visual requirements, and production constraints.
4. Generate channel-native copy and visual directions. Do not mechanically resize one message across different media.
5. Run AI QA on every asset.
6. Present the asset board and the per-asset reasoning.
7. Allow a human to edit, regenerate, reject, or approve each asset. Preserve approved content unless a requested revision changes it.
8. Mark only reviewed and accepted assets as ready to publish. Do not connect to publishing in the MVP.

## Approval state machine

```text
GENERATED -> AI_QA -> PENDING_HUMAN_REVIEW
                               |       |       |
                             EDIT  REGENERATE APPROVE
                               |       |       |
                               +-------+       v
                                   |     APPROVED_FOR_PUBLISH
                                   v
                         PENDING_HUMAN_REVIEW
```

`APPROVED_FOR_PUBLISH` is an explicit human decision. The model cannot approve its own work, and a later publishing capability must filter out every other state.

## QA and evidence rules

Every asset must show:

| Check | Question |
| --- | --- |
| Strategic alignment | Is this for the correct ICP, buying trigger, and objective? |
| Message and offer | Does it communicate the approved positioning and specified offer? |
| Evidence | Is each substantive claim supported by supplied evidence? |
| Brand | Does it respect the supplied tone, terms, and visual guidance? |
| Channel fit | Does the copy and visual direction suit the medium? |
| Campaign coherence | Does it feel like the same campaign as every other asset? |
| CTA | Is the requested next action clear and appropriate? |

Use `PASS`, `WARN`, and `FAIL` at the check level. An asset with a material `FAIL` is not production-ready.

Claim handling:

- **Verified:** supplied as an approved company fact or evidence.
- **Supported:** a careful, qualified inference from the supplied strategy; label it for review when material.
- **Unverified:** do not express it as fact. Omit, qualify, or ask for evidence.
- **Prohibited:** never use it.

For example, a brief assertion that an offer may reduce risk must not become a numerical cost-saving claim without evidence.

## Suggested four-screen demo

1. **Campaign:** show available GTM strategy, campaign brief, brand input, and a `Generate campaign` action.
2. **Campaign concept:** show the selected idea and creative direction, then request generation of the configured asset set.
3. **Asset board:** show channel cards, draft visual/copy previews, and prominent QA status.
4. **Asset review:** show one asset’s copy, visual brief or preview, audience, trigger, strategy link, proof used, claim risk, QA table, and `Edit`, `Regenerate`, `Reject`, and `Approve` controls.

The central demo moment is the coherent campaign emerging from an existing GTM strategy - not an isolated AI-written social post.

## Validation plan before a broader system

Validate the workflow before building publishing integrations or a multi-agent architecture.

1. Run the Forge Labs fixture end-to-end and assess the asset pack as a human reviewer.
2. Run 10-20 varied GTM briefs across multiple B2B categories to test strategy and channel generalisation.
3. Run deliberately poor or unsafe briefs, including unsupported performance claims and overly broad audiences. The builder must flag them rather than generate misleading campaigns.
4. Test human edits. Record unchanged approvals, minor edits, major edits, rejections, and review time.
5. Test a single visual concept across OOH, DOOH, LinkedIn, and social formats for campaign consistency as well as individual image quality.
6. Recruit 5-10 relevant reviewers to compare a traditional brief-to-campaign workflow with the reviewed builder workflow.

Primary success metric: **time to approved campaign**.

Secondary measures: strategic alignment, message and offer alignment, evidence compliance, cross-channel consistency, quality of visual direction, edit rate, rejection rate, reviewer confidence, and willingness to use the product again.

Early validation threshold (a hypothesis, not a proven target): given a good brief and strategy, 70-80% of assets need only minor or no edits, while unsupported claims are reliably surfaced for review.

## Next implementation slice

Implement the new stage after the existing handoff flow, using Forge Labs as the fixture:

1. Persist or pass the structured handoff into the builder view.
2. Render a campaign-concept screen with one deliberate selection/approval step.
3. Use fixture data to render the initial asset board and asset-review panel.
4. Implement the local approval state machine and QA presentation.
5. Replace fixture generation with a structured model response only after the interaction is clear and the guardrails have tests.

This sequencing tests the valuable workflow - strategy to approved campaign - without prematurely adding external publishing or autonomous execution.
