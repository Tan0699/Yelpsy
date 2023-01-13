const GET_PURCHASES= 'purchase/get'
const ADD_PURCHASE = 'posts/add'

const getAllPurchasesAction = payload => {
    return {
        type: GET_PURCHASES,
        payload
    }
}
const addPurchaseAction = payload => {
    return {
        type: ADD_PURCHASE,
        payload
    }
}

export const fetchPurchases = (userId) => async dispatch => {
    const res = await fetch(`/api/purchases/${userId}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllPurchasesAction(data));
        return data
    }
}

export const addPurchaseThunk = (payload) => async dispatch => {
    const response = await fetch(`/api/purchases/new_purchase`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        if (response.ok) {
            const data = await response.json()
            await dispatch(addPurchaseAction(data))
            return data
        }  else if (response.status < 500) {
            const data = await response.json();
            if (data.errors) {
              return data.errors;
            }
          } else {
            return ['An error occurred. Please try again.']
          }
    }

const initialState = {}
const purchaseReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case GET_PURCHASES: {
            action.payload.purchases.forEach(purchase => {
                newState[purchase.id] = purchase
            })
            return newState
        }
        case ADD_PURCHASE:{
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        default: {
            return state;
        }
    }
}
export default purchaseReducer