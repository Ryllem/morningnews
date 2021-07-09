import React, {useState} from 'react';
import './App.css';
import { Redirect } from 'react-router-dom';
import {Input,Button} from 'antd';
import axios from 'axios';
import {useDispatch} from 'react-redux';

function ScreenHome() {
  const [signupUser, setSignupUser] = useState({username: "", email: "", password: ""})
  const [signinUser, setSigninUser] = useState({email: "", password: ""})
  
  const [signupUserError, setSignupUserError] = useState({})
  const [signinUserError, setSigninUserError] = useState("")

  const [isLogin, setIsLogin] = useState(false);
  let dispatch = useDispatch();
  
  const signupHandleChange = ev => {
    setSignupUser({...signupUser, [ev.name]: ev.value})
  }

  const signinHandleChange = ev => {
    setSigninUser({...signinUser, [ev.name]: ev.value})
  }

  const sendSingnin = () => {
    console.log("en mode signin", "color: green");
    if (signinUser.email !== "" && signinUser.password !== "") {
    axios.post('/signin', signinUser)
      .then(res => {
        if (res.data.status === "OK") {
          // console.log("%c Binvenue", "color: green")
          // console.log(res.data)
          dispatch({
            type: "addInfo",
            payload: res.data.message,
          })
          setIsLogin(true);
        } else {
          setSigninUserError(res.data.message);

        }
      })
      .catch(err => console.log(err))
    } else {setSigninUserError("Merci de compléter tous les champ");}
  }

  const sendSingup = () => {
    console.log("en mode signup")
    axios.post('/signup', signupUser)
      .then(res => {
        if (res.data.status === "OK") {
          console.log("%c Nouveau utilisateur enregistré", "color: green")
          console.log("res.data: ", res.data.message)
          setIsLogin(true);
          dispatch({
            type: "addInfo",
            payload: res.data.message,
          })

        } else {
          console.log(res.data.message);
          setSignupUserError(res.data.message);

        }
      })
      .catch(err => console.log(err))
  }

 

  return (
    <div className="Login-page" >
      

          {/* SIGN-IN */}

          <div className="Sign">
                  
          <Input type="email" className="Login-input" placeholder="Arthur-G@gmail.com" name="email" value={signinUser.email} onChange={(ev) => signinHandleChange(ev.target)}/>
          
          <Input.Password className="Login-input" placeholder="password" name="password" value={signinUser.password} onChange={(ev) => signinHandleChange(ev.target)} />
          <p style={{ color: 'red', transform: "translate(0px, -10px)"}}>{signinUserError}</p>

            <Button style={{width:'80px'}} type="primary" onClick={sendSingnin}>Sign-in</Button>

          </div>

          {/* SIGN-UP */}

          <div className="Sign">

                  <Input className="Login-input" placeholder="Arthur G" value={signupUser.username} name="username" onChange={(ev) => signupHandleChange(ev.target)} />
                  <p style={{ color: 'red', transform: "translate(0px, -10px)"}}>{signupUserError.username}</p>
                  <Input type="email" className="Login-input" placeholder="Arthur-G@gmail.com" name="email" value={signupUser.email} onChange={(ev) => signupHandleChange(ev.target)}/>
                  <p style={{ color: 'red', transform: "translate(0px, -10px)"}}>{signupUserError.email}</p>
                  <Input.Password className="Login-input" placeholder="password" name="password" value={signupUser.password} onChange={(ev) => signupHandleChange(ev.target)} />
                  <p style={{ color: 'red', transform: "translate(0px, -10px)"}}>{signupUserError.password}</p>

            <Button style={{width:'80px'}} type="primary" onClick={sendSingup}>Sign-up</Button>

          </div>
          {isLogin ? <Redirect to="/screenmyarticles" /> : <Redirect to="/" />}
      </div>
  );
}

export default ScreenHome;
