---
title: "minishell: a Bash-like shell in C with its own line editor"
date: 2021-09-21
type: project
summary: "A POSIX shell in C: tokenizer, $VAR expansion, pipelines via fork/pipe/dup2, redirections, seven built-ins, signal handling and a termcap line editor."
tags: [c, 42, unix, shell, posix]
links:
  - label: Repository
    url: https://github.com/pharick/minishell
---

I built a partial clone of Bash in C for the École 42 minishell project:
launching programs by path or through PATH, the built-ins echo, cd, pwd, export,
unset, env and exit, environment variables, pipes and redirections, line editing
and command history. The shell talks to the kernel through fork, execve, pipe,
dup2 and waitpid, and to the terminal through termios and termcap rather than
readline.

The parser runs in two stages. First the raw line is cut into tokens while
respecting quotes and backslashes, and tokens are grouped into commands tagged
DEFAULT or PIPE, so a dangling pipe or double semicolon is reported as a syntax
error before anything executes. Then, when a command is about to run, each token
is rewritten in place: quotes are removed, escapes resolved, and $NAME and $?
expanded (never inside single quotes). Redirections are folded into a small
read_fd/write_fd struct so built-ins can write to a file without forking.

Pipelines were the part I spent most time on. Each non-final stage forks with
its stdout on a fresh pipe and the parent moves its stdin to the read end; the
last stage forks and is waited for its status; afterwards stdin is restored from
a saved dup(0) and every child is reaped. Signals follow the same parent/child
split: at the prompt SIGINT reprints the prompt and clears the line buffer, and
while a child runs the parent ignores SIGINT and SIGQUIT so only the child dies,
with the exit status becoming 128 plus the signal.

The line editor puts the terminal in raw mode and decodes termcap key sequences
to support cursor movement, insertion in the middle of a line, backspace and
history navigation over a linked list. The code is written to the 42 norm and
built with -Wall -Wextra -Werror; it reuses my own libft.

Limitations: no heredocs, no && or ||, no globbing, expanded variables are not
word-split, and it was developed on macOS (it needs a termcap library
elsewhere).

**Language:** C  
**Size:** about 3,665 lines in 83 source files  
**Build:** make  
**Started:** 2021-09 · **Last activity:** 2023-06
