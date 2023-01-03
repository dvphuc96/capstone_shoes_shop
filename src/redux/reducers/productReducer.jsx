import { createSlice } from "@reduxjs/toolkit";
import { https } from "../../util/config";

const initialState = {
  arrProduct: [
   
  ],
  productDetail:null,
  arrCart:[]
 
}
   


const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    getAllProductApi: (state, action) => {
      state.arrProduct = action.payload;
    },
    getDetailProductAction:(state,action)=>{
      state.productDetail=action.payload;
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
    deleteCartAction: (state, action) =>{
        console.log(action);
        const newCarts = state.arrCart.filter(cart => cart.id !== action.payload)
        state.arrCart = newCarts
    }
  },
});
export const getProductApi = () => {
  return async (dispatch2) => {
    const result = await https.get('api/product')
    const action = getAllProductApi(result.data.content);
    dispatch2(action);
  };
};
export const {getAllProductApi, getDetailProductAction, getCartsAction, getNewCartsAction, deleteCartAction} = productReducer.actions;

export default productReducer.reducer;
export const getDetailProductApi=(id)=>{
  return async(dispatch)=>{
    const result = await https.get(`/api/product/getbyid?id=${id}`);
    const action = getDetailProductAction(result.data.content);
    dispatch(action)
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
export const deleteCart = (id) =>{
  return async (dispatch) =>{
      const action = deleteCartAction(id)
      dispatch(action)
  }
}
