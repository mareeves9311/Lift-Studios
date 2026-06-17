# Lift Studio Future Agent Roadmap

## Purpose

Plan the next generation of Lift Studio agents for what happens after outreach works: calls, proposals, contracts, onboarding, delivery, billing, renewals, and client success.

Do not build all of these at once. Use this roadmap to decide which agent to create next as the business gets real client demand.

## Current Agent System

Lift currently has a complete outbound engine:

1. `orchestrator.md` - coordinates the system and routes work.
2. `new_business_auditor.md` - finds, audits, scores, and adds leads.
3. `email_marketer.md` - creates first-touch Gmail drafts.
4. `follow_up_pipeline_manager.md` - monitors replies, drafts follow-ups, handles bounces, and updates the pipeline.

Current gap:

Once a lead becomes warm or says yes, the system needs delivery, operations, finance, and retention support.

## Recommended Next Agents

### 1. Proof-of-Work Builder Agent

**Priority:** Build next.

**Purpose:**

Create custom, lightweight proof for warm leads who need to see what Lift would actually do for them.

**Owns:**

- 3-point mini-audits
- Before/after homepage copy samples
- Instagram bio/link-in-bio cleanup examples
- Content pillar samples
- Canva one-pagers
- Claude Design briefs for visual mockups
- Custom follow-up attachments

**Inputs:**

- Warm lead row from the master sheet
- Original audit notes
- Website/social links
- Category-specific offer angle
- Content bank assets
- Lift service menu

**Outputs:**

- Short written mini-audit
- Optional one-page PDF/Canva design brief
- Follow-up talking points
- Recommended next email draft for Email Marketer or Follow-Up Manager

**Works with:**

- Orchestrator routes warm leads here.
- Follow-Up Manager asks for proof assets when a lead wants specifics.
- Email Marketer uses proof assets in second-touch outreach.

**Build when:**

- At least 2-3 warm leads ask for examples or specific ideas.
- Megan wants to increase conversion from interested to booked call.

### 2. Discovery Call Prep Agent

**Priority:** Build once calls begin.

**Purpose:**

Prepare Megan for sales/discovery calls so every conversation feels sharp, specific, and easy to convert.

**Owns:**

- Pre-call brief
- Client context summary
- Business opportunity recap
- Suggested questions
- Suggested offer fit
- Objection prep
- Call agenda
- Post-call next-step draft

**Inputs:**

- Lead row
- Email thread
- Website/social audit
- Any proof-of-work asset
- Client's stated need

**Outputs:**

- 1-page call prep brief
- Suggested package
- Pricing talking points
- Follow-up email draft
- Proposal inputs

**Works with:**

- Follow-Up Manager when a call is requested.
- Proposal/Scope Agent after the call.

**Build when:**

- Discovery calls become a regular part of the flow.
- Megan wants call prep to be mostly automated.

### 3. Proposal & Scope Agent

**Priority:** Build before the first few serious paid proposals.

**Purpose:**

Turn a warm lead or discovery call into a clear, professional scope of work.

**Owns:**

- Proposal drafts
- Scope-of-work language
- Package recommendation
- Timeline
- Deliverables
- Assumptions
- Out-of-scope boundaries
- Revision limits
- Payment schedule language

**Inputs:**

- Discovery notes
- Recommended offer
- Service menu
- Pricing structure
- Client goals
- Any proof-of-work asset

**Outputs:**

- Proposal Google Doc
- Scope summary
- Client-facing email draft
- Internal fulfillment checklist

**Works with:**

- Discovery Call Prep Agent hands off call notes.
- Contracting Agent uses approved scope.
- Project Manager Agent uses accepted scope to create delivery tasks.

**Build when:**

- Megan needs consistent proposals and wants to avoid custom-writing every scope.

### 4. Contracting & Client Onboarding Agent

**Priority:** Build once proposals are accepted.

**Purpose:**

Move a yes into a clean client start.

**Owns:**

- Contract packet checklist
- Client onboarding email
- Intake form questions
- Asset request list
- Access request list
- Start-date confirmation
- Shared folder setup checklist
- Internal kickoff summary

**Inputs:**

