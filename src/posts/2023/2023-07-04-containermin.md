---
title: "containermin: a minimal container runtime in C"
date: 2023-07-04
type: project
summary: "Pull an image from a registry, unpack the layers, run a command inside: Docker in miniature."
tags: [c, containers, linux]
links:
  - label: Repository
    url: https://github.com/pharick/containermin
---

I wrote a minimal Docker-like container runtime in C. It pulls an image by name
and tag from a registry (fetching an auth token, the manifest and filesystem
layers with a small hand-written JSON parser), unpacks the layers into a
container root and runs a command inside it.

**Language:** C  
**Started:** 2023-07
