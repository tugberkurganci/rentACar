import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="mb-5">
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Korkmaz Rent A Car
          </Link>

          <div
            className="collapse navbar-collapse d-flex justify-content-between align-itmes-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 col">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cars">
                  Cars
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="#">
                  Admin
                </Link>
              </li>
            </ul>

            <div className="col text-end">
              <div className="btn btn-primary">Giriş yap</div>
              <div className="btn btn-primary">Üye ol</div>
              <div className="btn btn-primary">
                <Link to={"/profile"} className="text-light">
                  Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
