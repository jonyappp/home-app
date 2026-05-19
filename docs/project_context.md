# Project Context

## Product overview

Template repository for defining, planning, and evolving an AI-assisted product build without over-documenting early stages.

## Current capabilities

* Supports staged repository activation through `tasks/project_stage.md`.
* Provides core planning files for product definition, milestones, lessons, and decisions.
* Includes optional stubs for architecture, contracts, tests, integrations, and runbooks.
* Includes a reusable product UI system plus a project-specific UI spec.

## Key decisions

* The repository uses staged activation so only relevant files are active at each maturity level.
* Milestone planning is the default execution model.
* Design guidance is split into a reusable system and a project-specific implementation layer.

## Known constraints

* This is a template repository, not a product implementation.
* Documentation should stay minimal until triggered by real complexity.
* Each concept should have one clear source of truth.

## Active integrations

* None.

## Current limitations

* Core-stage defaults assume no persistence, auth, deployment, or external integrations.
* Contracts, runbooks, and deeper architecture notes remain inactive until activation criteria are met.
