# PRD: Chronicle Platform UI Overhaul

## Overview

Transform Chronicle into a professional content platform with:
- Independent column scrolling (viewport-locked)
- Proper routing (/chronicle for blog, /home for homepage)
- Article detail pages with breadcrumb navigation

## Goals

1. Blog page columns scroll independently within viewport
2. Separate homepage from blog
3. Articles accessible at /chronicle/[slug]
4. Professional breadcrumb navigation on article pages

## User Stories

### US-001: Create /chronicle route structure
Move blog layout from / to /chronicle

### US-002: Create /home placeholder
Create marketing homepage at /home

### US-003: Implement viewport-locked layout
Make blog page fill viewport exactly with h-dvh

### US-004: Enable independent column scrolling
Each column (Notes, News, Videos) scrolls independently

### US-005: Horizontal scroll for GUIDES
GUIDES section scrolls horizontally

### US-006: Remove footer from chronicle page
Blog page should not have footer

### US-007: Move article routes to /chronicle/[slug]
Articles accessible under /chronicle/

### US-008: Add breadcrumb navigation to articles
CHRONICLE // [CATEGORY] / [TITLE] format

### US-009: Update all internal links
Fix all href attributes to use new routes

### US-010: Create root redirect
Redirect / to /home

## Technical Approach

- Use Tailwind CSS utilities: h-dvh, flex, overflow-y-auto
- SvelteKit routing with +page.server.ts redirects
- Maintain existing design tokens (chronicle-* colors)
