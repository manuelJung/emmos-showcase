import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createStore from 'store/createStore'

ReactDOM.render(<App store={createStore()} />, document.getElementById('root'));

