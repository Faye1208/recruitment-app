import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import reducer from './reducer';
import registerServiceWorker from './registerServiceWorker';
import './config';
import './index.css';
import Login from './container/Login/Login';
import Register from './container/register/Register';
import BossInfo from './container/BossInfo/BossInfo';
import GeniusInfo from './container/GeniusInfo/GeniusInfo';
import AuthRoute from './component/AuthRoute/AuthRoute';
import Dashboard from './component/dashboard/dashboard';
import Chat from './component/chat/chat';

const store = createStore(reducer, applyMiddleware(thunk));

// const store = createStore(reducer, compose(
//     applyMiddleware(thunk),
//     window.devToolsExtension ? window.devToolsExtension() : () => {}
// ));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute />
                <Switch>
                    <Route path="/" exact component={Login} />
                    <Route path="/bossinfo" component={BossInfo}></Route>
                    <Route path="/geniusinfo" component={GeniusInfo}></Route>
                    <Route path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user" component={Chat} />
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
