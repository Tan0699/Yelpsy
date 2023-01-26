const SEARCH_POSTS = 'posts/search'

const searchPostsAction = payload => {
    return {
        type: SEARCH_POSTS,
        payload
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

const initialState = {}
const searchReducer = (state = initialState, action) => {
    let newState = {
    }
    switch (action.type) {
        case SEARCH_POSTS: {
            action.payload.posts.forEach(post => {
                newState[post.id] = post
            })
            return newState
        }
        default: {
            return state;
        }
    }
}
export default searchReducer
