---
title: "olimp-coding: sorts, binary search and graphs in C++"
date: 2018-12-09
type: course
summary: "33 olympiad-style C++ solutions: three-way quicksort, quickselect, binary search on the answer, DFS/BFS, topological sort, Dijkstra and Bellman-Ford."
tags: [cpp, algorithms, graphs, competitive-programming]
links:
  - label: Repository
    url: https://github.com/pharick/olimp-coding
---

In March 2019 I worked through an olympiad-programming problem set in C++: 33
stdin/stdout programs in eight folders, starting with quadratic sorts and ending
with shortest paths. Each file is a complete solution to one task, written in
contest style with fixed-size global arrays and no input validation.

The pieces I think are worth reading are the ones where the algorithm had to be
adapted rather than copied. The quicksort uses a random pivot and a three-way
partition so duplicate-heavy inputs stay fast, and the same partition is reused
as quickselect on ten million generated elements. The binary-search folder moves
from searching arrays to searching over the answer: the "aggressive cows" task
bisects the minimum gap with a greedy feasibility check. In the graph section,
tree detection uses three-colour DFS with parent tracking, basins on a height
map are counted with two DFS passes in finishing order, and the maze task builds
a weighted graph with unit edges plus "slide until a wall" edges before running
Bellman-Ford.

The Bellman-Ford solution runs the n-1 relaxation rounds, then one more round to
detect a negative cycle, and walks parent pointers back to print the cycle's
vertices.

There are no build files; every program compiles alone with a C++11 compiler.
Two of the binary-search tasks were left unfinished. I keep the repository as a
record of where I started with algorithms.

**Language:** C++  
**Size:** about 1,836 lines in 33 source files  
**Started:** 2018-12 · **Last activity:** 2019-03
