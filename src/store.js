
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

  /**
   * Создание записи
   */
  // createItem({code, title = 'Новая запись', selected = false}) {
  //   this.setState({
  //     ...this.state,
  //     items: this.state.items.concat({code, title, selected})
  //   });
  // }


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
   * Добавляю выбранный продукт в корзину, а также открываю и закрываю модальное окно
   * @param code
   */
  addProduct(e) {

    try {
      const product = e.target;
      const code = counter();
      const title = product.getAttribute('data-title');
      const price = Number(product.getAttribute('data-price'));
      const intermediateBasket = this.state.basket;

      /* Модуль удаления товара из корзины */
      if(product.textContent === "Удалить") {
        this.setState({
          ...this.state,
          basket: this.state.basket.filter(item => item.title !== title)
        })
      }

      /* Все кидаю в корзину */
        this.setState({
            ...this.state,
            basket: this.state.basket.concat({code, title, price})
          })
      

      /* Модуль проверки наличия в корзине выбранного товара */
      // if(intermediateBasket.length === 0) {
      //   const quantity = 1;
      //   this.setState({
      //       ...this.state,
      //       basket: this.state.basket.concat({code, title, price, quantity})
      //     })
      //     this.quantityAndPrice()
      // } else if (intermediateBasket.findIndex(item=>item.title === title) === -1) {
      //   const quantity = 1;
      //   this.setState({
      //     ...this.state,
      //     basket: this.state.basket.concat({code, title, price, quantity})
      //   })
      //   this.quantityAndPrice()
      // } else {
      //   const index = intermediateBasket.findIndex(item=>item.title === title)
      //   this.quantityAndPrice(index)
      //   this.setState({
      //     ...this.state,
      //     basket: [...this.state.basket[index].quantity++]
      //   })
      //   this.quantityAndPrice()
      // }
  
      
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



  /**
   * Выделение записи по её коду
   * @param code
   */
  // selectItem(code) {
  //   this.setState({
  //     ...this.state,
  //     items: this.state.items.map(item => {
  //       if (item.code === code){
  //         item.selected = !item.selected;
  //       }
  //       return item;
  //     })
  //   });
  // }
}

export default Store;
