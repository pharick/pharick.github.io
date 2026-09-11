---
title: "opengl_bootstrap: a C++23 OpenGL 3.3 scaffold for gltut"
date: 2026-08-10
type: project
summary: "A C++23 OpenGL framework for working through gltut: RAII GL handles, GLSL #include, shader hot-reload, clang-tidy-as-errors builds."
tags: [cpp, opengl, graphics, glsl, cmake]
links:
  - label: Repository
    url: https://github.com/pharick/opengl_bootstrap
---

I built opengl_bootstrap so I could follow *Learning Modern 3D Graphics
Programming* (gltut) in modern C++ instead of the book's GLUT-era framework.
Each chapter is a small executable; everything reusable lives in a `glcore`
static library of about 4,600 lines: window and context setup, a move-only
`GlObject<Traits>` template that owns every kind of GL object, shader programs,
a gltut-compatible matrix stack, an XML mesh loader, KTX texture loading through
gli, camera controllers, polled input and a Dear ImGui overlay.

The two pieces I spent the most care on are the GLSL preprocessor and the hot-
reloader. Core GLSL has no `#include` and macOS exposes no extension for it, so
I wrote one: it hoists `#version`, emits `#line n source-index` so driver errors
still point at the right file, detects include cycles and returns
`std::expected` instead of throwing. The hot-reloader watches the full include
closure of each program, polls timestamps at most every 0.25 s, and on a failed
compile logs the error and keeps the last working program bound rather than
losing the running scene.

macOS caps OpenGL at 4.1, so `glDebugMessageCallback` is unavailable. I made
`glGetError` ergonomic instead: `GLC_CHECK(expr)` throws with the expression,
file and line in Debug builds and compiles to the bare call in Release, and a
per-frame scope drains the queue in every build.

The build encodes the rules I wanted to keep myself to: three CMake presets
(`dev`, `asan`, `release`), clang-tidy running during compilation with every
finding an error, a strict warning policy applied to my code but not to
`SYSTEM`-marked third-party headers, and a `GLC_MAX_FRAMES` environment variable
that turns any tutorial into a sanitizer smoke test. The context-free parts
(`#include` expansion, path resolution, the matrix stack) have Catch2 tests
registered individually with CTest.

It is macOS/Homebrew-specific, only six chapters are ported so far, and GL-
dependent code is exercised through sanitizer runs rather than automated
assertions.

**Language:** C++  
**Size:** about 6,380 lines in 67 source files  
**Build:** cmake  
**Tests:** Catch2 v3, 20 test cases for the GL-free parts (GLSL include expansion, matrix stack, paths); ctest presets  
**Platform:** macOS  
**Started:** 2026-08 · **Last activity:** 2026-09
