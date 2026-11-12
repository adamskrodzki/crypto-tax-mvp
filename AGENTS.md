# AGENTS.md

## Repository scope

This repository is limited to product ideation, mockups, and concept documentation. It exists to explore and communicate how the taxpayer and accountant workflows could work. Building the full application is outside its scope.

Mockups can be interactive and use fictional data. Any data import, tax calculation, payment, KYC/AML check, or tax filing shown in a mockup is simulated.

## Project and business context

Crypto Tax MVP explores a Polish PIT settlement service limited to cryptocurrency activity. The accounting firm will own the application and provide the service. An accountant reviews and approves each settlement, and the firm takes professional responsibility for the result. A customer is buying a settlement handled by the firm. A downloadable report for self-filing is a different product.

## Current product assumptions

The main UX challenge is giving taxpayers a useful first assessment before asking them for much effort or incurring costs for the firm. The concept identifies the number and types of sources early. CSV and direct exchange API imports are free, while paid aggregators such as Kryptos.io are available through a paid plan. Taxpayers can also explain activity missing from imports, such as card payments or withdrawals through exchange offices.

Pricing is based on two factors. The estimated tax amount informs the firm's potential liability. Case complexity is measured by the time the accountant expects to spend on the case. Transaction count may help assess complexity. The system uses the available data to suggest an initial plan and flag gaps. As taxpayers add evidence, it reassesses the case and prepares it for accountant review. The accountant can ask for clarification or approve the settlement. The point of the automation is to reduce the accountant's manual work.

KYC/AML is required for the firm's service and must be complete before final approval. It adds friction for the taxpayer and costs the firm money. The intended flow places it after initial plan selection and leaves source discovery and free imports available earlier.

## Existing mockups

**[`working/mockup-szefa/`](working/mockup-szefa/) is an early, unapproved proposal with known UX problems.** Its taxpayer wizard requires payment and KYC submission before the taxpayer can add sources. The taxpayer therefore faces both barriers before getting an assessment based on their data. It also uses transaction-count tiers, which do not reflect the agreed pricing factors. The files are material for discussing alternatives. [`archive/rejected-mockup/`](archive/rejected-mockup/) holds a separate, rejected prototype for historical reference.

## Open questions

The plans could specify which checks they include, the amount of professional liability coverage, and how much accountant time is included. Whether the accountant should trigger KYC from the dashboard, and how to handle unexpectedly complex cases, are still open. Selling an additional consultation package is one option to discuss with the accountant.
