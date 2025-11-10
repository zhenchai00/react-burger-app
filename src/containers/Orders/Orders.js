import React, { useEffect } from "react";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const Orders = (props) => {
    useEffect(() => {
        if (!props.orders || props.orders.length === 0 || props.loading) {
            props.onFetchOrders(props.token, props.userId);
        }
    }, []);
    return (
        <div>
            {props.error ? <p>{props.error}</p> : null}
            {props.loading ? (
                <Spinner />
            ) : (
                props.orders.map((order) => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price}
                    />
                ))
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        error: state.order.error,
        token: state.auth.token,
        userId: state.auth.userId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
