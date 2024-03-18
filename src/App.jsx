import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./context/context";
import axios from 'axios'



import Signup from "./components/signup/signup";
import Home from "./components/home/home";
import ForgetPassword from "./components/forgetPassowrd/forget-password";
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
// import baseUrl from "./core";

let baseUrl = 'http://localhost:5001/'


function App() {
  let { state, dispatch } = useContext(GlobalContext)

  const checkUserStatus = async (e) => {
    try {
      let res = await axios.get(`${baseUrl}ping`, { withCredentials: true })
      // console.log(res);
      dispatch({
        type: "USER_LOGIN",
        payload: res.data
      })
    } catch (error) {
      dispatch({
        type: "USER_LOGOUT"
      })
      console.log(error);
    }
  }

  useEffect(() => {
    axios.interceptors.request.use(
      function (config) {
        config.withCredentials = true;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
    checkUserStatus()
  }, [dispatch])


  return (
    <div className="mainApp">
      {state.isLogin == true ?
        (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />

            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Routes>
        )
        : null
      }

      {state.isLogin === false ?
        (
          <Routes>
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="forget-password" element={<ForgetPassword />} />

            <Route path="*" element={<Navigate to="/login" replace={true} />} />
          </Routes>

        ) : null
      }
      {state.isLogin === null ? <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", width: '100%', height: '100vh' }}> <h1>Loading.........</h1> </div> : null}
    </div>
  )

}

export default App;