- Accepted proposal/scope
- Client contact info
- Package selected
- Timeline
- Payment terms

**Outputs:**

- Contract-ready scope summary
- Onboarding email draft
- Intake form copy
- Asset/access checklist
- Client folder structure recommendation

**Works with:**

- Proposal & Scope Agent supplies accepted scope.
- Finance Agent supplies invoice/payment requirements.
- Client Project Manager Agent receives onboarding materials.

**Important note:**

This agent should not provide legal advice. It can prepare business terms and contract packet inputs, but Megan should use a reviewed template or professional legal support for actual contract language.

### 5. Finance & Billing Agent

**Priority:** Build before recurring work scales.

**Purpose:**

Track money, invoices, payment status, package revenue, and renewal timing.

**Owns:**

- Invoice checklist
- Payment tracking
- Retainer schedule
- Deposit/payment due reminders
- Revenue tracker
- Client profitability notes
- Renewal/upsell reminders
- Past-due follow-up drafts

**Inputs:**

- Accepted proposal
- Payment terms
- Invoice platform/export/manual invoice status
- Client sheet or finance tracker

**Outputs:**

- Billing tracker updates
- Invoice reminder drafts
- Monthly revenue summary
- Accounts receivable list
- Renewal reminder list

**Works with:**

- Contracting Agent before project start.
- Project Manager Agent to confirm work should start only after payment terms are met.
- Orchestrator for financial health summaries.

**Possible connectors/tools:**

- Google Sheets
- Gmail
- Stripe/Square/QuickBooks/PayPal if Lift adopts one
- Google Drive for invoice PDFs

**Important note:**

This agent tracks and drafts. Megan or an approved payment system sends invoices and handles final financial decisions.

### 6. Client Project Manager Agent

**Priority:** Build when there is more than one active client.

**Purpose:**

Own client delivery operations from kickoff to final delivery.

**Owns:**

- Client project plan
- Task tracker
- Due dates
- Asset/access status
- Internal milestones
- Client feedback tracking
- Delivery checklist
- Weekly client status draft

**Inputs:**

- Accepted scope
- Onboarding/intake responses
- Asset folder
- Client deadlines
- Package selected

**Outputs:**

- Delivery task list
- Weekly status update draft
- Client-facing check-in draft
- Internal blockers list
- Final delivery checklist

**Works with:**

- Contracting Agent after onboarding.
- Content Strategist Agent and Website/Brand Auditor Agent during fulfillment.
- Finance Agent to note payment-dependent milestones.

### 7. Content Strategist / Content Kit Builder Agent

**Priority:** Build once monthly content kits are being delivered.

**Purpose:**

Create the actual strategy and content system clients are paying for.

**Owns:**

- Content pillars
- Monthly content calendar
- Reel/short-form concepts
- Caption hooks
- UGC-style scripts
- Static post ideas
- Carousel outlines
- Local/seasonal content angles
- Client-specific content bank

**Inputs:**

- Client intake
- Website/social audit
- Offer/package
- Brand voice notes
- Client services/products
- Seasonal/local context

**Outputs:**

- Monthly content kit
- Caption/hook bank
- Short-form script bank
- Posting guidance
- Content priorities for the next month

**Works with:**

- Client Project Manager Agent for deadlines.
- Brand/Website Optimizer Agent for consistency across site and social.
- QA Agent before client delivery.

### 8. Brand & Website Optimizer Agent

**Priority:** Build when clients buy audit, refresh, or brand direction work.

**Purpose:**

Turn audits into concrete website and brand recommendations.

**Owns:**

- Homepage messaging recommendations
- Service page copy direction
- CTA improvements
- Trust signal placement
- Bio/about copy direction
- Offer positioning
- Light brand voice and visual consistency notes

**Inputs:**

- Client website
- Intake responses
- Audit notes
- Competitor examples
- Client goals

**Outputs:**

- Website improvement brief
- Homepage copy draft
- Service page recommendation
- CTA and booking path recommendations
- Trust proof placement recommendations

**Works with:**

- Content Strategist Agent for consistent messaging.
- Proof-of-Work Builder for before/after samples.
- QA Agent before delivery.

### 9. Client QA & Delivery Agent

