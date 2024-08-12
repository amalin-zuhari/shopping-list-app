import React, { useState } from "react"; // Import React and useState to manage state in this component
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS for styling
import "../Styles/Shopping.css"; // Import custom CSS specific to this component
import { Modal, Button } from "react-bootstrap"; // Import Modal and Button components from React Bootstrap
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation between pages

const itemsInStore = [ // This is an array that stores information about the items being sold
  { id: 1, name: "Beras 10kg", price: 40.0, image: "/images/Berask-10kg.png" },
  { id: 2, name: "Minyak Masak 5L", price: 25.5, image: "/images/minyak-saji.png" },
  { id: 3, name: "Gula 1kg", price: 2.8, image: "/images/gula.png" },
  { id: 4, name: "Tepung Gandum 1kg", price: 3.2, image: "/images/tepung.png" },
  { id: 5, name: "Telur Ayam (30 biji)", price: 12.5, image: "/images/telur.png" },
  { id: 6, name: "Ayam (1kg)", price: 8.9, image: "/images/ayam.png" },
  { id: 7, name: "Ikan Kembung (1kg)", price: 12.0, image: "/images/ikan.jpg" },
  { id: 8, name: "Susu Pekat Manis", price: 3.5, image: "/images/susu-pekat.jpg" },
  { id: 9, name: "Kopi Serbuk 200g", price: 7.0, image: "/images/kopi-removebg-preview.png" },
  { id: 10, name: "Sayur Campur 1kg", price: 5.0, image: "/images/brocolli.png" },
];

function Shopping({ onAddItem }) {
  const [quantities, setQuantities] = useState({}); // State to store the quantity of each item selected by the user
  const [showModal, setShowModal] = useState(false); // State to control the visibility of the modal (popup)
  const [cartItems, setCartItems] = useState([]); // State to store the items that have been added to the cart
  const navigate = useNavigate(); // Hook useNavigate to navigate to other pages

  const handleQuantityChange = (id, quantity) => { // Function to change the quantity of the selected item
    setQuantities({ ...quantities, [id]: quantity }); // Save the changed quantity in the quantities state
  };

  const handleAddToCart = (item) => { // Function to add an item to the cart
    const quantity = quantities[item.id] || 1; // Get the quantity selected by the user, default to 1 if none selected
    onAddItem({
      ...item,
      quantity: parseInt(quantity, 10), // Save the item with its quantity to the cart
      done: true,
    });

    const cartItem = cartItems.find(cartItem => cartItem.id === item.id); // Check if the item is already in the cart
    if (cartItem) {
      setCartItems(cartItems.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + parseInt(quantity, 10) } // If already in the cart, increase the quantity
          : cartItem
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: parseInt(quantity, 10) }]); // If not, add the new item to the cart
    }

    setShowModal(true); // Show the modal to inform the user that the item has been added to the cart
  };

  const handleClose = () => setShowModal(false); // Function to close the modal

  const handleViewCart = () => { // Function to navigate to the Cart page
    if (cartItems.length > 0) { // Ensure the cart is not empty
      navigate("/cart", { state: { items: cartItems } }); // Navigate to the Cart page with the cart items data
    }
  };

  return (
    <div className="container">
      <h2>Shopping</h2>
      <div className="row">
        {itemsInStore.map((item) => ( // Loop through each item in itemsInStore to display on the page
          <div key={item.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <img
                  src={item.image} // Item image
                  alt={item.name} // Alt text for the image
                  className="card-img-top"
                  style={{ width: "100px", height: "100px", textAlign: "center" }}
                />
                <h5 className="card-title">{item.name}</h5> {/* Item name */}
                <p className="card-text">Price: RM{item.price.toFixed(2)}</p> {/* Item price */}
                <div className="input-group mb-3">
                  <input
                    type="number" // Input for item quantity
                    className="form-control"
                    min="1"
                    value={quantities[item.id] || 1} // Value of the quantity input, default to 1
                    onChange={(e) =>
                      handleQuantityChange(item.id, e.target.value) // Call handleQuantityChange when the quantity changes
                    }
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-custom"
                      onClick={() => handleAddToCart(item)} // Call handleAddToCart when the user clicks "Add to Cart"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleClose}> {/* Modal that appears when an item is added to the cart */}
        <Modal.Header closeButton>
          <Modal.Title>Item Added to Cart</Modal.Title> {/* Modal title */}
        </Modal.Header>
        <Modal.Body>The item has been added to your cart successfully!</Modal.Body> {/* Modal message */}
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> {/* Button to close the modal */}
            Continue Shopping
          </Button>
          <Button variant="primary btn-custom" onClick={handleViewCart}> {/* Button to view the cart */}
            View Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Shopping; // Export the Shopping component to be used in the application