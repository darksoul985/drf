import React , {useState, useRef, useEffect, useContext, useCallback} from 'react';
import AuthContext from '../context/AuthProvider';
import classes from './LoginForm.module.css';
import axios from '../../services/axiosLogin';
import Cookies from "universal-cookie";

const LOGIN_URL = '/api/token/';

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const { setAuth } = useContext(AuthContext);

  useEffect(() => { userRef.current.focus(); }, []); 
  useEffect(() => { setErrMsg(""); }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
      LOGIN_URL,
        JSON.stringify({username:user, password:pwd}),
        {
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        }
      ) //.catch(error => alert("Неверный логин или пароль"));
      const accessToken = response?.data?.access;
      //const roles = response?.data?.roles; пока не нужно определять роль
      setAuth({user, pwd, accessToken }); //roles, 

      setUser("");
      setPwd("");
      setSuccess(true)

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response)");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password)");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed)");
      }
      errRef.current.focus();
    }
  };


  const cookies = new Cookies();
  const get_token = cookies.get('token');

  const logout = useCallback(() => {
    const cookies = new Cookies();
    cookies.remove('token', {path: "/", });
  }, [])

  useEffect(() => { (get_token !== undefined && get_token !== "") ? setSuccess(true) : setSuccess(false); }, [get_token, logout]);

  return (
    <>
    {success ? (
      <section>
        <h1>Вы вошли в систему</h1>
        <br />
        <button onClick={() => logout()}>Выход</button>
      </section>
    ) : (    
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >{errMsg}</p>

        <form onSubmit={(event) => handleSubmit(event)} className="content">
          <div className="container">
            <label htmlFor="username"><b>Username:</b></label>
            <input 
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              placeholder="Enter Username"
              required />

            <label htmlFor="password"><b>Password:</b></label>
            <input 
              type="password" 
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              placeholder="Enter Password"
              name="psw" 
              required />

            <button type="submit">Login</button>
            {/*<label>
              <input type="checkbox" checked="checked" name="remember"/> Remember me
            </label>*/}

          </div>
          <div className={classes.LoginForm} style={{"background-color": "#f1f1f1"}}>
            <button type="button" className="cancelbtn">Cancel</button>
            <span className="psw">Forgot<a href="#">password?</a></span>
          </div>
        </form>
      </section>
    )}
    </>
  );
};

export default Login;
