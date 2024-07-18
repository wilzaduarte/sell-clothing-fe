import React, {useState} from 'react';
import Modal from 'react-modal';
import PaymenForm from '../redux/purchase/payments';
import './Cartmodal.css'
import { decreaseProducQuantity, increaseProductQuantity, removeProductFormCart, addProductToCart } from "../redux/slice/cartSlice";
import { useDispatch } from 'react-redux';
import DetailsModal from '../home/detailsModal';


const CartModal =({isOpen, onRequestClose, cartProducts,
   handleAddToCart, handleRemoveFormCart,
    isPaymentFormOpen, handlePaymentFormToggle,
     handleSuccess, handleFailure, initialStock })=>{
      
      const dispatch = useDispatch();
      const [showDetails, setShowDetails] = useState(false);
      const [stock, setStock] = useState(initialStock);

    const totalPrice = cartProducts.reduce((acc, item)=>acc+ item.price * item.quantity, 0);

  const handleToggleDetails = () => {
    setShowDetails(!showDetails);
  };

const handleIncreaseQuantity = (ItemId) =>{
    dispatch(increaseProductQuantity(ItemId));
    setStock(stock +1);
};
const handleDecreaseQuantity = (ItemId, quantity) => {

  if (quantity > 1){
    dispatch(decreaseProducQuantity(ItemId));
    setStock(stock -1);
  }
};
const removeFormCard = (itemId) => {
  const item = cartProducts.find((item) => item.id === itemId);
    if (item) {
      dispatch(removeProductFormCart(itemId));
      dispatch(increaseProductQuantity(itemId));
    }
  
};

// const handlePaymentSuccess = () => {
//   cartProducts.forEach(item => {
//     dispatch(decreaseProductQuantity(item.id, item.quantity)); // Atualiza o estoque apenas após a compra
//   });
//   handleSuccess();
// };

const handleBuyNow = (itemId) => {
  const product = cartProducts.find((item) => item.id === itemId);
  if (product && product.stock > 0) {
    dispatch(addProductToCart(product));
    dispatch(decreaseProducQuantity(itemId));
    setStock(stock - 1);
  }
};

    return (
        <Modal isOpen={isOpen} 
        onRequestClose={onRequestClose} className="custom-modal">
          <h3 style={{alignSelf:'baseline', display:'flex', flexDirection:'column', alignContent:'center', alignItems:'center' }}>Total: R${totalPrice}</h3>
          <div className="product-gip">
          {cartProducts.map((item, index) => {
            const {id ,name:itemName, stock: initialStock, link:image, price, quantity} = item;
            return (
              <div className="product-car" key={id}>
          <img src={image} alt={itemName} className="card-image" />
  
          <div className="card-details">
            <h2>{itemName}</h2>
            <p>Price: ${price}</p> 
            <p>Stock: {initialStock}</p>
     
              <div className="cart-item-actions">
                <button onClick={() => removeFormCard(item.id)}>Remove</button>
                <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                <span>{quantity}</span>
                <button onClick={() => handleDecreaseQuantity(item.id, quantity)}>-</button>
               
              </div>
            
            <button className="details-button" onClick={handleToggleDetails}>
              Details
            </button>
            
  
          </div>
          {showDetails && <DetailsModal itemName={itemName} />}
        </div>
        );
          }
          )}
          </div>
          {!isPaymentFormOpen &&
          (<button className='proceed-button' onClick={handlePaymentFormToggle}>Purchase</button>)}
           
          {isPaymentFormOpen && 
          <PaymenForm cartProducts={cartProducts} 
          onSuccess={handleSuccess} onFailure={handleFailure} />}
        </Modal>
          
      ); 
};
export default CartModal;