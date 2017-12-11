import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';
import reducer from './reducer';
import registerServiceWorker from './registerServiceWorker';
import './config';
import Login from './container/Login/Login';
import Register from './container/register/Register';
import AuthRoute from './component/AuthRoute/AuthRoute';

const store = createStore(reducer, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : () => {}
));

function Boss () {
    return <h2>Boss页面</h2>
}

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute/>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/boss" component={Boss}></Route>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
