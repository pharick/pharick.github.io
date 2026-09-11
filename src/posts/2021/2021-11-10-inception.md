---
title: "Inception: a multi-container infrastructure"
date: 2021-11-10
type: project
summary: "nginx, MariaDB, WordPress, redis, FTP and a Flask app wired together with docker-compose."
tags: [42, docker, nginx, databases, wordpress, python]
links:
  - label: Repository
    url: https://github.com/pharick/inception
---

I set up a multi-container infrastructure with docker-compose as an École 42
project. It brings up MariaDB with adminer, nginx, a PHP/WordPress site, redis,
an FTP server and a Python Flask application served by gunicorn, all built from
a single make command.

**Language:** Dockerfile  
**Started:** 2021-11 · **Last activity:** 2023-06
