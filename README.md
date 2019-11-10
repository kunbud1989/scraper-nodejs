# Scraper Indonesian News Portal - NodeJS
![NodeJs](https://img.shields.io/badge/Node.js-v10.1.0-339933.svg?style=flat-square&logo=node.js) ![NPM](https://img.shields.io/badge/npm-v6.13.0-CB3837.svg?style=flat-square&logo=npm) ![Nginx](https://img.shields.io/badge/Nginx-v1.10.3-269539.svg?style=flat-square&logo=nginx) ![HTML](https://img.shields.io/badge/HTML-v5-E34F26.svg?style=flat-square&logo=html5) 

Dikarenakan kebutuhan untuk cleaning data semakin besar dan bervariasi, maka dibutuhkan tools yang lebih handal.

Di versi sebelumnya **Scrapper** sebelumnya menggunakan **Python** untuk mendapatkan informasi dari sebuah halaman web, pada versi ini developer mencoba untuk memanfaatkan **Google Extensions** yakni **[Reader View](https://add0n.com/chrome-reader-view.html)**.

**Reader View** sendiri memanfaatkan teknologi Readability Document untuk dapat melihat isi konten dari sebuah halaman **HTML**. Dikarenakan Readability berplatform Javascript, maka diputuskan untuk menggunakan **Node.js** untuk core engine ini.

## Teknologi
|Node.js|Python|
|---|---|
|[request] | requests |
|[cheerio] | BeautifulSoup |
|[jsdom] | - |
|[readability] | readability-py |
|[express] | gunicorn |


[request]: <https://github.com/request/request>
[cheerio]: <https://github.com/cheeriojs/cheerio>
[jsdom]: <https://github.com/jsdom/jsdom>
[readability]: <https://github.com/mozilla/readability>
[express]: <https://github.com/expressjs/express>