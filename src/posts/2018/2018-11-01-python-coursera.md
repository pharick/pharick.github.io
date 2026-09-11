---
title: "python-coursera: 203 exercises from an intro Python course"
date: 2018-11-01
type: course
summary: "Nine weeks of Coursera Python 3 exercises: recursion, sorting by hand, sets and dicts, functional one-liners, and a Matrix class with operator overloading."
tags: [python, coursera, algorithms, oop]
links:
  - label: Repository
    url: https://github.com/pharick/python-coursera
---

This repository holds my solutions to the weekly exercises of an introductory
Python 3 course on Coursera, completed in March 2019: 203 scripts in nine
folders, one per task, each reading `input()` or `input.txt` and printing an
answer for the automatic grader.

The weeks follow the usual arc - arithmetic, conditionals and loops, floats and
strings, functions and recursion, lists, sorting, sets and dictionaries,
functional tools, classes. I wrote the sorting algorithms by hand where the
course asked for it (the merge step, counting sort) and used `sorted` with key
functions elsewhere, for example a two-key stable sort in the largest-remainder
seat allocation task. Recursion shows up in gcd, exponentiation by squaring with
negative exponents, binomial coefficients and a four-line Towers of Hanoi.

The last week is the most structured piece: a `Matrix` class with `__add__`,
`__mul__` and `__rmul__`, `__str__`, an in-place `transpose` next to a static
`transposed`, and a `MatrixError` exception that carries both operands when
shapes do not match. The grader drives it with `exec(stdin.read())`, so the file
defines the class and nothing else. Week eight is the opposite style: `map`,
`zip`, `lambda` and `itertools` one-liners.

This is beginner-era code with no tests and I keep it as a record. It is
beginner-era code kept as a record rather than polished later.

**Language:** Python  
**Size:** about 2,500 lines in 203 source files  
**Started:** 2018-11 · **Last activity:** 2019-03
