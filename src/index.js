import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.js';
import Store from "./store.js";
import {counter} from './utils.js';

const store = new Store({
  items: [
    {code: counter(), title: 'Название элемента', price: 100},
    {code: counter(), title: 'Книга про React', price: 770},
    {code: counter(), title: 'Конфета', price: 23},
    {code: counter(), title: 'Трактор', price: 7955320},
    {code: counter(), title: 'Телефон iPhone XIXV', price: 120000},
    {code: counter(), title: 'Карандаши цветные', price: 111},
    {code: counter(), title: 'Товар сюрприз', price: 0},
  ],
  basket:[],
  modal: false,
  sum:""
});

// Реакция на изменение store - повторный рендер приложения
store.subscribe(() => {
  ReactDOM.render(<App store={store}/>, document.body);
});

// Первый рендер (один раз)
ReactDOM.render(<App store={store}/>, document.body);
