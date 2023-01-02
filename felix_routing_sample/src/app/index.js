import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Content from "./pages/Content";
import Layout from "./components/Layout";

const FAVORITES_STORAGE_KEY = "FELIX_FAVORITES";
const AUTH_TOKEN_STORAGE_KEY = "AUTH_TOKEN_STORAGE_KEY";

function App() {
  const [favorites, setFavorites] = useState(
    JSON.parse(window.localStorage.getItem(FAVORITES_STORAGE_KEY)) || []
  );
  const [authToken, setAuthToken] = useState(window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY));

  const updateAuthToken = (token) => {
    window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
    setAuthToken(token);
  };

  const toggleFavorite = (id) => {
    let newFavorites = [...favorites];

    if (favorites.includes(id)) {
      newFavorites = newFavorites.filter((movieId) => movieId !== id);
    } else {
      newFavorites = newFavorites.concat(id);
    }

    window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <BrowserRouter>
      <Layout updateAuthToken={updateAuthToken} authToken={authToken}>
        <Routes>
          <Route
            path="/"
            element={<Home favorites={favorites} toggleFavorite={toggleFavorite} />}
          />
          <Route path="/login" element={<Login updateAuthToken={updateAuthToken} />} />
          <Route
            path="/content"
            element={
              <Content
                authToken={authToken}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            }
          />
          <Route path="*" element={<p>Your Lost! No Page Here!</p>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
