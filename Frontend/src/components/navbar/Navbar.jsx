import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser = {
    id: 1,
    username: "ziad Elsayed",
    isSeller: true,
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span>Freelance</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          <Link to="/" className="link">
            Liverr Business
          </Link>
          <Link to="/" className="link">
            Explore
          </Link>
          <Link to="/" className="link">
            English
          </Link>
          <Link to="/" className="link">
            Sign in
          </Link>
          {!currentUser?.isSeller && (
            <Link to="/" className="link">
              Become a seller
            </Link>
          )}
          {currentUser && <button>Join</button>}

          {currentUser && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img
                src="https://miro.medium.com/v2/resize:fit:1200/1*odW0CyTVxMVt5s3yhjjOhw.png"
                alt="user_image"
              />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser?.isSeller && (
                    <>
                      <Link to="/myGigs" className="link">
                        Gigs
                      </Link>
                      <Link to="/add" className="link">
                        Add new gig
                      </Link>
                    </>
                  )}
                  <Link to="/orders" className="link">
                    Orders
                  </Link>
                  <Link to="/messages" className="link">
                    Messages
                  </Link>
                  <Link to="/" className="link">
                    Logout
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {(active || pathname !== "/") && (
        <>
          <hr />
          <div className="menu">
            <Link className="link menuLink" to="/">
              Graphics & Design
            </Link>
            <Link className="link menuLink" to="/">
              Video & Animation
            </Link>
            <Link className="link menuLink" to="/">
              Writing & Translation
            </Link>
            <Link className="link menuLink" to="/">
              AI Services
            </Link>
            <Link className="link menuLink" to="/">
              Digital Marketing
            </Link>
            <Link className="link menuLink" to="/">
              Music & Audio
            </Link>
            <Link className="link menuLink" to="/">
              Programming & Tech
            </Link>
            <Link className="link menuLink" to="/">
              Business
            </Link>
            <Link className="link menuLink" to="/">
              Lifestyle
            </Link>
          </div>
          <hr />
        </>
      )}
    </div>
  );
};

export default Navbar;
