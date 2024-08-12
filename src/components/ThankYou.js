import React from 'react';
import { useLocation } from 'react-router-dom';

function ThankYou() {
    // Hook to access the current location and state passed from the previous route
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

    // Calculate the overall total price of all items in the order
    const totalPrice = groupedItems.reduce((total, item) => total + item.totalPrice, 0);

    return (
        <div className="container">
            {/* Thank you message and order summary */}
            <h2>Thank You for Your Purchase!</h2>
            <p>Here is a summary of your order:</p>

            {/* Display the list of grouped items with their quantities and total prices */}
            <ul className="list-group mb-3">
                {groupedItems.map((item, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between">
                        {/* Display item name and quantity */}
                        <span>{item.name} (x{item.quantity})</span>
                        {/* Display total price for the item */}
                        <span>RM{item.totalPrice.toFixed(2)}</span>
                    </li>
                ))}
            </ul>

            {/* Horizontal line to separate the summary list from the total */}
            <hr />

            {/* Display the overall total price */}
            <div className="d-flex justify-content-end">
                <h4>Total: RM{totalPrice.toFixed(2)}</h4>
            </div>
        </div>
    );
}

export default ThankYou;
