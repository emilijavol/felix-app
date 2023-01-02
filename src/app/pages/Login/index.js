import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";

import "./index.css";

const LOGIN_API = "https://dummy-video-api.onrender.com/auth/login";

function Login({ updateAuthToken }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [errorType, setErrorType] = useState();
  const [loading, setLoading] = useState(false);
  const errorMessage = {
    empty: "Fields cannot be Empty",
    credentials: "Check login details",
    request: "Oops! Something expolded! 💥",
  }[errorType];

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorType("empty");
    } else {
      setLoading(true);
      try {
        const response = await fetch(LOGIN_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (response.status > 399 && response.status < 600) {
          setErrorType(response.status === 400 ? "credentials" : "request");
        } else {
          const { token } = await response.json();

          updateAuthToken(token);
          navigate("/content");
        }
      } catch (error) {
        setErrorType("request");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="Login">
      <form className="Login__form" onSubmit={onSubmit}>
        <Input onChange={(e) => setUsername(e.target.value)} label="Username" />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          type="password"
        />
        <Button disabled={loading} type="submit">
          {loading ? "Loading..." : "Sign In"}
        </Button>
        {errorMessage && <p className="Login__error">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default Login;
