import { call,take, put, takeEvery, takeLatest } from 'redux-saga/effects'
import {fetchBanner,fetchCategory, fetchProduct, cartApi} from '../../../Api/shoppingCartApi'


function* fetchBanners(action) {
   try {
       const user = yield call(fetchBanner);
       yield put({type: "FETCH_BANNERS_SUCCEED", payload: user})
   } catch (e) {
      console.log('error')
   }
}
function* fetchCategories(action) {
    try {
        const user = yield call(fetchCategory);
        yield put({type: "FETCH_CATEGORIES_SUCCEED", payload: user})
    } catch (e) {
       console.log('error')
    }
 }
 function* fetchProducts(action) {
    try {
        const user = yield call(fetchProduct);
        console.log('from saga',user)
        yield put({type: "FETCH_PRODUCTS_SUCCEED", payload: user})
    } catch (e) {
       console.log('error')
    }
 }
 function* addToCart(action) {
    try {
      const user = yield call(cartApi,action.payload)
      if(user){
        yield put ({type: "ADD_TO_CART", payload: action.payload})
      }
    } catch (e) {
       console.log('error')
    }
 }

export function* mySaga() {
  yield takeEvery("FETCH_CATEGORIES", fetchCategories);
  yield takeEvery("FETCH_BANNERS", fetchBanners);
  yield takeEvery("FETCH_PRODUCTS", fetchProducts);
  yield takeEvery("CART_API", addToCart);
}