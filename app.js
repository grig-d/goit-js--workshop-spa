const express = require('express');
const exhbs = require('express-handlebars'); // импортируем библиотеку express-handlebars

const app = express(); // вызываем функцию экспресс, она возвращает нам объект, методами которого можно создать веб-сервер

// по умолчанию express использует шаблонизатор pug и поэтому его надо перерегистрировать
app.set('view engine', 'hbs');
// и настроить
app.engine('hbs', exhbs({ extname: 'hbs' }));

// прописываем маршруты - регистрация слушателя входящего соединения
// http://localhost:4444/
app.get('/', (req, res) => {
  res.render('home');
});
// http://localhost:4444/about
app.get('/about', (req, res) => {
  res.render('about');
});
// http://localhost:4444/products
app.get('/products', (req, res) => {
  res.render('products');
});

// слушаем порт 4444 локально
app.listen(4444, () => {
  console.log('Application server is running on port 4444');
});

// 57-06

/*
пишем application server, который будет слушать запросы и генерировать страничку

npm init -y

устанавливаем expressjs (https://expressjs.com/):
npm install express

чтобы не перезапускать сервер после каждого изменения в файле ставим пакет
npm i nodemon -D
и меняем в файле package.json
  "scripts": {
    "dev": "nodemon app.js"
  },

создаём файл app.js в корне
затягиваем в него экспресс:
const express = require('express');

вызываем функцию экспресс, она возвращает нам объект, методами которого можно создать веб-сервер
const app = express();

слушаем порт 4444 локально
app.listen(4444, () => {
  console.log('Application server is running on port 4444');
});

запускаем в терминале порт
node app.js

эту же команду вписываем в package.json
  "scripts": {
    "dev": "node app.js"
  },

прописываем маршруты - регистрация слушателя входящего соединения
req - request запрос, res - response ответ
app.get('/', (req, res) => {})
app.get('/about', (req, res) => {})
заходим в браузере на localhost:4444
в терминале смотрим ответ

ставим express-handlebars
npm install express-handlebars

создаём в корне папку views, а в ней layouts

импортируем библиотеку express-handlebars
const exhbs = require('express-handlebars'); 

по умолчанию express использует шаблонизатор pug и поэтому его надо перерегистрировать
app.set('view engine', 'hbs');
и настроить
app.engine('hbs', exhbs({ extname: 'hbs' }));

по умолчанию используется путь views/layouts/main.hbs


*/
