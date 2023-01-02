import { Link, useNavigate } from "react-router-dom";
// import { Routes, Link, Route, useNavigate } from "react-router-dom";
import Button from "../Button";

import logo from "../../images/logo.svg";
import "./index.css";

function Header({ updateAuthToken, authToken }) {
  const navigate = useNavigate();

  const onLogout = () => {
    updateAuthToken("");
    navigate("/");
  };

  return (
    <header className="Header">
      <div className="Header__container">
        <Link to="/">
          <img className="Header__logo" src={logo} alt="logo" />
        </Link>
        <Button to={authToken ? null : "/login"} onClick={authToken ? onLogout : null}>
          {authToken ? "Log out" : "Sign in"}
        </Button>

        {/* <Routes>
          <Route path="/content" element={<Button onClick={onLogout}>Log out</Button>} />
          <Route path="/content/:id" element={<Button onClick={onLogout}>Log out</Button>} />
          <Route path="*" element={<Button to="/login">Sign in</Button>} />
        </Routes> */}
      </div>
    </header>
  );
}

export default Header;
