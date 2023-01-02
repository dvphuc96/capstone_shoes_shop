import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productDetail: null,
};

const productReducer = createSlice({
  name: "productReducer",
  initialState,
  reducers: {
    setArrProductAction: (state, action) => {
      state.productDetail = action.payload
    }
  },
});

export const { setArrProductAction } = productReducer.actions;

export default productReducer.reducer;

export const getProductDetailApi = (productId) => {
  return async (dispatch) => {
    try {
      const result = await `https://shop.cyberlearn.vn/api/Product/getbyid?id=${productId}`
      const content = result.data.content
      const action = setArrProductAction(content)
      dispatch(action)
    } catch (err) {
      console.log(err);
    }
  }
}
