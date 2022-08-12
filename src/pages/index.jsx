import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import store from '../redux/store';
import 'adesign-react/libs/style.css';
import './reset.less';
import './index.less';
import './public.less';

import App from './App';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'),
);