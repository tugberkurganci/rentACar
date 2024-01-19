import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../store/authStore/authSlice";
type Props = {};

const Navbar = (props: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authState = useSelector((store: any) => store.auth);
  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate("/");
  };
  useEffect(() => {
    console.log(authState);
  }, []);

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
              {authState.id === 0 ? (
                <div>
                  <Link to={"/login"}>
                    <div className="btn btn-primary">Giriş yap</div>
                  </Link>
                  <Link to={"/sign-up"}>
                    <div className="btn btn-primary">Üye ol</div>
                  </Link>
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-end ">
                  <div className="btn btn-primary">
                    <Link to={"/profile"} className="text-light">
                      Profile
                    </Link>
                  </div>

                  <div onClick={handleLogout} className="btn btn-primary">
                    <Link to={"/"} className="text-light">
                      Çıkış yap
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
