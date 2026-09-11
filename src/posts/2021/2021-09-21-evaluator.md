---
title: "evaluator: shunting-yard expression calculator in C++98"
date: 2021-09-21
type: project
summary: "Tokenizes integer expressions with + - * / and parentheses, converts them to RPN with shunting-yard, and evaluates on a stack with a printed trace."
tags: [cpp, parsing, shunting-yard, rpn, cli]
links:
  - label: Repository
    url: https://github.com/pharick/evaluator
---

I built evaluator as a small C++98 command-line calculator: it takes an integer
arithmetic expression with `+ - * /` and parentheses, converts it to Reverse
Polish Notation with the shunting-yard algorithm, and evaluates it on a stack
while printing every step, so the whole path from text to result is visible.

I split it into three stages in separate translation units, each taking and
returning a `std::queue<IToken*>`: `parse.cpp` tokenizes, `postfix.cpp`
reorders, `evaluate.cpp` runs the stack machine. Tokens are polymorphic
(`Number`, `Operator`, `ParenthesisOpen`, `ParenthesisClose` behind an `IToken`
interface) and stages dispatch with `dynamic_cast`. Keeping the stages
independent meant I could print the token stream and the postfix stream from
`main` and check each one separately.

The part that needed the most care was the tokenizer's handling of signs. After
stripping whitespace, every operator and parenthesis gets padded with spaces
except a `+`/`-` that does not follow a digit or `)`; that sign stays attached
to the following number, so `2 * -3` becomes `Num(2) Op(*) Num(-3)` without a
separate unary-operator concept. Structural errors are checked in more than one
place: a `)` after `(` or after an operator is rejected up front, an unmatched
`)` is caught during conversion, a leftover `(` by a post-scan, and stack
underflow or leftover operands during evaluation, so `1 +` or `(1+2` end in
`Evaluation error` and exit status 1 rather than a number.

Evaluation is on `double`, so `7 / 2` gives `3.5` even though operands are
integers. Tokens are heap-allocated and freed once on both the success and error
paths. The build uses `-Wall -Wextra -Werror -std=c++98` with generated
dependency files.

Limitations: unary minus only works directly in front of a literal, so `-(2+3)`
fails; division by zero prints `inf`; integer overflow is not detected; and
there are no automated tests.

**Language:** C++  
**Size:** about 497 lines in 15 source files  
**Build:** make  
**Started:** 2021-09 · **Last activity:** 2023-06
