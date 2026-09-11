---
title: "mindopen: a Brainfuck interpreter in C++98"
date: 2021-09-21
type: project
summary: "Brainfuck interpreter in C++98: one instruction class per command, a bounded 30,000-cell tape, and tape or bracket errors reported as exceptions."
tags: [cpp, 42, interpreter, brainfuck]
links:
  - label: Repository
    url: https://github.com/pharick/brainfuck-interpreter
---

I wrote this Brainfuck interpreter, `mindopen`, at École 42 in C++98. It reads a
source file, turns it into a program once, and then executes it on a 30,000-cell
tape, with unknown characters, tape overruns and unbalanced loops all reported
as errors with a non-zero exit status.

Rather than a big `switch` in the run loop, I gave each of the eight commands
its own class implementing an `IInstruction` interface with `get_op()` and
`execute(Mindopen&)`. `Mindopen::pushInstruction` maps a character to a class
through a table of static factory functions kept in parallel with the op string
`"><+-.,[]"`, so adding or changing a command touches one table entry and one
class. Any non-whitespace character outside the set is rejected before execution
starts.

The machine keeps the tape as a `std::vector<char>` and the data pointer as an
iterator into it; moving past either end throws `OutOfMemoryException` instead
of walking off the buffer. Loops are implemented by the bracket instructions
themselves: `[` with a zero cell scans forward to its match counting nesting
depth, `]` with a non-zero cell scans backward, and running off the end of the
program during a scan throws `CycleException`, which is how unbalanced brackets
surface. Every class follows the Orthodox Canonical Form that the 42 C++ modules
require.

It builds with `-Wall -Wextra -Werror -std=c++98` and a Makefile that generates
dependency files; the `examples/` directory has a hello world in two forms and
the classic Sierpinski triangle program, which I used to check it.

Limitations: bracket matching is a linear scan on every jump rather than a
precomputed table, and balance is only checked when a jump is actually taken, so
`+[` finishes silently; comments inside programs are not tolerated because non-
command characters are errors; there are no automated tests beyond the example
programs.

**Language:** C++  
**Size:** about 541 lines in 7 source files  
**Build:** make  
**Tests:** none (four example .bf programs)  
**Started:** 2021-09 · **Last activity:** 2023-06
