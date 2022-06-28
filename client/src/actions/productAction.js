import { PRODUCT_FAILURE, PRODUCT_SUCCESS, PRODUCT_REQUEST } from "../constants/productConstants"
import axios from "axios";

const getProductDetails = (id) => {

    console.log(id);
    return async (dispatch) => {
        try {
          dispatch({
            type:PRODUCT_REQUEST
          })

          const data=await axios.get(`/api/v1/product/${id}`)
          dispatch({
            type:PRODUCT_SUCCESS,
            payload:data.data.product
          })
        } catch (err) {
            dispatch({
                type:PRODUCT_FAILURE,
                payload:err.response.data.message
            })
        }
    }
}

export default getProductDetails;