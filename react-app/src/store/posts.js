const ALL_POSTS = '/posts/all'
const ONE_POST = 'posts/one'
const CREATE_POST = 'posts/new'
const EDIT_POST = 'posts/edit'
const DELETE_POST = 'posts/delete'
const ALL_RANDOM = 'posts/random'
const SEARCH_POSTS = 'posts/search'

const getAllPostsAction = payload => {
    return {
        type: ALL_POSTS,
        payload
    }
}
const searchPostsAction = payload => {
    return {
        type: SEARCH_POSTS,
        payload
    }
}
const getAllRandomPostsAction = payload => {
    return {
        type: ALL_RANDOM,
        payload
    }
}
const getOnePostAction = payload => {
    return {
        type: ONE_POST,
        payload
    }
}
const editPostAction = (payload) => {
    return {
        type: EDIT_POST,
        payload
    }
}
const createPostAction = (payload) => {
    return {
        type: CREATE_POST,
        payload
    }
}
const deletePostAction = (id) => {
    return {
       type: DELETE_POST,
       id
   }
}

export const fetchPosts = () => async dispatch => {
    const res = await fetch(`/api/shops/posts/all`)
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllPostsAction(data));
        return data
    }
}
export const searchPosts = (payload) => async dispatch => {
    const res = await fetch(`/api/shops/search/${payload}`)
    if (res.ok) {
        const data = await res.json();
        dispatch(searchPostsAction(data));
        return data
    }
}
export const fetchRandomPosts = () => async dispatch => {
    const res = await fetch(`/api/shops/posts/all`)
    if (res.ok) {
        const data = await res.json();
        dispatch(getAllRandomPostsAction(data));
        return data
    }
}

export const fetchOnePost = (shopId,id) => async dispatch => {
    const res = await fetch(`/api/shops/${shopId}/posts/${id}`)
    if (res.ok) {
        const data = await res.json()
        dispatch(getOnePostAction(data))
        return data
    }
}

export const createPost = (payload,shopId) => async dispatch => {
    const response = await fetch(`/api/shops/${shopId}/posts/new_post`,{
        method: 'POST',
        body:payload
    })
    if (response.ok) {
        const data = await response.json()
        await dispatch(createPostAction(data))
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

export const editPost = (payload,shopId,id) => async dispatch => {
    const response = await fetch(`/api/shops/${shopId}/posts/${id}`, {
        method: "PUT",
        body:payload
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(editPostAction(data))
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

export const deletePost = (shopId,id) => async dispatch => {
    const response = await fetch(`/api/shops/${shopId}/posts/${id}`, {
        method: 'DELETE'
    });
    if(response.ok){
        dispatch(deletePostAction(id));
    }
}


const initialState = {}
const postReducer = (state = initialState, action) => {
    let newState = {}
    switch (action.type) {
        case ALL_POSTS: {
            action.payload.posts.forEach(post => {
                newState[post.id] = post
            })
            // const newnew = Object.values(newState)
            // newnew.sort((a,b) => 0.5 - Math.random());
            // return newnew
            return newState
        }
        case SEARCH_POSTS: {
            action.payload.posts.forEach(post => {
                newState[post.id] = post
            })
            return newState
        }
        case ALL_RANDOM: {
            action.payload.posts.forEach(post => {
                newState[post.id] = post
            })
            const newnew = Object.values(newState)
            newnew.sort((a,b) => 0.5 - Math.random());
            return newnew
            
        }
        case ONE_POST:{
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case CREATE_POST:{
            newState = {...state}
            newState[action.payload.id] = action.payload
            return newState
        }
        case EDIT_POST:{
            return {
                ...state,[action.payload.id]: action.payload
            }
        }
        case DELETE_POST:{
            newState = {...state}
            delete newState[action.id]
            return newState
        }
        default: {
            return state;
        }
    }
}
export default postReducer
