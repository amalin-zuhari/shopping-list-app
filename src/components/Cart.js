import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Cart() {
    // Hooks to navigate to different routes and to access location state
    const navigate = useNavigate();
    const location = useLocation();

    // Extract the 'items' array from the location state. If there is no state, default to an empty array.
    const { items } = location.state || { items: [] };

    // Group items by name and calculate total quantity and total price for each item
    const groupedItems = items.reduce((acc, item) => {
        // Check if the item already exists in the accumulator (grouped items array)
        const existingItem = acc.find(i => i.name === item.name);
        if (existingItem) {
            // If the item exists, update the quantity and total price
            existingItem.quantity += item.quantity;
            existingItem.totalPrice += item.price * item.quantity;
        } else {
            // If the item doesn't exist, add it to the accumulator with its total price calculated
            acc.push({
                ...item,
                totalPrice: item.price * item.quantity,
            });
        }
        return acc; // Return the updated accumulator for the next iteration
    }, []);

    // Calculate the overall total price of all items in the cart
    const totalPrice = groupedItems.reduce((total, item) => total + item.totalPrice, 0);

    // Function to handle the submission of the order
    const handleSubmit = () => {
        // Navigate to the 'thank-you' page, passing the groupedItems as state
        navigate('/thank-you', { state: { items: groupedItems } });
    };

    return (
        <div className="container">
            <h2>Your Cart</h2>
            {/* Display a message if the cart is empty */}
            {groupedItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    {/* Display the list of grouped items */}
                    <ul className="list-group mb-4">
                        {groupedItems.map((item, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    {/* Display item name, price per unit, and quantity */}
                                    <strong>{item.name}</strong> <br />
                                    <span>Price: RM{item.price.toFixed(2)} per unit</span> <br />
                                    <span>Quantity: {item.quantity}</span>
                                </div>
                                {/* Display the total price for this item */}
                                <span className="badge badge-primary badge-pill">
                                    RM{item.totalPrice.toFixed(2)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    {/* Display the total price of all items */}
                    <div className="text-right mb-4">
                        <h4>Total Price: RM{totalPrice.toFixed(2)}</h4>
                    </div>
                    {/* Button to submit the order */}
                    <button className="btn btn-success btn-block" onClick={handleSubmit}>
                        Submit Order
                    </button>
                </>
            )}
        </div>
    );
}

export default Cart;
