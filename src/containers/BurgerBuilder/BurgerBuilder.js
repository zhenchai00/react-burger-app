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
import * as burgerBuilderActions from "../../store/actions/index";

const BurgerBuilder = (props) => {
    const [purchasable, setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    let navigate = useNavigate();

    const updatePurchaseState = (ingredients) => {
        if (!ingredients) {
            setPurchasable(false);
            return;
        }
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
        props.onInitPurchase();
        navigate({ pathname: "/checkout" });
    };

    useEffect(() => {
        // keep purchasable state in sync with ingredients
        updatePurchaseState(props.ings);
    }, [props.ings]);

    useEffect(() => {
        props.onInitIngredients();
    }, [props.onInitIngredients]);

    const disabledInfo = props.ings ? { ...props.ings } : {};
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
        <>
            <Modal show={purchasing} modelClosed={purchaseCancelHandler}>
                {props.ings ? (
                    <OrderSummary
                        ingredients={props.ings}
                        purchaseCancelled={purchaseCancelHandler}
                        purchaseContinued={purchaseContinueHandler}
                        price={props.price}
                    />
                ) : null}
            </Modal>
            {props.error && <p>Ingredients can't be loaded!</p>}
            {props.ings ? (
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
            ) : (
                <Spinner />
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) =>
            dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) =>
            dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients: () =>
            dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase: () => dispatch(burgerBuilderActions.purchaseInit()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
