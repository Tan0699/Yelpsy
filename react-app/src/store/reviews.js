const ALL_REVIEWS = '/reviews/all'
const ONE_REVIEW = 'reviews/one'
const CREATE_REVIEW = 'reviews/new'
const EDIT_REVIEW = 'reviews/edit'
const DELETE_REVIEW = 'reviews/delete'


const getAllReviewsAction = payload => {
    return {
        type: ALL_REVIEWS,
        payload
    }
}
const getOneReviewAction = payload => {
    return {
        type: ONE_REVIEW,
        payload
    }
}
const editReviewAction = (payload) => {
    return {
        type: EDIT_REVIEW,
        payload
    }
}
const createReviewAction = (payload) => {
    return {
        type: CREATE_REVIEW,
        payload
    }
}
const deleteReviewAction = (id) => {
    return {
       type: DELETE_REVIEW,
       id
   }
}

export const fetchReviews = () => async dispatch => {
    const res = await fetch(`/api/reviews/`)
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllReviewsAction(data));
        return data
    }
}

export const fetchOneReview = (id) => async dispatch => {
    const res = await fetch(`/api/reviews/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getOneReviewAction(data))
        return data
    }
}

export const createReview = (payload) => async dispatch => {
    const response = await fetch(`/api/reviews/new_review`,{
        method: 'POST',
        body:payload
    })
    if (response.ok) {
        const data = await response.json()
        await dispatch(createReviewAction(data))
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

export const editReview = (payload,id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: "PUT",
        body:payload
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editReviewAction(data))
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

export const deleteReview = (id) => async dispatch => {
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    });
    if(response.ok){
        dispatch(deleteReviewAction(id));
    }
}


const initialState = {}
const reviewReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case ALL_REVIEWS: {
            action.payload.reviews.forEach(review => {
                newState[review.id] = review
            })
            return newState
        }
        case ONE_REVIEW:{
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case CREATE_REVIEW:{
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case EDIT_REVIEW:{
            return {
                ...state,[action.payload.id]: action.payload
            }
        }
        case DELETE_REVIEW:{
            newState = {...state}
            delete newState[action.id]
            return newState
        }
        default: {
            return state;
        }
    }
}
export default reviewReducer