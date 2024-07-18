import React ,{ useState, useEffect } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addPurchaseFailure,  addPurchase, setStatusIdle} from "../../redux/slice/purchaseSlice";
import { resetCart } from "../slice/cartSlice";
import { selectCartProducts } from "../selectors";


const PaymentForm = () => {
    const token = localStorage.getItem('token')
    const cartProducts = useSelector(selectCartProducts);
    const [formData, setFormData] = useState({
        name:'',
        age:'',
        country:'',
        state:'',
        cardNumber:'',
        
    });

    const dispatch = useDispatch();
    const status = useSelector((state) => state.purchases.status);
    const error = useSelector((state)=> state.purchases.error);
 

//func p lida k mudana n kes inpputs d formular
    const handelChange = (e) => {
        const{name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

 
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const productsToSendToDb = []

        cartProducts.forEach((item) => {
            
         productsToSendToDb.push({id:item.id, quantity:Number(item.quantity),price:Number(item.price)})
        })

        try{
            const response = await axios.post('http://localhost:8080/payments', {...formData,age:Number(formData.age), cardNumber: Number(formData.cardNumber), products:productsToSendToDb} ,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            dispatch(addPurchase(response.data));
            dispatch(resetCart(response.data));
            
            alert("Pagamento feito com sucesso")
        }catch(error){
            if (error.response)
                {
                    const {message:erroMessage}=error.response.data
                    alert(erroMessage)

                }
            dispatch(addPurchaseFailure(error.toString()));
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type ="text" name="name" value={formData.name} onChange={handelChange} required />
            </div>

            <div>
                <label>Age</label>
                <input type ="number" name="age" value={formData.age} onChange={handelChange} required />
            </div>

            <div>
                <label>Country</label>
                <input type ="text" name="country" value={formData.country} onChange={handelChange} required />
            </div>

            <div>
                <label>State</label>
                <input type ="text" name="state" value={formData.state} onChange={handelChange} required />
            </div>

            <div>
                <label>CartNumber</label>
                <input type ="text" name="cardNumber" value={formData.cardNumber} onChange={handelChange} required />
            </div>

            <button type = "submit">Enviar</button>
        </form>
    );

};
export default PaymentForm;