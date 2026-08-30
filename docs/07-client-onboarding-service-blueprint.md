# 07 - Client Onboarding & Service Blueprint

This is the operational blueprint for turning a signed EduCare Leads client into a clean build handoff.
It maps every service we offer to the client inputs, assets, access, approvals, and internal actions needed
to deliver without making onboarding feel heavy.

Source reference: `docs/educare-leads-service-menu-sales-guide.pdf`.

## Guiding Principle

Onboarding should feel like one simple client journey, not a long homework packet.

The client should experience:

1. A short welcome page that explains what happens next.
2. One smart intake form that only asks questions relevant to their package.
3. One shared asset folder for files.
4. Guided account-access cards with direct links and inline help.
5. A clear launch checklist showing what is complete, what is waiting on them, and what EduCare is building.

Do not ask for passwords. The client should invite `media@revupcmo.com` directly to each applicable account
with the requested admin, full-control, or manager role. Do not show package pricing, service fees, or invoice
details anywhere in the client-facing onboarding flow.

## Recommended Onboarding Flow

### Step 1 - Internal Deal Setup

Before sending anything to the client, the team should create an internal record with:

- Client name and legal entity
- Primary contact and role
- Package sold
- Add-ons sold
- Monthly service fee
- CRM platform plan
- Required ad spend
- Locations included
- Launch target date
- Priority programs or age groups
- Any promises made on the sales call
- Contract and invoice status

This step prevents the client form from doing sales discovery twice.

### Step 2 - Client Welcome Email

Send one email with:

- Link to onboarding form
- Link to shared asset upload folder
- Reminder that passwords should not be shared
- What access invites they should expect
- Target timeline after the form is completed
- A single reply-to contact for questions

Suggested copy:

> Welcome to EduCare Leads. The first step is to complete your onboarding form and upload your assets.
> Once we have your form, we will send secure access requests for the platforms needed for your build,
> then our team will prepare your enrollment system and confirm the launch plan.

### Step 3 - Smart Intake Form

Use a universal intake plus package-specific sections.

The form should show:

- Universal intake for every client
- Enrollment Growth module
- Website/Funnel module, if included
- Meta Ads module, if included
- Google Ads module, if included
- CRM/Automation module, if included
- Google Business/Reviews/SEO module, if included
- Creative/Branding/Proof module, if included
- AI Reception/Advanced Systems module, if included
- Multi-location module, if more than one location
- Fractional CMO module, if sold

The current `/onboarding` flow is package-aware. Use `/onboarding/create` to choose the services already sold
and generate a client link that only shows the relevant intake and access modules.

### Step 4 - Secure Access Requests

Inside the smart intake, show access instructions for only the systems needed. Let the client mark an invitation
as sent, say they do not have the account, or request help without blocking the rest of onboarding.

Common access types:

- Meta Business Suite access by direct email invitation
- Facebook Page access
- Instagram account access
- Meta ad account access
- Google Ads access
- Google Analytics access
- Google Tag Manager access
- Google Business Profile manager access
- Website CMS access
- Domain/DNS access
- CRM or childcare management system access
- Calendar access for tour booking
- Email/SMS sending approval

### Step 5 - Internal Build Brief

The form should generate an internal build brief with:

- Positioning summary
- Offer and enrollment priorities
- Asset links
- Access status
- Launch checklist
- Risks or missing items
- Package-specific build tasks

The existing onboarding API already generates a brand brief. Expand it into a full build brief with package-specific sections.

### Step 6 - Launch Readiness Review

Before campaigns go live, confirm:

- Contract signed
- First invoice paid
- Ad spend available
- Required assets received
- Required access received
- Landing page or lead form ready
- CRM pipeline ready
- SMS/email automations tested
- Tracking tested
- Calendar/tour routing tested
- Client approved campaign messaging

## Service Catalog & Onboarding Needs

### 1. Enrollment Growth Partnership

Primary offer: a complete enrollment growth system for childcare centers, daycares, preschools, Montessori schools, and early learning programs.

Includes:

- Meta ads management
- Campaign strategy
- Lead forms or landing pages
- CRM setup
- SMS/email follow-up automations
- Tour booking support
- CRO review
- Reporting and optimization

