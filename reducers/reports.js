import { getData } from '../pages/api/api'

/* reducer init */
const initialState = {
    collection: [],
}

/* Pure function reducer, return new state with updated data */
export default function reportsReducer(state = initialState, action) {
    switch (action.type) {
        case 'LOAD_REPORTS':
            return Object.assign({}, state, { collection: action.result })
    }
    return state
}

/* Action - load */
export const loadReports = (query, sortAsc = true) => async dispatch => {
    let result = await getData()
    if (query) {
        result = result.filter(r => r.name.toUpperCase().includes(query.toUpperCase()))
    }

    let compare = sortAsc ? 1 : -1
    result = result.sort((a, b) => (a.name > b.name) ? 1 * compare : -1 * compare)

    console.log(query, result)
    dispatch({
        type: 'LOAD_REPORTS',
        result,
    })
}
