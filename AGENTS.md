# AGENTS.md

## Project and business context

Crypto Tax MVP explores a Polish PIT settlement service limited to cryptocurrency activity. The accounting firm will own the application and provide the service. An accountant reviews and approves each settlement, and the firm takes professional responsibility for the result. A customer is buying a settlement handled by the firm. A downloadable report for self-filing is a different product.

The current repository contains static mockups and concept documentation. Imports, calculations, payments, identity checks, and filing are simulated wherever they appear in a demo.

## Current product assumptions

The main UX challenge is giving taxpayers a useful first assessment before asking them for much effort or incurring costs for the firm. The concept identifies the number and types of sources early. CSV and direct exchange API imports are free, while paid aggregators such as Kryptos.io are available through a paid plan. Taxpayers can also explain activity missing from imports, such as card payments or withdrawals through exchange offices.

The agreed pricing factors are the estimated tax amount, which informs the firm's potential liability, and the manual work the accountant expects to spend on the case. Transaction count may help assess complexity. The system uses the available data to suggest an initial plan and flag gaps. As taxpayers add evidence, it reassesses the case and prepares it for accountant review. The accountant can ask for clarification or approve the settlement. The point of the automation is to reduce the accountant's manual work.

KYC/AML is required for the firm's service and must be complete before final approval. It adds friction for the taxpayer and costs the firm money. The intended flow places it after initial plan selection and leaves source discovery and free imports available earlier.

## Existing mockups

**[`working/mockup-szefa/`](working/mockup-szefa/) is an early, unapproved proposal with known UX problems.** Its taxpayer wizard requires payment and KYC submission before the taxpayer can add sources. The taxpayer therefore faces both barriers before getting an assessment based on their data. It also uses transaction-count tiers, which do not reflect the agreed pricing factors. The files are material for discussing alternatives. [`archive/rejected-mockup/`](archive/rejected-mockup/) holds a separate, rejected prototype for historical reference.

## Open questions

Estimated tax may be the primary pricing factor. The plans could specify which checks they include, the amount of professional liability coverage, and how much accountant time is included. Whether the accountant should trigger KYC from the dashboard, and how to handle unexpectedly complex cases, are still open. Selling an additional consultation package is one option to discuss with the accountant.