Client needs to provide:

- Business name, location, contact details
- Programs offered
- Capacity and open seats by age group
- Tuition or average enrollment value
- Hours, service area, languages
- Ideal family profile
- Main objections parents raise
- Current promotions or enrollment offers
- Current inquiry volume
- Current follow-up process
- Existing website, social links, and reviews
- Logo, photos, videos, testimonials, brochures, flyers

Access needed:

- Meta Business Manager
- Facebook Page
- Instagram account
- Meta ad account
- Domain or landing page access, if needed
- CRM access, if an existing CRM is involved
- Calendar access or booking link for tours

Internal setup:

- Enrollment math and 90-day target
- Campaign angle and offer
- Lead capture path
- CRM pipeline
- SMS/email follow-up
- Tour booking routing
- Weekly reporting format

### 2. Website and Funnel Services

Services:

- Full childcare website build
- Promotional website build with management package
- Landing page / enrollment funnel
- Website hosting
- Website updates and maintenance

Client needs to provide:

- Existing website URL
- Domain name and registrar
- Desired pages
- Programs and age groups
- Tuition or pricing notes
- Staff bios, if used
- Facility details
- Parent testimonials
- Licensing/accreditation notes
- Photos and videos
- Logo, colors, fonts, brand guidelines
- Competitor websites they like or dislike
- Required policies or compliance notes

Access needed:

- Domain/DNS access
- Current CMS access, if replacing or editing an existing site
- Hosting access, if not hosted by EduCare
- Google Analytics/GTM access, if tracking existing traffic
- Google Business Profile link, if website should connect local presence

Internal setup:

- Sitemap
- Page copy
- Offer and CTA structure
- Mobile-first lead flow
- Tracking plan
- SEO basics
- Launch checklist

### 3. Paid Ads Services

#### Meta Ads

Services:

- Meta ads management
- Seasonal campaign
- Creative testing and optimization

Client needs to provide:

- Facebook Page URL
- Instagram handle
- Meta Business Manager status
- Existing ad account ID, if any
- Past campaign screenshots or exports, if available
- Monthly ad budget
- Target programs and locations
- Parent offer
- Creative assets and testimonials
- Any restricted claims or words to avoid

Access needed:

- Meta Business Suite access by direct email invitation to `media@revupcmo.com`
- Page access
- Instagram access
- Ad account access
- Pixel/dataset access, if applicable

Internal setup:

- Campaign objective
- Geo targeting
- Program-specific ad angles
- Creative variants
- Lead form or landing page
- Tracking and reporting

#### Google Ads

Services:

- Google Ads account review
- Google Ads management
- Google conversion tracking setup

Client needs to provide:

- Google Ads customer ID
- Current monthly spend
- Target services and locations
- Existing conversion definitions
- Search terms or keyword history, if available
- Landing page URLs
- Phone tracking details

Access needed:

- Google Ads account access
- Google Analytics access
- Google Tag Manager access
- Website/landing page access for tags
- Call tracking platform access, if applicable

Internal setup:

- Account audit
- Conversion tracking audit
- Search term review
- Landing page alignment
- Budget and bidding plan
- Reporting view

### 4. CRM, Automations, and Follow-Up

Services:

- CRM platform plans
- CRM setup and pipeline
- SMS/email automation setup
- Full-cycle email marketing
- Standalone CRM setup
- Advanced automation buildout

Client needs to provide:

- Current CRM or childcare management system
- Existing lead sources
- Lead stages currently used
- Follow-up scripts
- Tour booking process
- Staff responsible for follow-up
- Phone number and texting capability
- Calendar availability
- Email sender details
- Parent nurture content, if any
- Past lead lists, if doing reactivation

Access needed:

- CRM access
- Calendar access or booking link
- Phone/SMS platform access or approval for new number
- Domain/email authentication access for sending, if needed
- Existing forms and website access

Internal setup:

- Pipeline stages
- Source tracking
- Age group tags
- New lead notification rules
- SMS/email templates
- Tour reminders
- Post-tour follow-up
- Lost lead nurture
- Reactivation workflow, if included

