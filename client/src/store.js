import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import { productDetailsReducer, productReducer } from "./reducers/productReducer";





let initialState = {};
  
  const middleware = [thunk];

const reducer = combineReducers({
   productsArray:productReducer,
   productDetails:productDetailsReducer
});

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

 export default store; 