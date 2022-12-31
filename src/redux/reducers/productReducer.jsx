import { createSlice } from "@reduxjs/toolkit";
import { https } from "../../util/config";

const initialState = {
  arrProduct: [
   
  ],
  productDetail:null
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
export const {getAllProductApi,getDetailProductAction} = productReducer.actions;

export default productReducer.reducer;
export const getDetailProductApi=(id)=>{
  return async(dispatch)=>{
    const result = await https.get(`/api/product/getbyid?id=${id}`);
    const action = getDetailProductAction(result.data.content);
    dispatch(action)
  }
}