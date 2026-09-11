---
title: "containermin: a minimal container runtime in C"
date: 2023-07-04
type: project
summary: "Pulls a Docker Hub image with libcurl and a hand-written JSON parser, unpacks its layers, then chroots and execs a command in a new PID namespace."
tags: [c, containers, linux, docker, namespaces, http]
links:
  - label: Repository
    url: https://github.com/pharick/containermin
---

containermin is a learning project in which I wrote the core of `docker run` in
about 500 lines of C: given an image name and a command, it pulls the image from
Docker Hub, unpacks the layers into a temporary root directory, and executes the
command inside it under `chroot` and a new PID namespace, relaying its output
and exit status.

The registry side talks to the Docker Registry v2 API with libcurl: an anonymous
pull token from `auth.docker.io`, the manifest with a bearer token, then each
layer blob, following the redirect to the CDN and streaming the body straight to
a file. Rather than pull in a JSON library I wrote a parser sized to exactly
what those responses need: a flat key lookup that returns a number, a string, or
a raw array matched by bracket depth, plus a top-level array splitter. Layers
are downloaded as tarballs and extracted in manifest order with the system
`tar`, so later layers overlay earlier ones.

Isolation is deliberately minimal. The root is created with `mkdtemp`, the
command binary is copied into it first so it exists even before any layer is
applied, then `unshare(CLONE_NEWPID)` and `fork()` give the child a fresh PID
space; the child chroots, redirects stdout and stderr into pipes and `execv`s.
The parent waits, relays both streams and returns the child's exit code as its
own.

This is a single-commit exercise, not something I would run in production: it
requires root, supports only official `library/` images and the legacy schema-1
manifest, ignores several return values, builds URLs and shell commands in
fixed-size buffers, leaves the downloaded tarballs and the temporary root
behind, and ships without a build file or tests. What it does make clear is how
few primitives a container really needs.

**Language:** C  
**Size:** about 526 lines in 6 source files  
**Platform:** Linux  
**Started:** 2023-07
