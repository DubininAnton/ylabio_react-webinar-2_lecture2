
import React from 'react';
import './style.css';
import Main from './components/main/main.js';
import Modal from './components/modal/modal';

function App({store}) {

  return (
    <div className='App'>
      <Main store={store}/>
      <Modal store={store}/>
    </div>
  );
}

export default App;
