 import React, {useState, useContext, useEffect}from 'react';
 import Card from '../card/Card';
 import ShoppingCartIcon from './ShoppingCartIcon'
 import './home.css'
 import { useDispatch, useSelector } from 'react-redux';
 import { selectCartProducts } from '../redux/selectors';
 import Modal from "react-modal";
 import {addProductToCart, removeProductFromCart} from '../redux/slice/cartSlice';
 import SlideShow from '../slidshow/SlideShow';
 import PaymenFrom from '../redux/purchase/payments';
 import { fetClothingProducts} from '../redux/slice/productsSlice';
 import {AuthContext} from "../../../src/components/context"
import { fetchMyInfo } from '../redux/slice/userSlice';
import { roles } from '../../utils/roles';
import {addNewProduct} from '../redux/slice/productsSlice'

 const debouced = (func, delay) => {
  let deboucedTimer;
  return function(...args){
    clearTimeout(deboucedTimer);
    deboucedTimer = setTimeout(()=>func.apply( args), delay);
  };
};
const Home = () => {
    const cartProducts = useSelector(selectCartProducts);
    const {products} = useSelector((state)=> state.products)
    const dispatch = useDispatch();
    const [ isModalOpen, setIsModalOpen] = useState(false);
    const {signOut, authState} = useContext(AuthContext);
    const [isPaymentFromOpen, setIsPaymentFromOpen] = useState(false);
    const [message, setMessager] = useState(''); 
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);
    const [searchTerm, setSeachTerm] = useState('');
    const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);//p modal de adicionar ropa
    const [newProduct, setNewProduct] = useState({name:'', stock:'', link:'', price:''});//p novo produto
    

    const token = localStorage.getItem("token")

    const {myInfo} = useSelector((state)=> state.user)
   

    const deboucedSearch = () => {
      // eslint-disable-next-line no-unused-expressions
      debouced((term)=>{
        dispatch(fetClothingProducts(page, pageSize, term));
      }, 500);
    }

    useEffect(()=>{   
      if (token){
        dispatch(fetchMyInfo(token));
      }   
    },[dispatch, token]);


    useEffect(()=>{      
      dispatch(fetClothingProducts(page, pageSize, searchTerm));
    },[dispatch, page, pageSize, searchTerm]);

      useEffect(()=>{

        dispatch(fetClothingProducts(page,pageSize)) 
       },[dispatch,page,pageSize]);

    const handelModal = () => {
      setIsModalOpen(!isModalOpen)
    };

    const handleAddToCart =(item) =>{
      dispatch(addProductToCart(item));
    };

    const handleRemoveFRomCart =(itemId)=>{
      dispatch(removeProductFromCart(itemId));
    };

    const handlePaymentFromToggle = () => {
      setIsPaymentFromOpen(!isPaymentFromOpen);
    };

    const handleSuccess = () => {
      setMessager('purchase made successfully!');
      setTimeout(()=>setMessager(''),3000);
      setIsModalOpen(false);
    };
    const handleFailure = ()=>{
      setMessager('Failed purchase');
      setTimeout(()=> setMessager(''),3000);
    };

    const handelSearchChange=(value)=>{
      setSeachTerm(value);
      deboucedSearch (value);
    };
    
    const handlePreviousPage = ()=>{
      setPage(page > 1? page -1:1);
    };
    const handleNexPage = ()=>{
      setPage(page + 1);
    };
    //fechar e abrir modal de add produtos
    const handleAddProductModal=()=>{
      setIsAddProductModalOpen(!isAddProductModalOpen);
    };
    //func p lidar com mudancA de valores no formulario de um novo produto
    const handleNewProductChange = (e)=>{
      console.log(e.target.value)
      setNewProduct({...newProduct, [e.target.name]: e.target.value});
    };
    //func p enviar o novo product ao back
    const handleAddProductSubmit=()=>{
      console.log('Novo product:', newProduct);
      dispatch(addNewProduct(newProduct));
      setIsAddProductModalOpen(false);
    };

    const handleMenuItem = (menuItem) => {
      console.log(`Menu item clicked: ${menuItem}`);
    };

  
  return (

      <div>
      <header className="header">
        <h1>𝕳𝖔𝖒𝖊 𝕻𝖆𝖌𝖊</h1>
        <div className="shopping-cart" onClick={handelModal}>
          <ShoppingCartIcon  />  {/* Adiciona o onClick para abrir/fechar o carrinho */}   
          {/* Contador de itens no carrinho */}
          <button className="exit-button"onClick={signOut} styles= {{
            border: 'none',
            borderRadius: '10px',
            margintop: '10',
            padding:'10px 20px'}}>X</button>
          <span className="cart-count">{cartProducts.length}</span> 
        </div>     
      </header>
    
    <SlideShow images = {['https://officina-38.com/wp-content/uploads/2018/10/Sem-nome-1-1024x85.png',
    'https://as1.ftcdn.net/v2/jpg/06/63/48/60/1000_F_663486020_aiURvDfD9Bo36SxQjlconRzBeBuOd2KR.webp',
    'https://cdn.pixabay.com/photo/2016/02/06/13/31/shopping-1182902_960_720.png']}/>

    <div className='search-bar'>
      <input
      type="text"
      placeholder="Search..."
      value ={searchTerm}
      onChange={(e)=> handelSearchChange(e.target.value)}
      />
    </div>
    
      <div className="clothes-list">
        {products.map((item) => (
          <Card
            key={item.id}
           item={item}
            addToCart= {handleAddToCart}
          />
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={page ===1}>
        ⭠
        </button>
        <span>{page}</span>
        <button onClick={handleNexPage}>   ⮕  </button>
      </div>

      <Modal isOpen={isModalOpen} onRequestClose={handelModal} style={{ top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '50%'
     }}>
      {cartProducts.map((item,index) => (
                       <Card item={item} 
                       addToCart={handleAddToCart} 
                       key={index} 
                       inModal={true} 
                       removeFromCard={handleRemoveFRomCart}/>
                    ))}
                    <button onClick={handlePaymentFromToggle}> Proceed to Payment</button>
                    {isPaymentFromOpen && <PaymenFrom cartProducts={cartProducts} onSuccess={handleSuccess} onFailure={handleFailure}/>}
                    
      </Modal>
      {message && <div className='message'>{message}</div>}
     
      {myInfo && myInfo.role === roles.user ? (
        <li onClick={() => handleMenuItem('All Orders')}>All Orders</li>
      ) : <li></li> }
      {/* verificar se o usuario e administrador p mostrar o botao de adicionaro produt */}
      {myInfo?.role === roles.admin &&(
        <>
        <button onClick={handleAddProductModal} className="add-product-button"> Add outfit </button>
        <Modal isOpen={isAddProductModalOpen} onRequestClose={handleAddProductModal} style={{
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '50%'
        }}>
          <h2>ADD NEW CLOTHES</h2>
          <form>
            <label>Name:</label>
            <input type ='text' name = 'name' value={newProduct.name} onChange={handleNewProductChange}></input>
            <label>Stock: </label>
            <input type ='text' name = 'stock' value={newProduct.stock} onChange ={handleNewProductChange}></input>
            <label>Link: </label>
            <input type ='text' name = 'link' value={newProduct.link} onChange ={handleNewProductChange}></input>
            <label>Price: </label>
            <input type ='number' name = 'price' value={newProduct.price} onChange ={handleNewProductChange}></input>
            <button type ='button' onClick={handleAddProductSubmit}>Save</button>
          </form>

        </Modal>
        </>
      )}
      </div> 
  );

};

export default Home;