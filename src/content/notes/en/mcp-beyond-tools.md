---
title: MCP beyond tools
description: What elicitation, sampling and completions are good for, from building a KYB server that uses every MCP primitive.
date: 2026-10-07
draft: true
project: kyb-mcp
---
Most Model Context Protocol servers expose tools and nothing else. kyb-mcp, a workbench that searches the French company registry and keeps KYB dossiers, was built to use every primitive on purpose. Tools and resources are well documented. These three are less known, and each solves a real problem.

## Elicitation: ask the human, not the model

Archiving a dossier is destructive. A tool annotation can mark it as such, but the model still decides whether to call it. With elicitation, the server asks the user directly, through their client, with a typed form. The `archive_dossier` tool handles three answers: accept, decline and cancel. Only an explicit confirmation changes anything.

The point is who answers. A confirmation that passes through the model can be hallucinated or talked into; one that comes from the client's own interface cannot.

## Sampling: borrow the client's model

`draft_risk_summary` writes a first-draft risk summary of a company. The server has no model and no API key. Through sampling, it asks the client's model to write the text, then stores the result as a note marked `ai_summary`: a starting point for the analyst, never a decision.

Two limits to know. Sampling works only when the client declares the capability; otherwise the tool fails cleanly with a clear error. And client support varies: the MCP Inspector was my reference client for it.

## Completions: autocomplete for arguments

Prompts and resource templates take arguments, and a company's SIREN is a nine-digit number nobody remembers. The completion handler suggests SIRENs of companies the server has seen recently, as the user types. It is a small feature that makes prompts usable by people rather than only by models.

## What changed in 2026

On the protocol revision of 28 July 2026, the server no longer sends requests to the client. A tool that needs user input or the client's model returns an "input required" result; the client answers and calls again. The Python SDK v2 hides this behind dependency parameters that return an `Elicit` or a `Sample`.

That has a consequence for hosting. Over stateless HTTP, the retry can land on another instance, so the state of a multi-step call is sealed with a key that every instance must share. Forget it, and elicitation works on your laptop and fails in production.

## Takeaways

- Use elicitation for consent and for destructive actions: the human answers, not the model.
- Use sampling when the server needs language but should not hold a key or pay for a model.
- Add completions wherever a person types an identifier.
- Most tutorials still show the pre-2026 SDK. Read the SDK reference, not blog posts.
