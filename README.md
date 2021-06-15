# [Naruto API](https://naruto--api.herokuapp.com/)
---
### About
This is an API that provides information concerning Naruto, the manga series written by Masashi Kishimoto.

The information was parsed from the fandom website [naruto.wikia.com](https://www.naruto.wikia.com). 

---
### Technologies used

Production: Node, Express, note-fetch, node-html parser, mongodb, redis, heroku, moongoose, dotenv, he, doenv

Development: jest, nodemon, supertest

---
### Routes

All routes are GET routes.

> * */characters*

> Gets list of all characters and length of list.

> * */characters/:character*

> Gets a single character, includes information such as images, jutsus, description, affiliation and so forth.

> * */characters/affiliation/:affiliation*

> Gets list of characters of the specified affiliation (Akatsuki, Kara, etc). Try [here](https://naruto--api.herokuapp.com/characters/affiliation/Akatsuki)

> * */characters/nature/:nature*

> Retrieves characters of the specified nature type.

> * */characters/rank/:rank*

> Retrieves characters of the specified rank.

> * */characters/kekkeiGenkai/:kekkeiGenkai*

> Gets list of characters of the specified kekkei genkai (Sharingan, Boil Release, etc). Try [here](https://naruto--api.herokuapp.com/characters/kekkeigenkai/Sharingan)

> * */characters/classification/:classification*

> Gets list of characters of the specified classification.

> * */clans*

> Gets list of all clans and length of list.

> * */clans:clan*

> Gets clan specified by parameter.

> * */clans/affiliation/:affiliation*

> Gets list of clans of the specified affiliation.

> * */jutsus*

> Gets list of all jutsu names and length of list.

> * */jutsus/:jutsu*

> Gets a single jutsu, includes information such as users, summary, photo, and so forth. Try [here](https://naruto--api.herokuapp.com/jutsus/Rasengan)

> * */jutsus/nature/:nature*

> Retrieve list of jutsus of the specified nature type. Try [here](https://naruto--api.herokuapp.com/jutsus/nature/Water%20Release)

> * */jutsus/classification/:classification*

> Retrieve list of jutsus of the specified classification. (Genjutsu, Taijutsu, etc)

> * */jutsus/rank/:rank*

> Retrieve list of jutsus of the specified rank. (S-rank, A-rank, etc)
