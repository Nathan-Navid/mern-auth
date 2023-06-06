import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegLogForm = () => {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: ""
    })

    const logChangeHandler = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        })
    }


    const changeHandler = (e) => {
        console.log(e)
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const loginHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/login", loginInfo, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                navigate("/dashboard");
            })
            .catch(err => console.log(err));
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/register", userInfo, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                navigate("/dashboard");
            })
            .catch(err => console.log(err));
    }
    const logoutHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/logout", {}, { withCredentials: true })
            .then(res => {
                console.log(res.data);
                navigate("/");
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <button className="btn btn-danger offset-11" onClick={logoutHandler}>Log out</button>
            <div className="row">
                <form action="" className="col-med-4 offset-2" onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input type="text" className="form-control" name="firstName" id="firstName" placeholder="First Name" onChange={changeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input type="text" className="form-control" name="lastName" id="lastName" placeholder="Last Name" onChange={changeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" className="form-control" name="email" id="email" placeholder="Email Address" onChange={changeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" name="password" id="password" placeholder="Password" onChange={changeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" className="form-control" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" onChange={changeHandler} />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                {/* //login form */}
                <form action="" className="col-med-4 offset-4" onSubmit={loginHandler}>
                    <div className="form-group">
                        <label htmlFor="email" >Email Address</label>
                        <input type="email" name="email" id="email" className='form-control' onChange={logChangeHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className='form-control' onChange={logChangeHandler} />
                    </div>
                    <button type="submit" className='btn btn-info'>Login</button>
                </form>
            </div>
        </div>
    )
}

export default RegLogForm