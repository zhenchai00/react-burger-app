import React, { useEffect, useState } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../components/hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-order";
import { useNavigate } from "react-router-dom";

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

const BurgerBuilder = (props) => {
    const [ingredients, setIngredients] = useState({
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    });
    const [totalPrice, setTotalPrice] = useState(4);
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

    const addIngredientHandler = (type) => {
        const oldCount = ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...ingredients,
        };

        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice + priceAddition;

        setTotalPrice(newPrice);
        setIngredients(updatedIngredients);
        updatePurchaseState(updatedIngredients);
    };

    const removeIngredientHandler = (type) => {
        const oldCount = ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...ingredients,
        };
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = totalPrice;
        const newPrice = oldPrice - priceDeduction;

        setTotalPrice(newPrice);
        setIngredients(updatedIngredients);
        updatePurchaseState(updatedIngredients);
    };

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    };

    const purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in ingredients) {
            queryParams.push(
                encodeURIComponent(i) +
                    "=" +
                    encodeURIComponent(ingredients[i])
            );
        }
        queryParams.push("price=" + totalPrice);
        const queryString = queryParams.join("&");
        navigate({ pathname: "/checkout", search: "?" + queryString });
    };

    useEffect(() => {
        // keep purchasable state in sync with ingredients
        updatePurchaseState(ingredients);
    }, [ingredients]);

    const disabledInfo = ingredients ? { ...ingredients } : {};
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
        <>
            <Modal show={purchasing} modelClosed={purchaseCancelHandler}>
                {ingredients ? (
                    loading ? (
                        <Spinner />
                    ) : (
                        <OrderSummary
                            ingredients={ingredients}
                            purchaseCancelled={purchaseCancelHandler}
                            purchaseContinued={purchaseContinueHandler}
                            price={totalPrice}
                        />
                    )
                ) : null}
            </Modal>
            {error && <p>{error.message}</p>}
            {ingredients && (
                <>
                    <Burger ingredients={ingredients} />
                    <BuildControls
                        ingredientAdded={addIngredientHandler}
                        ingredientRemoved={removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={purchasable}
                        ordered={purchaseHandler}
                        price={totalPrice}
                    />
                </>
            )}
        </>
    );
};

export default withErrorHandler(BurgerBuilder, axios);
