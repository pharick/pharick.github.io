---
title: "OpenGL bootstrap for the gltut book"
date: 2026-08-10
type: project
summary: "A C++23 scaffold with RAII GL wrappers, shader hot-reload and Dear ImGui for working through modern 3D graphics."
tags: [cpp, opengl, cmake, testing]
links:
  - label: Repository
    url: https://github.com/pharick/opengl_bootstrap
---

I built a modern C++23 scaffold for working through the gltut book (Learning
Modern 3D Graphics Programming), where each chapter is a small executable on top
of a shared `glcore` library. glcore provides move-only RAII wrappers for every
GL object, shader hot-reload with GLSL #include resolution, a checked GL error
macro, cached-uniform programs, a book-compatible MatrixStack, orbit/fly
cameras, gltut XML mesh loading, KTX texture loading via gli and Dear ImGui
panels. The project uses CMake presets with clang-tidy as errors and sanitizers,
Catch2 tests, and includes chapters on triangles, cameras, textures and diffuse,
point and specular lighting.

**Language:** C++  
**Started:** 2026-08 · **Last activity:** 2026-09
