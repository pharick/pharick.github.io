---
title: "ft_transcendence: multiplayer Pong with NestJS and Socket.IO"
date: 2022-04-15
type: project
summary: "Pong website with 42 OAuth, TOTP 2FA, server-side physics over Socket.IO, rank-based matchmaking, spectating and role-based chat; NestJS, Next.js, PostgreSQL."
tags: [typescript, nestjs, nextjs, socketio, postgresql, 42]
links:
  - label: Repository
    url: https://github.com/pharick/ft_transcendence
---

I built ft_transcendence as the final project of the École 42 common core: a
Pong website where people log in through the 42 intranet, play ranked or
friendly games in the browser, watch other games live, and talk in chat rooms.
The stack is fixed by the subject (NestJS, a TypeScript frontend, PostgreSQL)
and everything starts with one docker-compose command behind an nginx reverse
proxy.

The part I cared most about is the game loop. All physics runs on the server in
a `GameProcessor` class that ticks every 40 ms; the gateway broadcasts a frame
to a Socket.IO room per game and the browser only draws it on a canvas and sends
key events. Paddle rebounds depend on where the ball hits, and barriers in the
two harder modes are checked by interpolating the ball's path between frames so
a fast ball cannot pass through them. Presence is derived from socket rooms
rather than a table: a game pauses when a player's socket leaves its room and
resumes when both are back, and the same rooms answer online / in-game / offline
for profiles.

Authentication is 42 OAuth plus optional TOTP. I put a `secondFactorChecked`
claim into the JWT and registered two Passport strategies, so the 2FA endpoint
accepts a first-step token while every other route rejects it when 2FA is on.
Matchmaking keeps a queue bucketed by rank and pairs same-rank players every
five seconds, falling back to the nearest bucket. Chat rooms have public,
private, password-protected and direct types, owner/admin roles, and timed bans
and mutes checked on every connect and message.

The code is organised as one Nest module per concern (auth, users, games,
matchMaking, pendingGames, completedGames, chat, friends, notifications,
userStatus) with ESLint and Prettier on both packages. Limitations are honest
ones: running games and the queue live in memory, the schema is created with
TypeORM `synchronize`, and the only Jest spec is the Nest scaffold, so the game
and chat logic have no automated tests.

**Language:** TypeScript  
**Size:** about 7,200 lines in 120 source files  
**Build:** docker-compose  
**Tests:** Jest configured; only the NestJS scaffold e2e spec  
**Started:** 2022-04 · **Last activity:** 2022-10
