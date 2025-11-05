import React, { useEffect, useState } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {
    useNavigate,
    useLocation,
    useMatch,
    Routes,
    Route,
} from "react-router-dom";

const Checkout = (props) => {
    const [ingredients, setIngredients] = useState({
        salad: 1,
        bacon: 1,
        cheese: 1,
        meat: 1,
    });
    const [price, setPrice] = useState(0);
    let navigate = useNavigate();
    const location = useLocation();
    const match = useMatch("/checkout");

    const checkoutCancelledHandler = () => {
        navigate(-1);
    };

    const checkoutContinuedHandler = () => {
        navigate("/checkout/contact-data");
    };

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const ingredients = {};
        for (let param of query.entries()) {
            if (param[0] !== "price") {
                ingredients[param[0]] = +param[1];
            }
            if (param[0] === "price") {
                setPrice(+param[1]);
            }
        }
        setIngredients(ingredients);
    }, []);

    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler}
            />
            <Routes>
                {/* nested routes should use relative paths when the parent route includes `*` */}
                <Route
                    path="contact-data"
                    element={
                        <ContactData
                            ingredients={ingredients}
                            totalPrice={price}
                            navigation={navigate}
                        />
                    }
                />
            </Routes>
        </div>
    );
};

export default Checkout;
