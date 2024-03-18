import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from "react";
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios'
import swal from 'sweetalert2'
import { GlobalContext } from '../../context/context';
import '../signup/signup.css'


let baseUrl = 'http://localhost:5001/'


const Login = () => {

  let { state, dispatch } = useContext(GlobalContext);
  // console.log(state);
  const navigate = useNavigate();
  let emailInput = useRef(null)
  let passwordInput = useRef(null)
  const [refresh, setRefresh] = useState(true)


  const alert = (alert) => {
    const Toast = swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = swal.stopTimer;
        toast.onmouseleave = swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "error",
      html: `<h3> ${alert}</h3>`
    });
  }

  const LoginHanlder = async (e) => {
    e.preventDefault()

    try {
      let res = await axios.post(`${baseUrl}api/v1/login`, {
        email: emailInput.current.value,
        password: passwordInput.current.value
      }, {
        withCredentials: true
      })
      dispatch({
        type: "USER_LOGIN",
        payload: res.data.data
      })

      if (res.data === "Enter Valid Email") {
        alert("Enter Valid Email")
        return;
      }
      console.log(res);
    } catch (error) {
      alert(error.response.data)
    }
  }









  return (<>
    <div id='wrapper'>
      <div className="loginBox">
        <div className="boxHead">
          <h3><LockIcon /></h3>
        </div>
        <div className="boxbody">
          <form onSubmit={LoginHanlder}>

            <input type="text" className='input' ref={emailInput} placeholder='Email' name="" id="" />
            <input type="text" className='input' ref={passwordInput} placeholder='password' name="" id="" />
            <div className="textDiv">
              <p>I Hav'nt Account <Link to={'/signup'}>Signup</Link></p>
              <p><Link to={'/forget-password'}>forget Password</Link></p>
            </div>
            <button type='Submit'>Login</button>

          </form>

        </div>
      </div>
    </div>
  </>);
}

export default Login;