import React, { useEffect, useState } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-order";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const BurgerBuilder = (props) => {
    const [purchasable, setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    let navigate = useNavigate();

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        setPurchasable(sum > 0);
    };

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        navigate({ pathname: "/checkout" });
    };

    useEffect(() => {
        // keep purchasable state in sync with ingredients
        updatePurchaseState(props.ings);
    }, [props.ings]);
    
    const disabledInfo = props.ings ? { ...props.ings } : {};
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
        <>
            <Modal show={purchasing} modelClosed={purchaseCancelHandler}>
                {props.ings ? (
                    loading ? (
                        <Spinner />
                    ) : (
                        <OrderSummary
                            ingredients={props.ings}
                            purchaseCancelled={purchaseCancelHandler}
                            purchaseContinued={purchaseContinueHandler}
                            price={props.price}
                        />
                    )
                ) : null}
            </Modal>
            {error && <p>{error.message}</p>}
            {props.ings && (
                <>
                    <Burger ingredients={props.ings} />
                    <BuildControls
                        ingredientAdded={props.onIngredientAdded}
                        ingredientRemoved={props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={purchasable}
                        ordered={purchaseHandler}
                        price={props.price}
                    />
                </>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) =>
            dispatch({
                type: actionTypes.ADD_INGREDIENT,
                ingredientName: ingName,
                ingredientPrice: INGREDIENT_PRICES[ingName],
            }),
        onIngredientRemoved: (ingName) =>
            dispatch({
                type: actionTypes.REMOVE_INGREDIENT,
                ingredientName: ingName,
                ingredientPrice: INGREDIENT_PRICES[ingName],
            }),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
