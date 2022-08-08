
import { useCallback, useMemo } from 'react';
import {counter} from './utils.js';

class Store {

  constructor(initState) {
    // Состояние приложения (данные)
    this.state = initState;
    // Слушатели изменений state
    this.listners = [];
  }

  /**
   * Выбор state
   * @return {Object}
   */
  getState() {
    return this.state;
  }
  /* Выбор товаров в корзине */
  getBasket() {
    return this.state;
  }

  /**
   * Установка state
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Оповещаем всех подписчиков об изменении стейта
    for (const lister of this.listners) {
      lister();
    }
  }

  /**
   * Подписка на изменение state
   * @param callback {Function}
   * @return {Function} Функция для отписки
   */
  subscribe(callback) {
    this.listners.push(callback);
    // Возвращаем функцию для удаления слушателя
    return () => {
      this.listners = this.listners.filter(item => item !== callback);
    }
  }


  setSum(sum) {
    this.setState({
      ...this.state,
      sum: sum
    })
  }


/* Определяю количество повторяющихся элементов и создаю новый объект */
  myModal(){
    const intermediateBasket = this.state.basket;
    let count=[];
    let quantity={}; /* Объект содержит количество и тип товаров в корзине */
    let result=[]; /* Новый массив с данными, который идет на формирование модального окна корзины*/
    intermediateBasket.forEach((item) => {
      count.push(item.title)
    })
  /* Создаю объект массивов с товарами и количеством их повторений */
    for (let elem of count) {
        if (quantity[elem] === undefined) {
          quantity[elem] = 1;
        } else {
          quantity[elem]++;
        }
    }
    let myArray = Object.entries(quantity) /* Преобразую объект с данными о количестве товаров в массив */

    /* Создаю новый массив, но уже отфильтрованный с не повторяющимися товарами, но с указанием какое количество их выбрано */
    if(myArray.length !== 0) {
      for(let i = 0; i < myArray.length; i++) {
      let itemBasket = (intermediateBasket.find(item => {
            return item.title === myArray[i][0] 
          }))
        itemBasket.quantity = myArray[i][1]
        result.push(itemBasket)
        }
      }
      return result;
  }

  /**
   * 
   * @param code
   */

/* Модуль удаления товара из корзины */
  eraseProduct(e) {
      let title = e.target.getAttribute("data-title")
        this.setState({
          ...this.state,
          basket: this.state.basket.filter(item => item.title !== title)
        })
      
  }

  // Добавляю выбранный продукт в корзину, а также открываю и закрываю модальное окно
  addProduct(e) {

    try {
      const product = e.target;
      const code = counter();
      const title = product.getAttribute('data-title');
      const price = Number(product.getAttribute('data-price'));
      const intermediateBasket = this.state.basket;

      /* Все кидаю в корзину */
        this.setState({
            ...this.state,
            basket: this.state.basket.concat({code, title, price})
          })
 
      
    } catch (error) {
    /* Модуль открытия или закрытия модального окна корзины */  
    }
    if(e === true) {
      this.setState({
        ...this.state,
        modal: true
      })
    }
    if(e === false) {
      this.setState({
        ...this.state,
        modal: false
      })
    }
  }


}

export default Store;
