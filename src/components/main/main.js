import React from 'react';
import { useEffect } from 'react';
import '../../style.css';
import plural from "plural-ru";



const Main = ({store}) => {
    let sum = store.state.sum;
    const {items} = store.getState();
    const {basket} = store.getBasket();
    let length = basket.length;

    useEffect(()=> {

            let sumAmount = 0;
            basket.forEach(item => {
                sumAmount +=Number(item.price);
            })
            store.setSum(sumAmount.toLocaleString())
           
        },[basket])

    return (
        <>
        <div className='App__head'>
            <h1>Магазин</h1>
        </div>
        <div className='Controls'>
        <div className="Controls__infoBlock">
        <div className="Controls__text">В корзине:</div>
        <div className="Controls__info">{length === 0 ? "пусто" : `${length} ${plural(length, 'товар', 'товара', 'товаров')} / ${sum}`}</div>
             {length !== 0 ? <p className='Controls__ruble'>&#8381;</p> : null}
        </div>
            <button className="Controls__button" onClick={() => {store.addProduct(true)}}> Перейти </button>
        </div>
        <div className='App__center'>
            <div className='List'>{items.map(item =>
                <div key={item.code} className='List__item'>
                    <div className={'Item'}>
                    <div className='Item__number'>{item.code}</div>
                    <div className='Item__title'>{item.title}</div>
                    <div className="Item__count">
                        <div className='Item__price'>{item.price}</div>
                        <p className='Item__ruble'>&#8381;</p>
                    </div>
                    <div className='Item__actions'>
                        <button onClick={(e) => store.addProduct(e)} data-title={item.title} data-price={item.price}>
                        Добавить
                        </button>
                    </div>
                    </div>
                </div>
                )}
            </div>
        </div>
      </>
    )
}

export default Main;