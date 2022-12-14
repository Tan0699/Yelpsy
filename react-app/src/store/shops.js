const ALL_SHOPS = '/shops/all'
const ONE_SHOP = 'shops/one'
const CREATE_SHOP = 'shops/new'
const EDIT_SHOP = 'shops/edit'
const DELETE_SHOP = 'shops/delete'
const CLEAR = 'shops/delete'


const getAllShopsAction = payload => {
    return {
        type: ALL_SHOPS,
        payload
    }
}
export const clearAction = () => {
    return {
        type: CLEAR,
      
    }
}
const getOneShopAction = payload => {
    return {
        type: ONE_SHOP,
        payload
    }
}
const editShopAction = (payload) => {
    return {
        type: EDIT_SHOP,
        payload
    }
}
const createShopAction = (payload) => {
    return {
        type: CREATE_SHOP,
        payload
    }
}
const deleteShopAction = (shopId) => {
    return {
       type: DELETE_SHOP,
       shopId
   }
}

export const fetchShops = () => async dispatch => {
    const res = await fetch('/api/shops/')
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllShopsAction(data));
        return data
    }
}

export const fetchOneShop = (shopId) => async dispatch => {
    const res = await fetch(`/api/shops/${shopId}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getOneShopAction(data))
        return data
    }
}

export const createShop = (payload) => async dispatch => {
    const response = await fetch('/api/shops/new_shop',{
        method: 'POST',

        // headers: {         //removed for AWS
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify(payload)
        body:payload
    })
    if (response.ok) {
        const data = await response.json()
        await dispatch(createShopAction(data))
        return data
    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const editShop = (payload,shopId) => async dispatch => {
    const response = await fetch(`/api/shops/${shopId}`, {
        method: "PUT",
        // headers: {  //DELETEING THIS FOR AWS
        //     "Content-Type": "application/json"
        // },
        // body: JSON.stringify(payload)
        body:payload
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editShopAction(data))
        return data
    }
    else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const deleteShop = (shopId) => async dispatch => {
    const response = await fetch(`/api/shops/${shopId}`, {
        method: 'DELETE'
    });
    if(response.ok){
        dispatch(deleteShopAction(shopId));
    }
}

const initialState = {}
const shopReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case ALL_SHOPS: {
            action.payload.shops.forEach(shop => {
                newState[shop.id] = shop
            })
            const newnew = Object.values(newState)
            newnew.sort((a,b) => 0.5 - Math.random());
            return newnew
        }
        case CLEAR: {
            return newState={}
        }
        case ONE_SHOP:{
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case CREATE_SHOP:{
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case EDIT_SHOP:{
            return {
                ...state,[action.payload.id]: action.payload
            }
        }
        case DELETE_SHOP:{
            newState = {...state}
            delete newState[action.shopId]
            return newState
        }
        default: {
            return state;
        }
    }
}
export default shopReducer
