---
title: "CatKiller: a top-down shooter in Godot 4"
date: 2024-08-15
type: project
summary: "A small Godot 4.2 survival shooter: auto-aiming gun, enemies spawning on a ring around the player, collision-layer targeting, duck-typed damage."
tags: [gdscript, godot, game, 2d]
links:
  - label: Repository
    url: https://github.com/pharick/catKiller
---

CatKiller is a small top-down survival shooter I made while learning Godot 4.2:
a cat knight with an auto-aiming gun holds out against slimes that keep spawning
and chasing it. It is seven scenes and six short GDScript files, and I keep it
as a record of a first Godot project.

I leaned on the engine rather than writing logic. Each object is its own scene
with a tiny script, and `main.tscn` wires the signals (`Character.death`, the
spawn timer) in the scene file. Targeting is done with collision layers instead
of type checks: enemies sit on layer 2, the gun's detection area and the
player's hurt box mask only that layer, bullets mask obstacles and enemies, and
enemies mask obstacles, the player and each other. Bullets call `take_damage()`
on anything that has that method, so a new enemy type only needs to implement
one function.

Spawning uses a `Path2D` rectangle parented to the player and a `PathFollow2D`
set to a random `progress_ratio`, so enemies always appear just outside the view
no matter where the player has moved. Hit feedback is an `await` on a 0.1 s
scene-tree timer between tinting the sprite red and restoring it; death spawns a
one-shot explosion sprite that frees itself when its animation finishes. Contact
damage is proportional to the number of enemies overlapping the hurt box each
physics frame, and the `death` signal pauses the tree and shows the overlay. The
project is configured for pixel art: nearest-neighbour filtering, canvas-items
stretch, Y-sorting on the main node.

Limitations: there is no score, no waves and no restart, enemies find the player
by absolute node path, the gun aims at the first body reported rather than the
closest, the enemy count grows without bound, and the sprite sheets are
uncredited in the repository. There are no tests.

**Language:** GDScript  
**Size:** about 597 lines in 13 source files  
**Started:** 2024-08
