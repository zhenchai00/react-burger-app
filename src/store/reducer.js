import * as actionTypes from "./actions";

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice: 4,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedCountAdd =
                (state.ingredients[action.ingredientName] || 0) + 1;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: updatedCountAdd,
                },
                totalPrice:
                    state.totalPrice + action.ingredientPrice,
            };
        case actionTypes.REMOVE_INGREDIENT:
            console.log('REMOVE_INGREDIENT reducer called');
            const oldCount = state.ingredients[action.ingredientName] || 0;
            if (oldCount <= 0) {
                return state;
            }
            const updatedCountRemove = oldCount - 1;
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: updatedCountRemove,
                },
                totalPrice:
                    state.totalPrice - action.ingredientPrice,
            };
        default:
            return state;
    }
};

export default reducer;