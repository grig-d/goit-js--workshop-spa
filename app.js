const express = require('express');
const exhbs = require('express-handlebars'); // импортируем библиотеку express-handlebars
const products = require('./products.json'); // это импровизированная база данных

// process - глобальная переменная в node.js
// env - свойство переменной
// process.env - окружение переменной
// в эту переменную окружения heroku будет передавать порт, а если локально - то 4444

const PORT = process.env.PORT || 4444;

const app = express(); // вызываем функцию экспресс, она возвращает нам объект, методами которого можно создать веб-сервер

app.use(express.static('public'));
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
  res.render('products', { products, cssFileName: 'products' }); // передаём объект из products.json
});

// динамический параметр
app.get('/product/:productId', (req, res) => {
  console.log(req.params);
  const product = products.find(prod => prod.id === req.params.productId);
  res.render('product', { product });
});

// слушаем порт 4444 локально
app.listen(PORT, () => {
  console.log(`Application server is running on port ${PORT}`);
});

/*
пишем application server, который будет слушать запросы, генерировать страничку и отдавать её в клиент

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

навигация сайта - это маршруты, а не готовые странички.html

как всё задеплоить:
в репо на GitHub запушить все изменения
нужен специальный хостинг (GitHub Pages не умеет это делать), который умеет запускать сервер
https://www.heroku.com/
-установить heroku cli (https://devcenter.heroku.com/articles/heroku-cli)
-залогиниться в терминале heroku login
-создать проект на heroku - в терминале heroku create
-проверить git remote -v
-в package.json обязательно надо сделать скрипт start:
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
-запушить все изменения на GitHub
-надо пушить ветку main(GitHub) в ветку master(heroku) командой git push heroku main:master
-параллельно в другом терминале можно запустить heroku logs --tail и смотреть логи релиза нашего приложения

т.е. heroku - это Server(железо) + Web-server(софт), который позволяет запустить наш Application-server
*/
