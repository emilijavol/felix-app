import React from "react";

import MovieCard from "../../components/MovieCard";
import "./index.css";

const PAID_MOVIES_API = "https://dummy-video-api.onrender.com/content/items";

class Content extends React.Component {
  state = {
    loading: false,
    error: false,
    movies: [],
  };

  async componentDidMount() {
    const { authToken } = this.props;
    this.setState({ loading: true });

    try {
      const response = await fetch(PAID_MOVIES_API, {
        headers: { authorization: authToken },
      });

      if (response.status > 399 && response.status < 600) {
        throw new Error("failed to load");
      }

      const movies = await response.json();

      this.setState({ movies });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { movies, loading, error } = this.state;
    const { favorites, toggleFavorite } = this.props;

    return (
      <div className="Content">
        {loading && <p>Loading...</p>}
        {error && <p>Whoops! Movies stolen by pirate clouds! 😱🏴‍☠️☁️</p>}
        {movies.map(({ title, id, description, image }) => (
          <MovieCard
            id={id}
            key={id}
            title={title}
            description={description}
            image={image}
            isFavorite={favorites.includes(id)}
            onToggleFavorite={() => toggleFavorite(id)}
          />
        ))}
      </div>
    );
  }
}

export default Content;
