
const ADD_TO_CART = 'posts/cart'
const GET_ALL_CART = 'posts/seecart'
const DELETE_FROM_CART = 'posts/delatecart'
const EMPTY_CART= 'posts/empty'

const addToCartAction = (payload) => {
    return {
       type: ADD_TO_CART,
       payload
   }
}
const getAllcartAction = (payload) => {
    return {
       type: GET_ALL_CART,
       payload
   }
}
const delteFromCartAction = (payload) => {
    return {
       type: DELETE_FROM_CART,
       payload
   }
}
const emptyCartAction = (payload) => {
    return {
       type: EMPTY_CART,
       payload
   }
}

export const addToCartThunk = (product) => async dispatch =>{
    const cart = localStorage.getItem('cart')?
     JSON.parse(localStorage.getItem('cart')): []

    // const dupes = cart.filter(cartProduct => cartProduct.id === product.id)

    // if (dupes.length === 0){
        const addProduct = {
            ...product,
            count:1,
        }
    cart.push(addProduct)

    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch(addToCartAction(cart))
    // }
}
export const deleteOneFromCartAction = (product) => async dispatch =>{
    const cart = localStorage.getItem('cart')?
     JSON.parse(localStorage.getItem('cart')): []


    // if (dupes.length === 0){
    const cartMapped = cart.map(e => e.id)
    const array = []
    for(let i = 0 ; i<cart.length; i++){
        if (cartMapped[i]==product.id){
            array.push(i)
        }
    }
    const indexOfProduct = cartMapped.indexOf(product.id);
    
    
    cart.splice(array[array.length-1],1)
    console.log("cart after",cart)

    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch(addToCartAction(cart))
    // }
}

export const getAllcartThunk = () => async dispatch =>{
    const cart = localStorage.getItem('cart')?
    JSON.parse(localStorage.getItem('cart')): []
    dispatch(getAllcartAction(cart))
    return cart
}
export const deleteFromCartThunk = (product) => async dispatch =>{
    const cart = localStorage.getItem('cart')?
     JSON.parse(localStorage.getItem('cart')): []

    const cartUpdated = cart.filter(cartProduct => cartProduct.id !== product.id)

    localStorage.setItem('cart', JSON.stringify(cartUpdated))
    dispatch(delteFromCartAction(cartUpdated))
}
export const emptyCartThunk = () => async dispatch =>{
    const cart = localStorage.getItem('cart')?
     JSON.parse(localStorage.getItem('cart')): []

    const cartUpdated = []

    localStorage.setItem('cart', JSON.stringify(cartUpdated))
    dispatch(delteFromCartAction(cartUpdated))
}

let initialState = {
    cart:[]
}

if (localStorage.getItem('cart')){
    initialState.cart = JSON.parse(localStorage.getItem('cart'))
} else {
    initialState.cart = []
}

const cartReducer = (state = initialState , action) =>{
    let newState = {}
    switch(action.type){
        case ADD_TO_CART:{
            newState = {...state}
            newState.cart =[...action.payload]
            return newState
        }
        case GET_ALL_CART:{
            newState = {...state}
            newState.cart =[...action.payload]
            return newState
        }
        case DELETE_FROM_CART:{
            newState = {...state}
            newState.cart =[...action.payload]
            return newState
        }
        default: {
            return state
        }
    }
}

export default cartReducer