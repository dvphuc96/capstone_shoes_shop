import { createSlice } from "@reduxjs/toolkit";
import { https } from "../../util/config";

const initialState = {
  arrProduct: [],
  productDetail: null,
  arrCart: [],
  keyword: [],

}



const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductApi: (state, action) => {
      state.arrProduct = action.payload;
    },
    getDetailProductAction: (state, action) => {
      state.productDetail = action.payload;
    },
    getCartsAction: (state, action) => {
      state.arrCart = [...state.arrCart, action.payload]
    },
    getNewCartsAction: (state, action) => {
      const newCarts = state.arrCart.map(cart => cart.id === action.payload.id ? {
        ...cart,
        quantity: action.payload.quantity
      } : cart)
      state.arrCart = newCarts
    },
    deleteCartAction: (state, action) => {
      console.log(action);
      const newCarts = state.arrCart.filter(cart => cart.id !== action.payload)
      state.arrCart = newCarts
    },
    getListProductSearchAction: (state, action) => {
      state.keyword = action.payload
    },
    getListProductSearchByPriceAction: (state, action) => {
      state.keyword = action.payload
    }
  },
});

export const { getAllProductApi, getDetailProductAction, getCartsAction, getNewCartsAction, deleteCartAction, getListProductSearchAction } = productReducer.actions;
export default productReducer.reducer;

export const getProductApi = () => {
  return async (dispatch2) => {
    const result = await https.get('api/product')
    const action = getAllProductApi(result.data.content);
    dispatch2(action);
  };
};

export const getDetailProductApi = (id) => {
  return async (dispatch) => {
    try {
      const result = await https.get(`/api/Product/getbyid?id=${id}`)
      return dispatch(getDetailProductAction(result.data.content));
    } catch (err) {
      console.log(err)
    }
  }
}
export const addCarts = (cart) => {
  return async (dispatch) => {
    const action = getCartsAction(cart)
    dispatch(action)
  }
}
export const changeCartQuantity = (id, quantity) => {
  return async (dispatch) => {
    const payload = { id, quantity }
    const action = getNewCartsAction(payload)
    dispatch(action)
  }
}
export const deleteCart = (id) => {
  return async (dispatch) => {
    const action = deleteCartAction(id)
    dispatch(action)
  }
}
export const getListProductSearchApi = (keyword) => {
  return async dispatch => {
    const result = await https.get(`/api/Product?keyword=${keyword}`)
    const action = getListProductSearchAction(result.data.content)
    dispatch(action)
  }
}