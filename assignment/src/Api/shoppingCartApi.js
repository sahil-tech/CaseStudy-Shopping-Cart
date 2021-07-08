import axios from 'axios'

export const fetchBanner = () => {
    const promise = axios.get('http://localhost:5000/banners')
    const banners = promise.then((response) => response.data)
    return banners
}
export const fetchCategory = () => {
    const promise = axios.get('http://localhost:5000/categories')
    const categories = promise.then((response) => response.data)
    return categories
}
export const fetchProduct = () => {
    const promise = axios.get('http://localhost:5000/products')
    const products = promise.then((response) => response.data)
    return products
}
export const cartApi = (user) => {
    let obj = { productId: user.id}
    let headers = { 'Content-Type': 'text/plain' }
    const promise = axios.post('http://localhost:5000/addToCart', obj, { headers: headers })
    const isSuccess = promise.then((response) => response.data)
    return isSuccess
}