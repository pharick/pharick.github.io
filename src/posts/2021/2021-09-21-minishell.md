---
title: "minishell: a small Bash clone in C"
date: 2021-09-21
type: project
summary: "Builtins, environment variables, pipes, redirections and line editing, written from scratch."
tags: [42, c, unix, shell]
links:
  - label: Repository
    url: https://github.com/pharick/minishell
---

I wrote Minishell, a command-line interpreter in C that is a partial Bash clone,
as an École 42 project. It launches programs by full path or via PATH,
implements the builtins echo, cd, pwd, export, unset, env and exit, handles
environment variables, pipes and redirections, and supports line editing and
command history.

**Language:** C  
**Started:** 2021-09 · **Last activity:** 2023-06
