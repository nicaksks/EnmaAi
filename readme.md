| METHOD  | GROUP    | ENDPOINT     | QUERY           |  OPTIONAL    |
| ------  | -------- | ------------ | --------------- | ------------ |
| **GET** | **/api** | **/episode/:anime/:episode**   ||             |
| **GET** | **/api** | **/release** |                 |              |
| **GET** | **/api** | **/images/:slug/:episode**     |              |              |
| **GET** | **/api** | **/images/:type/thumbail/:slug**|             |              |
| **GET** | **/api** | **/calendar**| **?d=[int]**    |              |
| **GET** | **/api** | **/anime**   | **?q=[string]** | **&p=[int]** |
| **GET** | **/api** | **/search**  | **?q=[string]** | **&p=[int]** |

# Description (Query)
* **q** - Anime name;
* **p** - Page size;
* **d** - 0~6 (day of the week)

# Errors
* **anime.not.found**
* **episode.not.found**
* **unknown**

# Credits
* Todos os créditos vão para a equipe do **[Anroll](https://www.anroll.net/)**<br>
Fiz esse projetinho apenas para passar o tempo