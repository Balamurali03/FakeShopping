import React from "react";
import { useRef, useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import MainPage from "./MainPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    let [userDetails, setUserDetails] = useState(null);

    let history = useHistory();
    let Email = useRef();
    let Password = useRef();
    useEffect(() => {
        if (sessionStorage.getItem("userdetails") != null) {
            let userdetails = sessionStorage.getItem("userdetails");
            userdetails = JSON.parse(userdetails);
            setUserDetails(userdetails);
            console.log(userDetails);
        }
    })
    let handleLogin = (e) => {
        const allData = JSON.parse(localStorage.getItem('signupInfo'));
        if (allData === null) {
            e.preventDefault();
            notifyNoUser();

        } else {
            let length = allData.length;
            let userData = null;
            for (let i = 0; i < length; i++) {
                if (Email.current.value === allData[i].Email) {
                    userData = allData[i];
                }
            }
            if (userData === undefined) {
                e.preventDefault();
                notifyNoUser();
                history.push('/')
            }
            else if (userData.Password === Password.current.value) {

                notifyLogin();
                setUserDetails(userData);
                sessionStorage.setItem("userdetails", JSON.stringify(userData))

            } else if (userData.Password !== Password.current.value) {
                e.preventDefault();
                notifyWrongPassword();
            }
        }
    }
    let notifyLogin = () => {
        toast.dismiss();
        toast(<b>&nbsp;&nbsp;Account Login done successfully</b>, {
            position: "top-center",
        });
    }
    let notifyWrongPassword = () => {
        toast.dismiss();
        toast(<b>&nbsp;&nbsp;incorrect password</b>, {
            position: "top-center",
        });
    }
    let notifyNoUser = () => {
        toast.warn();
        toast(<b>&nbsp;&nbsp;No user found </b>, {
            position: "top-center",
        });
    }
    return (
        <div>
            {userDetails == null && <div>
                <h3 className='heading' style={{ textAlign: "center" }}>Login</h3>
                <form onSubmit={handleLogin}>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="inputEmail3" ref={Email} />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                        <div class="col-sm-10">
                            <input type="password" class="form-control" id="inputPassword3" ref={Password} />
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Signin</button>
                </form>
                <ToastContainer className="Toast-at-center" />
            </div>}
            {userDetails != null && <MainPage setUserDetails={setUserDetails} />}
        </div>
    )
}
export default Login;