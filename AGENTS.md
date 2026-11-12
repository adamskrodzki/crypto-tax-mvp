# AGENTS.md

## Scope

- Build static mockups and write concept documentation for a Polish cryptocurrency PIT service. The accounting firm will own the product and take professional responsibility for the settlements its accountants approve.
- Simulate the taxpayer and accountant workflows with fictional data. Keep live imports, tax calculations, payments, identity verification, and filing out of the prototype.

## How to use the existing mockups

- **[`working/mockup-szefa/`](working/mockup-szefa/) is an early, unapproved proposal with known UX problems.** Its taxpayer wizard requires plan payment and KYC submission before the taxpayer can add sources. That puts cost and friction before the taxpayer can get an estimate based on their data. Its transaction-count pricing also differs from the agreed direction. Use these files to discuss alternatives. Follow the rules below when designing a new flow.
- [`archive/rejected-mockup/`](archive/rejected-mockup/) is the rejected prototype. Use it for historical reference.

## Rules for new mockups

- Ask early how many sources the taxpayer has and what kinds they are. Offer free CSV and direct exchange API imports. Put paid aggregators such as Kryptos.io behind a paid plan. Allow supplementary evidence such as card payments or withdrawals through exchange offices.
- Recommend an initial plan based on the estimated tax amount and the accountant time the case is likely to require. Show material gaps in the estimate. Use transaction count only as a possible signal of complexity.
- Let taxpayers fill gaps in rounds. Reassess after each round and send the case to the accountant when it appears ready. The accountant can request clarification or approve the settlement.
- Require KYC/AML after the taxpayer chooses an initial plan and before final approval. Keep it out of initial source discovery and free imports.
- Label open decisions as proposals in mockups and documentation. These include making the estimated tax amount the main pricing factor, letting the accountant initiate KYC from the dashboard, defining insurance and included time limits, and offering paid extra consultation.

## Verification

- When changing a clickable mockup, open the affected HTML in a browser and walk through the changed path with its demo data.
