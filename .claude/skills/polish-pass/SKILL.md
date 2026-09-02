---
name: polish-pass
description: Use as the final quality gate before a site is shown to a client or shipped — runs accessibility, AI-slop, hierarchy/rhythm, and interaction-state checks together and fixes what's found. Trigger with phrases like "finalize", "polish before showing the client", or "get this ready to present".
---

# Polish Pass: End-of-Design Quality Gate

Run a comprehensive quality check before a design is shown to the client or shipped. **A polished and an unpolished design are the same idea executed at different levels of care — and the gap is what people actually see.** This is the umbrella for four narrower review skills; use it as the final gate before delivery.

## Phase 1: Confirm scope

Polish the HTML/CSS file(s) the user just finished or asked about; otherwise the project's main deliverable (e.g. `index.html` and its linked pages); if unclear, ask. Note the deployment context (this is customer-facing marketing/commercial work) and any stated constraints.

If the design is clearly mid-flight (broken layout, missing sections, placeholder content still being iterated), say so and ask whether to polish now or after the structure settles.

## Phase 2: Review across four areas

Cover each of the following (see the dedicated skills `accessibility-audit`, `ai-slop-check`, `hierarchy-rhythm-review`, `interaction-states-pass` for full detail on each):

1. **Accessibility audit**: contrast and color (WCAG AA minimums, color-only signaling, pure white/black); semantic HTML and structure (headings, button vs div, labels, alt text); keyboard navigation and focus; motion, forms, and hit-target size.
2. **AI slop check**: aggressive gradients; emoji decoration; default left-border cards; hand-drawn SVG illustration; overused default fonts (Inter, Roboto, Arial, Fraunces, bare system stacks); the editorial-warm house style as a silent default (cream + serif display + terracotta, without a brand reason); pure white/black; invented colors; off-scale spacing.
3. **Hierarchy and rhythm review**: primary/secondary/tertiary differentiation via size, color, weight, position, density, and the 5-second test; spacing and type scale discipline, repetition, strategic variation, palette discipline, section structure, alignment.
4. **Interaction states pass**: per-element default/hover/active/disabled/focus/loading; transition timing; `prefers-reduced-motion`; action feedback and state visibility.

Report every issue found, including uncertain and low-severity ones, with a confidence and severity estimate. Coverage first; filtering happens in Phase 3.

## Phase 3: Aggregate, deduplicate, prioritize

Merge duplicate findings (e.g., "focus ring removed" from both accessibility and interaction-states). Group into:

1. **Blockers** — accessibility failures (contrast under WCAG, missing keyboard support, removed focus rings, missing labels). These break the design for real users; fix all.
2. **Quality issues** — AI slop tropes, broken hierarchy, missing interaction states. These cheapen the design; fix all.
3. **Polish recommendations** — subtler improvements (color tone shift, spacing-scale tightening). Apply when in scope; flag when out.

## Phase 4: Fix and re-verify

Fix every blocker and quality issue directly. For ambiguous fixes (e.g., the design uses Inter but no brand font is stated), pick a defensible default and note it so the user can override. Note and skip clear false positives (e.g., a third-party embed's contrast).

Then re-check the high-risk areas: did contrast fixes wash out a brand color? Do the new focus rings overlap neighboring content? Does the primary CTA now actually feel primary? Fix what looks off; flag what you're unsure about.

## Phase 5: Final summary

Report concisely:

- **Verdict** — "Pronto para apresentar ao cliente" / "Pronto após revisão de algumas decisões" / "Precisa de mais uma rodada antes de polir"
- **Blockers corrigidos e polish aplicado** — contagem por categoria
- **Decisões em aberto** — escolhas de julgamento para o usuário confirmar (fonte, tom de cor, nível de ênfase)
- **Fora de escopo** — notado mas não tocado (edições de copy, novas seções)
