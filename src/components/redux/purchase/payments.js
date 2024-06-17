import React ,{ useState, useEffect } from "react"
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { addPurchaseFailure,  addPurchase, setStatusIdle} from "../../redux/slice/purchaseSlice";


const PaymenFrom = () => {
    const [fromData, setFromData] = useState({
        name:'',
        age:'',
        country:'',
        state:'',
        cardNumber:'',
        price:'',
    });

    const dispatch = useDispatch();
    const status = useSelector((state) => state.purchases.status);
    const error = useSelector((state)=> state.purchases.error);


  useEffect(() => {
    if (status === 'succeeded') {
      alert('Compra realizada com sucesso!');
      setTimeout(() => {
        dispatch(setStatusIdle());
      }, 3000);
    } else if (status === 'failed') {
      alert(`Falha na compra: ${error}`);
    }
  }, [status, error, dispatch]);

    const handelChange = (e) => {
        const{name, value} = e.target;
        setFromData({
            ...fromData,
            [name]: value,
        });
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:8080/payments', { fromData });
            dispatch(addPurchase(response.data));
        }catch(error){
            dispatch(addPurchaseFailure(error.toString()));
        }
    };

    return(
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type ="text" name="name" value={fromData.name} onChange={handelChange} required />
            </div>

            <div>
                <label>Age</label>
                <input type ="number" name="age" value={fromData.age} onChange={handelChange} required />
            </div>

            <div>
                <label>Country</label>
                <input type ="text" name="country" value={fromData.country} onChange={handelChange} required />
            </div>

            <div>
                <label>State</label>
                <input type ="text" name="state" value={fromData.state} onChange={handelChange} required />
            </div>

            <div>
                <label>CartNumber</label>
                <input type ="text" name="cardNumber" value={fromData.cardNumber} onChange={handelChange} required />
            </div>

            <div>
                <label>Price</label>
                <input type ="number" name="price" value={fromData.price} onChange={handelChange} required />
            </div>

            <button type = "submit">Enviar</button>
        </form>
    );

};
export default PaymenFrom;