**Priority:** Build once deliverables become repeatable.

**Purpose:**

Review client-facing work before Megan sends it.

**Owns:**

- Deliverable QA
- Brand consistency review
- Spelling/grammar scan
- Link check
- Scope check
- Client usefulness check
- Final delivery note draft

**Inputs:**

- Proposal/scope
- Deliverables
- Client notes
- Brand/site links

**Outputs:**

- QA checklist
- Required fixes
- Final client-ready summary
- Delivery email draft

**Works with:**

- Content Strategist Agent
- Brand/Website Optimizer Agent
- Client Project Manager Agent

### 10. Client Success & Renewal Agent

**Priority:** Build after the first recurring clients.

**Purpose:**

Keep clients happy, surface wins, and support renewals/upsells.

**Owns:**

- Monthly recap drafts
- Win tracking
- Before/after summaries
- Renewal reminders
- Upsell opportunities
- Testimonial request drafts
- Referral ask drafts

**Inputs:**

- Delivered work
- Client feedback
- Metrics if available
- Monthly status notes
- Payment/contract dates

**Outputs:**

- Monthly recap
- Renewal email draft
- Testimonial request
- Upsell recommendation
- Case study inputs

**Works with:**

- Finance Agent for renewal/payment timing.
- Project Manager Agent for delivery status.
- Orchestrator for client health.

## Future Full-System Flow

1. **Prospect**
   - New Business Auditor finds and audits leads.

2. **Outreach**
   - Email Marketer creates drafts.
   - Megan reviews and sends.

3. **Follow-Up**
   - Follow-Up Manager tracks replies and drafts next steps.

4. **Proof**
   - Proof-of-Work Builder creates mini-audit/sample when needed.

5. **Call**
   - Discovery Call Prep Agent prepares Megan.

6. **Proposal**
   - Proposal & Scope Agent drafts scope and package.

7. **Close**
   - Contracting & Onboarding Agent prepares client start.
   - Finance & Billing Agent tracks payment requirements.

8. **Deliver**
   - Client Project Manager coordinates work.
   - Content Strategist and Brand/Website Optimizer create deliverables.
   - QA Agent reviews before delivery.

9. **Retain**
   - Client Success & Renewal Agent creates recaps, renewal prompts, testimonials, and upsell ideas.

10. **Orchestrate**
   - Orchestrator monitors the full system and routes work to the right agent.

## Recommended Build Order

Build agents only when the business stage needs them.

1. **Proof-of-Work Builder Agent**
   - Highest next need because warm leads often need specifics before they book.

2. **Discovery Call Prep Agent**
   - Needed once replies turn into calls.

3. **Proposal & Scope Agent**
   - Needed before sending serious proposals.

4. **Contracting & Client Onboarding Agent**
   - Needed once proposals are accepted.

5. **Finance & Billing Agent**
   - Needed before recurring client work scales.

6. **Client Project Manager Agent**
   - Needed once there are multiple active clients.

7. **Content Strategist / Content Kit Builder Agent**
   - Needed once monthly content kits are being delivered.

8. **Brand & Website Optimizer Agent**
   - Needed when audits and website/brand direction become a core paid deliverable.

9. **Client QA & Delivery Agent**
   - Needed when deliverables are frequent enough that review needs a formal checklist.

10. **Client Success & Renewal Agent**
   - Needed once recurring clients and renewals exist.

## Near-Term Recommendation

Do not build all delivery agents now.

Next best build:

`proof_of_work_builder.md`

Why:

It bridges the current system to actual sales. Outreach can generate replies, but proof-of-work helps turn replies into calls and calls into paid projects.

Second best build:

`discovery_call_prep.md`

Why:

Once prospects are interested, Megan needs to show up prepared, confident, and specific without manually re-auditing every business from scratch.

## Agent Design Principles

Every future agent should include:

- Purpose
- Inputs
- Outputs
- Connectors/tools
- Responsibilities
- Handoff rules
- Quality checklist
- Human approval rules
- What it must never do

The system should optimize for:

- Automation without losing personal specificity
- Clean handoffs
- Strong client-facing quality
- No accidental sending or financial/legal commitments
- A clear record in the repo and sheet

