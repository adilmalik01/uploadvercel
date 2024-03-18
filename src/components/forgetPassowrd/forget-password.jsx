import { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import swal from 'sweetalert2'
import axios from 'axios'
import { GlobalContext } from '../../context/context';
import './forgetpassword.css'

let baseUrl = 'http://localhost:5001/'


const FogetPassword = () => {
    const navigate = useNavigate();

    const { state, dispatch } = useContext(GlobalContext)
    // let emailInput = useRef(null)
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

    const success = (alert) => {
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
            html: `<h3> ${alert}</h3>`
        });
    }
    let [email, setEmail] = useState("")
    let [otp, setotp] = useState("")
    let [newPassword, setpassword] = useState("")
    let [otpsent, isotpsent] = useState(false)


    const sendOpt = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post(`${baseUrl}api/v1/forget-password`, {
                email: email,
            })
            success(res.data?.message)
            if (res.data === "Enter Valid Email") {
                alert("Enter Valid Email")
                return;
            }
            setInterval(() => {
                isotpsent(true)
            }, 2000)
        } catch (error) {
            alert(error.response?.data)
        }
    }

    const UpdatePassword = async (e) => {

        e.preventDefault()
        console.log(email);

        try {
            let res = await axios.post(`${baseUrl}api/v1/forget-password-verify`, {
                email: email,
                newPassword: newPassword,
                otp: otp
            })

            if (res.data === "Enter Valid Email") {
                alert("Enter Valid Email")
                return;
            }
            if (res.status === 200) {
                setInterval(() => {
                    navigate('/login');
                }, 2000)
            }
            success(res.data.message)
        } catch (error) {
            console.log(error);
        }

        // console.log("Ok");
    }




    return (
        <div id="main">
            <h1>Forget Password</h1>
            {otpsent ?
                <>

                    <div className="down">
                        <form onSubmit={UpdatePassword}>

                            <input type="text" value={`${email}`} disabled name="" id="" />
                            <input type="text" onChange={(e) => { setotp(e.target.value) }} placeholder='Enter OTP' required name="" id="" />
                            <input type="text" autoComplete='true' onChange={(e) => { setpassword(e.target.value) }} placeholder='New Password' required name="" id="" />
                            <button type="submit">Update Password</button>
                        </form>
                    </div>

                </>
                :
                <>
                    <div className="down">
                        <form onSubmit={sendOpt}>
                            <input type="text" onChange={(e) => { setEmail(e.target.value) }} placeholder='Enter Your Email' required name="" id="" />
                            <button type="submit">Send OTP</button>
                        </form>
                    </div>

                </>
            }


        </div>
    )
}


export default FogetPassword;