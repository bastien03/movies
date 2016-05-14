function reducer(state = {}, action) {
    if (action.type === 'LOAD_MOVIES') {
        return {
            movies: action.data.movies,
            directors: action.data.directors,
            links: action.data.links
        }
    } else if (action.type === 'LOAD_MOVIE') {
        console.log('reducer:LOAD_MOVIE', action)
        return {
            movies: state.movies,
            directors: state.directors,
            links: state.links,
            movie: action.data
        }
    } else if (action.type === 'USER') {
        return {
            movies: state.movies,
            movie: state.movie,
            directors: state.directors,
            links: state.links,
            isAuthenticated: action.data
        }
    } else if (action.type === 'REQUEST_CURRENT_MOVIE'){
        return Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false
        })
    } else if (action.type === 'RECEIVE_CURRENT_MOVIE'){
        return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            movie: action.movie,
            lastUpdated: action.receivedAt
        })
    } else {
        return state;
    }

}

export default reducer