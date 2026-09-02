---
name: frontend-aesthetic-direction
description: Use before starting hi-fi visual work on a client site with no existing brand identity or design system — commits to a concrete aesthetic direction (typography, color, density, radius, motion) so the result doesn't default to generic AI-template output.
---

# Frontend Aesthetic Direction: Commit to a Look When No Brand Exists

Establish an aesthetic direction (typography, color, density, mood, component style) when the client has no existing brand or design system. Use this **before** hi-fi work: mocking hi-fi from scratch without committing to an aesthetic is the fastest path to AI-template output. Pick a direction first, then design within it.

## Phase 1: Confirm there's truly no existing context

Double-check: no brand guide/manual, no existing logo or color palette, no reference site the client wants to mimic, no photos with a clear existing visual identity. If any exist, **stop and use them** — aesthetic direction is for true greenfield. If the client has a brand but it wasn't included in the briefing, ask for it before proceeding.

## Phase 2: Discover the intent

Confirm from the briefing (or ask if missing): **three adjectives** for the desired feel; **audience** (who the site needs to convince); **industry context** (pousada, clínica, barbearia, escritório, etc. each carry different visual expectations); **reference designs admired** (if the client mentioned any); **off-limits** aesthetics.

If unclear, propose **2–3 distinct visual directions** — background hex / accent hex / display + body typeface, with a one-line rationale tied to the business — and pick the strongest fit rather than asking the user to choose (unless this is for the sales demo stage, where showing options may itself be the pitch — see `generate-variations`).

## Phase 3: Commit to the system — make it concrete

Vague aesthetic statements ("modern and clean") produce generic designs. Commit on each axis:

### Typography

Pick **specific** fonts — headline, body (often the same family) — with weights and a type scale. 1–2 families maximum.

Avoid the overused defaults — Inter, Roboto, Arial, bare system stacks, and the silent serif-display defaults (Fraunces, Playfair Display, Georgia-as-display) — unless there's a real reason for them. Pick with intent based on the business tone.

### Color

Pick a tone — warm (cream, gold, terracotta), cool (gray, slate, ice, blue), or neutral (concrete, charcoal, off-white) — matched to the business, not to what's trendy.

**The warm-editorial combination (cream background + serif display + terracotta/amber accent) is the current default-model look.** Choose it only when the business is genuinely editorial, hospitality, or portfolio-like — and say so explicitly. If the direction drifts there without a reason, pick again.

Then pick: a primary brand color, at most one accent, and a 5–10 step neutral scale on the chosen tone. Subtly tone whites and blacks — pure `#FFFFFF`/`#000000` is harsh; match the tone (e.g., `#FAFAFA` / `#1A1A1A`).

### Density

Pick a spacing scale (4px or 8px base) and a density — tight (compact, informational), normal (typical business site), or loose (premium, generous whitespace, hospitality/luxury feel). Density is felt as much as seen.

### Border radius and shadow

Sharp (0–2px), soft (4–8px — typical modern site), or pill/fully-rounded (playful, friendly). Shadows likewise: sharp / soft / none. One elevation system, not a mix.

### Imagery

Real photography from the client (priority — see main development prompt's photo rules), or honest placeholders when assets are missing. Avoid hand-drawn SVG illustrations of people or scenes.

### Motion

Quiet (transitions on state changes only), expressive (entrance animations, scroll-driven reveals — most common fit for premium local-business sites), or playful (springs, hover micro-interactions). Commit to one mode — mixed motion feels unintentional. See the GSAP and motion-design skills for implementation.

## Phase 4: Document the direction

Write the direction into the file as a comment block at the top of the main CSS:

```
/* Direção estética:
 * [três adjetivos]
 * - Tipografia: [fonte display] (títulos) + [fonte corpo] (texto)
 * - Cor: [tom]. #___ fundo / #___ texto. Marca: #___. Acento: #___ (se houver).
 * - Densidade: [tight/normal/loose]. Escala de 4px ou 8px.
 * - Raio: [valor]px. Sombra: [sharp/soft/none].
 * - Imagens: fotos reais do cliente / placeholder honesto.
 * - Motion: [quiet/expressive/playful].
 */
```

## Phase 5: Apply and keep consistent

Build the hero section first with the direction and treat it as the anchor. Every subsequent section references the direction's tokens, not new inline values. If a new element needs an undefined value, add it to the direction first, then use it.

Summarize: the three adjectives, the committed choices per axis, and the first section built with the direction.
