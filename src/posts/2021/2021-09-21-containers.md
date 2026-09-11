---
title: "containers: STL containers rebuilt in C++98"
date: 2021-09-21
type: project
summary: "Header-only C++98 reimplementation of list, vector, map, set and stack with a red-black tree, custom iterators and SFINAE-guarded range overloads."
tags: [cpp, 42, stl, red-black-tree, templates]
links:
  - label: Repository
    url: https://github.com/pharick/containers
---

I reimplemented std::list, std::vector, std::map, std::set and std::stack in
C++98 for the École 42 ft_containers project. The containers are header-only
templates in namespace ft that mirror the C++98 interface of their std::
counterparts: the same typedefs, default/fill/range/copy constructors, allocator
support, relational operators and swap.

The most involved part is the red-black tree behind map and set. Nodes carry
parent pointers, and a sentinel end node sits above the root, so end() can be
decremented and in-order iteration walks parent links without a stack. Insertion
is a BST insert followed by the standard recolour-or-rotate fix-up. I kept each
node's value in separately allocated storage so that pair<const Key, T> can live
in the tree and be replaced through the allocator in the two-child erase case.

Making the interfaces behave like the standard ones without C++11 took some
template work. Each iterator is one template parameterised on pointer and
reference type, so iterator and const_iterator share code and convert one way,
and the range constructors are guarded by a home-made enable_if plus is_integral
and an iterator-category trait, so that vector<int> v(5, 42) does not pick the
iterator overload. vector doubles its capacity on overflow and moves elements
through the allocator; list is circular with a sentinel, O(1) splice and a merge
sort; stack adapts vector.

For testing I wrote one 1,181-line program and kept two copies, one including
ft:: and one std::; the Makefile builds both so their outputs can be diffed.
Everything compiles with -Wall -Wextra -Werror -std=c++98, every public method
has a doc comment, and the headers total about 4,500 lines.

Known gaps: insert with a hint ignores the hint, list::size walks the list, and
there is no multimap, multiset or deque.

**Language:** C++  
**Size:** about 6,846 lines in 16 source files  
**Build:** make  
**Tests:** main_ft.cpp and main_std.cpp: identical test programs against ft:: and std::, outputs compared with diff  
**Started:** 2021-09 · **Last activity:** 2026-02
