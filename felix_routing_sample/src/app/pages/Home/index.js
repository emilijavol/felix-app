import React from "react";

import "./index.css";
import MovieCard from "../../components/MovieCard";

const FREE_MOVIES_API = "https://dummy-video-api.onrender.com/content/free-items";

class Home extends React.Component {
  state = {
    loading: false,
    error: false,
    movies: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const response = await fetch(FREE_MOVIES_API);

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
      <div className="Home">
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

Home.defaultProps = {
  favorites: [],
  toggleFavorite: () => {},
};

export default Home;
