import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

// Mock articles matching the chronicle page
const mockArticles = [
  {
    id: 1,
    slug: 'how-to-pair-with-an-agent',
    title: 'How to Pair With an Agent',
    excerpt: "Trust isn't a feeling. It's a passing test suite.",
    content: `We're entering a new era of software development. One where humans and AI agents work side by side, each bringing unique strengths to the table.

## The Trust Problem

When you first start working with an AI agent, there's a natural hesitation. Can I trust this thing with my code? Will it break everything?

The answer is: **trust isn't a feeling. It's a passing test suite.**

## Building Trust Through Tests

The key to successful human-agent collaboration is having a robust test suite. When your agent makes changes, you don't have to read every line of code. You run the tests.

- Green tests = trust earned
- Red tests = trust needs work

## Practical Tips

1. **Start small** - Give the agent a well-defined, testable task
2. **Review the first few PRs** - Understand its patterns
3. **Expand scope gradually** - As trust builds, give more autonomy

The future of programming isn't about writing more code. It's about building better feedback loops.`,
    published_at: '2026-01-14',
    hero_image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=600&fit=crop',
    category: 'note',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 2,
    slug: 'a-codebase-by-an-agent-for-an-agent',
    title: 'A Codebase by an Agent for an Agent',
    excerpt: 'What happens when you let an agent build a codebase for itself?',
    content: `An experiment in recursive self-improvement. We asked an agent to build a codebase optimized for agents.

## The Experiment

We gave an AI agent a simple prompt: "Build a codebase that's easy for AI agents to understand and modify."

What happened next was fascinating.

## Key Findings

The agent created:
- **Extremely consistent patterns** - Every file follows the same structure
- **Comprehensive documentation** - Not for humans, but for future agents
- **Explicit dependencies** - No implicit imports or magic

## Implications

This experiment shows that the future of software might look very different. Code written by agents, for agents, has different priorities than code written by humans.`,
    published_at: '2025-12-18',
    hero_image_url: null,
    category: 'note',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 3,
    slug: 'tab-tab-dead',
    title: 'Tab, Tab, Dead',
    excerpt: "We're removing The 7th Signal Tab. It is not part of the future we see.",
    content: `We're removing The 7th Signal Tab. It is not part of the future that we see.

A year ago, most of our code was written by hand. In June, when we released The 7th Signal Tab, our agents were already writing the majority of our code. But now, agents write 90% of what we ship.

The 7th Signal Tab and other completion engines come from a world in which everyone believed humans will write most of the code and AI is sprinkled on top.

But that world is dying! Look around! Some of our users are saying they haven't opened their editor in days and yet still shipped code. The bottleneck is now how fast you can get the code out, not how fast you can write it, they say.

The era of tab completion is coming to an end. We're entering the post-agentic age, in which it's a given that agents write most of the code.

There's so much to figure out, so much to build, so much to explore! We have to choose what to focus on.

We're focusing on what's coming next, not what brought us here.

The 7th Signal Tab will continue to work until the end of January 2026. After that, we can recommend [Cursor](https://cursor.com), [Copilot](https://copilot.github.com), or [Zed](https://zed.dev) if you need inline completions.`,
    published_at: '2026-01-15',
    hero_image_url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=600&fit=crop',
    category: 'news',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 4,
    slug: 'painter',
    title: 'Painter',
    excerpt: 'Generate and edit images with the painter tool',
    content: `The 7th Signal can now generate and edit images, which is useful for design inspiration, tweaking mockups, and making visual assets:

- Exploring UI alternatives: *"show me 3 different designs for this task dashboard"*
- Editing an existing image: *"update this dashboard with the changes shown in the attached image"*

To use it, ask The 7th Signal to use the \`painter\` tool explicitly. The painter uses Gemini 3 Pro Image (a.k.a. Nano Banana Pro) under the hood.`,
    published_at: '2026-01-14',
    hero_image_url: null,
    category: 'news',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 5,
    slug: 'handoff-please',
    title: 'Handoff, Please',
    excerpt: 'Move to a new thread without commands or buttons',
    content: `Sometimes your thread gets too long. Context degrades. The agent starts forgetting things.

Now you can simply say "handoff, please" and The 7th Signal will:

1. Summarize the current thread's context
2. Create a new thread with that context
3. Continue working seamlessly

No commands. No buttons. Just natural conversation.`,
    published_at: '2026-01-13',
    hero_image_url: null,
    category: 'news',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 6,
    slug: 'stick-a-fork-in-it',
    title: "Stick a Fork in It, It's Done",
    excerpt: "We're ripping out the Fork command",
    content: `The Fork command is gone. It was confusing and rarely used.

If you need to branch your conversation, just start a new thread and reference the old one. The 7th Signal will pull in the relevant context automatically.

Simpler is better.`,
    published_at: '2026-01-13',
    hero_image_url: null,
    category: 'news',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 7,
    slug: 'todos-are-done',
    title: 'TODOs Are Done',
    excerpt: 'The TODO list feature is now gone from The 7th Signal',
    content: `We've removed the TODO list feature. It added complexity without adding value.

Your agent doesn't need a TODO list. It needs clear instructions and good context.

Focus on what matters.`,
    published_at: '2026-01-12',
    hero_image_url: null,
    category: 'news',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 8,
    slug: 'agents-panel',
    title: 'Agents Panel',
    excerpt: 'A new panel for viewing and managing multiple agent threads',
    content: `The new Agents Panel lets you see all your active agent threads at a glance.

- View thread status
- Switch between threads
- See what each agent is working on

Perfect for when you have multiple agents working on different parts of your codebase.`,
    published_at: '2026-01-09',
    hero_image_url: null,
    category: 'news',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 9,
    slug: 'frontier-is-now-free',
    title: 'The Frontier Is Now Free',
    excerpt: '$10/day for any mode, including smart with Opus 4.5',
    content: `We're making frontier models accessible to everyone.

For $10/day, you get unlimited access to:
- Smart mode with Opus 4.5
- All other modes
- Priority queue access

The future shouldn't be gatekept.`,
    published_at: '2026-01-08',
    hero_image_url: null,
    category: 'news',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 10,
    slug: 'efficient-mcp-tool-loading',
    title: 'Efficient MCP Tool Loading',
    excerpt: 'Load MCP tools into your context window only when you use them',
    content: `MCP tools now load lazily. Your context window stays clean until you actually need a tool.

This means:
- Faster initial responses
- More room for your code
- Better agent performance

Efficiency matters.`,
    published_at: '2026-01-08',
    hero_image_url: null,
    category: 'news',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 11,
    slug: 'context-management-in-the-7th-signal',
    title: 'Context Management in The 7th Signal',
    excerpt: 'Learn how to effectively manage context for better agent performance',
    content: `Context is everything. Here's how to manage it effectively.

## Understanding Context Windows

Every conversation has a limited context window. Think of it as the agent's working memory.

## Best Practices

1. **Be specific** - Vague requests waste context
2. **Chunk large tasks** - Break them into focused threads
3. **Use handoffs** - When context degrades, start fresh

## Advanced Techniques

- Reference specific files instead of pasting code
- Use AGENTS.md for persistent context
- Let the agent search the codebase instead of explaining it`,
    published_at: '2025-12-15',
    hero_image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop',
    category: 'note',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 12,
    slug: 'how-to-build-an-agent',
    title: 'How to Build an Agent',
    excerpt: 'A comprehensive guide to building your own AI agent',
    content: `Building an AI agent is easier than you think. Here's how.

## Prerequisites

- Basic programming knowledge
- API access to an LLM
- A clear use case

## Step 1: Define the Agent's Purpose

What should your agent do? Be specific.

## Step 2: Design the Tool Interface

Agents need tools. Define what actions your agent can take.

## Step 3: Build the Loop

The core of any agent:
1. Observe
2. Think
3. Act
4. Repeat

## Step 4: Add Memory

Agents need context. Build in state management.

## Step 5: Test and Iterate

Agents improve through feedback. Build evaluation loops.`,
    published_at: '2025-12-10',
    hero_image_url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
    category: 'note',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 13,
    slug: 'episode-02-mckay-wrigley',
    title: 'Episode 02: McKay Wrigley',
    excerpt: 'A conversation about the future of AI-assisted development',
    content: `In this episode, we sit down with McKay Wrigley to discuss the future of AI-assisted development.

Topics covered:
- The evolution of code editors
- Why agents will replace autocomplete
- Building products in the age of AI

Watch the full episode on YouTube.`,
    published_at: '2025-12-09',
    hero_image_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop',
    category: 'video',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 14,
    slug: 'importance-of-feedback-loops',
    title: 'Episode 8: Importance of Feedback Loops',
    excerpt: 'Why feedback loops are critical for agent performance',
    content: `Feedback loops are the secret to effective AI agents.

In this episode, we explore:
- Why agents need immediate feedback
- How to build evaluation loops
- The role of tests in agent development

Watch on YouTube.`,
    published_at: '2025-12-06',
    hero_image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&h=600&fit=crop',
    category: 'video',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  },
  {
    id: 15,
    slug: 'opus-45-higher-highs',
    title: 'Opus 4.5: Higher Highs and Higher Lows',
    excerpt: 'Exploring the capabilities of Opus 4.5',
    content: `Opus 4.5 is here, and it's impressive.

In this video, we explore:
- What's new in Opus 4.5
- Benchmarks and real-world performance
- When to use Opus vs other models

Watch the full breakdown on YouTube.`,
    published_at: '2025-12-06',
    hero_image_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=600&fit=crop',
    category: 'video',
    author: { name: 'The 7th Signal Team', slug: 'team', avatar_url: null }
  }
];

export const load: PageServerLoad = async ({ params }) => {
  const article = mockArticles.find(a => a.slug === params.slug);

  if (!article) {
    throw error(404, 'Article not found');
  }

  return { article };
};
