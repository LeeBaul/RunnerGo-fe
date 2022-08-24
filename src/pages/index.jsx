import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import ReactDOM from 'react-dom';
import store from '../redux/store';
import 'adesign-react/libs/style.css';
import './reset.less';
import './index.less';
import './public.less';
import './geetest.less';

import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
);