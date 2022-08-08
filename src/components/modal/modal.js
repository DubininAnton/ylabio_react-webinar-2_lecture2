import React from 'react';
import './style.css';


const Modal = ({store}) => {
    const result = store.myModal();
    const modal = store.state.modal;
    let sum = store.state.sum;

    return (
        <>
        {
        modal ? <div className="Modal">
            <div className="Modal__header">
                <h2 className='Modal__header Modal__header_title'>Корзина</h2>
                <button className="Modal__header Modal__header_btn" onClick={()=>store.addProduct(false)}>Закрыть</button>
            </div>
            <div className='Modal__list'>{result.map((item, num) =>
                <div key={item.code} className='List__item'>
                    <div className='Item'>
                    <div className='Item__number'>{num+1}</div>
                    <div className='Item__title'>{item.title}</div>
                    <div className="Item__count">
                        <div className='Item__price'>{item.price}</div>
                        <p className='Item__ruble'>&#8381;</p>
                    </div>
                    <div className="Item__quantity">{item.quantity + " "+"шт"}</div>
                    <div className='Item__actions'>
                        <button onClick={(e) => store.eraseProduct(e)} data-title={item.title} data-price={item.price}>
                        Удалить
                        </button>
                    </div>
                    </div>
                </div>
                )}
                <div className="Modal__total">
                    <div className="Modal__totalWord">Итого</div>
                    <div className='Modal__sum'>{sum}</div>
                    <p className='Modal__ruble'>&#8381;</p>
                </div>
            </div>
        </div> : null
        }
        </>
        
    )

}

export default Modal;