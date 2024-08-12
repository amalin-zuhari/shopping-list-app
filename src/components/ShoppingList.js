import React, { useState } from 'react';

function ShoppingList() {
    // State variables
    const [list, setList] = useState([]); // Array to hold the list of items
    const [newItem, setNewItem] = useState(''); // String to hold the name of the new item
    const [newQuantity, setNewQuantity] = useState(1); // Number to hold the quantity of the new item
    const [editingIndex, setEditingIndex] = useState(null); // Number to hold the index of the item being edited

    // Function to add or edit an item in the list
    const handleAddItem = () => {
        if (newItem.trim() === '') return; // Prevent adding an item with an empty name

        const updatedList = [...list]; // Create a copy of the current list

        if (editingIndex !== null) {
            // If we're in edit mode (editingIndex is not null)
            updatedList[editingIndex] = { name: newItem, quantity: parseInt(newQuantity), addedToCart: false };
            setEditingIndex(null); // Exit edit mode
        } else {
            // If we're adding a new item
            updatedList.push({ name: newItem, quantity: parseInt(newQuantity, 10), addedToCart: false });
        }

        // Sort the list so that unchecked items are at the top and checked items are at the bottom
        updatedList.sort((a, b) => a.addedToCart - b.addedToCart);
        setList(updatedList); // Update the list with the modified item

        // Reset the input fields
        setNewItem('');
        setNewQuantity(1);
    };

    // Function to delete an item from the list
    const handleDeleteItem = (index) => {
        setList(list.filter((_, i) => i !== index)); // Remove the item at the specified index
    };

    // Function to populate the form with the selected item's data for editing
    const handleEditItem = (index) => {
        setNewItem(list[index].name); // Set the item name in the input field
        setNewQuantity(list[index].quantity); // Set the quantity in the input field
        setEditingIndex(index); // Set the editing index to the current item's index
    };

    // Function to toggle the "added to cart" status of an item
    const handleCheckItem = (index) => {
        const updatedList = [...list]; // Create a copy of the current list
        updatedList[index].addedToCart = !updatedList[index].addedToCart; // Toggle the addedToCart status
        // Sort the list so that unchecked items are at the top and checked items are at the bottom
        setList(updatedList.sort((a, b) => a.addedToCart - b.addedToCart));
    };

    // Function to handle the "Enter" key press event in the input fields
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddItem(); // Trigger adding or editing the item when Enter is pressed
        }
    };

    // Render the component's UI
    return (
        <div className="container">
            <h2>Shopping List</h2>
            <div className="input-group mb-3">
                {/* Input for the item name */}
                <input
                    type="text"
                    className="form-control"
                    placeholder="Item name"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={editingIndex !== null && list[editingIndex]?.addedToCart} // Disable input if editing a checked item
                />
                {/* Input for the item quantity */}
                <input
                    type="number"
                    className="form-control"
                    min="1"
                    placeholder="Quantity"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={editingIndex !== null && list[editingIndex]?.addedToCart} // Disable input if editing a checked item
                />
                {/* Button to add or edit the item */}
                <button className="btn btn-custom" onClick={handleAddItem}>
                    {editingIndex !== null ? 'Edit Item' : 'Add Item'} {/* Button text changes based on edit mode */}
                </button>
            </div>

            {/* Separate lists for unchecked and checked items */}
            <ul className="list-group">
                {list
                    .filter(item => !item.addedToCart) // Filter and display unchecked items
                    .map((item, index) => (
                        <li
                            key={index} // Unique key for each list item
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >
                            <div className="d-flex align-items-center">
                                {/* Checkbox to mark item as added to cart */}
                                <input
                                    type="checkbox"
                                    checked={item.addedToCart}
                                    onChange={() => handleCheckItem(index)}
                                    className="mr-2"
                                />
                                {/* Display the item name and quantity */}
                                <span style={{ marginLeft: '10px' }}>
                                    {item.name} (x{item.quantity})
                                </span>
                            </div>
                            <div>
                                {/* Button to edit the item */}
                                <button
                                    className="btn btn-secondary btn-sm mr-2"
                                    onClick={() => handleEditItem(index)}
                                >
                                    Edit
                                </button>
                                {/* Button to delete the item */}
                                <button
                                    className="btn btn-danger btn-sm ml-2"
                                    onClick={() => handleDeleteItem(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>

            {/* Add margin between unchecked and checked lists */}
            {list.some(item => item.addedToCart) && <div style={{ margin: '20px 0' }}></div>}

            <ul className="list-group">
                {list
                    .filter(item => item.addedToCart) // Filter and display checked items
                    .map((item, index) => (
                        <li
                            key={index} // Unique key for each list item
                            className="list-group-item d-flex justify-content-between align-items-center list-group-item-success"
                        >
                            <div className="d-flex align-items-center">
                                {/* Checkbox to unmark item as added to cart */}
                                <input
                                    type="checkbox"
                                    checked={item.addedToCart}
                                    onChange={() => handleCheckItem(index)}
                                    className="mr-2"
                                />
                                {/* Display the item name and quantity with strikethrough and faded style */}
                                <span style={{ textDecoration: 'line-through', opacity: 0.5, marginLeft: '10px' }}>
                                    {item.name} (x{item.quantity})
                                </span>
                            </div>
                            <div>
                                {/* Button to edit the item */}
                                <button
                                    className="btn btn-secondary btn-sm mr-2"
                                    onClick={() => handleEditItem(index)}
                                    disabled={item.addedToCart} // Disable editing if item is checked
                                >
                                    Edit
                                </button>
                                {/* Button to delete the item */}
                                <button
                                    className="btn btn-danger btn-sm ml-2"
                                    onClick={() => handleDeleteItem(index)}
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

export default ShoppingList;