### 5. Conversion and CRO Services

Services:

- Full CRO review
- Standalone CRO audit
- Landing page optimization
- Call script and admissions follow-up review

Client needs to provide:

- Website or landing page URLs
- Current lead sources
- Current form flow
- Call scripts
- SMS and email scripts
- Inquiry-to-tour rate, if known
- Tour-to-enrollment rate, if known
- Common parent objections
- Past call recordings or notes, if available and approved

Access needed:

- Website analytics access
- Form or CRM access
- Call tracking access, if available
- Landing page/CMS access, if edits are included

Internal setup:

- Friction audit
- CTA audit
- Mobile review
- Form review
- Follow-up path review
- Recommended fixes
- Implementation list, if included

### 6. Google Business, Reviews, and Local SEO

Services:

- Google Business Profile optimization
- Review generation system
- Local SEO basics
- Reputation and testimonial system

Client needs to provide:

- Google Business Profile link
- Official business name, address, phone
- Business categories
- Hours
- Services and descriptions
- Photos
- Review link, if known
- Current review process
- Happy parent list or allowed review request process
- Local areas served

Access needed:

- Google Business Profile manager access
- Website access for local SEO pages, if included
- CRM/email/SMS access for review requests, if automated

Internal setup:

- GBP audit
- Description and services update
- Photo plan
- Review request workflow
- Local page plan
- Citation or local listing checklist, if included

### 7. Creative, Branding, and Proof Assets

Services:

- Monthly creative package
- Brand refresh
- Testimonial collection system
- Case study / proof asset package
- Photo/video shoot coordination

Client needs to provide:

- Logo files
- Brand colors
- Fonts
- Brand guidelines
- Photos and videos
- Existing ads
- Flyers, brochures, handbooks, and enrollment packets
- Parent testimonials
- Google/Facebook review links
- Permission status for using child images
- Proof points, outcomes, awards, accreditations

Access needed:

- Shared asset folder
- Canva/Figma/design file access, if applicable
- Review platforms, if collecting proof
- Social accounts, if creative is pulled from existing content

Internal setup:

- Creative inventory
- Missing asset list
- Brand direction
- Ad creative concepts
- Testimonial prompts
- Case study outline
- Shoot brief, if needed

### 8. AI, Reception, and Advanced Systems

Services:

- AI chatbot
- AI receptionist
- Advanced call/text routing
- Reactivation campaign

Client needs to provide:

- Common parent questions and answers
- Programs, age groups, prices, hours
- Enrollment requirements
- Tour availability
- Staff escalation rules
- Business phone setup
- Current missed call process
- Past lead/waitlist list, if doing reactivation
- Approved voice/tone guidelines

Access needed:

- Website chat install access
- Phone/SMS platform access or approval for new number
- CRM access
- Calendar access
- Past lead export, if doing reactivation

Internal setup:

- Knowledge base
- AI response rules
- Escalation rules
- Booking logic
- Call/text routing
- Test conversations
- Compliance review for sensitive claims

### 9. Multi-Location Support

Services:

- Additional location add-on
- Two-location standard package
- Three or more locations custom package

Client needs to provide for each location:

- Address and phone
- Director/contact
- Programs offered
- Capacity and open seats by age group
- Tuition differences
- Hours
- Service area
- Photos
- Reviews/testimonials
- Enrollment priorities
- Existing location-specific pages

Access needed:

- Location-specific Meta assets, if separate
- Location-specific Google Business Profiles
- CRM location fields or separate pipelines
- Calendar routing by location

Internal setup:

- Location matrix
- Campaign structure by location
- Budget split
- Landing pages or forms by location
- CRM routing
- Reporting by location

### 10. Fractional CMO Service

Service:

- Full marketing leadership partnership

Client needs to provide:

- Leadership goals
- Enrollment goals
- Current marketing calendar
- Current vendors
- Internal team roles
- Revenue targets
- Program expansion plans
- Past campaign performance
- Brand and positioning materials
- Meeting cadence preferences
- Decision-making process

Access needed:

- All relevant marketing platforms
- Website, analytics, and ad accounts
- CRM
- Email marketing platform
- Social accounts
- Shared project management workspace, if used
- Vendor contacts, if coordination is included

