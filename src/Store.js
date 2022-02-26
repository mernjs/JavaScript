import React from 'react'
import { combineReducers } from 'redux';
import { applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger';
import { reducer as formReducer } from "redux-form";

import CoreReducer from './reducers/CoreReducer'
import AuthReducer from './reducers/AuthReducer'

const appReducer = combineReducers({
	form: formReducer,
	core: CoreReducer,
	auth: AuthReducer
})

const rootReducer = (state, action) => {
    if (action.type === 'AuthReducer/logout') {
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
}

export default function configureCustomStore() {
    const reduxLogger  = createLogger();
    const store = createStore(rootReducer, applyMiddleware(reduxLogger))
    return {store}
}

export const { store } = configureCustomStore();