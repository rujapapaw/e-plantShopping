import React,{useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
//import{AuthModal} from './AuthModal'
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);  // To show/hide modal
  const [isSignup, setIsSignup] = useState(false);    // Toggle between login and signup form
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });  // Manage form data


  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    // debugger;
    console.log('testCart', cart);
    //const value = cart.cost.split('$').pop();
    //console.log('testCart',cart, value);

    return cart.reduce((total, item) => total + (item.quantity * Number(item.cost.split('$').pop())), 0);

  };

  //Continue shopping
  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };


  // Increment and decrement the number of each plant type in the cart
  const handleIncrement = (item) => {

    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {

    dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));

  };

  //Remove (delete) a plant type from the cart altogether
  const handleRemove = (item) => {

    const confirmRemove = window.confirm("Do you want to delete the item from the cart?");
    debugger;
    console.log("checkStatus", confirmRemove)
    if (confirmRemove) {
      dispatch(removeItem(item.name));
    }

    //dispatch(removeItem(item.name));

  };

  // Calculate total cost based on quantity for an item
  // unit cost of plant / number of that plant in the cart 
  const calculateTotalCost = (item) => {
    //debugger;
    console.log('checkinput--', item)
    const value = item.cost.split('$').pop();
    console.log('value', typeof (value), value, item.quantity * Number(value))
    return item.quantity * Number(value);

  };

  const handleCheckoutShopping = () => {
    debugger;
    setShowModal(true);  // Show modal on checkout
    //alert('Functionality to be added for future reference');
  };

  const handleInputChange = (e) => {
    
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem(formData.email));
    if (storedUser && storedUser.password === formData.password) {
      alert('Login successful');
      setShowModal(false);  // Close modal on successful login

      setFormData({ ...formData });  // This line ensures the form fields remain prefilled
    } else {
      alert('Invalid email or password');
    }
  };

  const handleSignup = () => {
    localStorage.setItem(formData.email, JSON.stringify(formData));
    alert('Signup successful');

    setFormData({ ...formData });  // This line ensures the form fields remain prefilled
    setShowModal(false);  // Close modal on successful signup
  };

  const handleModalClose = () => {
    setShowModal(false);         // Close the modal
    setIsSignup(false);          // Reset to login form
    setFormData({ username: '', email: '', password: '' });  // Clear form
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckoutShopping} >Checkout</button>
      </div>
      {/* Modal Popup */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="modal-close" onClick={handleModalClose}>&times;</span>
            <div className="modal-header">{isSignup ? 'Signup' : 'Login'}</div>
            <div>
              {isSignup && (
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="label-style"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="label-style"
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="label-style ln-p"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="modal-footer">
              {isSignup ? (
                <button  className="btn"onClick={handleSignup}>Signup</button>
              ) : (
                <button className="btn" onClick={handleLogin}>Login</button>
              )}
              <div onClick={() => setIsSignup(!isSignup)} style={{ cursor: 'pointer', marginTop: '10px' }}>
                {isSignup ? 'Already have an account? Login' : 'New user? Signup'}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CartItem;
