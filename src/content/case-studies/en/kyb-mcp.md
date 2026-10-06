---
title: "kyb-mcp: learning the Model Context Protocol by using all of it"
description: An MCP server for Know Your Business checks on French companies, built as a learning project that uses every primitive of the protocol.
---
## The problem

A Know Your Business check starts with the same lookups every time: does the company exist, who runs it, what does it do, and what did we conclude last time?

The Model Context Protocol has more primitives than tools. I wanted a project that needed each of them for a real reason, so I built one around those lookups.

## What I built

An MCP server that searches the French company registry, through the public [recherche-entreprises](https://recherche-entreprises.api.gouv.fr/docs/) API, and keeps review dossiers. Claude Code, claude.ai or any other MCP client can use it, over stdio or Streamable HTTP.

| Primitive | Names | What it is for |
|---|---|---|
| Tools | `search_companies`, `get_company`, `find_by_person` | Typed lookups in the registry |
| Tools | `create_dossier`, `add_note`, `set_status`, `list_dossiers`, `get_dossier` | The review dossier and its notes |
| Tool | `archive_dossier` | Asks the user to confirm first (elicitation) |
| Tool | `draft_risk_summary` | Asks the client's model to write the summary (sampling) |
| Tool | `bulk_check` | Reports progress and can be cancelled |
| Resources | `company://{siren}`, `dossier://{id}`, `dossiers://{status}`, `naf://{code}` | Read-only views a client can attach |
| Prompts | `kyb_review`, `compare_companies` | A packaged workflow, with the company attached |

## How it works

**A polite client of a public API.** Every registry call goes through one HTTP client with a rate limit of 5 requests per second, under the public limit of 7, and a 60-second cache. Directors' birth dates are dropped before anything leaves the process.

**Storage behind a port.** Dossiers sit behind a repository interface with two adapters: in memory, so the server runs with no setup, and PostgreSQL for durable use.

**No model of its own.** When a summary is needed, the server asks the connected client's model to write it and stores the result as a note.

**Stateless HTTP.** The Streamable HTTP transport keeps no session, which suits serverless hosting, and it checks the `Host` header against DNS rebinding.

The server has 23 offline tests, and tagged releases publish a Docker image.

## What I learned

- Each primitive has a distinct job. Tools act, resources are read, prompts package a workflow, and elicitation and sampling hand a decision back to the user or to the client's model.
- Hosting constraints reach into protocol choices: a stateless transport is what makes a serverless deployment possible.
- The trade-offs are worth writing down: each one has a decision record in the repository.

Still to do before exposing the write tools publicly: OAuth 2.1, telemetry, and publication to the MCP Registry.
