import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
  const {setUserInfo,userInfo}=useContext(UserContext);
  // const [username,setUsername]=useState('');
  useEffect(()=>{
    fetch('http://localhost:4000/profile',{
      credentials:'include',
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
        // setUsername(userInfo.username)
      })
    })
  },[]);

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials:'include',
      method:'POST'
    });
    setUserInfo(null);
  }

  const username=userInfo?.username;

    return (
        <header>
        {/* eslint-disable-next-line */}
        <Link to="/" className="logo">Symbipedia</Link>
        <nav>
          {username && (
            <>
              <span>Hello, {username}</span>
              <Link to="/create" className="nav-item">Create new post</Link>
              <a onClick={logout} className="nav-item">Logout</a>
              <br/>
            </>
          )}
          {!username && (
            <>
              {/* eslint-disable-next-line */}
              <Link to="/login" className="nav-item">Login</Link>
              {/* eslint-disable-next-line */}
              <Link to="/register" className="nav-item">Register</Link>
            </>
          )}
        </nav>
      </header>
      
    )
}