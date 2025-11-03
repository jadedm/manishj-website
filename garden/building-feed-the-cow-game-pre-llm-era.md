---
title: "Building My First Browser Game in the Pre-LLM Era"
date: "2025-10-20"
stage: "seedling"
tags: ["phaser", "game-dev", "javascript", "stackoverflow", "learning"]
excerpt: "How a young developer built a fast-paced browser game using Phaser 2, Stack Overflow, and pure determination in 2016 - long before ChatGPT and Claude existed"
---

## The Challenge

In 2016, as a young developer, I wanted to create a browser game for World Milk Day to raise awareness about natural cattle feed. The challenge? I had never built a game before, game engines felt intimidating, and there was no AI to help me figure things out.

This was the pre-LLM era. No ChatGPT. No Claude. No Copilot. Just documentation, Stack Overflow, and determination.

## The Learning Process

### Discovery Phase

**Finding the Right Tool:**
- Stumbled upon [Phaser 2](https://phaser.io/) game framework
- HTML5-based, runs in browsers (perfect!)
- Active community and examples (critical for learning)
- No Unity/C# complexity to deal with

**Initial Confusion:**
- What is a "game state"?
- How do sprites work?
- What's the difference between `update()` and `render()`?
- Physics? Collision detection? Where do I start?

### Stack Overflow Era Learning

**The Workflow:**
1. Read Phaser documentation (often confusing)
2. Try to implement something (usually fails)
3. Search: "phaser 2 how to move sprite"
4. Find Stack Overflow answer from 2014
5. Copy-paste code
6. Modify until it works (or breaks differently)
7. Repeat 50 times

**Common Searches:**
- "phaser sprite drag mouse"
- "phaser collision detection example"
- "phaser group spawn random position"
- "how to make background scroll phaser"
- "phaser game over screen"

### Trial and Error Development

**What Worked:**
- Example projects were goldmines (copy structure, modify logic)
- Breaking down big problems: "Make game" → "Move cow" → "Spawn grass" → "Detect collision"
- Console.log() debugging everywhere
- Incremental building: get one thing working before adding next

**What Didn't Work:**
- Trying to understand entire framework at once
- Following tutorials for different versions (Phaser 2 vs 3 confusion)
- Over-engineering early (just make it work first!)

## The Game Architecture

### Phaser State Pattern

Learned to structure games in "states":

```javascript
// Boot.js - Initialize game settings
window.feedTheCow.Boot = function(game) {
  // Setup screen size, physics, etc.
};

// Preloader.js - Load all assets
window.feedTheCow.Preloader = function(game) {
  // Load sprites, sounds, fonts
};

// StartMenu.js - Title screen
window.feedTheCow.StartMenu = function(game) {
  // Show title, play button
};

// Game.js - Main game logic
window.feedTheCow.Game = function(game) {
  // The actual game!
};
```

### Core Game Loop

The magical `update()` function that runs every frame:

```javascript
update: function() {
  // Move background
  this.background.tilePosition.x -= this.getScrollSpeed();

  // Handle player input
  this.handleControls();

  // Spawn items
  this.spawnGrass();
  this.spawnInjections();

  // Check collisions
  this.checkCollisions();
}
```

### Progressive Difficulty

One feature I'm proud of - infinite difficulty scaling:

```javascript
getScrollSpeed: function() {
  return 3 + Math.sqrt(this.secondsElapsed) * 0.5;
}
```

Used square root because:
- Linear (`speed = time`) got too hard too fast
- Exponential would be impossible
- Square root felt "just right" (pure trial and error)

## Key Challenges Solved

### 1. Mobile Controls

**Problem:** Mouse controls don't work on mobile

**Stack Overflow Solution:** Found virtual gamepad plugin
- Searched: "phaser mobile touch joystick"
- Found plugin by Shawn Hymel
- Took hours to figure out integration
- Had to read plugin source code (scary at the time!)

### 2. Collision Detection

**Problem:** Cow eating grass sometimes missed

**Learning:**
- Phaser has built-in physics (Arcade Physics)
- Use `game.physics.arcade.overlap()` not manual distance calculation
- Enable physics bodies on sprites
- Took 3 days to figure this out

### 3. Smooth Spawning

**Problem:** Items spawning at same time looked bad

**Solution (from Stack Overflow + experimentation):**
```javascript
// Random spawn intervals
var randomDelay = Math.random() * 1000 + 500;
game.time.events.add(randomDelay, this.spawnGrass, this);
```

## The Stack

**Technologies:**
- Phaser 2 (game engine)
- Vanilla JavaScript (no frameworks)
- HTML5 Canvas
- No build tools initially (just `<script>` tags!)
- Later added Vite for development server

**Learning Resources:**
- [Phaser 2 Examples](https://phaser.io/examples) (most helpful!)
- Stack Overflow (lifesaver)
- Random blog posts from other game devs
- Phaser HTML5 community forums
- Trial and error (the real teacher)

## What This Experience Taught Me

1. **Read the errors:** Browser console was my debugging companion
2. **Copy smart:** Understanding > blind copying (learned the hard way)
3. **Start small:** Get a square moving before building the game
4. **Community matters:** Stack Overflow answers from strangers taught me game dev
5. **Persistence:** When stuck for hours, take a break, come back, try again

## The Pre-LLM Reality

**2016 vs 2025:**
- **Then:** Spend 2 hours searching for "how to rotate sprite based on velocity"
- **Now:** Ask Claude, get answer in 10 seconds

**Then:** Read through 10 Stack Overflow threads to understand game states
**Now:** "Explain Phaser game states like I'm a beginner"

**Then:** Debug collision for 3 days
**Now:** Paste code, ask "why isn't collision working?"

But also:
- **Then:** Deep learning through struggle
- **Now:** Faster iteration, but sometimes shallow understanding

## Final Result

Built **Feed The Cow** in about 2-3 weeks of after-school coding:
- 500+ lines of game logic
- Progressive difficulty system
- Mobile + desktop support
- Sound effects and scoring
- Published and playable!

**Play it:** [feed-the-cow](https://jadedm.github.io/feed-the-cow)
**Source:** [GitHub](https://github.com/jadedm/feed-the-cow)

## Reflections

Would an LLM have helped? Absolutely.

But there was something special about:
- Reading through 20 forum posts to find *that one answer*
- The "aha!" moment after 6 hours of debugging
- Building something without AI assistance
- Earning every line of code through experimentation

That struggle built foundational understanding that still helps today when debugging complex systems - even with AI assistance.

---

*This note captures the essence of learning to code in the 2010s: documentation, Stack Overflow, community forums, and a lot of trial and error. No AI assistants. Just curiosity and determination.*
