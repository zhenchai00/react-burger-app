import React from "react";

import "./Order.css";

const Order = (props) => {
    return (
        <div className="Order">
            <p>
                Ingredients:{" "}
                {Object.keys(props.ingredients).map((ing) => (
                    <span
                        style={{
                            textTransform: "capitalize",
                            display: "inline-block",
                            margin: "0 8px",
                            border: "1px solid #ccc",
                            padding: "5px",
                        }}
                        key={ing}
                    >
                        {ing} ({props.ingredients[ing]}){" "}
                    </span>
                ))}
            </p>
            <p>
                Price:{" "}
                <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default Order;
