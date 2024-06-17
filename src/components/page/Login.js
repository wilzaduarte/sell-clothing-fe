import { useRef, useState, useEffect, useContext} from "react";
import {AuthContext} from "../context";
import axios from "axios";
 import { useNavigate } from "react-router-dom";
 import './style.css'


// const LOGIN_URL = '/auth'
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const Login = () => {

    const {signIn} = useContext(AuthContext)

    const emailRef = useRef(null);
    const errRef = useRef(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);



    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() =>{  
        setErrMsg('');
    },[email, password])

    const navigate = useNavigate();


    // eslint-disable-next-line no-unused-vars
    const handleValid = async (e) =>{
        e.preventDefault();
        if (!email || !password){
            setErrMsg('Missing Username or Password');
            return;
        }

        if(!EMAIL_REGEX.test(email)){
            setErrMsg('Invalid Email Format');
        }

        if (password.length < 8){
            setErrMsg('Password must have at least 8 Characters');
            return;
        }
}

const handleSubmit = async (e) =>{
    e.preventDefault()
    handleValid(e)
    try{
        const request = await axios.post('http://localhost:8080/auth/signin',{
            email,password
        })
        const {token} = request.data
        signIn(token)
        navigate("/home")
    }catch(error){
        if(error.response){
            const {statusCode,message:errorMessage} = error.response.data
            if(statusCode === 400){
                setErrMsg('Verifique os dados')
            }else if (statusCode === 500){
                setErrMsg('Erro interno')
            }
            console.log({errorMessage})
        }
    }
}
    return ( 
        <>
        {success ? (
            <section>
                <h1>You are logged in!</h1><br/>
                <p>
                <button onClick={() => navigate("/")}>Go to Home</button>
                </p>
            </section>
        ) : (

        <section>
            <p ref = {errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1> 𝕾𝖎𝖌𝖓 𝕴𝖓 </h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="useremail"> User Email: </label>
                <input 
                type = "email"
                 id="useremail" 
                 ref={emailRef} 
                 autoComplete= "off" 
                 onChange={(e) => setEmail(e.target.value)} 
                value={email} 
                equired>
                </input>

                <label htmlFor="password"> Password: </label>
                <input 
                type = "password"
                id="password" 
                onChange={(e) => setPassword(e.target.value)} 
                value={password} 
                required>
                </input>
                <button type="submit" onClick={(e)=> handleSubmit(e)}>Sign In</button>
            </form>
            <p>

                Need an Account? <br/>
                <span className="line">
                <button onClick={() => navigate("/register")}>Sign Up</button>
                </span>
            </p>

        </section>
        )}
        </>
    )
}
export default Login;