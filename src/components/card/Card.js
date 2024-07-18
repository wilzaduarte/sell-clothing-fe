import './card.css';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addProductToCart, decreaseProducStock} from '../redux/slice/cartSlice'


const Card = ({ item, inModal= false}) => {

  const { name: itemName, link: image, price, id } = item;
  const dispatch = useDispatch();
  const stock = useSelector((state) => {
    const product = state.cart.products.find((product) => product.id === id);
    return product ? product.stock : item.stock;
});
  
  const handleBuyNow = () => {
    if (stock > 0) {
      dispatch(addProductToCart(item));
      dispatch(decreaseProducStock({ id }));
    }
      };

      return (

      <div className="card-container" >
        <img src={image} alt={itemName} className="card-image" />

        <div className="card-details">
          <h2 className="card-name">{itemName}</h2>
          <p className="card-price">Price: ${price}</p>
          <p className="card-stock">Stock: {stock}</p>
          
          {!inModal && (
            <button className={stock > 0 ? "buy-button" : "buy-button disabled"}
              onClick={handleBuyNow}
              disabled={stock <= 0}>
              Add to Cart
            </button>
          )}
        </div>
      
      </div>
     

    );


};

  export default Card;