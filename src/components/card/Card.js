import React, {useState} from "react";
import DetailsModal from '../home/detailsModal';
import { descreaseProducQuantity, increseProductQuantity } from "../redux/slice/cartSlice";
import { selectProductsTotalPrice } from "./cart.selectors";
import { useDispatch, useSelector } from "react-redux";
import './card.modulo.css';


const Card = ({ item, addToCart, inModal = false, removeFromCard = () => {}}) => {

  const {name:itemName,stock,link:image, price} = item

  const dispatch = useDispatch()
  
  const totalPrice = useSelector(selectProductsTotalPrice);
  const handleBuyNow = () => {
        if (stock > 0) {
            addToCart(item);
        }  
    }
    
    const [showDetails, setShowDetails] = useState(false);
  
    const handleToggleDetails = () => {
      setShowDetails(!showDetails);
    };
  
  const handleIncreaseQuantity = (ItemId) =>{
      dispatch(increseProductQuantity(ItemId));
  }
  const handleDecreaseQuantity = (ItemId) => {
      dispatch(descreaseProducQuantity(ItemId));
  }
  
    return (
      <>{inModal && (
        <div style={{justifyContent:'center', alignItems:'center', display:'flex', marginBottom:5}}>
            <h3 style={{alignSelf:'baseline'}}>Total: R${totalPrice}</h3>
          </div>
        )}
      <div className={inModal ? "card-container" : 'Home'}>
        <img src={image} alt={itemName} className="card-image" />

        <div className="card-details">

          <h2>{itemName}</h2>
          {/* <p>Seller: {sellerName}</p>*/}
          <p>Price: ${price}</p> 
          <p>Stock: {stock > 0 ? "available" : 'Out of Stock'}</p>

          {!inModal && (
            <button className={stock > 0 ? "buy-button" : "buy-button disabled"}
              onClick={handleBuyNow}
              disabled={stock <= 0}>
              Add cart
            </button>
          )}

          {inModal && (
            <div className="cart-item-actions">
              <button onClick={() => removeFromCard(item.id)}>Remove</button>
              <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              <span>{stock}</span>
              <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
            </div>
          )}

          <button className="details-button" onClick={handleToggleDetails}>
            Details
          </button>

        </div>
        {showDetails && <DetailsModal itemName={itemName} />} {/*Renderiza o modal se showDetails for verdadeiro */}
      </div>
      
      </>
    );
    
  };
  
  export default Card;