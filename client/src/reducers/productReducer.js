import {
    ALL_PRODUCT_FAILURE,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERROR,
    PRODUCT_FAILURE,
    PRODUCT_SUCCESS,
    PRODUCT_REQUEST
} from "../constants/productConstants"

export const productReducer = (state = { products: [] },action) => {

        switch (action.type) {
            case ALL_PRODUCT_REQUEST:
                return {
                    loading: true,
                    products: []
                }
            case ALL_PRODUCT_SUCCESS:
                return {
                    loading: false,
                    products: action.payload.products,
                    productsCount: action.payload.productsCount
                }

            case ALL_PRODUCT_FAILURE:
                return {
                    loading: false,
                    error: action.payload
                }


            case CLEAR_ERROR:
                return {
                    
                    products: null
                }
            default:
                return state
        }
    }

    export const productDetailsReducer = (state = { product: {},loading:null,error:null }, action) => {
        switch (action.type) {
          case PRODUCT_REQUEST:
            return {
              loading: true,
              ...state,
            };
          case PRODUCT_SUCCESS:
            return {
              loading: false,
              product: action.payload,
            };
          case PRODUCT_FAILURE:
            return {
              loading: false,
              error: action.payload,
            };
      
          case CLEAR_ERROR:
            return {
              ...state,
              error: null,
            };
          default:
            return state;
        }
      };

    