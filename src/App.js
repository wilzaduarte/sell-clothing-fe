import { BrowserRouter,Navigate,Route,Routes} from 'react-router-dom';
import './App.css';
import Login from './components/page/Login';
import Register from './components/page/register';
import Home from './components/home/Home';
import { useEffect, useMemo, useReducer } from 'react';
import {AuthContext} from './components/context';

function App() {

 const initalState = {
  token:null,
  loading:true
 }

 const reducer = (prevState, action) => {
  switch(action.type){
    case "RETRIVE_TOKEN":
      return {
        ...prevState,
        token:action.token,
        loading:false
      }
    case "LOGIN":
      return {
        ...prevState,
        token:action.token,
        loading:false
      }
    case "SIGN_OUT":
      return {
        ...prevState,
        token:null,
        loading:false
      }  
      default:
        return
  }
 }

 const [loginState, dispatch] = useReducer(reducer, initalState)

 const authContext = useMemo(() => ({
    signIn: (token) => {
      localStorage.setItem('token',token);
      dispatch({type:'LOGIN',token});
    },
    signUp:() => {},
    signOut:()=>{
      localStorage.removeItem('token');
      dispatch({type:'SIGN_OUT'});
    }
  }),[])

  useEffect(()=> {
    let userToken;
    userToken =  localStorage.getItem('token')
    dispatch({type:"RETRIVE_TOKEN", token:userToken})
  },[dispatch])

  if (loginState.loading) {
    return (
      <div>Loading...</div>
    )
  }
   

  return (
    <AuthContext.Provider value={authContext}>
    <BrowserRouter>
    <Routes>
        {loginState.token ? (
        <>
        <Route path='/' element={<Home/>}/> 
        <Route path= '*' element= {<Navigate to ='/' />} />  
        </>
        ) : (
        <>
        <Route path='/login' element = {<Login/>}/>
        <Route path='/register' element = {<Register/>}/>
        <Route path='*' element = {<Navigate to = 'Login'/>}/>
        </>
      )}
      </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}


export default App;


