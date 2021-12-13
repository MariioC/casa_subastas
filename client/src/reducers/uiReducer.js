import { types } from "../types/types";

const initialState = {
    loading: false,
    error: null,
    success: null
}

export const uiReducer = ( state = initialState, action ) => {

    switch (action.type) {
        case types.uiShowError:
            return {
                ...state,
                error: action.payload
            };

        case types.uiRemoveError:
            return {
                ...state,
                error: null
            };

        case types.uiShowSuccess:
            return {
                ...state,
                success: action.payload
            };

        case types.uiRemoveSuccess:
            return {
                ...state,
                success: null
            };

        case types.uiStartLoading:
            return {
                ...state,
                loading: true
            };

        case types.uiFinishLoading:
            return {
                ...state,
                loading: false
            };

        default:
            return state;
    }

}
