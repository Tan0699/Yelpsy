
const ADD_TO_CART = 'posts/cart'
const addToCartAction = (payload) => {
    return {
       type: ADD_TO_CART,
       payload
   }
}

export const addToCartThunk = product => async(dispatch) =>{
    const cart = localStorage.getItem('cart')?
     JSON.parse(localStorage.getItem('cart')): []

    const dupes = cart.filter(cartItem => cartItem._id === product._id)

    if (dupes.length === 0){
        const addProduct = {
            ...product,
            count:1,
        }
    

    cart.push(addProduct)

    localStorage.setItem('cart', JSON.stringify(cart))
    dispatch(addToCartAction(cart))
    }
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
    switch(action.type){
        case ADD_TO_CART:
            return {
                cart:[...action.payload]
            }
            default: return state
    }
}

export default cartReducer