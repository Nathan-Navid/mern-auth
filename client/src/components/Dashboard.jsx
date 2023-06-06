import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

  const navigate = useNavigate();

  const logoutHandler = (e)=>{
    e.preventDefault();
    axios.post("http://localhost:8000/api/logout", {}, {withCredentials: true})
        .then(res => {
            console.log(res.data);
            navigate("/");
        })
        .catch(err => console.log(err));
}
  return (
    <div>
      <button className="btn btn-danger offset-11" onClick={logoutHandler}>Log out</button>
      <h2>in Dashboard</h2>
    </div>
  )
}

export default Dashboard