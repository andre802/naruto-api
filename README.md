# [Naruto API](https://naruto--api.herokuapp.com/)
---
### About
This is an API that provides information concerning Naruto, the manga series written by Masashi Kishimoto.

The information was parsed from the fandom website [naruto.wikia.com](https://www.naruto.wikia.com). 

---
### Technologies used

Production: Node, Express, note-fetch, node-html parser, mongodb, moongoose, dotenv, he, doenv

Development: jest, nodemon, supertest

---
### Routes

All routes are GET routes.

> * */characters*

> Gets list of all characters and length of list.

> * /characters:character

> Gets a single character, includes information such as images, jutsus, description, affiliation and so forth.

> * /clans

> Gets list of all clans and length of list.

> * /clans:clan

> Gets clan specified by parameter.

> * /jutsus

> Gets list of all jutsu names and length of list.

> * /jutsu:jutsu

> Gets a single jutsu, includes information such as users, summary, photo, and so forth.
