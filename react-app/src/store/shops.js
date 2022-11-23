const ALL_SHOPS = '/shops/all'

const getAllShopsAction = payload => {
    return {
        type: ALL_SHOPS,
        payload
    }
}

export const fetchShops = () => async dispatch => {
    const res = await fetch('/api/shops')
    if (res.ok) {
        const shops = await res.json();
        dispatch(getAllShopsAction(shops));
        return shops
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
            return newState
        }
        default: {
            return state;
        }
    }
}
export default shopReducer
