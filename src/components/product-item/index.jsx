
import React from 'react';
import {useDispatch} from 'react-redux';
import { addProductToCart } from "../redux/slice/cartSlice";
import {BsCardPlus} from "react-icons";



const ProductItem =({ products }) => {
      const dispatch = useDispatch()

      const handleProductClick = () =>{
        dispatch(addProductToCart(products))
      }
   
      return (
    
        <Style.ProductContainer>
            <Style.ProductImage imageUrl={products.imageUrl}>
                <button onClick={handleProductClick} aria-label="Add to Cart">
                    <BsCardPlus />
                    </button>
                
                
            </Style.ProductImage>

            <Style.ProductInfo>
                <p>{products.name}</p>
                <p>Esc${products.price}</p>
            </Style.ProductInfo>
        </Style.ProductContainer>
    );
};
export default ProductItem;
