import React, { useEffect, useState } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-order";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios
            .get("/orders.json")
            .then((response) => {
                console.log(response.data);
                const fetchedOrders = [];
                for (let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        id: key,
                    });
                }
                setOrders(fetchedOrders);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                orders.map((order) => (
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

export default Orders;
