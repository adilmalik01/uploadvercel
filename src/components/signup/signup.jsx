import { useRef } from 'react';
import './signup.css'
import { Link, useNavigate } from 'react-router-dom';
import LockIcon from '@mui/icons-material/Lock';

import axios from 'axios'
import swal from 'sweetalert2'






let baseUrl = 'http://localhost:5001/'

const Signup = () => {

    const navigate = useNavigate();
    let firstNameInput = useRef(null)
    let lastNameInput = useRef(null)
    let emailInput = useRef(null)
    let passwordInput = useRef(null)
    let reapeatPasswordInput = useRef(null)



    const SignupHanlder = async (e) => {
        e.preventDefault()

        if (passwordInput.current.value !== reapeatPasswordInput.current.value) {
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
                icon: "warning",
                title: "password does'nt Match"
            });
            return;
        }


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


        try {
            const res = await axios.post(`${baseUrl}api/v1/signup`, {
                firstName: firstNameInput.current.value,
                lastName: lastNameInput.current.value,
                email: emailInput.current.value,
                password: passwordInput.current.value,
            })

            if (res.data === "Enter Valid Email") {
                alert("Enter Valid Email")
                return;
            }

            if (res.data === "Email Alreadt Exist") {
                alert("Email Alreadt Exist")
                return;
            }

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
                icon: "success",
                html: `<h3>${res.data}</h3>`
            });

            navigate('/login', { replace: true });
        } catch (error) {
            alert("Email Already Exist")
            console.log(error);
        }

    }




    return (
        <div id='wrapper'>
            <div className="box">
                <div className="boxHead">
                    <h3><LockIcon  /></h3>
                </div>
                <div className="boxbody">
                    <form onSubmit={SignupHanlder}>
                        <div className="name">
                            <input type="text" ref={firstNameInput} placeholder='FirstName' />
                            <input type="text" ref={lastNameInput} placeholder='lastName' />
                        </div>
                        <input type="text" className='input' ref={emailInput} placeholder='Email' name="" id="" />
                        <input type="text" className='input' ref={passwordInput} placeholder='password' name="" id="" />
                        <input type="text" className='input' ref={reapeatPasswordInput} placeholder='Repeat Password' name="" id="" />
                        <div className="textDiv">
                            <p>You Have Already Account <Link to={'/login'}>Login</Link></p>
                        </div>
                        <button type='Submit'>Registar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;