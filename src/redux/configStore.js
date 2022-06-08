import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import posts from "./modules/posts";

const middlewares = [thunk];

// reeducer + options 모아 놓은 것
const rootReducer = combineReducers({ posts: posts });

// middleware의 모음
const enhancer = applyMiddleware(...middlewares);

// rootReducer를 한번에 모아 store 생성
const store = createStore(rootReducer, enhancer);

export default store;