Internal setup:

- 90-day priorities
- Marketing roadmap
- Meeting cadence
- Reporting dashboard
- Decision log
- Owner/staff responsibilities
- Vendor coordination plan

## Form Architecture Recommendation

Build the onboarding form as a package-aware intake.

### Page 1 - Package Confirmation

Ask:

- Which package did you sign up for?
- Which add-ons are included?
- How many locations are included?
- Who is the main project contact?
- Who approves ads, website copy, and launch decisions?

This can be prefilled from an internal deal ID later.

### Page 2 - Universal Intake

Every client answers:

- Business basics
- Programs
- Enrollment goals
- Open spots
- Tuition
- Service area
- Positioning
- Assets link
- Website/social/reviews
- Consent and authorization

### Page 3 - Conditional Modules

Show only sections tied to selected services.

Examples:

- If Website/Funnel is selected, ask website, domain, sitemap, content, photos, compliance notes.
- If Meta Ads is selected, ask Facebook, Instagram, Meta Business Manager, ad budget, past ads.
- If Google Ads is selected, ask Google Ads customer ID, conversions, GA4, GTM, search terms.
- If CRM/Automation is selected, ask CRM, phone, calendar, follow-up process, staff routing.
- If Reviews/SEO is selected, ask GBP, reviews, local areas, review request process.
- If AI Reception is selected, ask FAQs, routing rules, escalation, approved answers.
- If Multi-location is selected, repeat location-level questions.

### Page 4 - Access Checklist

Do not collect passwords. Instead, show a checklist:

- Meta invitation sent to `media@revupcmo.com` with full control or admin access
- Google Ads invitation sent to `media@revupcmo.com` with Admin access
- Google Business Profile invitation sent to `media@revupcmo.com` with Manager access
- Domain/DNS access instructions will be sent
- Calendar/CRM access instructions will be sent
- Asset folder link has been received

Let the client mark what they already completed.

### Page 5 - Confirmation

Show:

- What EduCare received
- What is still needed
- What happens next
- Expected first build milestone
- Contact email for help

## Suggested Internal Statuses

Use these statuses in CRM/project management:

- Contract signed
- Invoice paid
- Onboarding sent
- Onboarding completed
- Asset folder received
- Access requested
- Access complete
- Build brief ready
- Website/funnel in progress
- CRM in progress
- Ads in progress
- Tracking in progress
- Client approval needed
- Launch ready
- Live
- Optimizing

## Minimum Viable Onboarding Build

The current onboarding flow is already close for the main package. The next practical version should add:

1. Package/add-on selector at the top.
2. Conditional sections for Google Ads, Google Business/Profile reviews, AI receptionist, and multi-location clients.
3. A stronger asset upload/folder step.
4. A generated internal access checklist.
5. A generated client-facing "what we still need" confirmation.
6. Admin email grouped by service module.

## Client Experience Rules

- Never ask the client for a password.
- Ask for links, files, and permission status.
- Use examples in every field so the client knows what good input looks like.
- Let clients type "not sure" without blocking submission.
- Mark only truly essential fields as required.
- Keep sensitive access work outside the form using official platform invites.
- Reuse answers across services so the client never repeats themselves.
- For multi-location clients, collect shared information once, then ask only location-specific differences.

## Implementation Notes For The Website

Current files:

- `/onboarding`: `src/app/onboarding/page.tsx`
- Form component: `src/components/OnboardingForm.tsx`
- Submission API: `src/app/api/onboarding/route.ts`

Recommended next code changes:

- Add a `packageType` select and `addons` checkbox group.
- Add conditional rendering state in `OnboardingForm.tsx`.
- Expand API sections to include new service modules.
- Expand `setupChecklist()` to produce service-specific access tasks.
- Rename `brandBrief()` internally to `buildBrief()` once it covers all services.
- Add hidden fields later for deal ID, salesperson, package, and contract URL.

This keeps onboarding simple for the client while giving the team enough detail to build websites,
ads, CRM, automations, tracking, creative, AI reception, and reporting without chasing scattered information.
