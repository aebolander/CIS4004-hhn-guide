import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Navbar from './Navbar';
import hhn1 from './hhn1.jpg';
import hhn2 from './hhn2.jpg';
import hhn3 from './hhn3.jpg';

function Account() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [currentImageIndex, setImageIndex] = useState(0);
  const redirect = useNavigate();

  const images = [
    hhn1, 
    hhn2, 
    hhn3
  ];

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("user_info");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user_info");
    sessionStorage.removeItem("google_token");
    setIsLoggedIn(false);
    setUserInfo(null);
    window.location.reload();
    redirect("/");
  };

  const handleLogin = async (credentialResponse) => {
    if (!credentialResponse || !credentialResponse.credential) return;
    const decodedToken = jwtDecode(credentialResponse.credential);
    console.log(decodedToken);

    // Save user info locally
    localStorage.setItem("user_info", JSON.stringify(decodedToken));
    setUserInfo(decodedToken);
    setIsLoggedIn(true);

    // Send user info to Flask to store in database
    try {
      await fetch("http://localhost:8000/add_person", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          person_name: decodedToken.name
        })
      });
    } catch (error) {
      console.error("Error adding person to database:", error);
    }

    redirect("/");
  };

  return (
    <div>
      <section>{isLoggedIn ? <Navbar /> : null}</section>
      <header style={{ backgroundColor: 'orange', padding: '1rem' }}>
        <h1 style={{ margin: 0, color: 'black' }}>
          {isLoggedIn ? `Welcome, ${userInfo?.name}` : 'Welcome to your Universal Halloween Horror Nights Orlando Guide!'}
        </h1>
      </header>

      <div style={{
        width: '100vw',
        height: '80vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
      }}>
        <img src={images[currentImageIndex]}
          alt="HHN Images"
          style={{
            width: '80vw',
            height: '80vh',
            objectFit: 'contain',
            transition: 'opacity 1s ease-in-out',
          }}
        />
      </div>

      <section style={{ marginTop: '0.5rem', textAlign: 'center' }}>
        {!isLoggedIn ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <GoogleLogin
              onSuccess={handleLogin}
              onError={() => console.log("Login failed")}
              style={{
                padding: '1.5rem 3rem',
                backgroundColor: 'orange',
                color: 'black',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '1.5rem',
                transition: 'all 0.3s ease-in-out',
                width:"auto",
                height: "auto"
              }}
            />
          </div>
        ) : (
          <button onClick={handleLogout} style={{
            padding: '1rem 2rem',
            backgroundColor: 'orange',
            color: 'black',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            transition: 'all 0.3s ease-in-out'
          }}>
            Logout
          </button>
        )}
      </section>
    </div>
  );
}

export default Account;