import axios from "axios"
import { useEffect, useState } from "react"
import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import './profile.css'



let baseUrl = 'http://localhost:5001/'


const Profile = () => {

    let [userProfile, setuserProfile] = useState({})
    const [toggleRefresh, setToggleRefresh] = useState(false)

    useEffect(() => {
        console.log("ok");
        const getProfile = async (e) => {
            try {
                let res = await axios.get(`${baseUrl}api/v1/profile`, { withCredentials: true })
                console.log(res.data[0]);
                setuserProfile(res.data[0])
            } catch (error) {
                console.log(error);
            }
        }
        getProfile()
    }, [])

    const EditProfileHandler = async (e) => {
        e.preventDefault()
        console.log("hey");
        const { value: formValues } = await Swal.fire({
            title: "Update Profile",
            html: `
          <input id="swal-input1" value="${userProfile.firstName}" class="swal2-input">
          <input id="swal-input2" value="${userProfile.lastName}" class="swal2-input">
        `,
            focusConfirm: false,
            preConfirm: async () => {
                let firstNameUpdate = document.getElementById("swal-input1").value
                let lastNameUpdate = document.getElementById("swal-input2").value
                if (firstNameUpdate === " " || lastNameUpdate === " ") {
                    Swal.fire({
                        icon: "warning",
                        title: "Enter Name"
                    });
                    return;
                }
                try {
                    let updateRs = await axios.put(`${baseUrl}api/v1/updateprofile`, {
                        firstName: firstNameUpdate,
                        lastName: lastNameUpdate
                    })
                    console.log(updateRs);
                } catch (error) {
                    console.log(error);
                }
            }
        });
        if (formValues) {
            Swal.fire({
                icon: "success",
                timer: 2000,
                title: "Edit SuccessFully",
                showConfirmButton: false
            });
        }
    }

    const LogoutProfileHandler = async (e) => {
        e.preventDefault()
        try {
            let res = await axios.post(`${baseUrl}api/v1/logout`);
            window.location.href = < Navigate to={'/login'} />
        } catch (error) {
            console.log(error);
        }
    }

    return (<>
        <div className="banner">
            <div className="profileBanner">
                <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsbGxscGx4hIR4qLSgtKj04MzM4PV1CR0JHQl2NWGdYWGdYjX2Xe3N7l33gsJycsOD/2c7Z//////////////8BGxsbGxwbHiEhHiotKC0qPTgzMzg9XUJHQkdCXY1YZ1hYZ1iNfZd7c3uXfeCwnJyw4P/Zztn////////////////CABEIANQA1AMBIgACEQEDEQH/xAAZAAEBAQEBAQAAAAAAAAAAAAAABAMCAQX/2gAIAQEAAAAA+oAAAAAAAAAAAAAAA67eceAAANaNAxn4AACrcAlwAAK9gAlwAA2rAAg5ABf0ABjIAGloADz54Ab1AAEPAAopAAI8gBRSAAQ8ADS0AA+cAC/oADGQAG9QAEPAAFmoATTgAPa9QCacAANqOwzmzAAAd9++Z8gAA21yy8DrbrHMAGlfQz4e99jOTkA2rAAHMfAHdwAAOYfAXdgAATzBpaAAA8g8FW4AABHk/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAoCAhADEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/xAAuEAACAQEHAwEHBQAAAAAAAAABAgMAERIhMDFAYSBBURMEIjIzQlKBEBRgcZH/2gAIAQEAAT8A/jgVm0U0IZPFehJxRikH00QRqNqkTNrgKWJF7dTQqdMDToya7KOILi2uVJDZiumwiju4nXMlju+8NM6FLTeOgzSAcDTrcYjNRbqgZ062rb4zIhbIvGOeRaCMz2f4mPGwkFkjjnL9n+vYTfNfLgOLDjYSG2R/7y4TZIOcM8mwE5qsGUHOmaxLPObC9hunOke+xPbtnRyXxYdcyaS33R+c8Eg2io5Q+BwOVJN2X/dkkxGDYildW0PU0qL3tNPIz8DxtRI66MaE78V67eBRnfgUXZtWOzWFjrhQgTmmgYaY0QRqOoKzaAmlg+4/gU0CnQkU0TryM2OIvwKVFQYDoIB1FGJD9Negnk1+3X7jQgTk0I0GijpeJW4NMhQ2HKiivYnTYsoYWGnQobDkRpfbga7N1DLZRBBIPXGlxQO/faTro3VEt5x4GO1ItBFEEEg9MHwsedtN8w/r/8QAFBEBAAAAAAAAAAAAAAAAAAAAcP/aAAgBAgEBPwBE/8QAFBEBAAAAAAAAAAAAAAAAAAAAcP/aAAgBAwEBPwBE/9k=" alt="" />
                <h1 style={{ textTransform: "capitalize" }}>{userProfile.firstName} {userProfile.lastName}</h1>
                <h4 style={{ margin: '20px' }}>Join : {userProfile.createdAt}</h4>
                <div className="btn-div">
                    <button onClick={EditProfileHandler}>Edit Profile</button>
                    <button onClick={LogoutProfileHandler} >Logout</button>
                </div>
            </div>
        </div>
    </>);
}

export default Profile;