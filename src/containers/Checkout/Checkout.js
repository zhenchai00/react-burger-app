import React, { useEffect } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { useNavigate, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const Checkout = (props) => {
    let navigate = useNavigate();

    const checkoutCancelledHandler = () => {
        navigate(-1);
    };

    const checkoutContinuedHandler = () => {
        navigate("/checkout/contact-data");
    };

    useEffect(() => {
        if (!props.ings || props.purchased) {
            navigate("/");
        }
        props.onInitPurchase();

    }, [props, navigate]);

    return (
        <div>
            {props.ings ? (
                <div>
                    <CheckoutSummary
                        ingredients={props.ings}
                        checkoutCancelled={checkoutCancelledHandler}
                        checkoutContinued={checkoutContinuedHandler}
                    />
                    <Routes>
                        {/* nested routes should use relative paths when the parent route includes `*` */}
                        <Route
                            path="contact-data"
                            element={<ContactData navigation={navigate} />}
                        />
                    </Routes>
                </div>
            ) : null}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onInitPurchase: () => dispatch(actions.purchaseInit()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
