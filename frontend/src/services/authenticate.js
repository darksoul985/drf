import {useState, useContext} from 'react';
import AuthContext from '../context/AuthProvider';
import Cookies from "universal-cookie";


// TODO перенести аутентификацию в отдельный файл и вызывать результат в fetchData

export default function header() {
  const { auth } = useContext(AuthContext)
  const [token, setToken] = useState();

  if (auth?.accessToken === undefined){
    console.log("Login faild. Don't get a token")
  } else {
    const cookies = new Cookies()
    cookies.set('token', auth?.accessToken)
    setToken(auth?.accessToken)
  }

  const is_auth = (token) => {
    return !!token
  }

  const get_headers = () => {
    let headers = {
      'Content-Type': 'application/json',
    }
    if (is_auth(token)) {
      headers['Authorization'] = 'Bearer ' + token
    };
    return headers
  }
  return get_headers
}
