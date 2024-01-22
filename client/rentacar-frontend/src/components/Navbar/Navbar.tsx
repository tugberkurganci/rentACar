import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../store/authStore/authSlice";
import minivanIcon from "../../assets/minivan.png";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { CiLogin } from "react-icons/ci";
import "./navbar.css";
type Props = {};

const Navbar = (props: Props) => {
  const [activeKey, setActiveKey] = useState<string>("home");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((store: any) => store.auth);
  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/");
  };
  const handleNavClick = (key: string) => {
    setActiveKey(key);
  };

  return (
    <div className="mb-5">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link
            className="navbar-brand"
            to="/"
            onClick={() => handleNavClick("home")}
          >
            <img id="minivan" src={minivanIcon} alt="mini van icon" />
          </Link>

          <div
            className="collapse navbar-collapse d-flex justify-content-between align-itmes-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 col">
              <li className="nav-item ">
                <Link
                  className={`nav-link ${
                    activeKey === "home" &&
                    "active bg-primary rounded-1 text-light"
                  }`}
                  to="/"
                  onClick={() => handleNavClick("home")}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeKey === "cars" &&
                    "active bg-primary rounded-1 text-light"
                  }`}
                  to="/cars"
                  onClick={() => handleNavClick("cars")}
                >
                  Cars
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    activeKey === "admin" &&
                    "active bg-primary rounded-1 text-light"
                  }`}
                  to="#"
                  onClick={() => handleNavClick("admin")}
                >
                  Admin
                </Link>
              </li>
            </ul>

            <div className="col text-end">
              {authState.id === 0 ? (
                <div className="d-flex align-items-center justify-content-end ">
                  <div className="btn btn-primary ">
                    <Link
                      to={"/login"}
                      className="text-light d-flex  align-items-center gap-1"
                    >
                      <CiLogin size={25} />
                      <span>Giriş yap</span>
                    </Link>
                  </div>

                  <div className="btn btn-primary ms-3 ">
                    <Link
                      to={"/sign-up"}
                      className="text-light  d-flex  align-items-center gap-1"
                    >
                      <CgProfile size={25} />
                      <span>Üye ol</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-end ">
                  <div className="btn btn-primary  ">
                    <Link
                      to={"/profile"}
                      className="text-light d-flex  align-items-center gap-1"
                    >
                      <CgProfile size={25} />
                      <span>Profile</span>
                    </Link>
                  </div>

                  <div onClick={handleLogout} className="btn btn-primary ms-3 ">
                    <Link
                      to={"/"}
                      className="text-light d-flex  align-items-center gap-1"
                    >
                      <IoIosLogOut size={25} />
                      <span>Çıkış yap</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
