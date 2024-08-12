import React, { useState } from 'react'; // Import React and useState hook
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Router components from react-router-dom

// Import custom components
import Footer from './components/Footer';
import About from './components/About';
import Header from './components/Header';
import ShoppingList from './components/ShoppingList';
import Shopping from './components/Shopping';
import Cart from './components/Cart';
import ThankYou from './components/ThankYou';

function App() {
  // useState hook to manage the items in the shopping cart
  const [items, setItems] = useState([]);

  // Function to handle adding a new item to the cart
  const handleAddItem = (newItem) => {
      setItems([...items, newItem]); // Add the new item to the existing list of items
  };

  return (
    <Router> {/* Router to enable routing between different pages */}
      <Header /> {/* Display the header on all pages */}
      <Routes> {/* Define the different routes for the application */}
        <Route path="/" element={<About />} /> {/* Route for the About page */}
        <Route path="/shopping-list" element={<ShoppingList />} /> {/* Route for the Shopping List page */}
        <Route 
          path='/shop' 
          element={<Shopping items={items} onAddItem={handleAddItem}/>} 
        /> {/* Route for the Shopping page, passing items and the add item handler as props */}
        <Route 
          path='/cart' 
          element={<Cart items={items} />} 
        /> {/* Route for the Cart page, passing items as props */}
        <Route path="/thank-you" element={<ThankYou />} /> {/* Route for the Thank You page */}
      </Routes>
      <Footer /> {/* Display the footer on all pages */}
    </Router>
  );
}

export default App;
