import React from 'react'
import "./Header.css"

const Header = () => {
  
  const login = () => {
    console.log("User wants to log in");
  }  

  return (
    <div className="header__container">
        <div className='header__left'>
            <span className='Title'>
                Berkeley Planner
            </span>
        </div>
        <div className='header__middle'>
            <nav>
                <button className="Feature" onClick={() => console.log("Clicked Connect")}>Connect</button>
            </nav>
        </div>
        <div className='header__right'>
            <button className="SignUp" onClick={login}>Log In</button>
            <button className="SignUp" onClick={() => console.log("User wants to sign up")}>Sign Up</button>
        </div>
    </div>
  )
}

export default Header