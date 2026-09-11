---
title: "ready_set_bool: boolean algebra and set theory in C++17"
date: 2023-12-25
type: project
summary: "École 42 Ready, Set, Bool! in C++17: gate-level adder, RPN logic engine with NNF/CNF/SAT, set evaluation, powerset, Morton curve; Catch2 via CMake."
tags: [cpp, 42, boolean-algebra, algorithms]
links:
  - label: Repository
    url: https://github.com/pharick/ready_set_bool
---

ready_set_bool is my implementation of École 42's *Ready, Set, Bool!*: twelve
exercises on boolean algebra and set theory, packaged as a C++17 static library
with one source file and one Catch2 test file per exercise, built with CMake.

The centre of the project is a small propositional-logic engine, `Proposition`.
It parses reverse Polish notation into a binary expression tree with a stack,
validating tokens and operator arity in the node constructor and freeing
everything already allocated before throwing on malformed input. Five exercises
are built on that one tree: evaluation, truth tables, negation normal form,
conjunctive normal form and satisfiability. NNF is term rewriting, eliminating
`=`, `>` and `^`, pushing negation inward with De Morgan and cancelling double
negations; CNF then distributes `|` over `&` and right-associates chains so the
output matches the subject's canonical strings. `eval_set` reuses the same tree,
interpreting `&`, `|` and `!` as `std::set_intersection`, `set_union` and
complement against the union of all inputs.

The arithmetic exercises are done at gate level: a 32-stage ripple-carry adder
built from full adders, themselves built from two half adders, and a shift-and-
add multiplier on top of it, with no `+` or `*` on integers. The space-filling
curve interleaves two 16-bit coordinates into a 32-bit Morton code and scales it
into [0, 1]; the inverse de-interleaves it, and the test pushes 100 random pairs
through the round trip and requires exact equality.

Every exercise has tests with the subject's examples plus edge cases, registered
individually with CTest through `catch_discover_tests`, and the code compiles
with `-Wall -Wextra -Werror` with a clang-tidy configuration checked in.

Limitations: CNF distribution only handles a conjunction as the right operand of
`|` (which covers all the subject's cases), SAT and truth tables are brute force
over 2^n assignments, and tree nodes are managed with raw pointers and explicit
`delete`.

**Language:** C++  
**Size:** about 1,186 lines in 27 source files  
**Build:** cmake  
**Tests:** Catch2 v3, 22 test cases in 12 files, registered with CTest via catch_discover_tests  
**Started:** 2023-12 · **Last activity:** 2024-01
