import React from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import {
    useNavigate,
    Routes,
    Route,
} from "react-router-dom";
import { connect } from "react-redux";

const Checkout = (props) => {
    let navigate = useNavigate();

    const checkoutCancelledHandler = () => {
        navigate(-1);
    };

    const checkoutContinuedHandler = () => {
        navigate("/checkout/contact-data");
    };

    return (
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
                    element={
                        <ContactData navigation={navigate} />
                    }
                />
            </Routes>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
}

export default connect(mapStateToProps)(Checkout);
