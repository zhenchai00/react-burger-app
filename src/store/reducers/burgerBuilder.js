import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utils";

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
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
                    state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
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
                    state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            };
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 4,
                error: false,
            };
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true,
            };
        default:
            return state;
    }
};

export default reducer;