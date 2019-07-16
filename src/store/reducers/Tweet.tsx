import * as ActionTypes from '../actions/Tweet';

const InitialState = {
    commentMessages: [{id:'',value:''}]
}

const TweetReducer = (state = InitialState, action: any) => {
    let newState;
    switch (action.type) {
        case ActionTypes.ADD_TWEET:
            newState = {
                ...state,
                commentMessages: action.value,
            };
            return newState;
        case ActionTypes.DELETE_TWEET:
            const deleteTweet = state.commentMessages.filter((item) => item.id !== action.id)
            newState = {
                ...state,
                commentMessages: deleteTweet,
            };
            return newState;

        case ActionTypes.EDIT_TWEET:
            const editedValue = state.commentMessages.map(item => {
                if (item.id === action.item.id) {
                    item.value = action.item.value;
                    return item;
                }
                else
                    return item;
            });
            newState = {
                ...state,
                commentMessages: editedValue
            }
            return newState;
        default:
            return state;
    }

}
export default TweetReducer;