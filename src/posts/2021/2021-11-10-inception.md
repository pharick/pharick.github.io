---
title: "inception: a seven-container docker-compose stack"
date: 2021-11-10
type: project
summary: "nginx (TLS 1.2/1.3 only), MariaDB, WordPress with Redis cache, Adminer, vsftpd and a Flask URL shortener, each built from Alpine and wired by docker-compose."
tags: [docker, docker-compose, nginx, devops, python, 42]
links:
  - label: Repository
    url: https://github.com/pharick/inception
---

I built inception, the École 42 infrastructure project: a small stack where
every service runs in its own container built from my own Dockerfile on Alpine
3.13, with nginx as the only entry point on port 443 and everything else on a
private Docker network. The mandatory part is nginx, WordPress with php-fpm and
MariaDB; for the bonus I added a Redis object cache for WordPress, an FTP server
onto the WordPress files, Adminer, and a service of my own choice, a Flask URL
shortener under gunicorn.

The pieces I spent the most care on are the ones that must come up correctly
from an empty volume. MariaDB is initialised at start with `mysql_install_db`,
then `mysqld --init_file` runs a script that creates both databases and their
users with passwords substituted from the environment by `sed`, followed by a
seeded WordPress dump, so the site is ready on first boot. WordPress downloads
the core tarball and the redis-cache plugin at build time and drops in `object-
cache.php`; `wp-config.php` points at the `redis` service. nginx generates a
self-signed certificate during the build, restricts protocols to TLS 1.2 and
1.3, speaks FastCGI to the WordPress and Adminer php-fpm containers and reverse-
proxies the shortener.

Secrets never end up in an image: they live in `srcs/.env`, reach containers
through `env_file`, and are injected at start by small `start.sh` scripts or
read from `os.environ` in Python. vsftpd forces TLS for logins and data, chroots
the user into the shared WordPress volume and pins passive ports so the compose
port mapping is exact. The Flask app uses a `ReverseProxied` WSGI wrapper to
work under the `/short_urls` prefix, keys links by a 5-byte blake2b digest and
protects its form with CSRF.

A Makefile wraps `docker-compose` with `start`, `stop`, `clean` and `re`. The
layout is tied to the 42 evaluation VM: volumes are bind mounts under
`/home/pharick/data`, the hostname `cbelva.42.fr` is hard-coded, and `clean.sh`
prunes every Docker resource on the machine.

**Language:** Dockerfile/Shell  
**Size:** about 600 lines in 27 source files  
**Build:** make  
**Platform:** Linux  
**Started:** 2021-11 · **Last activity:** 2023-06
