import { removeProductFromCart, increseProductQuantity, descreaseProducQuantity } from "../card/action";
import { useDispatch } from "react-redux"; 
import { AiOutlineMinus, AiOutlinePlus, AiOutlineClose } from "react-icons/ai"; 
import Styles from "./styles";
import './styles.css';


const CartItem = ({product}) =>{
    const dispatch = useDispatch();

    const handleRemoveClick = () => {
        dispatch(removeProductFromCart(product.id));
    };
    const handleIncreaseClick = () => {
        dispatch(increseProductQuantity(product.id));
    };
    const handleDecreaseClick = ()=>{
        dispatch(descreaseProducQuantity(product.id));
    };
    
    return (
        <Styles.CartItemContainer>
            <Styles.CartItemImage imageUrl={product.imageUrl} />
            <Styles.CartItemInfo>
                <p>{product.name}</p>
                <p>R${product.price}</p>
                <Styles.CartItemQuantity>
                    <AiOutlineMinus
                        size={20}
                        onClick={handleDecreaseClick}
                        aria-label={`Decrease quantity of ${product.name}`} />
                    <p>{product.quantity}</p>
                    <AiOutlinePlus
                        size={20}
                        onClick={handleIncreaseClick}
                        aria-label={`Increase quantity of ${product.name}`} />
                </Styles.CartItemQuantity>
                <Styles.RemoveButton
                    onClick={handleRemoveClick}
                    aria-label={`Remove ${product.name}`}>
                    <AiOutlineClose size={25} />
                </Styles.RemoveButton>
            </Styles.CartItemInfo>
        </Styles.CartItemContainer>
    );
};

export default CartItem;