import { useRef, useEffect, useState, errRef } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import './style.css';
import { useNavigate } from "react-router-dom";



const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Register = () => {

    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');

    const emailRef = useRef(null);
    const [email, setEmail] = useState('')
    const [validEmail, setValidEmail] = useState(true);
    const [EmailFocus, setEmailFocus] = useState(false);
 
    const [password, setPassword] = useState('');
    const [validpassword, setvalidPassword] = useState(false);
    const [passwordFocus, setPassordFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setvalidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const REGISTER_URL = 'http://localhost:8080/auth/signup';


    const handleClick = async () =>{
        console.log('funciona');  
        try{
            
            console.log(
                {email, name,lastName,password }
            )
            await axios.post(REGISTER_URL,{
               
                email,lastName, name, password 

            })
            
            navigate("/login")
        }catch(error){
            if(error.response){
                const {message:errorMessage, statusCode} = error.response.data;
                console.log({errorMessage,statusCode})
            }
        
        } 
        
    }

    useEffect(() => {
        emailRef.current.focus();
    }, [])
    //validar o campo de email
    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    //para senha
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setvalidPassword(result);
        const match = password === matchPwd;
        setvalidMatch(match);
    }, [password, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //se butin tvr ativod k js hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            const response = await axios.post(REGISTER_URL,
            JSON.stringify({email, password, name, lastName }),
            {
                headers : {'Content-Type' : 'applicaton/json'},
                withCredentials : true
            }
        );
        console.log(response.data);
        console.log(response.accessToken);
        console.log(JSON.stringify(response))
        setSuccess(true);
        //limpar campo de entrada
        }catch(err){
            if(!err?.response){
                setErrMsg('No Server Response')
            } else if (err.response?.status === 409){
                setErrMsg('UserEmail Taken');//email do usuario ja utilizado
            } else{
                setErrMsg('Registration Failed')
            }
            emailRef.current.focus();

        }
    }

    return (
        <>
            { success ? (
            <section>
                <h1> success! </h1>
                <p>
                <button onClick={() => navigate("/login")}>Sign In</button>
                </p>
            </section>
            ) : (
       
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}aria-live="assertive">{errMsg}</p>
            <h1> 𝕽𝖊𝖌𝖎𝖘𝖙𝖊𝖗 </h1>
            <form onSubmit={handleSubmit}>

            <label htmlFor="userName">
                            Name :
                            <input
                                type="text"
                                id="userName"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </label>
                        <label htmlFor="userLastName">
                       LastName :
                            <input
                                type="text"
                                id="userLastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                            </label>
                
                <label htmlFor="userEmail">
                UserEmail :
                    <span className = {validEmail ? "valoid" : "hide"}>
                        <FontAwesomeIcon icon ={faCheck}></FontAwesomeIcon>
                        </span>

                      
                    
                      <span className={!validEmail && email ? "invalid" : "hide"}>
        {/* Exibindo o ícone de erro caso o email não seja válido */}
        <FontAwesomeIcon icon={faTimes} />
    </span>

                </label>
                <input
                type="email"
                id ="userEmail"
                // eslint-disable-next-line no-undef
                ref={emailRef}
                // autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid = {!validEmail }//? "false" : "true"}
                //aria-describedby="uidnote"
                onFocus={()=> setEmailFocus(true)}
                onBlur={()=> setEmailFocus(false)}
                ></input>
                <p className={EmailFocus && email && !validEmail ? "instruction": "offscreen"}>
                <FontAwesomeIcon icon = {faInfoCircle}/>
                Invalid email Format.<br />
                Must begin whith a letter.<br ></br>
                letter, number, are allowed.
                </p>
                <label htmlFor = "password">
                password :
                    <span className={validpassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon = {faCheck}/>
                    </span>
                    <span className={validpassword || password ? "hide" : "invalide"}>
                        <FontAwesomeIcon icon = {faTimes}/>
                    </span>
                </label>
                <input
                 type="password"
                 id ="password"
                 onChange={(e) => setPassword(e.target.value)}
                 required
                 aria-invalid = {validpassword ? "false" : "true"}
                 aria-describedby="passwordnote"
                 onFocus={()=> setPassordFocus(true)}
                 onBlur={()=> setPassordFocus(false)}></input>
                  <p id ="passwordnote" className={ passwordFocus && !validpassword ? "instruction": "offscreen"}>
                <FontAwesomeIcon icon = {faInfoCircle}/>
                8 to 24 characters.<br />
                Must include uppercase and lowercase letters, a number and special characters.<br ></br>
                allowed spacial characters: <span aria-label="al symbol">@</span>
                <span aria-label="dolla sigin">$</span>
                <span aria-label="percent">%</span>
                </p>

                <label htmlFor = "confirm-password">
                    Confirm password :
                    <span className={validMatch  && matchPwd ? "valide" : "hide"}>
                        <FontAwesomeIcon icon = {faCheck}/>
                    </span>
                    <span className={validMatch || matchPwd ? "hide" : "invalide"}>
                        <FontAwesomeIcon icon = {faTimes}/>
                    </span>
                    
                </label>
                <input
                 type="password"
                 id ="confirm-password"
                 onChange={(e) => setMatchPwd(e.target.value)}
                 required
                 aria-invalid = {validMatch ? "false" : "true"}
                 aria-describedby="confirmot"
                 onFocus={()=> setMatchFocus(true)}
                 onBlur={()=> setMatchFocus(false)}>
                 </input>

                  <p id ="confirmote" className={matchFocus &&  !validMatch ? "validMatch": "instruction"}>
                
                <FontAwesomeIcon icon = {faInfoCircle}/>
                Must match the password input field.<br ></br>
                </p>
                <button onClick = {handleClick}> Sign Up </button>
            </form>
            <p>
                Already registered?<br/>
                <span className="line">
                    
                <button onClick={() => navigate("/")}>HOME</button>
        
                </span>
                </p>   
        </section>

            )}
        </>
        
    )
}
export default Register;