# product-hygiene

**A Claude Code skill that cleans a product funnel before anyone makes a decision from it.**

Most product decisions are made from a dashboard that is finished, confident and unaudited. A
finished-looking artifact is one nobody re-checks — which is exactly when the denominator is wrong.
This skill is the twenty minutes before the decision, the ones almost nobody spends.

## Install

```bash
git clone https://github.com/BayramAnnakov/edu-ai-product-analyst.git
mkdir -p ~/.claude/skills
cp -R edu-ai-product-analyst/.claude/skills/product-hygiene ~/.claude/skills/
```

Then, in any project:

```bash
cd <the folder with your analytics export>
claude
# then:  /product-hygiene
```

It reads CSVs and writes markdown. No MCP, no API keys, no auth — so it still runs on the laptop
where the credentials expired.

## What it does

It is not an answer engine. It is a procedure that makes the investigation harder to skip:

| | |
|---|---|
| **0 · Inventory** | every check graded **CAN / PARTIAL / CANNOT** *before* anything is computed |
| **1 · Premise audit** | recompute every number the human put in the prompt |
| **2 · Identity** | decide what a *person* is — browser, account, or company — and use it everywhere |
| **3 · Population** | remove who is not a customer, **reporting the row count of every rule** |
| **4 · The positive pass** | look at who **finished**, not only who dropped |
| **5 · Cross-cuts** | cross two dimensions instead of stopping at one |
| **6 · Reconcile** | two sources, and state *why* they are independent — or admit they are not |
| **7 · The funnel** | each step with what the event **actually fires on**, and losses ranked by people per month |
| **8 · The tracking plan** | every `CANNOT` becomes one concrete thing to log |

## The three rules it will not let you break

**A silent filter is an undeclared denominator.** Every exclusion ships with the number of rows it
removed. A rule resting on a single signal gets reported as *"n accounts flagged by \<field\>"* —
never as a count of bots.

**The event's name is not its definition.** An event called `x_connected` that fires when a dialog
*opens* is not a record of connection. If source code is available the skill reads the call site,
and it still grades the definition `ASSUMED` for any period it did not verify — today's code does
not tell you what fired last quarter.

**`ASSUMED` is not a weaker `MEASURED`.** It is a different claim, and the skill will not upgrade
one to the other for you. An empty cell with an honest caption is worth more than a number recalled
from memory.

## Why the positive pass is first

The people who failed can only show you something broken in a step you already suspected. The
people who **finished** share a property nobody asked about — and that is where the constraint
usually is. Negative analysis finds bugs; positive analysis finds the mechanism worth testing.

A property shared by finishers is an **association, not a cause**, and the skill says so every time.

---

Built for the **AI Product Analyst** course. Course materials and a full synthetic case are
published here after each session is delivered.

*Bayram Annakov · [Onsa.ai](https://onsa.ai)*
