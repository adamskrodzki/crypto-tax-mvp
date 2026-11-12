# Crypto Tax MVP

## Product goal

The product helps taxpayers in Poland settle their cryptocurrency PIT. The accounting firm will own the application, provide the tax settlement service, and take professional responsibility for the settlements it approves. Design for an accountant to review and sign off on the case. The workflow should result in a settlement approved by the firm.

## Repository scope

This repository is for mockups and concept documentation. Use static screens and simulated data and interactions to explore the taxpayer and accountant workflows. Production imports, tax calculations, payments, identity verification, and filing are outside the current repository scope.

`working/mockup-szefa/` contains working mockups for discussion. `archive/rejected-mockup/` contains the rejected prototype for reference. Treat both as design references. The product decisions in this file take precedence over assumptions shown in the mockups.

## Taxpayer and accountant workflow

1. Keep the initial steps easy. Find out how many sources the taxpayer has and what kinds they are before asking for a full import. Offer free CSV imports and direct exchange connections via API keys. Reserve paid third-party aggregators such as Kryptos.io for a paid plan. Let taxpayers add information the imports may miss, such as card payments and withdrawals through exchange offices.
2. Use the available data to estimate the tax amount, identify transaction types and gaps, and estimate the manual work the accountant will need. Recommend an initial plan based on those estimates. Make it clear when the available data is incomplete.
3. Let the taxpayer add or clarify data in rounds. The system should identify what is missing and repeat the assessment as new evidence arrives. When the case appears ready, send it to the accountant's workspace. The accountant can accept it or send it back for clarification. Automate the preparation and checks that save the accountant time.
4. KYC/AML is mandatory for the firm's service and must be completed before final approval. It adds friction and costs the firm money. Have the taxpayer choose an initial plan before starting verification. An accountant-triggered request from the dashboard is one option for deciding when to start it.

## Pricing and open decisions

- Base the recommended plan on estimated tax exposure and expected accountant time. Use transaction count only as a possible signal of complexity. The working assumption is that estimated tax exposure will be the main factor in the initial recommendation.
- A plan may specify the KYC/AML check, the amount of professional liability coverage, and the included accountant time. Plan limits and terms are open.
- If the case turns out to require more work than the plan covers, offering an additional consultation package is a proposal to discuss with the accountant. The trigger, terms, and any repricing process are open.
